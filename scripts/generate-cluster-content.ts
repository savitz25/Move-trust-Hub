import fs from 'fs';

const assets = JSON.parse(
  fs.readFileSync('lib/lender/clusters/_assets.json', 'utf8')
) as Record<string, Record<string, unknown>>;

const mortgageFiles = new Set<string>();
const countyVars = new Set<string>();
const areaVars = new Set<string>();
const slugVars = new Set<string>();

for (const entry of Object.values(assets)) {
  if (entry.mortgageFile) mortgageFiles.add(entry.mortgageFile as string);
  if (entry.countiesVar) countyVars.add(entry.countiesVar as string);
  if (entry.areasVar) areaVars.add(entry.areasVar as string);
  if (entry.lenderSlugsVar) slugVars.add(entry.lenderSlugsVar as string);
}

const fileImports = [...mortgageFiles].sort().map((file) => {
  const vars = [...countyVars, ...areaVars, ...slugVars]
    .filter((v) => {
      // crude: assign var to file by reading which mortgage file exports it
      return true;
    });
  return { file, vars: [] as string[] };
});

// Assign vars to files by scanning mortgage ts files
for (const file of mortgageFiles) {
  const src = fs.readFileSync(`lib/lender/mortgage/${file}.ts`, 'utf8');
  const entry = fileImports.find((f) => f.file === file)!;
  for (const v of [...countyVars, ...areaVars, ...slugVars]) {
    if (src.includes(`export const ${v}`)) entry.vars.push(v);
  }
}

const importLines = fileImports
  .filter((f) => f.vars.length)
  .map((f) => `import { ${[...new Set(f.vars)].sort().join(', ')} } from '@/lib/lender/mortgage/${f.file}';`)
  .join('\n');

const areaMapEntries: string[] = [];
for (const v of [...countyVars, ...areaVars]) areaMapEntries.push(`  ${v},`);
const slugMapEntries: string[] = [];
for (const v of slugVars) slugMapEntries.push(`  ${v},`);

const clusterEntries = Object.entries(assets)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, e]) => {
    const bullets = (e.bullets as string[]) ?? [];
    const alsoExplore = (e.alsoExplore as { href: string; label: string }[]) ?? [];
    const countyArg = e.countyArg as [string, string] | null;
    return `  '${slug}': {
    title: ${JSON.stringify(e.title)},
    description: ${JSON.stringify(e.description)},
    h1: ${JSON.stringify(e.h1)},
    badge: ${JSON.stringify(e.badge)},
    subtitle: ${JSON.stringify(e.subtitle)},
    bullets: ${JSON.stringify(bullets)},
    breadcrumbLabel: ${JSON.stringify(e.breadcrumbLabel)},
    featuredSectionTitle: ${JSON.stringify(e.featuredSectionTitle)},
    whySectionTitle: ${JSON.stringify(e.whySectionTitle)},
    lendersSectionTitle: ${JSON.stringify(e.lendersSectionTitle)},
    countyLinkHref: ${JSON.stringify(e.countyLinkHref ?? null)},
    countyLinkText: ${JSON.stringify(e.countyLinkText)},
    leadCaptureName: ${JSON.stringify(e.leadCaptureName)},
    countiesVar: ${JSON.stringify(e.countiesVar || '')},
    areasVar: ${JSON.stringify(e.areasVar || '')},
    lenderSlugsVar: ${JSON.stringify(e.lenderSlugsVar || '')},
    lenderFn: ${JSON.stringify(e.lenderFn)} as ClusterLenderSource,
    countyArg: ${countyArg ? JSON.stringify(countyArg) : 'null'},
    alsoExplore: ${JSON.stringify(alsoExplore)},
  },`;
  })
  .join('\n');

const output = `/**
 * Lender cluster page content — generated from static cluster pages.
 * Regenerate: npx tsx scripts/extract-cluster-assets.ts && npx tsx scripts/generate-cluster-content.ts
 */
import type { Lender } from '@/lib/lender/mockData';
import { getLenderBySlug } from '@/lib/lender/lenders';
import { getLendersByCounty } from '@/lib/lender/lenders';
import { getLendersByStateSlug } from '@/lib/lender/mortgage/stateLenders';
import {
  LENDER_CLUSTER_STATE,
  type LenderClusterSlug,
  isLenderClusterSlug,
} from '@/lib/lender/clusters/registry';

${importLines}

export type ClusterLenderSource = 'state' | 'county' | 'slugs';

export interface ClusterAreaLink {
  name: string;
  slug: string;
  highlight: string;
}

export interface ClusterContent {
  title: string;
  description: string;
  h1: string;
  badge: string;
  subtitle: string;
  bullets: string[];
  breadcrumbLabel: string;
  featuredSectionTitle: string;
  whySectionTitle: string | null;
  lendersSectionTitle: string;
  countyLinkHref: string | null;
  countyLinkText: string | null;
  leadCaptureName: string | null;
  countiesVar: string;
  areasVar: string;
  lenderSlugsVar: string;
  lenderFn: ClusterLenderSource;
  countyArg: [string, string] | null;
  alsoExplore: { href: string; label: string }[];
}

const AREA_MAP: Record<string, readonly ClusterAreaLink[]> = {
${areaMapEntries.join('\n')}
};

const SLUG_MAP: Record<string, readonly string[]> = {
${slugMapEntries.join('\n')}
};

function resolveAreas(varName: string): readonly ClusterAreaLink[] {
  if (!varName) return [];
  return AREA_MAP[varName] ?? [];
}

const CLUSTER_CONTENT: Record<LenderClusterSlug, ClusterContent> = {
${clusterEntries}
};

export function getClusterContent(slug: LenderClusterSlug): ClusterContent {
  return CLUSTER_CONTENT[slug];
}

export function getClusterAreas(slug: LenderClusterSlug): readonly ClusterAreaLink[] {
  const content = CLUSTER_CONTENT[slug];
  const counties = resolveAreas(content.countiesVar);
  if (counties.length) return counties;
  return resolveAreas(content.areasVar);
}

export function usesCountyLabels(slug: LenderClusterSlug): boolean {
  return Boolean(CLUSTER_CONTENT[slug].countiesVar);
}

export function resolveClusterLenders(slug: LenderClusterSlug): Lender[] {
  const content = CLUSTER_CONTENT[slug];
  const state = LENDER_CLUSTER_STATE[slug];

  if (content.lenderFn === 'county' && content.countyArg) {
    return getLendersByCounty(content.countyArg[0], content.countyArg[1]);
  }

  if (content.lenderFn === 'slugs' && content.lenderSlugsVar) {
    const slugs = SLUG_MAP[content.lenderSlugsVar];
    if (!slugs) return getLendersByStateSlug(state).slice(0, 8);
    return slugs.map((s) => getLenderBySlug(s)).filter((l): l is Lender => Boolean(l));
  }

  return getLendersByStateSlug(state).slice(0, 8);
}

export function tryGetClusterContent(
  state: string,
  segment: string
): { slug: LenderClusterSlug; content: ClusterContent } | null {
  if (!isLenderClusterSlug(segment)) return null;
  if (LENDER_CLUSTER_STATE[segment] !== state) return null;
  return { slug: segment, content: CLUSTER_CONTENT[segment] };
}
`;

fs.writeFileSync('lib/lender/clusters/content.ts', output);
console.log('Wrote lib/lender/clusters/content.ts');