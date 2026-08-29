import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/components/marketing-nav";
import { PaperReport } from "@/components/paper-report";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

const LOOP = [
  { n: "01", t: "Connect a repository", d: "GitHub App, selected repos only. Snapshot is hashed; scan workers never receive write tokens." },
  { n: "02", t: "Model the application", d: "Routes, roles, tables, RLS, Stripe handlers — each node linked to detection evidence." },
  { n: "03", t: "Run bounded checks", d: "Versioned P0 pack for Next.js, Supabase, and Stripe. Sandbox only. Production is not mutated." },
  { n: "04", t: "Show evidence", d: "A finding without cited proof is rejected. Coverage and untested scope stay visible." },
  { n: "05", t: "Fix, then replay", d: "A pull request plus the original check, before and after. Auto-merge is off." },
];

const QUESTIONS = [
  { q: "What was actually checked?", a: "Every applicable check is listed with pass, fail, skipped, or error — never implied." },
  { q: "What failed, with what evidence?", a: "Confirmed blockers include a trace, transcript, or deterministic proof." },
  { q: "What was not checked?", a: "Unknown is a first-class result. Untested scope cannot hide behind a score." },
  { q: "Did the fix remove the failure?", a: "The same check is replayed against the patch. “Patched” is not “fixed.”" },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    note: "Try the loop",
    items: ["1 project", "2 static/build checks / mo", "1 deep Launch Check trial", "7-day evidence", "No fix PR"],
  },
  {
    name: "Builder",
    price: "$39",
    note: "Solo SaaS",
    items: ["1 project", "10 Launch Checks", "5 fix attempts", "30-day evidence", "Monthly scheduled check"],
  },
  {
    name: "Studio",
    price: "$149",
    note: "Agencies",
    featured: true,
    items: ["10 projects", "50 Launch Checks", "25 fix attempts", "5 seats", "Client report export"],
  },
  {
    name: "Team",
    price: "$399",
    note: "Seed-stage",
    items: ["25 projects", "200 Launch Checks", "100 fix attempts", "Policies & audit trail", "Priority support"],
  },
];

function Home() {
  return (
    <div className="min-h-dvh bg-background">
      <MarketingNav />
      <section className="relative overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0 opacity-80" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Launch verification · Next.js / Supabase / Stripe
            </p>
            <h1 className="font-display mt-5 text-[2.6rem] leading-[1.08] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[3.4rem]">
              Before you launch AI-built software,{" "}
              <em className="italic text-primary">make it prove itself.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Connect a repository. Verify auth, data, payments, security, and critical
              flows. Fix launch blockers with pull requests tested against the original
              failure.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <Link to="/app/new">
                  Run a Launch Check
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/sample">View sample report</Link>
              </Button>
            </div>
            <p className="mt-5 max-w-md text-xs leading-relaxed text-muted-foreground">
              No blocking issues were detected within the checks and environments shown
              in a report. We never say your application is safe, secure, or certified.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(232_228_216/0.07),transparent_65%)]" />
            <PaperReport interactive className="rotate-[1.5deg]" />
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">The report</p>
            <h2 className="font-display mt-3 text-3xl tracking-tight">Four questions. No theatre.</h2>
          </div>
          <ol className="space-y-6">
            {QUESTIONS.map((item, i) => (
              <li key={item.q} className="border-t border-border pt-5 first:border-0 first:pt-0">
                <p className="font-mono text-[11px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-base font-medium">{item.q}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">The loop</p>
          <h2 className="font-display mt-3 text-3xl tracking-tight">Connect, model, check, prove, replay.</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-5">
            {LOOP.map((s) => (
              <li key={s.n} className="bg-background p-5">
                <p className="font-mono text-[11px] text-muted-foreground">{s.n}</p>
                <h3 className="mt-3 text-sm font-medium">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Stack depth</p>
            <h2 className="font-display mt-3 text-3xl tracking-tight">
              Built for the apps AI actually ships.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              One maintained pack: Next.js, TypeScript, GitHub, Vercel or a local production
              build, Supabase, and Stripe test mode. Unsupported repositories are explained
              and never billed for a deep run.
            </p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["Auth and tenancy", "Anonymous access, BOLA, admin functions, session cookies, RLS boundaries."],
              ["Payments", "Raw-body signatures, replay, server-side amounts, test/live separation."],
              ["Build and secrets", "Frozen install, production build, client-bundle privileged keys, lockfile CVEs."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
                <h3 className="text-sm font-medium">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Claims we will not make</p>
            <h2 className="font-display mt-3 text-3xl tracking-tight">A scoped verification, not a guarantee.</h2>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              "Your application is safe, secure, bug-free, compliant, or certified",
              "This replaces a penetration test or a security team",
              "Production-grade, automatically",
              "100% of OWASP ASVS, WCAG, or legal privacy",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-muted-foreground">
                <Minus className="mt-0.5 size-4 shrink-0 text-blocked" />
                {t}
              </li>
            ))}
            {[
              "Gate status, coverage, and untested scope on every report",
              "Confirmed findings cite immutable, redacted evidence",
              "Fixes are pull requests. Humans merge.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-ready" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="pricing" className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Pricing</p>
          <h2 className="font-display mt-3 text-3xl tracking-tight">Start with a Launch Check. Scale with the agency.</h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Concierge Launch Audit, $149 — one supported repository, automated run plus a
            45-minute walkthrough, one re-scan in 14 days. Not a pentest.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={
                  p.featured
                    ? "rounded-xl bg-paper p-5 text-paper-fg"
                    : "rounded-xl bg-background p-5 shadow-[var(--shadow-border)]"
                }
              >
                <p className="text-[11px] uppercase tracking-wider opacity-70">{p.note}</p>
                <h3 className="mt-2 font-display text-2xl">{p.name}</h3>
                <p className="mt-1 font-mono text-sm">
                  {p.price}
                  <span className="opacity-60">/mo</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full"
                  variant={p.featured ? "default" : "outline"}
                  asChild
                >
                  <Link to="/app/new">Start</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
