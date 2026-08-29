import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { u as cn } from "./router-D2jeeffK.mjs";
import { i as pct } from "./format-CqqdFjDA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coverage-bar-BMoRyeM5.js
var import_jsx_runtime = require_jsx_runtime();
function CoverageBar({ value, label = "Conclusive coverage" }) {
	const tone = value >= .8 ? "bg-ready" : value >= .6 ? "bg-atrisk" : "bg-blocked";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono tabular-nums",
			children: pct(value)
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 h-1.5 overflow-hidden rounded-full bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full", tone),
			style: { width: pct(Math.min(1, value)) }
		})
	})] });
}
function DimensionGrid({ dims }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
		children: dims.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg bg-secondary/50 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-wider text-muted-foreground",
					children: d.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-lg tabular-nums",
					children: d.status === "na" ? "N/A" : d.status === "insufficient" ? "—" : d.score
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] text-muted-foreground",
					children: d.status === "na" ? "Not applicable" : d.status === "insufficient" ? "Insufficient evidence" : `${d.executed}/${d.applicable} executed`
				})
			]
		}, d.id))
	});
}
//#endregion
export { DimensionGrid as n, CoverageBar as t };
