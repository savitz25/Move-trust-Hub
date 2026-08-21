import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

function loadEnvFiles() {
  for (const file of ['.env.local', '.env']) {
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

loadEnvFiles();

async function main() {
  const url =
    process.env.SUPABASE_DB_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim();
  if (!url) throw new Error('Need DATABASE_URL');
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    await client.query(`NOTIFY pgrst, 'reload schema'`);
    const r = await client.query(
      `SELECT proname, pg_get_function_identity_arguments(oid) AS args
         FROM pg_proc WHERE proname = 'directory_query_page'`
    );
    console.log(JSON.stringify({ reloaded: true, functions: r.rows }, null, 2));
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
