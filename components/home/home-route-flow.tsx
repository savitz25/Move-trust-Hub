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
import { cn } from '@/lib/utils';
import type { HomeRouteMover, HomeRouteResult } from '@/lib/home/resolve-route-from-zip';
import type { Company } from '@/types';

type ZipPlaceLabel = {
  zip: string;
  city: string;
  state: string;
  label: string;
};

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

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '').slice(0, 5);
}

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

function ZipField({
  id,
  label,
  placeholder,
  value,
  onChange,
  place,
  loading,
  autoFocus,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (zip: string) => void;
  place: ZipPlaceLabel | null;
  loading: boolean;
  autoFocus?: boolean;
}) {
  return (
    <div className="relative flex-1 min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-primary/80">
        {label}
      </label>
      <div
        className={cn(
          'group relative rounded-2xl border-2 bg-white shadow-sm transition-all',
          'focus-within:border-primary focus-within:shadow-md focus-within:ring-4 focus-within:ring-primary/15',
          place ? 'border-emerald-300/80' : 'border-border/80'
        )}
      >
        <div className="flex items-center gap-2 px-3 sm:px-4">
          <MapPin
            className={cn(
              'h-5 w-5 shrink-0',
              place ? 'text-emerald-600' : 'text-muted-foreground'
            )}
            aria-hidden
          />
          <input
            id={id}
            inputMode="numeric"
            autoComplete="postal-code"
            autoFocus={autoFocus}
            maxLength={5}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(digitsOnly(e.target.value))}
            className="h-14 w-full bg-transparent text-lg font-semibold tracking-wide text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground/70 sm:h-16 sm:text-xl"
            aria-describedby={place ? `${id}-hint` : undefined}
          />
          {loading ? (
            <Loader2 className="h-5 w-5 shrink-0 animate-spin text-primary" aria-hidden />
          ) : null}
        </div>
        {place ? (
          <p
            id={`${id}-hint`}
            className="border-t border-emerald-100 bg-emerald-50/80 px-3 py-1.5 text-sm font-medium text-emerald-800 sm:px-4"
          >
            {place.label}
          </p>
        ) : null}
      </div>
    </div>
  );
}

type HomeRouteFlowProps = {
  fallbackMovers?: HomeRouteMover[];
};

export function HomeRouteFlow({ fallbackMovers = [] }: HomeRouteFlowProps) {
  const router = useRouter();
  const fromId = useId();
  const toId = useId();

  const [fromZip, setFromZip] = useState('');
  const [toZip, setToZip] = useState('');
  const [fromPlace, setFromPlace] = useState<ZipPlaceLabel | null>(null);
  const [toPlace, setToPlace] = useState<ZipPlaceLabel | null>(null);
  const [fromLoading, setFromLoading] = useState(false);
  const [toLoading, setToLoading] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const [route, setRoute] = useState<RouteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<MovePresetId | null>(null);
  const [showPresets, setShowPresets] = useState(false);

  const fromAbort = useRef<AbortController | null>(null);
  const toAbort = useRef<AbortController | null>(null);
  const routeAbort = useRef<AbortController | null>(null);

  const lookupZip = useCallback(
    async (
      zip: string,
      which: 'from' | 'to'
    ): Promise<ZipPlaceLabel | null> => {
      if (zip.length !== 5) return null;
      const abort = new AbortController();
      if (which === 'from') {
        fromAbort.current?.abort();
        fromAbort.current = abort;
        setFromLoading(true);
      } else {
        toAbort.current?.abort();
        toAbort.current = abort;
        setToLoading(true);
      }

      try {
        const res = await fetch(`/api/zip-lookup?zip=${zip}`, {
          signal: abort.signal,
          headers: { Accept: 'application/json' },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'ZIP not found');
        return {
          zip: data.zip,
          city: data.city,
          state: data.state,
          label: data.label,
        };
      } catch (err) {
        if ((err as Error).name === 'AbortError') return null;
        return null;
      } finally {
        if (which === 'from') setFromLoading(false);
        else setToLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (fromZip.length !== 5) {
      setFromPlace(null);
      return;
    }
    let cancelled = false;
    void lookupZip(fromZip, 'from').then((place) => {
      if (!cancelled) setFromPlace(place);
    });
    return () => {
      cancelled = true;
    };
  }, [fromZip, lookupZip]);

  useEffect(() => {
    if (toZip.length !== 5) {
      setToPlace(null);
      return;
    }
    let cancelled = false;
    void lookupZip(toZip, 'to').then((place) => {
      if (!cancelled) setToPlace(place);
    });
    return () => {
      cancelled = true;
    };
  }, [toZip, lookupZip]);

  useEffect(() => {
    if (fromZip.length !== 5) {
      setRoute(null);
      setError(null);
      return;
    }

    const timer = window.setTimeout(() => {
      routeAbort.current?.abort();
      const abort = new AbortController();
      routeAbort.current = abort;
      setRouteLoading(true);
      setError(null);

      const params = new URLSearchParams({ from: fromZip });
      if (toZip.length === 5) params.set('to', toZip);

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
          setRoute(null);
          setError(err.message || 'Could not resolve route');
        })
        .finally(() => setRouteLoading(false));
    }, 280);

    return () => window.clearTimeout(timer);
  }, [fromZip, toZip]);

  const ready = Boolean(fromPlace && fromZip.length === 5);
  const movers = route?.topMovers?.length ? route.topMovers : fallbackMovers;

  const calculatorHref = useMemo(() => {
    const base = route?.calculatorHref || '/moving-calculator';
    if (!selectedPreset) return base;
    const url = new URL(base, 'https://www.movetrusthub.com');
    url.searchParams.set('preset', selectedPreset);
    return `${url.pathname}?${url.searchParams.toString()}`;
  }, [route?.calculatorHref, selectedPreset]);

  const moversHref = route?.moversHref || '/companies';
  const directoryHref = route?.directoryHref || '/companies';

  const goMovers = () => {
    router.push(moversHref);
  };

  const goEstimate = () => {
    setShowPresets(true);
    if (selectedPreset) {
      router.push(calculatorHref);
    }
  };

  const pickPreset = (id: MovePresetId) => {
    setSelectedPreset(id);
    const url = new URL(route?.calculatorHref || '/moving-calculator', 'https://www.movetrusthub.com');
    url.searchParams.set('preset', id);
    router.push(`${url.pathname}?${url.searchParams.toString()}`);
  };

  return (
    <div className="w-full">
      {/* ZIP inputs */}
      <div className="rounded-3xl border border-white/60 bg-white/90 p-4 shadow-xl shadow-primary/10 backdrop-blur-md sm:p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" aria-hidden />
          Instant route planner — no account, no lead form
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
          <ZipField
            id={fromId}
            label="Moving from"
            placeholder="From ZIP"
            value={fromZip}
            onChange={setFromZip}
            place={fromPlace}
            loading={fromLoading}
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

          <ZipField
            id={toId}
            label="Moving to"
            placeholder="To ZIP"
            value={toZip}
            onChange={setToZip}
            place={toPlace}
            loading={toLoading}
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
            Enter your pickup ZIP to unlock movers and estimates. Delivery ZIP is optional but
            improves accuracy.
          </p>
        )}

        {error ? (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        {/* Primary CTAs */}
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

        {/* Move size chips (shown after estimate CTA or when ready) */}
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
            <Link
              href={calculatorHref}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Continue to full calculator
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        )}
      </div>

      {/* Top movers for pickup area */}
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

      {/* Guided next steps */}
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
            desc: route?.localAreaLabel
              ? `Jump into ${route.localAreaLabel} guides with vetted listings.`
              : 'ZIP unlocks the right state and county mover guide.',
            href: ready ? moversHref : '/local-movers',
            icon: MapPin,
          },
          {
            n: '3',
            title: 'Compare & contact',
            desc: 'Side-by-side reputation, licensing, and reviews — no lead fees.',
            href: '/compare',
            icon: Truck,
          },
        ].map((step) => (
          <Link
            key={step.n}
            href={step.href}
            className="group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-muted/40 p-5 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                {step.n}
              </span>
              <step.icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <h3 className="font-semibold tracking-tight group-hover:text-primary">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
