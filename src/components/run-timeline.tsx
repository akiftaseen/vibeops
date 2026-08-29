import type { Run } from "@/lib/types";
import { cn } from "@/lib/utils";
import { absTime } from "@/lib/format";

export function RunTimeline({ run }: { run: Run }) {
  return (
    <ol className="space-y-0">
      {run.steps.map((step, i) => (
        <li key={step.phase} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "mt-1 size-2.5 rounded-full",
                step.state === "done" && "bg-ready",
                step.state === "running" && "bg-primary animate-pulse",
                step.state === "error" && "bg-blocked",
                step.state === "pending" && "bg-border",
              )}
            />
            {i < run.steps.length - 1 ? <span className="w-px flex-1 bg-border" /> : null}
          </div>
          <div className="pb-5">
            <p className="text-sm font-medium">{step.label}</p>
            {step.note ? (
              <p className="mt-0.5 text-sm text-muted-foreground">{step.note}</p>
            ) : null}
            {step.completedAt ? (
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                {absTime(step.completedAt)}
              </p>
            ) : step.state === "running" ? (
              <p className="mt-1 font-mono text-[11px] text-primary">In progress</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
