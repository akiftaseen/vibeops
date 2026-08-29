import { CHECK_BY_ID } from "./checks";
import type {
  CheckExecution,
  CheckResultState,
  Confidence,
  DimensionId,
  DimensionScore,
  ExceptionRecord,
  Finding,
  GateStatus,
  PolicyConfig,
  Severity,
} from "./types";
import { DIMENSION_LABELS } from "./types";

export const DEFAULT_POLICY: PolicyConfig = {
  version: "1.0.0",
  extends: "proofed/default-launch",
  minimumConclusiveCoverage: 0.8,
  blockSeverities: ["critical"],
  blockConfidences: ["confirmed", "high"],
  requireChecks: ["BUILD-002", "AUTHZ-001", "SUPA-001", "PAY-001"],
  exceptionMaxDays: 30,
};

const OUTCOME_FACTOR: Record<string, number> = {
  pass: 1,
  advisory: 0.8,
  probable: 0.6,
  high: 0.15,
  confirmed: 0,
};

function isExecuted(state: CheckResultState) {
  return state === "pass" || state === "fail" || state === "inconclusive";
}

function isConclusive(state: CheckResultState) {
  return state === "pass" || state === "fail";
}

export function computeCoverage(executions: CheckExecution[]) {
  const applicable = executions.filter((e) => e.state !== "not_applicable");
  const executed = applicable.filter((e) => isExecuted(e.state));
  const conclusive = applicable.filter((e) => isConclusive(e.state));
  const weightOf = (list: CheckExecution[]) =>
    list.reduce((sum, e) => sum + (CHECK_BY_ID[e.checkId]?.weight ?? 0), 0);
  const denom = weightOf(applicable) || 1;
  return {
    coverage: weightOf(executed) / denom,
    conclusiveCoverage: weightOf(conclusive) / denom,
    applicableCount: applicable.length,
    executedCount: executed.length,
  };
}

export function computeDimensionScores(
  executions: CheckExecution[],
  findings: Finding[],
): DimensionScore[] {
  const dims = Object.keys(DIMENSION_LABELS) as DimensionId[];
  return dims.map((id) => {
    const inDim = executions.filter((e) => CHECK_BY_ID[e.checkId]?.category === id);
    const applicable = inDim.filter((e) => e.state !== "not_applicable");
    if (applicable.length === 0) {
      return {
        id,
        label: DIMENSION_LABELS[id],
        score: null,
        coverage: 0,
        status: "na" as const,
        executed: 0,
        applicable: 0,
      };
    }
    const executed = applicable.filter((e) => isExecuted(e.state));
    const conclusive = applicable.filter((e) => isConclusive(e.state));
    const weightOf = (list: CheckExecution[]) =>
      list.reduce((sum, e) => sum + (CHECK_BY_ID[e.checkId]?.weight ?? 0), 0);
    const coverage = weightOf(executed) / (weightOf(applicable) || 1);
    if (coverage < 0.6) {
      return {
        id,
        label: DIMENSION_LABELS[id],
        score: null,
        coverage,
        status: "insufficient" as const,
        executed: executed.length,
        applicable: applicable.length,
      };
    }
    let num = 0;
    let den = 0;
    for (const e of conclusive) {
      const w = CHECK_BY_ID[e.checkId]?.weight ?? 0;
      den += w;
      if (e.state === "pass") {
        num += w * 1;
      } else {
        const f = findings.find((x) => e.findingIds.includes(x.id));
        const factor =
          f?.confidence === "confirmed"
            ? OUTCOME_FACTOR.confirmed
            : f?.confidence === "high"
              ? OUTCOME_FACTOR.high
              : f?.confidence === "probable"
                ? OUTCOME_FACTOR.probable
                : f?.confidence === "advisory"
                  ? OUTCOME_FACTOR.advisory
                  : 0;
        num += w * factor;
      }
    }
    return {
      id,
      label: DIMENSION_LABELS[id],
      score: den === 0 ? null : Math.round((100 * num) / den),
      coverage,
      status: "scored" as const,
      executed: executed.length,
      applicable: applicable.length,
    };
  });
}

function findingIsExcepted(f: Finding, exceptions: ExceptionRecord[], now = Date.now()) {
  return exceptions.some(
    (ex) =>
      !ex.revokedAt &&
      new Date(ex.expiresAt).getTime() > now &&
      (ex.findingId === f.id || ex.checkId === f.checkId),
  );
}

export function computeGate(args: {
  executions: CheckExecution[];
  findings: Finding[];
  exceptions: ExceptionRecord[];
  policy?: PolicyConfig;
  reportAgeDays?: number;
}): { gate: GateStatus; reason: string } {
  const policy = args.policy ?? DEFAULT_POLICY;
  const { executions, findings, exceptions } = args;
  const { conclusiveCoverage } = computeCoverage(executions);

  const vibeopsError = executions.some((e) => e.state === "error_vibeops");
  const requiredMissing = policy.requireChecks.filter((id) => {
    const ex = executions.find((e) => e.checkId === id);
    return !ex || (!isConclusive(ex.state) && ex.state !== "not_applicable");
  });

  const open = findings.filter(
    (f) => f.status === "open" && !findingIsExcepted(f, exceptions),
  );

  const blockingCritical = open.filter(
    (f) =>
      f.severity === "critical" &&
      (f.confidence === "confirmed" || f.confidence === "high"),
  );
  const blockingHigh = open.filter(
    (f) =>
      f.severity === "high" &&
      (f.confidence === "confirmed" || f.confidence === "high") &&
      (f.category === "auth" || f.category === "data" || f.category === "payments"),
  );

  const build002 = executions.find((e) => e.checkId === "BUILD-002");
  const p0Incomplete = executions.filter((e) => {
    const def = CHECK_BY_ID[e.checkId];
    if (!def || def.priority !== "P0") return false;
    if (e.state === "not_applicable") return false;
    if (isConclusive(e.state)) return false;
    return !exceptions.some(
      (ex) => ex.checkId === e.checkId && !ex.revokedAt && new Date(ex.expiresAt).getTime() > Date.now(),
    );
  });

  if (blockingCritical.length > 0) {
    return {
      gate: "blocked",
      reason: `${blockingCritical[0].title} (${blockingCritical[0].checkId}) failed with ${blockingCritical[0].confidence} evidence.`,
    };
  }
  if (blockingHigh.length > 0) {
    return {
      gate: "blocked",
      reason: `${blockingHigh[0].title} is a confirmed/high ${blockingHigh[0].category} failure.`,
    };
  }
  if (build002 && build002.state !== "pass" && build002.state !== "not_applicable") {
    return {
      gate: "blocked",
      reason: "Production build (BUILD-002) did not pass.",
    };
  }

  const activeExceptions = exceptions.filter(
    (ex) => !ex.revokedAt && new Date(ex.expiresAt).getTime() > Date.now(),
  );

  if (conclusiveCoverage < 0.6 || requiredMissing.length > 2) {
    return {
      gate: "insufficient_evidence",
      reason: `Conclusive coverage is ${Math.round(conclusiveCoverage * 100)}%. A readiness judgment needs at least 80% of applicable weighted checks.`,
    };
  }

  if (
    p0Incomplete.length > 0 ||
    conclusiveCoverage < policy.minimumConclusiveCoverage ||
    vibeopsError ||
    requiredMissing.length > 0 ||
    open.some((f) => f.severity === "high" && f.confidence === "confirmed")
  ) {
    const bits: string[] = [];
    if (conclusiveCoverage < policy.minimumConclusiveCoverage) {
      bits.push(`conclusive coverage ${Math.round(conclusiveCoverage * 100)}% is below ${Math.round(policy.minimumConclusiveCoverage * 100)}%`);
    }
    if (p0Incomplete.length) bits.push(`${p0Incomplete.length} required P0 checks did not complete`);
    if (requiredMissing.length) bits.push(`required checks incomplete: ${requiredMissing.join(", ")}`);
    if (vibeopsError) bits.push("a platform error reduced coverage");
    return {
      gate: "at_risk",
      reason: bits.join("; ") || "Important failures or incomplete coverage remain.",
    };
  }

  if (activeExceptions.length > 0) {
    return {
      gate: "ready_with_exceptions",
      reason: `${activeExceptions.length} time-bounded exception${activeExceptions.length === 1 ? "" : "s"} remain on the launch policy.`,
    };
  }

  return {
    gate: "ready_for_tested_scope",
    reason:
      "All blocking rules passed and minimum coverage was reached for the declared launch scope.",
  };
}

export function headlineScore(dims: DimensionScore[]): number | null {
  const scored = dims.filter((d) => d.status === "scored" && d.score !== null);
  if (scored.length === 0) return null;
  const avg = scored.reduce((s, d) => s + (d.score ?? 0), 0) / scored.length;
  return Math.round(avg);
}

export function severityRank(s: Severity) {
  return { critical: 4, high: 3, medium: 2, low: 1, info: 0 }[s];
}

export function confidenceRank(c: Confidence) {
  return { confirmed: 4, high: 3, probable: 2, advisory: 1 }[c];
}
