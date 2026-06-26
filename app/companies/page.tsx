import Link from 'next/link';
import { DirectoryLoader } from '@/components/directory/directory-loader';
import { TrustBadges } from '@/components/trust/trust-badges';
import { ReviewHighlights } from '@/components/trust/review-highlights';
import { getAllCompanies } from '@/lib/data';

export const metadata = {
  title: 'Directory of Interstate Moving Companies 2026',
  description:
    'Browse and filter 25+ major interstate moving companies. Sort by reputation, rating, price, complaints, or years in business. See FMCSA, BBB, and verified reviews.',
};

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

      <TrustBadges variant="compact" className="mb-8" />

      <DirectoryLoader initialCompanies={companies} />

      <ReviewHighlights
        className="py-16 mt-8 border-t"
        compact
        title="Featured Review Highlights"
        subtitle="A quick look at highly rated interstate movers with verified review volume and reputation scores."
      />
    </div>
  );
}