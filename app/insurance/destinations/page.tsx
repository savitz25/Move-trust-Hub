import Link from 'next/link';
import type { Metadata } from 'next';
import { MapPin, ArrowRight } from 'lucide-react';
import { DESTINATION_STATES } from '@/lib/insurance/destinations/data';
import { HubSectionPage } from '@/components/hub/templates';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { hubSectionBreadcrumbs } from '@/lib/hub/templates/breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = buildTemplateMetadata({
  hub: 'insurance',
  title: 'Insurance by Destination — State & City Guides for Movers',
  description:
    'Explore insurance landscapes, moving guidance, and local agency directories for popular U.S. destinations.',
  path: '/destinations',
});

export default function DestinationsPage() {
  return (
    <HubSectionPage
      hub="insurance"
      eyebrow="Insurance Trust Hub · Destinations"
      title="Insurance destinations"
      description="Moving to a new state? Each destination guide covers local insurance risks, average premiums, and licensed agencies serving the area. Educational content only — always verify rates with licensed agents."
      path="/destinations"
      breadcrumbs={hubSectionBreadcrumbs('insurance', 'Destinations')}
      primaryCta={{ href: '/insurance/directory', label: 'Agency directory' }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-2">
          {DESTINATION_STATES.map((state) => (
            <Link key={state.slug} href={`/insurance/destinations/${state.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{state.name}</h2>
                        <span className="text-xs font-medium text-muted-foreground">{state.code}</span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-primary">{state.tagline}</p>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {state.description}
                      </p>
                      <p className="mt-3 text-xs font-medium text-primary">
                        {state.cities.length} city guides available
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/insurance/directory">
              Browse all agencies <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </HubSectionPage>
  );
}