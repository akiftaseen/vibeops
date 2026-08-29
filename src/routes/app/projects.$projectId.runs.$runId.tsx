import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { RunTimeline } from "@/components/run-timeline";
import { CoverageBar, DimensionGrid } from "@/components/coverage-bar";
import { GateBadge } from "@/components/gate-badge";
import { CHECK_BY_ID } from "@/lib/checks";
import { absTime, pct, shortSha } from "@/lib/format";
import { PHASE_LABELS } from "@/lib/types";

export const Route = createFileRoute("/app/projects/$projectId/runs/$runId")({
  component: RunDetail,
});

function RunDetail() {
  const { projectId, runId } = Route.useParams();
  const run = useAppStore((s) => s.runs.find((r) => r.id === runId));
  if (!run) return <p className="text-sm text-muted-foreground">Run not found.</p>;
  const running = run.state !== "completed" && !run.state.startsWith("failed") && run.state !== "cancelled";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {running ? "In progress" : "Completed"} · {run.trigger}
          </p>
          <h2 className="font-display mt-1 text-2xl">{PHASE_LABELS[run.state]}</h2>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            {shortSha(run.commitSha)} · {run.checkPack} · {run.policyVersion}
          </p>
        </div>
        {run.state === "completed" ? <GateBadge gate={run.gate} size="lg" /> : null}
      </div>

      {running ? (
        <p className="text-sm text-muted-foreground">
          Phase-level progress only. Percent complete is not fabricated.
        </p>
      ) : (
        <div className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
          <p className="text-sm leading-relaxed">{run.gateReason}</p>
          <div className="mt-4 max-w-sm">
            <CoverageBar value={run.conclusiveCoverage} />
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[20rem_1fr]">
        <RunTimeline run={run} />
        <div>
          <h3 className="text-sm font-medium">Check results</h3>
          {run.executions.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">Waiting for analysis to finish.</p>
          ) : (
            <div className="mt-3 overflow-x-auto rounded-xl bg-card shadow-[var(--shadow-border)]">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 font-medium">Check</th>
                    <th className="px-4 py-3 font-medium">State</th>
                    <th className="px-4 py-3 font-medium">ms</th>
                  </tr>
                </thead>
                <tbody>
                  {run.executions.map((e) => (
                    <tr key={e.checkId} className="border-b border-border/70 last:border-0">
                      <td className="px-4 py-2">
                        <span className="font-mono text-[11px] text-muted-foreground">{e.checkId}</span>
                        <span className="mt-0.5 block">{CHECK_BY_ID[e.checkId]?.title}</span>
                      </td>
                      <td className="px-4 py-2 font-mono text-[11px] uppercase">
                        {e.state.replaceAll("_", " ")}
                      </td>
                      <td className="px-4 py-2 font-mono tabular-nums text-muted-foreground">
                        {e.durationMs}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {run.state === "completed" ? (
        <>
          <DimensionGrid dims={run.dimensionScores} />
          <p className="text-xs text-muted-foreground">
            Started {absTime(run.startedAt)}
            {run.completedAt ? ` · finished ${absTime(run.completedAt)}` : ""} · internal cost $
            {run.costUsd.toFixed(2)} · coverage {pct(run.coverage)}
          </p>
          <Link
            to="/app/projects/$projectId"
            params={{ projectId }}
            className="text-sm text-primary hover:underline"
          >
            Back to overview
          </Link>
        </>
      ) : null}
    </div>
  );
}
