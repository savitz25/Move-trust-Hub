import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  getSortedClusterMarkets,
  getMarketPath,
  type Market,
} from '@/lib/destinations/markets';

type Props = {
  market: Market;
  publishedSlugs: Set<string>;
};

export function DestinationClusterCard({ market, publishedSlugs }: Props) {
  const path = getMarketPath(market);
  const isLive = publishedSlugs.has(market.slug);
  const subCities = market.isClusterParent ? getSortedClusterMarkets(market.slug) : [];
  const hasLiveSubCity = subCities.some((sub) => publishedSlugs.has(sub.slug));
  const isClusterActive = isLive || (market.isClusterParent && hasLiveSubCity);
  const clusterHref = isLive ? path : `/moving-to/${market.slug}`;

  return (
    <div className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="font-semibold text-lg">
          {isClusterActive ? (
            <Link href={clusterHref} className="hover:text-primary transition-colors">
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
            {isLive ? 'Live' : 'Partial'}
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
          href={clusterHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {isLive ? 'View guide' : 'View cluster'}
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
                <Link
                  href={subPath}
                  className={
                    subLive
                      ? 'text-primary hover:underline font-medium'
                      : 'text-muted-foreground hover:text-primary hover:underline'
                  }
                  aria-label={
                    subLive
                      ? `${sub.displayName}, ${sub.stateCode} — live city guide`
                      : `${sub.displayName}, ${sub.stateCode} — city guide (coming soon)`
                  }
                >
                  {sub.displayName}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}