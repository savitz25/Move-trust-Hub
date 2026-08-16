export const WEBSITE_CRAWL_POLICY = {
  maxPages: 10,
  maxResponseBytes: 2_000_000,
  requestTimeoutMs: 8_000,
  maxRedirects: 3,
  allowedProtocols: ['https:'] as const,
  respectRobotsTxt: true,
  executeJavaScript: false,
  submitForms: false,
} as const;

const blockedHost = /^(localhost|.*\.localhost|0\.0\.0\.0|127(?:\.\d{1,3}){3}|10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|169\.254(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2}|\[?::1\]?)$/i;

export function validateOfficialWebsiteUrl(candidate: string): URL {
  const url = new URL(candidate);
  if (url.protocol !== 'https:' || url.username || url.password || url.port) throw new Error('Website URL is not eligible for enrichment.');
  if (blockedHost.test(url.hostname) || !url.hostname.includes('.')) throw new Error('Private or local destinations are blocked.');
  return url;
}

export function isSameRegistrableHost(seed: URL, candidate: URL): boolean {
  return candidate.hostname === seed.hostname || candidate.hostname.endsWith(`.${seed.hostname}`);
}

export interface WebsiteEnrichmentAdapter {
  validateIdentity(providerId: string, websiteUrl: string): Promise<{ status: 'VERIFIED' | 'IDENTITY_REVIEW' | 'REJECTED'; confidence: number; evidence: string[] }>;
  enrich(providerId: string, verifiedWebsiteUrl: string): Promise<{ observedContacts: string[]; publishedServiceAreas: string[]; publishedServices: string[]; sourceUrls: string[] }>;
}
