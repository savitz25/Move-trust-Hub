import mappings from "./provider-map.json";
type Mapping = { slug: string; status: "EXACT_USDOT_MATCH" | "IDENTITY_REVIEW" | "UNMATCHED"; providerId: string | null; observedUsdot: string; v2DisplayName: string | null };
const bySlug = new Map((mappings as Mapping[]).map((mapping) => [mapping.slug, mapping]));
export function providerRouteDecision(slug: string) {
  const mapping = bySlug.get(slug);
  if (!mapping || mapping.status !== "EXACT_USDOT_MATCH" || !mapping.providerId) return { mode: "V1_FALLBACK" as const, reason: mapping?.status ?? "UNMAPPED" };
  return { mode: "V2_COMPOSED" as const, providerId: mapping.providerId, canonicalPath: `/companies/${slug}`, observedUsdot: mapping.observedUsdot, v2DisplayName: mapping.v2DisplayName };
}
export function providerRoutingAudit() {
  const rows = mappings as Mapping[];
  return { total: rows.length, exact: rows.filter((row) => row.status === "EXACT_USDOT_MATCH").length, review: rows.filter((row) => row.status === "IDENTITY_REVIEW").length, unmatched: rows.filter((row) => row.status === "UNMATCHED").length };
}
