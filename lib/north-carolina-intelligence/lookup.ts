import roster from './accepted-roster.json';

export type NcNcucHit = {
  cNumber: string;
  tNumber: string | null;
  name: string;
  status: string;
};

type RosterFile = { rows: NcNcucHit[] };

function compact(raw: string): string {
  return raw.replace(/\s+/g, '').toUpperCase();
}

export function normalizeNcCNumber(raw: string): string | null {
  const compactId = compact(raw);
  const match = compactId.match(/^(?:NCUC)?C-?(\d{3,5})$/);
  if (!match) return null;
  return `C-${match[1]}`;
}

export function normalizeNcTNumber(raw: string): string | null {
  const compactId = compact(raw);
  const match = compactId.match(/^(?:NCUC)?T-?(\d{3,5})$/);
  if (!match) return null;
  return `T-${match[1]}`;
}

export function lookupNcNcucIdentity(raw?: string | null): {
  query: string;
  hits: NcNcucHit[];
  note: string;
} {
  const query = (raw || '').trim();
  const cNumber = normalizeNcCNumber(query);
  const tNumber = normalizeNcTNumber(query);
  if (!cNumber && !tNumber) {
    return {
      query,
      hits: [],
      note: 'Enter an NCUC C-number (Certificate of Exemption) or T-number (company/docket). Name-only search is not used.',
    };
  }
  const rows = (roster as RosterFile).rows;
  const hits = rows.filter((row) => {
    if (cNumber && row.cNumber === cNumber) return true;
    if (tNumber && row.tNumber === tNumber) return true;
    return false;
  });
  return {
    query,
    hits,
    note: hits.length
      ? 'C-number is the Certificate of Exemption. T-number is the NCUC company/docket identity. They are not the same and are not USDOT or MC numbers.'
      : 'No match on the accepted September 8, 2026 NCUC household-goods carrier-list snapshot. Absence is not FMCSA interstate status.',
  };
}
