/**
 * Task 002 FMCSA research for the three USDOT collision groups.
 * Never prints web keys or connection strings.
 * Does not call Google Places.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { lookupCarrierByDot } from '../lib/fmcsa/refresh/fetch-carrier-core';
import { sleep } from '../lib/fmcsa/refresh/rate-limit';

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

function summarizeCarrier(carrier: Record<string, unknown> | null) {
  if (!carrier) return null;
  return {
    dotNumber: carrier.dotNumber ?? null,
    legalName: carrier.legalName ?? null,
    dbaName: carrier.dbaName ?? null,
    phyCity: carrier.phyCity ?? null,
    phyState: carrier.phyState ?? null,
    allowedToOperate: carrier.allowedToOperate ?? null,
    commonAuthorityStatus: carrier.commonAuthorityStatus ?? null,
    contractAuthorityStatus: carrier.contractAuthorityStatus ?? null,
    brokerAuthorityStatus: carrier.brokerAuthorityStatus ?? null,
    safetyRating: carrier.safetyRating ?? null,
    oosDate: carrier.oosDate ?? null,
    docketNumber: carrier.docketNumber ?? null,
    censusType: (carrier.censusTypeId as { censusTypeDesc?: string } | undefined)?.censusTypeDesc ?? null,
  };
}

async function fetchJson(url: string) {
  const res = await fetch(url, { cache: 'no-store', headers: { Accept: 'application/json' } });
  if (!res.ok) return { status: res.status, json: null as unknown };
  return { status: res.status, json: await res.json() };
}

async function nameSearch(query: string, webKey: string) {
  const url = `https://mobile.fmcsa.dot.gov/qc/services/carriers/name/${encodeURIComponent(query)}?webKey=${encodeURIComponent(webKey)}&start=0&size=15`;
  const { status, json } = await fetchJson(url);
  const content = (json as { content?: Array<{ carrier?: Record<string, unknown> }> } | null)?.content ?? [];
  return {
    query,
    httpStatus: status,
    matches: content.slice(0, 8).map((row) => summarizeCarrier(row.carrier ?? null)),
  };
}

async function cargoAndAuthority(dot: string, webKey: string) {
  const base = `https://mobile.fmcsa.dot.gov/qc/services/carriers/${encodeURIComponent(dot)}`;
  const key = `webKey=${encodeURIComponent(webKey)}`;
  const [cargo, authority] = await Promise.all([
    fetchJson(`${base}/cargo-carried?${key}`),
    fetchJson(`${base}/authority?${key}`),
  ]);
  return {
    cargoStatus: cargo.status,
    cargo: cargo.json,
    authorityStatus: authority.status,
    authority: authority.json,
  };
}

async function main() {
  loadEnvFiles();
  const webKey = process.env.FMCSA_WEB_KEY?.trim();
  if (!webKey) throw new Error('BLOCKED — FMCSA_WEB_KEY missing');
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('BLOCKED — DATABASE ACCESS');

  const client = new pg.Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
  await client.connect();
  const companies = await client.query(`
    SELECT id, slug, name, usdot_number, mc_number, fmcsa_legal_name, entity_type,
           service_scope, headquarters, website, publication_state, indexable,
           authority_active, out_of_service, is_verified
      FROM public.companies
     WHERE id IN (
       'allied','mayflower','atlas','wheaton','graebel','arpin',
       'national','north-american',
       'northern-michigan-moving','northern-michigan-moving-2'
     )
     ORDER BY id
  `);
  await client.end();

  const collisionDots = ['125563', '70851', '1398726'];
  const seedCandidates: Record<string, string[]> = {
    allied: ['76235'],
    mayflower: ['125563'],
    atlas: ['125550'],
    wheaton: ['70719'],
    graebel: [],
    arpin: ['49922'],
    national: ['76628'],
    'north-american': ['70851'],
  };

  const byDot: Record<string, unknown> = {};
  for (const dot of collisionDots) {
    const looked = await lookupCarrierByDot(dot, webKey);
    byDot[dot] = {
      kind: looked.kind,
      carrier: summarizeCarrier(looked.carrier as Record<string, unknown> | null),
    };
    await sleep(300);
  }

  const nameQueries = [
    'Allied Van Lines',
    'Mayflower Transit',
    'Aero Mayflower',
    'Atlas Van Lines',
    'Wheaton World Wide',
    'Wheaton Van Lines',
    'Graebel Van Lines',
    'Graebel Movers',
    'Arpin Van Lines',
    'National Van Lines',
    'North American Van Lines',
    'Northern Michigan Moving',
  ];
  const names = [];
  for (const query of nameQueries) {
    names.push(await nameSearch(query, webKey));
    await sleep(300);
  }

  const extraDots = [
    ...new Set(
      Object.values(seedCandidates)
        .flat()
        .concat(
          names.flatMap((row) =>
            (row.matches as Array<{ dotNumber?: unknown }>).map((match) => String(match?.dotNumber ?? ''))
          )
        )
        .filter((dot) => /^\d{4,8}$/.test(dot))
    ),
  ].slice(0, 40);

  const candidateLooks: Record<string, unknown> = {};
  const verifiedEvidence: Record<string, unknown> = {};
  for (const dot of extraDots) {
    if (byDot[dot]) continue;
    const looked = await lookupCarrierByDot(dot, webKey);
    candidateLooks[dot] = {
      kind: looked.kind,
      carrier: summarizeCarrier(looked.carrier as Record<string, unknown> | null),
    };
    await sleep(250);
  }

  const evidenceDots = [...new Set([...collisionDots, ...Object.keys(candidateLooks), ...extraDots])].slice(0, 25);
  for (const dot of evidenceDots) {
    verifiedEvidence[dot] = await cargoAndAuthority(dot, webKey);
    await sleep(250);
  }

  const report = {
    generated_at: new Date().toISOString(),
    google_places_requests: 0,
    source: 'FMCSA QC Mobile API',
    companies: companies.rows,
    collision_dots: byDot,
    name_searches: names,
    candidate_dots: candidateLooks,
    cargo_authority: Object.fromEntries(
      Object.entries(verifiedEvidence).map(([dot, payload]) => {
        const typed = payload as {
          cargo?: unknown;
          authority?: unknown;
          cargoStatus: number;
          authorityStatus: number;
        };
        return [
          dot,
          {
            cargoStatus: typed.cargoStatus,
            authorityStatus: typed.authorityStatus,
            cargo: typed.cargo,
            authority: typed.authority,
          },
        ];
      })
    ),
  };

  writeFileSync(
    resolve(process.cwd(), 'docs/task-002-fmcsa-research.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(
    JSON.stringify(
      {
        companies: companies.rows.map((row: { id: string; slug: string; usdot_number: string; mc_number: string }) => ({
          id: row.id,
          slug: row.slug,
          usdot: row.usdot_number,
          mc: row.mc_number,
        })),
        collision_dots: byDot,
        name_hit_counts: names.map((row) => ({ query: row.query, hits: row.matches.length })),
        google_places_requests: 0,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message.replace(/webKey=[^&\s]+/gi, 'webKey=***').replace(/postgresql:\/\/[^@\s]+@/gi, 'postgresql://***@'));
  process.exit(1);
});
