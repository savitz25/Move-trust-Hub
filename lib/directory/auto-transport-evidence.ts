import evidence from '@/data/fmcsa/auto-transport-evidence.json';

export type AutoTransportEvidence = {
  usdot: string;
  motorVehicles: boolean;
  driveawayTowaway: boolean;
  mcs150Date: string | null;
  statusCode: string | null;
};

function normalizeUsdot(value: string | null | undefined): string {
  return String(value ?? '').replace(/\D/g, '');
}

const byUsdot = new Map<string, AutoTransportEvidence>(
  evidence.records.map((record) => [record.usdot, record])
);

/** Exact USDOT match against the dated FMCSA Company Census cargo snapshot. */
export function getAutoTransportEvidence(
  usdotNumber: string | null | undefined
): AutoTransportEvidence | null {
  const usdot = normalizeUsdot(usdotNumber);
  if (!usdot) return null;
  return byUsdot.get(usdot) ?? null;
}

export function hasSourceBackedAutoTransportEvidence(input: {
  usdotNumber?: string | null;
}): boolean {
  return getAutoTransportEvidence(input.usdotNumber) !== null;
}

export const AUTO_TRANSPORT_EVIDENCE_USDOTS = Object.freeze(
  evidence.records.map((record) => record.usdot)
);

export const AUTO_TRANSPORT_EVIDENCE_SOURCE = Object.freeze(evidence.source);
