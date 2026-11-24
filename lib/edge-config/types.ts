/** Keys under the `performance` item in Vercel Edge Config. */
export type PerformanceFlags = {
  /** Retired. The tag is not loaded. */
  enableGtag: boolean;
  /** Defer @vercel/analytics + speed-insights. */
  enableVercelAnalytics: boolean;
  /** Retired with the tag. Hub page views are not sent. */
  enableHubAnalytics: boolean;
  /** Show AI chatbot widget (heavy — off by default in Edge Config seed). */
  enableChatbot: boolean;
  /** When true, third-party scripts skip idle/scroll triggers until interaction or maxWait. */
  deferThirdPartyUntilInteraction: boolean;
  /** CDN TTL for public HTML (middleware + vercel.json baseline). */
  htmlCacheSeconds: number;
  /** CDN TTL for read-only JSON API routes. */
  apiCacheSeconds: number;
};

export const DEFAULT_PERFORMANCE_FLAGS: PerformanceFlags = {
  /** Retired. Nothing reads this flag to inject a tag. */
  enableGtag: false,
  enableVercelAnalytics: true,
  /** Retired with the tag. */
  enableHubAnalytics: false,
  enableChatbot: false,
  /** Applies to Vercel Analytics and the chatbot. */
  deferThirdPartyUntilInteraction: true,
  htmlCacheSeconds: 86_400,
  apiCacheSeconds: 3_600,
};