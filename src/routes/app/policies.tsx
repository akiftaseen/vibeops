import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { relTime } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/app/policies")({ component: PoliciesPage });

function PoliciesPage() {
  const policy = useAppStore((s) => s.policy);
  const update = useAppStore((s) => s.updatePolicy);
  const exceptions = useAppStore((s) => s.exceptions);
  const revoke = useAppStore((s) => s.revokeException);
  const findings = useAppStore((s) => s.findings);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-3xl tracking-tight">Policies</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Editing policy to ignore a result changes the launch decision. It does not fix the
        issue. Critical secret exposure and confirmed cross-tenant access cannot be excepted
        in self-serve.
      </p>

      <section className="mt-8 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
        <h2 className="text-base font-medium">Default launch policy</h2>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {policy.extends}@{policy.version}
        </p>
        <div className="mt-5 space-y-4">
          <div>
            <Label htmlFor="cov">Minimum conclusive coverage</Label>
            <div className="mt-2 flex items-center gap-3">
              <Input
                id="cov"
                type="number"
                min={0.5}
                max={1}
                step={0.05}
                value={policy.minimumConclusiveCoverage}
                onChange={(e) =>
                  update({ minimumConclusiveCoverage: Number(e.target.value) })
                }
                className="w-28"
              />
              <span className="text-sm text-muted-foreground">0.80 recommended</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Block severities: {policy.blockSeverities.join(", ")}. Confidences:{" "}
            {policy.blockConfidences.join(", ")}. Required checks:{" "}
            {policy.requireChecks.join(", ")}. Exception max {policy.exceptionMaxDays} days.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-medium">Exceptions</h2>
        {exceptions.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">None recorded.</p>
        ) : (
          <ul className="mt-3 divide-y divide-border rounded-xl bg-card shadow-[var(--shadow-border)]">
            {exceptions.map((ex) => {
              const f = findings.find((x) => x.id === ex.findingId);
              return (
                <li key={ex.id} className="px-5 py-4">
                  <p className="text-sm font-medium">
                    {f?.title ?? ex.checkId ?? "Scoped exception"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{ex.reason}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {ex.owner} · expires {relTime(ex.expiresAt)}
                    {ex.revokedAt ? " · revoked" : ""}
                  </p>
                  {!ex.revokedAt ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        revoke(ex.id);
                        toast.message("Exception revoked");
                      }}
                    >
                      Revoke
                    </Button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
