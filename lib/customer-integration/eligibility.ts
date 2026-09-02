import type { Company } from "@/types";
import { isAnonymousPublicProfileAllowed } from "@/lib/provider/publication";

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const LEGACY_USDOT_ID = /^usdot-(\d{5,8})$/;
export type MoveClaimProfile = {
  id: string;
  slug: string;
  usdot: string;
  displayName: string;
};
export function moveClaimProfile(company: Company): MoveClaimProfile | null {
  const usdot = String(company.usdotNumber || "").replace(/\D/g, "");
  if (
    (!UUID.test(company.id) && LEGACY_USDOT_ID.exec(company.id)?.[1] !== usdot) ||
    !company.slug.trim() ||
    !/^\d{5,8}$/.test(usdot) ||
    !isAnonymousPublicProfileAllowed(company)
  )
    return null;
  return {
    id: company.id,
    slug: company.slug,
    usdot,
    displayName: company.name,
  };
}
export function claimCtaEnabledFor(
  id: string,
  env: Record<string, string | undefined> = process.env,
) {
  if ((env.ATH_HANDOFF_SECRET || "").length < 32) return false;
  const mode = (env.ATH_CLAIM_CTA_MODE || "off").toLowerCase();
  if (mode === "all") return true;
  if (mode !== "canary") return false;
  return new Set(
    (env.ATH_CLAIM_CANARY_PROFILE_IDS || "")
      .split(",")
      .map((v) => v.trim().toLowerCase())
      .filter(Boolean),
  ).has(id.toLowerCase());
}
