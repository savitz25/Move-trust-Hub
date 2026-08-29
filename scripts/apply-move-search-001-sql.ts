import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import pg from 'pg';

function loadEnvFiles() {
  for (const file of ['.env.local', '.env.production.local', '.env']) {
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
    }
  }
}

loadEnvFiles();

async function main() {
  const dry = process.argv.includes('--dry-run');
  const url = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
  if (!url) throw new Error('DATABASE_URL missing');
  const files = process.argv.filter((a) => a.endsWith('.sql'));
  const sqlPath =
    files[0] || resolve('supabase/migrations/20260829180000_move_search_001_suggestions.sql');
  const sql = readFileSync(sqlPath, 'utf8');
  console.log('applying', sqlPath);
  if (dry) {
    console.log('dry-run: would apply', sql.length, 'bytes');
    return;
  }
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    await client.query(sql);
    const ext = await client.query(`SELECT extversion FROM pg_extension WHERE extname = 'pg_trgm'`);
    const fn = await client.query(`SELECT proname FROM pg_proc WHERE proname = 'directory_search_suggestions'`);
    const idx = await client.query(
      `SELECT indexname FROM pg_indexes WHERE indexname LIKE '%trgm%'`
    );
    console.log(
      JSON.stringify(
        {
          pg_trgm: ext.rows[0]?.extversion ?? null,
          function: fn.rows[0]?.proname ?? null,
          indexes: idx.rows.map((r) => r.indexname),
        },
        null,
        2
      )
    );
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(String(err instanceof Error ? err.message : err).replace(/postgres(?:ql)?:\/\/[^@\s]+@/gi, 'postgresql://***@'));
  process.exit(1);
});
