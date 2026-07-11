import type { Metadata } from 'next';
import Link from 'next/link';
import { DirectoryLoader } from '@/components/directory/directory-loader';
import { InternalLinkHub } from '@/components/seo/internal-link-hub';
import { TrustBadges } from '@/components/trust/trust-badges';
import { ReviewHighlights } from '@/components/trust/review-highlights';
import { HowWeScorePanel } from '@/components/trust/how-we-score-panel';
import { VerificationTransparency } from '@/components/trust/verification-transparency';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import { buildCompaniesDirectorySchemaGraph } from '@/lib/seo/build-directory-list-schema';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { formatAttributedReviewsLabel } from '@/lib/trust/site-stats';

/** Revalidate so admin-approved companies appear without a full redeploy. */
export const revalidate = 60;

const COMPANIES_TITLE = 'Compare FMCSA-Licensed Interstate Movers | Independent Directory';
const COMPANIES_DESCRIPTION =
  'Search FMCSA-licensed interstate movers with active operating authority. Sort by reputation, attributable reviews, price, complaints, or years in business. Independent directory — no lead fees.';

export const metadata: Metadata = buildMovePageMetadata({
  title: COMPANIES_TITLE,
  description: COMPANIES_DESCRIPTION,
  path: '/companies',
  keywords: [
    'interstate moving companies directory',
    'compare moving companies',
    'FMCSA licensed movers list',
    'moving company ratings 2026',
  ],
});

export default async function CompaniesDirectoryPage() {
  const companies = await getUnifiedDirectoryCompanies();
  const directorySchema = buildCompaniesDirectorySchemaGraph(companies);

  return (
    <>
      <JsonLd data={directorySchema} />
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="uppercase tracking-[2px] text-xs text-primary font-semibold">
          COMPREHENSIVE DIRECTORY
        </div>
        <h1 className="text-4xl font-semibold tracking-tight mt-1">
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

      <DirectoryLoader initialCompanies={companies} />

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