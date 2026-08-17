export const CANONICAL_PRODUCTION_HOST = "https://www.movetrusthub.com";
export const MIGRATION_DECISIONS = [
  "PRESERVE_AS_IS",
  "REBUILD_IN_V2_SAME_URL",
  "REBUILD_IN_V2_NEW_URL_WITH_301",
  "MERGE_INTO_EXISTING_V2_SURFACE",
  "KEEP_V1_TEMPORARILY",
  "RETIRE_WITH_301",
  "RETIRE_WITH_410",
  "INTERNAL_ONLY / NOT PUBLIC",
] as const;
export type MigrationDecision = (typeof MIGRATION_DECISIONS)[number];
export type RedirectRule = {
  oldPath: string;
  newPath: string;
  status: 301;
  queryHandling: "PRESERVE" | "DROP_TRACKING_ONLY";
  fragmentHandling: "BROWSER_PRESERVES";
  canonicalTarget: string;
};
export function stableProviderPath(input: {
  v1Slug: string;
  providerId: string;
  dbaName?: string | null;
}) {
  if (!input.v1Slug || !input.providerId)
    throw new Error("High-confidence provider identity required");
  return `/companies/${input.v1Slug}`;
}
export function validateRedirects(rules: RedirectRule[]) {
  const source = new Set(rules.map((r) => r.oldPath));
  for (const r of rules) {
    if (r.oldPath === r.newPath) throw new Error(`Redirect loop: ${r.oldPath}`);
    if (source.has(r.newPath))
      throw new Error(`Redirect chain: ${r.oldPath} -> ${r.newPath}`);
    if (!r.canonicalTarget.startsWith(CANONICAL_PRODUCTION_HOST))
      throw new Error("Wrong canonical host");
  }
  return true;
}
export function analyticsEvent(name: string, fields: Record<string, unknown>) {
  const forbidden = [
    "originAddress",
    "destinationAddress",
    "email",
    "phone",
    "fullName",
    "inventoryContents",
    "moveDate",
  ];
  for (const key of forbidden)
    if (key in fields) throw new Error(`Sensitive analytics field: ${key}`);
  return { name, fields };
}
export function rehearsalRoute(mode: "V1" | "V2", path: string) {
  if (
    path.startsWith("/experience-lab") ||
    path.startsWith("/move-v2/internal")
  )
    return { status: 404, mode };
  return { status: 200, mode, path };
}
export const CUTOVER_FLAGS = {
  MOVE_ENABLE_V2: {
    default: false,
    preview: true,
    productionLaunch: true,
    purpose: "Consumer V2 route composition",
  },
  MOVE_ENABLE_REAL_PROVIDER_DATA: {
    default: false,
    preview: true,
    productionLaunch: true,
    purpose: "Evidence-backed provider reads",
  },
  MOVE_ENABLE_GOOGLE_ENRICHMENT: {
    default: false,
    preview: false,
    productionLaunch: false,
    purpose: "Offline enrichment only",
  },
  MOVE_ENABLE_WEBSITE_ENRICHMENT: {
    default: false,
    preview: false,
    productionLaunch: false,
    purpose: "Offline bounded crawler only",
  },
  MOVE_ENABLE_INTERNAL_REVIEW: {
    default: false,
    preview: true,
    productionLaunch: false,
    purpose: "Internal console; never public launch",
  },
} as const;
