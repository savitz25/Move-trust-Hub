import Link from 'next/link';
import { CompareLoader } from '@/components/compare/compare-loader';
import { TrustBadges } from '@/components/trust/trust-badges';
import { getAllCompanies } from '@/lib/data-server';

export const metadata = {
  title: 'Compare Movers Side-by-Side | Move Trust Hub',
  description:
    'Select up to 4 interstate moving companies and compare reputation scores, ratings, pricing, licensing, services, and complaint ratios in one table.',
};

export default async function ComparePage() {
  const companies = await getAllCompanies();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold tracking-tight mb-1">Compare Movers</h1>
      <p className="text-muted-foreground mb-4 max-w-2xl">
        Select up to four companies from the{' '}
        <Link href="/companies" className="text-primary underline underline-offset-2">
          mover directory
        </Link>
        . Compare{' '}
        <Link href="/resources/fmcsa" className="text-primary underline underline-offset-2">
          FMCSA ratings
        </Link>
        , reputation scores, and verified reviews side-by-side.
      </p>

      <TrustBadges variant="compact" className="mb-6" />

      <CompareLoader allCompanies={companies} />
    </div>
  );
}