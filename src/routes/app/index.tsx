import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GateBadge } from "@/components/gate-badge";
import { useAppStore } from "@/lib/store";
import { pct, relTime, shortSha } from "@/lib/format";
import { GATE_COPY } from "@/lib/types";

export const Route = createFileRoute("/app/")({ component: ProjectsPage });

function ProjectsPage() {
  const projects = useAppStore((s) => s.projects);
  const runs = useAppStore((s) => s.runs);
  const findings = useAppStore((s) => s.findings);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Workspace</p>
          <h1 className="font-display mt-1 text-3xl tracking-tight">Projects</h1>
        </div>
        <Button asChild>
          <Link to="/app/new">
            <Plus className="size-4" />
            New Launch Check
          </Link>
        </Button>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Interactive demo. Four repositories are preloaded from a fixture GitHub App install.
        Gate status is computed from evidence — a high score cannot override a blocker.
      </p>

      <ul className="mt-8 grid gap-3">
        {projects.map((p) => {
          const run = runs.find((r) => r.id === p.latestRunId);
          const open = findings.filter(
            (f) => f.projectId === p.id && f.status === "open" && (f.severity === "critical" || f.severity === "high"),
          ).length;
          return (
            <li key={p.id}>
              <Link
                to="/app/projects/$projectId"
                params={{ projectId: p.id }}
                className="block rounded-xl bg-card p-5 shadow-[var(--shadow-border)] transition-colors hover:bg-secondary/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-medium">{p.name}</h2>
                      {run ? <GateBadge gate={run.gate} size="sm" /> : null}
                    </div>
                    <p className="mt-1 font-mono text-[12px] text-muted-foreground">{p.repo}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-right text-sm">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Coverage</p>
                      <p className="mt-1 font-mono tabular-nums">
                        {run ? pct(run.conclusiveCoverage) : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Open C/H</p>
                      <p className="mt-1 font-mono tabular-nums">{open}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Evidence</p>
                      <p className="mt-1 text-xs">
                        {run?.completedAt ? relTime(run.completedAt) : run ? "Running" : "None"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2 py-0.5">Next {p.stack.next}</span>
                  {p.stack.supabase ? <span className="rounded-full bg-secondary px-2 py-0.5">Supabase</span> : null}
                  {p.stack.stripe ? <span className="rounded-full bg-secondary px-2 py-0.5">Stripe</span> : null}
                  {run ? (
                    <span className="rounded-full bg-secondary px-2 py-0.5 font-mono">
                      {shortSha(run.commitSha)}
                    </span>
                  ) : null}
                  {run ? <span className="text-muted-foreground">{GATE_COPY[run.gate].label}</span> : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
