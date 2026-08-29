import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { relTime } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/app/projects/$projectId/fixes")({
  component: ProjectFixes,
});

function ProjectFixes() {
  const { projectId } = Route.useParams();
  const fixes = useAppStore((s) => s.fixes.filter((f) => f.projectId === projectId));
  const findings = useAppStore((s) => s.findings);
  const merge = useAppStore((s) => s.mergeFix);

  return (
    <div>
      <h2 className="font-display text-2xl">Fixes</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Publisher accepts a patch artifact, not model instructions. Humans merge.
      </p>
      {fixes.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          No fix attempts. Open a finding and choose Create Fix PR.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {fixes.map((f) => {
            const finding = findings.find((x) => x.id === f.findingId);
            return (
              <li key={f.id} className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{finding?.title}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {f.branch}
                      {f.prNumber ? ` · #${f.prNumber}` : ""} · {f.riskClass}
                    </p>
                  </div>
                  <p className="text-sm capitalize">{f.state.replaceAll("_", " ")}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.patchSummary}</p>
                <p className="mt-3 font-mono text-[12px]">
                  Original check: {f.originalBefore} → {f.originalAfter}
                </p>
                <ul className="mt-2 text-xs text-muted-foreground">
                  {f.relatedChecks.map((c) => (
                    <li key={c.id}>
                      {c.id}: {c.result}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Files: {f.files.join(", ") || "—"} · {relTime(f.createdAt)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Limitations: {f.limitations}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {finding ? (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        to="/app/projects/$projectId/issues/$findingId"
                        params={{ projectId, findingId: finding.id }}
                      >
                        Finding
                      </Link>
                    </Button>
                  ) : null}
                  {f.state === "pr_open" ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        merge(f.id);
                        toast.success("Marked merged. Re-run to refresh the gate.");
                      }}
                    >
                      Mark merged
                    </Button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
