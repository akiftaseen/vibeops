import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { CoverageBar, DimensionGrid } from "@/components/coverage-bar";
import { GateBadge, SeverityBadge, ConfidenceBadge } from "@/components/gate-badge";
import { GATE_COPY } from "@/lib/types";
import { pct } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/projects/$projectId/")({
  component: Overview,
});

function Overview() {
  const { projectId } = Route.useParams();
  const project = useAppStore((s) => s.projects.find((p) => p.id === projectId));
  const run = useAppStore((s) => s.runs.find((r) => r.id === project?.latestRunId));
  const findings = useAppStore((s) =>
    s.findings.filter((f) => f.projectId === projectId && f.status === "open"),
  );
  const blockers = findings.filter((f) => f.policyImpact === "blocks");

  if (!project || !run) {
    return <p className="text-sm text-muted-foreground">No completed run yet.</p>;
  }

  return (
    <div className="space-y-10">
      <section className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <GateBadge gate={run.gate} size="lg" />
            <p className="mt-4 text-base leading-relaxed">{run.gateReason}</p>
            <p className="mt-2 text-sm text-muted-foreground">{GATE_COPY[run.gate].sentence}</p>
          </div>
          <div className="w-full max-w-xs">
            <CoverageBar value={run.conclusiveCoverage} />
            <p className="mt-3 text-xs text-muted-foreground">
              Weighted coverage {pct(run.coverage)}. Score is subordinate to the gate.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Blocking findings</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/app/projects/$projectId/issues" params={{ projectId }}>
              All issues
            </Link>
          </Button>
        </div>
        {blockers.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No open blockers on this run.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]">
            {blockers.map((f) => (
              <li key={f.id}>
                <Link
                  to="/app/projects/$projectId/issues/$findingId"
                  params={{ projectId, findingId: f.id }}
                  className="flex flex-col gap-2 px-5 py-4 hover:bg-secondary/40 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">{f.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{f.affectedSurface}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <SeverityBadge severity={f.severity} />
                    <ConfidenceBadge confidence={f.confidence} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl">Dimensions</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Hidden below 60% weighted coverage. N/A when the architecture has no applicable checks.
        </p>
        <div className="mt-4">
          <DimensionGrid dims={run.dimensionScores} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl">Untested scope</h2>
        {run.untested.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No residual untested scope recorded.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {run.untested.map((u) => (
              <li key={u}>— {u}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl">Architecture</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.graph.summary}</p>
        <Button className="mt-4" variant="outline" asChild>
          <Link to="/app/projects/$projectId/architecture" params={{ projectId }}>
            Open map
          </Link>
        </Button>
      </section>
    </div>
  );
}
