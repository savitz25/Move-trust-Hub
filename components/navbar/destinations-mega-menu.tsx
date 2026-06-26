'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin, ArrowRight } from 'lucide-react';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import {
  getClusterMarkets,
  getMarketPath,
  priorityMarketsForNav,
} from '@/lib/destinations/markets';

export function DestinationsMegaMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const published = new Set(getPublishedCityHubSlugs());

  const southCarolinaCities = getClusterMarkets('south-carolina').filter((m) =>
    published.has(m.slug)
  );
  const northCarolinaCities = getClusterMarkets('north-carolina').filter((m) =>
    published.has(m.slug)
  );
  const floridaCities = getClusterMarkets('florida').filter((m) => published.has(m.slug));
  const tennesseeCities = getClusterMarkets('tennessee').filter((m) => published.has(m.slug));
  const texasCities = getClusterMarkets('texas').filter((m) => published.has(m.slug));
  const topStandalone = priorityMarketsForNav.filter(
    (m) => !m.isClusterParent && !m.clusterParent && published.has(m.slug)
  );
  const clusterParents = priorityMarketsForNav.filter(
    (m) =>
      m.isClusterParent &&
      (published.has(m.slug) ||
        getClusterMarkets(m.slug).some((child) => published.has(child.slug)))
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link
        href="/moving-to"
        className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
        onClick={() => setOpen(false)}
      >
        Destinations
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </Link>

      {open && (
        <div className="absolute left-0 top-full pt-2 z-50 w-[min(92vw,720px)]">
          <div className="rounded-xl border bg-background shadow-lg p-5 grid sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Featured Destinations
              </div>
              <ul className="space-y-2 text-sm">
                {topStandalone.map((market) => (
                  <li key={market.slug}>
                    <Link
                      href={getMarketPath(market)}
                      className="font-medium hover:text-primary transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {market.displayName}, {market.stateCode}
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {market.inboundGrowthStat}
                    </p>
                  </li>
                ))}
                {clusterParents.map((market) => (
                  <li key={market.slug}>
                    <Link
                      href={getMarketPath(market)}
                      className="font-medium hover:text-primary transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {market.displayName}
                      {market.stateCode ? `, ${market.stateCode}` : ''}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/moving-to"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-4 hover:underline"
                onClick={() => setOpen(false)}
              >
                All destination guides
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                South Carolina — Live Guides
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {southCarolinaCities.map((market) => (
                  <li key={market.slug}>
                    <Link
                      href={getMarketPath(market)}
                      className="text-primary hover:underline font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {market.displayName}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 mt-6">
                North Carolina — Live Guides
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {northCarolinaCities.map((market) => (
                  <li key={market.slug}>
                    <Link
                      href={getMarketPath(market)}
                      className="text-primary hover:underline font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {market.displayName}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 mt-6">
                Florida Corridor — Live Guides
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {floridaCities.map((market) => (
                  <li key={market.slug}>
                    <Link
                      href={getMarketPath(market)}
                      className="text-primary hover:underline font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {market.displayName}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 mt-6">
                Tennessee Corridor — Live Guides
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {tennesseeCities.map((market) => (
                  <li key={market.slug}>
                    <Link
                      href={getMarketPath(market)}
                      className="text-primary hover:underline font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {market.displayName}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 mt-6">
                Texas Corridor — Live Guides
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {texasCities.map((market) => (
                  <li key={market.slug}>
                    <Link
                      href={getMarketPath(market)}
                      className="text-primary hover:underline font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {market.displayName}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t text-xs text-muted-foreground space-y-1">
                <Link href="/local-movers/florida" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Florida county mover directories →
                </Link>
                <Link href="/moving-to/texas" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Texas destination cluster →
                </Link>
                <Link href="/moving-to/tennessee" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Tennessee destination cluster →
                </Link>
                <Link href="/local-movers/tennessee" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Tennessee county mover directories →
                </Link>
                <Link href="/local-movers/texas" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Texas county mover directories →
                </Link>
                <Link href="/resources/routes/california-to-texas" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  CA → Texas route guide →
                </Link>
                <Link href="/resources/routes/new-york-to-florida" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  NY → Florida route guide →
                </Link>
                <Link href="/moving-to/south-carolina" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  South Carolina destination cluster →
                </Link>
                <Link href="/moving-to/north-carolina" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  North Carolina destination cluster →
                </Link>
                <Link href="/local-movers/south-carolina/horry" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Horry County local movers →
                </Link>
                <Link href="/local-movers/north-carolina/mecklenburg" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Mecklenburg County local movers →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}