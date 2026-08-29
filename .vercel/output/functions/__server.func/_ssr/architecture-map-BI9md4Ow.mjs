import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { u as cn } from "./router-D2jeeffK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/architecture-map-BI9md4Ow.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GROUPS = [
	{
		key: ["application", "route"],
		label: "Browser"
	},
	{
		key: ["handler", "middleware"],
		label: "Server"
	},
	{
		key: ["auth", "role"],
		label: "Auth"
	},
	{
		key: [
			"table",
			"rls",
			"storage",
			"migration"
		],
		label: "Data"
	},
	{
		key: [
			"webhook",
			"payment",
			"integration",
			"env"
		],
		label: "Integrations"
	}
];
function ArchitectureMap({ graph, highlightIds }) {
	const [selected, setSelected] = (0, import_react.useState)(null);
	const hi = new Set(highlightIds ?? []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1fr_18rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children: graph.summary
			}), GROUPS.map((g) => {
				const nodes = graph.nodes.filter((n) => g.key.includes(n.type));
				if (!nodes.length) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-wider text-muted-foreground",
					children: g.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: nodes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSelected(n),
						className: cn("rounded-md border px-3 py-2 text-left text-sm transition-colors", selected?.id === n.id ? "border-primary bg-secondary text-foreground" : hi.has(n.id) ? "border-blocked/40 bg-blocked/10" : "border-border bg-card hover:bg-secondary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: n.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-[11px] text-muted-foreground",
							children: n.type
						})]
					}, n.id))
				})] }, g.label);
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
			children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] uppercase tracking-wider text-muted-foreground",
					children: [
						selected.type,
						" · ",
						selected.confidence
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 text-base font-medium",
					children: selected.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted-foreground",
					children: selected.detail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[11px] uppercase tracking-wider text-muted-foreground",
					children: "Detection evidence"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-xs leading-relaxed",
					children: selected.evidence
				}),
				selected.sensitive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-atrisk",
					children: "Marked sensitive"
				}) : null,
				selected.public ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					children: "Intentionally public"
				}) : null
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Select a node to inspect detection evidence. LLM-inferred edges are never promoted to detected without a deterministic trace."
			})
		})]
	});
}
//#endregion
export { ArchitectureMap as t };
