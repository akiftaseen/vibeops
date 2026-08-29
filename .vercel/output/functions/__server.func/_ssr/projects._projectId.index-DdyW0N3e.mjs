import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { l as Route$9 } from "./router-D2jeeffK.mjs";
import { i as GATE_COPY } from "./checks-DqE6cNhJ.mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { i as pct } from "./format-CqqdFjDA.mjs";
import { t as Button } from "./button-a5GAvVqZ.mjs";
import { n as GateBadge, r as SeverityBadge, t as ConfidenceBadge } from "./gate-badge-xKPxZYPG.mjs";
import { n as DimensionGrid, t as CoverageBar } from "./coverage-bar-BMoRyeM5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._projectId.index-DdyW0N3e.js
var import_jsx_runtime = require_jsx_runtime();
function Overview() {
	const { projectId } = Route$9.useParams();
	const project = useAppStore((s) => s.projects.find((p) => p.id === projectId));
	const run = useAppStore((s) => s.runs.find((r) => r.id === project?.latestRunId));
	const blockers = useAppStore((s) => s.findings.filter((f) => f.projectId === projectId && f.status === "open")).filter((f) => f.policyImpact === "blocks");
	if (!project || !run) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "No completed run yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-xl bg-card p-6 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateBadge, {
								gate: run.gate,
								size: "lg"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-base leading-relaxed",
								children: run.gateReason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: GATE_COPY[run.gate].sentence
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageBar, { value: run.conclusiveCoverage }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								"Weighted coverage ",
								pct(run.coverage),
								". Score is subordinate to the gate."
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Blocking findings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/projects/$projectId/issues",
						params: { projectId },
						children: "All issues"
					})
				})]
			}), blockers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "No open blockers on this run."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]",
				children: blockers.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/projects/$projectId/issues/$findingId",
					params: {
						projectId,
						findingId: f.id
					},
					className: "flex flex-col gap-2 px-5 py-4 hover:bg-secondary/40 sm:flex-row sm:items-start sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: f.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: f.affectedSurface
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: f.severity }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBadge, { confidence: f.confidence })]
					})]
				}) }, f.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Dimensions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Hidden below 60% weighted coverage. N/A when the architecture has no applicable checks."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DimensionGrid, { dims: run.dimensionScores })
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Untested scope"
			}), run.untested.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "No residual untested scope recorded."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2 text-sm text-muted-foreground",
				children: run.untested.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["— ", u] }, u))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Architecture"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted-foreground",
					children: project.graph.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/projects/$projectId/architecture",
						params: { projectId },
						children: "Open map"
					})
				})
			] })
		]
	});
}
//#endregion
export { Overview as component };
