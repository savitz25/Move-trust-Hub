import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPin, Route } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArticleSchema } from '@/components/resources/article-schema';
import { GuideFooter } from '@/components/resources/guide-footer';
import { routeGuides } from '@/lib/resources/routes';

export const metadata = {
  title: 'Popular Interstate Moving Routes & Planning Guides',
  description:
    'Plan long-distance moves on popular corridors like California to Texas, New York to Florida, and coast-to-coast routes. Distance, timing, cost factors, and mover research tips.',
  openGraph: {
    title: 'Popular Interstate Moving Routes & Planning Guides',
    description: 'Route-specific planning guides for the most common interstate moving corridors in the United States.',
  },
  alternates: {
    canonical: 'https://www.movetrusthub.com/resources/routes',
  },
};

export default function RoutesHubPage() {
  return (
    <>
      <ArticleSchema
        title="Popular Interstate Moving Routes & Planning Guides"
        description="Route-specific planning guides for common long-distance moving corridors."
        path="/resources/routes"
      />

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to all resources
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="secondary">Route Guides</Badge>
          <span className="text-xs text-muted-foreground">{routeGuides.length} corridors covered</span>
        </div>

        <h1 className="text-4xl font-semibold tracking-tight mb-3">
          Popular Interstate Moving Routes
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          Moving between states? Start with the corridor that matches your relocation. Each guide covers typical distance, delivery timing, seasonal pricing, and how to compare{' '}
          <Link href="/companies" className="text-primary underline underline-offset-2">FMCSA-licensed movers</Link>
          {' '}using the same{' '}
          <Link href="/moving-calculator" className="text-primary underline underline-offset-2">inventory estimate</Link>.
        </p>

        <div className="grid gap-4">
          {routeGuides.map((route) => (
            <Card key={route.slug} className="hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-xl">
                    <Link href={`/resources/routes/${route.slug}`} className="hover:text-primary transition-colors">
                      {route.title}
                    </Link>
                  </CardTitle>
                  <Route className="h-5 w-5 text-primary shrink-0 mt-1" aria-hidden="true" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {route.distance}
                  </span>
                  <span>{route.deliveryWindow}</span>
                  <span>{route.avgCostRange}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{route.description}</p>
                <Link
                  href={`/resources/routes/${route.slug}`}
                  className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:underline"
                >
                  Read route guide <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <GuideFooter relatedSlugs={['how-to-choose', 'move-size-weight', 'fmcsa', 'scams', 'packing-checklist']} />
      </div>
    </>
  );
}