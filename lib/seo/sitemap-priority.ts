/** Map editorial `market.priority` (1 = flagship) to sitemap priority. */
export function getCityHubSitemapPriority(priority: number): number {
  if (priority <= 1) return 0.95;
  if (priority <= 3) return 0.93;
  if (priority <= 6) return 0.91;
  if (priority <= 12) return 0.89;
  if (priority <= 24) return 0.86;
  return 0.83;
}