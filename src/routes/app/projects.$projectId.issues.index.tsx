import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useAppStore } from "@/lib/store";
import { ConfidenceBadge, SeverityBadge } from "@/components/gate-badge";
import { statusLabel } from "@/lib/format";
import type { FindingStatus, Severity } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/projects/$projectId/issues/")({
  component: IssuesPage,
});

const VIEWS: { id: string; label: string; pred: (s: FindingStatus, blocks: boolean) => boolean }[] = [
  { id: "all", label: "All", pred: () => true },
  { id: "blockers", label: "Blockers", pred: (_s, b) => b },
  { id: "open", label: "Open", pred: (s) => s === "open" },
  { id: "accepted", label: "Accepted risk", pred: (s) => s === "accepted" },
  { id: "resolved", label: "Resolved", pred: (s) => s === "resolved" },
];

function IssuesPage() {
  const { projectId } = Route.useParams();
  const findings = useAppStore((s) => s.findings.filter((f) => f.projectId === projectId));
  const [view, setView] = useState("all");
  const [sev, setSev] = useState<Severity | "all">("all");

  const rows = useMemo(() => {
    const v = VIEWS.find((x) => x.id === view)!;
    return findings
      .filter((f) => v.pred(f.status, f.policyImpact === "blocks"))
      .filter((f) => sev === "all" || f.severity === sev)
      .sort((a, b) => {
        const order = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
        return order[a.severity] - order[b.severity];
      });
  }, [findings, view, sev]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl">Issues</h2>
        <select
          className="h-10 rounded-md border border-border bg-background px-3 text-sm"
          value={sev}
          onChange={(e) => setSev(e.target.value as Severity | "all")}
        >
          <option value="all">All severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
        </select>
      </div>
      <div className="mt-4 flex flex-wrap gap-1">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={cn(
              "min-h-10 rounded-full px-3 text-sm",
              view === v.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
            )}
          >
            {v.label}
          </button>
        ))}
      </div>
      <ul className="mt-4 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]">
        {rows.map((f) => (
          <li key={f.id}>
            <Link
              to="/app/projects/$projectId/issues/$findingId"
              params={{ projectId, findingId: f.id }}
              className="grid gap-2 px-5 py-4 hover:bg-secondary/40 md:grid-cols-[7rem_1fr_8rem_7rem]"
            >
              <div className="flex flex-wrap gap-1.5">
                <SeverityBadge severity={f.severity} />
              </div>
              <div>
                <p className="text-sm font-medium">{f.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.affectedSurface}</p>
              </div>
              <ConfidenceBadge confidence={f.confidence} />
              <p className="text-sm text-muted-foreground">{statusLabel(f.status)}</p>
            </Link>
          </li>
        ))}
        {rows.length === 0 ? (
          <li className="px-5 py-8 text-sm text-muted-foreground">No issues in this view.</li>
        ) : null}
      </ul>
    </div>
  );
}
