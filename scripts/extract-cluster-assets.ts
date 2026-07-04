import fs from 'fs';
import path from 'path';

const base = 'app/lender/local-lenders/[state]';
const extracted = JSON.parse(
  fs.readFileSync('lib/lender/clusters/_extracted.json', 'utf8')
) as Record<string, Record<string, unknown>>;
const extracted2 = JSON.parse(
  fs.readFileSync('lib/lender/clusters/_extracted2.json', 'utf8')
) as Record<string, Record<string, unknown>>;

const clusters = fs.readdirSync(base).filter((d) => {
  const pagePath = path.join(base, d, 'page.tsx');
  return fs.existsSync(pagePath) && d !== '[county]' && !d.startsWith('[');
});

const results: Record<string, Record<string, unknown>> = {};

for (const cluster of clusters.sort()) {
  const src = fs.readFileSync(path.join(base, cluster, 'page.tsx'), 'utf8');
  const importMatch = src.match(/import \{([^}]+)\} from '@\/lib\/lender\/mortgage\/(\w+)'/);
  const breadcrumbMatches = [...src.matchAll(/\{ label: '([^']+)' \}/g)];
  const breadcrumbLabel = breadcrumbMatches.at(-1)?.[1] ?? null;

  const alsoExplore = [...src.matchAll(/<Link href="([^"]+)"[^>]*>([^<]+)<\/Link>/g)]
    .filter((m) => m[1].includes('/local-lenders/') && m[2].includes('Hub'))
    .map((m) => ({ href: m[1], label: m[2].trim().replace(/\s*→$/, '') }));

  const countyLinkBlock = src.match(
    /<Link href="([^"]+)"[^>]*>\s*View all ([^<]+)<\/Link>/
  );
  const featuredTitle = src.match(
    /<h2[^>]*>(Featured Counties|[^<]*Start Here|[^<]*Neighborhoods[^<]*)<\/h2>/
  );
  const whyTitle = src.match(/<h2[^>]*>(Why [^<]+ Different)<\/h2>/);
  const lendersTitle = src.match(/<h2[^>]*>(Top Verified Lenders[^<]*)<\/h2>/);

  let countiesVar = '';
  let areasVar = '';
  let lenderSlugsVar = '';
  if (importMatch) {
    const names = importMatch[1].split(',').map((s) => s.trim());
    for (const n of names) {
      if (n.includes('HUB_COUNTIES')) countiesVar = n;
      else if (n.includes('HUB_AREAS')) areasVar = n;
      else if (n.includes('LENDER_SLUGS')) lenderSlugsVar = n;
    }
  }

  const lenderFn = src.includes('getLendersByCounty')
    ? 'county'
    : src.includes('getLendersByStateSlug')
      ? 'state'
      : lenderSlugsVar
        ? 'slugs'
        : 'state';
  const countyArgMatch = src.match(/getLendersByCounty\('([^']+)',\s*'([^']+)'\)/);

  const meta = extracted[cluster] ?? {};
  const meta2 = extracted2[cluster] ?? {};

  results[cluster] = {
    title: meta.title,
    description: meta.desc,
    h1: meta.h1,
    badge: meta.badge,
    subtitle: meta2.subtitle,
    bullets: meta2.bullets ?? [],
    breadcrumbLabel,
    mortgageFile: importMatch?.[2] ?? null,
    countiesVar: countiesVar || meta2.countyVar || meta.countyImport || '',
    areasVar,
    lenderSlugsVar,
    lenderFn,
    countyArg: countyArgMatch ? [countyArgMatch[1], countyArgMatch[2]] : meta.countyArg ?? null,
    featuredSectionTitle: featuredTitle?.[1] ?? 'Featured Counties',
    whySectionTitle: whyTitle?.[1] ?? null,
    lendersSectionTitle: lendersTitle?.[1] ?? 'Top Verified Lenders',
    countyLinkHref: countyLinkBlock?.[1] ?? null,
    countyLinkText: countyLinkBlock?.[2]?.trim() ?? null,
    alsoExplore,
    leadCaptureName: breadcrumbLabel?.replace(/ Hub$/, '') ?? null,
  };
}

fs.writeFileSync('lib/lender/clusters/_assets.json', JSON.stringify(results, null, 2));
console.log(`Wrote ${Object.keys(results).length} cluster assets`);