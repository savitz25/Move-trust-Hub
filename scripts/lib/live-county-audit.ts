/**
 * Shared live production fetch helpers for county compliance audits.
 */
export const PRODUCTION_ORIGIN = 'https://www.movetrusthub.com';

export type LiveCountyProbe = {
  stateSlug: string;
  countySlug: string;
  label: string;
  path: string;
};

export const REQUIRED_LIVE_COUNTY_PROBES: LiveCountyProbe[] = [
  { stateSlug: 'nebraska', countySlug: 'sherman', label: 'Sherman NE', path: '/local-movers/nebraska/sherman' },
  { stateSlug: 'colorado', countySlug: 'douglas', label: 'Douglas CO', path: '/local-movers/colorado/douglas' },
  { stateSlug: 'florida', countySlug: 'miami-dade', label: 'Miami-Dade FL', path: '/local-movers/florida/miami-dade' },
  { stateSlug: 'virginia', countySlug: 'fairfax', label: 'Fairfax VA', path: '/local-movers/virginia/fairfax' },
  { stateSlug: 'texas', countySlug: 'harris', label: 'Harris TX', path: '/local-movers/texas/harris' },
  { stateSlug: 'illinois', countySlug: 'cook', label: 'Cook IL', path: '/local-movers/illinois/cook' },
  { stateSlug: 'pennsylvania', countySlug: 'philadelphia', label: 'Philadelphia PA', path: '/local-movers/pennsylvania/philadelphia' },
  { stateSlug: 'ohio', countySlug: 'franklin', label: 'Franklin OH', path: '/local-movers/ohio/franklin' },
  { stateSlug: 'north-carolina', countySlug: 'wake', label: 'Wake NC', path: '/local-movers/north-carolina/wake' },
  { stateSlug: 'georgia', countySlug: 'fulton', label: 'Fulton GA', path: '/local-movers/georgia/fulton' },
];

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
  errors: string[];
};

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

export async function fetchLiveCountyPage(
  probe: LiveCountyProbe,
  origin = PRODUCTION_ORIGIN
): Promise<LiveCountyFetchResult> {
  const url = `${origin}${probe.path}`;
  const errors: string[] = [];

  let status = 0;
  let html = '';
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'MoveTrustHub-CountyAudit/1.1' },
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
      errors,
    };
  }

  const title = extractTitle(html);
  const metaDescription = extractMeta(html, 'description');
  const robots = extractMeta(html, 'robots');
  const hasKeywordsMeta = /<meta[^>]+name=["']keywords["']/i.test(html);
  const hasMoversServingTitle = Boolean(title?.includes('Movers Serving'));
  const hasMoversServingH1 = /Movers Serving [^<]+ County/i.test(html);
  const hasArtifactText = /\bloup river sherman\b/i.test(html);
  const hasJsonLd = /application\/ld\+json/i.test(html);

  if (status !== 200) errors.push(`http_${status}`);
  if (!title) errors.push('missing_title');
  if (!metaDescription) errors.push('missing_meta_description');
  if (!robots) errors.push('missing_robots_meta');
  if (!hasJsonLd) errors.push('missing_json_ld');
  if (hasKeywordsMeta) errors.push('forbidden_keywords_meta');
  if (!hasMoversServingTitle) errors.push('title_missing_movers_serving');
  if (!hasMoversServingH1) errors.push('h1_missing_movers_serving');
  if (hasArtifactText) errors.push('artifact_loup_river_sherman');

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
    errors,
  };
}

export async function fetchAllRequiredLiveCounties(
  origin = PRODUCTION_ORIGIN
): Promise<LiveCountyFetchResult[]> {
  const results: LiveCountyFetchResult[] = [];
  for (const probe of REQUIRED_LIVE_COUNTY_PROBES) {
    results.push(await fetchLiveCountyPage(probe, origin));
  }
  return results;
}