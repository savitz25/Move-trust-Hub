/**
 * Methodical full re-enrichment of ALL active companies.
 *
 * Sources (sequential, rate-limit safe):
 *  1. FMCSA / DOT (interstate with USDOT only) — never deletes companies
 *  2. Google Places
 *  3. BBB / public scrape
 *  4. Website scrape for contact (when phone/email still missing)
 *
 * Safety:
 *  - Never overwrite good contact/Google data with empty/failed results
 *  - Public name → DBA only when stored name is still the legal entity
 *  - Resumable via progress JSON file
 *  - Default batch size 5, sequential, delays between external calls
 *
 * Usage:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/reenrich-active-companies-full.ts --dry-run --batch=5
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/reenrich-active-companies-full.ts --batch=5
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/reenrich-active-companies-full.ts --batch=5 --reset-progress
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/reenrich-active-companies-full.ts --slug=dumbo-moving-storage
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/reenrich-active-companies-full.ts --all
 */
import { createClient } from '@supabase/supabase-js';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import {
  normalizeCompanyNameKey,
  resolvePublicCompanyNameFromSources,
} from '../lib/companies/public-display-name';
import { extractContactFromFmcsaRaw } from '../lib/fmcsa/company-from-row';
import { fetchFmcsaCarrierForCompany } from '../lib/fmcsa/refresh/fetch-company';
import { computeFmcsaDataHash } from '../lib/fmcsa/refresh/hash';
import {
  preferExistingContactField,
  resolveCompanyContact,
} from '../lib/suggestions/resolve-company-contact';
import {
  parseGoogleData,
  parsePublicScrapeData,
  parseVerificationSources,
  type VerificationSources,
} from '../lib/verification/backfill-helpers';
import {
  fetchGooglePlacesData,
  isUsableGoogleSnapshot,
  mergeGoogleSnapshots,
} from '../lib/verification/google-places';
import { fetchPublicScrapeData } from '../lib/verification/public-scrape';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

function argValue(name: string): string | undefined {
  const pref = `${name}=`;
  const hit = process.argv.find((a) => a.startsWith(pref));
  if (hit) return hit.slice(pref.length);
  const idx = process.argv.indexOf(name);
  if (idx >= 0 && process.argv[idx + 1] && !process.argv[idx + 1]!.startsWith('--')) {
    return process.argv[idx + 1];
  }
  return undefined;
}

const dryRun = process.argv.includes('--dry-run');
const resetProgress = process.argv.includes('--reset-progress');
const runAll = process.argv.includes('--all');
const force = process.argv.includes('--force');
const onlySlug = argValue('--slug');
const batch = Math.max(1, Number.parseInt(argValue('--batch') ?? '5', 10));
const delayMs = Math.max(200, Number.parseInt(argValue('--delay-ms') ?? '800', 10));
const callGapMs = Math.max(150, Number.parseInt(argValue('--call-gap-ms') ?? '500', 10));

const PROGRESS_DIR = resolve(process.cwd(), 'scripts/output');
const PROGRESS_FILE = resolve(PROGRESS_DIR, 'reenrich-active-progress.json');

type ProgressState = {
  startedAt: string;
  updatedAt: string;
  completedSlugs: string[];
  failed: Array<{ slug: string; error: string; at: string }>;
  totals: {
    processed: number;
    updated: number;
    skipped: number;
    failed: number;
    fmcsaOk: number;
    googleOk: number;
    bbbOk: number;
    contactImproved: number;
  };
};

type CompanyRow = {
  id: string;
  slug: string;
  name: string;
  headquarters: string | null;
  physical_address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  usdot_number: string | null;
  mc_number: string | null;
  fmcsa_legal_name: string | null;
  fmcsa_raw: unknown;
  fmcsa_last_checked: string | null;
  verification_sources: unknown;
  google_data?: unknown;
  public_scrape_data?: unknown;
  overall_rating: number | null;
  review_count: number | null;
  bbb_rating: string | null;
  bbb_accredited: boolean | null;
  service_scope: string | null;
  out_of_service: boolean | null;
};

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function loadProgress(): ProgressState {
  if (!resetProgress && existsSync(PROGRESS_FILE)) {
    try {
      return JSON.parse(readFileSync(PROGRESS_FILE, 'utf8')) as ProgressState;
    } catch {
      /* fresh */
    }
  }
  return {
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedSlugs: [],
    failed: [],
    totals: {
      processed: 0,
      updated: 0,
      skipped: 0,
      failed: 0,
      fmcsaOk: 0,
      googleOk: 0,
      bbbOk: 0,
      contactImproved: 0,
    },
  };
}

function saveProgress(p: ProgressState) {
  mkdirSync(PROGRESS_DIR, { recursive: true });
  p.updatedAt = new Date().toISOString();
  writeFileSync(PROGRESS_FILE, JSON.stringify(p, null, 2));
}

function progressLine(
  done: number,
  total: number,
  batchUpdated: number,
  batchFailed: number
) {
  return `Processed ${done}/${total} – batch: ${batchUpdated} updated, ${batchFailed} failed`;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const admin = createClient(url, key, { auth: { persistSession: false } });
  const progress = loadProgress();
  const doneSet = new Set(progress.completedSlugs);

  console.log('── Full active company re-enrichment ──');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Batch: ${batch} | Delay/company: ${delayMs}ms | Call gap: ${callGapMs}ms`);
  console.log(`Force Google/BBB: ${force} | Resume: ${!resetProgress && doneSet.size > 0}`);
  console.log(`Progress file: ${PROGRESS_FILE}`);
  console.log('');

  // Load active companies with progressive column fallback
  const selectAttempts = [
    'id, slug, name, headquarters, physical_address, phone, email, website, usdot_number, mc_number, fmcsa_legal_name, fmcsa_raw, fmcsa_last_checked, verification_sources, google_data, public_scrape_data, overall_rating, review_count, bbb_rating, bbb_accredited, service_scope, out_of_service',
    'id, slug, name, headquarters, physical_address, phone, website, usdot_number, mc_number, fmcsa_legal_name, fmcsa_raw, fmcsa_last_checked, verification_sources, overall_rating, review_count, bbb_rating, bbb_accredited, service_scope, out_of_service',
    'id, slug, name, headquarters, usdot_number, mc_number, fmcsa_legal_name, fmcsa_raw, fmcsa_last_checked, verification_sources, overall_rating, review_count, bbb_rating, bbb_accredited, out_of_service',
  ];

  async function loadAll(): Promise<CompanyRow[]> {
    for (const cols of selectAttempts) {
      const all: CompanyRow[] = [];
      if (onlySlug) {
        const { data, error } = await admin
          .from('companies')
          .select(cols)
          .eq('slug', onlySlug)
          .maybeSingle();
        if (error) {
          if (error.message?.includes('does not exist') || error.code === '42703') continue;
          throw error;
        }
        if (data) all.push(data as CompanyRow);
        return all;
      }
      let ok = true;
      for (let from = 0; ; from += 500) {
        const { data, error } = await admin
          .from('companies')
          .select(cols)
          .or('out_of_service.is.null,out_of_service.eq.false')
          .order('slug', { ascending: true })
          .range(from, from + 499);
        if (error) {
          if (error.message?.includes('does not exist') || error.code === '42703') {
            ok = false;
            break;
          }
          throw error;
        }
        if (!data?.length) break;
        all.push(...(data as CompanyRow[]));
        if (data.length < 500) break;
      }
      if (ok) return all;
    }
    throw new Error('Could not load companies with any column set');
  }

  const companies = await loadAll();
  const queue = companies.filter((c) => !doneSet.has(c.slug));
  const total = companies.length;
  const alreadyDone = companies.length - queue.length;

  console.log(`Active companies: ${total}`);
  console.log(`Already completed (resume): ${alreadyDone}`);
  console.log(`Remaining: ${queue.length}`);
  console.log('');

  if (!queue.length) {
    console.log('Nothing left to process. Use --reset-progress to start over.');
    return;
  }

  const slice = runAll || onlySlug ? queue : queue.slice(0, batch);
  let batchUpdated = 0;
  let batchFailed = 0;
  let batchSkipped = 0;

  for (let i = 0; i < slice.length; i++) {
    const row = slice[i]!;
    const globalDone = alreadyDone + i + 1;
    const label = `[${globalDone}/${total}] ${row.slug}`;
    console.log(`\n${label} (${row.name})`);
    progress.totals.processed++;

    const fieldsUpdated: string[] = [];
    const sources: string[] = [];

    try {
      const patch: Record<string, unknown> = {};
      const sourcesNow = parseVerificationSources(row.verification_sources);
      let googleExisting =
        mergeGoogleSnapshots(
          parseGoogleData(sourcesNow.google),
          parseGoogleData(row.google_data)
        ) ?? null;
      let publicScrapeExisting =
        parsePublicScrapeData(sourcesNow.public_scrape) ||
        parsePublicScrapeData(row.public_scrape_data);

      // ── 1. FMCSA (interstate with DOT only) ──
      const usdot = row.usdot_number?.replace(/\D/g, '') || '';
      const isInterstate =
        row.service_scope !== 'intrastate' && usdot.length >= 3;

      let fmcsaContact = extractContactFromFmcsaRaw(row.fmcsa_raw);
      let fmcsaRaw = row.fmcsa_raw;

      if (isInterstate && process.env.FMCSA_WEB_KEY?.trim()) {
        sources.push('fmcsa');
        await sleep(callGapMs);
        try {
          const fetchResult = await fetchFmcsaCarrierForCompany({
            usdot,
            mcNumber: row.mc_number,
            companyName: row.name,
            headquarters: row.headquarters,
            fmcsaLastChecked: force ? null : row.fmcsa_last_checked,
            fmcsaRaw: (row.fmcsa_raw as Record<string, unknown> | null) ?? null,
            batchMode: !force,
          });

          if (fetchResult.lookupMethod === 'skipped_existing') {
            console.log('  fmcsa: skipped (fresh)');
          } else if (fetchResult.snapshot) {
            const snap = fetchResult.snapshot;
            fmcsaRaw = snap.raw;
            fmcsaContact = extractContactFromFmcsaRaw(snap.raw);
            patch.fmcsa_raw = snap.raw;
            patch.fmcsa_last_checked = new Date().toISOString();
            patch.fmcsa_legal_name = snap.legalName ?? row.fmcsa_legal_name;
            patch.fmcsa_safety_rating = snap.safetyRating;
            patch.fmcsa_complaints = snap.complaintsLast12m;
            patch.fmcsa_shipments = snap.shipments;
            patch.complaints_last_12m = snap.complaintsLast12m;
            patch.authority_active = snap.authorityActive;
            patch.out_of_service = snap.outOfService;
            patch.revocation_date = snap.revocationDate;
            patch.data_hash = computeFmcsaDataHash(snap);
            if (snap.mcNumber) patch.mc_number = snap.mcNumber.replace(/\D/g, '');
            fieldsUpdated.push('fmcsa');
            progress.totals.fmcsaOk++;
            console.log(
              `  fmcsa: ok legal=${snap.legalName ?? '—'} dba=${snap.dbaName ?? '—'} safety=${snap.safetyRating}`
            );
          } else {
            console.log(
              `  fmcsa: ${fetchResult.error ?? 'no snapshot'} (kept existing; not removing company)`
            );
          }
        } catch (err) {
          console.log(
            `  fmcsa: error ${err instanceof Error ? err.message : String(err)}`
          );
        }
      } else if (!isInterstate) {
        console.log('  fmcsa: skip (local / no USDOT)');
      } else {
        console.log('  fmcsa: skip (FMCSA_WEB_KEY missing)');
      }

      // ── 2. Google Places ──
      sources.push('google');
      await sleep(callGapMs);
      const fmcsaLegal: string | null =
        typeof patch.fmcsa_legal_name === 'string'
          ? patch.fmcsa_legal_name
          : row.fmcsa_legal_name || null;
      let fmcsaDba: string | null = null;
      if (fmcsaRaw && typeof fmcsaRaw === 'object') {
        const rawDba = (fmcsaRaw as { dbaName?: unknown }).dbaName;
        if (typeof rawDba === 'string' && rawDba.trim()) fmcsaDba = rawDba.trim();
      }
      const googleLegal = fmcsaLegal || row.name;
      const googleDba: string | null =
        fmcsaDba ||
        (row.name && googleLegal && row.name !== googleLegal ? row.name : null);
      const googleIncoming = await fetchGooglePlacesData({
        legalName: googleLegal,
        dbaName: googleDba,
        headquarters: row.headquarters || fmcsaContact.physicalAddress,
      });
      const googleMerged = mergeGoogleSnapshots(googleExisting, googleIncoming);
      if (isUsableGoogleSnapshot(googleIncoming)) {
        progress.totals.googleOk++;
        console.log(
          `  google: ok rating=${googleIncoming.rating} reviews=${googleIncoming.review_count} snippets=${googleIncoming.review_snippets?.length ?? 0}`
        );
      } else {
        console.log(
          `  google: ${googleIncoming.status}${googleIncoming.error ? ` (${googleIncoming.error.slice(0, 80)})` : ''}${
            isUsableGoogleSnapshot(googleExisting) ? ' — kept existing' : ''
          }`
        );
      }
      if (
        googleMerged &&
        (force ||
          !isUsableGoogleSnapshot(googleExisting) ||
          isUsableGoogleSnapshot(googleIncoming))
      ) {
        if (isUsableGoogleSnapshot(googleMerged)) {
          const nextSources: VerificationSources = {
            ...sourcesNow,
            google: googleMerged,
            ...(publicScrapeExisting ? { public_scrape: publicScrapeExisting } : {}),
          };
          patch.verification_sources = nextSources;
          patch.google_data = googleMerged;
          if (googleMerged.rating != null && googleMerged.rating > 0) {
            patch.overall_rating = googleMerged.rating;
            if (googleMerged.review_count != null) {
              patch.review_count = googleMerged.review_count;
            }
          }
          fieldsUpdated.push('google');
          googleExisting = googleMerged;
        }
      }

      // ── 3. BBB / public scrape ──
      sources.push('bbb');
      await sleep(callGapMs);
      try {
        const scrape = await fetchPublicScrapeData({
          legalName: row.name,
          headquarters: row.headquarters || fmcsaContact.physicalAddress,
          phone: row.phone || fmcsaContact.phone || googleExisting?.phone,
        });
        const bbbOk =
          scrape.sources.bbb?.status === 'ok' && Boolean(scrape.bbb_rating || scrape.bbb_profile_url);
        if (bbbOk) {
          progress.totals.bbbOk++;
          console.log(
            `  bbb: ok grade=${scrape.bbb_rating ?? '—'} accredited=${scrape.bbb_accredited ?? '—'} reviews=${scrape.bbb_review_count ?? '—'}`
          );
        } else {
          console.log(
            `  bbb: ${scrape.sources.bbb?.status ?? 'empty'}${
              scrape.sources.bbb?.error ? ` (${scrape.sources.bbb.error.slice(0, 60)})` : ''
            }`
          );
        }

        // Only apply if we got real BBB data or no existing scrape
        const shouldApplyScrape =
          bbbOk ||
          (!publicScrapeExisting?.bbb_rating && scrape.sources.bbb?.status === 'not_found');

        if (shouldApplyScrape && (bbbOk || !publicScrapeExisting)) {
          const nextSources: VerificationSources = {
            ...(patch.verification_sources as VerificationSources | undefined) ??
              sourcesNow,
            google: googleExisting ?? undefined,
            public_scrape: bbbOk ? scrape : publicScrapeExisting ?? scrape,
          };
          if (bbbOk) {
            nextSources.public_scrape = scrape;
            patch.public_scrape_data = scrape;
            // Soft BBB columns when better grade present
            if (scrape.bbb_rating) patch.bbb_rating = scrape.bbb_rating;
            if (scrape.bbb_accredited != null) patch.bbb_accredited = scrape.bbb_accredited;
            fieldsUpdated.push('bbb');
          }
          patch.verification_sources = nextSources;
          publicScrapeExisting = nextSources.public_scrape as typeof publicScrapeExisting;
        }
      } catch (err) {
        console.log(`  bbb: error ${err instanceof Error ? err.message : String(err)}`);
      }

      // ── 4. Contact cascade + website scrape ──
      sources.push('contact');
      const needContactScrape =
        !row.phone?.trim() ||
        !row.email?.trim() ||
        !preferExistingContactField(row.phone, fmcsaContact.phone || googleExisting?.phone);

      await sleep(callGapMs);
      const contact = await resolveCompanyContact({
        fmcsaPhone: fmcsaContact.phone || row.phone,
        fmcsaAddress: fmcsaContact.physicalAddress || row.physical_address,
        googlePhone: googleExisting?.phone,
        googleWebsite: googleExisting?.website_url,
        googleAddress: googleExisting?.formatted_address,
        userPhone: row.phone,
        userEmail: row.email,
        userWebsite: row.website || googleExisting?.website_url,
        headquarters: row.headquarters,
        scrapeWebsite: needContactScrape,
        context: `full_reenrich:${row.slug}`,
      });

      const nextPhone = preferExistingContactField(row.phone, contact.phone);
      const nextEmail = preferExistingContactField(row.email, contact.email);
      const nextWebsite = preferExistingContactField(row.website, contact.website);
      const nextAddress = preferExistingContactField(
        row.physical_address,
        contact.address
      );

      let contactImproved = false;
      if (nextPhone && nextPhone !== (row.phone || '').trim()) {
        patch.phone = nextPhone;
        contactImproved = true;
      }
      if (nextEmail && nextEmail !== (row.email || '').trim()) {
        patch.email = nextEmail;
        contactImproved = true;
      }
      if (nextWebsite && nextWebsite !== (row.website || '').trim()) {
        patch.website = nextWebsite;
        contactImproved = true;
      }
      if (nextAddress && nextAddress !== (row.physical_address || '').trim()) {
        patch.physical_address = nextAddress;
        if (!row.headquarters?.trim()) patch.headquarters = nextAddress;
        contactImproved = true;
      }
      if (contactImproved) {
        fieldsUpdated.push('contact');
        progress.totals.contactImproved++;
      }
      console.log(
        `  contact: phone=${nextPhone ?? '—'} email=${nextEmail ?? '—'} website=${nextWebsite ? 'yes' : '—'} address=${nextAddress ? 'yes' : '—'} sources=${JSON.stringify(contact.sources)}`
      );

      // ── 5. Public name (DBA only when still legal-titled) ──
      const names = resolvePublicCompanyNameFromSources({
        storedName: row.name,
        fmcsaLegalName:
          (patch.fmcsa_legal_name as string) || row.fmcsa_legal_name,
        fmcsaRaw: fmcsaRaw,
      });
      const storedIsLegal =
        Boolean(names.legalName) &&
        normalizeCompanyNameKey(row.name) ===
          normalizeCompanyNameKey(names.legalName || '');
      if (storedIsLegal && names.prefersDba && names.publicName) {
        if (
          normalizeCompanyNameKey(names.publicName) !==
          normalizeCompanyNameKey(row.name)
        ) {
          patch.name = names.publicName;
          fieldsUpdated.push('name');
          console.log(`  name: "${row.name}" → "${names.publicName}" (DBA)`);
        }
      }
      if (names.legalName && !row.fmcsa_legal_name && !patch.fmcsa_legal_name) {
        patch.fmcsa_legal_name = names.legalName;
      }

      // Drop empty patch noise
      const meaningful = Object.keys(patch).filter(
        (k) => patch[k] !== undefined && patch[k] !== null
      );
      if (!meaningful.length) {
        console.log('  → SKIP (no field changes)');
        batchSkipped++;
        progress.totals.skipped++;
        progress.completedSlugs.push(row.slug);
        saveProgress(progress);
        console.log(progressLine(globalDone, total, batchUpdated, batchFailed));
        await sleep(delayMs);
        continue;
      }

      patch.last_updated = new Date().toISOString().slice(0, 10);
      patch.updated_at = new Date().toISOString();

      console.log(`  → update fields: ${fieldsUpdated.join(', ') || meaningful.join(', ')}`);

      if (!dryRun) {
        // Progressive write (email/google_data may be missing)
        let { error } = await admin.from('companies').update(patch).eq('id', row.id);
        if (error && (error.code === 'PGRST204' || error.message?.includes('does not exist'))) {
          const drop = ['email', 'google_data', 'public_scrape_data', 'physical_address'];
          const slim = { ...patch };
          for (const k of drop) delete slim[k];
          const retry = await admin.from('companies').update(slim).eq('id', row.id);
          error = retry.error;
        }
        if (error) {
          throw new Error(error.message);
        }
      }

      batchUpdated++;
      progress.totals.updated++;
      progress.completedSlugs.push(row.slug);
      saveProgress(progress);
      console.log(
        `  → ${dryRun ? 'WOULD UPDATE' : 'UPDATED'} | ${progressLine(globalDone, total, batchUpdated, batchFailed)}`
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(`  → ERROR: ${message}`);
      batchFailed++;
      progress.totals.failed++;
      progress.failed.push({
        slug: row.slug,
        error: message,
        at: new Date().toISOString(),
      });
      // Still mark completed so resume doesn't infinite-loop on poison pills
      // unless --force-retry-failed is desired — keep retryable by NOT adding to completed
      saveProgress(progress);
      console.log(progressLine(globalDone, total, batchUpdated, batchFailed));
    }

    await sleep(delayMs);
  }

  console.log('\n══════════════════════════════════════');
  console.log('BATCH SUMMARY');
  console.log('══════════════════════════════════════');
  console.log(`  This batch size:  ${slice.length}`);
  console.log(`  Updated:          ${batchUpdated}`);
  console.log(`  Skipped:          ${batchSkipped}`);
  console.log(`  Failed:           ${batchFailed}`);
  console.log(`  Progress done:    ${progress.completedSlugs.length}/${total}`);
  console.log(`  Lifetime totals:  ${JSON.stringify(progress.totals)}`);
  console.log('══════════════════════════════════════');

  if (!onlySlug && !runAll && queue.length > batch) {
    console.log('\nNext batch (resume automatically):');
    console.log(
      `  npx tsx --require ./scripts/stub-server-only.cjs scripts/reenrich-active-companies-full.ts --batch=${batch}`
    );
  }
  if (runAll) {
    console.log('\n--all mode finished remaining queue in one run.');
  }
  console.log(`\nProgress saved to ${PROGRESS_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
