import type { Metadata } from 'next';
import { LenderCompareLoader } from '@/components/lender/compare/lender-compare-loader';
import { lenders } from '@/lib/lender/mockData';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Compare Lenders Side-by-Side | Lender Trust Hub',
  description:
    'Select up to 3 NMLS-verified mortgage lenders and compare trust scores, ratings, loan types, and closing metrics.',
  alternates: { canonical: 'https://www.movetrusthub.com/lender/compare' },
};

export default function LenderComparePage() {
  const comparePool = lenders.slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-[#0A2540] md:text-4xl">
          Compare Lenders Side-by-Side
        </h1>
        <p className="mt-3 text-zinc-600">
          Select up to 3 lenders to compare trust scores, ratings, and loan types.
        </p>
      </div>

      <LenderCompareLoader lenders={comparePool} />
    </div>
  );
}