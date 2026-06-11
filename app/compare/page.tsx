import { Suspense } from 'react';
import { CompareClient } from '@/components/compare/compare-client';
import { getAllCompanies } from '@/lib/data';

export const metadata = {
  title: 'Compare Movers Side-by-Side | Move Trust Hub',
  description: 'Select up to 4 interstate moving companies and compare reputation scores, ratings, pricing, licensing, services, and complaint ratios in one table.',
};

export default async function ComparePage() {
  const companies = await getAllCompanies();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold tracking-tight mb-1">Compare Movers</h1>
      <p className="text-muted-foreground mb-6 max-w-2xl">Select up to four companies from the directory. The comparison updates live. Great for narrowing down finalists.</p>

      <Suspense fallback={<div className="h-96 border rounded-xl bg-muted/30" />}>
        <CompareClient allCompanies={companies} />
      </Suspense>
    </div>
  );
}
