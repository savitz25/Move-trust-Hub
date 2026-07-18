'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Calculator,
  ChevronRight,
  Loader2,
  MapPin,
  Navigation,
  Sparkles,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { CompanyVerificationBadges } from '@/components/trust/company-verification-badges';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import type { MovePresetId } from '@/lib/moving-calculator/move-presets';
import { navigateToCalculator } from '@/lib/moving-calculator/url-prefill';
import { cn } from '@/lib/utils';
import type { HomeRouteMover, HomeRouteResult } from '@/lib/home/resolve-route-from-zip';
import type { Company } from '@/types';
import {
  LocationPlaceInput,
  type ConfirmedPlace,
} from '@/components/location/location-place-input';

type RouteResponse = HomeRouteResult & {
  drivingMiles?: number | null;
  error?: string;
};

const PRESET_CHIPS: { id: MovePresetId; label: string; icon: string }[] = [
  { id: 'studio', label: 'Studio', icon: '🏢' },
  { id: '1-bedroom', label: '1BR', icon: '🛏️' },
  { id: '2-bedroom', label: '2BR', icon: '🏠' },
  { id: '3-bedroom', label: '3BR', icon: '🏡' },
  { id: '4-plus', label: 'Full house', icon: '🏘️' },
];

function moverToCompanyStub(m: HomeRouteMover): Company {
  return {
    id: m.slug,
    slug: m.slug,
    name: m.name,
    shortDescription: m.shortDescription,
    description: '',
    foundedYear: 0,
    headquarters: m.headquarters,
    website: '',
    usdotNumber: m.usdotNumber,
    mcNumber: m.mcNumber,
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 1,
    authorityActive: true,
    outOfService: false,
    bbbRating: 'NR',
    bbbAccredited: false,
    overallRating: m.overallRating,
    reviewCount: m.reviewCount,
    reputationScore: m.reputationScore,
    yearsInBusiness: 0,
    avgPricePerMove: 0,
    priceRange: '$$',
    coverage: 'Continental US',
    services: m.services as Company['services'],
    specialties: [],
    ratingBreakdown: {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
    isVerified: m.isVerified,
    lastUpdated: '',
  };
}

function withToZip(href: string, toZip: string | null | undefined): string {
  if (!toZip) return href;
  try {
    const url = new URL(href, 'https://www.movetrusthub.com');
    url.searchParams.set('toZip', toZip);
    return `${url.pathname}?${url.searchParams.toString()}`;
  } catch {
    return href;
  }
}

type HomeRouteFlowProps = {
  fallbackMovers?: HomeRouteMover[];
};

export function HomeRouteFlow({ fallbackMovers = [] }: HomeRouteFlowProps) {
  const router = useRouter();
  const fromId = useId();
  const toId = useId();

  /** Hard-nav to calculator so homepage prefill query params never hit broken SPA chunk loads. */
  const goCalculator = useCallback((href: string) => {
    navigateToCalculator(href);
  }, []);

  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromPlace, setFromPlace] = useState<ConfirmedPlace | null>(null);
  const [toPlace, setToPlace] = useState<ConfirmedPlace | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [route, setRoute] = useState<RouteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<MovePresetId | null>(null);
  const [showPresets, setShowPresets] = useState(false);

  const routeAbort = useRef<AbortController | null>(null);

  // Enrich with top movers + calculator when we have a pickup ZIP
  useEffect(() => {
    const fromZip = fromPlace?.zip;
    if (!fromZip || fromZip.length !== 5) {
      setRoute(null);
      return;
    }

    const timer = window.setTimeout(() => {
      routeAbort.current?.abort();
      const abort = new AbortController();
      routeAbort.current = abort;
      setRouteLoading(true);
      setError(null);

      const params = new URLSearchParams({ from: fromZip });
      const toZip = toPlace?.zip;
      if (toZip && toZip.length === 5) params.set('to', toZip);

      void fetch(`/api/home-route?${params}`, {
        signal: abort.signal,
        headers: { Accept: 'application/json' },
      })
        .then(async (res) => {
          const data = (await res.json()) as RouteResponse;
          if (!res.ok) throw new Error(data.error || 'Could not resolve route');
          setRoute(data);
        })
        .catch((err: Error) => {
          if (err.name === 'AbortError') return;
          // City/county resolve already succeeded — keep CTA usable without top-movers panel.
          setRoute(null);
          setError(null);
        })
        .finally(() => setRouteLoading(false));
    }, 280);

    return () => window.clearTimeout(timer);
  }, [fromPlace?.zip, toPlace?.zip]);

  const ready = Boolean(fromPlace);
  const movers = route?.topMovers?.length ? route.topMovers : fallbackMovers;

  const baseMoversHref = useMemo(() => {
    if (route?.moversHref) return route.moversHref;
    if (fromPlace?.moversHref) return fromPlace.moversHref;
    return '/local-movers';
  }, [route?.moversHref, fromPlace?.moversHref]);

  const moversHref = withToZip(baseMoversHref, toPlace?.zip);

  const calculatorHref = useMemo(() => {
    if (route?.calculatorHref) {
      const base = route.calculatorHref;
      if (!selectedPreset) return base;
      const url = new URL(base, 'https://www.movetrusthub.com');
      url.searchParams.set('preset', selectedPreset);
      return `${url.pathname}?${url.searchParams.toString()}`;
    }

    if (!fromPlace) return '/moving-calculator';
    const params = new URLSearchParams();
    if (fromPlace.zip) params.set('fromZip', fromPlace.zip);
    params.set('fromCity', fromPlace.city);
    params.set('fromState', fromPlace.stateCode);
    if (toPlace?.zip) params.set('toZip', toPlace.zip);
    if (toPlace) {
      params.set('toCity', toPlace.city);
      params.set('toState', toPlace.stateCode);
    }
    if (selectedPreset) params.set('preset', selectedPreset);
    return `/moving-calculator?${params.toString()}`;
  }, [route?.calculatorHref, selectedPreset, fromPlace, toPlace]);

  const directoryHref =
    route?.directoryHref ||
    (fromPlace
      ? `/companies?search=${encodeURIComponent(fromPlace.city)}`
      : '/companies');

  const goMovers = () => {
    router.push(moversHref);
  };

  const goEstimate = () => {
    setShowPresets(true);
    if (selectedPreset) {
      goCalculator(calculatorHref);
    }
  };

  const pickPreset = (id: MovePresetId) => {
    setSelectedPreset(id);
    const url = new URL(calculatorHref, 'https://www.movetrusthub.com');
    url.searchParams.set('preset', id);
    goCalculator(`${url.pathname}?${url.searchParams.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="rounded-3xl border border-white/60 bg-white/90 p-4 shadow-xl shadow-primary/10 backdrop-blur-md sm:p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" aria-hidden />
          Instant route planner — city or ZIP, no account, no lead form
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
          <LocationPlaceInput
            id={fromId}
            label="Moving from"
            placeholder="City or From ZIP"
            value={fromText}
            onChange={setFromText}
            confirmed={fromPlace}
            onConfirm={setFromPlace}
            autoFocus
          />

          <div
            className="hidden h-14 w-12 shrink-0 items-center justify-center sm:flex sm:h-16"
            aria-hidden
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Navigation className="h-5 w-5" />
            </div>
          </div>

          <LocationPlaceInput
            id={toId}
            label="Moving to"
            placeholder="City or To ZIP (optional)"
            value={toText}
            onChange={setToText}
            confirmed={toPlace}
            onConfirm={setToPlace}
          />
        </div>

        {fromPlace && toPlace ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Route locked:{' '}
            <span className="font-semibold text-foreground">
              {fromPlace.label} → {toPlace.label}
            </span>
            {route?.drivingMiles ? (
              <>
                {' '}
                · ~{route.drivingMiles.toLocaleString()} mi est.
              </>
            ) : null}
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Type a city (e.g. Boca Raton) or ZIP. Confirm City, State when asked —
            we route you to the correct county movers page. Delivery is optional.
          </p>
        )}

        {error ? (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <div
          className={cn(
            'mt-5 grid gap-3 transition-all duration-300 sm:grid-cols-2',
            ready ? 'opacity-100' : 'opacity-60'
          )}
        >
          <Button
            type="button"
            size="lg"
            disabled={!ready || routeLoading}
            onClick={goMovers}
            className="h-14 gap-2 rounded-2xl text-base font-semibold shadow-md sm:h-16 sm:text-lg"
          >
            {routeLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            ) : (
              <Truck className="h-5 w-5" aria-hidden />
            )}
            Find Trusted Movers for My Route
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Button>

          <Button
            type="button"
            size="lg"
            variant="outline"
            disabled={!ready || routeLoading}
            onClick={goEstimate}
            className="h-14 gap-2 rounded-2xl border-2 bg-white text-base font-semibold sm:h-16 sm:text-lg"
          >
            <Calculator className="h-5 w-5" aria-hidden />
            Get My Move Estimate
          </Button>
        </div>

        {(showPresets || (ready && selectedPreset)) && (
          <div className="mt-5 rounded-2xl border bg-gradient-to-br from-primary/5 via-background to-background p-4">
            <p className="mb-3 text-sm font-semibold text-foreground">
              How big is your move?{' '}
              <span className="font-normal text-muted-foreground">
                Pick a size — we&apos;ll pre-fill the calculator.
              </span>
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {PRESET_CHIPS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => pickPreset(preset.id)}
                  className={cn(
                    'flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-xl border-2 px-2 py-3 text-center transition-all',
                    'hover:border-primary hover:bg-primary/5 hover:shadow-sm active:scale-[0.98]',
                    selectedPreset === preset.id
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border/70 bg-card'
                  )}
                >
                  <span className="text-xl" aria-hidden>
                    {preset.icon}
                  </span>
                  <span className="text-sm font-semibold">{preset.label}</span>
                </button>
              ))}
            </div>
            <a
              href={calculatorHref}
              onClick={(e) => {
                e.preventDefault();
                goCalculator(calculatorHref);
              }}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Continue to full calculator
              <ChevronRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        )}
      </div>

      {ready && movers.length > 0 ? (
        <div className="mt-8">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="outline" className="mb-2 border-primary/30 bg-primary/5 text-primary">
                Top-scored for your area
              </Badge>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Trusted movers near{' '}
                <span className="text-primary">
                  {route?.localAreaLabel || fromPlace?.label || 'you'}
                </span>
              </h2>
            </div>
            <Link
              href={directoryHref}
              className="text-sm font-medium text-primary hover:underline"
            >
              Browse full directory →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {movers.slice(0, 4).map((m) => {
              const stub = moverToCompanyStub(m);
              return (
                <Link
                  key={m.slug}
                  href={`/companies/${m.slug}`}
                  className="group rounded-2xl border bg-card p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div className="mb-1 font-semibold tracking-tight group-hover:text-primary">
                    {m.name}
                  </div>
                  <CompanyVerificationBadges
                    company={stub}
                    size="compact"
                    className="mb-2 justify-start"
                  />
                  <div className="text-xs text-muted-foreground">{m.headquarters}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <StarRating rating={m.overallRating} size="sm" />
                    <span className="text-xs text-muted-foreground">
                      <EditorialReviewVolume count={m.reviewCount} />
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    View profile →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {[
          {
            n: '1',
            title: 'Confirm your move size',
            desc: 'Studio to full house — visual selectors pre-load inventory.',
            href: ready ? calculatorHref : '/moving-calculator',
            icon: Calculator,
          },
          {
            n: '2',
            title: 'Browse local movers in your county',
            desc: fromPlace?.countyName
              ? `Jump into ${fromPlace.countyName} County guides with vetted listings.`
              : route?.localAreaLabel
                ? `Jump into ${route.localAreaLabel} guides with vetted listings.`
                : 'City or ZIP unlocks the right state and county mover guide.',
            href: ready ? moversHref : '/local-movers',
            icon: MapPin,
          },
          {
            n: '3',
            title: 'Compare verified profiles',
            desc: 'FMCSA authority, ratings, and services — no lead-form paywall.',
            href: directoryHref,
            icon: Truck,
          },
        ].map((step) => (
          <Link
            key={step.n}
            href={step.href}
            onClick={(e) => {
              if (step.href.startsWith('/moving-calculator')) {
                e.preventDefault();
                goCalculator(step.href);
              }
            }}
            className="group rounded-2xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {step.n}
              </span>
              <step.icon className="h-4 w-4 text-primary" aria-hidden />
            </div>
            <div className="font-semibold tracking-tight group-hover:text-primary">
              {step.title}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
