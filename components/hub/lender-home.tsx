import Link from 'next/link';
import { Shield, ArrowRight } from 'lucide-react';
import { HubHeroBanner } from '@/components/hub/hub-hero-banner';
import { HubTrustBar } from '@/components/hub/hub-trust-bar';
import { HubHowItWorks } from '@/components/hub/hub-how-it-works';
import { LenderHeroSearch } from '@/components/lender/lender-hero-search';
import { LenderSearchBoundary } from '@/components/lender/lender-search-boundary';
import { LenderSearchResults } from '@/components/lender/lender-search-results';
import { LenderDirectoryLoader } from '@/components/lender/directory/LenderDirectoryLoader';
import { Button } from '@/components/ui/button';
import { hubPath } from '@/lib/hub/paths';
import { lenders } from '@/lib/lender/lenders';
import { HERO_TRUST_EYEBROW } from '@/lib/trust/site-messaging';

/** Adapted from lender-trust-hub homepage — paths prefixed for /lender */
export function LenderHomePage() {
  return (
    <LenderSearchBoundary lenders={lenders}>
      <div>
        <HubHeroBanner
          hub="lender"
          eyebrow={
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
              <Shield className="h-4 w-4" aria-hidden="true" />
              {HERO_TRUST_EYEBROW}
            </div>
          }
          title={
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Mortgage research for
              <br />
              <span className="text-[#3B82F6]">high-stakes financing decisions</span>
            </h1>
          }
          description="Lender Trust Hub helps you research NMLS-licensed mortgage lenders with public complaint and reputation signals — not a loan marketplace. Verify licensing yourself before you apply."
        >
          <LenderHeroSearch className="mx-auto max-w-xl lg:mx-0" />
          <p className="text-sm text-muted-foreground">
            NMLS Consumer Access · CFPB complaint data · County-level research · No paid placements
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Button size="lg" asChild className="w-full gap-2 sm:w-auto">
              <Link href={hubPath('lender', '/calculators')}>
                Mortgage calculators <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href={hubPath('lender', '/about')}>How we verify lenders</Link>
            </Button>
          </div>
        </HubHeroBanner>

        {/* Name-search hits from hero only (ZIP still routes to county). No more Top-12 preview. */}
        <LenderSearchResults showPreview={false} />

        {/* Same progressive 3-column directory as /lender/local-lenders */}
        <section
          id="lender-directory"
          className="border-t border-zinc-200 bg-white py-10 md:py-14"
          aria-labelledby="lender-directory-heading"
        >
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[2px] text-[#3B82F6]">
                Comprehensive Directory
              </div>
              <h2
                id="lender-directory-heading"
                className="mt-1 text-3xl font-semibold tracking-tight text-[#0A2540] md:text-4xl"
              >
                Compare Verified Mortgage Lenders
              </h2>
              <p className="mt-2 max-w-2xl text-zinc-600">
                {lenders.length.toLocaleString()}+ NMLS-verified lenders and brokers. Browse the full
                directory with filters, sort, and progressive load — the same experience as our
                local-lenders hub.
              </p>
            </div>

            <LenderDirectoryLoader
              lenders={lenders}
              profileReturnPath="/lender"
              showSearch
            />
          </div>
        </section>

        <HubTrustBar
          items={[
            'NMLS License Verification',
            'CFPB Complaint Data',
            'BBB Accreditation',
            'County Experience Scores',
          ]}
        />

        <HubHowItWorks
          subheading="Mortgage research workflow"
          heading="How Lender Trust Hub works"
          steps={[
            {
              step: '01',
              title: 'Locate licensed lenders',
              desc: 'Start with your ZIP or county to find NMLS Consumer Access–listed mortgage lenders and brokers active in that market.',
            },
            {
              step: '02',
              title: 'Cross-check public risk signals',
              desc: 'Review CFPB complaint patterns, BBB standing where available, and attributed reputation data before you share a full application.',
            },
            {
              step: '03',
              title: 'Model payments, then contact carefully',
              desc: 'Use mortgage calculators for educational payment ranges, then contact lenders you choose — we do not broker loans or sell leads.',
            },
          ]}
        />
      </div>
    </LenderSearchBoundary>
  );
}
