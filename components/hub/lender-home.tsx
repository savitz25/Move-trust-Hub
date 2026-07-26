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
              Discover Honest Lenders
              <br />
              <span className="text-[#3B82F6]">in Your County</span>
            </h1>
          }
          description="Transparent data, confident choices. Compare verified local mortgage lenders and brokers backed by NMLS licensing, CFPB complaints, BBB ratings, and real reviews."
        >
          <LenderHeroSearch className="mx-auto max-w-xl lg:mx-0" />
          <p className="text-sm text-muted-foreground">
            Trusted Local Lenders • Verified County Insights • National Expertise
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Button size="lg" asChild className="w-full gap-2 sm:w-auto">
              <Link href={hubPath('lender', '/calculators')}>
                Try Free Calculators <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href={hubPath('lender', '/about')}>How We Verify Lenders</Link>
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
          subheading="Your Path to the Right Lender"
          heading="How It Works"
          steps={[
            {
              step: '01',
              title: 'Search Your County',
              desc: 'Enter your ZIP code to auto-detect your county and see ranked local lenders with county-specific experience scores.',
            },
            {
              step: '02',
              title: 'Compare & Verify',
              desc: 'Review NMLS licensing, CFPB complaints, BBB ratings, Google/Trustpilot reviews, and local loan performance metrics.',
            },
            {
              step: '03',
              title: 'Connect with Confidence',
              desc: 'Use our calculators to understand your numbers, then match with lenders that fit your loan type and credit profile.',
            },
          ]}
        />
      </div>
    </LenderSearchBoundary>
  );
}
