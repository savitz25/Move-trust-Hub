import { Suspense } from 'react';
import { DirectoryClient } from '@/components/directory/directory-client';
import { getAllCompanies } from '@/lib/data';
import { Company } from '@/types';

export const metadata = {
  title: 'Directory of Interstate Moving Companies 2026',
  description: 'Browse and filter 25+ major interstate moving companies. Sort by reputation, rating, price, complaints, or years in business. See FMCSA, BBB, and verified reviews.',
};

export default async function CompaniesDirectoryPage() {
  const companies = await getAllCompanies();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="uppercase tracking-[2px] text-xs text-primary font-semibold">COMPREHENSIVE DIRECTORY</div>
        <h1 className="text-4xl font-semibold tracking-tight mt-1">Interstate Moving Companies</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          All major national players. Filter by coverage, services, price, and reputation. Click any company for a full profile with licensing and recent reviews.
        </p>
      </div>

      <Suspense fallback={<div className="h-[600px] rounded-xl border bg-muted/30 animate-pulse" />}>
        <DirectoryClient initialCompanies={companies} />
      </Suspense>
    </div>
  );
}
