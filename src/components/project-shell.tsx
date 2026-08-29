import type { ReactNode } from "react";
import { Link, useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { useAppStore } from "@/lib/store";
import { GateBadge } from "./gate-badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { shortSha } from "@/lib/format";

const TABS = [
  { to: "/app/projects/$projectId", label: "Overview", id: "overview" },
  { to: "/app/projects/$projectId/issues", label: "Issues", id: "issues" },
  { to: "/app/projects/$projectId/architecture", label: "Architecture", id: "architecture" },
  { to: "/app/projects/$projectId/runs", label: "Runs", id: "runs" },
  { to: "/app/projects/$projectId/fixes", label: "Fixes", id: "fixes" },
  { to: "/app/projects/$projectId/settings", label: "Settings", id: "settings" },
] as const;

export function ProjectShell({ children }: { children: ReactNode }) {
  const { projectId } = useParams({ strict: false }) as { projectId: string };
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const project = useAppStore((s) => s.projects.find((p) => p.id === projectId));
  const run = useAppStore((s) => s.runs.find((r) => r.id === project?.latestRunId));
  const startRun = useAppStore((s) => s.startRun);

  if (!project) {
    return (
      <div className="px-4 py-16 text-center text-sm text-muted-foreground">
        Project not found.
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4 px-4 py-6">
          <div>
            <p className="font-mono text-[12px] text-muted-foreground">{project.repo}</p>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl tracking-tight">{project.name}</h1>
              {run ? <GateBadge gate={run.gate} /> : null}
            </div>
            {run ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {shortSha(run.commitSha)} · {run.branch} · {run.checkPack}
              </p>
            ) : null}
          </div>
          <Button
            onClick={() => {
              const id = startRun(project.id);
              if (id) {
                void navigate({
                  to: "/app/projects/$projectId/runs/$runId",
                  params: { projectId: project.id, runId: id },
                });
              }
            }}
          >
            Re-run
          </Button>
        </div>
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4">
          {TABS.map((t) => {
            const href = t.to.replace("$projectId", projectId);
            const active =
              t.id === "overview"
                ? pathname === href
                : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={t.id}
                to={t.to}
                params={{ projectId }}
                className={cn(
                  "min-h-11 shrink-0 border-b-2 px-3 py-2 text-sm",
                  active
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}
