import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { r as Route$1 } from "./router-D2jeeffK.mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { a as relTime, i as pct, o as shortSha } from "./format-CqqdFjDA.mjs";
import { n as GateBadge } from "./gate-badge-xKPxZYPG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._projectId.runs.index-yizOgkDS.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectRuns() {
	const { projectId } = Route$1.useParams();
	const runs = useAppStore((s) => s.runs.filter((r) => r.projectId === projectId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-2xl",
		children: "Run history"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]",
		children: runs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/app/projects/$projectId/runs/$runId",
			params: {
				projectId,
				runId: r.id
			},
			className: "flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-secondary/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-sm",
				children: shortSha(r.commitSha)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: r.commitMessage
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateBadge, {
						gate: r.gate,
						size: "sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono tabular-nums",
						children: pct(r.conclusiveCoverage)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: r.completedAt ? relTime(r.completedAt) : r.state.replaceAll("_", " ")
					})
				]
			})]
		}) }, r.id))
	})] });
}
//#endregion
export { ProjectRuns as component };
