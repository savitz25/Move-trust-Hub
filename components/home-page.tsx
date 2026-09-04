import type { ReactNode } from 'react';
import Link from 'next/link';
import { HomeIntelEvents } from '@/components/home/home-intel-events';
import { HomeIntelHero } from '@/components/home/home-intel-hero';
import { HomePlanSection } from '@/components/home/home-plan-section';
import { HomePlaybook } from '@/components/home/home-playbook';
import { HomeToolsSection } from '@/components/home/home-tools-section';
import {
  HomeAskTheMarket,
  HomeSourcesSection,
  MoveNationalIntelligence,
} from '@/components/intelligence/MoveNationalIntelligence';
import { NetworkTrustBlock } from '@/components/move/network-trust-block';
import { FaqSection } from '@/components/seo/faq-section';
import { homepageFaqItems } from '@/lib/seo/schemas';
import type { MoveHomeIntelligencePayload } from '@/lib/intelligence/home-types';

/**
 * Intelligence-first homepage.
 * Rhythm: Hero → snapshot → findings → state browse → ask → plan → tools → sources → FAQ → network.
 */
export async function HomePage({
  payload,
  mapSection,
}: {
  payload: MoveHomeIntelligencePayload;
  mapSection?: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <HomeIntelEvents />
      <HomeIntelHero
        profileCount={payload.metrics.find((m) => m.id === 'dir_publishable_profiles')?.value ?? null}
      />
      <MoveNationalIntelligence payload={payload} />

      <div id="explore-states" className="scroll-mt-24">
        <div className="move-section-inner pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Explore the moving market
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0A2540] sm:text-4xl">
            Explore moving research by state
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Color on the map is a landing-page marker, not quality, ranking, or safety.
            Headquarters is not service territory.
          </p>
          <p className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/california"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary no-underline hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Explore California Moving Intelligence
            </Link>
            <Link
              href="/florida"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary no-underline hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Explore Florida Moving Intelligence
            </Link>
            <Link
              href="/new-jersey"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary no-underline hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Explore New Jersey Moving Intelligence
            </Link>
            <Link
              href="/texas"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary no-underline hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Explore Texas Moving Intelligence
            </Link>
          </p>
        </div>
        {mapSection}
      </div>

      <HomeAskTheMarket />
      <HomePlanSection />
      <HomeToolsSection />
      <HomePlaybook />
      <HomeSourcesSection payload={payload} />

      <div className="content-auto border-t">
        <FaqSection title="Frequently asked questions" items={homepageFaqItems} />
      </div>
      <NetworkTrustBlock />
    </div>
  );
}
