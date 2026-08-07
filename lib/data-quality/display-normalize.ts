/**
 * Phase 2 — normalize repeated attributes before render.
 */

export function dedupeStringList(
  values: string[] | null | undefined,
  opts?: { caseInsensitive?: boolean }
): string[] {
  if (!Array.isArray(values)) return [];
  const caseInsensitive = opts?.caseInsensitive ?? true;
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of values) {
    const v = String(raw ?? '').trim();
    if (!v) continue;
    const key = caseInsensitive ? v.toLowerCase() : v;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v);
  }
  return out;
}

/** Map near-duplicate service tags to a single display label. */
const SERVICE_ALIASES: Record<string, string> = {
  carrier: 'Carrier',
  'full service': 'Full Service',
  fullservice: 'Full Service',
  'local mover': 'Local Mover',
  'local movers': 'Local Mover',
  'auto transport': 'Auto Transport',
  'carrier / broker': 'Carrier / Broker',
  'carrier/broker': 'Carrier / Broker',
  'broker / carrier': 'Carrier / Broker',
};

export function normalizeServiceTags(values: string[] | null | undefined): string[] {
  const mapped = (values ?? []).map((v) => {
    const t = String(v).trim();
    const alias = SERVICE_ALIASES[t.toLowerCase()];
    return alias || t;
  });
  return dedupeStringList(mapped);
}

export function normalizeSpecialtyTags(values: string[] | null | undefined): string[] {
  return dedupeStringList(values);
}
