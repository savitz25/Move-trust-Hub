import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import {
  getAllDestinationSlugs,
  getDestinationBySlug,
} from '@/lib/insurance/destinations/data';
import { searchProviders } from '@/lib/insurance/providers/queries';
import { StateGuideTemplate } from '@/components/hub/templates';
import { destinationToStateGuideData } from '@/lib/hub/templates/adapters';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { ProviderCard } from '@/components/insurance/provider-card';
import { Card, CardContent } from '@/components/insurance/ui/card';

interface StatePageProps {
  params: Promise<{ state: string }>;
}

export function generateStaticParams() {
  return getAllDestinationSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const { state: slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return { title: 'Destination Not Found' };

  return buildTemplateMetadata({
    hub: 'insurance',
    title: `${dest.name} Insurance Guide — Coverage, Costs & Local Agents`,
    description: dest.description,
    path: `/destinations/${slug}`,
    keywords: [`${dest.name} insurance`, `${dest.code} insurance agents`, 'moving insurance'],
  });
}

export default async function StateDestinationPage({ params }: StatePageProps) {
  const { state: slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  const { providers } = await searchProviders({
    state: dest.code,
    limit: 6,
    verifiedOnly: false,
  });

  return (
    <StateGuideTemplate hub="insurance" state={destinationToStateGuideData(dest)}>
      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">Cities in {dest.name}</h2>
          <Link href="/insurance/destinations" className="text-sm text-primary hover:underline">
            All destinations
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dest.cities.map((city) => (
            <Link key={city.slug} href={`/insurance/destinations/${dest.slug}/${city.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    <h3 className="font-semibold">{city.name}</h3>
                  </div>
                  {city.population ? (
                    <p className="mt-1 text-xs text-muted-foreground">Pop. {city.population}</p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {city.highlights.slice(0, 2).map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">Local insurance agencies</h2>
        {providers.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No agencies listed yet.{' '}
            <Link href="/insurance/directory" className="text-primary hover:underline">
              Browse the full directory
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </section>
    </StateGuideTemplate>
  );
}