import type { CarrierNumberType, ParsedCarrierNumber } from '@/lib/verify-dot/schema';

export type FmcsaPreview = {
  legalName?: string;
  dbaName?: string;
  physicalAddress?: string;
  phone?: string;
  usdot?: string;
  mcNumber?: string;
  authorityStatus?: string;
  allowedToOperate?: string;
  safetyRating?: string;
  outOfService?: string;
  source: 'fmcsa_api' | 'directory' | 'none';
};

/** Official FMCSA SAFER Company Snapshot — opens with number pre-filled */
export function buildSaferLookupUrl(parsed: ParsedCarrierNumber): string {
  const searchtype = parsed.type === 'MC' ? 'MC' : 'DOT';
  const param = parsed.type === 'MC' ? 'MC' : 'DOT';
  const params = new URLSearchParams({
    searchtype,
    querytype: 'queryCarrier',
    query_param: param,
    query_string: parsed.value,
  });
  return `https://safer.fmcsa.dot.gov/query.asp?${params.toString()}`;
}

type FmcsaApiCarrier = {
  legalName?: string;
  dbaName?: string;
  phyStreet?: string;
  phyCity?: string;
  phyState?: string;
  phyZipcode?: string;
  telephone?: string;
  allowedToOperate?: string;
  safetyRating?: string;
  oosDate?: string;
  carrierOperation?: { carrierOperationDesc?: string };
};

async function fetchFmcsaApi(
  parsed: ParsedCarrierNumber
): Promise<FmcsaPreview | null> {
  const webKey = process.env.FMCSA_WEB_KEY?.trim();
  if (!webKey) return null;

  const base = 'https://mobile.fmcsa.dot.gov/qc/services/carriers';
  const path =
    parsed.type === 'MC'
      ? `${base}/docket-number/MC${parsed.value}?webKey=${encodeURIComponent(webKey)}`
      : `${base}/${parsed.value}?webKey=${encodeURIComponent(webKey)}`;

  try {
    const res = await fetch(path, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as {
      content?: { carrier?: FmcsaApiCarrier };
    };
    const c = json?.content?.carrier;
    if (!c?.legalName) return null;

    const address = [c.phyStreet, c.phyCity, c.phyState, c.phyZipcode]
      .filter(Boolean)
      .join(', ');

    return {
      legalName: c.legalName,
      dbaName: c.dbaName,
      physicalAddress: address || undefined,
      phone: c.telephone,
      allowedToOperate: c.allowedToOperate,
      safetyRating: c.safetyRating,
      outOfService: c.oosDate ? 'Yes' : undefined,
      source: 'fmcsa_api',
    };
  } catch {
    return null;
  }
}

/** Optional FMCSA API + always returns SAFER URL */
export async function resolveCarrierPreview(
  parsed: ParsedCarrierNumber,
  directoryPreview?: FmcsaPreview | null
): Promise<{ saferUrl: string; preview: FmcsaPreview | null }> {
  const saferUrl = buildSaferLookupUrl(parsed);

  const apiPreview = await fetchFmcsaApi(parsed);
  if (apiPreview) {
    return { saferUrl, preview: apiPreview };
  }

  if (directoryPreview) {
    return { saferUrl, preview: directoryPreview };
  }

  return { saferUrl, preview: null };
}

export function carrierTypeLabel(type: CarrierNumberType): string {
  return type === 'MC' ? 'MC Number' : 'USDOT Number';
}