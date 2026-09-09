import permitIndex from './permit-index.json';
import { COLORADO_MOVE_SNAPSHOT } from './snapshot';

export type CoPermitHit = {
  permitNumber: string;
  identity: string;
  status: string;
  currentUniverse: boolean;
};

export type CoPermitLookup = {
  query: string;
  hits: CoPermitHit[];
  note: string;
};

type IndexFile = { rows: { n: string; s: string }[] };

function loadIndex(): IndexFile {
  return permitIndex as IndexFile;
}

function normalizePermit(raw: string): string {
  const compact = raw.toUpperCase().replace(/\s+/g, '');
  if (/^HHG-\d{5}$/.test(compact)) return compact;
  const digits = compact.replace(/\D/g, '');
  if (digits.length >= 1 && digits.length <= 5) return `HHG-${digits.padStart(5, '0')}`;
  return compact;
}

export function lookupColoradoPermit(raw?: string | null): CoPermitLookup {
  const query = (raw || '').trim();
  if (!query) {
    return {
      query: '',
      hits: [],
      note: 'Enter an official HHG permit number such as HHG-00513. licenseNumber-style digits alone are padded. Name-only search is not used.',
    };
  }
  const permit = normalizePermit(query);
  const hits = loadIndex()
    .rows.filter((row) => row.n === permit)
    .map((row) => ({
      permitNumber: row.n,
      identity: `CO-PUC-HHG:${row.n}`,
      status: row.s,
      currentUniverse: row.s === 'ACTIVE',
    }));
  return {
    query: permit,
    hits,
    note:
      hits.length === 0
        ? 'No matching HHG permit on the accepted OPR extract. Confirm on the official PUC permit search. Absence from this extract is not proof of unlicensed interstate authority.'
        : `Source-native OPR status class(es) for ${permit}. Colorado ACTIVE is not FMCSA ACTIVE. Confirm on the official PUC permit search. Snapshot as of ${COLORADO_MOVE_SNAPSHOT.source.source_publication_date}.`,
  };
}
