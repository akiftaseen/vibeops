import { b as useParams, d as useRouterState, m as Outlet, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { u as cn } from "./router-D2jeeffK.mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { o as shortSha } from "./format-CqqdFjDA.mjs";
import { t as Button } from "./button-a5GAvVqZ.mjs";
import { n as GateBadge } from "./gate-badge-xKPxZYPG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._projectId-hiw-sRqw.js
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		to: "/app/projects/$projectId",
		label: "Overview",
		id: "overview"
	},
	{
		to: "/app/projects/$projectId/issues",
		label: "Issues",
		id: "issues"
	},
	{
		to: "/app/projects/$projectId/architecture",
		label: "Architecture",
		id: "architecture"
	},
	{
		to: "/app/projects/$projectId/runs",
		label: "Runs",
		id: "runs"
	},
	{
		to: "/app/projects/$projectId/fixes",
		label: "Fixes",
		id: "fixes"
	},
	{
		to: "/app/projects/$projectId/settings",
		label: "Settings",
		id: "settings"
	}
];
function ProjectShell({ children }) {
	const { projectId } = useParams({ strict: false });
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const project = useAppStore((s) => s.projects.find((p) => p.id === projectId));
	const run = useAppStore((s) => s.runs.find((r) => r.id === project?.latestRunId));
	const startRun = useAppStore((s) => s.startRun);
	if (!project) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-4 py-16 text-center text-sm text-muted-foreground",
		children: "Project not found."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4 px-4 py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[12px] text-muted-foreground",
					children: project.repo
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl tracking-tight",
						children: project.name
					}), run ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateBadge, { gate: run.gate }) : null]
				}),
				run ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						shortSha(run.commitSha),
						" · ",
						run.branch,
						" · ",
						run.checkPack
					]
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => {
					const id = startRun(project.id);
					if (id) navigate({
						to: "/app/projects/$projectId/runs/$runId",
						params: {
							projectId: project.id,
							runId: id
						}
					});
				},
				children: "Re-run"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4",
			children: TABS.map((t) => {
				const href = t.to.replace("$projectId", projectId);
				const active = t.id === "overview" ? pathname === href : pathname === href || pathname.startsWith(href + "/");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: t.to,
					params: { projectId },
					className: cn("min-h-11 shrink-0 border-b-2 px-3 py-2 text-sm", active ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"),
					children: t.label
				}, t.id);
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children
	})] });
}
function ProjectLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { ProjectLayout as component };
