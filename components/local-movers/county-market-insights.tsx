import Link from 'next/link';
import { MapPin, Route, TrendingUp } from 'lucide-react';
import type { CountyMarketInsights } from '@/lib/local-movers/county-market-insights';
import type { StateRouteLink } from '@/lib/local-movers/state-route-links';

type Props = {
  countyLabel: string;
  stateName: string;
  stateCode: string;
  insights: CountyMarketInsights;
  outboundRoutes?: StateRouteLink[];
  inboundRoutes?: StateRouteLink[];
};

export function CountyMarketInsightsPanel({
  countyLabel,
  stateName,
  stateCode,
  insights,
  outboundRoutes = [],
  inboundRoutes = [],
}: Props) {
  if (insights.moverCount === 0) return null;

  return (
    <section
      className="mb-10 rounded-2xl border bg-gradient-to-br from-primary/5 to-background p-6"
      aria-labelledby="county-insights-heading"
    >
      <h2
        id="county-insights-heading"
        className="text-xl font-semibold tracking-tight mb-4 flex items-center gap-2"
      >
        <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
        {countyLabel} moving market snapshot
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <div className="rounded-xl border bg-card p-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Verified movers
          </div>
          <div className="text-2xl font-semibold tabular-nums">{insights.moverCount}</div>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Avg. rating
          </div>
          <div className="text-2xl font-semibold tabular-nums">
            {insights.avgRating > 0 ? `${insights.avgRating}★` : '—'}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {insights.editorialReviewVolume.toLocaleString()} industry-reported (third-party)
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            USDOT on file
          </div>
          <div className="text-2xl font-semibold tabular-nums">
            {insights.usdotVerifiedCount}/{insights.moverCount}
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Attributed reviews
          </div>
          <div className="text-2xl font-semibold tabular-nums">
            {insights.attributableReviewCount}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">Directory-linked Google</div>
        </div>
      </div>

      {insights.topServices.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Popular services in {countyLabel}</div>
          <div className="flex flex-wrap gap-2">
            {insights.topServices.map((service) => (
              <span
                key={service}
                className="inline-flex rounded-full border bg-background px-3 py-1 text-xs font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}

      {insights.costSnapshot && (
        <div className="mb-5 rounded-xl border bg-muted/20 p-4">
          <div className="text-sm font-medium mb-2">Local cost snapshot ({countyLabel})</div>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">Studio / 1BR</div>
              <div className="font-medium">{insights.costSnapshot.studioRange}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">3–4+ BR home</div>
              <div className="font-medium">{insights.costSnapshot.familyRange}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Typical crew rate</div>
              <div className="font-medium">{insights.costSnapshot.avgHourly}</div>
            </div>
          </div>
          {insights.seasonalAdvice && (
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              <span className="font-medium text-foreground">Seasonal note:</span>{' '}
              {insights.seasonalAdvice}
            </p>
          )}
        </div>
      )}

      {insights.migrationSnippet && (
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 rounded-lg border bg-card px-4 py-3">
          <span className="font-medium text-foreground">Migration trend:</span>{' '}
          {insights.migrationSnippet}
        </p>
      )}

      {insights.localChallenges.length > 0 && (
        <div className="mb-5">
          <div className="text-sm font-medium mb-2 flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            Local moving considerations
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {insights.localChallenges.map((challenge) => (
              <li key={challenge.slice(0, 48)} className="flex items-start gap-2 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      )}

      {insights.parkingHoaNotes.length > 0 && (
        <div className="mb-5 rounded-lg border border-amber-200/60 bg-amber-50/40 px-4 py-3">
          <div className="text-sm font-medium mb-2">Parking, HOA &amp; building rules</div>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {insights.parkingHoaNotes.map((note) => (
              <li key={note.slice(0, 48)} className="leading-relaxed">
                • {note}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(outboundRoutes.length > 0 || inboundRoutes.length > 0) && (
        <div className="rounded-xl border bg-muted/20 p-4">
          <div className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Route className="h-4 w-4 text-primary" aria-hidden="true" />
            Popular interstate routes {stateCode ? `involving ${stateName}` : ''}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {outboundRoutes.length > 0 && (
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Leaving {stateName}
                </div>
                <ul className="space-y-2 text-sm">
                  {outboundRoutes.map((route) => (
                    <li key={route.slug}>
                      <Link
                        href={route.href}
                        className="text-primary font-medium hover:underline"
                      >
                        {route.label}
                      </Link>
                      <span className="block text-xs text-muted-foreground">
                        {route.avgCostRange}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {inboundRoutes.length > 0 && (
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Moving to {stateName}
                </div>
                <ul className="space-y-2 text-sm">
                  {inboundRoutes.map((route) => (
                    <li key={route.slug}>
                      <Link
                        href={route.href}
                        className="text-primary font-medium hover:underline"
                      >
                        {route.label}
                      </Link>
                      <span className="block text-xs text-muted-foreground">
                        {route.avgCostRange}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Link
            href="/resources/routes"
            className="inline-block text-xs text-primary font-medium hover:underline mt-3"
          >
            Browse all route guides →
          </Link>
        </div>
      )}
    </section>
  );
}