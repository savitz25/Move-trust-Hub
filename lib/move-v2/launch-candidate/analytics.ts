export const MOVE_LAUNCH_EVENTS = [
  "move_search", "move_path_selected", "trust_report_open", "source_open",
  "compare_add", "compare_view", "shortlist_add", "shortlist_remove",
  "calculator_start", "calculator_complete", "move_plan_start",
  "provider_website_click", "provider_phone_click",
] as const;
export type MoveLaunchEvent = typeof MOVE_LAUNCH_EVENTS[number];
const ALLOWED_FIELDS = new Set(["state", "move_path", "evidence_tier", "provider_id", "source_type", "count", "page_path", "calculator_type"]);
const once = new Set<string>();
export function safeMoveEvent(name: MoveLaunchEvent, fields: Record<string, unknown>, dedupeKey?: string) {
  for (const key of Object.keys(fields)) if (!ALLOWED_FIELDS.has(key)) throw new Error(`Analytics field not approved: ${key}`);
  if (dedupeKey) { const key = `${name}:${dedupeKey}`; if (once.has(key)) return null; once.add(key); }
  return { name, fields: Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined && value !== null)) };
}
export function resetAnalyticsDedupeForTest() { once.clear(); }
