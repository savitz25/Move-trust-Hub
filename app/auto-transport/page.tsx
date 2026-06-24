import { Suspense } from 'react';
import { AutoTransportCalculator } from '@/components/auto-transport/auto-transport-calculator';
import { AutoTransportSeoSections } from '@/components/auto-transport/auto-transport-seo-sections';
import { AutoTransportDirectoryClient } from '@/components/directory/auto-transport-directory-client';
import { getAllAutoTransportCompanies } from '@/lib/data';
import type { Company } from '@/types';

export default async function AutoTransportHubPage() {
  const companies: Company[] = await getAllAutoTransportCompanies();

  return (
    <div className="flex flex-col">
      <AutoTransportCalculator />

      <section id="directory" className="container mx-auto px-4 py-10 md:py-12">
        <div className="mb-8">
          <div className="uppercase tracking-[2px] text-xs text-primary font-semibold">
            COMPREHENSIVE DIRECTORY
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-1">
            Compare Auto Transport Companies
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">
            Browse and filter top-rated car shipping carriers and brokers. Compare reputation,
            pricing, open and enclosed services, FMCSA data, and customer reviews.
          </p>
        </div>

        <Suspense fallback={<div className="h-[600px] rounded-xl border bg-muted/30 animate-pulse" />}>
          <AutoTransportDirectoryClient initialCompanies={companies} />
        </Suspense>

        <p className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          All companies listed are FMCSA-registered where applicable. Always verify current
          licensing and insurance directly with the provider and FMCSA before booking.
        </p>
      </section>

      <div className="container mx-auto px-4 pb-14">
        <AutoTransportSeoSections />
      </div>
    </div>
  );
}