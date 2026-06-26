import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  getSortedClusterMarkets,
  getMarketPath,
  type Market,
} from '@/lib/destinations/markets';

/** Cluster parents with a dedicated state-level hub page (not in cityHubContentBySlug). */
const LIVE_CLUSTER_PARENT_SLUGS = new Set([
  'florida',
  'tennessee',
  'texas',
  'south-carolina',
  'north-carolina',
  'idaho',
  'oregon',
  'oklahoma',
  'arizona',
  'arkansas',
  'california',
  'alabama',
]);

type Props = {
  market: Market;
  publishedSlugs: Set<string>;
};

export function DestinationClusterCard({ market, publishedSlugs }: Props) {
  const path = getMarketPath(market);
  const hasParentHubPage =
    market.isClusterParent && LIVE_CLUSTER_PARENT_SLUGS.has(market.slug);
  const isCityHubLive = publishedSlugs.has(market.slug);
  const subCities = market.isClusterParent ? getSortedClusterMarkets(market.slug) : [];
  const hasLiveSubCity = subCities.some((sub) => publishedSlugs.has(sub.slug));
  const isClusterActive =
    isCityHubLive || hasParentHubPage || (market.isClusterParent && hasLiveSubCity);
  const clusterCtaLabel =
    isCityHubLive ? 'View guide' : hasParentHubPage || hasLiveSubCity ? 'View cluster' : 'View guide';

  return (
    <div className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="font-semibold text-lg">
          {isClusterActive ? (
            <Link href={path} className="hover:text-primary transition-colors">
              {market.displayName}
              {market.stateCode ? `, ${market.stateCode}` : ''}
            </Link>
          ) : (
            <span>
              {market.displayName}
              {market.stateCode ? `, ${market.stateCode}` : ''}
            </span>
          )}
        </h2>
        {isClusterActive ? (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 shrink-0">
            {isCityHubLive ? 'Live' : 'Partial'}
          </span>
        ) : (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground shrink-0">
            Soon
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-3">{market.inboundGrowthStat}</p>

      {isClusterActive ? (
        <Link
          href={path}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {clusterCtaLabel}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      ) : null}

      {subCities.length > 0 && (
        <ul
          className="mt-3 pt-3 border-t text-xs space-y-1.5"
          aria-label={`${market.displayName} sub-city guides`}
        >
          {subCities.map((sub) => {
            const subPath = getMarketPath(sub);
            const subLive = publishedSlugs.has(sub.slug);

            return (
              <li key={sub.slug}>
                {subLive ? (
                  <Link
                    href={subPath}
                    prefetch={false}
                    className="text-primary hover:underline font-medium"
                    aria-label={`${sub.displayName}, ${sub.stateCode} — live city guide`}
                  >
                    {sub.displayName}
                  </Link>
                ) : (
                  <span
                    className="text-muted-foreground"
                    aria-label={`${sub.displayName}, ${sub.stateCode} — city guide coming soon`}
                  >
                    {sub.displayName}
                    <span className="text-[10px] uppercase tracking-wide ml-1.5 text-muted-foreground/70">
                      (soon)
                    </span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}