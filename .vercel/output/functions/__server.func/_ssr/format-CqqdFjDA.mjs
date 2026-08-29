import { n as format, t as formatDistanceToNowStrict } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-CqqdFjDA.js
function relTime(iso) {
	try {
		return formatDistanceToNowStrict(new Date(iso), { addSuffix: true });
	} catch {
		return iso;
	}
}
function absTime(iso) {
	try {
		return format(new Date(iso), "d MMM yyyy, HH:mm");
	} catch {
		return iso;
	}
}
function shortSha(sha) {
	return sha.slice(0, 7);
}
function pct(n) {
	return `${Math.round(n * 100)}%`;
}
function gateTone(g) {
	if (g === "blocked") return "blocked";
	if (g === "at_risk" || g === "insufficient_evidence") return "atrisk";
	if (g === "ready_for_tested_scope" || g === "ready_with_exceptions") return "ready";
	return "muted";
}
function statusLabel(s) {
	return {
		open: "Open",
		resolved: "Resolved",
		disputed: "Disputed",
		accepted: "Accepted risk",
		not_relevant: "Not relevant"
	}[s];
}
function hashPreview(h) {
	return `${h.slice(0, 8)}…${h.slice(-6)}`;
}
//#endregion
export { relTime as a, pct as i, gateTone as n, shortSha as o, hashPreview as r, statusLabel as s, absTime as t };
