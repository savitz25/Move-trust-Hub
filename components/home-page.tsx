import type { ReactNode } from 'react';
import { TrustBadges } from '@/components/trust/trust-badges';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { HomeBelowFold } from '@/components/home/home-below-fold';
import { HomeRouteFlow } from '@/components/home/home-route-flow';
import { HERO_TRUST_EYEBROW } from '@/lib/trust/site-messaging';
import { prepareCompaniesForDirectoryClient } from '@/lib/directory/directory-client-payload';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import { toHomeRouteMover } from '@/lib/home/resolve-route-from-zip';
import { Truck, Zap } from 'lucide-react';

async function getFallbackMovers() {
  try {
    const all = prepareCompaniesForDirectoryClient(await getUnifiedDirectoryCompanies());
    return [...all]
      .sort((a, b) => (b.reputationScore || 0) - (a.reputationScore || 0))
      .slice(0, 4)
      .map(toHomeRouteMover);
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
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-3 py-1.5 text-xs font-medium text-emerald-800 shadow-sm sm:px-4 sm:text-sm">
              <Truck className="h-4 w-4 shrink-0" aria-hidden />
              <span className="truncate sm:whitespace-normal">{HERO_TRUST_EYEBROW}</span>
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tighter text-[#0A2540] sm:text-4xl md:text-5xl lg:text-[3.35rem]">
              Where are you moving from and to?
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Start one free Move Plan: lock your route, shortlist up to three trusted movers,
              build an inventory, and get a report you can send for comparable estimates — no lead
              forms, no paid placements.
            </p>

            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Zap className="h-3.5 w-3.5" aria-hidden />
              City or ZIP · trusted movers · no lead form
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl sm:mt-10">
            <HomeRouteFlow fallbackMovers={fallbackMovers} />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-6">
        <TrustBadges variant="compact" className="mb-4" />
        <TrustToolsBar className="mb-2" />
      </div>

      {mapSection}

      <HomeBelowFold />
    </div>
  );
}
