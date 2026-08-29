import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingFooter, MarketingNav } from "@/components/marketing-nav";
import { CHECKS } from "@/lib/checks";
import { DIMENSION_LABELS } from "@/lib/types";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checklist")({ component: Checklist });

function Checklist() {
  const groups = Object.entries(DIMENSION_LABELS);
  return (
    <div className="min-h-dvh bg-background">
      <MarketingNav />
      <div className="mx-auto max-w-3xl px-4 py-14">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Useful without the product
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight">Launch checklist</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The P0 and P1 checks Proofed runs for Next.js / Supabase / Stripe. Use it as a
          human review list, or run it as a Launch Check and keep the evidence.
        </p>
        <Button className="mt-6" asChild>
          <Link to="/app/new">Run these as a Launch Check</Link>
        </Button>

        {groups.map(([id, label]) => {
          const items = CHECKS.filter((c) => c.category === id);
          if (!items.length) return null;
          return (
            <section key={id} className="mt-12">
              <h2 className="font-display text-2xl">{label}</h2>
              <ul className="mt-4 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]">
                {items.map((c) => (
                  <li key={c.id} className="px-5 py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-medium">{c.title}</h3>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        {c.id} · {c.priority} · {c.defaultSeverity}
                      </p>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.method}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <MarketingFooter />
    </div>
  );
}
