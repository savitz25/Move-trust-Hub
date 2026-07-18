import type { ReactNode } from 'react';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { HomeBelowFold } from '@/components/home/home-below-fold';
import { HomeWizardSection } from '@/components/home/home-wizard-section';
import { prepareCompaniesForDirectoryClient } from '@/lib/directory/directory-client-payload';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import { toHomeRouteMover } from '@/lib/home/resolve-route-from-zip';

async function getFallbackMovers() {
  try {
    const all = prepareCompaniesForDirectoryClient(await getUnifiedDirectoryCompanies());
    return [...all]
      .sort((a, b) => (b.reputationScore || 0) - (a.reputationScore || 0))
      .slice(0, 10)
      .map((c) => toHomeRouteMover(c, 'national'));
  } catch {
    return [];
  }
}

export async function HomePage({ mapSection }: { mapSection?: ReactNode }) {
  const fallbackMovers = await getFallbackMovers();

  return (
    <div className="flex flex-col">
      {/* Task-driven hero */}
      <section className="relative overflow-hidden border-b">
        {/* High-tech background */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-[#F7F8FA] to-[#EEF2F7]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(10,37,64,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,37,64,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden
        />

        <div className="container relative mx-auto px-4 py-10 sm:py-14 md:py-16 lg:py-20">
          <HomeWizardSection fallbackMovers={fallbackMovers} />
        </div>
      </section>

      <div className="container mx-auto px-4 pt-6">
        <TrustToolsBar className="mb-2" />
      </div>

      {mapSection}

      <HomeBelowFold />
    </div>
  );
}
