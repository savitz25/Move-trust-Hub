import { LAUNCH_RELEASE_VERSION } from "./release-approval";
export type CandidateState = { v2Reads: boolean; sameUrlComposition: boolean; release: string; sitemap: "V1_BASELINE" | "LAUNCH_CANDIDATE" };
export const V1_STATE: CandidateState = { v2Reads: false, sameUrlComposition: false, release: "V1", sitemap: "V1_BASELINE" };
export function cutover(state: CandidateState): CandidateState { return { ...state, v2Reads: true, sameUrlComposition: true, release: LAUNCH_RELEASE_VERSION, sitemap: "LAUNCH_CANDIDATE" }; }
export function rollback(state: CandidateState): CandidateState { void state; return { ...V1_STATE }; }
export type Failure = "RELEASE_UNAVAILABLE" | "PUBLIC_READ_ERROR" | "DB_COMPATIBILITY_FAILURE" | "RATE_LIMITER_UNAVAILABLE" | "PROVIDER_MAPPING_MISSING";
export function failureBehavior(failure: Failure) {
  if (failure === "PUBLIC_READ_ERROR" || failure === "RATE_LIMITER_UNAVAILABLE") return { globalStatus: 200, consumerReadStatus: 503, fallback: "NEUTRAL_ERROR", secretLeak: false };
  return { globalStatus: 200, consumerReadStatus: 200, fallback: "V1", secretLeak: false };
}
export const LAUNCH_ENVIRONMENT_NAMES = {
  requiredPublic: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "NEXT_PUBLIC_GA_MEASUREMENT_ID_MOVE"],
  requiredServer: ["SUPABASE_SERVICE_ROLE_KEY"],
  launchFlags: ["MOVE_ENABLE_V2", "MOVE_ENABLE_REAL_PROVIDER_DATA", "MOVE_ENABLE_PUBLIC_READS", "MOVE_ENABLE_SAME_URL_COMPOSITION"],
  internalOnly: ["MOVE_ENABLE_INTERNAL_REVIEW", "MOVE_ENABLE_GOOGLE_ENRICHMENT", "MOVE_ENABLE_WEBSITE_ENRICHMENT"],
} as const;
export function environmentPresence(env: Record<string, string | undefined>) { return Object.fromEntries(Object.values(LAUNCH_ENVIRONMENT_NAMES).flat().map((name) => [name, Boolean(env[name])])); }
