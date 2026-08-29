import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime, n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { l as Check } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { u as cn } from "./router-D2jeeffK.mjs";
import { t as CONNECTED_REPOS } from "./demo-data-tx-T0rM1.mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { t as Button } from "./button-a5GAvVqZ.mjs";
import { n as Label, t as Input } from "./label-DJ855J3L.mjs";
import { t as Textarea } from "./textarea-Cl9gD4T6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-Bo2slRi5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("peer size-4 shrink-0 rounded-sm border border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: "flex items-center justify-center text-current",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var STEPS = [
	"Repository",
	"Stack",
	"Scope",
	"Environment",
	"Flows",
	"Review"
];
var DEFAULT = {
	repoId: "r1",
	purpose: "Paid workspace for agencies managing client work and invoices.",
	dataSensitivity: "sensitive",
	payments: "live_planned",
	environment: "sandbox",
	previewUrl: "",
	flows: [
		"Signup / login / logout",
		"Create primary object",
		"Checkout test flow"
	],
	attested: false
};
function IntakePage() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [draft, setDraft] = (0, import_react.useState)(DEFAULT);
	const navigate = useNavigate();
	const create = useAppStore((s) => s.createProjectFromRepo);
	const repo = CONNECTED_REPOS.find((r) => r.id === draft.repoId);
	const canNext = (0, import_react.useMemo)(() => {
		if (step === 0) return Boolean(draft.repoId);
		if (step === 5) return draft.attested;
		return true;
	}, [step, draft]);
	function go() {
		if (step < STEPS.length - 1) {
			setStep((s) => s + 1);
			return;
		}
		if (repo?.template === "unsupported") {
			toast.message("Unsupported stack", { description: "Firebase + Vite is outside the Next.js pack. No deep run was billed." });
			return;
		}
		const runId = create(draft);
		const project = useAppStore.getState().projects.find((p) => useAppStore.getState().runs.some((r) => r.id === runId && r.projectId === p.id));
		if (project) {
			toast.success("Launch Check started");
			navigate({
				to: "/app/projects/$projectId/runs/$runId",
				params: {
					projectId: project.id,
					runId
				}
			});
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
				children: "New project"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-1 text-3xl tracking-tight",
				children: "Launch Check intake"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Each question unlocks a specific check family. A static/build scan needs no extra config; authorization and payment checks ask only when they apply."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 flex gap-2 overflow-x-auto pb-2",
				children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: cn("shrink-0 rounded-full px-3 py-1 text-[11px] uppercase tracking-wider", i === step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
					children: s
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]",
				children: [
					step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-medium",
								children: "Select a repository"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Only repositories granted to the GitHub App are listed."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: CONNECTED_REPOS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setDraft((d) => ({
										...d,
										repoId: r.id
									})),
									className: cn("flex w-full items-start justify-between rounded-lg border px-4 py-3 text-left", draft.repoId === r.id ? "border-primary bg-secondary" : "border-border hover:bg-secondary/50"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-mono text-sm",
										children: r.fullName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-sm text-muted-foreground",
										children: r.description
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] uppercase tracking-wider text-muted-foreground",
										children: r.stackHint
									})]
								}) }, r.id))
							})
						]
					}),
					step === 1 && repo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-medium",
							children: "Detected stack"
						}),
						repo.template === "unsupported" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-atrisk",
							children: "Partially outside the contract: Vite + Firebase. Static secrets may still run; a deep Launch Check will not be billed."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "Fully supported for the next-supabase-stripe pack. Deeper checks unlock if you add test personas and a sandbox or verified preview."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 grid grid-cols-2 gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Framework"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: repo.stackHint })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Default branch"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-mono",
									children: repo.defaultBranch
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Visibility"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: repo.private ? "Private" : "Public" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Support"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: repo.template === "unsupported" ? "Unsupported" : "Fully supported" })] })
							]
						})
					] }),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-medium",
								children: "Launch scope"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "purpose",
										children: "App purpose"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "purpose",
										value: draft.purpose,
										onChange: (e) => setDraft((d) => ({
											...d,
											purpose: e.target.value
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Used to rank which flows matter, not to invent findings."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "text-sm font-medium",
									children: "Data sensitivity"
								}), [
									"none",
									"basic",
									"sensitive"
								].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex min-h-11 items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "sens",
										checked: draft.dataSensitivity === v,
										onChange: () => setDraft((d) => ({
											...d,
											dataSensitivity: v
										}))
									}), v === "none" ? "None" : v === "basic" ? "Basic personal" : "Sensitive"]
								}, v))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "text-sm font-medium",
									children: "Payments"
								}), [
									"none",
									"test",
									"live_planned"
								].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex min-h-11 items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "pay",
										checked: draft.payments === v,
										onChange: () => setDraft((d) => ({
											...d,
											payments: v
										}))
									}), v === "none" ? "None" : v === "test" ? "Stripe test mode" : "Live payments planned"]
								}, v))]
							})
						]
					}),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-medium",
								children: "Environment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Active tests run in a Proofed sandbox or an explicitly authorized preview. Production hostnames refuse mutation, replay, and brute-force."
							}),
							["sandbox", "preview"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-start gap-3 rounded-lg border border-border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "env",
									className: "mt-1",
									checked: draft.environment === v,
									onChange: () => setDraft((d) => ({
										...d,
										environment: v
									}))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-medium",
									children: v === "sandbox" ? "Proofed sandbox" : "Verified preview URL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: v === "sandbox" ? "Disposable, default-deny egress, synthetic secrets." : "Ownership challenge required. Production-like names are refused."
								})] })]
							}, v)),
							draft.environment === "preview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "url",
									children: "Preview URL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "url",
									placeholder: "https://your-app-git-main.vercel.app",
									value: draft.previewUrl,
									onChange: (e) => setDraft((d) => ({
										...d,
										previewUrl: e.target.value
									}))
								})]
							}) : null
						]
					}),
					step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-medium",
								children: "Critical journeys"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Templates for this stack. Remove anything unsafe. You can edit later."
							}),
							[
								"Signup / login / logout",
								"Create primary object",
								"Checkout test flow"
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-center gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: draft.flows.includes(f),
									onCheckedChange: (c) => setDraft((d) => ({
										...d,
										flows: c ? [...d.flows, f] : d.flows.filter((x) => x !== f)
									}))
								}), f]
							}, f))
						]
					}),
					step === 5 && repo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-medium",
								children: "Review and attest"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "grid grid-cols-2 gap-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Repository"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-mono",
										children: repo.fullName
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Target"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: draft.environment })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Active tests"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: draft.environment === "sandbox" ? "Enabled" : "Preview only if verified" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Est. time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "8–15 min" })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Data mutation is limited to synthetic fixtures in the sandbox. No live Stripe charges. No production database writes."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-start gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: draft.attested,
									onCheckedChange: (c) => setDraft((d) => ({
										...d,
										attested: Boolean(c)
									})),
									className: "mt-0.5"
								}), "I own or am authorized to test this repository and target. I will not point Proofed at a third-party production system."]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							disabled: step === 0,
							onClick: () => setStep((s) => s - 1),
							children: "Back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: go,
							disabled: !canNext,
							children: step === STEPS.length - 1 ? "Start Launch Check" : "Continue"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { IntakePage as component };
