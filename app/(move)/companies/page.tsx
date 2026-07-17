import type { Metadata } from 'next';
import Link from 'next/link';
import { DirectoryLoader } from '@/components/directory/directory-loader';
import { InternalLinkHub } from '@/components/seo/internal-link-hub';
import { TrustBadges } from '@/components/trust/trust-badges';
import { ReviewHighlights } from '@/components/trust/review-highlights';
import { HowWeScorePanel } from '@/components/trust/how-we-score-panel';
import { VerificationTransparency } from '@/components/trust/verification-transparency';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { prepareCompaniesForDirectoryClient } from '@/lib/directory/directory-client-payload';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import { buildCompaniesDirectorySchemaGraph } from '@/lib/seo/build-directory-list-schema';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { formatAttributedReviewsLabel } from '@/lib/trust/site-stats';

/**
 * ISR TTL for directory HTML — keep aligned with middleware, vercel.json,
 * and `unstable_cache` revalidate in companies / unified-directory queries.
 * Tag revalidation on publish still busts cache immediately.
 */
export const revalidate = 300;

const COMPANIES_TITLE = 'Compare FMCSA-Licensed Interstate Movers | Independent Directory';
const COMPANIES_DESCRIPTION =
  'Search FMCSA-licensed interstate movers with active operating authority. Sort by reputation, attributable reviews, price, complaints, or years in business. Independent directory — no lead fees.';

export const metadata: Metadata = buildMovePageMetadata({
  title: COMPANIES_TITLE,
  description: COMPANIES_DESCRIPTION,
  path: '/companies',
});

export default async function CompaniesDirectoryPage() {
  const companies = await getUnifiedDirectoryCompanies();
  const directorySchema = buildCompaniesDirectorySchemaGraph(companies);
  const directoryClientCompanies = prepareCompaniesForDirectoryClient(companies);

  return (
    <>
      <JsonLd data={directorySchema} />
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="uppercase tracking-[2px] text-xs text-primary font-semibold">
          COMPREHENSIVE DIRECTORY
        </div>
        <h1 className="text-4xl font-semibold tracking-tighter mt-1">
          Compare FMCSA-Licensed Interstate Movers
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Your shortlist starts here. Search FMCSA-verified interstate movers with active operating
          authority — filter by coverage, services, price, and reputation. Every profile includes{' '}
          <Link href="/resources/fmcsa" className="text-primary underline underline-offset-2">
            FMCSA licensing
          </Link>{' '}
          context and moderated reviews. No paid placements, ever.
        </p>
      </div>

      <TrustBadges variant="compact" className="mb-4" />
      <TrustToolsBar className="mb-8" />

      <HowWeScorePanel className="mb-8" collapsible />

      <DirectoryLoader initialCompanies={directoryClientCompanies} />

      <VerificationTransparency className="mt-10" />

      <ReviewHighlights
        className="py-16 mt-8 border-t"
        compact
        title="Featured Review Highlights"
        subtitle={`${formatAttributedReviewsLabel()} on Move Trust Hub — named reviewer excerpts from verified movers, not inflated industry totals.`}
      />

      <InternalLinkHub className="mt-12" />
    </div>
    </>
  );
}