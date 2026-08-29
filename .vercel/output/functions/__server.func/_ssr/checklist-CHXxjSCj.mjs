import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { r as DIMENSION_LABELS, t as CHECKS } from "./checks-DqE6cNhJ.mjs";
import { t as Button } from "./button-a5GAvVqZ.mjs";
import { n as MarketingNav, t as MarketingFooter } from "./marketing-nav-CPb7CJIO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checklist-CHXxjSCj.js
var import_jsx_runtime = require_jsx_runtime();
function Checklist() {
	const groups = Object.entries(DIMENSION_LABELS);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl px-4 py-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
						children: "Useful without the product"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-3 text-4xl tracking-tight",
						children: "Launch checklist"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted-foreground",
						children: "The P0 and P1 checks Proofed runs for Next.js / Supabase / Stripe. Use it as a human review list, or run it as a Launch Check and keep the evidence."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app/new",
							children: "Run these as a Launch Check"
						})
					}),
					groups.map(([id, label]) => {
						const items = CHECKS.filter((c) => c.category === id);
						if (!items.length) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]",
								children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "px-5 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-baseline justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-medium",
											children: c.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-[11px] text-muted-foreground",
											children: [
												c.id,
												" · ",
												c.priority,
												" · ",
												c.defaultSeverity
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm leading-relaxed text-muted-foreground",
										children: c.method
									})]
								}, c.id))
							})]
						}, id);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingFooter, {})
		]
	});
}
//#endregion
export { Checklist as component };
