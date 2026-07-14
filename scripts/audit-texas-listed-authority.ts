/**
 * Audit every mover currently assigned to Texas counties for FMCSA authority health.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { texasCountyMoverAssignments } from '../data/texas-county-assignments';

function loadEnvLocal() {
  for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (!process.env[k]) process.env[k] = v;
  }
}

function moverIdToSlug(id: string): string {
  if (id.startsWith('directory-')) return id.slice('directory-'.length);
  return id;
}

async function main() {
  loadEnvLocal();
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const assignedIds = new Set<string>();
  for (const row of texasCountyMoverAssignments) {
    for (const id of row.moverIds) assignedIds.add(id);
  }
  const slugs = [...assignedIds].map(moverIdToSlug);
  console.log('Unique movers on TX county pages:', slugs.length);

  const { data, error } = await sb
    .from('companies')
    .select(
      'slug, name, is_verified, out_of_service, authority_active, revocation_date, usdot_number, mc_number, fmcsa_last_checked, headquarters'
    )
    .in('slug', slugs);

  if (error) throw error;

  const bySlug = new Map((data ?? []).map((c) => [c.slug, c]));

  type Issue = {
    slug: string;
    name: string;
    reason: string;
    authority_active: boolean | null;
    out_of_service: boolean | null;
    is_verified: boolean | null;
    revocation_date: string | null;
  };

  const issues: Issue[] = [];
  const healthy: string[] = [];
  const missing: string[] = [];

  for (const slug of slugs.sort()) {
    const c = bySlug.get(slug);
    if (!c) {
      missing.push(slug);
      issues.push({
        slug,
        name: '(not in companies table)',
        reason: 'missing_from_companies',
        authority_active: null,
        out_of_service: null,
        is_verified: null,
        revocation_date: null,
      });
      continue;
    }

    const reasons: string[] = [];
    if (c.out_of_service) reasons.push('out_of_service');
    if (c.authority_active === false) reasons.push('authority_inactive');
    if (c.revocation_date) reasons.push(`revocation_date=${c.revocation_date}`);
    // is_verified false is informational; user said 129 active directory
    if (reasons.length) {
      issues.push({
        slug: c.slug,
        name: c.name,
        reason: reasons.join('; '),
        authority_active: c.authority_active,
        out_of_service: c.out_of_service,
        is_verified: c.is_verified,
        revocation_date: c.revocation_date,
      });
    } else {
      healthy.push(c.slug);
    }
  }

  console.log('\n=== INACTIVE / PROBLEM MOVERS ON TEXAS PAGES ===');
  for (const i of issues) {
    console.log(
      `- ${i.slug}\n  name: ${i.name}\n  reason: ${i.reason}\n  authority_active=${i.authority_active} oos=${i.out_of_service} verified=${i.is_verified}`
    );
  }

  console.log('\n=== SUMMARY ===');
  console.log({
    listedUnique: slugs.length,
    healthy: healthy.length,
    issues: issues.length,
    missingFromDb: missing.length,
    authorityInactive: issues.filter((i) =>
      i.reason.includes('authority_inactive')
    ).length,
    outOfService: issues.filter((i) => i.reason.includes('out_of_service'))
      .length,
  });

  // Full dump of juggernauts
  const j = bySlug.get('juggernauts-moving-n-storage-llc');
  console.log('\n=== JUGGERNAUTS DETAIL ===');
  console.log(JSON.stringify(j, null, 2));

  mkdirSync('scripts/output', { recursive: true });
  writeFileSync(
    'scripts/output/tx-listed-authority-audit.json',
    JSON.stringify({ issues, healthy, missing, juggernauts: j }, null, 2)
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
