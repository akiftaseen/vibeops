import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { a as relTime } from "./format-CqqdFjDA.mjs";
import { t as Button } from "./button-a5GAvVqZ.mjs";
import { n as Label, t as Input } from "./label-DJ855J3L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/policies-Cq7pATJN.js
var import_jsx_runtime = require_jsx_runtime();
function PoliciesPage() {
	const policy = useAppStore((s) => s.policy);
	const update = useAppStore((s) => s.updatePolicy);
	const exceptions = useAppStore((s) => s.exceptions);
	const revoke = useAppStore((s) => s.revokeException);
	const findings = useAppStore((s) => s.findings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight",
				children: "Policies"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Editing policy to ignore a result changes the launch decision. It does not fix the issue. Critical secret exposure and confirmed cross-tenant access cannot be excepted in self-serve."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "Default launch policy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-xs text-muted-foreground",
						children: [
							policy.extends,
							"@",
							policy.version
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cov",
							children: "Minimum conclusive coverage"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "cov",
								type: "number",
								min: .5,
								max: 1,
								step: .05,
								value: policy.minimumConclusiveCoverage,
								onChange: (e) => update({ minimumConclusiveCoverage: Number(e.target.value) }),
								className: "w-28"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "0.80 recommended"
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"Block severities: ",
								policy.blockSeverities.join(", "),
								". Confidences:",
								" ",
								policy.blockConfidences.join(", "),
								". Required checks:",
								" ",
								policy.requireChecks.join(", "),
								". Exception max ",
								policy.exceptionMaxDays,
								" days."
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium",
					children: "Exceptions"
				}), exceptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "None recorded."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]",
					children: exceptions.map((ex) => {
						const f = findings.find((x) => x.id === ex.findingId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "px-5 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: f?.title ?? ex.checkId ?? "Scoped exception"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: ex.reason
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										ex.owner,
										" · expires ",
										relTime(ex.expiresAt),
										ex.revokedAt ? " · revoked" : ""
									]
								}),
								!ex.revokedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									className: "mt-2",
									onClick: () => {
										revoke(ex.id);
										toast.message("Exception revoked");
									},
									children: "Revoke"
								}) : null
							]
						}, ex.id);
					})
				})]
			})
		]
	});
}
//#endregion
export { PoliciesPage as component };
