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

export function DestinationsMegaMenu({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);
  const published = new Set(getPublishedCityHubSlugs());

  const southCarolinaCities = getClusterMarkets('south-carolina').filter((m) =>
    published.has(m.slug)
  );
  const northCarolinaCities = getClusterMarkets('north-carolina').filter((m) =>
    published.has(m.slug)
  );
  const idahoCities = getClusterMarkets('idaho').filter((m) => published.has(m.slug));
  const oregonCities = getClusterMarkets('oregon').filter((m) => published.has(m.slug));
  const oklahomaCities = getClusterMarkets('oklahoma').filter((m) => published.has(m.slug));
  const arizonaCities = getClusterMarkets('arizona').filter((m) => published.has(m.slug));
  const arkansasCities = getClusterMarkets('arkansas').filter((m) => published.has(m.slug));
  const californiaCities = getClusterMarkets('california').filter((m) => published.has(m.slug));
  const alabamaCities = getClusterMarkets('alabama').filter((m) => published.has(m.slug));
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
        prefetch={false}
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
                      prefetch={false}
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
                      prefetch={false}
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
                prefetch={false}
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
                      prefetch={false}
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
                      prefetch={false}
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
                Idaho — Live Guides
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {idahoCities.map((market) => (
                  <li key={market.slug}>
                    <Link
                      prefetch={false}
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
                Oklahoma — Live Guides
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {oklahomaCities.map((market) => (
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
                Oregon — Live Guides
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {oregonCities.map((market) => (
                  <li key={market.slug}>
                    <Link
                      prefetch={false}
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
                      prefetch={false}
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
                      prefetch={false}
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
                      prefetch={false}
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
                Arizona — Live Guides
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {arizonaCities.map((market) => (
                  <li key={market.slug}>
                    <Link
                      prefetch={false}
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
                Arkansas — Live Guides
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {arkansasCities.map((market) => (
                  <li key={market.slug}>
                    <Link
                      prefetch={false}
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
                California — Live Guides
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {californiaCities.map((market) => (
                  <li key={market.slug}>
                    <Link
                      prefetch={false}
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
                Alabama — Live Guides
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {alabamaCities.map((market) => (
                  <li key={market.slug}>
                    <Link
                      prefetch={false}
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
                <Link prefetch={false} href="/local-movers/florida" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Florida county mover directories →
                </Link>
                <Link prefetch={false} href="/moving-to/texas" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Texas destination cluster →
                </Link>
                <Link prefetch={false} href="/moving-to/tennessee" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Tennessee destination cluster →
                </Link>
                <Link prefetch={false} href="/local-movers/tennessee" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Tennessee county mover directories →
                </Link>
                <Link prefetch={false} href="/local-movers/texas" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Texas county mover directories →
                </Link>
                <Link prefetch={false} href="/resources/routes/california-to-texas" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  CA → Texas route guide →
                </Link>
                <Link prefetch={false} href="/resources/routes/new-york-to-florida" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  NY → Florida route guide →
                </Link>
                <Link prefetch={false} href="/resources/routes/new-york-to-texas" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  NY → Texas route guide →
                </Link>
                <Link prefetch={false} href="/moving-to/south-carolina" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  South Carolina destination cluster →
                </Link>
                <Link prefetch={false} href="/moving-to/north-carolina" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  North Carolina destination cluster →
                </Link>
                <Link prefetch={false} href="/moving-to/idaho" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Idaho destination cluster →
                </Link>
                <Link prefetch={false} href="/moving-to/oregon" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Oregon destination cluster →
                </Link>
                <Link prefetch={false} href="/moving-to/oklahoma" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Oklahoma destination cluster →
                </Link>
                <Link prefetch={false} href="/moving-to/arizona" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Arizona destination cluster →
                </Link>
                <Link prefetch={false} href="/moving-to/arkansas" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Arkansas destination cluster →
                </Link>
                <Link prefetch={false} href="/moving-to/california" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  California destination cluster →
                </Link>
                <Link prefetch={false} href="/moving-to/alabama" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Alabama destination cluster →
                </Link>
                <Link prefetch={false} href="/local-movers/alabama/madison" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Madison County (Huntsville) local movers →
                </Link>
                <Link prefetch={false} href="/local-movers/arkansas/benton" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Benton County (Bentonville) local movers →
                </Link>
                <Link prefetch={false} href="/local-movers/california/sacramento" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Sacramento County local movers →
                </Link>
                <Link prefetch={false} href="/local-movers/arizona/maricopa" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Maricopa County (Phoenix) local movers →
                </Link>
                <Link prefetch={false} href="/local-movers/oregon/multnomah" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Multnomah County (Portland) local movers →
                </Link>
                <Link prefetch={false} href="/local-movers/oklahoma/oklahoma" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Oklahoma County (OKC) local movers →
                </Link>
                <Link prefetch={false} href="/local-movers/idaho/ada" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Ada County (Boise) local movers →
                </Link>
                <Link prefetch={false} href="/local-movers/south-carolina/horry" className="block hover:text-primary" onClick={() => setOpen(false)}>
                  Horry County local movers →
                </Link>
                <Link prefetch={false} href="/local-movers/north-carolina/mecklenburg" className="block hover:text-primary" onClick={() => setOpen(false)}>
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