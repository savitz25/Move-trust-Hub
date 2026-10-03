/**
 * READ-ONLY operator probe: asks the real production publication source the
 * exact question the My TrustHub Save path asks, for the given profile slugs.
 * Anonymous public reads only (two exact-equality lookups per slug); it writes
 * nothing and contacts nothing but the Move Supabase project named in the
 * environment.
 *
 *   tsx --env-file=.env.local --require ./scripts/stub-server-only.cjs scripts/qa/mth-publication-source-probe.ts <slug> [<slug> ...]
 */
import { companiesPublicationPort } from '@/lib/my-trusthub/companies-publication-port';
import { publishedMoverSource } from '@/lib/my-trusthub/publication-source';
import { PRODUCTION_MOVE_PROJECT } from '@/lib/my-trusthub/reviewed-origins';

async function main() {
  const slugs = process.argv.slice(2);
  if (!slugs.length) { console.error('usage: mth-publication-source-probe.ts <slug> [<slug> ...]'); process.exit(2); }
  const port = companiesPublicationPort(PRODUCTION_MOVE_PROJECT);
  if (!port) { console.error('Publication source unavailable: NEXT_PUBLIC_SUPABASE_URL must be the production Move project with its anon key.'); process.exit(2); }
  const source = publishedMoverSource(port);
  for (const slug of slugs) {
    const row = await source.bySlug(slug);
    const byIdentity = row ? await source.byIdentity({ hub: 'move', nativeId: row.nativeId, profileClass: 'mover' }) : null;
    const eligible = !!row && row.reviewedClass === 'mover' && JSON.stringify(row) === JSON.stringify(byIdentity);
    console.log(JSON.stringify({ slug, eligible, publication: row }));
  }
}
void main();
