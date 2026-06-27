const STATE_CODE_TO_SLUG: Record<string, string> = {
  al: 'alabama',
  ar: 'arkansas',
  az: 'arizona',
  fl: 'florida',
  ga: 'georgia',
  id: 'idaho',
  nc: 'north-carolina',
  ok: 'oklahoma',
  or: 'oregon',
  sc: 'south-carolina',
  tn: 'tennessee',
  tx: 'texas',
  va: 'virginia',
  wv: 'west-virginia',
  pa: 'pennsylvania',
  nj: 'new-jersey',
  ny: 'new-york',
  ma: 'massachusetts',
};

export function parseCountyKey(key: string): { stateSlug: string; countySlug: string } | null {
  const lastDash = key.lastIndexOf('-');
  if (lastDash <= 0) return null;

  const countySlug = key.slice(0, lastDash);
  const stateCode = key.slice(lastDash + 1).toLowerCase();
  const stateSlug = STATE_CODE_TO_SLUG[stateCode];
  if (!stateSlug) return null;

  return { stateSlug, countySlug };
}

export function countyKeyToLabel(key: string): string {
  const parsed = parseCountyKey(key);
  if (!parsed) return key;

  const countyName = parsed.countySlug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  const stateCode = key.slice(key.lastIndexOf('-') + 1).toUpperCase();
  return `${countyName}, ${stateCode}`;
}