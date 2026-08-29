import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { i as Plus } from "../_libs/lucide-react.mjs";
import { i as GATE_COPY } from "./checks-DqE6cNhJ.mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { a as relTime, i as pct, o as shortSha } from "./format-CqqdFjDA.mjs";
import { t as Button } from "./button-a5GAvVqZ.mjs";
import { n as GateBadge } from "./gate-badge-xKPxZYPG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-vpPruA2O.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectsPage() {
	const projects = useAppStore((s) => s.projects);
	const runs = useAppStore((s) => s.runs);
	const findings = useAppStore((s) => s.findings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
					children: "Workspace"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-3xl tracking-tight",
					children: "Projects"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app/new",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New Launch Check"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm text-muted-foreground",
				children: "Interactive demo. Four repositories are preloaded from a fixture GitHub App install. Gate status is computed from evidence — a high score cannot override a blocker."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 grid gap-3",
				children: projects.map((p) => {
					const run = runs.find((r) => r.id === p.latestRunId);
					const open = findings.filter((f) => f.projectId === p.id && f.status === "open" && (f.severity === "critical" || f.severity === "high")).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app/projects/$projectId",
						params: { projectId: p.id },
						className: "block rounded-xl bg-card p-5 shadow-[var(--shadow-border)] transition-colors hover:bg-secondary/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-base font-medium",
											children: p.name
										}), run ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateBadge, {
											gate: run.gate,
											size: "sm"
										}) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-[12px] text-muted-foreground",
										children: p.repo
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: p.description
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-4 text-right text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] uppercase tracking-wider text-muted-foreground",
										children: "Coverage"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono tabular-nums",
										children: run ? pct(run.conclusiveCoverage) : "—"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] uppercase tracking-wider text-muted-foreground",
										children: "Open C/H"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono tabular-nums",
										children: open
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] uppercase tracking-wider text-muted-foreground",
										children: "Evidence"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs",
										children: run?.completedAt ? relTime(run.completedAt) : run ? "Running" : "None"
									})] })
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-secondary px-2 py-0.5",
									children: ["Next ", p.stack.next]
								}),
								p.stack.supabase ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-secondary px-2 py-0.5",
									children: "Supabase"
								}) : null,
								p.stack.stripe ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-secondary px-2 py-0.5",
									children: "Stripe"
								}) : null,
								run ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-secondary px-2 py-0.5 font-mono",
									children: shortSha(run.commitSha)
								}) : null,
								run ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: GATE_COPY[run.gate].label
								}) : null
							]
						})]
					}) }, p.id);
				})
			})
		]
	});
}
//#endregion
export { ProjectsPage as component };
