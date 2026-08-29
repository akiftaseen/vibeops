import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Route$2, u as cn } from "./router-D2jeeffK.mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { r as hashPreview, s as statusLabel, t as absTime } from "./format-CqqdFjDA.mjs";
import { t as Button } from "./button-a5GAvVqZ.mjs";
import { r as SeverityBadge, t as ConfidenceBadge } from "./gate-badge-xKPxZYPG.mjs";
import { n as Label, t as Input } from "./label-DJ855J3L.mjs";
import { t as Textarea } from "./textarea-Cl9gD4T6.mjs";
import { t as ArchitectureMap } from "./architecture-map-BI9md4Ow.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._projectId.issues._findingId-PDSZss5w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-10 items-center gap-1 rounded-lg bg-secondary p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-[var(--shadow-border)] disabled:pointer-events-none disabled:opacity-50", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-4 outline-none", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function IssueDetail() {
	const { projectId, findingId } = Route$2.useParams();
	const finding = useAppStore((s) => s.findings.find((f) => f.id === findingId));
	const project = useAppStore((s) => s.projects.find((p) => p.id === projectId));
	const createFix = useAppStore((s) => s.createFix);
	const setStatus = useAppStore((s) => s.setFindingStatus);
	const addException = useAppStore((s) => s.addException);
	const navigate = useNavigate();
	const [reason, setReason] = (0, import_react.useState)("");
	const [control, setControl] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	if (!finding || !project) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Finding not found."
	});
	const issue = finding;
	const canExcept = issue.severity !== "critical" || issue.checkId !== "SECRET-002" && issue.checkId !== "AUTHZ-002" && issue.checkId !== "SUPA-001";
	function copyBrief() {
		const text = [
			`Fix brief for ${issue.checkId}`,
			issue.title,
			"",
			issue.summary,
			"",
			"Impact:",
			issue.impact,
			"",
			"Remediation:",
			issue.remediation,
			"",
			"Reproduce:",
			...issue.reproduce.map((s, i) => `${i + 1}. ${s}`),
			"",
			"Do not invent evidence. Replay the original check after the patch."
		].join("\n");
		navigator.clipboard.writeText(text);
		setCopied(true);
		toast.success("Fix brief copied");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/app/projects/$projectId/issues",
			params: { projectId },
			className: "text-sm text-muted-foreground hover:text-foreground",
			children: "← Issues"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: finding.severity }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBadge, { confidence: finding.confidence }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground",
								children: statusLabel(finding.status)
							}),
							finding.policyImpact === "blocks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-blocked/30 bg-blocked/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-blocked",
								children: "Blocks launch"
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-3 text-3xl tracking-tight",
						children: finding.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-xs text-muted-foreground",
						children: [
							finding.checkId,
							" · ",
							finding.affectedSurface
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [finding.fixEligibility !== "none" && finding.fixEligibility !== "prohibited" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						const id = createFix(finding.id);
						toast.message("Fix sandbox started", { description: "Replay runs in a fresh boundary." });
						if (id) window.setTimeout(() => {
							navigate({
								to: "/app/projects/$projectId/fixes",
								params: { projectId }
							});
						}, 1200);
					},
					children: "Create Fix PR"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: copyBrief,
					children: copied ? "Copied" : "Generate fix brief"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: copyBrief,
					children: "Copy brief"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "summary",
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "flex h-auto w-full flex-wrap justify-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "summary",
							children: "Summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "evidence",
							children: "Evidence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "reproduce",
							children: "Reproduce"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "architecture",
							children: "Architecture"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "fix",
							children: "Fix"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "history",
							children: "History"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "summary",
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-prose text-sm leading-relaxed",
							children: finding.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Business impact"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-prose text-sm leading-relaxed text-muted-foreground",
							children: finding.impact
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Locations"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1 font-mono text-xs",
							children: finding.locations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-muted-foreground",
								children: "No file location — graph/config finding."
							}) : finding.locations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								l.path,
								":",
								l.startLine,
								"–",
								l.endLine,
								l.symbol ? ` · ${l.symbol}` : ""
							] }, `${l.path}:${l.startLine}`))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Standards"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: finding.standards.join(" · ") || "—"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "evidence",
					className: "space-y-4",
					children: finding.evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-medium",
									children: e.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: [
										e.tool,
										" ",
										e.toolVersion,
										" · ",
										e.kind.replaceAll("_", " ")
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid gap-3 text-sm sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-wider text-ready",
									children: "What this proves"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 leading-relaxed text-muted-foreground",
									children: e.proves
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-wider text-muted-foreground",
									children: "What this does not prove"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 leading-relaxed text-muted-foreground",
									children: e.doesNotProve
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: cn("mt-4 overflow-x-auto rounded-lg bg-ink p-4 font-mono text-[12px] leading-relaxed text-paper"),
								children: e.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-mono text-[10px] text-muted-foreground",
								children: [
									e.id,
									" · ",
									hashPreview(e.sha256),
									" · redaction v2 · ",
									absTime(e.capturedAt)
								]
							})
						]
					}, e.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "reproduce",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "max-w-prose list-decimal space-y-2 pl-5 text-sm leading-relaxed",
						children: finding.reproduce.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: "Reproduction is bounded to the sandbox or verified preview. Do not run these steps against production."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "architecture",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureMap, {
						graph: project.graph,
						highlightIds: finding.graphNodeIds
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "fix",
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: ["Eligibility: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "capitalize",
								children: finding.fixEligibility
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: finding.fixRiskNote
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-prose text-sm leading-relaxed",
							children: finding.remediation
						}),
						finding.fixEligibility === "prohibited" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-atrisk",
							children: "Automatic action is prohibited. Instructions only — no patch will be generated."
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "history",
					className: "space-y-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"First seen ",
							absTime(finding.firstSeen),
							" · Last seen ",
							absTime(finding.lastSeen)
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							children: [
								"Fingerprint ",
								finding.fingerprint,
								" — stable across refactors; line numbers are not part of identity."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setStatus(finding.id, "disputed"),
								children: "Dispute"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setStatus(finding.id, "not_relevant"),
								children: "Not relevant"
							})]
						}),
						canExcept && finding.status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-4 space-y-3 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
							onSubmit: (e) => {
								e.preventDefault();
								addException({
									projectId,
									findingId: finding.id,
									owner: "Maya Chen",
									reason,
									compensatingControl: control,
									expiresAt: new Date(Date.now() + 12096e5).toISOString()
								});
								setStatus(finding.id, "accepted");
								toast.success("Temporary exception recorded");
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-medium",
									children: "Accept temporarily"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Maximum 30 days. Expiry reopens the violation."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "reason",
										children: "Reason"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "reason",
										value: reason,
										onChange: (e) => setReason(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "ctrl",
										children: "Compensating control"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "ctrl",
										value: control,
										onChange: (e) => setControl(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									children: "Record exception"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "This finding cannot be excepted in self-serve, or it is no longer open."
						})
					]
				})
			]
		})
	] });
}
//#endregion
export { IssueDetail as component };
