import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrustBadges } from '@/components/trust/trust-badges';
import { TestimonialsSection } from '@/components/trust/testimonials-section';
import { PageHeroCta } from '@/components/conversion/page-hero-cta';
import { destinationGuides } from '@/lib/resources/destination-guides';
import { guidesByCategory } from '@/lib/resources/guides';
import { routeGuides } from '@/lib/resources/routes';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';

export const metadata = {
  title: 'Moving Resources & Guides | How to Choose an Interstate Mover',
  description:
    'Free moving guides: route planning, how to choose a mover, scam avoidance, FMCSA licensing, packing checklists, and interstate moving timelines.',
  alternates: {
    canonical: `${SITE_URL}/resources`,
  },
  openGraph: buildOpenGraph({
    title: 'Moving Resources & Guides',
    description:
      'Free moving guides: route planning, how to choose a mover, scam avoidance, FMCSA licensing, and interstate moving timelines.',
    url: `${SITE_URL}/resources`,
  }),
  twitter: buildTwitter({
    title: 'Moving Resources & Guides',
    description: 'Free interstate moving guides, route planners, and cost research.',
  }),
};

const categoryOrder = ['Planning', 'Buying Guide', 'Routes', 'Safety', 'Regulation', 'Checklist'];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-4xl font-semibold tracking-tight mb-2">Moving Resources &amp; Guides</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Free, unbiased guides for interstate moves. Research movers with{' '}
        <Link href="/companies" className="text-primary underline underline-offset-2">verified reviews</Link>
        , estimate volume in our{' '}
        <Link href="/moving-calculator" className="text-primary underline underline-offset-2">moving calculator</Link>
        , explore{' '}
        <Link href="/resources/routes" className="text-primary underline underline-offset-2">popular route guides</Link>
        , find{' '}
        <Link href="/local-movers" className="text-primary underline underline-offset-2">local movers by county</Link>
        , or{' '}
        <Link href="/" className="text-primary underline underline-offset-2">request free quotes</Link>.
      </p>

      <PageHeroCta
        quoteLabel="Get Free Moving Quotes"
        calculatorHref="/moving-calculator"
        prefilledData={{ notes: 'Resources hub — quote request' }}
      />

      <TrustBadges variant="grid" className="mb-10 mt-8" />

      {categoryOrder.map((category) => {
        const items = guidesByCategory[category];
        if (!items?.length) return null;

        return (
          <section key={category} className="mb-10">
            <h2 className="text-xl font-semibold tracking-tight mb-4">{category}</h2>
            <div className="grid gap-4">
              {items.map((guide) => (
                <Card key={guide.slug} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-xl">
                        <Link href={guide.href}>{guide.title}</Link>
                      </CardTitle>
                      <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
                        {guide.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{guide.excerpt}</p>
                    <Link href={guide.href} className="text-primary text-sm font-medium mt-3 inline-block">
                      Read full guide →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mb-10 border-t pt-10">
        <h2 className="text-xl font-semibold tracking-tight mb-2">
          <Link href="/local-movers" className="hover:text-primary transition-colors">
            Local Movers by County
          </Link>
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          County-level guides across all 50 states with 3–5 vetted local movers, cost
          estimates, and moving tips for your area.
        </p>
        <Link
          href="/local-movers"
          className="inline-flex items-center rounded-lg border px-4 py-3 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
        >
          Browse local movers near you →
        </Link>
      </section>

      <section className="mb-10 border-t pt-10">
        <h2 className="text-xl font-semibold tracking-tight mb-2">Destination Moving Guides</h2>
        <p className="text-sm text-muted-foreground mb-4">
          In-depth editorial guides for popular inbound relocation markets — neighborhoods,
          timing, and mover-vetting checklists.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {destinationGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/resources/guides/${guide.slug}`}
              prefetch={false}
              className="rounded-lg border px-4 py-3 text-sm hover:border-primary/40 hover:text-primary transition-colors"
            >
              <span className="font-medium">{guide.title}</span>
              <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-2">
                {guide.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10 border-t pt-10">
        <h2 className="text-xl font-semibold tracking-tight mb-2">
          <Link href="/resources/routes" className="hover:text-primary transition-colors">
            Popular Interstate Route Guides
          </Link>
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Corridor-specific planning for the most common long-distance moves.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {routeGuides.map((route) => (
            <Link
              key={route.slug}
              href={`/resources/routes/${route.slug}`}
              className="rounded-lg border px-4 py-3 text-sm hover:border-primary/40 hover:text-primary transition-colors"
            >
              <span className="font-medium">{route.from} → {route.to}</span>
              <span className="block text-xs text-muted-foreground mt-0.5">{route.distance}</span>
            </Link>
          ))}
        </div>
        <Link href="/resources/routes" className="text-primary text-sm font-medium mt-4 inline-block">
          View all route guides →
        </Link>
      </section>

      <div id="fmcsa" className="mt-12 border-t pt-8">
        <h2 className="font-semibold mb-3">
          <Link href="/resources/fmcsa" className="hover:text-primary">Quick FMCSA Tips</Link>
        </h2>
        <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
          <li>Always ask for the mover&apos;s USDOT and MC numbers and look them up yourself on fmcsa.dot.gov.</li>
          <li>Prefer companies with “Satisfactory” safety rating and low complaint-to-shipment ratios.</li>
          <li>Brokers must be registered. If a company only brokers your move, they still need proper authority.</li>
          <li>Get everything in writing — especially pickup/delivery windows and valuation options.</li>
        </ul>
      </div>

      <div id="scams" className="mt-8">
        <h2 className="font-semibold mb-3">
          <Link href="/resources/scams" className="hover:text-primary">Common Scam Warnings</Link>
        </h2>
        <div className="text-sm text-muted-foreground space-y-1.5">
          <p>• Extremely lowball quotes (30-50% under everyone else)</p>
          <p>• No physical address or only a P.O. Box</p>
          <p>• Demands large deposit via wire, Venmo, or gift cards</p>
          <p>• Refuses to do in-home estimate or video survey</p>
          <p>• Changes price dramatically on delivery day</p>
        </div>
      </div>

      <TestimonialsSection
        title="Trusted by Families Planning Interstate Moves"
        subtitle="Real experiences from customers who used our guides, calculator, and directory before booking."
        className="mt-12 border rounded-xl"
        columns={2}
      />

      <div id="checklist" className="mt-8">
        <h2 className="font-semibold mb-3">
          <Link href="/resources/checklist" className="hover:text-primary">Interstate Moving Timeline</Link>
          {' · '}
          <Link href="/resources/packing-checklist" className="hover:text-primary">Packing Checklist</Link>
        </h2>
        <div className="text-sm grid sm:grid-cols-2 gap-x-8 text-muted-foreground">
          <ul className="list-disc pl-5 space-y-0.5">
            <li>8 weeks: Research &amp; get 3+ written estimates</li>
            <li>6 weeks: Book your mover + confirm dates</li>
            <li>4 weeks: Notify utilities, schools, change address</li>
          </ul>
          <ul className="list-disc pl-5 space-y-0.5 mt-4 sm:mt-0">
            <li>2 weeks: Pack non-essentials, confirm inventory</li>
            <li>Move week: Confirm arrival window daily</li>
            <li>Delivery: Inspect, note damage, file claims within 9 months</li>
          </ul>
        </div>
      </div>
    </div>
  );
}