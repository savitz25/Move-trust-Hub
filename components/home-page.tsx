import type { ReactNode } from 'react';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { HomeBelowFold } from '@/components/home/home-below-fold';
import { HomeHeroSsr } from '@/components/home/home-hero-ssr';
import { HomeWizardSection } from '@/components/home/home-wizard-section';

/**
 * Homepage — SSR H1 (HomeHeroSsr) is the LCP candidate.
 * No directory/mover data fetch on first paint; wizard JS loads only on user intent.
 */
export async function HomePage({ mapSection }: { mapSection?: ReactNode }) {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b">
        {/* Decorative backgrounds stay paint-only (no network) */}
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

        <div className="container relative mx-auto px-4 py-10 sm:py-14 md:py-16 lg:py-20">
          <HomeHeroSsr />
          <HomeWizardSection />
        </div>
      </section>

      <div className="container mx-auto px-4 pt-6">
        <TrustToolsBar className="mb-2" />
      </div>

      {mapSection}

      {/* SSR FAQ/internal links for SEO; review carousel is dynamic inside */}
      <div className="content-auto">
        <HomeBelowFold />
      </div>
    </div>
  );
}
