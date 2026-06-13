import { Suspense } from 'react';
import { AutoTransportDirectoryClient } from '@/components/directory/auto-transport-directory-client';
import { getAllAutoTransportCompanies } from '@/lib/data';
import { Company } from '@/types';

export const metadata = {
  title: 'Auto Transport & Car Shipping Companies Directory 2026',
  description: 'Browse and filter top auto transport and car shipping companies. Compare ratings, pricing, services (open/enclosed), FMCSA data, BBB ratings, and real customer reviews for vehicle transport.',
};

export default async function AutoTransportDirectoryPage() {
  const companies: Company[] = await getAllAutoTransportCompanies();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="uppercase tracking-[2px] text-xs text-primary font-semibold">COMPREHENSIVE DIRECTORY</div>
        <h1 className="text-4xl font-semibold tracking-tight mt-1">Auto Transport &amp; Car Shipping Companies</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Find and compare top-rated auto transport companies for open and enclosed vehicle shipping. Filter by reputation, price, services, and compliance data. Get instant quotes from trusted carriers and brokers.
        </p>
      </div>

      <Suspense fallback={<div className="h-[600px] rounded-xl border bg-muted/30 animate-pulse" />}>
        <AutoTransportDirectoryClient initialCompanies={companies} />
      </Suspense>

      <div className="mt-12 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
        All companies listed are FMCSA-registered (where applicable) for vehicle transport. Always verify current licensing and insurance directly with the provider and FMCSA before booking. Prices are estimates for a typical cross-country open transport of a standard sedan.
      </div>
    </div>
  );
}
