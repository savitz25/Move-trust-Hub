import type { Metadata } from 'next';
import Link from 'next/link';
import { DirectoryLoader } from '@/components/directory/directory-loader';
import { TrustBadges } from '@/components/trust/trust-badges';
import { ReviewHighlights } from '@/components/trust/review-highlights';
import { HowWeScorePanel } from '@/components/trust/how-we-score-panel';
import { VerificationTransparency } from '@/components/trust/verification-transparency';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { getAllCompanies } from '@/lib/data-server';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

const COMPANIES_TITLE = 'Directory of Interstate Moving Companies 2026';
const COMPANIES_DESCRIPTION =
  'Browse and filter 25+ major interstate moving companies. Sort by reputation, rating, price, complaints, or years in business. See FMCSA, BBB, and attributable on-site reviews.';

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
  const companies = await getAllCompanies();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="uppercase tracking-[2px] text-xs text-primary font-semibold">
          COMPREHENSIVE DIRECTORY
        </div>
        <h1 className="text-4xl font-semibold tracking-tight mt-1">
          Interstate Moving Companies
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          All major national players. Filter by coverage, services, price, and reputation. Click
          any company for a full profile with{' '}
          <Link href="/resources/fmcsa" className="text-primary underline underline-offset-2">
            FMCSA licensing
          </Link>{' '}
          and recent reviews.
        </p>
      </div>

      <TrustBadges variant="compact" className="mb-4" />
      <TrustToolsBar className="mb-8" />

      <HowWeScorePanel className="mb-8" />

      <DirectoryLoader initialCompanies={companies} />

      <VerificationTransparency className="mt-10" />

      <ReviewHighlights
        className="py-16 mt-8 border-t"
        compact
        title="Featured Review Highlights"
        subtitle="A quick look at highly rated interstate movers with verified review volume and reputation scores."
      />
    </div>
  );
}