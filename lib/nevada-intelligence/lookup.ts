import roster from './accepted-roster.json';

export type NevadaNtaHhgRow = {
  cpcn: string;
  carrierName: string;
  dba: string | null;
  classificationEvidence: string;
  ntaActiveListStatus: string | null;
  directoryMatch: string;
  directoryCpcnAsPrinted: string | null;
  directoryStatusText: string | null;
  directoryCorporateName: string | null;
  certificateUrl: string | null;
  tariffUrl: string | null;
  tariffTitleSaysHouseholdGoods: boolean | null;
  certificateTextSaysHouseholdGoods: boolean | null;
};

export const NEVADA_NTA_HHG_ROWS = (roster as { rows: NevadaNtaHhgRow[] }).rows;
const CPCN = /^\d{3,4}(?:\.\d{1,3})?$/;
const NOISE = new Set([
  'nevada', 'nv', 'nta', 'transportation', 'authority', 'cpcn', 'certificate', 'permit', 'number', 'no', 'is', 'on', 'the',
  'check', 'find', 'lookup', 'look', 'up', 'licensed', 'license', 'mover', 'movers', 'moving', 'company', 'companies',
  'household', 'goods', 'hhg', 'intrastate', 'a', 'an', 'of', 'for', 'inc', 'llc', 'corp', 'corporation', 'co', 'and', 'ltd',
  'dba', 'in', 'las', 'vegas', 'reno', 'henderson', 'carson', 'city',
]);

export function normalizeNtaCpcn(raw?: string | null): string | null {
  const value = (raw || '').replace(/[\s#]/g, '');
  return CPCN.test(value) ? value : null;
}

function base(cpcn: string): string {
  return cpcn.split('.')[0]!;
}

function tokens(value: string): string[] {
  return value.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, ' ').split(' ').filter(Boolean);
}

/**
 * Exact NTA CPCN lookup on the household-goods subset. A bare certificate number also matches its
 * revision-suffixed forms (3380 -> 3380.1), which NTA prints for the same certificate. Never a USDOT/MC.
 */
export function lookupNevadaCpcn(raw?: string | null): { query: string; hits: NevadaNtaHhgRow[]; note: string } {
  const cpcn = normalizeNtaCpcn(raw);
  if (!cpcn) {
    return {
      query: (raw || '').trim(),
      hits: [],
      note: 'Enter a Nevada Transportation Authority CPCN number as NTA prints it (for example 3251.3). A CPCN is not a USDOT or MC number.',
    };
  }
  const hits = NEVADA_NTA_HHG_ROWS.filter((row) =>
    cpcn.includes('.') ? row.cpcn === cpcn || row.directoryCpcnAsPrinted === cpcn : base(row.cpcn) === cpcn,
  );
  return {
    query: cpcn,
    hits,
    note: hits.length
      ? 'Nevada Transportation Authority household-goods evidence (retrieved September 25, 2026). This is intrastate authority, not FMCSA interstate authority. Status is shown exactly as NTA prints it.'
      : 'No match in the NTA household-goods subset retrieved September 25, 2026. The number may belong to another NTA class (towing, limousine, charter), or the list may have changed. It is not a USDOT or MC lookup.',
  };
}

/** Every remaining query word must appear in the NTA carrier name or DBA. Never joined to FMCSA by name. */
export function searchNevadaNtaName(raw?: string | null): { terms: string[]; hits: NevadaNtaHhgRow[] } {
  const terms = tokens(raw || '').filter((token) => !NOISE.has(token));
  if (!terms.length || !terms.some((token) => token.length >= 3)) return { terms, hits: [] };
  const hits = NEVADA_NTA_HHG_ROWS.filter((row) => {
    const names = new Set([...tokens(row.carrierName), ...tokens(row.dba ?? ''), ...tokens(row.directoryCorporateName ?? '')]);
    return terms.every((term) => names.has(term));
  });
  return { terms, hits };
}

export function nevadaStatusLabel(row: NevadaNtaHhgRow): string {
  const parts = [
    row.ntaActiveListStatus
      ? `NTA Active Certificates list: ${row.ntaActiveListStatus}`
      : 'not on the NTA Active Certificates mover list',
  ];
  if (row.directoryStatusText) parts.push(`directory: ${row.directoryStatusText}`);
  return parts.join('; ');
}

export function nevadaRowLabel(row: NevadaNtaHhgRow): string {
  const dba = row.dba ? ` (d/b/a ${row.dba})` : '';
  return `${row.carrierName}${dba}, CPCN ${row.cpcn}, ${nevadaStatusLabel(row)}${row.tariffUrl ? ', tariff filed' : ''}`;
}
