// Public snapshot verified through the production exact lookup on 2026-09-11.
// Every other record is synthetic, used only behind an in-memory HTTP adapter.
export const publishedIdentity = { id: 'snapshot-shifl', name: 'SHIFL INC', slug: 'shifl-inc', usdot_number: '3244649', mc_number: '1019808', entity_type: 'BROKER', headquarters: 'AIRMONT, NY', authority_active: true, publication_state: 'INDEXABLE', fmcsa_last_checked: '2026-08-20T13:52:59.596+00:00', fmcsa_legal_name: 'SHIFL INC', fmcsa_raw: null };
export const records = [
  publishedIdentity,
  { ...publishedIdentity, id: 'fixture-prefix', name: 'Prefix fixture', usdot_number: '3244', mc_number: '649', slug: 'fixture-prefix' },
  { ...publishedIdentity, id: 'fixture-near', name: 'Near fixture', usdot_number: '3244801', mc_number: '8888888' },
  { ...publishedIdentity, id: 'fixture-carrier', name: 'NJ current carrier fixture', entity_type: 'CARRIER', headquarters: 'NEWARK, NJ', usdot_number: '7777771', mc_number: '777771' },
  { ...publishedIdentity, id: 'fixture-dual', name: 'NJ current dual fixture', entity_type: 'CARRIER/BROKER', headquarters: 'TRENTON, NJ 08601', usdot_number: '7777772', mc_number: '777772' },
  { ...publishedIdentity, id: 'fixture-unknown', name: 'NJ unknown authority fixture', entity_type: 'CARRIER', headquarters: 'NEWARK, NJ', usdot_number: '7777773', mc_number: '777773', authority_active: null },
  { ...publishedIdentity, id: 'fixture-broker', name: 'NJ broker fixture', headquarters: 'NEWARK, NJ', usdot_number: '7777774', mc_number: '777774' },
  { ...publishedIdentity, id: 'fixture-inactive', name: 'NJ not current fixture', entity_type: 'CARRIER', headquarters: 'NEWARK, NJ', usdot_number: '7777775', mc_number: '777775', authority_active: false },
  { ...publishedIdentity, id: 'fixture-private', name: 'Unpublished fixture', usdot_number: '7777776', publication_state: 'REVIEW_REQUIRED' },
];

export function fixtureFetch(data: Array<Record<string, unknown>> = records) {
  const calls: URL[] = [];
  const fetcher: typeof fetch = async (input, init) => {
    const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input : input.url);
    calls.push(url);
    if (!['GET', 'HEAD'].includes(init?.method ?? 'GET')) throw new Error('Fixture prohibits writes');
    if (!url.pathname.endsWith('/companies')) throw new Error('Unexpected fixture source');
    let rows = [...data];
    for (const [field, filter] of url.searchParams) {
      if (filter.startsWith('eq.')) rows = rows.filter((r) => String(r[field]) === filter.slice(3));
      if (filter.startsWith('in.')) {
        const values = filter.slice(4, -1).split(',').map((x) => x.replaceAll('"', ''));
        rows = rows.filter((r) => values.includes(String(r[field])));
      }
      if (filter.startsWith('ilike.')) {
        const pattern = filter.slice(6).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replaceAll('%', '.*').replaceAll('_', '.');
        rows = rows.filter((r) => new RegExp(`^${pattern}$`, 'i').test(String(r[field] ?? '')));
      }
      if (field === 'or' && filter.includes('publication_state')) rows = rows.filter((r) => !['REVIEW_REQUIRED', 'INACTIVE', 'INGESTED', 'CLASSIFIED'].includes(String(r.publication_state)));
    }
    const total = rows.length;
    rows.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    const offset = Number(url.searchParams.get('offset') ?? 0);
    const limit = Number(url.searchParams.get('limit') ?? rows.length);
    rows = rows.slice(offset, offset + limit);
    return new Response(init?.method === 'HEAD' ? null : JSON.stringify(rows), { headers: { 'content-type': 'application/json', 'content-range': `0-${Math.max(0, rows.length - 1)}/${total}` } });
  };
  return { fetcher, calls };
}
