import { a as PHASE_LABELS, n as CHECK_BY_ID, r as DIMENSION_LABELS } from "./checks-DqE6cNhJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/demo-data-tx-T0rM1.js
var DEFAULT_POLICY = {
	version: "1.0.0",
	extends: "proofed/default-launch",
	minimumConclusiveCoverage: .8,
	blockSeverities: ["critical"],
	blockConfidences: ["confirmed", "high"],
	requireChecks: [
		"BUILD-002",
		"AUTHZ-001",
		"SUPA-001",
		"PAY-001"
	],
	exceptionMaxDays: 30
};
var OUTCOME_FACTOR = {
	pass: 1,
	advisory: .8,
	probable: .6,
	high: .15,
	confirmed: 0
};
function isExecuted(state) {
	return state === "pass" || state === "fail" || state === "inconclusive";
}
function isConclusive(state) {
	return state === "pass" || state === "fail";
}
function computeCoverage(executions) {
	const applicable = executions.filter((e) => e.state !== "not_applicable");
	const executed = applicable.filter((e) => isExecuted(e.state));
	const conclusive = applicable.filter((e) => isConclusive(e.state));
	const weightOf = (list) => list.reduce((sum, e) => sum + (CHECK_BY_ID[e.checkId]?.weight ?? 0), 0);
	const denom = weightOf(applicable) || 1;
	return {
		coverage: weightOf(executed) / denom,
		conclusiveCoverage: weightOf(conclusive) / denom,
		applicableCount: applicable.length,
		executedCount: executed.length
	};
}
function computeDimensionScores(executions, findings) {
	return Object.keys(DIMENSION_LABELS).map((id) => {
		const applicable = executions.filter((e) => CHECK_BY_ID[e.checkId]?.category === id).filter((e) => e.state !== "not_applicable");
		if (applicable.length === 0) return {
			id,
			label: DIMENSION_LABELS[id],
			score: null,
			coverage: 0,
			status: "na",
			executed: 0,
			applicable: 0
		};
		const executed = applicable.filter((e) => isExecuted(e.state));
		const conclusive = applicable.filter((e) => isConclusive(e.state));
		const weightOf = (list) => list.reduce((sum, e) => sum + (CHECK_BY_ID[e.checkId]?.weight ?? 0), 0);
		const coverage = weightOf(executed) / (weightOf(applicable) || 1);
		if (coverage < .6) return {
			id,
			label: DIMENSION_LABELS[id],
			score: null,
			coverage,
			status: "insufficient",
			executed: executed.length,
			applicable: applicable.length
		};
		let num = 0;
		let den = 0;
		for (const e of conclusive) {
			const w = CHECK_BY_ID[e.checkId]?.weight ?? 0;
			den += w;
			if (e.state === "pass") num += w * 1;
			else {
				const f = findings.find((x) => e.findingIds.includes(x.id));
				const factor = f?.confidence === "confirmed" ? OUTCOME_FACTOR.confirmed : f?.confidence === "high" ? OUTCOME_FACTOR.high : f?.confidence === "probable" ? OUTCOME_FACTOR.probable : f?.confidence === "advisory" ? OUTCOME_FACTOR.advisory : 0;
				num += w * factor;
			}
		}
		return {
			id,
			label: DIMENSION_LABELS[id],
			score: den === 0 ? null : Math.round(100 * num / den),
			coverage,
			status: "scored",
			executed: executed.length,
			applicable: applicable.length
		};
	});
}
function findingIsExcepted(f, exceptions, now = Date.now()) {
	return exceptions.some((ex) => !ex.revokedAt && new Date(ex.expiresAt).getTime() > now && (ex.findingId === f.id || ex.checkId === f.checkId));
}
function computeGate(args) {
	const policy = args.policy ?? DEFAULT_POLICY;
	const { executions, findings, exceptions } = args;
	const { conclusiveCoverage } = computeCoverage(executions);
	const vibeopsError = executions.some((e) => e.state === "error_vibeops");
	const requiredMissing = policy.requireChecks.filter((id) => {
		const ex = executions.find((e) => e.checkId === id);
		return !ex || !isConclusive(ex.state) && ex.state !== "not_applicable";
	});
	const open = findings.filter((f) => f.status === "open" && !findingIsExcepted(f, exceptions));
	const blockingCritical = open.filter((f) => f.severity === "critical" && (f.confidence === "confirmed" || f.confidence === "high"));
	const blockingHigh = open.filter((f) => f.severity === "high" && (f.confidence === "confirmed" || f.confidence === "high") && (f.category === "auth" || f.category === "data" || f.category === "payments"));
	const build002 = executions.find((e) => e.checkId === "BUILD-002");
	const p0Incomplete = executions.filter((e) => {
		const def = CHECK_BY_ID[e.checkId];
		if (!def || def.priority !== "P0") return false;
		if (e.state === "not_applicable") return false;
		if (isConclusive(e.state)) return false;
		return !exceptions.some((ex) => ex.checkId === e.checkId && !ex.revokedAt && new Date(ex.expiresAt).getTime() > Date.now());
	});
	if (blockingCritical.length > 0) return {
		gate: "blocked",
		reason: `${blockingCritical[0].title} (${blockingCritical[0].checkId}) failed with ${blockingCritical[0].confidence} evidence.`
	};
	if (blockingHigh.length > 0) return {
		gate: "blocked",
		reason: `${blockingHigh[0].title} is a confirmed/high ${blockingHigh[0].category} failure.`
	};
	if (build002 && build002.state !== "pass" && build002.state !== "not_applicable") return {
		gate: "blocked",
		reason: "Production build (BUILD-002) did not pass."
	};
	const activeExceptions = exceptions.filter((ex) => !ex.revokedAt && new Date(ex.expiresAt).getTime() > Date.now());
	if (conclusiveCoverage < .6 || requiredMissing.length > 2) return {
		gate: "insufficient_evidence",
		reason: `Conclusive coverage is ${Math.round(conclusiveCoverage * 100)}%. A readiness judgment needs at least 80% of applicable weighted checks.`
	};
	if (p0Incomplete.length > 0 || conclusiveCoverage < policy.minimumConclusiveCoverage || vibeopsError || requiredMissing.length > 0 || open.some((f) => f.severity === "high" && f.confidence === "confirmed")) {
		const bits = [];
		if (conclusiveCoverage < policy.minimumConclusiveCoverage) bits.push(`conclusive coverage ${Math.round(conclusiveCoverage * 100)}% is below ${Math.round(policy.minimumConclusiveCoverage * 100)}%`);
		if (p0Incomplete.length) bits.push(`${p0Incomplete.length} required P0 checks did not complete`);
		if (requiredMissing.length) bits.push(`required checks incomplete: ${requiredMissing.join(", ")}`);
		if (vibeopsError) bits.push("a platform error reduced coverage");
		return {
			gate: "at_risk",
			reason: bits.join("; ") || "Important failures or incomplete coverage remain."
		};
	}
	if (activeExceptions.length > 0) return {
		gate: "ready_with_exceptions",
		reason: `${activeExceptions.length} time-bounded exception${activeExceptions.length === 1 ? "" : "s"} remain on the launch policy.`
	};
	return {
		gate: "ready_for_tested_scope",
		reason: "All blocking rules passed and minimum coverage was reached for the declared launch scope."
	};
}
var T0 = Date.now();
var ago = (hours) => (/* @__PURE__ */ new Date(T0 - hours * 36e5)).toISOString();
var iso = (hoursFromNow) => new Date(T0 + hoursFromNow * 36e5).toISOString();
var COMMIT = "a7c91e2b4f8d3c6a1e90b5d4c2f7a8e1b3c4d5e6";
function steps(completed) {
	const phases = [
		"queued",
		"acquiring",
		"inventorying",
		"analyzing",
		"building",
		"starting",
		"testing",
		"validating",
		"scoring"
	];
	const notes = {
		queued: "Run accepted. No customer code executed.",
		acquiring: "Immutable snapshot hashed. GitHub token destroyed after fetch.",
		inventorying: "Next.js App Router, Supabase, Stripe detected. Network off.",
		analyzing: "Secrets, lockfile, AST, migrations, webhook handlers.",
		building: "pnpm install --frozen-lockfile && next build. Registry egress only.",
		starting: "Production server on loopback. Lease-scoped test secrets.",
		testing: "Two-persona auth, webhook replay, Playwright journeys.",
		validating: "Critic rejected 2 naming-only candidates. Evidence hashed.",
		scoring: "Default launch policy v1.0.0 applied."
	};
	return phases.map((phase, i) => ({
		phase,
		label: PHASE_LABELS[phase],
		state: completed ? "done" : i === 0 ? "done" : "pending",
		startedAt: completed ? ago(3.4 - i * .22) : void 0,
		completedAt: completed ? ago(3.3 - i * .22) : void 0,
		note: notes[phase]
	}));
}
var northstarGraph = {
	summary: "Next.js 15 App Router application with Supabase Auth/Postgres/Storage and Stripe Checkout plus subscription webhooks.",
	nodes: [
		{
			id: "app",
			type: "application",
			label: "northstar",
			detail: "Next.js 15.4 · Node 22 · pnpm",
			confidence: "detected",
			evidence: "package.json, next.config.ts, pnpm-lock.yaml"
		},
		{
			id: "r-home",
			type: "route",
			label: "/",
			detail: "Marketing home",
			confidence: "detected",
			evidence: "app/page.tsx",
			public: true
		},
		{
			id: "r-pricing",
			type: "route",
			label: "/pricing",
			detail: "Plan picker",
			confidence: "detected",
			evidence: "app/pricing/page.tsx",
			public: true
		},
		{
			id: "r-dash",
			type: "route",
			label: "/dashboard",
			detail: "Authenticated workspace",
			confidence: "detected",
			evidence: "app/dashboard/page.tsx",
			sensitive: true
		},
		{
			id: "r-proj",
			type: "route",
			label: "/projects/[id]",
			detail: "Project workspace",
			confidence: "detected",
			evidence: "app/projects/[id]/page.tsx",
			sensitive: true
		},
		{
			id: "r-admin",
			type: "route",
			label: "/admin",
			detail: "Staff console",
			confidence: "detected",
			evidence: "app/admin/page.tsx",
			sensitive: true
		},
		{
			id: "h-checkout",
			type: "handler",
			label: "POST /api/checkout",
			detail: "Creates Stripe Checkout session",
			confidence: "detected",
			evidence: "app/api/checkout/route.ts",
			sensitive: true
		},
		{
			id: "h-webhook",
			type: "handler",
			label: "POST /api/stripe/webhook",
			detail: "Subscription fulfillment",
			confidence: "detected",
			evidence: "app/api/stripe/webhook/route.ts",
			sensitive: true
		},
		{
			id: "h-proj",
			type: "handler",
			label: "GET /api/projects/[id]",
			detail: "Returns project JSON",
			confidence: "detected",
			evidence: "app/api/projects/[id]/route.ts",
			sensitive: true
		},
		{
			id: "h-admin",
			type: "handler",
			label: "GET /api/admin/users",
			detail: "Lists all users",
			confidence: "detected",
			evidence: "app/api/admin/users/route.ts",
			sensitive: true
		},
		{
			id: "mw",
			type: "middleware",
			label: "middleware.ts",
			detail: "Cookie presence check only",
			confidence: "detected",
			evidence: "middleware.ts"
		},
		{
			id: "auth",
			type: "auth",
			label: "Supabase Auth",
			detail: "Email magic link + password",
			confidence: "detected",
			evidence: "lib/supabase/client.ts"
		},
		{
			id: "role-anon",
			type: "role",
			label: "anonymous",
			detail: "Unauthenticated visitor",
			confidence: "detected",
			evidence: "middleware matcher + RLS roles"
		},
		{
			id: "role-user",
			type: "role",
			label: "authenticated",
			detail: "Org member",
			confidence: "detected",
			evidence: "auth.uid() in policies"
		},
		{
			id: "role-admin",
			type: "role",
			label: "admin",
			detail: "profiles.role = admin",
			confidence: "inferred",
			evidence: "app/admin/page.tsx reads profiles.role"
		},
		{
			id: "t-profiles",
			type: "table",
			label: "profiles",
			detail: "id, email, role, org_id",
			confidence: "detected",
			evidence: "supabase/migrations/0001_init.sql"
		},
		{
			id: "t-projects",
			type: "table",
			label: "projects",
			detail: "id, owner_id, name, data",
			confidence: "detected",
			evidence: "supabase/migrations/0001_init.sql",
			sensitive: true
		},
		{
			id: "t-invoices",
			type: "table",
			label: "invoices",
			detail: "id, org_id, amount, stripe_id",
			confidence: "detected",
			evidence: "supabase/migrations/0004_invoices.sql",
			sensitive: true
		},
		{
			id: "t-subs",
			type: "table",
			label: "subscriptions",
			detail: "org_id, status, price_id",
			confidence: "detected",
			evidence: "supabase/migrations/0003_billing.sql",
			sensitive: true
		},
		{
			id: "rls-proj",
			type: "rls",
			label: "projects RLS",
			detail: "USING (owner_id = auth.uid()) — missing org members",
			confidence: "detected",
			evidence: "0001_init.sql:88"
		},
		{
			id: "rls-inv",
			type: "rls",
			label: "invoices RLS",
			detail: "RLS not enabled",
			confidence: "detected",
			evidence: "0004_invoices.sql — no ENABLE ROW LEVEL SECURITY"
		},
		{
			id: "stor",
			type: "storage",
			label: "avatars",
			detail: "public bucket",
			confidence: "detected",
			evidence: "0002_storage.sql"
		},
		{
			id: "mig",
			type: "migration",
			label: "0005_cleanup.sql",
			detail: "DROP TABLE invoices",
			confidence: "detected",
			evidence: "supabase/migrations/0005_cleanup.sql"
		},
		{
			id: "wh",
			type: "webhook",
			label: "customer.subscription.*",
			detail: "Unsigned JSON body",
			confidence: "detected",
			evidence: "app/api/stripe/webhook/route.ts"
		},
		{
			id: "pay",
			type: "payment",
			label: "Stripe Checkout",
			detail: "amount_cents from request body",
			confidence: "detected",
			evidence: "app/api/checkout/route.ts"
		},
		{
			id: "env-sr",
			type: "env",
			label: "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE",
			detail: "Privileged key exposed to browser",
			confidence: "detected",
			evidence: "lib/supabase/admin.ts imported from client component"
		},
		{
			id: "int-resend",
			type: "integration",
			label: "Resend",
			detail: "Transactional email",
			confidence: "detected",
			evidence: "lib/email.ts"
		}
	],
	edges: [
		{
			id: "e1",
			from: "r-dash",
			to: "auth",
			type: "authenticates_with",
			confidence: "detected"
		},
		{
			id: "e2",
			from: "h-proj",
			to: "t-projects",
			type: "reads_from",
			confidence: "detected"
		},
		{
			id: "e3",
			from: "h-admin",
			to: "t-profiles",
			type: "reads_from",
			confidence: "detected"
		},
		{
			id: "e4",
			from: "h-webhook",
			to: "t-subs",
			type: "writes_to",
			confidence: "detected"
		},
		{
			id: "e5",
			from: "h-checkout",
			to: "pay",
			type: "calls",
			confidence: "detected"
		},
		{
			id: "e6",
			from: "r-admin",
			to: "role-admin",
			type: "authorizes_role",
			confidence: "inferred"
		},
		{
			id: "e7",
			from: "t-projects",
			to: "rls-proj",
			type: "protected_by_policy",
			confidence: "detected"
		},
		{
			id: "e8",
			from: "t-invoices",
			to: "rls-inv",
			type: "protected_by_policy",
			confidence: "detected"
		},
		{
			id: "e9",
			from: "h-webhook",
			to: "wh",
			type: "receives_webhook_from",
			confidence: "detected"
		},
		{
			id: "e10",
			from: "env-sr",
			to: "r-dash",
			type: "exposes_to_client",
			confidence: "detected"
		},
		{
			id: "e11",
			from: "mig",
			to: "t-invoices",
			type: "writes_to",
			confidence: "detected"
		},
		{
			id: "e12",
			from: "mw",
			to: "r-dash",
			type: "calls",
			confidence: "detected"
		}
	]
};
function ev(id, kind, title, tool, proves, doesNotProve, body, language) {
	return {
		id,
		kind,
		title,
		tool,
		toolVersion: "1.2.0",
		capturedAt: ago(3.1),
		sha256: `sha256:${id}${"a".repeat(56)}`.slice(0, 71),
		proves,
		doesNotProve,
		body,
		language
	};
}
var northstarFindings = [
	{
		id: "f-secret-002",
		fingerprint: "secret.client_bundle.supabase_service_role",
		projectId: "p-northstar",
		runId: "run-northstar-3",
		checkId: "SECRET-002",
		title: "Supabase service-role key is present in the client bundle",
		summary: "The production browser bundle contains a privileged Supabase service-role key. Anyone who loads the app can mint requests that bypass row-level security.",
		category: "security",
		severity: "critical",
		confidence: "confirmed",
		status: "open",
		impact: "An attacker can read and modify every row in Postgres, including invoices and other organizations’ projects. Supabase documents that the service-role key bypasses RLS.",
		affectedSurface: "Client bundle · NEXT_PUBLIC_SUPABASE_SERVICE_ROLE",
		locations: [{
			path: "lib/supabase/admin.ts",
			startLine: 3,
			endLine: 9,
			symbol: "createAdminClient"
		}, {
			path: "components/ProjectList.tsx",
			startLine: 1,
			endLine: 4,
			symbol: "ProjectList"
		}],
		graphNodeIds: [
			"env-sr",
			"r-dash",
			"t-projects",
			"t-invoices"
		],
		evidence: [
			ev("ev-sr-1", "file_excerpt", "Client component imports the admin client", "proofed-graph", "A file marked 'use client' imports a module that constructs a service-role client from a NEXT_PUBLIC_ variable.", "That the key is valid against the live project — we do not probe customer credentials.", `'use client'\nimport { createAdminClient } from '@/lib/supabase/admin'\n\nexport function ProjectList() {\n  const supabase = createAdminClient()\n  // ...\n}`, "tsx"),
			ev("ev-sr-2", "file_excerpt", "Admin client reads a public env name", "proofed-graph", "createClient is called with process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE. Next.js inlines NEXT_PUBLIC_ values into the browser bundle.", "Other secrets that are not referenced from client modules.", `import { createClient } from '@supabase/supabase-js'\n\nexport function createAdminClient() {\n  return createClient(\n    process.env.NEXT_PUBLIC_SUPABASE_URL!,\n    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE!,\n  )\n}`, "ts"),
			ev("ev-sr-3", "bundle_match", "Emitted client chunk contains the privileged pattern", "proofed-bundle-scan", "The match is present in a compiled client artifact (chunks/2397-*.js), not only in source.", "That the value is a live production key. The value is redacted; only the first/last safe characters are stored.", `chunk  chunks/2397-a7c91e.js\nmatch  sb_secret_****************************7a2c  (redacted)\nkind   supabase_service_role\nsource NEXT_PUBLIC_SUPABASE_SERVICE_ROLE`, "text")
		],
		reproduce: [
			"Open the production build’s client chunk listed in evidence ev-sr-3.",
			"Search for the redacted fingerprint of NEXT_PUBLIC_SUPABASE_SERVICE_ROLE.",
			"The privileged pattern is present in an asset served to the browser."
		],
		remediation: "Move the service-role client to a server-only module. Use the anon key plus RLS in the browser. Rename the env var so it is not NEXT_PUBLIC_. Rotate the exposed key.",
		fixEligibility: "contextual",
		fixRiskNote: "Patch rewires the client import and adds a server-only guard. Key rotation is instructions-only.",
		standards: ["OWASP-ASVS-2.6.3", "OWASP-API-2"],
		firstSeen: ago(26),
		lastSeen: ago(3),
		policyImpact: "blocks"
	},
	{
		id: "f-authz-002",
		fingerprint: "authz.bola.projects_id",
		projectId: "p-northstar",
		runId: "run-northstar-3",
		checkId: "AUTHZ-002",
		title: "User B can read User A’s project through GET /api/projects/[id]",
		summary: "Object-level authorization is missing on the project API. A second authenticated persona retrieved another user’s project JSON, including its private brief.",
		category: "auth",
		severity: "critical",
		confidence: "confirmed",
		status: "open",
		impact: "Any signed-in user who can guess or enumerate a project id can read another tenant’s work product. Combined with the client service-role key, they can also write.",
		affectedSurface: "GET /api/projects/[id]",
		locations: [{
			path: "app/api/projects/[id]/route.ts",
			startLine: 8,
			endLine: 22,
			symbol: "GET"
		}],
		graphNodeIds: [
			"h-proj",
			"t-projects",
			"role-user"
		],
		evidence: [ev("ev-bola-1", "file_excerpt", "Handler looks up by id with no owner predicate", "proofed-ast", "The query filters only on id. There is no auth.uid() or owner_id comparison in this handler.", "That every project route is equally unprotected — only this handler was exercised.", `export async function GET(_req: Request, { params }: { params: { id: string } }) {\n  const { data } = await supabase\n    .from('projects')\n    .select('*')\n    .eq('id', params.id)\n    .single()\n  return Response.json(data)\n}`, "ts"), ev("ev-bola-2", "http_transcript", "Two-persona replay", "proofed-http", "User A created project prj_8f2. User B, with a different session, received HTTP 200 and the same document body.", "Write/delete authorization. Those paths were not in this check.", `Persona A  POST /api/projects  →  201  { id: "prj_8f2", name: "Atlas rebrand" }\nPersona B  GET  /api/projects/prj_8f2\n           cookie: sb-access-token=eyJ…REDACTED\n           →  200  { id: "prj_8f2", name: "Atlas rebrand", brief: "Client: Northwind. Budget $84k. …" }\n\nAssertion  body.owner_id !== persona_b.id  AND  status === 200  → FAIL`, "http")],
		reproduce: [
			"Sign in as persona A and create a project. Note its id.",
			"Sign in as persona B in a fresh browser context.",
			"GET /api/projects/{id-from-A}. Observe 200 and A’s document, not 403/404."
		],
		remediation: "Filter by owner or membership in the query, and enforce the same predicate in RLS. Return 404 for cross-tenant ids. Add a regression test with two personas.",
		fixEligibility: "high-risk",
		fixRiskNote: "Authorization patches are assisted. Proofed will not present the PR as certain without a replay of the two-persona test.",
		standards: ["OWASP-ASVS-4.2.1", "OWASP-API-1"],
		firstSeen: ago(26),
		lastSeen: ago(3),
		policyImpact: "blocks"
	},
	{
		id: "f-authz-003",
		fingerprint: "authz.admin.users_list",
		projectId: "p-northstar",
		runId: "run-northstar-3",
		checkId: "AUTHZ-003",
		title: "Ordinary user can list every account at /api/admin/users",
		summary: "The admin users endpoint returns the full profile table to a non-admin session. Middleware only checks that a cookie exists.",
		category: "auth",
		severity: "critical",
		confidence: "confirmed",
		status: "open",
		impact: "Account enumeration and PII disclosure (email, role, org) for the entire tenant population.",
		affectedSurface: "GET /api/admin/users",
		locations: [{
			path: "app/api/admin/users/route.ts",
			startLine: 1,
			endLine: 18,
			symbol: "GET"
		}, {
			path: "middleware.ts",
			startLine: 6,
			endLine: 16,
			symbol: "middleware"
		}],
		graphNodeIds: [
			"h-admin",
			"mw",
			"role-admin",
			"t-profiles"
		],
		evidence: [ev("ev-adm-1", "http_transcript", "Ordinary persona vs admin persona", "proofed-http", "Persona user_a (role=member) received 200 and 48 profile rows, matching the admin persona’s payload size.", "That the UI /admin page is reachable — this evidence is the API.", `Persona user_a  GET /api/admin/users  →  200  (48 rows)\nPersona admin    GET /api/admin/users  →  200  (48 rows)\nPersona anon     GET /api/admin/users  →  401\n\nExpected user_a → 403   Observed → 200`, "http"), ev("ev-adm-2", "file_excerpt", "Middleware treats any cookie as authorization", "proofed-ast", "The matcher covers /admin and /api/admin but the body only tests cookie presence, not role.", "Other routes outside the matcher.", `export function middleware(req: NextRequest) {\n  const token = req.cookies.get('sb-access-token')\n  if (!token) return NextResponse.redirect(new URL('/login', req.url))\n  return NextResponse.next()\n}`, "ts")],
		reproduce: [
			"Authenticate as a member (not admin).",
			"GET /api/admin/users.",
			"Confirm 200 and a list of emails that are not the caller’s."
		],
		remediation: "Check profiles.role (or a server-side claim) inside the route handler. Do not rely on middleware cookie presence. Deny by default.",
		fixEligibility: "contextual",
		fixRiskNote: "Requires a correct admin claim source. Expanded verification will replay both personas.",
		standards: ["OWASP-ASVS-4.1.2", "OWASP-API-5"],
		firstSeen: ago(26),
		lastSeen: ago(3),
		policyImpact: "blocks"
	},
	{
		id: "f-supa-002",
		fingerprint: "supa.rls.disabled.invoices",
		projectId: "p-northstar",
		runId: "run-northstar-3",
		checkId: "SUPA-002",
		title: "RLS is not enabled on invoices",
		summary: "The invoices table is reachable from the browser client and has no row-level security. Combined with the anon key, any authenticated role can SELECT the full table.",
		category: "data",
		severity: "critical",
		confidence: "high",
		status: "open",
		impact: "Invoice amounts, customer names, and Stripe ids are readable across tenants if the table is queried from the client.",
		affectedSurface: "Postgres table invoices",
		locations: [{
			path: "supabase/migrations/0004_invoices.sql",
			startLine: 1,
			endLine: 18
		}],
		graphNodeIds: ["t-invoices", "rls-inv"],
		evidence: [ev("ev-rls-1", "file_excerpt", "Migration creates invoices without ENABLE ROW LEVEL SECURITY", "proofed-sql", "The table is created and GRANTed to authenticated. No ALTER TABLE … ENABLE ROW LEVEL SECURITY appears in any later migration.", "Live data contents of the customer database. Confirmation on a disposable schema only.", `create table public.invoices (\n  id uuid primary key default gen_random_uuid(),\n  org_id uuid not null,\n  amount integer not null,\n  stripe_id text,\n  created_at timestamptz default now()\n);\n\ngrant select, insert, update on public.invoices to authenticated;\n-- no ENABLE ROW LEVEL SECURITY`, "sql")],
		reproduce: [
			"In a disposable schema, apply the migrations.",
			"As role authenticated, SELECT * FROM invoices belonging to another org_id.",
			"Rows are returned because RLS is off."
		],
		remediation: "ALTER TABLE invoices ENABLE ROW LEVEL SECURITY; add USING (org_id = auth.jwt()->>'org_id') policies for select/insert/update. Revoke table grants that are broader than the policies.",
		fixEligibility: "high-risk",
		fixRiskNote: "RLS changes are assisted. A two-persona database test is required before the PR is marked verified.",
		standards: ["OWASP-ASVS-4.2.2"],
		firstSeen: ago(26),
		lastSeen: ago(3),
		policyImpact: "blocks"
	},
	{
		id: "f-pay-001",
		fingerprint: "pay.webhook.no_raw_signature",
		projectId: "p-northstar",
		runId: "run-northstar-3",
		checkId: "PAY-001",
		title: "Stripe webhook verifies a parsed JSON body, not the raw payload",
		summary: "The handler JSON-parses the request before constructEvent. Stripe requires the raw signed payload. Forged events are accepted in the sandbox fixture.",
		category: "payments",
		severity: "critical",
		confidence: "confirmed",
		status: "open",
		impact: "An attacker who can reach the webhook URL can grant entitlements without a real Stripe event. Stripe will also fail legitimate signatures in production if the body is re-serialized.",
		affectedSurface: "POST /api/stripe/webhook",
		locations: [{
			path: "app/api/stripe/webhook/route.ts",
			startLine: 6,
			endLine: 28,
			symbol: "POST"
		}],
		graphNodeIds: [
			"h-webhook",
			"wh",
			"t-subs"
		],
		evidence: [ev("ev-pay1-1", "ast_trace", "constructEvent is called on parsed JSON", "proofed-ast", "Control flow: await req.json() → JSON.stringify(json) → stripe.webhooks.constructEvent. The raw bytes are discarded.", "That the production Stripe endpoint is currently being abused.", `POST\n  └─ const json = await req.json()\n       └─ stripe.webhooks.constructEvent(\n            JSON.stringify(json),   // not raw body\n            sig,\n            process.env.STRIPE_WEBHOOK_SECRET\n          )`, "text"), ev("ev-pay1-2", "test_assertion", "Unsigned fixture is accepted", "proofed-stripe-replay", "A locally crafted customer.subscription.updated payload with an invalid signature returned 200 and inserted a subscriptions row.", "Live Stripe delivery. Active tests never call live Stripe.", `POST /api/stripe/webhook\nStripe-Signature: t=0,v1=deadbeef\nbody: { "type": "customer.subscription.updated", "id": "evt_fake", … }\n\n→ 200 { ok: true }\nDB  subscriptions  +1 row  status=active\nExpected  400 signature_verification_failed`, "http")],
		reproduce: [
			"Disable body parsing (or read req.text()).",
			"POST a payload with a junk Stripe-Signature header.",
			"Observe 200 and a new subscriptions row instead of 400."
		],
		remediation: "Read the raw body (req.text() / buffer). Pass that string to constructEvent. Return 400 on signature failure before any writes.",
		fixEligibility: "contextual",
		fixRiskNote: "Mechanical-looking but payment-path. Replay of valid and invalid signed fixtures is required.",
		standards: ["OWASP-ASVS-13.2.5", "OWASP-API-2"],
		firstSeen: ago(26),
		lastSeen: ago(3),
		policyImpact: "blocks"
	},
	{
		id: "f-pay-002",
		fingerprint: "pay.webhook.replay",
		projectId: "p-northstar",
		runId: "run-northstar-3",
		checkId: "PAY-002",
		title: "Duplicate Stripe events provision twice",
		summary: "The same signed event delivered twice created two entitlement rows. Stripe documents at-least-once delivery.",
		category: "payments",
		severity: "critical",
		confidence: "confirmed",
		status: "open",
		impact: "Customers can be double-charged in downstream systems, or granted stacked plans, when Stripe retries.",
		affectedSurface: "POST /api/stripe/webhook",
		locations: [{
			path: "app/api/stripe/webhook/route.ts",
			startLine: 30,
			endLine: 54,
			symbol: "fulfill"
		}],
		graphNodeIds: ["h-webhook", "t-subs"],
		evidence: [ev("ev-pay2-1", "test_assertion", "Identical event id applied twice", "proofed-stripe-replay", "Event evt_1Px replayed with a valid local signature produced two subscriptions rows for the same org.", "Out-of-order event handling, which is a separate check.", `event  evt_1Px  customer.subscription.created\n1st POST  →  200  subscriptions count = 1\n2nd POST  →  200  subscriptions count = 2\nExpected    200  subscriptions count = 1  (idempotent)`, "text")],
		reproduce: [
			"Deliver a signed customer.subscription.created fixture.",
			"Deliver the same event id again.",
			"Count durable side effects. They must not increase."
		],
		remediation: "Store processed Stripe event ids uniquely. Return 200 on duplicates without re-running fulfillment.",
		fixEligibility: "contextual",
		fixRiskNote: "Needs a durable uniqueness constraint, not only an in-memory set.",
		standards: ["OWASP-ASVS-11.1.1"],
		firstSeen: ago(26),
		lastSeen: ago(3),
		policyImpact: "blocks"
	},
	{
		id: "f-pay-003",
		fingerprint: "pay.amount.client_controlled",
		projectId: "p-northstar",
		runId: "run-northstar-3",
		checkId: "PAY-003",
		title: "Checkout amount is taken from the client request",
		summary: "POST /api/checkout forwards amount_cents from the JSON body into stripe.checkout.sessions.create. A client can set $1.",
		category: "payments",
		severity: "critical",
		confidence: "confirmed",
		status: "open",
		impact: "Anyone who can call checkout can purchase a plan at an arbitrary price.",
		affectedSurface: "POST /api/checkout",
		locations: [{
			path: "app/api/checkout/route.ts",
			startLine: 10,
			endLine: 32,
			symbol: "POST"
		}],
		graphNodeIds: ["h-checkout", "pay"],
		evidence: [ev("ev-pay3-1", "ast_trace", "amount_cents flows from request JSON to Stripe", "proofed-ast", "No server-side catalog lookup. The numeric field from the body is passed as unit_amount.", "That a live charge was made. Tests use Stripe test-mode fixtures only.", `const { amount_cents, plan } = await req.json()\nawait stripe.checkout.sessions.create({\n  line_items: [{\n    price_data: { currency: 'usd', unit_amount: amount_cents, product_data: { name: plan } },\n    quantity: 1,\n  }],\n  mode: 'subscription',\n})`, "ts")],
		reproduce: ["POST /api/checkout with { plan: 'studio', amount_cents: 100 }.", "Inspect the created session’s line item. unit_amount is 100, not the catalog price."],
		remediation: "Map plan → Stripe price id on the server. Never accept unit_amount from the client.",
		fixEligibility: "contextual",
		fixRiskNote: "Requires a server catalog. Do not hard-code live price ids in the client.",
		standards: ["OWASP-ASVS-11.1.2", "OWASP-API-6"],
		firstSeen: ago(26),
		lastSeen: ago(3),
		policyImpact: "blocks"
	},
	{
		id: "f-data-001",
		fingerprint: "data.migration.drop_invoices",
		projectId: "p-northstar",
		runId: "run-northstar-3",
		checkId: "DATA-001",
		title: "Migration drops invoices without a guard",
		summary: "0005_cleanup.sql issues DROP TABLE invoices. There is no IF EXISTS guard tied to a rename, no data copy, and no environment check.",
		category: "data",
		severity: "critical",
		confidence: "confirmed",
		status: "open",
		impact: "Applying migrations to a populated database permanently deletes billing history.",
		affectedSurface: "supabase/migrations/0005_cleanup.sql",
		locations: [{
			path: "supabase/migrations/0005_cleanup.sql",
			startLine: 1,
			endLine: 3
		}],
		graphNodeIds: ["mig", "t-invoices"],
		evidence: [ev("ev-drop-1", "file_excerpt", "Unguarded DROP TABLE", "proofed-sql", "Statement is an unconditional DROP TABLE on a table that holds customer billing records.", "That this migration has already been applied in production.", `-- 0005_cleanup.sql\ndrop table public.invoices;`, "sql")],
		reproduce: ["Apply 0001–0004 to a fixture with synthetic invoices.", "Apply 0005. Table invoices is gone; row count is 0."],
		remediation: "Remove the drop, or replace it with a reversible rename behind an explicit, reviewed expansion. Never drop customer-billing tables in a default migration path.",
		fixEligibility: "prohibited",
		fixRiskNote: "Destructive data rewrite is instructions-only. Proofed will not generate a drop/undrop patch.",
		standards: ["NIST-SSDF-PW.8"],
		firstSeen: ago(26),
		lastSeen: ago(3),
		policyImpact: "blocks"
	},
	{
		id: "f-api-001",
		fingerprint: "api.cors.star_credentials",
		projectId: "p-northstar",
		runId: "run-northstar-3",
		checkId: "API-001",
		title: "Credentialed CORS allows any origin",
		summary: "API responses send Access-Control-Allow-Origin: * with Access-Control-Allow-Credentials: true. A preflight from https://evil.example succeeded.",
		category: "security",
		severity: "high",
		confidence: "confirmed",
		status: "open",
		impact: "A malicious site can invoke authenticated APIs using the victim’s cookies if the browser accepts the combination (or if a reflecting origin is later introduced).",
		affectedSurface: "next.config.ts headers",
		locations: [{
			path: "next.config.ts",
			startLine: 12,
			endLine: 24
		}],
		graphNodeIds: ["app"],
		evidence: [ev("ev-cors-1", "http_transcript", "Preflight from untrusted origin", "proofed-http", "OPTIONS /api/projects with Origin: https://evil.example returned ACAO * and ACAC true.", "That a specific browser will ignore the invalid * + credentials combination.", `OPTIONS /api/projects\nOrigin: https://evil.example\nAccess-Control-Request-Method: GET\n\n→ 204\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true`, "http")],
		reproduce: ["Send a preflight from an origin you do not own.", "Observe * plus credentials on the response."],
		remediation: "Reflect an explicit allowlist of origins. Never combine * with credentials.",
		fixEligibility: "mechanical",
		fixRiskNote: "Header allowlist patch. Verify preview and local origins still work.",
		standards: ["OWASP-ASVS-14.5.3"],
		firstSeen: ago(26),
		lastSeen: ago(3),
		policyImpact: "warns"
	},
	{
		id: "f-a11y-001",
		fingerprint: "a11y.checkout.missing_labels",
		projectId: "p-northstar",
		runId: "run-northstar-3",
		checkId: "A11Y-001",
		title: "Checkout form controls are missing labels",
		summary: "axe-core reported serious violations on /pricing: three inputs have no accessible name. This is not a WCAG conformance claim.",
		category: "accessibility",
		severity: "medium",
		confidence: "confirmed",
		status: "open",
		impact: "Keyboard and screen-reader users cannot complete the declared checkout journey.",
		affectedSurface: "/pricing",
		locations: [{
			path: "app/pricing/CheckoutForm.tsx",
			startLine: 22,
			endLine: 48
		}],
		graphNodeIds: ["r-pricing"],
		evidence: [ev("ev-a11y-1", "browser_trace", "axe-core serious: label", "axe-core", "Three input nodes fail label / aria-label / aria-labelledby.", "Full WCAG 2.2 conformance. Automated tools cover a subset.", `url     /pricing\nrule    label\nimpact  serious\nnodes   input[name=seatCount], input[name=orgName], input[name=cardName]`, "text")],
		reproduce: ["Open /pricing.", "Tab through the form. Inputs have no associated label text."],
		remediation: "Associate a visible <label> with each control, or provide aria-label where a visible label is truly redundant.",
		fixEligibility: "mechanical",
		fixRiskNote: "Form-label patch. Does not claim WCAG conformance after apply.",
		standards: ["WCAG-2.2-1.3.1", "WCAG-2.2-4.1.2"],
		firstSeen: ago(3),
		lastSeen: ago(3),
		policyImpact: "none"
	},
	{
		id: "f-ops-001",
		fingerprint: "ops.no_error_sink",
		projectId: "p-northstar",
		runId: "run-northstar-3",
		checkId: "OPS-001",
		title: "No error-capture integration detected",
		summary: "No Sentry, PostHog, Better Stack, or equivalent server/client error sink is imported. Absence is advisory under the default policy.",
		category: "operations",
		severity: "medium",
		confidence: "advisory",
		status: "open",
		impact: "After launch, 5xx and client exceptions may be invisible until users report them.",
		affectedSurface: "application",
		locations: [],
		graphNodeIds: ["app"],
		evidence: [ev("ev-ops-1", "graph_proof", "No known error SDK in the dependency or import graph", "proofed-graph", "package.json and imports were searched for maintained error-capture SDKs. None matched.", "That logs are not shipped by an unknown vendor.", `searched  sentry, @sentry/nextjs, posthog, @highlight-run, bugsnag, rollbar\nresult    no production dependency and no import`, "text")],
		reproduce: ["Inspect package.json and server entry for an error SDK. None is present."],
		remediation: "Add a server+browser error sink and a /api/health route before launch.",
		fixEligibility: "none",
		fixRiskNote: "Requires choosing a vendor. Instructions only.",
		standards: ["NIST-SSDF-RV.1"],
		firstSeen: ago(3),
		lastSeen: ago(3),
		policyImpact: "none"
	}
];
function execsFor(pairs) {
	return pairs.map(([checkId, state, findingIds, applicability]) => ({
		checkId,
		state,
		durationMs: 400 + Math.abs(checkId.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 8e3),
		findingIds,
		applicability: applicability ?? "Detected in application graph",
		confidence: state === "fail" ? "confirmed" : void 0
	}));
}
var northstarExecs = execsFor([
	[
		"BUILD-001",
		"pass",
		[]
	],
	[
		"BUILD-002",
		"pass",
		[]
	],
	[
		"BUILD-003",
		"pass",
		[]
	],
	[
		"CONFIG-001",
		"pass",
		[]
	],
	[
		"SECRET-001",
		"pass",
		[]
	],
	[
		"SECRET-002",
		"fail",
		["f-secret-002"]
	],
	[
		"DEP-001",
		"pass",
		[]
	],
	[
		"AUTHZ-001",
		"pass",
		[],
		"Anonymous GET /api/admin/users returned 401"
	],
	[
		"AUTHZ-002",
		"fail",
		["f-authz-002"]
	],
	[
		"AUTHZ-003",
		"fail",
		["f-authz-003"]
	],
	[
		"AUTH-001",
		"pass",
		[]
	],
	[
		"AUTH-002",
		"inconclusive",
		[],
		"Rate-limit headers absent; runtime proof skipped under request budget"
	],
	[
		"API-001",
		"fail",
		["f-api-001"]
	],
	[
		"API-002",
		"skipped_user_configuration",
		[],
		"No OAuth callback route declared"
	],
	[
		"API-003",
		"pass",
		[]
	],
	[
		"API-004",
		"not_applicable",
		[],
		"No server-side URL fetch from user input"
	],
	[
		"UPLOAD-001",
		"not_applicable",
		[],
		"No upload handler detected"
	],
	[
		"SUPA-001",
		"fail",
		["f-secret-002"],
		"Same evidence as SECRET-002 — service-role client is browser-reachable"
	],
	[
		"SUPA-002",
		"fail",
		["f-supa-002"]
	],
	[
		"SUPA-003",
		"inconclusive",
		[],
		"projects RLS exists but org-membership path untested"
	],
	[
		"SUPA-004",
		"skipped_user_configuration",
		[],
		"No disposable storage project"
	],
	[
		"DATA-001",
		"fail",
		["f-data-001"]
	],
	[
		"DATA-002",
		"skipped_safety_policy",
		[],
		"Destructive migration present; populated replay refused"
	],
	[
		"PAY-001",
		"fail",
		["f-pay-001"]
	],
	[
		"PAY-002",
		"fail",
		["f-pay-002"]
	],
	[
		"PAY-003",
		"fail",
		["f-pay-003"]
	],
	[
		"PAY-004",
		"pass",
		[]
	],
	[
		"PAY-005",
		"pass",
		[]
	],
	[
		"RUN-001",
		"pass",
		[]
	],
	[
		"RUN-002",
		"pass",
		[]
	],
	[
		"REL-001",
		"skipped_user_configuration",
		[],
		"No failure-injection domains declared"
	],
	[
		"A11Y-001",
		"fail",
		["f-a11y-001"]
	],
	[
		"UX-001",
		"pass",
		[]
	],
	[
		"OPS-001",
		"fail",
		["f-ops-001"]
	]
]);
var northstarDims = computeDimensionScores(northstarExecs, northstarFindings);
var northstarCov = computeCoverage(northstarExecs);
var northstarGate = computeGate({
	executions: northstarExecs,
	findings: northstarFindings,
	exceptions: []
});
var northstarRun = {
	id: "run-northstar-3",
	projectId: "p-northstar",
	commitSha: COMMIT,
	commitMessage: "feat: checkout + admin users API",
	branch: "main",
	environmentId: "env-sandbox",
	trigger: "manual",
	state: "completed",
	gate: northstarGate.gate,
	gateReason: northstarGate.reason,
	coverage: northstarCov.coverage,
	conclusiveCoverage: northstarCov.conclusiveCoverage,
	startedAt: ago(3.5),
	completedAt: ago(3),
	checkPack: "next-supabase-stripe@1.0.0",
	policyVersion: "proofed/default-launch@1.0.0",
	steps: steps(true),
	executions: northstarExecs,
	dimensionScores: northstarDims,
	untested: [
		"Org-membership path on projects RLS (SUPA-003 inconclusive)",
		"OAuth callback allowlist (no callback route declared)",
		"Storage object policies (no disposable storage project)",
		"Dependency failure injection (no domains declared)",
		"Password-reset rate limit (request budget)"
	],
	costUsd: 1.12
};
var atelierExecs = execsFor([
	"BUILD-001",
	"BUILD-002",
	"BUILD-003",
	"CONFIG-001",
	"SECRET-001",
	"SECRET-002",
	"DEP-001",
	"AUTHZ-001",
	"AUTHZ-002",
	"AUTHZ-003",
	"AUTH-001",
	"API-001",
	"SUPA-001",
	"SUPA-002",
	"SUPA-003",
	"DATA-001",
	"PAY-001",
	"PAY-002",
	"PAY-003",
	"PAY-004",
	"PAY-005",
	"RUN-001",
	"RUN-002",
	"A11Y-001",
	"UX-001",
	"OPS-001"
].map((id) => [
	id,
	"pass",
	[]
]).concat([
	[
		"AUTH-002",
		"pass",
		[]
	],
	[
		"API-002",
		"pass",
		[]
	],
	[
		"API-003",
		"pass",
		[]
	],
	[
		"API-004",
		"not_applicable",
		[]
	],
	[
		"UPLOAD-001",
		"pass",
		[]
	],
	[
		"SUPA-004",
		"pass",
		[]
	],
	[
		"DATA-002",
		"pass",
		[]
	],
	[
		"REL-001",
		"pass",
		[]
	]
]));
var atelierFindings = [];
var atelierDims = computeDimensionScores(atelierExecs, atelierFindings);
var atelierCov = computeCoverage(atelierExecs);
var atelierGate = computeGate({
	executions: atelierExecs,
	findings: atelierFindings,
	exceptions: []
});
var atelierRun = {
	id: "run-atelier-1",
	projectId: "p-atelier",
	commitSha: "c21bb90e11a4f77e0c3d9a1b5e6f708192a3b4c5",
	commitMessage: "chore: launch hardening",
	branch: "main",
	environmentId: "env-atelier",
	trigger: "manual",
	state: "completed",
	gate: atelierGate.gate,
	gateReason: atelierGate.reason,
	coverage: atelierCov.coverage,
	conclusiveCoverage: atelierCov.conclusiveCoverage,
	startedAt: ago(20),
	completedAt: ago(19.6),
	checkPack: "next-supabase-stripe@1.0.0",
	policyVersion: "proofed/default-launch@1.0.0",
	steps: steps(true),
	executions: atelierExecs,
	dimensionScores: atelierDims,
	untested: [],
	costUsd: .84
};
var harborFindings = [{
	id: "f-harbor-build",
	fingerprint: "run.preview.unverified",
	projectId: "p-harbor",
	runId: "run-harbor-1",
	checkId: "RUN-002",
	title: "Critical journey not executed — preview ownership unverified",
	summary: "Signup → create record was declared but the preview URL is not ownership-verified, so browser tests were skipped.",
	category: "runtime",
	severity: "high",
	confidence: "advisory",
	status: "open",
	impact: "The launch decision cannot include the primary user journey.",
	affectedSurface: "Declared flow: signup / create record",
	locations: [],
	graphNodeIds: [],
	evidence: [ev("ev-h1", "command_result", "Preview challenge not completed", "proofed-preview", "The well-known challenge file was not served at the declared URL.", "That the application is broken.", "GET https://harbor-crm.vercel.app/.well-known/proofed-challenge → 404", "text")],
	reproduce: ["Serve the one-time challenge at the preview origin, then re-run."],
	remediation: "Verify preview ownership or run in the Proofed sandbox.",
	fixEligibility: "none",
	fixRiskNote: "Configuration, not a code patch.",
	standards: [],
	firstSeen: ago(8),
	lastSeen: ago(8),
	policyImpact: "warns"
}];
var harborExecs = execsFor([
	[
		"BUILD-001",
		"pass",
		[]
	],
	[
		"BUILD-002",
		"pass",
		[]
	],
	[
		"BUILD-003",
		"pass",
		[]
	],
	[
		"CONFIG-001",
		"pass",
		[]
	],
	[
		"SECRET-001",
		"pass",
		[]
	],
	[
		"SECRET-002",
		"pass",
		[]
	],
	[
		"DEP-001",
		"pass",
		[]
	],
	[
		"AUTHZ-001",
		"skipped_user_configuration",
		[]
	],
	[
		"AUTHZ-002",
		"skipped_user_configuration",
		[]
	],
	[
		"AUTHZ-003",
		"skipped_user_configuration",
		[]
	],
	[
		"API-001",
		"pass",
		[]
	],
	[
		"SUPA-001",
		"pass",
		[]
	],
	[
		"SUPA-002",
		"inconclusive",
		[]
	],
	[
		"SUPA-003",
		"skipped_user_configuration",
		[]
	],
	[
		"DATA-001",
		"pass",
		[]
	],
	[
		"PAY-001",
		"not_applicable",
		[],
		"No Stripe integration"
	],
	[
		"PAY-002",
		"not_applicable",
		[]
	],
	[
		"PAY-003",
		"not_applicable",
		[]
	],
	[
		"RUN-001",
		"pass",
		[]
	],
	[
		"RUN-002",
		"skipped_user_configuration",
		["f-harbor-build"]
	],
	[
		"A11Y-001",
		"skipped_user_configuration",
		[]
	],
	[
		"OPS-001",
		"pass",
		[]
	]
]);
var harborDims = computeDimensionScores(harborExecs, harborFindings);
var harborCov = computeCoverage(harborExecs);
var harborGate = computeGate({
	executions: harborExecs,
	findings: harborFindings,
	exceptions: []
});
var harborRun = {
	id: "run-harbor-1",
	projectId: "p-harbor",
	commitSha: "9e0d1c2b3a49586770e1f2a3b4c5d6e7f8091a2b",
	commitMessage: "wip: crm boards",
	branch: "main",
	environmentId: "env-harbor",
	trigger: "intake",
	state: "completed",
	gate: harborGate.gate,
	gateReason: harborGate.reason,
	coverage: harborCov.coverage,
	conclusiveCoverage: harborCov.conclusiveCoverage,
	startedAt: ago(8.4),
	completedAt: ago(8),
	checkPack: "next-supabase-stripe@1.0.0",
	policyVersion: "proofed/default-launch@1.0.0",
	steps: steps(true),
	executions: harborExecs,
	dimensionScores: harborDims,
	untested: [
		"Two-persona authorization (no test personas)",
		"Preview browser journey (ownership unverified)",
		"RLS tenant boundary"
	],
	costUsd: .41
};
var folioException = {
	id: "ex-folio-1",
	projectId: "p-folio",
	checkId: "A11Y-001",
	owner: "Maya Chen",
	reason: "Marketing pages will be rebuilt next sprint; app routes pass.",
	compensatingControl: "Manual keyboard pass on /checkout before ads go live.",
	startsAt: ago(12),
	expiresAt: iso(432)
};
var folioFindings = [{
	id: "f-folio-a11y",
	fingerprint: "a11y.marketing.contrast",
	projectId: "p-folio",
	runId: "run-folio-2",
	checkId: "A11Y-001",
	title: "Marketing hero has a serious contrast violation",
	summary: "axe-core serious contrast on the home hero. App routes were clean. Exception recorded.",
	category: "accessibility",
	severity: "medium",
	confidence: "confirmed",
	status: "accepted",
	impact: "Low-vision users may not read the hero claim. Checkout is unaffected.",
	affectedSurface: "/",
	locations: [{
		path: "app/page.tsx",
		startLine: 40,
		endLine: 52
	}],
	graphNodeIds: [],
	evidence: [ev("ev-folio-1", "browser_trace", "axe contrast", "axe-core", "Hero paragraph contrast 3.1:1 against the photograph.", "WCAG conformance of the whole site.", "rule color-contrast  impact serious  node p.hero-claim", "text")],
	reproduce: ["Open / and run axe on the hero paragraph."],
	remediation: "Darken the overlay or the type.",
	fixEligibility: "mechanical",
	fixRiskNote: "CSS-only.",
	standards: ["WCAG-2.2-1.4.3"],
	firstSeen: ago(40),
	lastSeen: ago(12),
	policyImpact: "none"
}];
var folioExecs = execsFor([
	"BUILD-001",
	"BUILD-002",
	"BUILD-003",
	"CONFIG-001",
	"SECRET-001",
	"SECRET-002",
	"DEP-001",
	"AUTHZ-001",
	"AUTHZ-002",
	"AUTHZ-003",
	"API-001",
	"SUPA-001",
	"SUPA-002",
	"SUPA-003",
	"DATA-001",
	"PAY-001",
	"PAY-002",
	"PAY-003",
	"PAY-005",
	"RUN-001",
	"RUN-002",
	"UX-001",
	"OPS-001",
	"AUTH-001",
	"PAY-004"
].map((id) => [
	id,
	"pass",
	[]
]).concat([
	[
		"A11Y-001",
		"fail",
		["f-folio-a11y"]
	],
	[
		"API-004",
		"not_applicable",
		[]
	],
	[
		"UPLOAD-001",
		"pass",
		[]
	],
	[
		"REL-001",
		"pass",
		[]
	],
	[
		"DATA-002",
		"pass",
		[]
	],
	[
		"SUPA-004",
		"pass",
		[]
	],
	[
		"AUTH-002",
		"pass",
		[]
	],
	[
		"API-002",
		"pass",
		[]
	],
	[
		"API-003",
		"pass",
		[]
	]
]));
var folioDims = computeDimensionScores(folioExecs, folioFindings);
var folioCov = computeCoverage(folioExecs);
var folioGate = computeGate({
	executions: folioExecs,
	findings: folioFindings,
	exceptions: [folioException]
});
var folioRun = {
	id: "run-folio-2",
	projectId: "p-folio",
	commitSha: "bb81a0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3",
	commitMessage: "fix: webhook raw body",
	branch: "main",
	environmentId: "env-folio",
	trigger: "manual",
	state: "completed",
	gate: folioGate.gate,
	gateReason: folioGate.reason,
	coverage: folioCov.coverage,
	conclusiveCoverage: folioCov.conclusiveCoverage,
	startedAt: ago(12.5),
	completedAt: ago(12),
	checkPack: "next-supabase-stripe@1.0.0",
	policyVersion: "proofed/default-launch@1.0.0",
	steps: steps(true),
	executions: folioExecs,
	dimensionScores: folioDims,
	untested: [],
	costUsd: .96
};
var SEED_PROJECTS = [
	{
		id: "p-northstar",
		name: "Northstar",
		repo: "northstar-hq/northstar",
		defaultBranch: "main",
		description: "Agency project OS — briefs, billing, and client rooms.",
		purpose: "Paid workspace for agencies managing client work and invoices.",
		dataSensitivity: "sensitive",
		payments: "live_planned",
		stack: {
			next: "15.4.1",
			router: "app",
			supabase: true,
			stripe: true,
			packageManager: "pnpm",
			node: "22",
			support: "fully_supported"
		},
		latestRunId: "run-northstar-3",
		environments: [{
			id: "env-sandbox",
			name: "Proofed sandbox",
			kind: "sandbox",
			ownership: "sandbox",
			activeTests: true
		}, {
			id: "env-preview",
			name: "Vercel preview",
			kind: "preview",
			baseUrl: "https://northstar-git-main.vercel.app",
			ownership: "verified",
			activeTests: true
		}],
		personas: [
			{
				id: "pa",
				role: "anonymous",
				label: "Anonymous",
				email: "—"
			},
			{
				id: "pb",
				role: "user_a",
				label: "Avery (member)",
				email: "avery@northstar.test"
			},
			{
				id: "pc",
				role: "user_b",
				label: "Blair (member)",
				email: "blair@northstar.test"
			},
			{
				id: "pd",
				role: "admin",
				label: "Chris (admin)",
				email: "chris@northstar.test"
			}
		],
		flows: [
			{
				id: "fl1",
				name: "Signup / login / logout",
				steps: [
					"Open /signup",
					"Create account",
					"Land on /dashboard",
					"Log out"
				],
				approved: true,
				destructive: false
			},
			{
				id: "fl2",
				name: "Create primary object",
				steps: [
					"Log in as Avery",
					"Create project",
					"Reload as Avery — project visible"
				],
				approved: true,
				destructive: false
			},
			{
				id: "fl3",
				name: "Checkout test flow",
				steps: [
					"Open /pricing",
					"Start Studio checkout",
					"Stripe test complete",
					"Webhook fulfillment"
				],
				approved: true,
				destructive: false
			}
		],
		graph: northstarGraph,
		createdAt: ago(40),
		owner: "Maya Chen"
	},
	{
		id: "p-atelier",
		name: "Atelier Portal",
		repo: "atelier-studio/client-portal",
		defaultBranch: "main",
		description: "Client file exchange for a 6-person studio.",
		purpose: "Clients upload brand files; studio comments.",
		dataSensitivity: "basic",
		payments: "test",
		stack: {
			next: "15.3.2",
			router: "app",
			supabase: true,
			stripe: true,
			packageManager: "npm",
			node: "22",
			support: "fully_supported"
		},
		latestRunId: "run-atelier-1",
		environments: [{
			id: "env-atelier",
			name: "Proofed sandbox",
			kind: "sandbox",
			ownership: "sandbox",
			activeTests: true
		}],
		personas: [
			{
				id: "aa",
				role: "anonymous",
				label: "Anonymous",
				email: "—"
			},
			{
				id: "ab",
				role: "user_a",
				label: "Client A",
				email: "a@atelier.test"
			},
			{
				id: "ac",
				role: "user_b",
				label: "Client B",
				email: "b@atelier.test"
			},
			{
				id: "ad",
				role: "admin",
				label: "Studio admin",
				email: "ops@atelier.test"
			}
		],
		flows: [{
			id: "af1",
			name: "Signup / login / logout",
			steps: [
				"Sign up",
				"Dashboard",
				"Log out"
			],
			approved: true,
			destructive: false
		}, {
			id: "af2",
			name: "Create primary object",
			steps: ["Upload file", "Comment thread"],
			approved: true,
			destructive: false
		}],
		graph: {
			summary: "Next.js App Router + Supabase Auth/Storage + Stripe billing. Fully supported.",
			nodes: [
				{
					id: "app",
					type: "application",
					label: "client-portal",
					detail: "Next.js 15.3",
					confidence: "detected",
					evidence: "package.json"
				},
				{
					id: "r-home",
					type: "route",
					label: "/",
					detail: "Marketing",
					confidence: "detected",
					evidence: "app/page.tsx",
					public: true
				},
				{
					id: "r-app",
					type: "route",
					label: "/app",
					detail: "Authenticated shell",
					confidence: "detected",
					evidence: "app/app/page.tsx",
					sensitive: true
				},
				{
					id: "auth",
					type: "auth",
					label: "Supabase Auth",
					detail: "Magic link",
					confidence: "detected",
					evidence: "lib/supabase.ts"
				},
				{
					id: "t-files",
					type: "table",
					label: "files",
					detail: "RLS on owner_id",
					confidence: "detected",
					evidence: "migrations/0002.sql",
					sensitive: true
				}
			],
			edges: [{
				id: "e1",
				from: "r-app",
				to: "auth",
				type: "authenticates_with",
				confidence: "detected"
			}]
		},
		createdAt: ago(60),
		owner: "Maya Chen"
	},
	{
		id: "p-harbor",
		name: "Harbor CRM",
		repo: "harbor-labs/crm",
		defaultBranch: "main",
		description: "Lightweight CRM generated from an AI coding session.",
		purpose: "Internal pipeline tracking. No payments.",
		dataSensitivity: "basic",
		payments: "none",
		stack: {
			next: "15.2.0",
			router: "app",
			supabase: true,
			stripe: false,
			packageManager: "npm",
			node: "20",
			support: "partially_supported"
		},
		latestRunId: "run-harbor-1",
		environments: [{
			id: "env-harbor",
			name: "Vercel preview",
			kind: "preview",
			baseUrl: "https://harbor-crm.vercel.app",
			ownership: "unverified",
			activeTests: false
		}],
		personas: [],
		flows: [{
			id: "hf1",
			name: "Create primary object",
			steps: ["Create company", "Add note"],
			approved: false,
			destructive: false
		}],
		graph: {
			summary: "Next.js + Supabase. Stripe not present. Preview ownership unverified — dynamic checks skipped.",
			nodes: [
				{
					id: "app",
					type: "application",
					label: "crm",
					detail: "Next.js 15.2",
					confidence: "detected",
					evidence: "package.json"
				},
				{
					id: "r-board",
					type: "route",
					label: "/board",
					detail: "Kanban",
					confidence: "detected",
					evidence: "app/board/page.tsx",
					sensitive: true
				},
				{
					id: "auth",
					type: "auth",
					label: "Supabase Auth",
					detail: "Password",
					confidence: "detected",
					evidence: "lib/db.ts"
				},
				{
					id: "t-companies",
					type: "table",
					label: "companies",
					detail: "RLS present, untested",
					confidence: "detected",
					evidence: "migrations/0001.sql"
				}
			],
			edges: []
		},
		createdAt: ago(10),
		owner: "Maya Chen"
	},
	{
		id: "p-folio",
		name: "Folio Shop",
		repo: "folio-co/shop",
		defaultBranch: "main",
		description: "Print shop with Stripe Checkout.",
		purpose: "Sell limited prints. Live payments planned this month.",
		dataSensitivity: "basic",
		payments: "live_planned",
		stack: {
			next: "15.4.0",
			router: "app",
			supabase: true,
			stripe: true,
			packageManager: "pnpm",
			node: "22",
			support: "fully_supported"
		},
		latestRunId: "run-folio-2",
		environments: [{
			id: "env-folio",
			name: "Proofed sandbox",
			kind: "sandbox",
			ownership: "sandbox",
			activeTests: true
		}],
		personas: [
			{
				id: "fa",
				role: "anonymous",
				label: "Anonymous",
				email: "—"
			},
			{
				id: "fb",
				role: "user_a",
				label: "Buyer A",
				email: "a@folio.test"
			},
			{
				id: "fc",
				role: "user_b",
				label: "Buyer B",
				email: "b@folio.test"
			},
			{
				id: "fd",
				role: "admin",
				label: "Shop admin",
				email: "ops@folio.test"
			}
		],
		flows: [{
			id: "ff1",
			name: "Checkout test flow",
			steps: [
				"Add print",
				"Stripe test pay",
				"Order appears"
			],
			approved: true,
			destructive: false
		}],
		graph: {
			summary: "Next.js shop with Supabase orders and Stripe Checkout. Blocking checks passed.",
			nodes: [
				{
					id: "app",
					type: "application",
					label: "shop",
					detail: "Next.js 15.4",
					confidence: "detected",
					evidence: "package.json"
				},
				{
					id: "r-buy",
					type: "route",
					label: "/checkout",
					detail: "Checkout",
					confidence: "detected",
					evidence: "app/checkout/page.tsx",
					sensitive: true
				},
				{
					id: "pay",
					type: "payment",
					label: "Stripe Checkout",
					detail: "Server price ids",
					confidence: "detected",
					evidence: "app/api/checkout/route.ts"
				}
			],
			edges: []
		},
		createdAt: ago(80),
		owner: "Maya Chen"
	}
];
var SEED_RUNS = [
	northstarRun,
	{
		...northstarRun,
		id: "run-northstar-2",
		commitSha: "55e10a9c8b7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f",
		commitMessage: "wip: stripe webhook",
		startedAt: ago(26.5),
		completedAt: ago(26),
		trigger: "intake"
	},
	atelierRun,
	harborRun,
	folioRun
];
var SEED_FINDINGS = [
	...northstarFindings,
	...harborFindings,
	...folioFindings
];
var SEED_EXCEPTIONS = [folioException];
var SEED_FIXES = [{
	id: "fix-1",
	projectId: "p-folio",
	findingId: "f-folio-a11y",
	state: "merged",
	verification: "verified_on_pr_commit",
	branch: "proofed/fix-webhook-raw-body",
	prNumber: 84,
	prUrl: "https://github.com/folio-co/shop/pull/84",
	files: ["app/api/stripe/webhook/route.ts", "tests/webhook-signature.test.ts"],
	patchSummary: "Read the raw request text and pass it to constructEvent. Added valid/invalid signature fixtures.",
	originalBefore: "FAIL",
	originalAfter: "PASS",
	relatedChecks: [
		{
			id: "PAY-001",
			result: "PASS"
		},
		{
			id: "PAY-002",
			result: "PASS"
		},
		{
			id: "BUILD-002",
			result: "PASS"
		}
	],
	limitations: "Did not exercise live Stripe. Fixtures use the local signing secret.",
	createdAt: ago(36),
	riskClass: "contextual"
}];
var CONNECTED_REPOS = [
	{
		id: "r1",
		fullName: "northstar-hq/northstar",
		description: "Agency OS",
		defaultBranch: "main",
		private: true,
		stackHint: "Next.js 15 · Supabase · Stripe",
		template: "blocked"
	},
	{
		id: "r2",
		fullName: "atelier-studio/client-portal",
		description: "Client file exchange",
		defaultBranch: "main",
		private: true,
		stackHint: "Next.js 15 · Supabase · Stripe",
		template: "ready"
	},
	{
		id: "r3",
		fullName: "harbor-labs/crm",
		description: "Internal CRM",
		defaultBranch: "main",
		private: true,
		stackHint: "Next.js 15 · Supabase",
		template: "at_risk"
	},
	{
		id: "r4",
		fullName: "folio-co/shop",
		description: "Print shop",
		defaultBranch: "main",
		private: false,
		stackHint: "Next.js 15 · Supabase · Stripe",
		template: "ready"
	},
	{
		id: "r5",
		fullName: "maya/notes-app",
		description: "Weekend notes prototype",
		defaultBranch: "main",
		private: true,
		stackHint: "Vite · Firebase",
		template: "unsupported"
	},
	{
		id: "r6",
		fullName: "northstar-hq/marketing",
		description: "Marketing site",
		defaultBranch: "main",
		private: false,
		stackHint: "Next.js 15 · no auth",
		template: "insufficient"
	}
];
var ORG = {
	name: "Northstar HQ",
	slug: "northstar-hq",
	plan: "studio",
	member: "Maya Chen",
	email: "maya@northstar.studio"
};
var USAGE = {
	plan: "studio",
	projectsUsed: 4,
	projectsLimit: 10,
	checksUsed: 17,
	checksLimit: 50,
	fixesUsed: 3,
	fixesLimit: 25,
	periodEnd: iso(432)
};
//#endregion
export { SEED_FINDINGS as a, SEED_RUNS as c, computeDimensionScores as d, computeGate as f, SEED_EXCEPTIONS as i, USAGE as l, DEFAULT_POLICY as n, SEED_FIXES as o, ORG as r, SEED_PROJECTS as s, CONNECTED_REPOS as t, computeCoverage as u };
