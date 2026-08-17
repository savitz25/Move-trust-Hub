import { notFound } from "next/navigation";
import { moveV2Flags } from "@/lib/move-v2/flags";
import { REVIEW_FIXTURES } from "@/lib/move-v2/evidence-operations/fixtures";
import { loadOperationalReviewFixtures } from "@/lib/move-v2/evidence-operations/console-data.server";
import { ReviewConsole } from "./review-console";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Evidence operations | Internal Preview",
  robots: { index: false, follow: false },
};
export default async function Page() {
  const f = moveV2Flags();
  if (
    process.env.VERCEL_ENV === "production" ||
    !f.enabled ||
    !f.internalReview
  )
    notFound();
  let fixtures = REVIEW_FIXTURES;
  try {
    const operational = await loadOperationalReviewFixtures();
    if (operational.length) fixtures = operational;
  } catch {
    // Read-only synthetic fallback keeps local/CI QA independent of database availability.
  }
  return <ReviewConsole fixtures={fixtures} />;
}
