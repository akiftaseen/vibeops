import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { s as Route$7 } from "./router-D2jeeffK.mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { a as relTime } from "./format-CqqdFjDA.mjs";
import { t as Button } from "./button-a5GAvVqZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._projectId.fixes-NsFDhtiI.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectFixes() {
	const { projectId } = Route$7.useParams();
	const fixes = useAppStore((s) => s.fixes.filter((f) => f.projectId === projectId));
	const findings = useAppStore((s) => s.findings);
	const merge = useAppStore((s) => s.mergeFix);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: "Fixes"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Publisher accepts a patch artifact, not model instructions. Humans merge."
		}),
		fixes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "No fix attempts. Open a finding and choose Create Fix PR."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-4",
			children: fixes.map((f) => {
				const finding = findings.find((x) => x.id === f.findingId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: finding?.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-xs text-muted-foreground",
								children: [
									f.branch,
									f.prNumber ? ` · #${f.prNumber}` : "",
									" · ",
									f.riskClass
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm capitalize",
								children: f.state.replaceAll("_", " ")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground",
							children: f.patchSummary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-mono text-[12px]",
							children: [
								"Original check: ",
								f.originalBefore,
								" → ",
								f.originalAfter
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 text-xs text-muted-foreground",
							children: f.relatedChecks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								c.id,
								": ",
								c.result
							] }, c.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								"Files: ",
								f.files.join(", ") || "—",
								" · ",
								relTime(f.createdAt)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: ["Limitations: ", f.limitations]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [finding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/app/projects/$projectId/issues/$findingId",
									params: {
										projectId,
										findingId: finding.id
									},
									children: "Finding"
								})
							}) : null, f.state === "pr_open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => {
									merge(f.id);
									toast.success("Marked merged. Re-run to refresh the gate.");
								},
								children: "Mark merged"
							}) : null]
						})
					]
				}, f.id);
			})
		})
	] });
}
//#endregion
export { ProjectFixes as component };
