import roster from './accepted-roster.json';

export type PaPucHit = {
  utilityCode: string;
  carrierId: string;
  applicationNumbers: string[];
  name: string;
  hhgActive: boolean;
};

type RosterFile = { rows: PaPucHit[] };

function compactId(raw: string): string {
  return raw.replace(/\s+/g, '').toUpperCase();
}

export function normalizePaUtilityCode(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  if (!/^\d{6,8}$/.test(digits)) return null;
  return digits;
}

export function normalizePaCarrierId(raw: string): string | null {
  const compact = compactId(raw);
  const labeled = compact.match(/^A-?(\d{6,9})$/);
  if (labeled) return `A-${labeled[1].padStart(8, '0').replace(/^0+(\d{8})$/, '$1')}`;
  if (/^A-\d{6,9}$/.test(compact)) return compact;
  return null;
}

export function lookupPaPucIdentity(raw?: string | null): { query: string; hits: PaPucHit[]; note: string } {
  const query = (raw || '').trim();
  const utility = normalizePaUtilityCode(query);
  const carrier = normalizePaCarrierId(query);
  if (!utility && !carrier) {
    return {
      query,
      hits: [],
      note: 'Enter a PA PUC Utility Code or Carrier ID / A-number. Name-only search is not used.',
    };
  }
  const rows = (roster as RosterFile).rows;
  const hits = rows.filter((row) => {
    if (utility && row.utilityCode === utility) return true;
    if (carrier && compactId(row.carrierId) === compactId(carrier)) return true;
    if (carrier && row.applicationNumbers.some((n) => compactId(n) === compactId(carrier))) return true;
    if (utility && compactId(row.carrierId) === utility) return true;
    return false;
  });
  return {
    query,
    hits,
    note: hits.length
      ? 'Utility Code identifies the PUC utility entity. Carrier ID / application number identifies authority. They are not automatically the same.'
      : 'No match on the accepted active Household Goods Operators snapshot. Absence is not FMCSA interstate status.',
  };
}
