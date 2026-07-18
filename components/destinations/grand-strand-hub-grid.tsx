import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { grandStrandCities } from '@/lib/destinations/content/grand-strand-cluster';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { getMarketBySlug, getMarketPath } from '@/lib/destinations/markets';

type Props = {
  heading?: string;
  description?: string;
};

export function GrandStrandHubGrid({
  heading = 'Explore the Grand Strand — City Guides',
  description = 'City guides covering North Myrtle Beach through Murrells Inlet. Each includes 2026–2027 cost tables, calculator prefill, Horry & Georgetown county movers, and trusted mover research tools.',
}: Props) {
  const published = new Set(getPublishedCityHubSlugs());

  return (
    <section aria-labelledby="grand-strand-heading" className="py-12 md:py-16 border-b bg-muted/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2
          id="grand-strand-heading"
          className="text-2xl md:text-3xl font-semibold tracking-tight mb-2"
        >
          {heading}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-3xl">{description}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {grandStrandCities.map((city) => {
            const market = getMarketBySlug(city.slug);
            const isPublished = published.has(city.slug);
            const path = market
              ? getMarketPath(market)
              : `/moving-to/south-carolina/${city.slug}`;

            return (
              <div
                key={city.slug}
                className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors"
              >
                <h3 className="font-semibold text-sm leading-snug mb-2">
                  {isPublished ? (
                    <Link href={path} className="hover:text-primary transition-colors">
                      {city.displayName}, SC
                    </Link>
                  ) : (
                    <span>{city.displayName}, SC</span>
                  )}
                </h3>
                <p className="text-xs text-muted-foreground mb-1">ZIP {city.zip}</p>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{city.tagline}</p>
                {isPublished && market ? (
                  <div className="flex flex-col gap-1">
                    <Link
                      href={path}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      View guide
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                    <Link
                      href={`/moving-calculator?toZip=${market.defaultToZip}&dest=${market.slug}`}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      Open calculator
                    </Link>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}