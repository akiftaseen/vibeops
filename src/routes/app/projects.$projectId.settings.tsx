import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/app/projects/$projectId/settings")({
  component: ProjectSettings,
});

function ProjectSettings() {
  const { projectId } = Route.useParams();
  const project = useAppStore((s) => s.projects.find((p) => p.id === projectId));
  if (!project) return null;
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl">Project settings</h2>
      <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h3 className="text-sm font-medium">Launch scope</h3>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Purpose</dt>
            <dd>{project.purpose}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Data</dt>
            <dd className="capitalize">{project.dataSensitivity}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Payments</dt>
            <dd>{project.payments.replaceAll("_", " ")}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Owner</dt>
            <dd>{project.owner}</dd>
          </div>
        </dl>
      </section>
      <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h3 className="text-sm font-medium">Environments</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {project.environments.map((e) => (
            <li key={e.id}>
              {e.name} · {e.kind} · {e.ownership}
              {e.baseUrl ? ` · ${e.baseUrl}` : ""}
              {e.activeTests ? " · active tests on" : " · active tests off"}
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h3 className="text-sm font-medium">Personas</h3>
        {project.personas.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">None configured — authorization checks skipped.</p>
        ) : (
          <ul className="mt-3 space-y-1 text-sm">
            {project.personas.map((p) => (
              <li key={p.id}>
                {p.label} · {p.role.replaceAll("_", " ")} · {p.email}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h3 className="text-sm font-medium">Critical flows</h3>
        <ul className="mt-3 space-y-3 text-sm">
          {project.flows.map((f) => (
            <li key={f.id}>
              <p className="font-medium">
                {f.name} {f.approved ? "" : "· pending approval"}
              </p>
              <p className="text-muted-foreground">{f.steps.join(" → ")}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
