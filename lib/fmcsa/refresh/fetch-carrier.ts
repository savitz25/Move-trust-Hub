import 'server-only';

import type { ParsedCarrierNumber } from '@/lib/verify-dot/schema';
import type { FmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/types';
import { FMCSA_REFRESH_CONFIG, sleep } from '@/lib/fmcsa/refresh/rate-limit';

type FmcsaApiCarrier = {
  dotNumber?: number | string;
  docketNumber?: string;
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
  commonAuthorityStatus?: string;
  contractAuthorityStatus?: string;
  brokerAuthorityStatus?: string;
  commonAuthorityRevocation?: string;
  contractAuthorityRevocation?: string;
  brokerAuthorityRevocation?: string;
  totalComplaints?: number;
  complaintCount?: number;
  totalInspections?: number;
  totalPowerUnits?: number;
  totalDrivers?: number;
  carrierOperation?: { carrierOperationDesc?: string };
};

export function formatFmcsaPhysicalAddress(carrier: FmcsaApiCarrier): string | null {
  const address = [carrier.phyStreet, carrier.phyCity, carrier.phyState, carrier.phyZipcode]
    .filter(Boolean)
    .join(', ');
  return address || null;
}

function normalizeSafetyRating(
  raw?: string | null
): FmcsaCarrierSnapshot['safetyRating'] {
  const value = (raw ?? '').trim();
  if (value === 'Satisfactory' || value === 'Conditional' || value === 'Unsatisfactory') {
    return value;
  }
  return 'Not Rated';
}

function isAuthorityActive(status?: string | null): boolean {
  if (!status) return false;
  const code = status.trim().toUpperCase();
  return code === 'A' || code === 'ACTIVE';
}

function parseRevocationDate(carrier: FmcsaApiCarrier): string | null {
  const candidates = [
    carrier.commonAuthorityRevocation,
    carrier.contractAuthorityRevocation,
    carrier.brokerAuthorityRevocation,
  ].filter(Boolean) as string[];

  if (!candidates.length) return null;
  const parsed = candidates
    .map((d) => new Date(d))
    .filter((d) => !Number.isNaN(d.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0];
  return parsed ? parsed.toISOString().slice(0, 10) : null;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function fetchCarrierByDot(
  dot: string,
  webKey: string
): Promise<FmcsaApiCarrier | null> {
  const base = 'https://mobile.fmcsa.dot.gov/qc/services/carriers';
  const url = `${base}/${encodeURIComponent(dot)}?webKey=${encodeURIComponent(webKey)}`;
  const json = await fetchJson<{ content?: { carrier?: FmcsaApiCarrier } }>(url);
  return json?.content?.carrier ?? null;
}

async function fetchCarrierByMc(
  mc: string,
  webKey: string
): Promise<FmcsaApiCarrier | null> {
  const base = 'https://mobile.fmcsa.dot.gov/qc/services/carriers';
  const digits = mc.replace(/\D/g, '');
  const url = `${base}/docket-number/MC${encodeURIComponent(digits)}?webKey=${encodeURIComponent(webKey)}`;
  const json = await fetchJson<{ content?: { carrier?: FmcsaApiCarrier } }>(url);
  return json?.content?.carrier ?? null;
}

async function fetchComplaintsByDot(dot: string, webKey: string): Promise<number | null> {
  const base = 'https://mobile.fmcsa.dot.gov/qc/services/carriers';
  const url = `${base}/${encodeURIComponent(dot)}/complaints?webKey=${encodeURIComponent(webKey)}`;
  const json = await fetchJson<{
    content?: { complaints?: { complaintCount?: number; total?: number }[] };
    complaintCount?: number;
  }>(url);

  if (typeof json?.complaintCount === 'number') return json.complaintCount;

  const complaints = json?.content?.complaints;
  if (Array.isArray(complaints) && complaints.length) {
    const sum = complaints.reduce(
      (acc, row) => acc + (row.complaintCount ?? row.total ?? 0),
      0
    );
    return sum;
  }
  return null;
}

function snapshotFromCarrier(
  carrier: FmcsaApiCarrier,
  dot: string,
  mcNumber: string | undefined,
  complaints: number
): FmcsaCarrierSnapshot {
  const allowed = (carrier.allowedToOperate ?? '').trim().toUpperCase() === 'Y';
  const authorityActive =
    allowed &&
    (isAuthorityActive(carrier.commonAuthorityStatus) ||
      isAuthorityActive(carrier.contractAuthorityStatus) ||
      isAuthorityActive(carrier.brokerAuthorityStatus));

  const shipments = Math.max(
    Number(carrier.totalPowerUnits ?? 0) * 50,
    Number(carrier.totalInspections ?? 0) * 10,
    1000
  );

  return {
    dotNumber: String(carrier.dotNumber ?? dot),
    mcNumber,
    legalName: carrier.legalName,
    dbaName: carrier.dbaName,
    allowedToOperate: allowed,
    authorityActive,
    outOfService: Boolean(carrier.oosDate),
    safetyRating: normalizeSafetyRating(carrier.safetyRating),
    complaintsLast12m: complaints,
    shipments,
    revocationDate: parseRevocationDate(carrier),
    commonAuthorityStatus: carrier.commonAuthorityStatus,
    brokerAuthorityStatus: carrier.brokerAuthorityStatus,
    raw: carrier as Record<string, unknown>,
  };
}

async function snapshotFromResolvedCarrier(params: {
  carrier: FmcsaApiCarrier;
  dot: string;
  mcNumber?: string;
  webKey: string;
}): Promise<FmcsaCarrierSnapshot | null> {
  let complaints = params.carrier.totalComplaints ?? params.carrier.complaintCount ?? 0;
  const complaintFetch = await fetchComplaintsByDot(params.dot, params.webKey);
  if (complaintFetch !== null) {
    complaints = complaintFetch;
  }

  await sleep(FMCSA_REFRESH_CONFIG.requestDelayMs);
  return snapshotFromCarrier(
    params.carrier,
    params.dot,
    params.mcNumber,
    complaints
  );
}

/** Fetch FMCSA snapshot by parsed USDOT or MC docket (primary lookup for suggest/verify flows). */
export async function fetchFmcsaCarrierByParsed(
  parsed: ParsedCarrierNumber
): Promise<FmcsaCarrierSnapshot | null> {
  const webKey = process.env.FMCSA_WEB_KEY?.trim();
  if (!webKey) return null;

  let lastError: unknown = null;

  for (let attempt = 0; attempt <= FMCSA_REFRESH_CONFIG.maxRetries; attempt++) {
    if (attempt > 0) {
      await sleep(FMCSA_REFRESH_CONFIG.retryBackoffMs * attempt);
    }

    try {
      if (parsed.type === 'MC') {
        const carrier = await fetchCarrierByMc(parsed.value, webKey);
        if (!carrier?.legalName) {
          lastError = new Error(`No carrier data for MC ${parsed.value}`);
          continue;
        }
        const dot = String(carrier.dotNumber ?? '').replace(/\D/g, '');
        if (!dot) {
          lastError = new Error(`MC ${parsed.value} missing linked USDOT`);
          continue;
        }
        return snapshotFromResolvedCarrier({
          carrier,
          dot,
          mcNumber: parsed.value,
          webKey,
        });
      }

      const dot = parsed.value.replace(/\D/g, '');
      const carrier = await fetchCarrierByDot(dot, webKey);
      if (!carrier?.legalName) {
        lastError = new Error(`No carrier data for DOT ${dot}`);
        continue;
      }

      const mcDigits = carrier.docketNumber?.replace(/\D/g, '') || undefined;
      return snapshotFromResolvedCarrier({
        carrier,
        dot,
        mcNumber: mcDigits,
        webKey,
      });
    } catch (err) {
      lastError = err;
    }
  }

  console.error('[fmcsa-refresh] fetch by parsed failed', {
    type: parsed.type,
    value: parsed.value,
    error: lastError,
  });
  return null;
}

/** Fetch FMCSA carrier snapshot by USDOT with retries and rate limiting. */
export async function fetchFmcsaCarrierSnapshot(
  usdot: string,
  mcNumber?: string | null
): Promise<FmcsaCarrierSnapshot | null> {
  const dot = usdot.replace(/\D/g, '');
  if (!dot) return null;

  const parsed = {
    type: 'DOT' as const,
    value: dot,
    display: `DOT ${dot}`,
  };

  const snapshot = await fetchFmcsaCarrierByParsed(parsed);
  if (!snapshot) return null;

  if (mcNumber?.replace(/\D/g, '')) {
    return {
      ...snapshot,
      mcNumber: mcNumber.replace(/\D/g, ''),
    };
  }

  return snapshot;
}