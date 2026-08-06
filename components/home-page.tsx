import type { ReactNode } from 'react';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { HomeBelowFold } from '@/components/home/home-below-fold';
import { MoveHero } from '@/components/move/hero';

/**
 * Homepage — SSR H1 in MoveHero is the LCP candidate.
 * No directory/mover data fetch on first paint; wizard JS loads only on user intent.
 */
export async function HomePage({ mapSection }: { mapSection?: ReactNode }) {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b">
        {/* Clean canvas + restrained orange energy */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50/90 via-[#F7F8FA] to-[#EEF2F7] dark:from-primary/10 dark:via-background dark:to-background"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 top-0 h-[28rem] w-[28rem] rounded-full bg-primary/12 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-move-soft/20 blur-3xl"
          aria-hidden
        />

        <div className="container relative mx-auto px-4 py-10 sm:py-14 md:py-16 lg:py-20">
          <MoveHero />
        </div>
      </section>

      <div className="container mx-auto px-4 pt-6">
        <TrustToolsBar className="mb-2" />
      </div>

      {mapSection}

      <div className="content-auto">
        <HomeBelowFold />
      </div>
    </div>
  );
}
