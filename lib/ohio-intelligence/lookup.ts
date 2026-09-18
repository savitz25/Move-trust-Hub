/** No bulk PUCO HHG roster was acquired. Identifier lookup stays search-only. */

export type OhioPucoLookupHit = {
  display: string;
  note: string;
};

export function lookupOhioPucoIdentity(raw: string): { hits: OhioPucoLookupHit[] } {
  const display = raw.trim();
  if (!display) return { hits: [] };
  return {
    hits: [
      {
        display,
        note: 'No complete current PUCO household-goods roster was acquired. Confirm this certificate on official PUCO search. A PUCO number is not a USDOT or MC number.',
      },
    ],
  };
}
