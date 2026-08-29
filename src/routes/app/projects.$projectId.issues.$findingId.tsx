import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { ConfidenceBadge, SeverityBadge } from "@/components/gate-badge";
import { ArchitectureMap } from "@/components/architecture-map";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { statusLabel, absTime, hashPreview } from "@/lib/format";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/projects/$projectId/issues/$findingId")({
  component: IssueDetail,
});

function IssueDetail() {
  const { projectId, findingId } = Route.useParams();
  const finding = useAppStore((s) => s.findings.find((f) => f.id === findingId));
  const project = useAppStore((s) => s.projects.find((p) => p.id === projectId));
  const createFix = useAppStore((s) => s.createFix);
  const setStatus = useAppStore((s) => s.setFindingStatus);
  const addException = useAppStore((s) => s.addException);
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [control, setControl] = useState("");
  const [copied, setCopied] = useState(false);

  if (!finding || !project) {
    return <p className="text-sm text-muted-foreground">Finding not found.</p>;
  }

  const issue = finding;
  const canExcept =
    issue.severity !== "critical" ||
    (issue.checkId !== "SECRET-002" && issue.checkId !== "AUTHZ-002" && issue.checkId !== "SUPA-001");

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
      "Do not invent evidence. Replay the original check after the patch.",
    ].join("\n");
    void navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Fix brief copied");
  }

  return (
    <div>
      <Link
        to="/app/projects/$projectId/issues"
        params={{ projectId }}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Issues
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex flex-wrap gap-1.5">
            <SeverityBadge severity={finding.severity} />
            <ConfidenceBadge confidence={finding.confidence} />
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              {statusLabel(finding.status)}
            </span>
            {finding.policyImpact === "blocks" ? (
              <span className="rounded-full border border-blocked/30 bg-blocked/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-blocked">
                Blocks launch
              </span>
            ) : null}
          </div>
          <h2 className="font-display mt-3 text-3xl tracking-tight">{finding.title}</h2>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            {finding.checkId} · {finding.affectedSurface}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {finding.fixEligibility !== "none" && finding.fixEligibility !== "prohibited" ? (
            <Button
              onClick={() => {
                const id = createFix(finding.id);
                toast.message("Fix sandbox started", { description: "Replay runs in a fresh boundary." });
                if (id) {
                  window.setTimeout(() => {
                    void navigate({
                      to: "/app/projects/$projectId/fixes",
                      params: { projectId },
                    });
                  }, 1200);
                }
              }}
            >
              Create Fix PR
            </Button>
          ) : (
            <Button variant="outline" onClick={copyBrief}>
              {copied ? "Copied" : "Generate fix brief"}
            </Button>
          )}
          <Button variant="outline" onClick={copyBrief}>
            Copy brief
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" className="mt-8">
        <TabsList className="flex h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="reproduce">Reproduce</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="fix">Fix</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-5">
          <p className="max-w-prose text-sm leading-relaxed">{finding.summary}</p>
          <div>
            <h3 className="text-sm font-medium">Business impact</h3>
            <p className="mt-1 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {finding.impact}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Locations</h3>
            <ul className="mt-2 space-y-1 font-mono text-xs">
              {finding.locations.length === 0 ? (
                <li className="text-muted-foreground">No file location — graph/config finding.</li>
              ) : (
                finding.locations.map((l) => (
                  <li key={`${l.path}:${l.startLine}`}>
                    {l.path}:{l.startLine}–{l.endLine}
                    {l.symbol ? ` · ${l.symbol}` : ""}
                  </li>
                ))
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium">Standards</h3>
            <p className="mt-1 text-sm text-muted-foreground">{finding.standards.join(" · ") || "—"}</p>
          </div>
        </TabsContent>

        <TabsContent value="evidence" className="space-y-4">
          {finding.evidence.map((e) => (
            <article key={e.id} className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-medium">{e.title}</h3>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {e.tool} {e.toolVersion} · {e.kind.replaceAll("_", " ")}
                </p>
              </div>
              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-ready">What this proves</p>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{e.proves}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    What this does not prove
                  </p>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{e.doesNotProve}</p>
                </div>
              </div>
              <pre
                className={cn(
                  "mt-4 overflow-x-auto rounded-lg bg-ink p-4 font-mono text-[12px] leading-relaxed text-paper",
                )}
              >
                {e.body}
              </pre>
              <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                {e.id} · {hashPreview(e.sha256)} · redaction v2 · {absTime(e.capturedAt)}
              </p>
            </article>
          ))}
        </TabsContent>

        <TabsContent value="reproduce">
          <ol className="max-w-prose list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            {finding.reproduce.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">
            Reproduction is bounded to the sandbox or verified preview. Do not run these steps
            against production.
          </p>
        </TabsContent>

        <TabsContent value="architecture">
          <ArchitectureMap graph={project.graph} highlightIds={finding.graphNodeIds} />
        </TabsContent>

        <TabsContent value="fix" className="space-y-4">
          <p className="text-sm">
            Eligibility: <span className="capitalize">{finding.fixEligibility}</span>
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{finding.fixRiskNote}</p>
          <p className="max-w-prose text-sm leading-relaxed">{finding.remediation}</p>
          {finding.fixEligibility === "prohibited" ? (
            <p className="text-sm text-atrisk">
              Automatic action is prohibited. Instructions only — no patch will be generated.
            </p>
          ) : null}
        </TabsContent>

        <TabsContent value="history" className="space-y-3 text-sm">
          <p>
            First seen {absTime(finding.firstSeen)} · Last seen {absTime(finding.lastSeen)}
          </p>
          <p className="text-muted-foreground">
            Fingerprint {finding.fingerprint} — stable across refactors; line numbers are not
            part of identity.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setStatus(finding.id, "disputed")}>
              Dispute
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStatus(finding.id, "not_relevant")}
            >
              Not relevant
            </Button>
          </div>
          {canExcept && finding.status === "open" ? (
            <form
              className="mt-4 space-y-3 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]"
              onSubmit={(e) => {
                e.preventDefault();
                addException({
                  projectId,
                  findingId: finding.id,
                  owner: "Maya Chen",
                  reason,
                  compensatingControl: control,
                  expiresAt: new Date(Date.now() + 14 * 86400000).toISOString(),
                });
                setStatus(finding.id, "accepted");
                toast.success("Temporary exception recorded");
              }}
            >
              <h3 className="text-sm font-medium">Accept temporarily</h3>
              <p className="text-xs text-muted-foreground">Maximum 30 days. Expiry reopens the violation.</p>
              <div className="space-y-1">
                <Label htmlFor="reason">Reason</Label>
                <Textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ctrl">Compensating control</Label>
                <Input id="ctrl" value={control} onChange={(e) => setControl(e.target.value)} required />
              </div>
              <Button type="submit" size="sm">
                Record exception
              </Button>
            </form>
          ) : (
            <p className="text-xs text-muted-foreground">
              This finding cannot be excepted in self-serve, or it is no longer open.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
