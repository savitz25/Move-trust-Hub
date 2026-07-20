/** Interstate (USDOT) vs Intrastate / local-only movers. */

export type ServiceScope = 'interstate' | 'intrastate';

export type SelectedCounty = {
  stateSlug: string;
  countySlug: string;
  name?: string;
};

export function isServiceScope(value: unknown): value is ServiceScope {
  return value === 'interstate' || value === 'intrastate';
}

export function parseServiceScope(value: unknown): ServiceScope {
  return value === 'intrastate' ? 'intrastate' : 'interstate';
}

export function normalizeSelectedCounties(raw: unknown): SelectedCounty[] {
  if (!Array.isArray(raw)) return [];
  const out: SelectedCounty[] = [];
  const seen = new Set<string>();
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue;
    const rec = entry as Record<string, unknown>;
    const stateSlug =
      typeof rec.stateSlug === 'string' ? rec.stateSlug.trim().toLowerCase() : '';
    const countySlug =
      typeof rec.countySlug === 'string' ? rec.countySlug.trim().toLowerCase() : '';
    if (!stateSlug || !countySlug) continue;
    const key = `${stateSlug}/${countySlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      stateSlug,
      countySlug,
      name: typeof rec.name === 'string' ? rec.name.trim() : undefined,
    });
  }
  return out;
}

export function isInterstateCompany(company: {
  serviceScope?: string | null;
  service_scope?: string | null;
}): boolean {
  const scope = company.serviceScope ?? company.service_scope ?? 'interstate';
  return scope !== 'intrastate';
}
