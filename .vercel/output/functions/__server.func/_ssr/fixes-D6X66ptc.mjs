import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { a as relTime } from "./format-CqqdFjDA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fixes-D6X66ptc.js
var import_jsx_runtime = require_jsx_runtime();
function FixesPage() {
	const fixes = useAppStore((s) => s.fixes);
	const findings = useAppStore((s) => s.findings);
	const projects = useAppStore((s) => s.projects);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Fixes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Pull requests only. Auto-merge is off. A patch that fails replay is never published."
			}),
			fixes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-muted-foreground",
				children: "No fix attempts yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]",
				children: fixes.map((f) => {
					const finding = findings.find((x) => x.id === f.findingId);
					const project = projects.find((x) => x.id === f.projectId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "px-5 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: finding?.title ?? f.findingId
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										project?.name,
										" · ",
										f.branch,
										f.prNumber ? ` · PR #${f.prNumber}` : ""
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "capitalize",
										children: f.state.replaceAll("_", " ")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-muted-foreground",
										children: relTime(f.createdAt)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-mono text-[11px] text-muted-foreground",
								children: [
									finding?.checkId,
									" ",
									f.originalBefore,
									" → ",
									f.originalAfter,
									" · ",
									f.verification.replaceAll("_", " ")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/projects/$projectId/fixes",
								params: { projectId: f.projectId },
								className: "mt-2 inline-block text-sm text-primary hover:underline",
								children: "Open project fixes"
							})
						]
					}, f.id);
				})
			})
		]
	});
}
//#endregion
export { FixesPage as component };
