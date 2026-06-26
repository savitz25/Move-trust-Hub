import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight, Scale } from 'lucide-react';
import { TrustBadges } from '@/components/trust/trust-badges';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { LocalMoverCard } from '@/components/local-movers/local-mover-card';
import { DestinationCalculatorEmbed } from '@/components/destinations/destination-calculator-embed';
import { DestinationMapSnippet } from '@/components/destinations/destination-map-snippet';
import { DestinationQuoteCta } from '@/components/destinations/destination-quote-cta';
import { DestinationInterstateCard } from '@/components/destinations/destination-interstate-card';
import { getMoversForMarket, countMoversForMarket } from '@/lib/destinations/get-movers-for-market';
import { getMarketMoversDirectoryHref } from '@/lib/destinations/market-paths';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { GrandStrandHubGrid } from '@/components/destinations/grand-strand-hub-grid';

import type { CityHubContent } from '@/lib/destinations/types';
import type { Market } from '@/lib/destinations/types';
import { getCompanyBySlugAsync } from '@/lib/data';

type Props = {
  market: Market;
  content: CityHubContent;
};

export async function CityHubTemplate({ market, content }: Props) {
  const destinationLabel = `${market.displayName}, ${market.stateCode}`;
  const localMovers = getMoversForMarket(market, 6);
  const totalMovers = countMoversForMarket(market);
  const featuredCompanies = (
    await Promise.all(
      content.featuredInterstateSlugs.map((slug) => getCompanyBySlugAsync(slug))
    )
  ).filter((company): company is NonNullable<typeof company> => Boolean(company));

  const clusterParent = market.clusterParent
    ? getMarketBySlug(market.clusterParent)
    : undefined;
  const moversDirectoryHref = getMarketMoversDirectoryHref(
    market,
    content.seo.canonicalPath
  );

  const countyLabels = market.primaryCounties.map((key) => {
    const parts = key.split('-');
    const state = parts.pop()?.toUpperCase() ?? '';
    const county = parts
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ');
    return `${county}, ${state}`;
  });

  return (
    <div className="min-h-screen">
      {/* §1 Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative border-b bg-gradient-to-b from-primary/5 to-background py-12 md:py-20"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <LocalMoversBreadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Popular Destinations', href: '/moving-to' },
              ...(clusterParent
                ? [{ label: clusterParent.displayName, href: `/moving-to/${clusterParent.slug}` }]
                : []),
              { label: `${market.displayName}, ${market.stateCode}` },
            ]}
          />

          <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Popular Destination · Updated 2026
          </div>

          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 max-w-4xl"
          >
            {content.h1}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-4">
            {content.heroSubheadline}
          </p>

          {content.introParagraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-4"
            >
              {paragraph}
            </p>
          ))}

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <DestinationQuoteCta market={market} />
            <Link
              href={`/moving-calculator?toZip=${market.defaultToZip}&dest=${market.slug}`}
              className="inline-flex items-center justify-center rounded-md border bg-card px-6 py-3 text-sm font-medium hover:border-primary/40 transition-colors"
            >
              Estimate My Move First
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <TrustBadges variant="compact" />
        </div>
      </section>

      {market.slug === 'myrtle-beach-sc' ? <GrandStrandHubGrid /> : null}

      {/* §2 Interactive Embeds */}
      <section
        id="move-calculator-embed"
        aria-labelledby="tools-heading"
        className="py-12 md:py-16 border-b"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <h2
            id="tools-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-2"
          >
            Estimate Your Move to {market.displayName}
            {market.slug === 'myrtle-beach-sc' ? ' or Wilmington' : ''}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Build your room-by-room inventory, then request quotes based on the same cubic
            footage every carrier sees.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <DestinationCalculatorEmbed market={market} />

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Popular Routes to {market.displayName}
                </h3>
                <ul className="space-y-2" role="list">
                  {content.routeLinks.map((route) => (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm hover:border-primary/40 hover:text-primary transition-colors"
                      >
                        <span>{route.label}</span>
                        <span className="text-muted-foreground text-xs">
                          {route.miles}
                          <ArrowRight className="inline h-3.5 w-3.5 ml-1" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <DestinationMapSnippet market={market} height={280} />
            </div>
          </div>
        </div>
      </section>

      {/* §3 Local Mover Directory */}
      <section aria-labelledby="movers-heading" className="py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2
                id="movers-heading"
                className="text-2xl md:text-3xl font-semibold tracking-tight mb-2"
              >
                Top Movers Serving {destinationLabel}
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl">
                Featured FMCSA-licensed interstate carriers plus vetted local movers from{' '}
                {countyLabels.join(', ')}. Independent directory — verify licensing yourself
                before booking.
              </p>
            </div>
            <Link
              href={moversDirectoryHref}
              className="text-sm font-medium text-primary hover:underline shrink-0"
            >
              View all {totalMovers}+ movers serving the area →
            </Link>
          </div>

          {featuredCompanies.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8" role="list">
              {featuredCompanies.map((company, index) => (
                <DestinationInterstateCard
                  key={company.slug}
                  company={company}
                  rank={index + 1}
                  areaLabel={countyLabels[index] ?? destinationLabel}
                />
              ))}
            </div>
          )}

          {localMovers.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mb-4">Local &amp; regional movers by county</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" role="list">
                {localMovers.slice(0, 3).map((entry, index) => (
                  <LocalMoverCard
                    key={entry.mover.id}
                    mover={entry.mover}
                    rank={index + 1}
                    countyLabel={entry.countyLabel}
                    stateCode={entry.stateCode}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* §4 Cost & Insights */}
      <section aria-labelledby="costs-heading" className="py-12 md:py-16 border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2
            id="costs-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-8"
          >
            Moving to {market.displayName}: Costs &amp; Inbound Insights
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full min-w-[600px] text-sm border rounded-xl overflow-hidden">
              <caption className="sr-only">
                Average interstate moving costs to {destinationLabel} by home size, 2026
              </caption>
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="text-left p-3 font-semibold">
                    Home Size
                  </th>
                  <th scope="col" className="text-left p-3 font-semibold">
                    Est. Cubic Ft.
                  </th>
                  <th scope="col" className="text-left p-3 font-semibold">
                    Cost Range (from Northeast/Midwest)
                  </th>
                  <th scope="col" className="text-left p-3 font-semibold">
                    Transit Days
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.costTableRows.map((row) => (
                  <tr key={row.homeSize} className="border-t">
                    <td className="p-3 font-medium">{row.homeSize}</td>
                    <td className="p-3 text-muted-foreground">{row.cubicFt}</td>
                    <td className="p-3">{row.costRange}</td>
                    <td className="p-3 text-muted-foreground">{row.transitDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            {content.costTableNote}
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {content.insightCards.map((card) => (
              <div key={card.title} className="rounded-xl border bg-card p-5">
                <h3 className="font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          {content.bodySections.map((section) => (
            <div key={section.heading} className="mb-10 max-w-3xl">
              <h3 className="text-xl font-semibold tracking-tight mb-3">{section.heading}</h3>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div className="rounded-xl border overflow-hidden">
            <Image
              src={content.seo.ogImagePath}
              alt={content.seo.ogImageAlt}
              width={1200}
              height={630}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* §5 Guides & Resources */}
      <section aria-labelledby="guides-heading" className="py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2
            id="guides-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-8"
          >
            {market.displayName} Moving Guides &amp; Resources
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {content.resourceLinks.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors"
              >
                <h3 className="font-semibold mb-1">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* §6 Testimonials */}
      <section aria-labelledby="reviews-heading" className="py-12 md:py-16 border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2
            id="reviews-heading"
            className="text-2xl font-semibold tracking-tight mb-8"
          >
            Families Who Moved to {market.displayName}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="rounded-xl border bg-card p-6"
              >
                <p className="text-muted-foreground leading-relaxed mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="text-sm font-medium">
                  {testimonial.name}
                  <div className="text-xs text-muted-foreground font-normal mt-1">
                    {testimonial.detail}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* §7 Comparison Teaser + CTA Footer */}
      <section
        aria-labelledby="cta-heading"
        className="py-14 md:py-20 bg-primary text-primary-foreground"
      >
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2
            id="cta-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-4"
          >
            Compare Movers Before You Commit
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Select up to 4 FMCSA-licensed carriers and compare reputation, reviews, and
            services side-by-side — then request matched quotes to {destinationLabel}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link
              href="/compare"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-background text-foreground px-6 py-3 text-sm font-medium hover:bg-background/90 transition-colors"
            >
              <Scale className="h-4 w-4" aria-hidden="true" />
              Open Compare Tool
            </Link>
            <DestinationQuoteCta
              market={market}
              variant="footer"
              label={`Get Free Personalized Quotes to ${market.displayName}`}
            />
          </div>
          <p className="text-xs text-primary-foreground/60">
            Independent directory · Not affiliated with listed movers ·{' '}
            <Link href="/about#disclaimer" className="underline">
              Disclaimer
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2
            id="faq-heading"
            className="text-2xl font-semibold tracking-tight mb-8"
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {content.faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border bg-card px-5 py-4"
              >
                <summary className="cursor-pointer font-semibold text-sm list-none flex items-center justify-between gap-4">
                  {item.question}
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden="true" />
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3 pt-3 border-t">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}