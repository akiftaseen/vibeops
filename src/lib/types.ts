export type GateStatus =
  | "blocked"
  | "at_risk"
  | "ready_with_exceptions"
  | "ready_for_tested_scope"
  | "insufficient_evidence";

export type CheckResultState =
  | "pass"
  | "fail"
  | "not_applicable"
  | "skipped_user_configuration"
  | "skipped_safety_policy"
  | "error_application"
  | "error_vibeops"
  | "inconclusive";

export type Confidence = "confirmed" | "high" | "probable" | "advisory";
export type Severity = "critical" | "high" | "medium" | "low" | "info";
export type FindingStatus =
  | "open"
  | "resolved"
  | "disputed"
  | "accepted"
  | "not_relevant";
export type FixEligibility = "mechanical" | "contextual" | "high-risk" | "prohibited" | "none";
export type DimensionId =
  | "security"
  | "auth"
  | "data"
  | "payments"
  | "reliability"
  | "runtime"
  | "accessibility"
  | "operations";

export type RunPhase =
  | "queued"
  | "acquiring"
  | "inventorying"
  | "analyzing"
  | "building"
  | "starting"
  | "testing"
  | "validating"
  | "scoring"
  | "completed"
  | "cancelled"
  | "timed_out"
  | "failed_infrastructure"
  | "failed_configuration"
  | "unsupported";

export type EnvironmentKind = "sandbox" | "preview" | "production";
export type DataSensitivity = "none" | "basic" | "sensitive";
export type PaymentsScope = "none" | "test" | "live_planned";
export type StackSupport = "fully_supported" | "partially_supported" | "unsupported";
export type GraphConfidence = "detected" | "inferred" | "declared" | "unresolved";
export type MembershipRole = "owner" | "maintainer" | "viewer" | "billing";

export interface CheckDefinition {
  id: string;
  version: string;
  title: string;
  category: DimensionId;
  priority: "P0" | "P1";
  defaultSeverity: Severity;
  blockingEligible: boolean;
  weight: number;
  method: string;
  standards: string[];
}

export interface CheckExecution {
  checkId: string;
  state: CheckResultState;
  confidence?: Confidence;
  durationMs: number;
  applicability: string;
  findingIds: string[];
}

export interface CodeLocation {
  path: string;
  startLine: number;
  endLine: number;
  symbol?: string;
}

export interface EvidenceItem {
  id: string;
  kind:
    | "sarif"
    | "ast_trace"
    | "file_excerpt"
    | "bundle_match"
    | "command_result"
    | "http_transcript"
    | "browser_trace"
    | "schema_diff"
    | "test_assertion"
    | "advisory"
    | "graph_proof";
  title: string;
  tool: string;
  toolVersion: string;
  capturedAt: string;
  sha256: string;
  proves: string;
  doesNotProve: string;
  body: string;
  language?: string;
}

export interface Finding {
  id: string;
  fingerprint: string;
  projectId: string;
  runId: string;
  checkId: string;
  title: string;
  summary: string;
  category: DimensionId;
  severity: Severity;
  confidence: Confidence;
  status: FindingStatus;
  impact: string;
  affectedSurface: string;
  locations: CodeLocation[];
  graphNodeIds: string[];
  evidence: EvidenceItem[];
  reproduce: string[];
  remediation: string;
  fixEligibility: FixEligibility;
  fixRiskNote: string;
  standards: string[];
  firstSeen: string;
  lastSeen: string;
  policyImpact: "blocks" | "warns" | "none";
}

export interface GraphNode {
  id: string;
  type:
    | "application"
    | "route"
    | "handler"
    | "middleware"
    | "auth"
    | "role"
    | "table"
    | "rls"
    | "storage"
    | "migration"
    | "webhook"
    | "payment"
    | "env"
    | "integration";
  label: string;
  detail: string;
  confidence: GraphConfidence;
  evidence: string;
  sensitive?: boolean;
  public?: boolean;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  type: string;
  confidence: GraphConfidence;
}

export interface ArchitectureGraph {
  summary: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface DimensionScore {
  id: DimensionId;
  label: string;
  score: number | null;
  coverage: number;
  status: "scored" | "insufficient" | "na";
  executed: number;
  applicable: number;
}

export interface RunStep {
  phase: RunPhase;
  label: string;
  startedAt?: string;
  completedAt?: string;
  state: "pending" | "running" | "done" | "error" | "skipped";
  note?: string;
}

export interface Run {
  id: string;
  projectId: string;
  commitSha: string;
  commitMessage: string;
  branch: string;
  environmentId: string;
  trigger: "manual" | "scheduled" | "pr" | "intake";
  state: RunPhase;
  gate: GateStatus;
  gateReason: string;
  coverage: number;
  conclusiveCoverage: number;
  startedAt: string;
  completedAt?: string;
  checkPack: string;
  policyVersion: string;
  steps: RunStep[];
  executions: CheckExecution[];
  dimensionScores: DimensionScore[];
  untested: string[];
  costUsd: number;
}

export interface ExceptionRecord {
  id: string;
  projectId: string;
  findingId?: string;
  checkId?: string;
  owner: string;
  reason: string;
  compensatingControl: string;
  startsAt: string;
  expiresAt: string;
  revokedAt?: string;
}

export interface FixAttempt {
  id: string;
  projectId: string;
  findingId: string;
  state:
    | "preparing"
    | "verification_failed"
    | "ready_for_review"
    | "pr_open"
    | "merged"
    | "closed"
    | "superseded";
  verification:
    | "not_attempted"
    | "fix_generation_failed"
    | "baseline_failed"
    | "original_check_still_fails"
    | "new_regression_detected"
    | "verified_in_sandbox"
    | "verified_on_pr_commit"
    | "merged_unverified"
    | "resolved"
    | "recurred";
  branch: string;
  prNumber?: number;
  prUrl?: string;
  files: string[];
  patchSummary: string;
  originalBefore: string;
  originalAfter: string;
  relatedChecks: { id: string; result: string }[];
  limitations: string;
  createdAt: string;
  riskClass: FixEligibility;
}

export interface Environment {
  id: string;
  name: string;
  kind: EnvironmentKind;
  baseUrl?: string;
  ownership: "verified" | "unverified" | "sandbox";
  activeTests: boolean;
}

export interface TestPersona {
  id: string;
  role: "anonymous" | "user_a" | "user_b" | "admin";
  label: string;
  email: string;
}

export interface CriticalFlow {
  id: string;
  name: string;
  steps: string[];
  approved: boolean;
  destructive: boolean;
}

export interface Project {
  id: string;
  name: string;
  repo: string;
  defaultBranch: string;
  description: string;
  purpose: string;
  dataSensitivity: DataSensitivity;
  payments: PaymentsScope;
  stack: {
    next: string;
    router: "app" | "pages";
    supabase: boolean;
    stripe: boolean;
    packageManager: "npm" | "pnpm" | "yarn";
    node: string;
    support: StackSupport;
  };
  latestRunId?: string;
  environments: Environment[];
  personas: TestPersona[];
  flows: CriticalFlow[];
  graph: ArchitectureGraph;
  createdAt: string;
  owner: string;
}

export interface PolicyConfig {
  version: string;
  extends: string;
  minimumConclusiveCoverage: number;
  blockSeverities: Severity[];
  blockConfidences: Confidence[];
  requireChecks: string[];
  exceptionMaxDays: number;
}

export interface ConnectedRepo {
  id: string;
  fullName: string;
  description: string;
  defaultBranch: string;
  private: boolean;
  stackHint: string;
  template: "blocked" | "ready" | "at_risk" | "insufficient" | "unsupported";
}

export interface UsageSnapshot {
  plan: "free" | "builder" | "studio" | "team";
  projectsUsed: number;
  projectsLimit: number;
  checksUsed: number;
  checksLimit: number;
  fixesUsed: number;
  fixesLimit: number;
  periodEnd: string;
}

export const DIMENSION_LABELS: Record<DimensionId, string> = {
  security: "Security",
  auth: "Authentication and authorization",
  data: "Data safety",
  payments: "Payments",
  reliability: "Reliability",
  runtime: "Runtime and UX",
  accessibility: "Accessibility",
  operations: "Operations",
};

export const GATE_COPY: Record<
  GateStatus,
  { label: string; sentence: string }
> = {
  blocked: {
    label: "Blocked",
    sentence:
      "At least one applicable blocking rule failed with confirmed or high-confidence evidence.",
  },
  at_risk: {
    label: "At risk",
    sentence:
      "No hard blocker was proven, but important failures, low coverage, or unresolved run errors remain.",
  },
  ready_with_exceptions: {
    label: "Ready with exceptions",
    sentence:
      "All blocking rules passed; explicit, time-bounded exceptions remain.",
  },
  ready_for_tested_scope: {
    label: "Ready for tested scope",
    sentence:
      "All blocking rules passed and minimum coverage was reached for the declared launch scope. This is not a claim of complete security.",
  },
  insufficient_evidence: {
    label: "Insufficient evidence",
    sentence:
      "The run did not execute enough applicable checks to support a readiness judgment.",
  },
};

export const PHASE_LABELS: Record<RunPhase, string> = {
  queued: "Queued",
  acquiring: "Snapshot",
  inventorying: "Inventory",
  analyzing: "Static analysis",
  building: "Install and build",
  starting: "Local runtime",
  testing: "Dynamic and browser",
  validating: "Evidence validation",
  scoring: "Policy",
  completed: "Completed",
  cancelled: "Cancelled",
  timed_out: "Timed out",
  failed_infrastructure: "Platform failure",
  failed_configuration: "Configuration failure",
  unsupported: "Unsupported",
};
