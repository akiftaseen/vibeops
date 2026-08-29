import { pct } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { DimensionScore } from "@/lib/types";

export function CoverageBar({
  value,
  label = "Conclusive coverage",
}: {
  value: number;
  label?: string;
}) {
  const tone = value >= 0.8 ? "bg-ready" : value >= 0.6 ? "bg-atrisk" : "bg-blocked";
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono tabular-nums">{pct(value)}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div className={cn("h-full rounded-full", tone)} style={{ width: pct(Math.min(1, value)) }} />
      </div>
    </div>
  );
}

export function DimensionGrid({ dims }: { dims: DimensionScore[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {dims.map((d) => (
        <div key={d.id} className="rounded-lg bg-secondary/50 p-3">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{d.label}</p>
          <p className="mt-2 font-mono text-lg tabular-nums">
            {d.status === "na" ? "N/A" : d.status === "insufficient" ? "—" : d.score}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {d.status === "na"
              ? "Not applicable"
              : d.status === "insufficient"
                ? "Insufficient evidence"
                : `${d.executed}/${d.applicable} executed`}
          </p>
        </div>
      ))}
    </div>
  );
}
