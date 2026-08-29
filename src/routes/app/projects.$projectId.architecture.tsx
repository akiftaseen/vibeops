import { createFileRoute } from "@tanstack/react-router";
import { ArchitectureMap } from "@/components/architecture-map";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/app/projects/$projectId/architecture")({
  component: ArchPage,
});

function ArchPage() {
  const { projectId } = Route.useParams();
  const project = useAppStore((s) => s.projects.find((p) => p.id === projectId));
  if (!project) return null;
  return (
    <div>
      <h2 className="font-display text-2xl">Architecture</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Corrections create a new annotation. Historical run evidence is never mutated.
      </p>
      <div className="mt-6">
        <ArchitectureMap graph={project.graph} />
      </div>
    </div>
  );
}
