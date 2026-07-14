/**
 * Shared live/preview fetch helpers for county compliance audits.
 */
import { execSync } from 'node:child_process';
import {
  buildSeededCountyProbes,
  sampleDigest,
  SEEDED_SAMPLE_SELECTION_CODE,
} from './seeded-county-sample';

export const PRODUCTION_ORIGIN = 'https://www.movetrusthub.com';

export type LiveCountyProbe = {
  stateSlug: string;
  countySlug: string;
  label: string;
  path: string;
  probeGroup: 'named' | 'seeded-random';
};

/** 10 named verification counties (Highlands FL replaces Miami-Dade per revised spec). */
export const NAMED_COUNTY_PROBES: LiveCountyProbe[] = [
  { stateSlug: 'nebraska', countySlug: 'sherman', label: 'Sherman NE', path: '/local-movers/nebraska/sherman', probeGroup: 'named' },
  { stateSlug: 'colorado', countySlug: 'douglas', label: 'Douglas CO', path: '/local-movers/colorado/douglas', probeGroup: 'named' },
  { stateSlug: 'florida', countySlug: 'highlands', label: 'Highlands FL', path: '/local-movers/florida/highlands', probeGroup: 'named' },
  { stateSlug: 'virginia', countySlug: 'fairfax', label: 'Fairfax VA', path: '/local-movers/virginia/fairfax', probeGroup: 'named' },
  { stateSlug: 'texas', countySlug: 'harris', label: 'Harris TX', path: '/local-movers/texas/harris', probeGroup: 'named' },
  { stateSlug: 'illinois', countySlug: 'cook', label: 'Cook IL', path: '/local-movers/illinois/cook', probeGroup: 'named' },
  { stateSlug: 'pennsylvania', countySlug: 'philadelphia', label: 'Philadelphia PA', path: '/local-movers/pennsylvania/philadelphia', probeGroup: 'named' },
  { stateSlug: 'ohio', countySlug: 'franklin', label: 'Franklin OH', path: '/local-movers/ohio/franklin', probeGroup: 'named' },
  { stateSlug: 'north-carolina', countySlug: 'wake', label: 'Wake NC', path: '/local-movers/north-carolina/wake', probeGroup: 'named' },
  { stateSlug: 'georgia', countySlug: 'fulton', label: 'Fulton GA', path: '/local-movers/georgia/fulton', probeGroup: 'named' },
];

export function resolveDeployCommitHash(): string {
  if (process.env.DEPLOY_COMMIT_HASH?.trim()) {
    return process.env.DEPLOY_COMMIT_HASH.trim();
  }
  return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
}

export function buildAllAuditProbes(commitHash = resolveDeployCommitHash()): {
  commitHash: string;
  named: LiveCountyProbe[];
  seededRandom: LiveCountyProbe[];
  all: LiveCountyProbe[];
  seededSample: {
    seed: number;
    selectionCode: string;
    digest: string;
  };
} {
  const named = NAMED_COUNTY_PROBES;
  const { seed, selectionCode, probes } = buildSeededCountyProbes(
    commitHash,
    named.map((p) => ({ stateSlug: p.stateSlug, countySlug: p.countySlug }))
  );
  const seededRandom = probes.map((p) => ({ ...p, probeGroup: 'seeded-random' as const }));
  return {
    commitHash,
    named,
    seededRandom,
    all: [...named, ...seededRandom],
    seededSample: {
      seed,
      selectionCode: SEEDED_SAMPLE_SELECTION_CODE,
      digest: sampleDigest(seededRandom),
    },
  };
}

/** @deprecated Use NAMED_COUNTY_PROBES */
export const REQUIRED_LIVE_COUNTY_PROBES = NAMED_COUNTY_PROBES;

export type LiveCountyFetchResult = {
  probe: LiveCountyProbe;
  status: number;
  title: string | null;
  metaDescription: string | null;
  robots: string | null;
  hasKeywordsMeta: boolean;
  hasMoversServingTitle: boolean;
  hasMoversServingH1: boolean;
  hasArtifactText: boolean;
  hasJsonLd: boolean;
  renderedArtifactPatterns: string[];
  errors: string[];
};

const RENDERED_ARTIFACT_PATTERNS: ReadonlyArray<{ id: string; pattern: RegExp }> = [
  { id: 'loup_river_sherman', pattern: /\bloup river sherman\b/i },
  { id: 'concatenated_corridor_demand', pattern: /\b[a-z]+(?:\s+[a-z]+){1,3}\s+corridor\s+demand\b/i },
  { id: 'fabricated_testimonial_quote', pattern: /Loup River Sherman Moving/i },
];

function extractMeta(html: string, name: string): string | null {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match =
    html.match(new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']*)["']`, 'i')) ??
    html.match(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${escaped}["']`, 'i'));
  return match?.[1]?.trim() ?? null;
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1]?.trim() ?? null;
}

function scanRenderedArtifacts(html: string): string[] {
  return RENDERED_ARTIFACT_PATTERNS.filter(({ pattern }) => pattern.test(html)).map(
    ({ id }) => id
  );
}

export async function fetchLiveCountyPage(
  probe: LiveCountyProbe,
  origin = PRODUCTION_ORIGIN
): Promise<LiveCountyFetchResult> {
  const url = `${origin}${probe.path}`;
  const errors: string[] = [];

  let status = 0;
  let html = '';
  const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET?.trim();
  const headers: Record<string, string> = {
    'User-Agent': 'MoveTrustHub-CountyAudit/1.1-revised',
  };
  if (bypassSecret) {
    headers['x-vercel-protection-bypass'] = bypassSecret;
  }

  try {
    const response = await fetch(url, {
      headers,
      redirect: 'follow',
    });
    status = response.status;
    html = await response.text();
  } catch (error) {
    errors.push(`fetch_failed: ${error instanceof Error ? error.message : String(error)}`);
    return {
      probe,
      status,
      title: null,
      metaDescription: null,
      robots: null,
      hasKeywordsMeta: false,
      hasMoversServingTitle: false,
      hasMoversServingH1: false,
      hasArtifactText: false,
      hasJsonLd: false,
      renderedArtifactPatterns: [],
      errors,
    };
  }

  const title = extractTitle(html);
  const metaDescription = extractMeta(html, 'description');
  const robots = extractMeta(html, 'robots');
  const hasKeywordsMeta = /<meta[^>]+name=["']keywords["']/i.test(html);
  const hasMoversServingTitle = Boolean(title?.includes('Movers Serving'));
  const hasMoversServingH1 = /Movers Serving [^<]+/i.test(html);
  const renderedArtifactPatterns = scanRenderedArtifacts(html);
  const hasArtifactText = renderedArtifactPatterns.length > 0;
  const hasJsonLd = /application\/ld\+json/i.test(html);

  if (status !== 200) errors.push(`http_${status}`);
  if (!title) errors.push('missing_title');
  if (!metaDescription) errors.push('missing_meta_description');
  if (!robots) errors.push('missing_robots_meta');
  if (!hasJsonLd) errors.push('missing_json_ld');
  if (hasKeywordsMeta) errors.push('forbidden_keywords_meta');
  if (!hasMoversServingTitle) errors.push('title_missing_movers_serving');
  if (!hasMoversServingH1) errors.push('h1_missing_movers_serving');
  for (const artifact of renderedArtifactPatterns) {
    errors.push(`rendered_artifact_${artifact}`);
  }

  return {
    probe,
    status,
    title,
    metaDescription,
    robots,
    hasKeywordsMeta,
    hasMoversServingTitle,
    hasMoversServingH1,
    hasArtifactText,
    hasJsonLd,
    renderedArtifactPatterns,
    errors,
  };
}

export async function fetchAllAuditProbes(
  probes: LiveCountyProbe[],
  origin = PRODUCTION_ORIGIN
): Promise<LiveCountyFetchResult[]> {
  const results: LiveCountyFetchResult[] = [];
  for (const probe of probes) {
    results.push(await fetchLiveCountyPage(probe, origin));
  }
  return results;
}

export async function fetchAllRequiredLiveCounties(
  origin = PRODUCTION_ORIGIN
): Promise<LiveCountyFetchResult[]> {
  return fetchAllAuditProbes(NAMED_COUNTY_PROBES, origin);
}

export function serializeProbeResults(
  origin: string,
  results: LiveCountyFetchResult[]
) {
  return {
    origin,
    probes: results.map((result) => ({
      label: result.probe.label,
      path: result.probe.path,
      probeGroup: result.probe.probeGroup,
      status: result.status,
      title: result.title,
      metaDescription: result.metaDescription?.slice(0, 200) ?? null,
      robots: result.robots,
      hasKeywordsMeta: result.hasKeywordsMeta,
      hasMoversServingTitle: result.hasMoversServingTitle,
      hasMoversServingH1: result.hasMoversServingH1,
      hasArtifactText: result.hasArtifactText,
      renderedArtifactPatterns: result.renderedArtifactPatterns,
      hasJsonLd: result.hasJsonLd,
      errors: result.errors,
      pass: result.errors.length === 0,
    })),
    failedProbeCount: results.filter((r) => r.errors.length > 0).length,
  };
}