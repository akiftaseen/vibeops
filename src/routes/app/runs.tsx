import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { GateBadge } from "@/components/gate-badge";
import { pct, relTime, shortSha } from "@/lib/format";

export const Route = createFileRoute("/app/runs")({ component: RunsPage });

function RunsPage() {
  const runs = useAppStore((s) => s.runs);
  const projects = useAppStore((s) => s.projects);
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="font-display text-3xl tracking-tight">Runs</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Every run is bound to a commit SHA, check-pack version, and policy version.
      </p>
      <ul className="mt-6 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]">
        {runs.map((r) => {
          const p = projects.find((x) => x.id === r.projectId);
          return (
            <li key={r.id}>
              <Link
                to="/app/projects/$projectId/runs/$runId"
                params={{ projectId: r.projectId, runId: r.id }}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-secondary/40"
              >
                <div>
                  <p className="text-sm font-medium">{p?.name ?? r.projectId}</p>
                  <p className="mt-1 font-mono text-[12px] text-muted-foreground">
                    {shortSha(r.commitSha)} · {r.branch} · {r.trigger}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <GateBadge gate={r.gate} size="sm" />
                  <span className="font-mono tabular-nums text-muted-foreground">
                    {pct(r.conclusiveCoverage)}
                  </span>
                  <span className="text-muted-foreground">
                    {r.completedAt ? relTime(r.completedAt) : r.state}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
