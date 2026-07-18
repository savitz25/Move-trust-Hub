import { loadEnvLocal } from '../lib/verification/load-env-local';
import { fetchFmcsaCarrierByParsed } from '@/lib/fmcsa/refresh/fetch-carrier';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';

loadEnvLocal();

const dots = ['3411160', '3583359', '2145512'];

async function main() {
  for (const dot of dots) {
    const parsed = parseCarrierNumber(dot);
    if (!parsed) continue;
    const snap = await fetchFmcsaCarrierByParsed(parsed);
    const raw = snap?.raw as Record<string, string> | undefined;
    console.log(`\nDOT ${dot}: ${snap?.legalName}`);
    if (raw) {
      console.log(`  ${raw.phyStreet}, ${raw.phyCity}, ${raw.phyState} ${raw.phyZipcode}`);
      console.log(`  phone: ${raw.telephone ?? '—'}`);
      console.log(`  dba: ${raw.dbaName ?? snap?.dbaName ?? '—'}`);
    }
  }
}

main().catch(console.error);