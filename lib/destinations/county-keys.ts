const STATE_CODE_TO_SLUG: Record<string, string> = {
  al: 'alabama',
  ak: 'alaska',
  az: 'arizona',
  ar: 'arkansas',
  ca: 'california',
  co: 'colorado',
  ct: 'connecticut',
  de: 'delaware',
  fl: 'florida',
  ga: 'georgia',
  hi: 'hawaii',
  id: 'idaho',
  il: 'illinois',
  in: 'indiana',
  ia: 'iowa',
  ks: 'kansas',
  ky: 'kentucky',
  la: 'louisiana',
  me: 'maine',
  md: 'maryland',
  ma: 'massachusetts',
  mi: 'michigan',
  mn: 'minnesota',
  ms: 'mississippi',
  mo: 'missouri',
  mt: 'montana',
  ne: 'nebraska',
  nv: 'nevada',
  nh: 'new-hampshire',
  nj: 'new-jersey',
  nm: 'new-mexico',
  ny: 'new-york',
  nc: 'north-carolina',
  nd: 'north-dakota',
  oh: 'ohio',
  ok: 'oklahoma',
  or: 'oregon',
  pa: 'pennsylvania',
  ri: 'rhode-island',
  sc: 'south-carolina',
  sd: 'south-dakota',
  tn: 'tennessee',
  tx: 'texas',
  ut: 'utah',
  vt: 'vermont',
  va: 'virginia',
  wa: 'washington',
  wv: 'west-virginia',
  wi: 'wisconsin',
  wy: 'wyoming',
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