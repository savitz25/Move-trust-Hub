/**
 * Upsert + enrich portable-container and auto-transport brands.
 *
 * Pipeline per company:
 *  1. Ensure row exists in public.companies (upsert by slug)
 *  2. FMCSA DOT refresh (when USDOT present + FMCSA_WEB_KEY)
 *  3. Google Places
 *  4. BBB / public scrape
 *
 * Usage:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-container-and-auto-transport.ts --dry-run
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-container-and-auto-transport.ts --confirm
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-container-and-auto-transport.ts --confirm --slug=pods
 */
import { createClient } from '@supabase/supabase-js';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { portableContainerCompanies } from '../data/portable-container-companies';
import { seedAutoTransportCompanies } from '../data/seed-auto-transport';
import type { Company } from '../types';
import { extractContactFromFmcsaRaw } from '../lib/fmcsa/company-from-row';
import { fetchFmcsaCarrierForCompany } from '../lib/fmcsa/refresh/fetch-company';
import { computeFmcsaDataHash } from '../lib/fmcsa/refresh/hash';
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
import type { PublicScrapeData } from '../lib/verification/types';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

const dryRun = process.argv.includes('--dry-run') || !process.argv.includes('--confirm');
const onlySlug = (() => {
  const hit = process.argv.find((a) => a.startsWith('--slug='));
  if (hit) return hit.slice('--slug='.length).trim().toLowerCase();
  const idx = process.argv.indexOf('--slug');
  if (idx >= 0 && process.argv[idx + 1] && !process.argv[idx + 1]!.startsWith('--')) {
    return process.argv[idx + 1]!.trim().toLowerCase();
  }
  return null;
})();
const delayMs = Math.max(300, Number.parseInt(
  process.argv.find((a) => a.startsWith('--delay-ms='))?.split('=')[1] ?? '700',
  10
));
const force = process.argv.includes('--force');

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

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
    service_scope: c.serviceScope || 'interstate',
    entity_type: c.entityType || null,
    authority_active: c.authorityActive ?? (usdot ? true : null),
    out_of_service: false,
    usdot_status: c.usdotStatus || (usdot ? 'ACTIVE' : null),
  };
}

type ReportRow = {
  slug: string;
  name: string;
  group: 'container' | 'auto';
  upsert: 'inserted' | 'existing' | 'dry-run' | 'error';
  fmcsa: string;
  google: string;
  bbb: string;
  error?: string;
};

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  const targets: Array<{ company: Company; group: 'container' | 'auto' }> = [
    ...portableContainerCompanies.map((c) => ({ company: c, group: 'container' as const })),
    ...seedAutoTransportCompanies.map((c) => ({ company: c, group: 'auto' as const })),
  ].filter((t) => !onlySlug || t.company.slug === onlySlug);

  console.log('── Enrich container + auto transport brands ──');
  console.log(`Mode: ${dryRun ? 'DRY RUN (pass --confirm to write)' : 'LIVE'}`);
  console.log(`Targets: ${targets.length}`);
  console.log(`Google Places: ${isGooglePlacesConfigured() ? 'configured' : 'MISSING KEY'}`);
  console.log(`FMCSA: ${process.env.FMCSA_WEB_KEY?.trim() ? 'configured' : 'MISSING KEY'}`);
  console.log(`BBB API: ${process.env.BBB_API_KEY?.trim() ? 'configured' : 'scrape fallback only'}`);
  console.log('');

  if (!targets.length) {
    console.log('No targets matched.');
    return;
  }

  const supabaseUrlOk =
    Boolean(url) &&
    !url.includes('placeholder') &&
    !key.startsWith('<') &&
    key.length > 40;
  const admin = supabaseUrlOk
    ? createClient(url, key, { auth: { persistSession: false } })
    : null;
  if (!admin) {
    console.warn(
      '⚠ Supabase credentials look like placeholders — running scrape-only mode (no DB write).\n' +
        '  Fill NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY for full upsert/enrich.\n'
    );
  }
  const report: ReportRow[] = [];
  const seedEnrichment: Record<
    string,
    {
      bbb_rating?: string;
      bbb_accredited?: boolean;
      bbb_profile_url?: string | null;
      overall_rating?: number;
      review_count?: number;
      google_status?: string;
      fmcsa?: string;
    }
  > = {};

  for (let i = 0; i < targets.length; i++) {
    const { company, group } = targets[i]!;
    const label = `[${i + 1}/${targets.length}] ${company.slug}`;
    console.log(`\n${label} — ${company.name} (${group})`);

    const row: ReportRow = {
      slug: company.slug,
      name: company.name,
      group,
      upsert: admin ? 'dry-run' : 'dry-run',
      fmcsa: '—',
      google: '—',
      bbb: '—',
    };

    try {
      // ── Upsert ──
      let dbId = company.slug;
      let existing: Record<string, unknown> | null = null;
      if (admin) {
        const res = await admin
          .from('companies')
          .select(
            'id, slug, name, headquarters, usdot_number, mc_number, fmcsa_legal_name, fmcsa_raw, fmcsa_last_checked, verification_sources, google_data, public_scrape_data, overall_rating, review_count, bbb_rating, bbb_accredited, phone, website, physical_address'
          )
          .eq('slug', company.slug)
          .maybeSingle();
        existing = (res.data as Record<string, unknown> | null) ?? null;
      }

      if (!admin) {
        row.upsert = 'dry-run';
        console.log('  db: skip (no valid Supabase credentials)');
      } else if (existing?.id) {
        dbId = String(existing.id);
        row.upsert = 'existing';
        console.log(`  db: existing id=${dbId}`);
      } else if (dryRun) {
        row.upsert = 'dry-run';
        console.log('  db: would insert (dry-run)');
      } else {
        const insertRow = companyToInsertRow(company);
        const { data: inserted, error: insertErr } = await admin
          .from('companies')
          .insert(insertRow)
          .select('id, slug')
          .maybeSingle();
        if (insertErr) {
          // try upsert on conflict slug
          const { data: upserted, error: upsertErr } = await admin
            .from('companies')
            .upsert(insertRow, { onConflict: 'slug' })
            .select('id, slug')
            .maybeSingle();
          if (upsertErr) {
            throw new Error(`insert/upsert failed: ${upsertErr.message}`);
          }
          dbId = String(upserted?.id ?? company.slug);
          row.upsert = 'inserted';
          console.log(`  db: upserted id=${dbId}`);
        } else {
          dbId = String(inserted?.id ?? company.slug);
          row.upsert = 'inserted';
          console.log(`  db: inserted id=${dbId}`);
        }
      }

      // Reload after insert
      let live: Record<string, unknown> | null = null;
      if (admin) {
        const res = await admin
          .from('companies')
          .select(
            'id, slug, name, headquarters, usdot_number, mc_number, fmcsa_legal_name, fmcsa_raw, fmcsa_last_checked, verification_sources, google_data, public_scrape_data, overall_rating, review_count, bbb_rating, bbb_accredited, phone, website, physical_address'
          )
          .eq('slug', company.slug)
          .maybeSingle();
        live = (res.data as Record<string, unknown> | null) ?? null;
      }

      const current = live ?? existing;
      if (!current && dryRun) {
        // Use seed for enrichment preview only
        console.log('  enrich: preview from seed (no DB row in dry-run)');
      }

      const patch: Record<string, unknown> = {};
      const sourcesNow = parseVerificationSources(current?.verification_sources);
      let googleExisting =
        mergeGoogleSnapshots(
          parseGoogleData(sourcesNow.google),
          parseGoogleData(current?.google_data)
        ) ?? null;
      let publicScrapeExisting =
        parsePublicScrapeData(sourcesNow.public_scrape) ||
        parsePublicScrapeData(current?.public_scrape_data);

      const usdotRaw =
        (current?.usdot_number as string | null) ||
        company.usdotNumber ||
        '';
      const usdot = isMarketplaceDot(usdotRaw) ? '' : usdotRaw.replace(/\D/g, '');
      const name = String(current?.name ?? company.name);
      const headquarters = String(
        current?.headquarters ?? company.headquarters ?? ''
      );

      // ── FMCSA ──
      await sleep(delayMs);
      if (usdot.length >= 5 && process.env.FMCSA_WEB_KEY?.trim()) {
        try {
          const fetchResult = await fetchFmcsaCarrierForCompany({
            usdot,
            mcNumber: (current?.mc_number as string | null) || company.mcNumber,
            companyName: name,
            headquarters,
            fmcsaLastChecked: force ? null : (current?.fmcsa_last_checked as string | null),
            fmcsaRaw:
              (current?.fmcsa_raw as Record<string, unknown> | null) ?? null,
            batchMode: !force,
          });
          if (fetchResult.lookupMethod === 'skipped_existing') {
            row.fmcsa = 'skipped_fresh';
            console.log('  fmcsa: skipped (fresh)');
          } else if (fetchResult.snapshot) {
            const snap = fetchResult.snapshot;
            patch.fmcsa_raw = snap.raw;
            patch.fmcsa_last_checked = new Date().toISOString();
            patch.fmcsa_legal_name = snap.legalName ?? company.fmcsaLegalName;
            patch.fmcsa_safety_rating = snap.safetyRating;
            patch.fmcsa_complaints = snap.complaintsLast12m;
            patch.fmcsa_shipments = snap.shipments;
            patch.complaints_last_12m = snap.complaintsLast12m;
            patch.authority_active = snap.authorityActive;
            patch.out_of_service = snap.outOfService;
            patch.revocation_date = snap.revocationDate;
            patch.data_hash = computeFmcsaDataHash(snap);
            if (snap.mcNumber) patch.mc_number = snap.mcNumber.replace(/\D/g, '');
            if (snap.dotNumber) patch.usdot_number = snap.dotNumber.replace(/\D/g, '');
            // Derive entity type from authority statuses when present
            const broker = String(snap.brokerAuthorityStatus ?? '').toUpperCase();
            const common = String(snap.commonAuthorityStatus ?? '').toUpperCase();
            if (/A|ACTIVE|AUTHORIZED/.test(broker) && !/A|ACTIVE|AUTHORIZED/.test(common)) {
              patch.entity_type = 'BROKER';
            } else if (/A|ACTIVE|AUTHORIZED/.test(common) && /A|ACTIVE|AUTHORIZED/.test(broker)) {
              patch.entity_type = 'CARRIER/BROKER';
            } else if (/A|ACTIVE|AUTHORIZED/.test(common)) {
              patch.entity_type = 'CARRIER';
            }
            row.fmcsa = `ok ${snap.legalName ?? ''} auth=${snap.authorityActive}`;
            console.log(
              `  fmcsa: ok legal=${snap.legalName ?? '—'} dba=${snap.dbaName ?? '—'} safety=${snap.safetyRating}`
            );
          } else {
            row.fmcsa = fetchResult.error ?? 'no_snapshot';
            console.log(`  fmcsa: ${row.fmcsa}`);
          }
        } catch (err) {
          row.fmcsa = `error: ${err instanceof Error ? err.message : String(err)}`;
          console.log(`  fmcsa: ${row.fmcsa}`);
        }
      } else if (!usdot) {
        row.fmcsa = 'skip_no_usdot';
        console.log('  fmcsa: skip (no USDOT / marketplace)');
      } else {
        row.fmcsa = 'skip_no_key';
        console.log('  fmcsa: skip (FMCSA_WEB_KEY missing)');
      }

      const fmcsaContact = extractContactFromFmcsaRaw(patch.fmcsa_raw ?? current?.fmcsa_raw);

      // ── Google ──
      await sleep(delayMs);
      const fmcsaLegal =
        (typeof patch.fmcsa_legal_name === 'string' && patch.fmcsa_legal_name) ||
        (current?.fmcsa_legal_name as string | null) ||
        company.fmcsaLegalName ||
        name;
      const websiteForMatch =
        (typeof current?.website === 'string' && current.website) ||
        company.website ||
        null;
      const businessCategory =
        group === 'auto'
          ? 'auto transport car shipping'
          : 'portable storage container moving';
      const googleIncoming = await fetchGooglePlacesData({
        legalName: fmcsaLegal,
        dbaName: name !== fmcsaLegal ? name : null,
        headquarters: headquarters || fmcsaContact.physicalAddress,
        website: websiteForMatch,
        phone: (typeof current?.phone === 'string' ? current.phone : null) || null,
        placeId:
          (googleExisting?.place_id as string | null | undefined) || null,
        businessCategory,
      });
      const googleMerged = mergeGoogleSnapshots(googleExisting, googleIncoming);
      if (isUsableGoogleSnapshot(googleIncoming)) {
        row.google = `ok ${googleIncoming.rating}★ / ${googleIncoming.review_count} reviews`;
        console.log(
          `  google: ok rating=${googleIncoming.rating} reviews=${googleIncoming.review_count}`
        );
        if (googleMerged) {
          const nextSources: VerificationSources = {
            ...sourcesNow,
            google: googleMerged,
            ...(publicScrapeExisting ? { public_scrape: publicScrapeExisting } : {}),
          };
          patch.verification_sources = nextSources;
          patch.google_data = googleMerged;
          // Do NOT overwrite industry-reported editorial rating/volume with Places.
          // overall_rating / review_count stay seed/editorial; Places lives in google_data.
          const existingEditorialRating =
            Number(current?.overall_rating) || company.overallRating || 0;
          const existingEditorialCount =
            Number(current?.review_count) || company.reviewCount || 0;
          if (existingEditorialRating <= 0 && googleMerged.rating != null && googleMerged.rating > 0) {
            // Only fill empty rating columns (local-style rows without industry volume).
            patch.overall_rating = googleMerged.rating;
          }
          if (
            existingEditorialCount <= 0 &&
            googleMerged.review_count != null &&
            googleMerged.review_count > 0
          ) {
            patch.review_count = googleMerged.review_count;
          }
          if (googleMerged.website_url && !current?.website) {
            patch.website = googleMerged.website_url;
          }
          if (googleMerged.phone && !current?.phone) {
            patch.phone = googleMerged.phone;
          }
          if (
            googleMerged.formatted_address &&
            !(typeof current?.physical_address === 'string' && current.physical_address.trim())
          ) {
            patch.physical_address = googleMerged.formatted_address;
          }
          googleExisting = googleMerged;
        }
      } else {
        row.google = `${googleIncoming.status}${googleIncoming.error ? `: ${googleIncoming.error.slice(0, 60)}` : ''}`;
        console.log(`  google: ${row.google}`);
      }

      // ── BBB public scrape (API optional; do not fail hard if BBB API key missing) ──
      await sleep(delayMs);
      try {
        const geoParts = headquarters.split(',').map((s) => s.trim());
        const city = geoParts[0] || undefined;
        const state =
          geoParts.length > 1
            ? geoParts[geoParts.length - 1]?.replace(/\d+/g, '').trim()
            : undefined;
        const bbbHit = await fetchBbbPublicScrape({
          companyName: name,
          city,
          state,
          headquarters,
          usdotNumber: usdot || undefined,
        });
        const scrape: PublicScrapeData | null =
          bbbHit.listed && bbbHit.meta.status === 'ok'
            ? {
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
              }
            : null;
        const bbbOk = Boolean(
          scrape && (scrape.bbb_rating || scrape.bbb_profile_url)
        );
        if (bbbOk && scrape) {
          row.bbb = `ok grade=${scrape.bbb_rating ?? '—'} accredited=${scrape.bbb_accredited ?? '—'}`;
          console.log(`  bbb: ${row.bbb}`);
          const nextSources: VerificationSources = {
            ...((patch.verification_sources as VerificationSources | undefined) ??
              sourcesNow),
            google: googleExisting ?? undefined,
            public_scrape: scrape,
          };
          patch.verification_sources = nextSources;
          patch.public_scrape_data = scrape;
          if (scrape.bbb_rating) patch.bbb_rating = scrape.bbb_rating;
          if (scrape.bbb_accredited != null) patch.bbb_accredited = scrape.bbb_accredited;
        } else {
          row.bbb = `${bbbHit.meta.status}${
            bbbHit.meta.error ? `: ${String(bbbHit.meta.error).slice(0, 50)}` : ''
          }`;
          console.log(`  bbb: ${row.bbb}`);
        }
      } catch (err) {
        row.bbb = `error: ${err instanceof Error ? err.message : String(err)}`;
        console.log(`  bbb: ${row.bbb}`);
      }

      // Track seed-side enrichment snapshot (always)
      seedEnrichment[company.slug] = {
        bbb_rating:
          typeof patch.bbb_rating === 'string'
            ? patch.bbb_rating
            : company.bbbRating !== 'NR'
              ? company.bbbRating
              : undefined,
        bbb_accredited:
          typeof patch.bbb_accredited === 'boolean'
            ? patch.bbb_accredited
            : company.bbbAccredited,
        bbb_profile_url:
          (patch.public_scrape_data as PublicScrapeData | undefined)?.bbb_profile_url ??
          null,
        overall_rating:
          typeof patch.overall_rating === 'number'
            ? patch.overall_rating
            : company.overallRating,
        review_count:
          typeof patch.review_count === 'number'
            ? patch.review_count
            : company.reviewCount,
        google_status: row.google,
        fmcsa: row.fmcsa,
      };

      // ── Persist ──
      if (!dryRun && admin && Object.keys(patch).length) {
        patch.verification_last_synced_at = new Date().toISOString();
        patch.last_updated = new Date().toISOString().slice(0, 10);
        const { error: updateErr } = await admin
          .from('companies')
          .update(patch)
          .eq('slug', company.slug);
        if (updateErr) {
          throw new Error(`update failed: ${updateErr.message}`);
        }
        console.log(`  saved: ${Object.keys(patch).join(', ')}`);
      } else if (dryRun || !admin) {
        console.log(
          `  ${dryRun ? 'dry-run' : 'no-db'} patch keys: ${Object.keys(patch).join(', ') || '(none)'}`
        );
      }
    } catch (err) {
      row.error = err instanceof Error ? err.message : String(err);
      row.upsert = 'error';
      console.error(`  ERROR: ${row.error}`);
    }

    report.push(row);
  }

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, 'enrich-container-auto-report.json');
  const seedPath = resolve(outDir, 'enrich-container-auto-seed-overlay.json');
  writeFileSync(
    outPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        dryRun,
        supabaseWrite: Boolean(admin) && !dryRun,
        report,
        summary: {
          total: report.length,
          fmcsaOk: report.filter((r) => r.fmcsa.startsWith('ok')).length,
          googleOk: report.filter((r) => r.google.startsWith('ok')).length,
          bbbOk: report.filter((r) => r.bbb.startsWith('ok')).length,
          errors: report.filter((r) => r.error).length,
        },
      },
      null,
      2
    )
  );
  writeFileSync(seedPath, JSON.stringify(seedEnrichment, null, 2));

  console.log('\n── Summary ──');
  console.log(`Total: ${report.length}`);
  console.log(`FMCSA ok: ${report.filter((r) => r.fmcsa.startsWith('ok')).length}`);
  console.log(`Google ok: ${report.filter((r) => r.google.startsWith('ok')).length}`);
  console.log(`BBB ok: ${report.filter((r) => r.bbb.startsWith('ok')).length}`);
  console.log(`Errors: ${report.filter((r) => r.error).length}`);
  console.log(`Report: ${outPath}`);
  console.log(`Seed overlay: ${seedPath}`);
  if (dryRun || !admin) {
    console.log(
      '\nTo write to Supabase: set real SUPABASE_SERVICE_ROLE_KEY + URL, then re-run with --confirm.'
    );
    console.log(
      'To enable Google Places: set GOOGLE_PLACES_API_KEY. For FMCSA API: set FMCSA_WEB_KEY.'
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
