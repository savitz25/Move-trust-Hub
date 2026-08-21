import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const match = raw.trim().match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

async function main() {
  loadEnv();
  const { queryDbDirectoryPage, getLastDbDirectoryDiagnostics } = await import(
    '../lib/directory/query-db-directory-page'
  );
  const page = await queryDbDirectoryPage({ offset: 0, limit: 24, filters: {} });
  const diag = getLastDbDirectoryDiagnostics();
  const report = {
    google_places_requests: 0,
    total: page.total,
    returned: page.companies.length,
    materialized: diag?.materializedIntoNode ?? null,
    path: diag?.path ?? null,
    expected_interstate_min: 4600,
    ok: page.total >= 4600 && page.companies.length <= 24 && (diag?.materializedIntoNode ?? 9999) < 100,
  };
  writeFileSync(
    resolve(process.cwd(), 'docs/task-010-directory-reconciliation.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(JSON.stringify(report, null, 2));
  if (!report.ok) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
