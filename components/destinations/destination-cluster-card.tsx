import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  getSortedClusterMarkets,
  getMarketPath,
} from '@/lib/destinations/markets';
import type { Market } from '@/lib/destinations/types';

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
  'virginia',
  'west-virginia',
  'pennsylvania',
  'new-jersey',
  'new-york',
  'massachusetts',
  'rhode-island',
  'vermont',
  'new-hampshire',
  'maine',
  'indiana',
  'georgia',
  'ohio',
  'illinois',
  'louisiana',
  'mississippi',
  'alaska',
  'new-mexico',
  'hawaii',
  'colorado',
  'connecticut',
  'delaware',
  'iowa',
  'kansas',
  'kentucky',
  'maryland',
  'minnesota',
  'missouri',
  'montana',
  'nebraska',
  'nevada',
  'north-dakota',
  'south-dakota',
  'utah',
  'washington',
  'wisconsin',
  'wyoming',
]);

type Props = {
  market: Market;
  publishedSlugs: Set<string>;
};

export function DestinationClusterCard({ market, publishedSlugs }: Props) {
  const path = getMarketPath(market);
  const hasParentHubPage =
    market.isClusterParent && LIVE_CLUSTER_PARENT_SLUGS.has(market.slug);
  const isCityHubPublished = publishedSlugs.has(market.slug);
  const subCities = market.isClusterParent ? getSortedClusterMarkets(market.slug) : [];
  const hasPublishedSubCity = subCities.some((sub) => publishedSlugs.has(sub.slug));
  const isClusterActive =
    isCityHubPublished || hasParentHubPage || (market.isClusterParent && hasPublishedSubCity);
  const clusterCtaLabel =
    isCityHubPublished
      ? 'View guide'
      : hasParentHubPage || hasPublishedSubCity
        ? 'Browse city guides'
        : 'View guide';

  return (
    <div className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors">
      <div className="mb-2">
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
          aria-label={`${market.displayName} city guides`}
        >
          {subCities.map((sub) => {
            const subPath = getMarketPath(sub);
            const subPublished = publishedSlugs.has(sub.slug);

            return (
              <li key={sub.slug}>
                {subPublished ? (
                  <Link
                    href={subPath}
                    prefetch={false}
                    className="text-primary hover:underline font-medium"
                    aria-label={`${sub.displayName}, ${sub.stateCode} city guide`}
                  >
                    {sub.displayName}
                  </Link>
                ) : (
                  <span
                    className="text-muted-foreground"
                    aria-label={`${sub.displayName}, ${sub.stateCode}`}
                  >
                    {sub.displayName}
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