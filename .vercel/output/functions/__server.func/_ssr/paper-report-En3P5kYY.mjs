import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { u as cn } from "./router-D2jeeffK.mjs";
import { i as GATE_COPY } from "./checks-DqE6cNhJ.mjs";
import { a as SEED_FINDINGS, c as SEED_RUNS, s as SEED_PROJECTS } from "./demo-data-tx-T0rM1.mjs";
import { i as pct, o as shortSha } from "./format-CqqdFjDA.mjs";
import { i as Stamp } from "./gate-badge-xKPxZYPG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/paper-report-En3P5kYY.js
var import_jsx_runtime = require_jsx_runtime();
var project = SEED_PROJECTS[0];
var run = SEED_RUNS[0];
var blockers = SEED_FINDINGS.filter((f) => f.projectId === "p-northstar" && f.policyImpact === "blocks").slice(0, 4);
function PaperReport({ className, interactive = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("paper-sheet relative overflow-hidden rounded-sm p-6 text-paper-fg shadow-[0_24px_80px_-24px_rgb(0_0_0_/_0.55)] sm:p-8", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.22em] text-paper-muted",
						children: "Proofed · Launch Check"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display mt-2 text-2xl leading-tight",
						children: project.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-[11px] text-paper-muted",
						children: [
							project.repo,
							" · ",
							shortSha(run.commitSha),
							" · sandbox"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, {
					gate: run.gate,
					className: "size-20 text-[9px] sm:size-24 sm:text-[11px]"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-prose text-sm leading-relaxed text-paper-fg/85",
				children: GATE_COPY[run.gate].sentence
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 grid grid-cols-3 gap-3 border-y border-paper-fg/10 py-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[10px] uppercase tracking-wider text-paper-muted",
						children: "Coverage"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-mono text-sm tabular-nums",
						children: pct(run.conclusiveCoverage)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[10px] uppercase tracking-wider text-paper-muted",
						children: "Blockers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-mono text-sm tabular-nums",
						children: blockers.length
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[10px] uppercase tracking-wider text-paper-muted",
						children: "Pack"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-mono text-[11px]",
						children: "next-supabase-stripe"
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-5 space-y-3",
				children: blockers.map((f, i) => {
					const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] text-paper-muted",
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm leading-snug",
							children: f.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-paper-muted",
							children: [
								f.checkId,
								" · ",
								f.confidence,
								" · ",
								f.severity
							]
						})]
					})] });
					return interactive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/projects/$projectId/issues/$findingId",
						params: {
							projectId: "p-northstar",
							findingId: f.id
						},
						className: "flex gap-3 rounded-sm py-1 hover:bg-paper-fg/5",
						children: inner
					}) }, f.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "flex gap-3",
						children: inner
					}, f.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 border-t border-paper-fg/10 pt-4 text-[11px] leading-relaxed text-paper-muted",
				children: "No blocking issues were detected within the checks and environments shown in this report — except the failures listed. Automated scoped verification; not a certification or penetration test."
			})
		]
	});
}
//#endregion
export { PaperReport as t };
