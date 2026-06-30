import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, MapPin, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BasicRouteGuideSchema } from '@/components/resources/basic-route-guide-schema';
import { ExtendedRouteGuide } from '@/components/resources/extended-route-guide';
import { RouteGuideSchema } from '@/components/resources/route-guide-schema';
import { EditorialTeamPanel } from '@/components/trust/editorial-team-panel';
import { HowWeScorePanel } from '@/components/trust/how-we-score-panel';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { GuideFooter } from '@/components/resources/guide-footer';
import { RouteHeroCta } from '@/components/resources/route-hero-cta';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';
import { getStateSlugFromCode } from '@/lib/local-movers/index';
import { getExtendedRouteGuide } from '@/lib/resources/routes/content';
import { getRouteGuide, routeGuides } from '@/lib/resources/routes';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return routeGuides.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const route = getRouteGuide(slug);
  if (!route) return {};

  const extended = getExtendedRouteGuide(slug);

  const canonical = `${SITE_URL}/resources/routes/${route.slug}`;

  if (extended) {
    return {
      title: extended.seo.title,
      description: extended.seo.description,
      keywords: extended.seo.keywords,
      openGraph: buildOpenGraph({
        title: extended.seo.title,
        description: extended.seo.description,
        url: canonical,
        type: 'article',
      }),
      twitter: buildTwitter({
        title: extended.seo.title,
        description: extended.seo.description,
      }),
      alternates: { canonical },
    };
  }

  const title = `${route.title} — Interstate Moving Route Guide`;
  const description = `Plan your ${route.from} to ${route.to} move: ${route.distance}, ${route.deliveryWindow}, cost factors, and how to compare licensed long-distance movers.`;

  return {
    title,
    description,
    openGraph: buildOpenGraph({ title, description, url: canonical, type: 'article' }),
    twitter: buildTwitter({ title, description }),
    alternates: { canonical },
  };
}

export default async function RouteGuidePage({ params }: Props) {
  const { slug } = await params;
  const route = getRouteGuide(slug);
  if (!route) notFound();

  const extended = getExtendedRouteGuide(slug);

  const related = route.relatedRoutes
    .map((s) => getRouteGuide(s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const fromStateSlug = getStateSlugFromCode(route.fromState);
  const toStateSlug = getStateSlugFromCode(route.toState);

  return (
    <>
      {extended ? (
        <RouteGuideSchema route={route} content={extended} path={`/resources/routes/${route.slug}`} />
      ) : (
        <BasicRouteGuideSchema
          route={route}
          path={`/resources/routes/${route.slug}`}
        />
      )}

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Link
          href="/resources/routes"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All route guides
        </Link>

        <Badge variant="secondary" className="mb-4">
          {route.fromState} → {route.toState}
        </Badge>

        <h1 className="text-4xl font-semibold tracking-tight mb-4">{route.title}</h1>

        <RouteHeroCta
          from={route.from}
          to={route.to}
          destinationHubPath={route.destinationHubPath}
        />

        <TrustToolsBar className="mb-6" />

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { label: 'Typical Distance', value: route.distance },
            { label: 'Transit Time', value: route.driveTime },
            { label: 'Cost Range', value: route.avgCostRange },
            { label: 'Peak Season', value: route.peakSeason },
            { label: 'Delivery Window', value: route.deliveryWindow },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border bg-card p-4">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                {item.label}
              </div>
              <div className="text-sm font-medium leading-snug">{item.value}</div>
            </div>
          ))}
        </div>

        {extended ? (
          <ExtendedRouteGuide content={extended} route={route} />
        ) : (
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{route.description}</p>
        )}

        <section className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">Planning Tips for This Route</h2>
          <ul className="space-y-2 text-muted-foreground">
            {route.planningTips.map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">What Affects Your Price</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
            {route.costFactors.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        </section>

        <section className="mb-10 rounded-xl border bg-muted/30 p-6">
          <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
            Popular City Pairs on This Corridor
          </h2>
          <ul className="space-y-2 text-sm">
            {route.popularCorridorLinks?.length
              ? route.popularCorridorLinks.map((corridor) => (
                  <li key={corridor.slug}>
                    <Link
                      href={`/resources/routes/${corridor.slug}`}
                      className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
                    >
                      {corridor.label}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))
              : route.popularCorridors.map((corridor) => (
                  <li key={corridor} className="text-muted-foreground">
                    {corridor}
                  </li>
                ))}
          </ul>
        </section>

        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold tracking-tight mb-3">Related Route Guides</h2>
            <div className="flex flex-wrap gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/resources/routes/${r.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm hover:border-primary/40 hover:text-primary transition-colors"
                >
                  {r.from} → {r.to}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {(fromStateSlug || toStateSlug) && (
          <section className="mb-10 rounded-xl border bg-muted/30 p-6">
            <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
              Local movers on this route
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Need help packing or loading before your interstate move? Browse county-level
              local mover guides at your origin or destination:
            </p>
            <div className="flex flex-wrap gap-3">
              {fromStateSlug && (
                <Link
                  href={`/local-movers/${fromStateSlug}`}
                  className="inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1.5 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
                >
                  Local movers in {route.from}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              )}
              {toStateSlug && (
                <Link
                  href={`/local-movers/${toStateSlug}`}
                  className="inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1.5 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
                >
                  Local movers in {route.to}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              )}
              <Link
                href="/local-movers"
                className="inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1.5 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
              >
                All 50 states
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              {route.destinationHubPath && (
                <Link
                  href={route.destinationHubPath}
                  className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary hover:border-primary/50 transition-colors"
                >
                  Destination city guide
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>
          </section>
        )}

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-10">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="font-semibold mb-2">
                Estimate &amp; compare movers for {route.from} → {route.to}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Build your room-by-room inventory in our{' '}
                <Link href="/moving-calculator" className="text-primary underline underline-offset-2">
                  moving calculator
                </Link>
                , then browse{' '}
                <Link href="/companies" className="text-primary underline underline-offset-2">
                  FMCSA-licensed interstate carriers
                </Link>{' '}
                or{' '}
                <Link href="/compare" className="text-primary underline underline-offset-2">
                  compare up to 4 movers side-by-side
                </Link>
                .
              </p>
              <Link
                href="/moving-calculator"
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Open Moving Calculator
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <HowWeScorePanel className="mb-10" compact />

        <EditorialTeamPanel contentType="route" className="mb-10" compact />

        <GuideFooter
          relatedSlugs={['how-to-choose', 'move-size-weight', 'interstate-moving-costs', 'scams', 'packing-checklist']}
          prefilledNotes={`Route guide quote: ${route.from} to ${route.to}`}
        />
      </div>
    </>
  );
}