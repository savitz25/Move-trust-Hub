import { CANONICAL_PRODUCTION_HOST } from "../migration/contract";
export type SitemapCandidate = { path: string; status: number; indexable: boolean; canonical: string; decision: string };
export function selectLaunchSitemap(rows: SitemapCandidate[]) {
  const selected = rows.filter((row) => row.status === 200 && row.indexable && !row.decision.includes("301") && !row.decision.includes("410") && !/^\/(api|experience-lab|move-v2\/internal|admin)(\/|$)/.test(row.path) && row.canonical === `${CANONICAL_PRODUCTION_HOST}${row.path === "/" ? "" : row.path}`);
  return [...new Map(selected.map((row) => [row.path, row])).values()];
}
