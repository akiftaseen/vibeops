import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { a as relTime, i as pct, o as shortSha } from "./format-CqqdFjDA.mjs";
import { n as GateBadge } from "./gate-badge-xKPxZYPG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/runs-Ca5OowpT.js
var import_jsx_runtime = require_jsx_runtime();
function RunsPage() {
	const runs = useAppStore((s) => s.runs);
	const projects = useAppStore((s) => s.projects);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Runs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Every run is bound to a commit SHA, check-pack version, and policy version."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]",
				children: runs.map((r) => {
					const p = projects.find((x) => x.id === r.projectId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app/projects/$projectId/runs/$runId",
						params: {
							projectId: r.projectId,
							runId: r.id
						},
						className: "flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-secondary/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: p?.name ?? r.projectId
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-[12px] text-muted-foreground",
							children: [
								shortSha(r.commitSha),
								" · ",
								r.branch,
								" · ",
								r.trigger
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateBadge, {
									gate: r.gate,
									size: "sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono tabular-nums text-muted-foreground",
									children: pct(r.conclusiveCoverage)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: r.completedAt ? relTime(r.completedAt) : r.state
								})
							]
						})]
					}) }, r.id);
				})
			})
		]
	});
}
//#endregion
export { RunsPage as component };
