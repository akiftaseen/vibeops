import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingFooter, MarketingNav } from "@/components/marketing-nav";
import { PaperReport } from "@/components/paper-report";
import { GateBadge, SeverityBadge, ConfidenceBadge } from "@/components/gate-badge";
import { Button } from "@/components/ui/button";
import { SEED_FINDINGS, SEED_RUNS, SEED_PROJECTS } from "@/lib/demo-data";
import { GATE_COPY } from "@/lib/types";
import { pct, shortSha, absTime } from "@/lib/format";
import { CHECK_BY_ID } from "@/lib/checks";

export const Route = createFileRoute("/sample")({ component: Sample });

function Sample() {
  const project = SEED_PROJECTS[0];
  const run = SEED_RUNS[0];
  const findings = SEED_FINDINGS.filter((f) => f.projectId === "p-northstar");
  const blockers = findings.filter((f) => f.policyImpact === "blocks");

  return (
    <div className="min-h-dvh bg-background">
      <MarketingNav />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Interactive sample · deliberately vulnerable fixture
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight">Northstar Launch Check</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A real report shape for an AI-built agency OS. Evidence is from a fixture
          repository, not a customer. Open any finding in the workspace to inspect
          transcripts, AST traces, and the fix path.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/app/projects/$projectId" params={{ projectId: "p-northstar" }}>
              Open in workspace
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/app/new">Run a Launch Check</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-8">
        <PaperReport />
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        <section className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <GateBadge gate={run.gate} size="lg" />
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
                {run.gateReason}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Conclusive coverage</dt>
                <dd className="font-mono tabular-nums">{pct(run.conclusiveCoverage)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Commit</dt>
                <dd className="font-mono">{shortSha(run.commitSha)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Completed</dt>
                <dd>{absTime(run.completedAt ?? run.startedAt)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Environment</dt>
                <dd>sandbox</dd>
              </div>
            </dl>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">{GATE_COPY[run.gate].sentence}</p>
        </section>

        <h2 className="mt-10 font-display text-2xl">Blocking findings</h2>
        <ul className="mt-4 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]">
          {blockers.map((f) => (
            <li key={f.id}>
              <Link
                to="/app/projects/$projectId/issues/$findingId"
                params={{ projectId: "p-northstar", findingId: f.id }}
                className="flex flex-col gap-2 px-5 py-4 hover:bg-secondary/40 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{f.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{f.affectedSurface}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-1.5">
                  <SeverityBadge severity={f.severity} />
                  <ConfidenceBadge confidence={f.confidence} />
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-2xl">Untested scope</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {run.untested.map((u) => (
            <li key={u} className="flex gap-2">
              <span className="text-atrisk">·</span>
              {u}
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-2xl">Check executions</h2>
        <div className="mt-4 overflow-x-auto rounded-xl bg-card shadow-[var(--shadow-border)]">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-medium">Check</th>
                <th className="px-4 py-3 font-medium">State</th>
                <th className="px-4 py-3 font-medium">Priority</th>
              </tr>
            </thead>
            <tbody>
              {run.executions.map((e) => (
                <tr key={e.checkId} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-2.5">
                    <span className="font-mono text-[11px] text-muted-foreground">{e.checkId}</span>
                    <span className="mt-0.5 block">{CHECK_BY_ID[e.checkId]?.title}</span>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[11px] uppercase">{e.state.replaceAll("_", " ")}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{CHECK_BY_ID[e.checkId]?.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
          Project {project.name} · {project.repo} · check-pack {run.checkPack} · policy{" "}
          {run.policyVersion}. Automated scoped verification; not a certification or
          penetration test. Fixture data, 28 August 2026.
        </p>
      </div>
      <MarketingFooter />
    </div>
  );
}
