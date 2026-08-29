import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ORG } from "@/lib/demo-data";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

function SettingsPage() {
  const reset = useAppStore((s) => s.resetDemo);
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-3xl tracking-tight">Settings</h1>
      <section className="mt-8 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
        <h2 className="text-base font-medium">Organization</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Name</dt>
            <dd>{ORG.name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Plan</dt>
            <dd className="capitalize">{ORG.plan}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Owner</dt>
            <dd>{ORG.member}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd>{ORG.email}</dd>
          </div>
        </dl>
      </section>
      <section className="mt-4 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
        <h2 className="text-base font-medium">GitHub App</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Installed on {ORG.slug}. Contents: read for scans, write only through the isolated
          publisher. Scan workers never receive a write token.
        </p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">installation_id · 8402911</p>
      </section>
      <section className="mt-4 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
        <h2 className="text-base font-medium">Data and LLM</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Source snapshots expire 24 hours after a run. Evidence retained 90 days on Studio.
          Repository text is untrusted. Model training on customer code is off.
        </p>
      </section>
      <section className="mt-4 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
        <h2 className="text-base font-medium">Reset demo</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Restore the seeded Northstar, Atelier, Harbor, and Folio projects.
        </p>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => {
            reset();
            toast.success("Demo restored");
          }}
        >
          Restore seed data
        </Button>
      </section>
    </div>
  );
}
