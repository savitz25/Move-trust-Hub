import Link from 'next/link';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { HubHeroBanner } from '@/components/hub/hub-hero-banner';
import { HubZipSearch } from '@/components/hub/hub-zip-search';
import { HubTrustBar } from '@/components/hub/hub-trust-bar';
import { HubHowItWorks } from '@/components/hub/hub-how-it-works';
import { LenderHeroCompanySearch } from '@/components/lender/lender-hero-company-search';
import { MortgageLenderDirectoryBoundary } from '@/components/lender/mortgage-lender-directory-boundary';
import { Button } from '@/components/ui/button';
import { hubPath } from '@/lib/hub/paths';
import { lenders } from '@/lib/lender/lenders';

/** Adapted from lender-trust-hub homepage — paths prefixed for /lender */
export function LenderHomePage() {
  return (
    <div>
      <HubHeroBanner
        hub="lender"
        eyebrow={
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            <Shield className="h-4 w-4" aria-hidden="true" />
            NMLS VERIFIED • ZERO PAID PLACEMENTS • COUNTY INSIGHTS
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
        <div className="mx-auto w-full max-w-xl space-y-4 lg:mx-0">
          <LenderHeroCompanySearch />
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wide">
              <span className="bg-background px-3 text-muted-foreground">or find by ZIP</span>
            </div>
          </div>
          <HubZipSearch hub="lender" className="w-full" placeholder="Enter ZIP for county lenders" />
        </div>
        <p className="text-sm text-muted-foreground">
          Search 647+ lenders by name • ZIP for county listings • NMLS verified
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

      <MortgageLenderDirectoryBoundary lenders={lenders} />

      <HubTrustBar
        items={[
          'NMLS License Verification',
          'CFPB Complaint Data',
          'BBB Accreditation',
          'County Experience Scores',
          'No Paid Placements',
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

      <section className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4">
            {[
              'NMLS License Verification',
              'CFPB Complaint Data',
              'BBB Accreditation',
              'Google & Trustpilot Reviews',
              'County Experience Scores',
              'No Paid Placements',
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full border bg-background px-4 py-2 text-sm"
              >
                <CheckCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="outline" asChild>
              <Link href={hubPath('lender', '/local-lenders')}>
                Browse local lenders by state <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={hubPath('lender', '/resources/how-to-choose-mortgage-lender')}>
                How to choose a lender <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}