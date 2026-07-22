/** Pure helpers for coverage_counties / assignment county lists (client-safe). */

export type AssignmentCounty = {
  stateSlug: string;
  countySlug: string;
};

/** Merge assignment counties into company.coverageCounties (deduped). */
export function mergeCoverageWithAssignments(
  existing: Array<{ stateSlug: string; countySlug: string; name?: string }> | null | undefined,
  assigned: AssignmentCounty[] | undefined
): Array<{ stateSlug: string; countySlug: string; name?: string }> {
  const out: Array<{ stateSlug: string; countySlug: string; name?: string }> = [];
  const seen = new Set<string>();

  for (const c of existing ?? []) {
    const stateSlug = String(c.stateSlug || '')
      .trim()
      .toLowerCase();
    const countySlug = String(c.countySlug || '')
      .trim()
      .toLowerCase();
    if (!stateSlug || !countySlug) continue;
    const key = `${stateSlug}/${countySlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ stateSlug, countySlug, name: c.name });
  }

  for (const c of assigned ?? []) {
    const key = `${c.stateSlug}/${c.countySlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ stateSlug: c.stateSlug, countySlug: c.countySlug });
  }

  return out;
}
