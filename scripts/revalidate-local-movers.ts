/**
 * Trigger production cache bust for all local-movers county pages.
 * Run: REVALIDATE_SECRET=... npx tsx scripts/revalidate-local-movers.ts
 */
const origin = process.env.REVALIDATE_ORIGIN ?? 'https://www.movetrusthub.com';
const secret = process.env.REVALIDATE_SECRET?.trim();

if (!secret) {
  console.error('REVALIDATE_SECRET is required');
  process.exit(1);
}

const url = `${origin}/api/revalidate-local-movers?secret=${encodeURIComponent(secret)}`;

const response = await fetch(url, { method: 'POST' });
const body = await response.text();

console.log(response.status, body);

if (!response.ok) {
  process.exit(1);
}