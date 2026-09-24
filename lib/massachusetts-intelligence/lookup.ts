import roster from './accepted-roster.json';

export type MassachusettsDpuRow = {
  certificate: string | null;
  companyName: string;
  dba: string | null;
  dbaSource: string;
  city: string;
  businessState: string;
  tariffStatus: 'POSTED' | 'PENDING';
  tariffLabel: string;
  tariffUrl: string | null;
  status: string;
};

const ROWS = (roster as { rows: MassachusettsDpuRow[] }).rows;
const CERTIFICATE = /^(?:\d{3,6}|\d{2}HG\d{2,3}[A-Z]?)$/;
// Words that describe the request, not the company. Corporate suffixes carry no identity.
const NOISE = new Set([
  'massachusetts', 'mass', 'ma', 'dpu', 'department', 'public', 'utilities', 'regulated', 'licensed', 'licence', 'license',
  'certificate', 'certified', 'cert', 'number', 'no', 'is', 'on', 'the', 'list', 'check', 'find', 'lookup', 'look', 'up',
  'mover', 'movers', 'moving', 'company', 'companies', 'household', 'goods', 'hhg', 'intrastate', 'a', 'an', 'of', 'for',
  'inc', 'llc', 'corp', 'corporation', 'co', 'and', 'ltd', 'dba',
]);

export function normalizeDpuCertificate(raw?: string | null): string | null {
  const value = (raw || '').toUpperCase().replace(/[\s#]/g, '');
  return CERTIFICATE.test(value) ? value : null;
}

function tokens(value: string): string[] {
  return value.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, ' ').split(' ').filter(Boolean);
}

/** Exact DPU certificate equality. A DPU certificate is not a USDOT or MC number. */
export function lookupMassachusettsDpuCertificate(raw?: string | null): {
  query: string;
  hits: MassachusettsDpuRow[];
  note: string;
} {
  const certificate = normalizeDpuCertificate(raw);
  if (!certificate) {
    return {
      query: (raw || '').trim(),
      hits: [],
      note: 'Enter a Massachusetts DPU certificate number as printed on the regulated movers list (for example 32011 or 24HG59). A DPU certificate is not a USDOT or MC number.',
    };
  }
  const hits = ROWS.filter((row) => row.certificate === certificate);
  return {
    query: certificate,
    hits,
    note: hits.length
      ? 'Listed on the Massachusetts DPU list of regulated household-goods movers (June 16, 2026 list). This is intrastate evidence, not FMCSA interstate authority. The list prints no Active/Inactive column.'
      : 'No match on the accepted June 16, 2026 DPU list snapshot. Absence is not proof the company lacks FMCSA interstate authority, and the list can change after that date.',
  };
}

/**
 * DPU roster name search. Every remaining query word must appear in the company
 * name or DBA DPU prints. Results are DPU list rows only; they are never joined
 * to an FMCSA identity by name.
 */
export function searchMassachusettsDpuName(raw?: string | null): {
  terms: string[];
  hits: MassachusettsDpuRow[];
} {
  const terms = tokens(raw || '').filter((token) => !NOISE.has(token));
  if (!terms.length || !terms.some((token) => token.length >= 3)) return { terms, hits: [] };
  const hits = ROWS.filter((row) => {
    const names = new Set([...tokens(row.companyName), ...tokens(row.dba ?? '')]);
    return terms.every((term) => names.has(term));
  });
  return { terms, hits };
}

export function massachusettsDpuRowLabel(row: MassachusettsDpuRow): string {
  const certificate = row.certificate ? `certificate ${row.certificate}` : 'no certificate number printed';
  const dba = row.dba ? ` (d/b/a ${row.dba})` : '';
  const tariff = row.tariffStatus === 'PENDING' ? 'tariff pending' : 'tariff posted';
  return `${row.companyName}${dba}, ${certificate}, ${row.city}, ${tariff}`;
}
