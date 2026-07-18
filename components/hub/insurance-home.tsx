import Link from 'next/link';
import { ArrowRight, BookOpen, MapPin, Shield, Calculator } from 'lucide-react';
import { HubHeroBanner } from '@/components/hub/hub-hero-banner';
import { HubZipSearch } from '@/components/hub/hub-zip-search';
import { HubTrustBar } from '@/components/hub/hub-trust-bar';
import { HubHowItWorks } from '@/components/hub/hub-how-it-works';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { hubPath } from '@/lib/hub/paths';
import { HERO_TRUST_EYEBROW } from '@/lib/trust/site-messaging';

const FEATURED_HUBS = [
  {
    slug: 'miami-fort-lauderdale',
    stateSlug: 'florida',
    shortName: 'Miami–Fort Lauderdale',
    stateName: 'Florida',
    enrollmentHighlight: 'ACA marketplace and Medicare Advantage specialists across South Florida.',
  },
  {
    slug: 'dallas-fort-worth',
    stateSlug: 'texas',
    shortName: 'Dallas–Fort Worth',
    stateName: 'Texas',
    enrollmentHighlight: 'Employer and individual health plans with bilingual agent coverage.',
  },
  {
    slug: 'chicago',
    stateSlug: 'illinois',
    shortName: 'Chicago',
    stateName: 'Illinois',
    enrollmentHighlight: 'County-level ACA navigators and multi-line agency partners.',
  },
];

const FEATURED_ARTICLES = [
  {
    slug: 'how-to-choose-health-insurance-plan',
    title: 'How to Choose a Health Insurance Plan',
    description:
      'Compare metal tiers, networks, deductibles, premiums, and subsidies for 2026 coverage.',
  },
  {
    slug: 'understanding-aca-subsidies',
    title: 'Understanding ACA Subsidies',
    description: 'Estimate premium tax credits and metal-tier tradeoffs before enrollment.',
  },
  {
    slug: 'medicare-advantage-vs-medigap',
    title: 'Medicare Advantage vs. Medigap',
    description: 'Key differences for seniors evaluating supplemental coverage.',
  },
];

/** Adapted from insurance-trust-hub homepage — paths prefixed for /insurance */
export function InsuranceHomePage() {
  return (
    <>
      <HubHeroBanner
        hub="insurance"
        eyebrow={
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-700">
            <Shield className="h-4 w-4" aria-hidden="true" />
            {HERO_TRUST_EYEBROW}
          </div>
        }
        title={
          <h1 className="text-3xl font-semibold leading-[1.1] tracking-tighter sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Discover Honest Insurance Agents
            <br />
            <span className="text-emerald-600">in Your Market</span>
          </h1>
        }
        description="Transparent data, confident choices. Compare verified local insurance agents and agencies — with health insurance specialists (ACA, Medicare, employer plans) highlighted in every high-volume hub."
      >
        <div className="flex justify-center lg:justify-start">
          <HubZipSearch hub="insurance" />
        </div>
        <p className="text-sm text-muted-foreground">
          Trusted Local Agents · Verified Licensing · All 50 States & 3,000+ Counties
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
          <Button size="lg" asChild className="w-full gap-2 sm:w-auto">
            <Link href={hubPath('insurance', '/calculators')}>
              Explore Calculators <Calculator className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <Link href={hubPath('insurance', '/about')}>How We Verify Agents</Link>
          </Button>
        </div>
      </HubHeroBanner>

      <HubTrustBar
        items={[
          'State DOI License Verification',
          'NAIC Public Records',
          'BBB Ratings',
          'Transparent Methodology',
          'No Paid Placements',
        ]}
      />

      <HubHowItWorks
        heading="How It Works"
        steps={[
          {
            step: '01',
            title: 'Search Your Market',
            desc: 'Enter your ZIP to surface DOI-verified agents and health insurance specialists in your county or MSA.',
          },
          {
            step: '02',
            title: 'Compare Specialists',
            desc: 'Review licensing, carrier appointments, health-plan focus, and attributed client feedback.',
          },
          {
            step: '03',
            title: 'Enroll with Confidence',
            desc: 'Use calculators for premiums and subsidies, then connect with agents matched to your coverage needs.',
          },
        ]}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Health Insurance Hubs</h2>
              <p className="mt-2 text-muted-foreground max-w-xl">
                Verified market hubs featuring health insurance specialists in major MSAs.
                60% health emphasis + multi-line trusted partners.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href={hubPath('insurance', '/hubs')} className="gap-2">
                All hubs <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_HUBS.map((hub) => (
              <Link
                key={hub.slug}
                href={hubPath('insurance', `/hubs/${hub.stateSlug}/${hub.slug}`)}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg">{hub.shortName}</h3>
                        <p className="text-xs text-muted-foreground">{hub.stateName}</p>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">Health Hub</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {hub.enrollmentHighlight}
                    </p>
                    <p className="mt-3 text-xs text-primary font-medium flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Health specialists →
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold tracking-tight mb-8">Guides & Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={hubPath('insurance', `/resources/${article.slug}`)}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <BookOpen className="h-5 w-5 text-primary mb-3" />
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {article.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href={hubPath('insurance', '/resources')}>All resources</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-6">
        <p className="container mx-auto px-4 text-center text-xs text-muted-foreground max-w-3xl">
          Independent directory — not affiliated with listed carriers or agents. Licensing and
          enrollment data for research only; verify with your state Department of Insurance.
        </p>
      </section>
    </>
  );
}