import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { GateBadge } from "@/components/gate-badge";
import { pct, relTime, shortSha } from "@/lib/format";

export const Route = createFileRoute("/app/projects/$projectId/runs/")({
  component: ProjectRuns,
});

function ProjectRuns() {
  const { projectId } = Route.useParams();
  const runs = useAppStore((s) => s.runs.filter((r) => r.projectId === projectId));
  return (
    <div>
      <h2 className="font-display text-2xl">Run history</h2>
      <ul className="mt-4 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]">
        {runs.map((r) => (
          <li key={r.id}>
            <Link
              to="/app/projects/$projectId/runs/$runId"
              params={{ projectId, runId: r.id }}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-secondary/40"
            >
              <div>
                <p className="font-mono text-sm">{shortSha(r.commitSha)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.commitMessage}</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <GateBadge gate={r.gate} size="sm" />
                <span className="font-mono tabular-nums">{pct(r.conclusiveCoverage)}</span>
                <span className="text-muted-foreground">
                  {r.completedAt ? relTime(r.completedAt) : r.state.replaceAll("_", " ")}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
