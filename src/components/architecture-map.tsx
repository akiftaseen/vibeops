import { useState } from "react";
import type { ArchitectureGraph, GraphNode } from "@/lib/types";
import { cn } from "@/lib/utils";

const GROUPS: { key: GraphNode["type"][]; label: string }[] = [
  { key: ["application", "route"], label: "Browser" },
  { key: ["handler", "middleware"], label: "Server" },
  { key: ["auth", "role"], label: "Auth" },
  { key: ["table", "rls", "storage", "migration"], label: "Data" },
  { key: ["webhook", "payment", "integration", "env"], label: "Integrations" },
];

export function ArchitectureMap({
  graph,
  highlightIds,
}: {
  graph: ArchitectureGraph;
  highlightIds?: string[];
}) {
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const hi = new Set(highlightIds ?? []);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{graph.summary}</p>
        {GROUPS.map((g) => {
          const nodes = graph.nodes.filter((n) => g.key.includes(n.type));
          if (!nodes.length) return null;
          return (
            <div key={g.label}>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{g.label}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {nodes.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setSelected(n)}
                    className={cn(
                      "rounded-md border px-3 py-2 text-left text-sm transition-colors",
                      selected?.id === n.id
                        ? "border-primary bg-secondary text-foreground"
                        : hi.has(n.id)
                          ? "border-blocked/40 bg-blocked/10"
                          : "border-border bg-card hover:bg-secondary",
                    )}
                  >
                    <span className="block font-medium">{n.label}</span>
                    <span className="mt-0.5 block text-[11px] text-muted-foreground">{n.type}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <aside className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        {selected ? (
          <>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {selected.type} · {selected.confidence}
            </p>
            <h3 className="mt-2 text-base font-medium">{selected.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selected.detail}</p>
            <p className="mt-4 text-[11px] uppercase tracking-wider text-muted-foreground">
              Detection evidence
            </p>
            <p className="mt-1 font-mono text-xs leading-relaxed">{selected.evidence}</p>
            {selected.sensitive ? (
              <p className="mt-4 text-xs text-atrisk">Marked sensitive</p>
            ) : null}
            {selected.public ? (
              <p className="mt-4 text-xs text-muted-foreground">Intentionally public</p>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Select a node to inspect detection evidence. LLM-inferred edges are never promoted
            to detected without a deterministic trace.
          </p>
        )}
      </aside>
    </div>
  );
}
