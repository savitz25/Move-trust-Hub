import hhg from './hhg-index.json';
import { virginiaMoveIdentity } from './identity';

export type VaHhgRecord = {
  name: string;
  dba: string;
  address_lines: string[];
  phone: string;
  locality: string;
  source_carrier_type: string;
  source_displayed_authority_number: string;
  source_display_label: string;
};

export type VaHhgLookup = {
  query: string;
  hits: Array<VaHhgRecord & { identity: string | null }>;
};

const ROWS = hhg as VaHhgRecord[];

export function lookupVirginiaHhg(raw?: string): VaHhgLookup {
  const query = (raw || '').trim();
  if (!query) return { query, hits: [] };
  const digits = query.replace(/\D/g, '');
  const hits = ROWS.filter((row) => {
    if (digits && row.source_displayed_authority_number === digits) return true;
    if (query.length >= 4 && row.name.toLowerCase().includes(query.toLowerCase())) return true;
    return false;
  }).slice(0, 25);
  return {
    query,
    hits: hits.map((row) => ({
      ...row,
      identity: virginiaMoveIdentity('HHG', row.source_displayed_authority_number),
    })),
  };
}
