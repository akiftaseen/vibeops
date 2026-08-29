import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { relTime } from "@/lib/format";

export const Route = createFileRoute("/app/fixes")({ component: FixesPage });

function FixesPage() {
  const fixes = useAppStore((s) => s.fixes);
  const findings = useAppStore((s) => s.findings);
  const projects = useAppStore((s) => s.projects);
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="font-display text-3xl tracking-tight">Fixes</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Pull requests only. Auto-merge is off. A patch that fails replay is never published.
      </p>
      {fixes.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">No fix attempts yet.</p>
      ) : (
        <ul className="mt-6 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]">
          {fixes.map((f) => {
            const finding = findings.find((x) => x.id === f.findingId);
            const project = projects.find((x) => x.id === f.projectId);
            return (
              <li key={f.id} className="px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{finding?.title ?? f.findingId}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project?.name} · {f.branch}
                      {f.prNumber ? ` · PR #${f.prNumber}` : ""}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="capitalize">{f.state.replaceAll("_", " ")}</p>
                    <p className="mt-1 text-muted-foreground">{relTime(f.createdAt)}</p>
                  </div>
                </div>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                  {finding?.checkId} {f.originalBefore} → {f.originalAfter} · {f.verification.replaceAll("_", " ")}
                </p>
                <Link
                  to="/app/projects/$projectId/fixes"
                  params={{ projectId: f.projectId }}
                  className="mt-2 inline-block text-sm text-primary hover:underline"
                >
                  Open project fixes
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
