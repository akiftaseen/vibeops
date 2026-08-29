import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { u as cn } from "./router-D2jeeffK.mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { t as absTime } from "./format-CqqdFjDA.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/usage-BSmMnUCs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-1.5 w-full overflow-hidden rounded-full bg-secondary", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full bg-primary transition-[width] duration-300 ease-out",
		style: { width: `${value ?? 0}%` }
	})
}));
Progress.displayName = Root.displayName;
function UsagePage() {
	const usage = useAppStore((s) => s.usage);
	const runs = useAppStore((s) => s.runs);
	const rows = [
		{
			label: "Projects",
			used: usage.projectsUsed,
			limit: usage.projectsLimit
		},
		{
			label: "Launch Checks",
			used: usage.checksUsed,
			limit: usage.checksLimit
		},
		{
			label: "Fix attempts",
			used: usage.fixesUsed,
			limit: usage.fixesLimit
		}
	];
	const spend = runs.reduce((s, r) => s + r.costUsd, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Usage"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [
					"Studio plan · period ends ",
					absTime(usage.periodEnd),
					". Platform failures do not consume a check."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-5 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]",
				children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono tabular-nums",
						children: [
							r.used,
							" / ",
							r.limit
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					className: "mt-2",
					value: r.used / r.limit * 100
				})] }, r.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Internal variable cost this period"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-2xl tabular-nums",
						children: ["$", spend.toFixed(2)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Target for a standard Launch Check is $0.50–$1.50. Hard budget $3 before graceful degradation."
					})
				]
			})
		]
	});
}
//#endregion
export { UsagePage as component };
