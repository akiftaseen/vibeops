import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as Route, u as cn } from "./router-D2jeeffK.mjs";
import { a as PHASE_LABELS, n as CHECK_BY_ID } from "./checks-DqE6cNhJ.mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { i as pct, o as shortSha, t as absTime } from "./format-CqqdFjDA.mjs";
import { n as GateBadge } from "./gate-badge-xKPxZYPG.mjs";
import { n as DimensionGrid, t as CoverageBar } from "./coverage-bar-BMoRyeM5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._projectId.runs._runId-C5inZbGP.js
var import_jsx_runtime = require_jsx_runtime();
function RunTimeline({ run }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "space-y-0",
		children: run.steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-1 size-2.5 rounded-full", step.state === "done" && "bg-ready", step.state === "running" && "bg-primary animate-pulse", step.state === "error" && "bg-blocked", step.state === "pending" && "bg-border") }), i < run.steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-px flex-1 bg-border" }) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pb-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: step.label
					}),
					step.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm text-muted-foreground",
						children: step.note
					}) : null,
					step.completedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-[11px] text-muted-foreground",
						children: absTime(step.completedAt)
					}) : step.state === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-[11px] text-primary",
						children: "In progress"
					}) : null
				]
			})]
		}, step.phase))
	});
}
function RunDetail() {
	const { projectId, runId } = Route.useParams();
	const run = useAppStore((s) => s.runs.find((r) => r.id === runId));
	if (!run) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Run not found."
	});
	const running = run.state !== "completed" && !run.state.startsWith("failed") && run.state !== "cancelled";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] uppercase tracking-wider text-muted-foreground",
						children: [
							running ? "In progress" : "Completed",
							" · ",
							run.trigger
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-1 text-2xl",
						children: PHASE_LABELS[run.state]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-xs text-muted-foreground",
						children: [
							shortSha(run.commitSha),
							" · ",
							run.checkPack,
							" · ",
							run.policyVersion
						]
					})
				] }), run.state === "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateBadge, {
					gate: run.gate,
					size: "lg"
				}) : null]
			}),
			running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Phase-level progress only. Percent complete is not fabricated."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed",
					children: run.gateReason
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 max-w-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageBar, { value: run.conclusiveCoverage })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-[20rem_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunTimeline, { run }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Check results"
				}), run.executions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "Waiting for analysis to finish."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 overflow-x-auto rounded-xl bg-card shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[28rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-[11px] uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Check"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "State"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "ms"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: run.executions.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/70 last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: e.checkId
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block",
										children: CHECK_BY_ID[e.checkId]?.title
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2 font-mono text-[11px] uppercase",
									children: e.state.replaceAll("_", " ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2 font-mono tabular-nums text-muted-foreground",
									children: e.durationMs
								})
							]
						}, e.checkId)) })]
					})
				})] })]
			}),
			run.state === "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DimensionGrid, { dims: run.dimensionScores }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Started ",
						absTime(run.startedAt),
						run.completedAt ? ` · finished ${absTime(run.completedAt)}` : "",
						" · internal cost $",
						run.costUsd.toFixed(2),
						" · coverage ",
						pct(run.coverage)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/projects/$projectId",
					params: { projectId },
					className: "text-sm text-primary hover:underline",
					children: "Back to overview"
				})
			] }) : null
		]
	});
}
//#endregion
export { RunDetail as component };
