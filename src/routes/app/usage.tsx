import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { Progress } from "@/components/ui/progress";
import { absTime } from "@/lib/format";

export const Route = createFileRoute("/app/usage")({ component: UsagePage });

function UsagePage() {
  const usage = useAppStore((s) => s.usage);
  const runs = useAppStore((s) => s.runs);
  const rows = [
    { label: "Projects", used: usage.projectsUsed, limit: usage.projectsLimit },
    { label: "Launch Checks", used: usage.checksUsed, limit: usage.checksLimit },
    { label: "Fix attempts", used: usage.fixesUsed, limit: usage.fixesLimit },
  ];
  const spend = runs.reduce((s, r) => s + r.costUsd, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-3xl tracking-tight">Usage</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Studio plan · period ends {absTime(usage.periodEnd)}. Platform failures do not
        consume a check.
      </p>
      <div className="mt-8 space-y-5 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between text-sm">
              <span>{r.label}</span>
              <span className="font-mono tabular-nums">
                {r.used} / {r.limit}
              </span>
            </div>
            <Progress className="mt-2" value={(r.used / r.limit) * 100} />
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
        <p className="text-sm text-muted-foreground">Internal variable cost this period</p>
        <p className="mt-1 font-mono text-2xl tabular-nums">${spend.toFixed(2)}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Target for a standard Launch Check is $0.50–$1.50. Hard budget $3 before graceful
          degradation.
        </p>
      </div>
    </div>
  );
}
