import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { u as cn } from "./router-D2jeeffK.mjs";
import { i as GATE_COPY } from "./checks-DqE6cNhJ.mjs";
import { n as gateTone } from "./format-CqqdFjDA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gate-badge-xKPxZYPG.js
var import_jsx_runtime = require_jsx_runtime();
var toneClass = {
	blocked: "border-blocked/35 bg-blocked/12 text-blocked",
	atrisk: "border-atrisk/35 bg-atrisk/12 text-atrisk",
	ready: "border-ready/35 bg-ready/12 text-ready",
	muted: "border-border bg-secondary text-muted-foreground"
};
function GateBadge({ gate, size = "md", className }) {
	const tone = gateTone(gate);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border font-medium uppercase tracking-wider", toneClass[tone], size === "sm" && "px-2 py-0.5 text-[10px]", size === "md" && "px-2.5 py-1 text-[11px]", size === "lg" && "px-3 py-1.5 text-xs", className),
		children: GATE_COPY[gate].label
	});
}
function SeverityBadge({ severity }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider", toneClass[{
			critical: "blocked",
			high: "atrisk",
			medium: "muted",
			low: "muted",
			info: "muted"
		}[severity]]),
		children: severity
	});
}
function ConfidenceBadge({ confidence }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
		children: confidence === "high" ? "High confidence" : confidence
	});
}
function Stamp({ gate, className }) {
	const tone = gateTone(gate);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("stamp-ring flex size-24 rotate-[-12deg] items-center justify-center rounded-full border-[3px] border-current px-2 text-center font-display text-[11px] font-medium uppercase leading-tight tracking-[0.18em] opacity-90", tone === "blocked" ? "text-blocked" : tone === "ready" ? "text-ready" : tone === "atrisk" ? "text-atrisk" : "text-muted-foreground", className),
		children: GATE_COPY[gate].label
	});
}
//#endregion
export { Stamp as i, GateBadge as n, SeverityBadge as r, ConfidenceBadge as t };
