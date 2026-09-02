import { getCompanyBySlugAsync } from "@/lib/data-server";
import {
  claimCtaEnabledFor,
  moveClaimProfile,
} from "@/lib/customer-integration/eligibility";
import { mintMoveHandoff } from "@/lib/customer-integration/handoff";
import { createClaimHandoffRedirect } from "@/lib/customer-integration/security";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ profileId: string }> },
) {
  const { profileId } = await params;
  try {
    const company = await getCompanyBySlugAsync(decodeURIComponent(profileId)),
      profile = company ? moveClaimProfile(company) : null;
    if (!profile || !claimCtaEnabledFor(profile.id))
      return Response.json(
        {
          error: "Profile management is unavailable.",
          nextActions: [
            "Return to this profile",
            "Search MoveTrustHub",
            "Contact AskTrustHub support",
          ],
        },
        { status: 404, headers: HEADERS },
      );
    const { token } = mintMoveHandoff(
      process.env.ATH_HANDOFF_SECRET || "",
      profile,
    );
    return createClaimHandoffRedirect(token);
  } catch {
    return Response.json(
      {
        error: "Profile management is temporarily unavailable.",
        nextActions: [
          "Try again later",
          "Search MoveTrustHub",
          "Contact AskTrustHub support",
        ],
      },
      { status: 503, headers: HEADERS },
    );
  }
}
