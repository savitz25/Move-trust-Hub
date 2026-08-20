/** Print representative production slugs for Task 001.1 QA. No secrets. */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { classifyProvider } from '../lib/provider/classification';

function loadEnvFiles() {
  for (const file of ['.env.local', '.env.production.local']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
      if (!process.env.DATABASE_URL && /^postgres(ql)?:\/\//i.test(value)) {
        process.env.DATABASE_URL = value;
      }
    }
  }
}

async function main() {
  loadEnvFiles();
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('BLOCKED — DATABASE ACCESS');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    const defaults = await client.query(`
      SELECT column_name, column_default
        FROM information_schema.columns
       WHERE table_schema='public' AND table_name='companies'
         AND column_name IN ('publication_state','indexable','legacy_directory_row')
       ORDER BY 1
    `);
    const cluster = await client.query(`
      SELECT id, slug, name, usdot_number, publication_state, indexable
        FROM public.companies
       WHERE regexp_replace(coalesce(usdot_number,''), '\\D', '', 'g') = '125563'
       ORDER BY id
    `);
    const rows = await client.query(`
      SELECT id, slug, name, entity_type, service_scope, services,
             publication_state, indexable, authority_active
        FROM public.companies
    `);
    const samples: Record<string, { slug: string; id: string; role: string }> = {};
    for (const row of rows.rows) {
      const classified = classifyProvider({
        serviceScope: row.service_scope,
        entityType: row.entity_type,
        services: Array.isArray(row.services) ? row.services : [],
      });
      const pick = (key: string, ok: boolean) => {
        if (ok && !samples[key] && row.publication_state !== 'REVIEW_REQUIRED') {
          samples[key] = {
            slug: row.slug,
            id: row.id,
            role: classified.displayRoles.join(', '),
          };
        }
      };
      pick('local', classified.roles.includes('local_mover'));
      pick('carrier', classified.roles.includes('hhg_carrier') && !classified.roles.includes('hhg_carrier_broker'));
      pick('broker', classified.roles.includes('hhg_broker') && !classified.roles.includes('hhg_carrier_broker'));
      pick('carrier_broker', classified.roles.includes('hhg_carrier_broker'));
      pick('auto_carrier', classified.roles.includes('auto_carrier'));
      pick('auto_broker', classified.roles.includes('auto_broker'));
      pick('hhg_auto', classified.roles.includes('multi_service'));
    }
    const locals = await client.query(`
      SELECT slug, name
        FROM public.companies
       WHERE service_scope = 'intrastate'
         AND publication_state = 'PUBLISHABLE'
         AND indexable = true
         AND is_verified = true
       ORDER BY slug
       LIMIT 8
    `);
    console.log(
      JSON.stringify(
        {
          defaults: defaults.rows,
          usdot_125563: cluster.rows,
          qa_targets: samples,
          verified_local_slugs: locals.rows,
          google_places_requests: 0,
        },
        null,
        2
      )
    );
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
