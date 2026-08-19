import type { ReactNode } from 'react';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { HomeBelowFold } from '@/components/home/home-below-fold';
import { MoveHero } from '@/components/move/hero';
import { NetworkTrustBlock } from '@/components/move/network-trust-block';

/**
 * Homepage — SSR H1 in MoveHero is the LCP candidate.
 * Rhythm: Hero → tools → Map → Network → Playbook/FAQ → Footer.
 */
export async function HomePage({ mapSection, launchEntry }: { mapSection?: ReactNode; launchEntry?: ReactNode }) {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50/80 via-[#F7F8FA] to-[#EEF2F7] dark:from-primary/10 dark:via-background dark:to-background"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 top-0 h-[26rem] w-[26rem] rounded-full bg-primary/[0.09] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-move-soft/15 blur-3xl"
          aria-hidden
        />

        <div className="move-section-inner relative py-10 sm:py-12 md:py-16 lg:py-18">
          <MoveHero />
        </div>
      </section>

      {launchEntry ? <div className="border-b bg-muted/20 py-6">{launchEntry}</div> : null}

      {/* Quick tools — tight bridge between hero and map */}
      <div className="border-b border-border/50 bg-background">
        <div className="move-section-inner flex justify-center py-6 md:py-7">
          <TrustToolsBar className="justify-center" />
        </div>
      </div>

      {mapSection}

      <NetworkTrustBlock />

      <div className="content-auto">
        <HomeBelowFold />
      </div>
    </div>
  );
}
