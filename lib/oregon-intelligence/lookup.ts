import roster from './accepted-roster.json';
import { OREGON_MOVE_SNAPSHOT } from './snapshot';

export type OrCertificateHit = {
  certificateNumber: string;
  identity: string;
  title: string;
  hasLocalCartage: boolean;
  hasOtherThanLocal: boolean;
  otherThanLocalUnrestricted: boolean;
  specializedPiano: boolean;
  authorizedServiceText: string;
};

export type OrCertificateLookup = {
  query: string;
  hits: OrCertificateHit[];
  note: string;
};

type RosterFile = {
  rows: Array<{
    title: string;
    certificateNumber: string | null;
    hasLocalCartage: boolean;
    hasOtherThanLocal: boolean;
    otherThanLocalUnrestricted: boolean;
    specializedPiano: boolean;
    authorizedServiceText: string;
  }>;
};

function digits(raw: string): string {
  return raw.replace(/\D/g, '');
}

export function normalizeOregonCertificate(raw: string): string | null {
  const compact = digits(raw);
  if (!/^\d{4,8}$/.test(compact)) return null;
  return compact;
}

export function lookupOregonCertificate(raw?: string | null): OrCertificateLookup {
  const query = (raw || '').trim();
  const cert = normalizeOregonCertificate(query);
  if (!cert) {
    return {
      query,
      hits: [],
      note: 'Enter an Oregon household-goods certificate number. Name-only search is not used. Bare digits are not treated as USDOT or MC.',
    };
  }
  const hits = (roster as RosterFile).rows
    .filter((row) => row.certificateNumber && digits(row.certificateNumber) === cert)
    .map((row) => ({
      certificateNumber: row.certificateNumber as string,
      identity: `OR-ODOT-HHG:${row.certificateNumber}`,
      title: row.title,
      hasLocalCartage: row.hasLocalCartage,
      hasOtherThanLocal: row.hasOtherThanLocal,
      otherThanLocalUnrestricted: row.otherThanLocalUnrestricted,
      specializedPiano: row.specializedPiano,
      authorizedServiceText: row.authorizedServiceText,
    }));
  return {
    query: cert,
    hits,
    note:
      hits.length === 0
        ? 'No matching Oregon household-goods certificate on the accepted ODOT authorized list. Confirm on the official authorized-movers list. Absence from this snapshot is not FMCSA interstate status.'
        : `Source-native ODOT CCD authorized-list row(s) for certificate ${hits[0]!.certificateNumber}. An Oregon certificate is not a USDOT or MC number and is not statewide service unless the authorized-service text says so. Snapshot list LastItemModifiedDate ${OREGON_MOVE_SNAPSHOT.clocks.hhg_roster.sourceUpdatedAt}.`,
  };
}
