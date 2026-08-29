import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as Minus, d as ArrowRight, l as Check } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-a5GAvVqZ.mjs";
import { n as MarketingNav, t as MarketingFooter } from "./marketing-nav-CPb7CJIO.mjs";
import { t as PaperReport } from "./paper-report-En3P5kYY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-VXeuMqJ3.js
var import_jsx_runtime = require_jsx_runtime();
var LOOP = [
	{
		n: "01",
		t: "Connect a repository",
		d: "GitHub App, selected repos only. Snapshot is hashed; scan workers never receive write tokens."
	},
	{
		n: "02",
		t: "Model the application",
		d: "Routes, roles, tables, RLS, Stripe handlers — each node linked to detection evidence."
	},
	{
		n: "03",
		t: "Run bounded checks",
		d: "Versioned P0 pack for Next.js, Supabase, and Stripe. Sandbox only. Production is not mutated."
	},
	{
		n: "04",
		t: "Show evidence",
		d: "A finding without cited proof is rejected. Coverage and untested scope stay visible."
	},
	{
		n: "05",
		t: "Fix, then replay",
		d: "A pull request plus the original check, before and after. Auto-merge is off."
	}
];
var QUESTIONS = [
	{
		q: "What was actually checked?",
		a: "Every applicable check is listed with pass, fail, skipped, or error — never implied."
	},
	{
		q: "What failed, with what evidence?",
		a: "Confirmed blockers include a trace, transcript, or deterministic proof."
	},
	{
		q: "What was not checked?",
		a: "Unknown is a first-class result. Untested scope cannot hide behind a score."
	},
	{
		q: "Did the fix remove the failure?",
		a: "The same check is replayed against the patch. “Patched” is not “fixed.”"
	}
];
var PLANS = [
	{
		name: "Free",
		price: "$0",
		note: "Try the loop",
		items: [
			"1 project",
			"2 static/build checks / mo",
			"1 deep Launch Check trial",
			"7-day evidence",
			"No fix PR"
		]
	},
	{
		name: "Builder",
		price: "$39",
		note: "Solo SaaS",
		items: [
			"1 project",
			"10 Launch Checks",
			"5 fix attempts",
			"30-day evidence",
			"Monthly scheduled check"
		]
	},
	{
		name: "Studio",
		price: "$149",
		note: "Agencies",
		featured: true,
		items: [
			"10 projects",
			"50 Launch Checks",
			"25 fix attempts",
			"5 seats",
			"Client report export"
		]
	},
	{
		name: "Team",
		price: "$399",
		note: "Seed-stage",
		items: [
			"25 projects",
			"200 Launch Checks",
			"100 fix attempts",
			"Policies & audit trail",
			"Priority support"
		]
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain pointer-events-none absolute inset-0 opacity-80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
							children: "Launch verification · Next.js / Supabase / Stripe"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display mt-5 text-[2.6rem] leading-[1.08] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[3.4rem]",
							children: [
								"Before you launch AI-built software,",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "italic text-primary",
									children: "make it prove itself."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: "Connect a repository. Verify auth, data, payments, security, and critical flows. Fix launch blockers with pull requests tested against the original failure."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/app/new",
									children: ["Run a Launch Check", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/sample",
									children: "View sample report"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-md text-xs leading-relaxed text-muted-foreground",
							children: "No blocking issues were detected within the checks and environments shown in a report. We never say your application is safe, secure, or certified."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-8 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(232_228_216/0.07),transparent_65%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperReport, {
							interactive: true,
							className: "rotate-[1.5deg]"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
						children: "The report"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-3 text-3xl tracking-tight",
						children: "Four questions. No theatre."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-6",
						children: QUESTIONS.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-border pt-5 first:border-0 first:pt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: String(i + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 text-base font-medium",
									children: item.q
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-relaxed text-muted-foreground",
									children: item.a
								})
							]
						}, item.q))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-card/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
							children: "The loop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-3 text-3xl tracking-tight",
							children: "Connect, model, check, prove, replay."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-10 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-5",
							children: LOOP.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "bg-background p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: s.n
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-3 text-sm font-medium",
										children: s.t
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-relaxed text-muted-foreground",
										children: s.d
									})
								]
							}, s.n))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Stack depth"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display mt-3 text-3xl tracking-tight",
								children: "Built for the apps AI actually ships."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-relaxed text-muted-foreground",
								children: "One maintained pack: Next.js, TypeScript, GitHub, Vercel or a local production build, Supabase, and Stripe test mode. Unsupported repositories are explained and never billed for a deep run."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-3 sm:grid-cols-3",
						children: [
							["Auth and tenancy", "Anonymous access, BOLA, admin functions, session cookies, RLS boundaries."],
							["Payments", "Raw-body signatures, replay, server-side amounts, test/live separation."],
							["Build and secrets", "Frozen install, production build, client-bundle privileged keys, lockfile CVEs."]
						].map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium",
								children: t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: d
							})]
						}, t))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
						children: "Claims we will not make"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-3 text-3xl tracking-tight",
						children: "A scoped verification, not a guarantee."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3 text-sm",
						children: [[
							"Your application is safe, secure, bug-free, compliant, or certified",
							"This replaces a penetration test or a security team",
							"Production-grade, automatically",
							"100% of OWASP ASVS, WCAG, or legal privacy"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mt-0.5 size-4 shrink-0 text-blocked" }), t]
						}, t)), [
							"Gate status, coverage, and untested scope on every report",
							"Confirmed findings cite immutable, redacted evidence",
							"Fixes are pull requests. Humans merge."
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-ready" }), t]
						}, t))]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "pricing",
				className: "border-t border-border bg-card/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
							children: "Pricing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-3 text-3xl tracking-tight",
							children: "Start with a Launch Check. Scale with the agency."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-sm text-muted-foreground",
							children: "Concierge Launch Audit, $149 — one supported repository, automated run plus a 45-minute walkthrough, one re-scan in 14 days. Not a pentest."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
							children: PLANS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: p.featured ? "rounded-xl bg-paper p-5 text-paper-fg" : "rounded-xl bg-background p-5 shadow-[var(--shadow-border)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] uppercase tracking-wider opacity-70",
										children: p.note
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 font-display text-2xl",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-mono text-sm",
										children: [p.price, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "opacity-60",
											children: "/mo"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-5 space-y-2 text-sm",
										children: p.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: it }, it))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "mt-6 w-full",
										variant: p.featured ? "default" : "outline",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/app/new",
											children: "Start"
										})
									})
								]
							}, p.name))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingFooter, {})
		]
	});
}
//#endregion
export { Home as component };
