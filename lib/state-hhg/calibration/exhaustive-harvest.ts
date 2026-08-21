/**
 * Harvest identity-verified exhaustive/radius service-area evidence.
 * No Google Places. No model-derived ground truth.
 */
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import {
  countiesForState,
  countiesWithinRadius,
  loadFlWaCountyCentroids,
  type CountyCentroid,
} from '@/lib/state-hhg/calibration/counties';
import type { CalibrationCohortMember } from '@/lib/state-hhg/calibration/types';
import type { OperatingLocationRecord } from '@/lib/state-hhg/calibration/types';
import type { ExhaustiveEvidenceRecord } from '@/lib/state-hhg/calibration/exhaustive-types';
import {
  collectProviderWebsiteText,
  fetchProviderPage,
  parseServiceAreaClaims,
  websiteIdentityOk,
} from '@/lib/state-hhg/calibration/website-evidence';
import { isFranchiseOrNetworkBrandName } from '@/lib/state-hhg/normalize';

const EXTRA_PATHS = [
  '/service-area/',
  '/service-areas/',
  '/areas-we-serve/',
  '/areas-served/',
  '/locations/',
  '/location/',
  '/coverage/',
  '/local-moving/',
  '/moving-services/',
  '/services/local-moving/',
  '/faq/',
  '/faqs/',
  '/about-us/',
  '/contact-us/',
  '/our-service-area/',
  '/south-florida-moving-service-area/',
];

const CACHE_PATH = resolve(
  process.cwd(),
  'data/state-hhg/calibration/011c1b-page-cache.json'
);

type PageCache = Record<string, { text: string; url: string; retrievedAt: string }>;

function loadPageCache(): PageCache {
  if (!existsSync(CACHE_PATH)) return {};
  return JSON.parse(readFileSync(CACHE_PATH, 'utf8')) as PageCache;
}

function savePageCache(cache: PageCache) {
  mkdirSync(resolve(process.cwd(), 'data/state-hhg/calibration'), {
    recursive: true,
  });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

function evidenceId(providerId: string, url: string, cls: string): string {
  return createHash('sha1')
    .update(`${providerId}|${url}|${cls}`)
    .digest('hex')
    .slice(0, 16);
}

function countyNameToFips(
  place: string,
  stateCode: 'FL' | 'WA',
  centroids: readonly CountyCentroid[]
): string | null {
  const stateFips = stateCode === 'FL' ? '12' : '53';
  const cleaned = place
    .replace(/\bcounty\b/i, '')
    .replace(/\./g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  for (const c of centroids) {
    if (c.stateFips !== stateFips) continue;
    const n = c.name.toLowerCase();
    if (n === cleaned || n.replace(/[^a-z]/g, '') === cleaned.replace(/[^a-z]/g, '')) {
      return c.countyFips;
    }
  }
  if (stateCode === 'FL' && /miami\s*-?\s*dade/.test(cleaned)) {
    return centroids.find((c) => c.stateFips === '12' && /miami/i.test(c.name))
      ?.countyFips ?? null;
  }
  return null;
}

/** Stronger semantic classifier for exhaustive/radius statements. */
export function classifyExhaustiveStatement(
  text: string,
  stateCode: 'FL' | 'WA'
): {
  class:
    | 'EXHAUSTIVE_LIST'
    | 'RADIUS_EXPLICIT'
    | 'EXPLICIT_STATEWIDE'
    | 'EXPLICIT_EXCLUSION'
    | 'REGION_EXPLICIT'
    | 'PARTIAL'
    | 'UNKNOWN';
  radiusMiles: number | null;
  excerpt: string | null;
  positives: string[];
  negatives: string[];
  notes: string[];
} {
  const notes: string[] = [];
  const claims = parseServiceAreaClaims(text, stateCode);
  const lower = text.toLowerCase();

  // RADIUS
  const radiusPatterns = [
    /(?:local\s+mov(?:e|es|ing)|pickup|pick-up|service\s+area|we\s+serve|serving|within)\s[^.]{0,40}?within\s+(\d{1,3})\s*miles?/i,
    /within\s+a?\s*(\d{1,3})\s*[-–]?\s*mile\s+radius/i,
    /(\d{1,3})\s*mile\s+radius/i,
    /up\s+to\s+(\d{1,3})\s*miles?\s+(?:from|of)\s+(?:our|the)\s+(?:office|warehouse|location|shop)/i,
    /local\s+moves?\s+(?:are\s+)?(?:defined\s+as\s+)?(?:moves?\s+)?(?:of\s+)?(?:up\s+to\s+|within\s+)?(\d{1,3})\s*miles?/i,
  ];
  let radiusMiles: number | null = claims.explicitRadiusMiles;
  let excerpt: string | null = null;
  for (const re of radiusPatterns) {
    const m = text.match(re);
    if (m) {
      const n = Number(m[1]);
      if (n >= 5 && n <= 250) {
        radiusMiles = n;
        excerpt = m[0].slice(0, 200);
        break;
      }
    }
  }

  // STATEWIDE pickup (not mere legal authority)
  const statewide =
    /\b(?:provide|offer|perform)\s+(?:local\s+)?(?:moving\s+)?(?:pickup\s+)?(?:services?\s+)?statewide\b/i.test(
      text
    ) ||
    /\bstatewide\s+(?:local\s+)?(?:moving|pickup|service\s+area)\b/i.test(text) ||
    /\bserv(?:e|es|ing)\s+(?:customers\s+)?(?:anywhere|everywhere)\s+in\s+(florida|washington)\s+for\s+local\b/i.test(
      text
    ) ||
    /\bentire\s+state\s+of\s+(florida|washington)\s+for\s+(?:local\s+)?(?:moves|pickup)\b/i.test(
      text
    );

  // EXHAUSTIVE list language
  const exhaustive =
    /\b(?:only\s+serv(?:e|es|ing)|service\s+(?:area\s+)?(?:is\s+)?limited\s+to|we\s+serv(?:e|es)\s+only\s+the\s+following|exclusive(?:ly)?\s+(?:serv|in)|complete\s+service\s+area\s+(?:is|includes)\s+only)\b/i.test(
      text
    ) ||
    /\bthe\s+following\s+counties\s+only\b/i.test(text);

  // EXCLUSION
  const exclusion =
    /\b(?:do\s+not\s+serv(?:e|es)|does\s+not\s+serv(?:e|es)|we\s+don'?t\s+serv(?:e|es)|outside\s+(?:our|of)\s+service\s+area|not\s+(?:available|able)\s+(?:in|to\s+serve))\b/i.test(
      text
    );

  const positives = claims.placeMentions;
  const negatives: string[] = [];

  if (radiusMiles != null) {
    return {
      class: 'RADIUS_EXPLICIT',
      radiusMiles,
      excerpt,
      positives,
      negatives,
      notes,
    };
  }
  if (statewide) {
    notes.push('statewide pickup/service wording reviewed');
    return {
      class: 'EXPLICIT_STATEWIDE',
      radiusMiles: null,
      excerpt: excerpt ?? 'statewide pickup/service',
      positives,
      negatives,
      notes,
    };
  }
  if (exhaustive && positives.length > 0) {
    return {
      class: 'EXHAUSTIVE_LIST',
      radiusMiles: null,
      excerpt,
      positives,
      negatives,
      notes,
    };
  }
  if (exclusion && positives.length > 0) {
    // Try capture excluded place names after exclusion cues
    const exclChunk = text.match(
      /(?:do\s+not\s+serve|does\s+not\s+serve|don'?t\s+serve)([^.!]{0,120})/i
    );
    if (exclChunk) {
      const sub = parseServiceAreaClaims(exclChunk[1], stateCode);
      negatives.push(...sub.placeMentions);
    }
    return {
      class: 'EXPLICIT_EXCLUSION',
      radiusMiles: null,
      excerpt: exclChunk?.[0]?.slice(0, 200) ?? null,
      positives,
      negatives,
      notes,
    };
  }
  if (claims.completeness === 'REGION_EXPLICIT') {
    return {
      class: 'REGION_EXPLICIT',
      radiusMiles: null,
      excerpt: claims.regionText,
      positives,
      negatives,
      notes,
    };
  }
  if (positives.length > 0) {
    return {
      class: 'PARTIAL',
      radiusMiles: null,
      excerpt: null,
      positives,
      negatives,
      notes,
    };
  }
  return {
    class: 'UNKNOWN',
    radiusMiles: null,
    excerpt: null,
    positives: [],
    negatives: [],
    notes,
  };
}

/** Second semantic gate — fail closed. */
export function secondCheckExhaustive(input: {
  classification: ReturnType<typeof classifyExhaustiveStatement>;
  identityConfidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNRESOLVED';
  franchiseSafetyHold: boolean;
  concernsPickup: boolean;
}): { pass: boolean; notes: string[] } {
  const notes: string[] = [];
  if (input.identityConfidence === 'UNRESOLVED' || input.identityConfidence === 'LOW') {
    return { pass: false, notes: ['identity_not_high_enough'] };
  }
  if (input.franchiseSafetyHold) {
    return { pass: false, notes: ['franchise_safety_hold'] };
  }
  if (!input.concernsPickup) {
    return { pass: false, notes: ['not_clearly_pickup_origin_service'] };
  }
  const cls = input.classification.class;
  if (
    cls !== 'EXHAUSTIVE_LIST' &&
    cls !== 'RADIUS_EXPLICIT' &&
    cls !== 'EXPLICIT_STATEWIDE' &&
    cls !== 'EXPLICIT_EXCLUSION'
  ) {
    return { pass: false, notes: ['class_not_precision_scorable'] };
  }
  if (cls === 'RADIUS_EXPLICIT' && input.classification.radiusMiles == null) {
    return { pass: false, notes: ['radius_missing'] };
  }
  if (cls === 'EXHAUSTIVE_LIST' && input.classification.positives.length === 0) {
    return { pass: false, notes: ['exhaustive_without_places'] };
  }
  notes.push('second_check_pass');
  return { pass: true, notes };
}

function concernsPickupOrigin(text: string): boolean {
  return /\b(local\s+mov|pickup|pick-up|service\s+area|areas?\s+we\s+serve|within\s+\d+\s*miles?|mile\s+radius|serving\s+[a-z])/i.test(
    text
  );
}

export async function harvestExhaustiveEvidence(input: {
  cohort: readonly CalibrationCohortMember[];
  locations: readonly OperatingLocationRecord[];
  websites: Map<
    string,
    { website: string | null; phone: string | null; name: string | null }
  >;
  options?: { delayMs?: number; maxProviders?: number };
}): Promise<{
  records: ExhaustiveEvidenceRecord[];
  yieldStats: Record<string, number>;
  pagesReviewed: number;
  providersReviewed: number;
}> {
  const centroids = loadFlWaCountyCentroids();
  const locById = new Map(input.locations.map((l) => [l.providerId, l]));
  const cache = loadPageCache();
  const delayMs = input.options?.delayMs ?? 200;
  const maxProviders = input.options?.maxProviders ?? 120;
  const retrievedAt = new Date().toISOString();
  const records: ExhaustiveEvidenceRecord[] = [];
  let pagesReviewed = 0;
  let providersReviewed = 0;
  const yieldStats: Record<string, number> = {
    PARTIAL: 0,
    REGION_EXPLICIT: 0,
    EXHAUSTIVE_LIST: 0,
    RADIUS_EXPLICIT: 0,
    EXPLICIT_STATEWIDE: 0,
    EXPLICIT_EXCLUSION: 0,
    UNKNOWN: 0,
  };

  const withSites = input.cohort.filter((m) => input.websites.get(m.providerId)?.website);
  const ordered = [
    ...withSites.filter((m) => m.stateCode === 'FL'),
    ...withSites.filter((m) => m.stateCode === 'WA'),
    ...input.cohort.filter((m) => !input.websites.get(m.providerId)?.website),
  ].slice(0, maxProviders);

  for (const m of ordered) {
    providersReviewed++;
    const site = input.websites.get(m.providerId)?.website;
    if (!site) continue;

    const franchise =
      isFranchiseOrNetworkBrandName(m.legalName) ||
      isFranchiseOrNetworkBrandName(m.canonicalName);

    // Fetch homepage + extra paths (use cache)
    const texts: { url: string; text: string }[] = [];
    const baseKey = site.toLowerCase();
    if (cache[baseKey]?.text) {
      texts.push({ url: cache[baseKey].url, text: cache[baseKey].text });
    } else {
      const collected = await collectProviderWebsiteText(site, {
        delayMs,
        maxPages: 5,
      });
      pagesReviewed += collected.pages.length;
      for (const p of collected.pages) {
        cache[p.url] = {
          text: p.text,
          url: p.url,
          retrievedAt,
        };
        texts.push({ url: p.url, text: p.text });
      }
      savePageCache(cache);
    }

    // Extra paths
    for (const path of EXTRA_PATHS) {
      const page = await fetchProviderPage(site, path);
      await new Promise((r) => setTimeout(r, delayMs));
      pagesReviewed++;
      if (page.ok && page.text.length > 150) {
        cache[page.url] = { text: page.text, url: page.url, retrievedAt };
        texts.push({ url: page.url, text: page.text });
      }
    }
    savePageCache(cache);

    const combined = texts.map((t) => t.text).join('\n');
    if (combined.length < 80) continue;

    const identity = websiteIdentityOk({
      website: site,
      legalName: m.legalName,
      canonicalName: m.canonicalName,
      phone: input.websites.get(m.providerId)?.phone ?? null,
      pageText: combined,
    });

    const classification = classifyExhaustiveStatement(combined, m.stateCode);
    yieldStats[classification.class] = (yieldStats[classification.class] ?? 0) + 1;

    const pickupOk = concernsPickupOrigin(combined);
    const check = secondCheckExhaustive({
      classification,
      identityConfidence: identity.confidence,
      franchiseSafetyHold: franchise,
      concernsPickup: pickupOk,
    });

    const positiveFips: string[] = [];
    const negativeFips: string[] = [];
    for (const p of classification.positives) {
      const fips = countyNameToFips(p, m.stateCode, centroids);
      if (fips && !positiveFips.includes(fips)) positiveFips.push(fips);
    }
    for (const p of classification.negatives) {
      const fips = countyNameToFips(p, m.stateCode, centroids);
      if (fips && !negativeFips.includes(fips)) negativeFips.push(fips);
    }

    const loc = locById.get(m.providerId);
    const stateCounties = countiesForState(centroids, m.stateCode).map(
      (c) => c.countyFips
    );

    let scorable = false;
    if (check.pass && classification.class === 'RADIUS_EXPLICIT' && loc?.lat != null && loc.lon != null && classification.radiusMiles != null) {
      const inside = countiesWithinRadius(
        loc.lat,
        loc.lon,
        classification.radiusMiles,
        countiesForState(centroids, m.stateCode)
      );
      positiveFips.length = 0;
      positiveFips.push(...inside);
      negativeFips.length = 0;
      negativeFips.push(...stateCounties.filter((f) => !inside.includes(f)));
      scorable = true;
    } else if (check.pass && classification.class === 'EXHAUSTIVE_LIST' && positiveFips.length > 0) {
      negativeFips.length = 0;
      negativeFips.push(...stateCounties.filter((f) => !positiveFips.includes(f)));
      scorable = true;
    } else if (check.pass && classification.class === 'EXPLICIT_STATEWIDE') {
      positiveFips.length = 0;
      positiveFips.push(...stateCounties);
      negativeFips.length = 0;
      scorable = true; // all positive; TN/FP still meaningful vs model underprediction
    } else if (check.pass && classification.class === 'EXPLICIT_EXCLUSION' && negativeFips.length > 0) {
      scorable = positiveFips.length > 0; // need some positives too for a usable set
    }

    const known = new Set([...positiveFips, ...negativeFips]);
    const unknown = stateCounties.filter((f) => !known.has(f));
    const primaryUrl = texts[0]?.url ?? site;

    records.push({
      evidenceId: evidenceId(m.providerId, primaryUrl, classification.class),
      providerId: m.providerId,
      stateCode: m.stateCode,
      sourceUrl: primaryUrl,
      sourceType: /faq/i.test(primaryUrl)
        ? 'provider_faq'
        : /service-area|areas-we-serve|location/i.test(primaryUrl)
          ? 'provider_service_area_page'
          : 'provider_website',
      retrievedAt,
      quotedStatement: (classification.excerpt ?? combined.slice(0, 240)).replace(/\s+/g, ' '),
      identityEvidence: [
        `identityConfidence=${identity.confidence}`,
        ...identity.notes,
      ],
      identityConfidence: identity.confidence,
      completenessClass: classification.class,
      confidence: check.pass ? 'HIGH' : 'MEDIUM',
      explicitRadiusMiles: classification.radiusMiles,
      positiveGeographyText: classification.positives,
      negativeGeographyText: classification.negatives,
      positiveCountyFips: positiveFips.sort(),
      negativeCountyFips: negativeFips.sort(),
      unknownCountyFips: unknown.sort(),
      reviewNotes: [
        ...classification.notes,
        ...check.notes,
        pickupOk ? 'pickup_origin_language_present' : 'pickup_language_weak',
      ],
      secondCheckPass: check.pass,
      scorableForPrecision: scorable && check.pass,
      franchiseSafetyHold: franchise,
    });
  }

  return { records, yieldStats, pagesReviewed, providersReviewed };
}

/** DuckDuckGo HTML lite discovery of candidate official websites (not Google). */
export async function discoverWebsiteViaDdg(
  query: string
): Promise<string | null> {
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'MoveTrustHub-Task011C1B/1.0 (official-site-discovery; no Google Places)',
        Accept: 'text/html',
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const links = [...html.matchAll(/uddg=([^&"]+)/g)].map((m) =>
      decodeURIComponent(m[1])
    );
    for (const link of links) {
      if (!/^https?:\/\//i.test(link)) continue;
      if (/facebook|yelp|yellowpages|bbb\.org|angi\.com|homeadvisor|wikipedia|linkedin|google\.|maps\.|apple\.com|tripadvisor/i.test(link)) {
        continue;
      }
      return link;
    }
    return null;
  } catch {
    return null;
  }
}
