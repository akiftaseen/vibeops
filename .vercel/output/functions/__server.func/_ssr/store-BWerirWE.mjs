import { a as PHASE_LABELS, t as CHECKS } from "./checks-DqE6cNhJ.mjs";
import { a as SEED_FINDINGS, c as SEED_RUNS, d as computeDimensionScores, f as computeGate, i as SEED_EXCEPTIONS, l as USAGE, n as DEFAULT_POLICY, o as SEED_FIXES, s as SEED_PROJECTS, t as CONNECTED_REPOS, u as computeCoverage } from "./demo-data-tx-T0rM1.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-BWerirWE.js
var PHASES = [
	"queued",
	"acquiring",
	"inventorying",
	"analyzing",
	"building",
	"starting",
	"testing",
	"validating",
	"scoring",
	"completed"
];
var PHASE_MS = [
	280,
	520,
	640,
	900,
	1100,
	620,
	1200,
	540,
	420,
	0
];
function nid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
function clone(v) {
	return structuredClone(v);
}
function seedState() {
	return {
		projects: clone(SEED_PROJECTS),
		runs: clone(SEED_RUNS),
		findings: clone(SEED_FINDINGS),
		exceptions: clone(SEED_EXCEPTIONS),
		fixes: clone(SEED_FIXES),
		policy: { ...DEFAULT_POLICY },
		usage: { ...USAGE },
		activeRunId: null
	};
}
function makeSteps() {
	return PHASES.filter((p) => p !== "completed").map((phase) => ({
		phase,
		label: PHASE_LABELS[phase],
		state: "pending"
	}));
}
var useAppStore = create()(persist((set, get) => ({
	...seedState(),
	hydrated: false,
	setHydrated: () => set({ hydrated: true }),
	resetDemo: () => set({
		...seedState(),
		hydrated: true
	}),
	startRun: (projectId, trigger = "manual") => {
		const project = get().projects.find((p) => p.id === projectId);
		if (!project) return "";
		const prev = get().runs.find((r) => r.id === project.latestRunId);
		const runId = nid("run");
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const run = {
			id: runId,
			projectId,
			commitSha: prev?.commitSha ?? "0000000000000000000000000000000000000000",
			commitMessage: "Re-run launch check",
			branch: project.defaultBranch,
			environmentId: project.environments[0]?.id ?? "env-sandbox",
			trigger,
			state: "queued",
			gate: "insufficient_evidence",
			gateReason: "Run in progress.",
			coverage: 0,
			conclusiveCoverage: 0,
			startedAt: now,
			checkPack: "next-supabase-stripe@1.0.0",
			policyVersion: `${get().policy.extends}@${get().policy.version}`,
			steps: makeSteps(),
			executions: [],
			dimensionScores: [],
			untested: prev?.untested ?? [],
			costUsd: 0
		};
		run.steps[0] = {
			...run.steps[0],
			state: "running",
			startedAt: now
		};
		set((s) => ({
			runs: [run, ...s.runs],
			projects: s.projects.map((p) => p.id === projectId ? {
				...p,
				latestRunId: runId
			} : p),
			activeRunId: runId,
			usage: {
				...s.usage,
				checksUsed: Math.min(s.usage.checksLimit, s.usage.checksUsed + 1)
			}
		}));
		scheduleTicks(runId);
		return runId;
	},
	tickRun: (runId) => {
		const run = get().runs.find((r) => r.id === runId);
		if (!run) return;
		const idx = PHASES.indexOf(run.state);
		if (idx < 0 || run.state === "completed") return;
		const next = PHASES[idx + 1];
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const steps = run.steps.map((st) => {
			if (st.phase === run.state) return {
				...st,
				state: "done",
				completedAt: now
			};
			if (st.phase === next && next !== "completed") return {
				...st,
				state: "running",
				startedAt: now
			};
			return st;
		});
		if (next === "completed") {
			get().projects.find((p) => p.id === run.projectId);
			const baseline = get().runs.find((r) => r.projectId === run.projectId && r.id !== runId && r.state === "completed");
			const resolvedIds = new Set(get().findings.filter((f) => f.projectId === run.projectId && (f.status === "resolved" || get().fixes.some((fx) => fx.findingId === f.id && (fx.state === "merged" || fx.verification === "verified_in_sandbox")))).map((f) => f.id));
			const executions = (baseline?.executions ?? CHECKS.filter((c) => c.priority === "P0").map((c) => ({
				checkId: c.id,
				state: "pass",
				durationMs: 800,
				findingIds: [],
				applicability: "Detected"
			}))).map((e) => {
				const stillFail = e.findingIds.some((id) => !resolvedIds.has(id));
				if (e.state === "fail" && !stillFail) return {
					...e,
					state: "pass",
					findingIds: []
				};
				return e;
			});
			const findings = get().findings.filter((f) => f.projectId === run.projectId && f.status === "open" && !resolvedIds.has(f.id));
			const exceptions = get().exceptions.filter((e) => e.projectId === run.projectId);
			const dims = computeDimensionScores(executions, findings);
			const cov = computeCoverage(executions);
			const gate = computeGate({
				executions,
				findings,
				exceptions,
				policy: get().policy
			});
			set((s) => ({
				activeRunId: s.activeRunId === runId ? null : s.activeRunId,
				runs: s.runs.map((r) => r.id === runId ? {
					...r,
					state: "completed",
					completedAt: now,
					steps,
					executions,
					dimensionScores: dims,
					coverage: cov.coverage,
					conclusiveCoverage: cov.conclusiveCoverage,
					gate: gate.gate,
					gateReason: gate.reason,
					untested: baseline?.untested ?? r.untested,
					costUsd: .62 + Math.random() * .5,
					commitMessage: r.commitMessage,
					commitSha: r.commitSha
				} : r),
				findings: s.findings.map((f) => resolvedIds.has(f.id) ? {
					...f,
					status: "resolved",
					lastSeen: now
				} : f)
			}));
			return;
		}
		set((s) => ({ runs: s.runs.map((r) => r.id === runId ? {
			...r,
			state: next,
			steps
		} : r) }));
		scheduleTicks(runId);
	},
	createProjectFromRepo: (draft) => {
		const repo = CONNECTED_REPOS.find((r) => r.id === draft.repoId);
		if (!repo) return "";
		const existing = get().projects.find((p) => p.repo === repo.fullName);
		if (existing) return get().startRun(existing.id, "intake");
		const template = repo.template === "blocked" ? "p-northstar" : repo.template === "ready" ? "p-atelier" : repo.template === "at_risk" ? "p-harbor" : "p-folio";
		const src = get().projects.find((p) => p.id === template) ?? SEED_PROJECTS[0];
		const id = nid("p");
		const srcFindings = get().findings.filter((f) => f.projectId === src.id);
		const idMap = /* @__PURE__ */ new Map();
		const findings = srcFindings.map((f) => {
			const nextId = nid("f");
			idMap.set(f.id, nextId);
			return {
				...clone(f),
				id: nextId,
				projectId: id,
				runId: ""
			};
		});
		const srcRun = get().runs.find((r) => r.id === src.latestRunId);
		const baseRunId = nid("run-base");
		const clonedRun = srcRun ? {
			...clone(srcRun),
			id: baseRunId,
			projectId: id,
			trigger: "intake",
			executions: srcRun.executions.map((e) => ({
				...e,
				findingIds: e.findingIds.map((fid) => idMap.get(fid) ?? fid)
			}))
		} : null;
		const project = {
			...clone(src),
			id,
			name: repo.fullName.split("/")[1] ?? repo.fullName,
			repo: repo.fullName,
			purpose: draft.purpose || src.purpose,
			dataSensitivity: draft.dataSensitivity,
			payments: draft.payments,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			latestRunId: clonedRun?.id
		};
		set((s) => ({
			projects: [project, ...s.projects],
			findings: [...findings.map((f) => ({
				...f,
				runId: clonedRun?.id ?? f.runId
			})), ...s.findings],
			runs: clonedRun ? [clonedRun, ...s.runs] : s.runs,
			usage: {
				...s.usage,
				projectsUsed: s.usage.projectsUsed + 1
			}
		}));
		return get().startRun(id, "intake");
	},
	createFix: (findingId) => {
		const finding = get().findings.find((f) => f.id === findingId);
		if (!finding) return "";
		const id = nid("fix");
		const attempt = {
			id,
			projectId: finding.projectId,
			findingId,
			state: "preparing",
			verification: "not_attempted",
			branch: `proofed/fix-${finding.checkId.toLowerCase()}`,
			files: finding.locations.map((l) => l.path),
			patchSummary: finding.remediation,
			originalBefore: "FAIL",
			originalAfter: "—",
			relatedChecks: [{
				id: "BUILD-002",
				result: "pending"
			}],
			limitations: "Sandbox replay only. Human review required. Auto-merge is off.",
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			riskClass: finding.fixEligibility
		};
		set((s) => ({
			fixes: [attempt, ...s.fixes],
			usage: {
				...s.usage,
				fixesUsed: Math.min(s.usage.fixesLimit, s.usage.fixesUsed + 1)
			}
		}));
		window.setTimeout(() => get().advanceFix(id), 900);
		return id;
	},
	advanceFix: (fixId) => {
		const fix = get().fixes.find((f) => f.id === fixId);
		if (!fix) return;
		if (fix.state === "preparing") {
			const finding = get().findings.find((f) => f.id === fix.findingId);
			const blocked = finding?.fixEligibility === "prohibited";
			set((s) => ({ fixes: s.fixes.map((f) => f.id === fixId ? blocked ? {
				...f,
				state: "verification_failed",
				verification: "fix_generation_failed",
				originalAfter: "FAIL",
				limitations: "This class of change is prohibited for automatic patches. Instructions only."
			} : {
				...f,
				state: "pr_open",
				verification: "verified_in_sandbox",
				originalAfter: "PASS",
				prNumber: 100 + Math.floor(Math.random() * 80),
				relatedChecks: [{
					id: finding?.checkId ?? "CHECK",
					result: "PASS"
				}, {
					id: "BUILD-002",
					result: "PASS"
				}]
			} : f) }));
		}
	},
	mergeFix: (fixId) => {
		const fix = get().fixes.find((f) => f.id === fixId);
		if (!fix) return;
		set((s) => ({
			fixes: s.fixes.map((f) => f.id === fixId ? {
				...f,
				state: "merged",
				verification: "verified_on_pr_commit"
			} : f),
			findings: s.findings.map((f) => f.id === fix.findingId ? {
				...f,
				status: "resolved"
			} : f)
		}));
	},
	setFindingStatus: (id, status) => set((s) => ({ findings: s.findings.map((f) => f.id === id ? {
		...f,
		status
	} : f) })),
	addException: (ex) => set((s) => ({ exceptions: [{
		...ex,
		id: nid("ex"),
		startsAt: (/* @__PURE__ */ new Date()).toISOString()
	}, ...s.exceptions] })),
	revokeException: (id) => set((s) => ({ exceptions: s.exceptions.map((e) => e.id === id ? {
		...e,
		revokedAt: (/* @__PURE__ */ new Date()).toISOString()
	} : e) })),
	updatePolicy: (patch) => set((s) => ({ policy: {
		...s.policy,
		...patch
	} }))
}), {
	name: "proofed-demo-v1",
	partialize: (s) => ({
		projects: s.projects,
		runs: s.runs,
		findings: s.findings,
		exceptions: s.exceptions,
		fixes: s.fixes,
		policy: s.policy,
		usage: s.usage
	}),
	onRehydrateStorage: () => (state) => {
		state?.setHydrated();
	}
}));
var timers = /* @__PURE__ */ new Map();
function scheduleTicks(runId) {
	const existing = timers.get(runId);
	if (existing) window.clearTimeout(existing);
	const run = useAppStore.getState().runs.find((r) => r.id === runId);
	if (!run || run.state === "completed") return;
	const wait = PHASE_MS[PHASES.indexOf(run.state)] ?? 400;
	const t = window.setTimeout(() => {
		useAppStore.getState().tickRun(runId);
	}, wait);
	timers.set(runId, t);
}
//#endregion
export { useAppStore as t };
