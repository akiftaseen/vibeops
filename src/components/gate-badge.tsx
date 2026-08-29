import { GATE_COPY, type GateStatus, type Severity, type Confidence } from "@/lib/types";
import { cn } from "@/lib/utils";
import { gateTone } from "@/lib/format";

const toneClass = {
  blocked: "border-blocked/35 bg-blocked/12 text-blocked",
  atrisk: "border-atrisk/35 bg-atrisk/12 text-atrisk",
  ready: "border-ready/35 bg-ready/12 text-ready",
  muted: "border-border bg-secondary text-muted-foreground",
};

export function GateBadge({
  gate,
  size = "md",
  className,
}: {
  gate: GateStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const tone = gateTone(gate);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium uppercase tracking-wider",
        toneClass[tone],
        size === "sm" && "px-2 py-0.5 text-[10px]",
        size === "md" && "px-2.5 py-1 text-[11px]",
        size === "lg" && "px-3 py-1.5 text-xs",
        className,
      )}
    >
      {GATE_COPY[gate].label}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  const map: Record<Severity, keyof typeof toneClass> = {
    critical: "blocked",
    high: "atrisk",
    medium: "muted",
    low: "muted",
    info: "muted",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        toneClass[map[severity]],
      )}
    >
      {severity}
    </span>
  );
}

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
      {confidence === "high" ? "High confidence" : confidence}
    </span>
  );
}

export function Stamp({
  gate,
  className,
}: {
  gate: GateStatus;
  className?: string;
}) {
  const tone = gateTone(gate);
  const color =
    tone === "blocked"
      ? "text-blocked"
      : tone === "ready"
        ? "text-ready"
        : tone === "atrisk"
          ? "text-atrisk"
          : "text-muted-foreground";
  return (
    <div
      className={cn(
        "stamp-ring flex size-24 rotate-[-12deg] items-center justify-center rounded-full border-[3px] border-current px-2 text-center font-display text-[11px] font-medium uppercase leading-tight tracking-[0.18em] opacity-90",
        color,
        className,
      )}
    >
      {GATE_COPY[gate].label}
    </div>
  );
}
