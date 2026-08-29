import { Link } from "@tanstack/react-router";
import { Stamp } from "./gate-badge";
import { SEED_FINDINGS, SEED_PROJECTS, SEED_RUNS } from "@/lib/demo-data";
import { GATE_COPY } from "@/lib/types";
import { pct, shortSha } from "@/lib/format";
import { cn } from "@/lib/utils";

const project = SEED_PROJECTS[0];
const run = SEED_RUNS[0];
const blockers = SEED_FINDINGS.filter(
  (f) => f.projectId === "p-northstar" && f.policyImpact === "blocks",
).slice(0, 4);

export function PaperReport({
  className,
  interactive = false,
}: {
  className?: string;
  interactive?: boolean;
}) {
  return (
    <article
      className={cn(
        "paper-sheet relative overflow-hidden rounded-sm p-6 text-paper-fg shadow-[0_24px_80px_-24px_rgb(0_0_0_/_0.55)] sm:p-8",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-muted">
            Proofed · Launch Check
          </p>
          <h3 className="font-display mt-2 text-2xl leading-tight">{project.name}</h3>
          <p className="mt-1 font-mono text-[11px] text-paper-muted">
            {project.repo} · {shortSha(run.commitSha)} · sandbox
          </p>
        </div>
        <Stamp gate={run.gate} className="size-20 text-[9px] sm:size-24 sm:text-[11px]" />
      </div>

      <p className="mt-5 max-w-prose text-sm leading-relaxed text-paper-fg/85">
        {GATE_COPY[run.gate].sentence}
      </p>

      <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-paper-fg/10 py-4 text-center">
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-paper-muted">Coverage</dt>
          <dd className="mt-1 font-mono text-sm tabular-nums">{pct(run.conclusiveCoverage)}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-paper-muted">Blockers</dt>
          <dd className="mt-1 font-mono text-sm tabular-nums">{blockers.length}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wider text-paper-muted">Pack</dt>
          <dd className="mt-1 font-mono text-[11px]">next-supabase-stripe</dd>
        </div>
      </dl>

      <ol className="mt-5 space-y-3">
        {blockers.map((f, i) => {
          const inner = (
            <>
              <span className="font-mono text-[10px] text-paper-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="block text-sm leading-snug">{f.title}</span>
                <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-paper-muted">
                  {f.checkId} · {f.confidence} · {f.severity}
                </span>
              </span>
            </>
          );
          return interactive ? (
            <li key={f.id}>
              <Link
                to="/app/projects/$projectId/issues/$findingId"
                params={{ projectId: "p-northstar", findingId: f.id }}
                className="flex gap-3 rounded-sm py-1 hover:bg-paper-fg/5"
              >
                {inner}
              </Link>
            </li>
          ) : (
            <li key={f.id} className="flex gap-3">
              {inner}
            </li>
          );
        })}
      </ol>

      <p className="mt-8 border-t border-paper-fg/10 pt-4 text-[11px] leading-relaxed text-paper-muted">
        No blocking issues were detected within the checks and environments shown in this
        report — except the failures listed. Automated scoped verification; not a certification
        or penetration test.
      </p>
    </article>
  );
}
