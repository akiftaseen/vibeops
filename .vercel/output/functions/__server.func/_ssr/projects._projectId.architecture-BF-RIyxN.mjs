import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { c as Route$8 } from "./router-D2jeeffK.mjs";
import { t as useAppStore } from "./store-BWerirWE.mjs";
import { t as ArchitectureMap } from "./architecture-map-BI9md4Ow.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._projectId.architecture-BF-RIyxN.js
var import_jsx_runtime = require_jsx_runtime();
function ArchPage() {
	const { projectId } = Route$8.useParams();
	const project = useAppStore((s) => s.projects.find((p) => p.id === projectId));
	if (!project) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: "Architecture"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Corrections create a new annotation. Historical run evidence is never mutated."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchitectureMap, { graph: project.graph })
		})
	] });
}
//#endregion
export { ArchPage as component };
