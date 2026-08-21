/**
 * Operating-address quality classification for VERIFIED_HOME_COUNTY.
 */
import type { AddressQualityClass } from '@/lib/state-hhg/discovery/types';

export function classifyAddressQuality(
  address: string | null | undefined
): AddressQualityClass {
  if (!address || !String(address).trim()) return 'UNRESOLVED';
  const a = String(address).trim();
  const upper = a.toUpperCase();

  if (
    /\bP\.?\s*O\.?\s*BOX\b/i.test(a) ||
    /\bPOST\s+OFFICE\s+BOX\b/i.test(a) ||
    /\bPOBOX\b/i.test(upper)
  ) {
    return 'PO_BOX';
  }

  // Explicit mailing cues without street number often mailing-only
  if (/\bMAIL(?:ING)?\s+(?:ADDR|ADDRESS)\b/i.test(a) && !/\d/.test(a)) {
    return 'MAILING_ONLY';
  }

  // Suite/unit with street number → business/operating
  if (/\d/.test(a) && /\b(ST|STREET|AVE|AVENUE|RD|ROAD|BLVD|DR|DRIVE|LN|LANE|WAY|CT|COURT|HWY|HIGHWAY|PKWY)\b/i.test(a)) {
    return 'PHYSICAL_OPERATING';
  }

  if (/\d/.test(a)) {
    return 'BUSINESS_ADDRESS';
  }

  if (a.length < 8) return 'AMBIGUOUS';
  return 'AMBIGUOUS';
}

export function addressSupportsHomeCounty(
  quality: AddressQualityClass
): boolean {
  return quality === 'PHYSICAL_OPERATING' || quality === 'BUSINESS_ADDRESS';
}
