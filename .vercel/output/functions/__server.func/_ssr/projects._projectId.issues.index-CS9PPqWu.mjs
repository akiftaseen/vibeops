import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as Route$3, u as cn } from "./router-D2jeeffK.mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { s as statusLabel } from "./format-CqqdFjDA.mjs";
import { r as SeverityBadge, t as ConfidenceBadge } from "./gate-badge-xKPxZYPG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._projectId.issues.index-CS9PPqWu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VIEWS = [
	{
		id: "all",
		label: "All",
		pred: () => true
	},
	{
		id: "blockers",
		label: "Blockers",
		pred: (_s, b) => b
	},
	{
		id: "open",
		label: "Open",
		pred: (s) => s === "open"
	},
	{
		id: "accepted",
		label: "Accepted risk",
		pred: (s) => s === "accepted"
	},
	{
		id: "resolved",
		label: "Resolved",
		pred: (s) => s === "resolved"
	}
];
function IssuesPage() {
	const { projectId } = Route$3.useParams();
	const findings = useAppStore((s) => s.findings.filter((f) => f.projectId === projectId));
	const [view, setView] = (0, import_react.useState)("all");
	const [sev, setSev] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => {
		const v = VIEWS.find((x) => x.id === view);
		return findings.filter((f) => v.pred(f.status, f.policyImpact === "blocks")).filter((f) => sev === "all" || f.severity === sev).sort((a, b) => {
			const order = {
				critical: 0,
				high: 1,
				medium: 2,
				low: 3,
				info: 4
			};
			return order[a.severity] - order[b.severity];
		});
	}, [
		findings,
		view,
		sev
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Issues"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "h-10 rounded-md border border-border bg-background px-3 text-sm",
				value: sev,
				onChange: (e) => setSev(e.target.value),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All severities"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "critical",
						children: "Critical"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "high",
						children: "High"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "medium",
						children: "Medium"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-1",
			children: VIEWS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setView(v.id),
				className: cn("min-h-10 rounded-full px-3 text-sm", view === v.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
				children: v.label
			}, v.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-4 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]",
			children: [rows.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/projects/$projectId/issues/$findingId",
				params: {
					projectId,
					findingId: f.id
				},
				className: "grid gap-2 px-5 py-4 hover:bg-secondary/40 md:grid-cols-[7rem_1fr_8rem_7rem]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: f.severity })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: f.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: f.affectedSurface
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBadge, { confidence: f.confidence }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: statusLabel(f.status)
					})
				]
			}) }, f.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "px-5 py-8 text-sm text-muted-foreground",
				children: "No issues in this view."
			}) : null]
		})
	] });
}
//#endregion
export { IssuesPage as component };
