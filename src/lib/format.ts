import { formatDistanceToNowStrict, format } from "date-fns";
import type { GateStatus, Severity, Confidence, FindingStatus } from "./types";

export function relTime(iso: string) {
  try {
    return formatDistanceToNowStrict(new Date(iso), { addSuffix: true });
  } catch {
    return iso;
  }
}

export function absTime(iso: string) {
  try {
    return format(new Date(iso), "d MMM yyyy, HH:mm");
  } catch {
    return iso;
  }
}

export function shortSha(sha: string) {
  return sha.slice(0, 7);
}

export function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

export function gateTone(g: GateStatus): "blocked" | "atrisk" | "ready" | "muted" {
  if (g === "blocked") return "blocked";
  if (g === "at_risk" || g === "insufficient_evidence") return "atrisk";
  if (g === "ready_for_tested_scope" || g === "ready_with_exceptions") return "ready";
  return "muted";
}

export function severityTone(s: Severity): "blocked" | "atrisk" | "muted" | "ready" {
  if (s === "critical") return "blocked";
  if (s === "high") return "atrisk";
  if (s === "medium") return "muted";
  return "muted";
}

export function confidenceLabel(c: Confidence) {
  if (c === "high") return "High confidence";
  return c[0].toUpperCase() + c.slice(1);
}

export function statusLabel(s: FindingStatus) {
  return (
    {
      open: "Open",
      resolved: "Resolved",
      disputed: "Disputed",
      accepted: "Accepted risk",
      not_relevant: "Not relevant",
    } as const
  )[s];
}

export function hashPreview(h: string) {
  return `${h.slice(0, 8)}…${h.slice(-6)}`;
}
