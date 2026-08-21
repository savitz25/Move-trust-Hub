/**
 * SHARE-002 — Move Trust Hub social-share identity (repo-local).
 * Production canonical + default card must never drift to localhost,
 * a Vercel preview host, or another TrustHub domain.
 */

export const SHARE_HUB = {
  id: 'move',
  brand: 'Move Trust Hub',
  host: 'www.movetrusthub.com',
  apexHost: 'movetrusthub.com',
  origin: 'https://www.movetrusthub.com',
  ogImagePath: '/opengraph-image',
  ogWidth: 1200,
  ogHeight: 630,
  ogAlt: 'MoveTrustHub — independent moving company research and moving tools',
  twitterCard: 'summary_large_image',
  networkLabel: 'ASK TRUST HUB NETWORK',
} as const;

export const FOREIGN_TRUSTHUB_HOSTS = [
  'www.asktrusthub.com',
  'asktrusthub.com',
  'www.insurancetrusthub.com',
  'insurancetrusthub.com',
  'www.lendertrusthub.com',
  'lendertrusthub.com',
  'www.contractortrusthub.com',
  'contractortrusthub.com',
  'www.seniortrusthub.com',
  'seniortrusthub.com',
  'www.investortrusthub.com',
  'investortrusthub.com',
] as const;

export function isForbiddenShareHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === 'localhost' || host === '127.0.0.1') return true;
  if (host.endsWith('.vercel.app')) return true;
  return (FOREIGN_TRUSTHUB_HOSTS as readonly string[]).includes(host);
}

export function resolveShareOrigin(): string {
  return SHARE_HUB.origin;
}
