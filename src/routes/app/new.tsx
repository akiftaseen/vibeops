import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CONNECTED_REPOS } from "@/lib/demo-data";
import { useAppStore, type IntakeDraft } from "@/lib/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/app/new")({ component: IntakePage });

const STEPS = ["Repository", "Stack", "Scope", "Environment", "Flows", "Review"];

const DEFAULT: IntakeDraft = {
  repoId: "r1",
  purpose: "Paid workspace for agencies managing client work and invoices.",
  dataSensitivity: "sensitive",
  payments: "live_planned",
  environment: "sandbox",
  previewUrl: "",
  flows: ["Signup / login / logout", "Create primary object", "Checkout test flow"],
  attested: false,
};

function IntakePage() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<IntakeDraft>(DEFAULT);
  const navigate = useNavigate();
  const create = useAppStore((s) => s.createProjectFromRepo);
  const repo = CONNECTED_REPOS.find((r) => r.id === draft.repoId);

  const canNext = useMemo(() => {
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
      toast.message("Unsupported stack", {
        description: "Firebase + Vite is outside the Next.js pack. No deep run was billed.",
      });
      return;
    }
    const runId = create(draft);
    const project = useAppStore.getState().projects.find((p) =>
      useAppStore.getState().runs.some((r) => r.id === runId && r.projectId === p.id),
    );
    if (project) {
      toast.success("Launch Check started");
      void navigate({
        to: "/app/projects/$projectId/runs/$runId",
        params: { projectId: project.id, runId },
      });
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">New project</p>
      <h1 className="font-display mt-1 text-3xl tracking-tight">Launch Check intake</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Each question unlocks a specific check family. A static/build scan needs no extra
        config; authorization and payment checks ask only when they apply.
      </p>

      <ol className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-[11px] uppercase tracking-wider",
              i === step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
            )}
          >
            {s}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
        {step === 0 && (
          <div className="space-y-3">
            <h2 className="text-base font-medium">Select a repository</h2>
            <p className="text-sm text-muted-foreground">
              Only repositories granted to the GitHub App are listed.
            </p>
            <ul className="space-y-2">
              {CONNECTED_REPOS.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, repoId: r.id }))}
                    className={cn(
                      "flex w-full items-start justify-between rounded-lg border px-4 py-3 text-left",
                      draft.repoId === r.id ? "border-primary bg-secondary" : "border-border hover:bg-secondary/50",
                    )}
                  >
                    <span>
                      <span className="block font-mono text-sm">{r.fullName}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{r.description}</span>
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {r.stackHint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 1 && repo && (
          <div>
            <h2 className="text-base font-medium">Detected stack</h2>
            {repo.template === "unsupported" ? (
              <p className="mt-3 text-sm text-atrisk">
                Partially outside the contract: Vite + Firebase. Static secrets may still run;
                a deep Launch Check will not be billed.
              </p>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Fully supported for the next-supabase-stripe pack. Deeper checks unlock if you
                add test personas and a sandbox or verified preview.
              </p>
            )}
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Framework</dt>
                <dd>{repo.stackHint}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Default branch</dt>
                <dd className="font-mono">{repo.defaultBranch}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Visibility</dt>
                <dd>{repo.private ? "Private" : "Public"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Support</dt>
                <dd>{repo.template === "unsupported" ? "Unsupported" : "Fully supported"}</dd>
              </div>
            </dl>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-base font-medium">Launch scope</h2>
            <div className="space-y-2">
              <Label htmlFor="purpose">App purpose</Label>
              <Textarea
                id="purpose"
                value={draft.purpose}
                onChange={(e) => setDraft((d) => ({ ...d, purpose: e.target.value }))}
              />
              <p className="text-xs text-muted-foreground">Used to rank which flows matter, not to invent findings.</p>
            </div>
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Data sensitivity</legend>
              {(["none", "basic", "sensitive"] as const).map((v) => (
                <label key={v} className="flex min-h-11 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="sens"
                    checked={draft.dataSensitivity === v}
                    onChange={() => setDraft((d) => ({ ...d, dataSensitivity: v }))}
                  />
                  {v === "none" ? "None" : v === "basic" ? "Basic personal" : "Sensitive"}
                </label>
              ))}
            </fieldset>
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Payments</legend>
              {(["none", "test", "live_planned"] as const).map((v) => (
                <label key={v} className="flex min-h-11 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="pay"
                    checked={draft.payments === v}
                    onChange={() => setDraft((d) => ({ ...d, payments: v }))}
                  />
                  {v === "none" ? "None" : v === "test" ? "Stripe test mode" : "Live payments planned"}
                </label>
              ))}
            </fieldset>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-base font-medium">Environment</h2>
            <p className="text-sm text-muted-foreground">
              Active tests run in a Proofed sandbox or an explicitly authorized preview.
              Production hostnames refuse mutation, replay, and brute-force.
            </p>
            {(["sandbox", "preview"] as const).map((v) => (
              <label key={v} className="flex min-h-11 items-start gap-3 rounded-lg border border-border p-3">
                <input
                  type="radio"
                  name="env"
                  className="mt-1"
                  checked={draft.environment === v}
                  onChange={() => setDraft((d) => ({ ...d, environment: v }))}
                />
                <span>
                  <span className="block text-sm font-medium">
                    {v === "sandbox" ? "Proofed sandbox" : "Verified preview URL"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {v === "sandbox"
                      ? "Disposable, default-deny egress, synthetic secrets."
                      : "Ownership challenge required. Production-like names are refused."}
                  </span>
                </span>
              </label>
            ))}
            {draft.environment === "preview" ? (
              <div className="space-y-2">
                <Label htmlFor="url">Preview URL</Label>
                <Input
                  id="url"
                  placeholder="https://your-app-git-main.vercel.app"
                  value={draft.previewUrl}
                  onChange={(e) => setDraft((d) => ({ ...d, previewUrl: e.target.value }))}
                />
              </div>
            ) : null}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-base font-medium">Critical journeys</h2>
            <p className="text-sm text-muted-foreground">
              Templates for this stack. Remove anything unsafe. You can edit later.
            </p>
            {["Signup / login / logout", "Create primary object", "Checkout test flow"].map((f) => (
              <label key={f} className="flex min-h-11 items-center gap-3 text-sm">
                <Checkbox
                  checked={draft.flows.includes(f)}
                  onCheckedChange={(c) =>
                    setDraft((d) => ({
                      ...d,
                      flows: c ? [...d.flows, f] : d.flows.filter((x) => x !== f),
                    }))
                  }
                />
                {f}
              </label>
            ))}
          </div>
        )}

        {step === 5 && repo && (
          <div className="space-y-4">
            <h2 className="text-base font-medium">Review and attest</h2>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Repository</dt>
                <dd className="font-mono">{repo.fullName}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Target</dt>
                <dd>{draft.environment}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Active tests</dt>
                <dd>{draft.environment === "sandbox" ? "Enabled" : "Preview only if verified"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Est. time</dt>
                <dd>8–15 min</dd>
              </div>
            </dl>
            <p className="text-sm text-muted-foreground">
              Data mutation is limited to synthetic fixtures in the sandbox. No live Stripe
              charges. No production database writes.
            </p>
            <label className="flex items-start gap-3 text-sm">
              <Checkbox
                checked={draft.attested}
                onCheckedChange={(c) => setDraft((d) => ({ ...d, attested: Boolean(c) }))}
                className="mt-0.5"
              />
              I own or am authorized to test this repository and target. I will not point
              Proofed at a third-party production system.
            </label>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
          <Button onClick={go} disabled={!canNext}>
            {step === STEPS.length - 1 ? "Start Launch Check" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
