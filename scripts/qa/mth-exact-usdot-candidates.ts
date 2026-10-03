/**
 * READ-ONLY operator enumeration for the My TrustHub exact-USDOT binding
 * expansion. Reads the production publication source (anonymous
 * `public.companies`, anon key, public RLS) in id-ordered pages and judges every
 * row with the SAME function the Save path uses (`evaluatePublishedMover` over
 * the profile page's classifier). It writes nothing to any database and
 * contacts nothing but the pinned Move Supabase project.
 *
 * Identity is the USDOT number only. Names are carried as labels and are never
 * used to decide identity.
 *
 *   tsx --env-file=<.env.local> --require ./scripts/stub-server-only.cjs scripts/qa/mth-exact-usdot-candidates.ts <out.json>
 */
import { writeFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/config';
import { mapCompanyRow } from '@/lib/supabase/queries/companies';
import { classifyProvider } from '@/lib/provider/classification';
import { evaluatePublishedMover, MOVER_CAPABILITIES, MOVE_SLUG, type CompanyRecord } from '@/lib/my-trusthub/publication-source';
import { PRODUCTION_MOVE_PROJECT } from '@/lib/my-trusthub/reviewed-origins';

const COLUMNS = 'id, slug, name, fmcsa_legal_name, usdot_number, mc_number, entity_type, services, specialties, coverage, service_scope, fmcsa_raw, publication_state, indexable, out_of_service, authority_active, is_verified';
const PAGE = 500;
const USDOT = /^[1-9][0-9]{0,8}$/;
const text = (value: unknown) => (typeof value === 'string' ? value.trim() : typeof value === 'number' ? String(value) : '');
const capabilities = (row: CompanyRecord) => classifyProvider(mapCompanyRow(row)).capabilities;

async function main() {
  const out = process.argv[2];
  if (!out) { console.error('usage: mth-exact-usdot-candidates.ts <out.json>'); process.exit(2); }
  const url = getSupabaseUrl(), key = getSupabaseAnonKey();
  if (!url || !key || url.replace(/\/+$/, '') !== `https://${PRODUCTION_MOVE_PROJECT}.supabase.co`) {
    console.error('Publication source unavailable: NEXT_PUBLIC_SUPABASE_URL must be the production Move project with its anon key.'); process.exit(2);
  }
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const startedAt = new Date().toISOString();
  const rows: CompanyRecord[] = [];
  for (let from = 0; ; from += PAGE) {
    const page = await client.from('companies').select(COLUMNS).order('id', { ascending: true }).range(from, from + PAGE - 1);
    if (page.error) throw new Error('publication_source_unavailable: ' + page.error.message);
    rows.push(...((page.data ?? []) as unknown as CompanyRecord[]));
    if ((page.data ?? []).length < PAGE) break;
  }
  const ids = new Set(rows.map(row => text(row.id)));
  if (ids.size !== rows.length) throw new Error('paged read returned a repeated row id; rerun');

  // Every row that carries a USDOT, in any publication state: a duplicate in
  // any state makes the identity ambiguous, exactly as the Save path sees it.
  // Grouped on the digits with leading zeros removed so "0123" and "123" collide.
  const digits = (row: CompanyRecord) => text(row.usdot_number).replace(/^0+(?=\d)/, '');
  const byUsdot = new Map<string, CompanyRecord[]>();
  for (const row of rows) { const k = digits(row); if (k) byUsdot.set(k, [...(byUsdot.get(k) ?? []), row]); }

  const states: Record<string, number> = {};
  const result = rows.map(row => {
    const state = typeof row.publication_state === 'string' ? row.publication_state : 'NULL';
    states[state] = (states[state] ?? 0) + 1;
    const usdot = text(row.usdot_number), slug = text(row.slug);
    let caps: readonly string[] = [], classifierError = false;
    try { caps = capabilities(row); } catch { classifierError = true; }
    const supported = caps.some(c => MOVER_CAPABILITIES.includes(c));
    const sharing = usdot ? byUsdot.get(digits(row)) ?? [] : [];
    let moveClass: string;
    if (state !== 'PUBLISHABLE') moveClass = 'NOT_PUBLISHABLE';
    else if (row.out_of_service === true) moveClass = 'HELD_OUT_OF_SERVICE';
    else if (classifierError || !supported) moveClass = 'HELD_UNSUPPORTED_CLASS';
    else if (!USDOT.test(usdot) || !MOVE_SLUG.test(slug)) moveClass = 'MISSING_REQUIRED_IDENTITY';
    else if (sharing.length !== 1) moveClass = 'AMBIGUOUS';
    else {
      // Final word is the runtime's own judgement over the rows for this USDOT.
      const judged = evaluatePublishedMover(sharing, usdot, capabilities);
      moveClass = judged && judged.reviewedClass === 'mover' && judged.canonicalSlug === slug && judged.nativeId === 'usdot-' + usdot
        ? 'ELIGIBLE' : 'RUNTIME_DISAGREES';
    }
    return {
      id: text(row.id), slug, usdot, mc: text(row.mc_number), name: text(row.name), fmcsaLegalName: text(row.fmcsa_legal_name),
      publicationState: state, outOfService: row.out_of_service === true, capabilities: caps, moveClass,
      sharingRowIds: sharing.length > 1 ? sharing.map(r => text(r.id)) : undefined,
    };
  });
  const counts: Record<string, number> = {};
  for (const r of result) counts[r.moveClass] = (counts[r.moveClass] ?? 0) + 1;
  writeFileSync(out, JSON.stringify({ project: PRODUCTION_MOVE_PROJECT, startedAt, finishedAt: new Date().toISOString(), totalRows: rows.length, states, counts, rows: result }));
  console.log(JSON.stringify({ totalRows: rows.length, states, counts }, null, 1));
}
void main();
