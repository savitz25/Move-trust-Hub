/** Keys under the `performance` item in Vercel Edge Config. */
export type PerformanceFlags = {
  /** Defer gtag.js until first user interaction (recommended for PSI). */
  enableGtag: boolean;
  /** Defer @vercel/analytics + speed-insights. */
  enableVercelAnalytics: boolean;
  /** Defer hub-dimension GA page_view helper. */
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
  enableGtag: true,
  enableVercelAnalytics: true,
  enableHubAnalytics: true,
  enableChatbot: false,
  deferThirdPartyUntilInteraction: true,
  htmlCacheSeconds: 86_400,
  apiCacheSeconds: 3_600,
};