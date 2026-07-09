import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

async function probe(dot: string) {
  const webKey = process.env.FMCSA_WEB_KEY?.trim();
  if (!webKey) throw new Error('FMCSA_WEB_KEY missing');

  const url = `https://mobile.fmcsa.dot.gov/qc/services/carriers/${encodeURIComponent(dot)}?webKey=${encodeURIComponent(webKey)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  const json = (await res.json()) as Record<string, unknown>;
  const content = json.content as Record<string, unknown> | null;
  const carrier = content?.carrier as Record<string, unknown> | undefined;
  const message =
    (json.message as string | undefined) ??
    (json.error as string | undefined) ??
    (content?.message as string | undefined);

  console.log(`\nDOT ${dot} — HTTP ${res.status}`);
  console.log({
    contentNull: content == null,
    message: message ?? null,
    legalName: carrier?.legalName ?? null,
    allowedToOperate: carrier?.allowedToOperate ?? null,
    commonAuthorityStatus: carrier?.commonAuthorityStatus ?? null,
  });
}

async function main() {
  const dots = process.argv.slice(2);
  if (!dots.length) {
    await probe('2799007');
    await probe('1065394');
    return;
  }
  for (const dot of dots) await probe(dot);
}

main().catch(console.error);