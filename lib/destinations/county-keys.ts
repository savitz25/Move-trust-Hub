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
  ri: 'rhode-island',
  vt: 'vermont',
  nh: 'new-hampshire',
  me: 'maine',
  in: 'indiana',
  oh: 'ohio',
  il: 'illinois',
  la: 'louisiana',
  ms: 'mississippi',
  ak: 'alaska',
  nm: 'new-mexico',
  hi: 'hawaii',
  ct: 'connecticut',
  co: 'colorado',
  de: 'delaware',
  ia: 'iowa',
  ks: 'kansas',
  ky: 'kentucky',
  md: 'maryland',
  mn: 'minnesota',
  mo: 'missouri',
  mt: 'montana',
  ne: 'nebraska',
  nv: 'nevada',
  nd: 'north-dakota',
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