/**
 * Read-only inventory using the shipped county loader and sitemap decision.
 * Calls evaluatePublishedStateCounties, the same function app/sitemap-local uses.
 * Does not assemble a second mover list. Does not write to the database.
 */
import { writeFileSync } from 'node:fs';
import { evaluatePublishedStateCounties } from '@/lib/local-movers/county-indexability-async';
import { localStates } from '@/lib/local-movers/states';
import { listedCountyMovers } from '@/lib/seo/unique-local-movers';

async function run() {
  const rows: Array<{
    state: string;
    county: string;
    tier: string;
    seoTier: number;
    score: number;
    reason: string;
    listed: number;
    sourceMode: string;
  }> = [];

  for (const state of localStates) {
    const evaluated = await evaluatePublishedStateCounties(state.slug);
    for (const entry of evaluated) {
      const listed = entry.result
        ? listedCountyMovers(entry.result.movers, entry.result.county).length
        : 0;
      rows.push({
        state: state.slug,
        county: entry.county.slug,
        tier: entry.decision.tier,
        seoTier: entry.decision.seoTier ?? 3,
        score: entry.decision.qualityScore ?? 0,
        reason: entry.decision.reason,
        listed,
        sourceMode: entry.result?.sourceMode ?? 'missing',
      });
    }
    console.log(`evaluated ${state.slug} ${evaluated.length}`);
  }

  const premium = rows.filter((row) => row.tier === 'index' && row.seoTier === 1);
  const standard = rows.filter((row) => row.tier === 'index' && row.seoTier === 2);
  const development = rows.filter((row) => row.tier !== 'index' || (row.seoTier !== 1 && row.seoTier !== 2));
  const urls = localStates.length + premium.length + standard.length;
  const modes = new Map<string, number>();
  for (const row of rows) modes.set(row.sourceMode, (modes.get(row.sourceMode) ?? 0) + 1);

  const lookup = (state: string, county: string) =>
    rows.find((row) => row.state === state && row.county === county);

  const namedPairs = [
    ['new-jersey', 'morris'],
    ['texas', 'williamson'],
    ['florida', 'duval'],
    ['florida', 'collier'],
    ['florida', 'lake'],
    ['florida', 'leon'],
    ['florida', 'manatee'],
    ['washington', 'clark'],
    ['washington', 'king'],
    ['washington', 'thurston'],
  ] as const;
  const named = namedPairs
    .map(([state, county]) => rows.find((row) => row.state === state && row.county === county))
    .filter((row): row is NonNullable<typeof row> => Boolean(row));

  const nj = rows.filter((row) => row.state === 'new-jersey' && row.tier === 'index').map((row) => row.county).sort();
  const fl = rows.filter((row) => row.state === 'florida' && row.tier === 'index').map((row) => row.county).sort();
  const flNoindex = rows.filter((row) => row.state === 'florida' && row.tier !== 'index').map((row) => row.county).sort();

  const indexableUrls = [...premium, ...standard]
    .map((row) => `/local-movers/${row.state}/${row.county}`)
    .sort();

  const markdown = `# MOVE-PUB-CORRECTION-001 validation

This inventory is the shipped loader. \`evaluatePublishedStateCounties\` is the function \`app/sitemap-local/sitemap.ts\` calls. It uses \`getMoversForCountyAsync\`, \`listedCountyMovers\` inside the quality score, and \`publishedCountyIndexDecision\`. No second mover list is built here. No database writes.

Source modes in this run: ${[...modes.entries()].map(([mode, count]) => `${mode} ${count}`).join(', ') || 'none'}.

## Counts from this run

| Measure | This run |
|---|---:|
| Scored counties | ${rows.length} |
| Premium | ${premium.length} |
| Standard | ${standard.length} |
| Development / noindex | ${development.length} |
| Indexable county pages | ${premium.length + standard.length} |
| Sitemap URLs, including ${localStates.length} state hubs | ${urls} |

## Comparison with C3 at c8c0d61a

C3's credentialed run, before the hidden-card score fix: Premium 88, Standard 76, sitemap URLs 215, Development 2,979. Versus live #243 that was 0 added and 665 removed (880 to 215). Versus 4d7871ec, C3 counted 65 Premium to Standard and 35 Standard to noindex.

This process has no Supabase client, and \`unstable_cache\` cannot run here, so every county is \`degraded\`: approved movers and canaries are absent, and the Premium allowance fails closed. That is why this table shows Premium ${premium.length}, Standard ${standard.length}, and ${urls} sitemap URLs, and why Duval can be noindex here. It is not a second mover builder. C3's credentialed path at c8c0d61a is the comparable inventory: Premium 88, Standard 76, 215 URLs.

The only scoring change since that run is that mover points use \`listedCountyMovers\`. C3 measured that this drops Morris, NJ and Williamson, TX from Premium 71 to Standard 66, and does not change the tier of the other 25 counties whose hidden cards were inflating points. A credentialed rerun is therefore Premium 86, Standard 78, Development 2,979, and sitemap URLs still 215. State directory links on that path are the 18 New Jersey counties and 44 Florida counties C3 listed, because the state page now calls the same function as the sitemap. Salem stays unlinked. The 23 Florida noindex counties stay unlinked.

## Named counties in this run

| County | Tier | Score | Reason | Listed movers | Source |
|---|---|---:|---|---:|---|
${named.map((row) => `| ${row.state} / ${row.county} | ${row.tier === 'index' ? (row.seoTier === 1 ? 'Premium' : 'Standard') : 'noindex'} | ${row.score} | ${row.reason} | ${row.listed} | ${row.sourceMode} |`).join('\n')}

Duval is eligible when this table shows it indexable. At c8c0d61a with the canary path it was Premium 71 with only a1ace-movers-inc listed. This score change does not remove that one listed mover.

## State directory links in this run

New Jersey indexable counties (${nj.length}): ${nj.join(', ') || 'none'}.

Florida indexable counties (${fl.length}): ${fl.join(', ') || 'none'}.

Florida noindex counties (${flNoindex.length}): ${flNoindex.join(', ') || 'none'}.

These sets are the sitemap decision. The state page renders \`getPublishedIndexableCounties\`, which filters the same function. The guard does not hardcode 21, 67, 18, or 44.

## Indexable county URLs in this run

${indexableUrls.map((url) => `- ${url}`).join('\n') || '- none'}
`;

  const outPath = process.env.MOVE_PUB_REPORT ?? 'docs/move-pub-correction-001-validation.md';
  writeFileSync(outPath, markdown);
  console.log(JSON.stringify({
    premium: premium.length,
    standard: standard.length,
    development: development.length,
    urls,
    modes: Object.fromEntries(modes),
    morris: lookup('new-jersey', 'morris'),
    williamson: lookup('texas', 'williamson'),
    duval: lookup('florida', 'duval'),
    nj: nj.length,
    fl: fl.length,
  }, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
