import Link from 'next/link';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { HubZipSearch } from '@/components/hub/hub-zip-search';
import { HubTrustBar } from '@/components/hub/hub-trust-bar';
import { HubHowItWorks } from '@/components/hub/hub-how-it-works';
import { Button } from '@/components/ui/button';
import { hubPath } from '@/lib/hub/paths';

/** Adapted from lender-trust-hub homepage — paths prefixed for /lender */
export function LenderHomePage() {
  return (
    <div>
      <section className="relative border-b bg-gradient-to-br from-[#0A2540]/5 via-background to-emerald-500/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
              <Shield className="h-4 w-4" aria-hidden="true" />
              NMLS VERIFIED • ZERO PAID PLACEMENTS • COUNTY INSIGHTS
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Discover Honest Lenders
              <br />
              <span className="text-[#3B82F6]">in Your County</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Transparent data, confident choices. Compare verified local mortgage lenders
              and brokers backed by NMLS licensing, CFPB complaints, BBB ratings, and
              real reviews.
            </p>

            <HubZipSearch hub="lender" className="mx-auto mb-6 max-w-xl" />

            <p className="mb-8 text-sm text-muted-foreground">
              Trusted Local Lenders • Verified County Insights • National Expertise
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="gap-2">
                <Link href={hubPath('lender', '/calculators')}>
                  Try Free Calculators <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={hubPath('lender', '/about')}>How We Verify Lenders</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link href={hubPath('lender', '/local-lenders')}>
                Browse local lenders by state <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}