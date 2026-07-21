/**
 * Backfill core contact fields on active companies:
 * public name (DBA prefer), physical_address, phone, email, website.
 *
 * Cascade uses stored FMCSA raw + verification_sources.google + optional website scrape
 * when phone or email is still missing. Never overwrites good values with empty results.
 *
 * Usage:
 *   npx tsx scripts/backfill-company-contact-core.ts --dry-run
 *   npx tsx scripts/backfill-company-contact-core.ts --limit=40
 *   npx tsx scripts/backfill-company-contact-core.ts --scrape --limit=20
 *   npx tsx scripts/backfill-company-contact-core.ts --slug=dumbo-moving-storage
 */
import { createClient } from '@supabase/supabase-js';
import {
  resolvePublicCompanyNameFromSources,
  normalizeCompanyNameKey,
} from '../lib/companies/public-display-name';
import { extractContactFromFmcsaRaw } from '../lib/fmcsa/company-from-row';
import {
  preferExistingContactField,
  resolveCompanyContact,
} from '../lib/suggestions/resolve-company-contact';
import { preferGoodContactField } from '../lib/suggestions/onboarding-guards';
import {
  parseGoogleData,
  parseVerificationSources,
} from '../lib/verification/backfill-helpers';

function loadEnv() {
  try {
    const fs = require('fs') as typeof import('fs');
    const path = require('path') as typeof import('path');
    for (const file of ['.env.local', '.env.production.local', '.env']) {
      const p = path.join(process.cwd(), file);
      if (!fs.existsSync(p)) continue;
      for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
        if (!line || line.startsWith('#') || !line.includes('=')) continue;
        const i = line.indexOf('=');
        const k = line.slice(0, i).trim();
        let v = line.slice(i + 1).trim();
        if (
          (v.startsWith('"') && v.endsWith('"')) ||
          (v.startsWith("'") && v.endsWith("'"))
        ) {
          v = v.slice(1, -1);
        }
        if (!process.env[k]) process.env[k] = v;
      }
    }
  } catch {
    /* ignore */
  }
}
loadEnv();

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
const scrape = process.argv.includes('--scrape');
const limit = Math.max(1, Number.parseInt(argValue('--limit') ?? '80', 10));
const onlySlug = argValue('--slug');
const delayMs = Math.max(0, Number.parseInt(argValue('--delay-ms') ?? '300', 10));

type Row = {
  id: string;
  slug: string;
  name: string;
  headquarters: string | null;
  physical_address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  fmcsa_legal_name: string | null;
  fmcsa_raw: unknown;
  verification_sources: unknown;
  google_data: unknown;
  out_of_service: boolean | null;
};

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const admin = createClient(url, key, { auth: { persistSession: false } });

  const SELECTS = [
    'id, slug, name, headquarters, physical_address, phone, email, website, fmcsa_legal_name, fmcsa_raw, verification_sources, google_data, out_of_service',
    'id, slug, name, headquarters, physical_address, phone, email, website, fmcsa_legal_name, fmcsa_raw, verification_sources, out_of_service',
    'id, slug, name, headquarters, physical_address, phone, website, fmcsa_legal_name, fmcsa_raw, verification_sources, out_of_service',
    'id, slug, name, headquarters, phone, website, fmcsa_legal_name, fmcsa_raw, verification_sources, out_of_service',
  ];

  async function fetchPage(from: number, to: number, slug?: string) {
    let lastError: { message?: string } | null = null;
    for (const cols of SELECTS) {
      let q = admin.from('companies').select(cols);
      if (slug) q = q.eq('slug', slug).maybeSingle();
      else {
        q = q
          .or('out_of_service.is.null,out_of_service.eq.false')
          .range(from, to);
      }
      const { data, error } = await q;
      if (!error) return { data, error: null };
      lastError = error;
      if (
        !error.message?.includes('does not exist') &&
        error.code !== '42703' &&
        error.code !== 'PGRST204'
      ) {
        return { data: null, error };
      }
    }
    return { data: null, error: lastError };
  }

  const rows: Row[] = [];
  if (onlySlug) {
    const { data, error } = await fetchPage(0, 0, onlySlug);
    if (error) throw error;
    if (data && !Array.isArray(data)) rows.push(data as Row);
  } else {
    for (let from = 0; ; from += 500) {
      const { data, error } = await fetchPage(from, from + 499);
      if (error) throw error;
      const batch = (data as Row[] | null) ?? [];
      if (!batch.length) break;
      rows.push(...batch);
      if (batch.length < 500) break;
    }
  }

  console.log(
    JSON.stringify(
      {
        dryRun,
        scrape,
        activeCompanies: rows.length,
        willProcess: Math.min(limit, rows.length),
      },
      null,
      2
    )
  );

  let updated = 0;
  let nameUpdates = 0;
  let contactUpdates = 0;
  let errors = 0;
  const changes: Array<Record<string, unknown>> = [];

  for (const row of rows.slice(0, limit)) {
    process.stdout.write(`→ ${row.slug} … `);
    try {
      const google =
        parseGoogleData(row.google_data) ||
        parseGoogleData(parseVerificationSources(row.verification_sources).google);
      const fmcsaContact = extractContactFromFmcsaRaw(row.fmcsa_raw);

      const names = resolvePublicCompanyNameFromSources({
        storedName: row.name,
        fmcsaLegalName: row.fmcsa_legal_name,
        fmcsaRaw: row.fmcsa_raw,
      });

      const resolved = await resolveCompanyContact({
        fmcsaPhone: fmcsaContact.phone || row.phone,
        fmcsaAddress: fmcsaContact.physicalAddress || row.physical_address,
        googlePhone: google?.phone,
        googleWebsite: google?.website_url,
        googleAddress: google?.formatted_address,
        userPhone: row.phone,
        userEmail: row.email,
        userWebsite: row.website || google?.website_url,
        headquarters: row.headquarters,
        scrapeWebsite: scrape,
        forceScrape: scrape && (!row.phone || !row.email),
        context: `backfill:${row.slug}`,
      });

      // Only rewrite public name when stored name is still the legal entity and DBA differs.
      // Never strip curated location brands (e.g. "Two Men Gainesville").
      const storedIsLegal =
        Boolean(names.legalName) &&
        normalizeCompanyNameKey(row.name || '') ===
          normalizeCompanyNameKey(names.legalName || '');
      const nextName =
        storedIsLegal && names.prefersDba && names.publicName
          ? names.publicName
          : row.name;

      const patch: Record<string, unknown> = {};
      if (
        nextName &&
        normalizeCompanyNameKey(nextName) !== normalizeCompanyNameKey(row.name || '')
      ) {
        patch.name = nextName;
        nameUpdates++;
      }
      if (names.legalName && !row.fmcsa_legal_name) {
        patch.fmcsa_legal_name = names.legalName;
      }

      const nextPhone = preferExistingContactField(row.phone, resolved.phone);
      const nextEmail = preferExistingContactField(row.email, resolved.email);
      const nextWebsite = preferGoodContactField(row.website, resolved.website, 'website');
      const nextAddress = preferExistingContactField(
        row.physical_address,
        resolved.address
      );

      if (nextPhone && nextPhone !== (row.phone || '').trim()) patch.phone = nextPhone;
      if (nextEmail && nextEmail !== (row.email || '').trim()) patch.email = nextEmail;
      if (nextWebsite && nextWebsite !== (row.website || '').trim()) patch.website = nextWebsite;
      if (nextAddress && nextAddress !== (row.physical_address || '').trim()) {
        patch.physical_address = nextAddress;
        if (!row.headquarters?.trim()) patch.headquarters = nextAddress;
      }

      if (!Object.keys(patch).length) {
        console.log('unchanged');
        continue;
      }

      contactUpdates++;
      changes.push({
        slug: row.slug,
        before: {
          name: row.name,
          phone: row.phone,
          email: row.email,
          website: row.website,
          address: row.physical_address,
        },
        after: {
          name: patch.name ?? row.name,
          phone: patch.phone ?? row.phone,
          email: patch.email ?? row.email,
          website: patch.website ?? row.website,
          address: patch.physical_address ?? row.physical_address,
        },
        sources: resolved.sources,
      });

      console.log(
        Object.entries(patch)
          .map(([k, v]) => `${k}=${String(v).slice(0, 40)}`)
          .join(' ')
      );

      if (dryRun) {
        updated++;
        continue;
      }

      patch.last_updated = new Date().toISOString().slice(0, 10);
      const { error } = await admin.from('companies').update(patch).eq('id', row.id);
      if (error) {
        // Retry without email if column missing
        if (error.message?.includes('email') || error.code === 'PGRST204') {
          const { email: _e, ...rest } = patch;
          const retry = await admin.from('companies').update(rest).eq('id', row.id);
          if (retry.error) {
            console.error(`  FAIL ${retry.error.message}`);
            errors++;
            continue;
          }
        } else {
          console.error(`  FAIL ${error.message}`);
          errors++;
          continue;
        }
      }
      updated++;
    } catch (err) {
      errors++;
      console.error(err instanceof Error ? err.message : err);
    }

    if (delayMs > 0 && scrape) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  console.log(
    JSON.stringify(
      {
        updated,
        nameUpdates,
        contactUpdates,
        errors,
        dryRun,
        sample: changes.slice(0, 12),
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
