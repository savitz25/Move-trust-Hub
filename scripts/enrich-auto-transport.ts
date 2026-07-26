/**
 * Auto-transport (+ optional container) Google Places + BBB enrichment.
 *
 * Phases:
 *  1) Audit classes A/B/C/D → scripts/output/auto-transport-enrichment-audit.json
 *  2) Re-enrich when --confirm (Places + BBB scrape; never invent ratings)
 *
 * Usage:
 *   npm run enrich:auto-transport
 *   npm run enrich:auto-transport -- --dry-run
 *   npm run enrich:auto-transport -- --confirm --limit=50
 *   npm run enrich:auto-transport -- --slugs=reliable-carriers,sherpa-auto-transport --confirm
 *   npm run enrich:auto-transport -- --include-container --confirm
 *   npm run enrich:auto-transport -- --container-only --confirm
 *   npm run enrich:container -- --confirm
 *
 * Policy:
 *  - Do NOT overwrite industry-reported overall_rating / review_count with Places
 *  - Persist Places in google_data + verification_sources.google
 *  - Prefer website domain match, then name + metro
 *  - Reject wrong-industry matches via Places scoring
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { portableContainerCompanies } from '../data/portable-container-companies';
import { seedAutoTransportCompanies } from '../data/seed-auto-transport';
import type { Company } from '../types';
import {
  parseGoogleData,
  parsePublicScrapeData,
  parseVerificationSources,
  type VerificationSources,
} from '../lib/verification/backfill-helpers';
import {
  fetchGooglePlacesData,
  isGooglePlacesConfigured,
  isUsableGoogleSnapshot,
  mergeGoogleSnapshots,
} from '../lib/verification/google-places';
import { fetchBbbPublicScrape } from '../lib/verification/bbb-public-scrape';
import type { GooglePlacesData, PublicScrapeData } from '../lib/verification/types';
import { loadEnvLocal } from '../lib/verification/load-env-local';
import {
  resolveGoogleDataFromRow,
  resolvePublicScrapeFromRow,
} from '../lib/verification/resolve-company-row';

loadEnvLocal();

const confirm = process.argv.includes('--confirm');
const dryRun = process.argv.includes('--dry-run') || !confirm;
const force = process.argv.includes('--force');
const containerOnly = process.argv.includes('--container-only');
const includeContainer =
  containerOnly || process.argv.includes('--include-container');
const limit = Math.max(
  1,
  Number.parseInt(
    process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? '100',
    10
  )
);
const delayMs = Math.max(
  300,
  Number.parseInt(
    process.argv.find((a) => a.startsWith('--delay-ms='))?.split('=')[1] ?? '700',
    10
  )
);
const onlySlugs = (() => {
  const hit = process.argv.find((a) => a.startsWith('--slugs='));
  if (!hit) return null as Set<string> | null;
  return new Set(
    hit
      .slice('--slugs='.length)
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
})();

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

type ClassCode = 'A' | 'B' | 'C' | 'D';
type Group = 'auto' | 'container';

type AuditRow = {
  slug: string;
  name: string;
  group: Group;
  cityState: string;
  website: string | null;
  industryRating: number;
  industryReviewVolume: number;
  google_place_id: string | null;
  placesRating: number | null;
  placesReviewCount: number | null;
  lastPlacesSyncAt: string | null;
  bbb_rating: string | null;
  bbb_url: string | null;
  bbb_accredited: boolean | null;
  lastBbbSyncAt: string | null;
  enrichmentStatus: string;
  lastEnrichedAt: string | null;
  lastError: string | null;
  profileShowsGoogleNotLoaded: boolean;
  class: ClassCode;
  inSupabase: boolean;
  classReason: string;
};

type DbCompanyRow = {
  id: string;
  slug: string;
  name: string;
  headquarters: string | null;
  website: string | null;
  phone: string | null;
  physical_address?: string | null;
  overall_rating: number | null;
  review_count: number | null;
  bbb_rating: string | null;
  bbb_accredited: boolean | null;
  google_data: unknown;
  public_scrape_data: unknown;
  verification_sources: unknown;
  verification_last_synced_at?: string | null;
  last_updated: string | null;
  services?: string[] | null;
  entity_type?: string | null;
};

function isMarketplaceDot(usdot: string | undefined | null): boolean {
  if (!usdot?.trim()) return false;
  return /marketplace|n\/a|not applicable/i.test(usdot);
}

function companyToInsertRow(c: Company): Record<string, unknown> {
  const usdot = isMarketplaceDot(c.usdotNumber)
    ? null
    : c.usdotNumber?.replace(/\D/g, '') || null;
  const mc = isMarketplaceDot(c.mcNumber)
    ? null
    : c.mcNumber?.replace(/^MC-?/i, '').replace(/\D/g, '') || null;

  // Core columns only — avoid optional columns missing on older Supabase schemas
  // (service_scope, google_data, entity_type, etc. differ by migration state).
  return {
    id: c.slug,
    slug: c.slug,
    name: c.name,
    short_description: c.shortDescription,
    description: c.description,
    founded_year: c.foundedYear || null,
    headquarters: c.headquarters || null,
    website: c.website || null,
    usdot_number: usdot,
    mc_number: mc,
    fmcsa_legal_name: c.fmcsaLegalName || null,
    fmcsa_safety_rating: c.fmcsaSafetyRating || 'Not Rated',
    fmcsa_complaints: c.fmcsaComplaints ?? 0,
    fmcsa_shipments: c.fmcsaShipments ?? 0,
    bbb_rating: c.bbbRating && c.bbbRating !== 'NR' ? c.bbbRating : null,
    bbb_accredited: c.bbbAccredited ?? null,
    // Industry-reported editorial (seed) — never Places
    overall_rating: c.overallRating || null,
    review_count: c.reviewCount || null,
    reputation_score: c.reputationScore || null,
    years_in_business: c.yearsInBusiness || null,
    avg_price_per_move: c.avgPricePerMove || null,
    price_range: c.priceRange || null,
    coverage: c.coverage || 'All 50 States',
    services: c.services || [],
    specialties: c.specialties || [],
    is_verified: Boolean(c.isVerified && usdot),
    last_updated: new Date().toISOString().slice(0, 10),
  };
}

function hasUsableGoogle(row: Partial<DbCompanyRow> | null | undefined): boolean {
  if (!row) return false;
  const g = resolveGoogleDataFromRow(row as Record<string, unknown>);
  return isUsableGoogleSnapshot(g);
}

function extractGoogleMeta(row: Partial<DbCompanyRow> | null | undefined): {
  placeId: string | null;
  rating: number | null;
  reviewCount: number | null;
  lastFetched: string | null;
} {
  if (!row) {
    return { placeId: null, rating: null, reviewCount: null, lastFetched: null };
  }
  const g = resolveGoogleDataFromRow(row as Record<string, unknown>);
  return {
    placeId: g?.place_id ?? null,
    rating: g?.status === 'ok' && g.rating != null && g.rating > 0 ? g.rating : null,
    reviewCount: g?.status === 'ok' ? (g.review_count ?? null) : null,
    lastFetched: g?.last_fetched ?? null,
  };
}

function extractBbbMeta(row: Partial<DbCompanyRow> | null | undefined): {
  rating: string | null;
  url: string | null;
  accredited: boolean | null;
  lastScraped: string | null;
} {
  if (!row) {
    return { rating: null, url: null, accredited: null, lastScraped: null };
  }
  const scrape = resolvePublicScrapeFromRow(row as Record<string, unknown>);
  const colRating =
    row.bbb_rating && row.bbb_rating !== 'NR' ? row.bbb_rating : null;
  return {
    rating: scrape?.bbb_rating || colRating,
    url: scrape?.bbb_profile_url ?? null,
    accredited:
      scrape?.bbb_accredited ??
      (row.bbb_accredited != null ? Boolean(row.bbb_accredited) : null),
    lastScraped: scrape?.last_scraped_at ?? null,
  };
}

/**
 * A — Places/BBB exists in DB but profile would still look empty (hydrate/mapping)
 * B — Missing data, matchable via name+website+metro → re-enrich
 * C — No reliable match expected / complete empty is honest
 * D — Data lost on save / never written by publish (heuristic)
 */
function classify(
  seed: Company,
  db: DbCompanyRow | null
): { class: ClassCode; reason: string } {
  const googleOk = hasUsableGoogle(db);
  const bbb = extractBbbMeta(db);
  const bbbOk = Boolean(bbb.rating || bbb.url);
  const industryOk = (seed.overallRating || 0) > 0;

  if (googleOk && bbbOk) {
    return { class: 'C', reason: 'complete: Places + BBB present in DB' };
  }
  if (googleOk && !bbbOk) {
    return { class: 'B', reason: 'Places ok; BBB missing — re-scrape BBB' };
  }
  // Google missing
  if (!db) {
    return {
      class: 'B',
      reason: 'seed-only (no Supabase row) — needs upsert + Places/BBB enrich',
    };
  }

  const vs = parseVerificationSources(db.verification_sources);
  const gCol = parseGoogleData(db.google_data);
  const gSrc = parseGoogleData(vs.google);
  const hadFailedAttempt =
    gCol?.status === 'error' ||
    gCol?.status === 'not_found' ||
    gSrc?.status === 'error' ||
    gSrc?.status === 'not_found';

  // Class A: rating columns zeroed but google snapshot exists somewhere malformed
  const dbRating = Number(db.overall_rating) || 0;
  if (dbRating <= 0 && industryOk && !googleOk) {
    // industry is on seed not DB — not A
  }
  // If verification_sources has non-ok google but legacy column has ok — hydrate bug
  if (isUsableGoogleSnapshot(gCol) && !isUsableGoogleSnapshot(gSrc)) {
    return {
      class: 'A',
      reason: 'google_data ok but verification_sources.google missing — hydrate/repair',
    };
  }
  if (isUsableGoogleSnapshot(gSrc) && !isUsableGoogleSnapshot(gCol) && dbRating <= 0) {
    // mapRow should still resolve via resolveGoogleDataFromRow — not pure A
  }

  if (!googleOk && seed.website) {
    return {
      class: 'B',
      reason: hadFailedAttempt
        ? 'prior Places miss; re-try with website domain match'
        : 'missing Places snapshot; website available for domain match',
    };
  }
  if (!googleOk && !seed.website) {
    return {
      class: 'C',
      reason: 'no website for high-confidence match — honest empty if Places fails',
    };
  }

  // Heuristic D: row recently updated but enrichment fields empty (publish dropped them)
  if (
    !googleOk &&
    !bbbOk &&
    db.last_updated &&
    Date.now() - new Date(db.last_updated).getTime() < 14 * 24 * 60 * 60 * 1000
  ) {
    return {
      class: 'D',
      reason: 'recently updated row with empty Places/BBB — possible publish drop',
    };
  }

  return { class: 'B', reason: 'missing Places snapshot' };
}

function buildAuditRow(
  seed: Company,
  group: Group,
  db: DbCompanyRow | null
): AuditRow {
  const g = extractGoogleMeta(db);
  const b = extractBbbMeta(db);
  const { class: classCode, reason } = classify(seed, db);
  const googleOk = g.rating != null && g.rating > 0;

  return {
    slug: seed.slug,
    name: seed.name,
    group,
    cityState: seed.headquarters || '',
    website: seed.website || db?.website || null,
    industryRating: seed.overallRating || 0,
    industryReviewVolume: seed.reviewCount || 0,
    google_place_id: g.placeId,
    placesRating: g.rating,
    placesReviewCount: g.reviewCount,
    lastPlacesSyncAt: g.lastFetched,
    bbb_rating: b.rating,
    bbb_url: b.url,
    bbb_accredited: b.accredited,
    lastBbbSyncAt: b.lastScraped,
    enrichmentStatus: googleOk
      ? b.rating
        ? 'places+bbb'
        : 'places_only'
      : b.rating
        ? 'bbb_only'
        : 'missing',
    lastEnrichedAt: db?.verification_last_synced_at || db?.last_updated || null,
    lastError: null,
    profileShowsGoogleNotLoaded: !googleOk,
    class: classCode,
    inSupabase: Boolean(db),
    classReason: reason,
  };
}

async function fetchDbBySlugs(
  admin: SupabaseClient,
  slugs: string[]
): Promise<Map<string, DbCompanyRow>> {
  const map = new Map<string, DbCompanyRow>();
  if (!slugs.length) return map;
  // Prefer full select; fall back when optional enrichment columns are missing.
  const selectAttempts = [
    'id, slug, name, headquarters, website, phone, physical_address, overall_rating, review_count, bbb_rating, bbb_accredited, google_data, public_scrape_data, verification_sources, verification_last_synced_at, last_updated, services',
    'id, slug, name, headquarters, website, phone, overall_rating, review_count, bbb_rating, bbb_accredited, verification_sources, verification_last_synced_at, last_updated, services',
    'id, slug, name, headquarters, website, phone, overall_rating, review_count, bbb_rating, bbb_accredited, verification_sources, last_updated',
  ];

  // chunk in 50s
  for (let i = 0; i < slugs.length; i += 50) {
    const chunk = slugs.slice(i, i + 50);
    let data: DbCompanyRow[] | null = null;
    let lastErr: string | null = null;
    for (const selectCols of selectAttempts) {
      const res = await admin.from('companies').select(selectCols).in('slug', chunk);
      if (!res.error) {
        data = (res.data ?? []) as DbCompanyRow[];
        lastErr = null;
        break;
      }
      lastErr = res.error.message;
    }
    if (lastErr) {
      console.warn(`  DB slug fetch warning: ${lastErr}`);
      continue;
    }
    for (const row of data ?? []) {
      map.set(row.slug, row);
    }
  }
  return map;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const supabaseOk =
    Boolean(url) &&
    Boolean(key) &&
    !url!.includes('placeholder') &&
    !key!.startsWith('<') &&
    key!.length > 40;

  console.log(
    containerOnly
      ? '── Portable container Places + BBB enrichment ──'
      : '── Auto-transport Places + BBB enrichment ──'
  );
  console.log(`Mode: ${confirm && !dryRun ? 'LIVE WRITE' : 'AUDIT / DRY-RUN (pass --confirm to write)'}`);
  console.log(`Google Places: ${isGooglePlacesConfigured() ? 'configured' : 'MISSING KEY'}`);
  console.log(`Supabase: ${supabaseOk ? 'configured' : 'placeholder/missing (seed-only audit)'}`);
  console.log(
    `Scope: ${containerOnly ? 'container-only' : includeContainer ? 'auto+container' : 'auto-only'}`
  );
  console.log(`Limit: ${limit}`);
  if (onlySlugs) console.log(`Slugs filter: ${[...onlySlugs].join(', ')}`);
  console.log('');

  const targets: Array<{ company: Company; group: Group }> = [
    ...(containerOnly
      ? []
      : seedAutoTransportCompanies.map((c) => ({ company: c, group: 'auto' as const }))),
    ...(includeContainer
      ? portableContainerCompanies.map((c) => ({ company: c, group: 'container' as const }))
      : []),
  ].filter((t) => !onlySlugs || onlySlugs.has(t.company.slug));

  const admin = supabaseOk
    ? createClient(url!, key!, { auth: { persistSession: false } })
    : null;

  const dbMap = admin
    ? await fetchDbBySlugs(
        admin,
        targets.map((t) => t.company.slug)
      )
    : new Map<string, DbCompanyRow>();

  const auditRows: AuditRow[] = targets.map(({ company, group }) =>
    buildAuditRow(company, group, dbMap.get(company.slug) ?? null)
  );

  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (const r of auditRows) counts[r.class]++;

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const auditPath = resolve(outDir, 'auto-transport-enrichment-audit.json');
  writeFileSync(
    auditPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        mode: confirm && !dryRun ? 'confirm' : 'dry-run',
        supabaseConfigured: supabaseOk,
        googlePlacesConfigured: isGooglePlacesConfigured(),
        includeContainer,
        counts,
        total: auditRows.length,
        rows: auditRows,
      },
      null,
      2
    )
  );

  console.log(`Targets: ${auditRows.length}`);
  console.log(`Class A (DB has data, display/mapping issue): ${counts.A}`);
  console.log(`Class B (needs re-enrich / matchable): ${counts.B}`);
  console.log(`Class C (complete or honest empty): ${counts.C}`);
  console.log(`Class D (likely lost on save / never written): ${counts.D}`);
  console.log(`Audit: ${auditPath}`);
  console.log('');

  if (!confirm || dryRun) {
    console.log('Dry-run only. Re-run with --confirm to upsert + write Places/BBB.');
    console.log(
      'Production:\n' +
        '  1) vercel env pull .env.local\n' +
        '  2) ensure GOOGLE_PLACES_API_KEY + SUPABASE_SERVICE_ROLE_KEY are set\n' +
        '  3) npm run enrich:auto-transport -- --slugs=reliable-carriers,sherpa-auto-transport --confirm\n' +
        '  4) npm run enrich:auto-transport -- --confirm --limit=50'
    );
    return;
  }

  if (!admin) {
    console.error(
      'Cannot write: need real NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (not placeholders).'
    );
    process.exit(1);
  }

  // Prioritize priority slugs + class B/D/A
  const priority = new Set(['reliable-carriers', 'sherpa-auto-transport']);
  const enrichQueue = auditRows
    .filter((r) => force || r.class === 'A' || r.class === 'B' || r.class === 'D' || priority.has(r.slug))
    .sort((a, b) => {
      const ap = priority.has(a.slug) ? 0 : 1;
      const bp = priority.has(b.slug) ? 0 : 1;
      if (ap !== bp) return ap - bp;
      return a.slug.localeCompare(b.slug);
    })
    .slice(0, limit);

  console.log(`Enrich queue: ${enrichQueue.length}`);

  const report: Array<{
    slug: string;
    group: Group;
    placesBefore: string;
    placesAfter: string;
    bbbBefore: string;
    bbbAfter: string;
    status: string;
    error?: string;
  }> = [];

  let updated = 0;
  let errors = 0;

  for (let i = 0; i < enrichQueue.length; i++) {
    const audit = enrichQueue[i]!;
    const seed = targets.find((t) => t.company.slug === audit.slug)!.company;
    const group = audit.group;
    console.log(`\n[${i + 1}/${enrichQueue.length}] ${audit.slug} — ${audit.name} (${group})`);

    const placesBefore = audit.placesRating
      ? `${audit.placesRating}★ / ${audit.placesReviewCount ?? 0}`
      : 'none';
    const bbbBefore = audit.bbb_rating || 'none';

    try {
      // Ensure DB row
      let db = dbMap.get(audit.slug) ?? null;
      if (!db) {
        const insertRow = companyToInsertRow(seed);
        const selectAfter =
          'id, slug, name, headquarters, website, phone, overall_rating, review_count, bbb_rating, bbb_accredited, verification_sources, last_updated';
        let upserted: DbCompanyRow | null = null;
        let upsertErr: { message: string } | null = null;
        {
          const res = await admin
            .from('companies')
            .upsert(insertRow, { onConflict: 'slug' })
            .select(selectAfter)
            .maybeSingle();
          upserted = (res.data as DbCompanyRow) ?? null;
          upsertErr = res.error;
        }
        if (upsertErr) {
          // Retry with minimal identity fields only
          const minimal = {
            id: insertRow.id,
            slug: insertRow.slug,
            name: insertRow.name,
            headquarters: insertRow.headquarters,
            website: insertRow.website,
            overall_rating: insertRow.overall_rating,
            review_count: insertRow.review_count,
            last_updated: insertRow.last_updated,
          };
          const res2 = await admin
            .from('companies')
            .upsert(minimal, { onConflict: 'slug' })
            .select(selectAfter)
            .maybeSingle();
          if (res2.error) throw new Error(`upsert failed: ${res2.error.message}`);
          upserted = (res2.data as DbCompanyRow) ?? null;
        }
        db = upserted;
        console.log(`  db: upserted`);
      } else {
        console.log(`  db: existing id=${db.id}`);
      }

      const sourcesNow = parseVerificationSources(db?.verification_sources);
      let googleExisting =
        mergeGoogleSnapshots(
          parseGoogleData(sourcesNow.google),
          parseGoogleData(db?.google_data)
        ) ?? null;
      let publicScrapeExisting =
        parsePublicScrapeData(sourcesNow.public_scrape) ||
        parsePublicScrapeData(db?.public_scrape_data);

      const patch: Record<string, unknown> = {};
      const name = db?.name || seed.name;
      const headquarters = db?.headquarters || seed.headquarters || '';
      const website = db?.website || seed.website || null;
      const fmcsaLegal = seed.fmcsaLegalName || name;

      // Class A: repair sources from existing column
      if (audit.class === 'A' && isUsableGoogleSnapshot(googleExisting)) {
        const nextSources: VerificationSources = {
          ...sourcesNow,
          google: googleExisting!,
          ...(publicScrapeExisting ? { public_scrape: publicScrapeExisting } : {}),
        };
        patch.verification_sources = nextSources;
        patch.google_data = googleExisting;
        console.log('  class A: repaired verification_sources from google_data');
      }

      // Google Places
      await sleep(delayMs);
      const businessCategory =
        group === 'auto'
          ? 'auto transport car shipping'
          : 'portable storage container moving';

      let googleIncoming: GooglePlacesData | null = null;
      if (isGooglePlacesConfigured() && (force || !isUsableGoogleSnapshot(googleExisting))) {
        googleIncoming = await fetchGooglePlacesData({
          legalName: fmcsaLegal,
          dbaName: name !== fmcsaLegal ? name : null,
          headquarters,
          phone: db?.phone || null,
          placeId: googleExisting?.place_id || null,
          businessCategory,
        });
        const googleMerged = mergeGoogleSnapshots(googleExisting, googleIncoming);
        if (isUsableGoogleSnapshot(googleIncoming)) {
          console.log(
            `  google: ok rating=${googleIncoming.rating} reviews=${googleIncoming.review_count} place=${googleIncoming.place_id}`
          );
          googleExisting = googleMerged;
          const nextSources: VerificationSources = {
            ...sourcesNow,
            google: googleMerged!,
            ...(publicScrapeExisting ? { public_scrape: publicScrapeExisting } : {}),
          };
          patch.verification_sources = nextSources;
          patch.google_data = googleMerged;
          if (googleMerged?.phone && !db?.phone) patch.phone = googleMerged.phone;
          if (googleMerged?.website_url && !db?.website) patch.website = googleMerged.website_url;
          if (
            googleMerged?.formatted_address &&
            !(db?.physical_address && db.physical_address.trim().length > 12)
          ) {
            patch.physical_address = googleMerged.formatted_address;
          }
          // NEVER overwrite industry editorial rating/volume
        } else {
          console.log(
            `  google: ${googleIncoming.status}${
              googleIncoming.error ? `: ${googleIncoming.error.slice(0, 80)}` : ''
            }`
          );
        }
      } else if (isUsableGoogleSnapshot(googleExisting)) {
        console.log(
          `  google: keep existing ${googleExisting!.rating}★ / ${googleExisting!.review_count}`
        );
      } else {
        console.log('  google: skipped (no API key)');
      }

      // BBB
      await sleep(Math.min(delayMs, 500));
      let scrape: PublicScrapeData | null = publicScrapeExisting;
      try {
        const parts = headquarters.split(',').map((s) => s.trim());
        const bbbHit = await fetchBbbPublicScrape({
          companyName: name,
          city: parts[0] || undefined,
          state:
            parts.length > 1
              ? parts[parts.length - 1]?.replace(/\d+/g, '').trim()
              : undefined,
          headquarters,
          usdotNumber: seed.usdotNumber?.replace(/\D/g, '') || undefined,
        });
        if (bbbHit.listed && bbbHit.meta.status === 'ok') {
          scrape = {
            bbb_rating: bbbHit.bbb_rating,
            bbb_review_count: bbbHit.bbb_review_count,
            bbb_accredited: bbbHit.bbb_accredited,
            bbb_details: bbbHit.bbb_details,
            bbb_accreditation_status: bbbHit.bbb_accreditation_status,
            bbb_file_opened: bbbHit.bbb_file_opened,
            bbb_accredited_since: bbbHit.bbb_accredited_since,
            bbb_profile_url: bbbHit.bbb_profile_url,
            bbb_recent_reviews: bbbHit.bbb_recent_reviews,
            trustpilot_rating: null,
            trustpilot_review_count: null,
            yelp_rating: null,
            yelp_review_count: null,
            last_scraped_at: new Date().toISOString(),
            sources: { bbb: bbbHit.meta },
          };
          console.log(
            `  bbb: ok grade=${scrape.bbb_rating ?? '—'} accredited=${scrape.bbb_accredited ?? '—'}`
          );
          const nextSources: VerificationSources = {
            ...((patch.verification_sources as VerificationSources | undefined) ?? sourcesNow),
            google: googleExisting ?? undefined,
            public_scrape: scrape,
          };
          patch.verification_sources = nextSources;
          patch.public_scrape_data = scrape;
          if (scrape.bbb_rating) patch.bbb_rating = scrape.bbb_rating;
          if (scrape.bbb_accredited != null) patch.bbb_accredited = scrape.bbb_accredited;
        } else {
          console.log(`  bbb: ${bbbHit.meta.status}`);
        }
      } catch (err) {
        console.log(`  bbb: error ${err instanceof Error ? err.message : String(err)}`);
      }

      if (Object.keys(patch).length) {
        patch.verification_last_synced_at = new Date().toISOString();
        patch.last_updated = new Date().toISOString().slice(0, 10);
        // Preserve industry editorial if DB columns empty but seed has them
        if (!(Number(db?.overall_rating) > 0) && seed.overallRating > 0) {
          patch.overall_rating = seed.overallRating;
        }
        if (!(Number(db?.review_count) > 0) && seed.reviewCount > 0) {
          patch.review_count = seed.reviewCount;
        }

        const { error: updateErr } = await admin
          .from('companies')
          .update(patch)
          .eq('slug', audit.slug);
        if (updateErr) {
          // Retry without optional columns that may be missing on this schema
          delete patch.google_data;
          delete patch.public_scrape_data;
          delete patch.physical_address;
          delete patch.verification_last_synced_at;
          const retry = await admin.from('companies').update(patch).eq('slug', audit.slug);
          if (retry.error) {
            // Last resort: verification_sources + ratings only
            const slim: Record<string, unknown> = {
              verification_sources: patch.verification_sources,
              last_updated: patch.last_updated,
            };
            if (patch.bbb_rating != null) slim.bbb_rating = patch.bbb_rating;
            if (patch.bbb_accredited != null) slim.bbb_accredited = patch.bbb_accredited;
            if (patch.phone) slim.phone = patch.phone;
            if (patch.website) slim.website = patch.website;
            const retry2 = await admin.from('companies').update(slim).eq('slug', audit.slug);
            if (retry2.error) throw new Error(`update failed: ${retry2.error.message}`);
          }
        }
        updated++;
        console.log(`  saved: ${Object.keys(patch).join(', ')}`);
      } else {
        console.log('  no patch');
      }

      const placesAfter = isUsableGoogleSnapshot(googleExisting)
        ? `${googleExisting!.rating}★ / ${googleExisting!.review_count ?? 0}`
        : googleIncoming
          ? `${googleIncoming.status}`
          : placesBefore;
      const bbbAfter = scrape?.bbb_rating || bbbBefore;

      report.push({
        slug: audit.slug,
        group,
        placesBefore,
        placesAfter,
        bbbBefore,
        bbbAfter,
        status: isUsableGoogleSnapshot(googleExisting) ? 'ok' : 'partial',
      });
    } catch (err) {
      errors++;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ERROR: ${msg}`);
      report.push({
        slug: audit.slug,
        group,
        placesBefore,
        placesAfter: placesBefore,
        bbbBefore,
        bbbAfter: bbbBefore,
        status: 'error',
        error: msg,
      });
    }
  }

  const reportPath = resolve(outDir, 'auto-transport-enrichment-report.json');
  writeFileSync(
    reportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        confirm: true,
        updated,
        errors,
        report,
      },
      null,
      2
    )
  );

  console.log('\n── Summary ──');
  console.log(`Updated: ${updated}`);
  console.log(`Errors: ${errors}`);
  console.log(`Report: ${reportPath}`);
  console.log('\n| slug | places before | places after | bbb before | bbb after | status |');
  console.log('| --- | --- | --- | --- | --- | --- |');
  for (const r of report) {
    console.log(
      `| ${r.slug} | ${r.placesBefore} | ${r.placesAfter} | ${r.bbbBefore} | ${r.bbbAfter} | ${r.status} |`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
