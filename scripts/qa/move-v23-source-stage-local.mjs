// Disposable in-memory PostgreSQL only. Never accepts a connection string.
import { readFileSync } from 'node:fs';

const forbidden = ['zvoijbohtyuhqfuvteoy', 'arepfylnilkjmyduhwbz', 'tzzcogaricohtezsugjr'];
const files = {
  up: new URL('../../supabase/migrations/20260921154559_move_v23_source_stage.sql', import.meta.url),
  test: new URL('../../supabase/tests/move_v23_source_stage.sql', import.meta.url),
  down: new URL('../../supabase/rollback/20260921154559_move_v23_source_stage.down.sql', import.meta.url),
};
const text = Object.fromEntries(Object.entries(files).map(([name, url]) => [name, readFileSync(url, 'utf8')]));
const joined = Object.values(text).join('\n');
if (forbidden.some(ref => joined.includes(ref)) || process.argv.slice(2).some(arg => forbidden.some(ref => arg.includes(ref)))) {
  throw new Error('Refusing non-local database target');
}

const candidates = [
  new URL('../../node_modules/@electric-sql/pglite/dist/index.js', import.meta.url),
  new URL('../../../ask-v23-gate1b/node_modules/@electric-sql/pglite/dist/index.js', import.meta.url),
];
let PGlite;
for (const candidate of candidates) {
  const label = candidate.pathname;
  if (forbidden.some(ref => label.includes(ref))) throw new Error('Refusing non-local database target');
  try {
    PGlite = (await import(candidate.href)).PGlite;
    break;
  } catch { /* try the next local engine */ }
}
if (!PGlite) throw new Error('No local disposable PostgreSQL engine is available');

const message = (error) => String(error?.message ?? error);
async function emptyDatabase() {
  const db = new PGlite();
  await db.exec(`create role anon nologin; create role authenticated nologin; create role service_role nologin nosuperuser nobypassrls;`);
  return db;
}
async function assertAbsent(db) {
  const found = await db.query(`
    select
      (select count(*)::int from pg_namespace where nspname='mth_profile_transfer') as schemas,
      (select count(*)::int from pg_roles where rolname='mth_move_profile_transfer') as roles,
      (select count(*)::int from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='mth_profile_transfer') as relations,
      (select count(*)::int from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='mth_profile_transfer') as functions`);
  const row = found.rows[0];
  if (row.schemas || row.roles || row.relations || row.functions) throw new Error(`Partial My TrustHub objects remain: ${JSON.stringify(row)}`);
}

const denied = await emptyDatabase();
try {
  await denied.exec(text.up);
  throw new Error('migration ran without approval');
} catch (error) {
  if (!message(error).includes('Isolated target approval required')) throw error;
  await denied.exec('rollback');
}
await assertAbsent(denied);
await denied.close();
console.log('PASS real migration without approval fails closed and leaves no objects');

const approved = await emptyDatabase();
await approved.exec(`select set_config('mth.v23_isolated','approved',false)`);
await approved.exec(text.up);
// Disposable mirror of the hosted PostgreSQL 17 creator membership.
// The SQL test requires this baseline and rolls back only its own SET TRUE change.
await approved.exec(`grant mth_move_profile_transfer to postgres with admin true, inherit false, set false`);
await approved.exec(text.test);
const triggers = await approved.query(`select count(*)::int as n from pg_event_trigger where evtname like 'mth_profile_transfer%'`);
if (triggers.rows[0].n !== 0) throw new Error('Event trigger exists after apply');
await approved.exec(text.down);
await assertAbsent(approved);
await approved.close();
console.log('PASS approved migration, prepared SQL test, and rollback');
