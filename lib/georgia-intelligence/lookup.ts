import roster from './accepted-roster.json';

export type GeorgiaMoverHit = {
  mca: string;
  legalName: string;
  dba: string | null;
  city: string;
  status: string;
};

type RosterFile = { rows: GeorgiaMoverHit[] };

export function lookupGeorgiaMca(raw?: string | null): {
  query: string;
  hits: GeorgiaMoverHit[];
  note: string;
} {
  const query = (raw || '').trim();
  const match = query.replace(/\s+/g, '').match(/^(?:MCA|GA)?(\d{3,8})$/i);
  if (!match) {
    return {
      query,
      hits: [],
      note: 'Enter a Georgia DPS MCA number from the licensed household-goods movers list. Name-only search is not used, and MCA is not a USDOT number.',
    };
  }
  const mca = match[1]!;
  const hits = (roster as RosterFile).rows.filter((row) => row.mca === mca);
  return {
    query: mca,
    hits,
    note: hits.length
      ? 'Listed on the Georgia DPS licensed household-goods movers list. This is intrastate certificate evidence, not FMCSA interstate authority. The list does not print a separate Active column.'
      : 'No match on the accepted Georgia DPS licensed-movers snapshot. Absence is not proof the company lacks FMCSA interstate authority.',
  };
}
