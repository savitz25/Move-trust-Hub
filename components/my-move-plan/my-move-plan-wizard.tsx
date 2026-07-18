'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ClipboardCopy,
  KeyRound,
  Loader2,
  Mail,
  MapPin,
  Navigation,
  Sparkles,
  Truck,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import {
  LocationPlaceInput,
  type ConfirmedPlace,
} from '@/components/location/location-place-input';
import { useSaveMyMove } from '@/components/save-my-move/save-my-move-provider';
import {
  MY_MOVE_PASSWORD_ENABLED_KEY,
  MY_MOVE_PASSWORD_PROMPT_DISMISSED_KEY,
} from '@/lib/save-my-move/password-meta';
import { PORTAL_PASSWORD_ENABLED_KEY } from '@/lib/portal/password-meta';
import { stashPendingSaveAction } from '@/lib/save-my-move/pending-action';
import { buildCompanyProfileHref } from '@/lib/directory/profile-back-link';
import type { HomeRouteMover, HomeRouteResult } from '@/lib/home/resolve-route-from-zip';
import {
  MOVE_PRESETS,
  type MovePresetId,
} from '@/lib/moving-calculator/move-presets';
import {
  estimateWeight,
  getMoveRecommendation,
} from '@/lib/moving-calculator/estimates';
import { createPlanInventoryFromPreset, planInventoryTotals } from '@/lib/my-move-plan/inventory';
import {
  buildFullPlanClipboard,
  buildOutreachEmail,
} from '@/lib/my-move-plan/outreach';
import {
  consumePendingWizardOutreach,
  stashPendingWizardOutreach,
} from '@/lib/my-move-plan/pending-outreach';
import {
  MY_MOVE_PLAN_RETURN_PATH,
  MY_MOVE_PLAN_SECTION_ID,
} from '@/lib/my-move-plan/return-path';
import {
  computeMoveReadiness,
  phaseProgress,
  stepToPhase,
} from '@/lib/my-move-plan/readiness';
import { loadMyMovePlan, saveMyMovePlan } from '@/lib/my-move-plan/storage';
import type {
  MyMovePlanState,
  MyMovePlanStep,
  PlanInventoryItem,
} from '@/lib/my-move-plan/types';
import { cn } from '@/lib/utils';

type RouteResponse = HomeRouteResult & {
  drivingMiles?: number | null;
  error?: string;
};

const PRESET_OPTIONS = MOVE_PRESETS.filter((p) => p.id !== 'custom');

const PHASES = [
  { id: 'plan', label: 'Plan' },
  { id: 'build', label: 'Build' },
  { id: 'book', label: 'Book' },
] as const;

type WizardProps = {
  fallbackMovers?: HomeRouteMover[];
};

export function MyMovePlanWizard({ fallbackMovers = [] }: WizardProps) {
  const fromId = useId();
  const toId = useId();
  const saveMyMove = useSaveMyMove();

  const [step, setStep] = useState<MyMovePlanStep>('route');
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromPlace, setFromPlace] = useState<ConfirmedPlace | null>(null);
  const [toPlace, setToPlace] = useState<ConfirmedPlace | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [route, setRoute] = useState<RouteResponse | null>(null);
  const [drivingMiles, setDrivingMiles] = useState<number | null>(null);
  const [shortlist, setShortlist] = useState<HomeRouteMover[]>([]);
  const [preset, setPreset] = useState<MovePresetId | null>(null);
  const [inventory, setInventory] = useState<PlanInventoryItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [emailPendingSlug, setEmailPendingSlug] = useState<string | null>(null);

  const routeAbort = useRef<AbortController | null>(null);
  const outreachHandledRef = useRef(false);

  // Resume session + scroll back to wizard after profile navigation
  useEffect(() => {
    const saved = loadMyMovePlan();
    if (saved?.fromPlace) {
      setFromPlace(saved.fromPlace);
      setFromText(saved.fromPlace.label);
      if (saved.toPlace) {
        setToPlace(saved.toPlace);
        setToText(saved.toPlace.label);
      }
      setDrivingMiles(saved.drivingMiles);
      setShortlist(saved.shortlist);
      setPreset(saved.preset);
      setInventory(saved.inventory);
      if (saved.step && saved.step !== 'route') setStep(saved.step);
    }
    setHydrated(true);

    if (typeof window !== 'undefined' && window.location.hash === `#${MY_MOVE_PLAN_SECTION_ID}`) {
      // Wait a frame so restored step content is in the DOM
      window.requestAnimationFrame(() => {
        document
          .getElementById(MY_MOVE_PLAN_SECTION_ID)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  const planSnapshot: MyMovePlanState = useMemo(
    () => ({
      step,
      fromPlace,
      toPlace,
      drivingMiles,
      shortlist,
      preset,
      inventory,
      updatedAt: new Date().toISOString(),
    }),
    [step, fromPlace, toPlace, drivingMiles, shortlist, preset, inventory]
  );

  useEffect(() => {
    if (!hydrated) return;
    if (!fromPlace && step === 'route') return;
    saveMyMovePlan(planSnapshot);
  }, [planSnapshot, hydrated, fromPlace, step]);

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
          if (typeof data.drivingMiles === 'number') {
            setDrivingMiles(data.drivingMiles);
          }
        })
        .catch((err: Error) => {
          if (err.name === 'AbortError') return;
          setRoute(null);
        })
        .finally(() => setRouteLoading(false));
    }, 280);

    return () => window.clearTimeout(timer);
  }, [fromPlace?.zip, toPlace?.zip]);

  const movers = route?.topMovers?.length ? route.topMovers : fallbackMovers;
  const readiness = computeMoveReadiness(planSnapshot);
  const activePhase = stepToPhase(step);
  const barPct = phaseProgress(step);
  const totals = planInventoryTotals(inventory);
  const weight = estimateWeight(totals.totalVolume);
  const truck = getMoveRecommendation(totals.totalVolume);

  const toggleMover = (m: HomeRouteMover) => {
    setShortlist((prev) => {
      const exists = prev.some((x) => x.slug === m.slug);
      if (exists) return prev.filter((x) => x.slug !== m.slug);
      if (prev.length >= 3) {
        toast.message('Shortlist is full', {
          description: 'Pick up to 3 movers for comparable estimates.',
        });
        return prev;
      }
      return [...prev, m];
    });
  };

  const applyPreset = (id: MovePresetId) => {
    setPreset(id);
    if (id === 'custom' || id === 'scratch') {
      setInventory([]);
      return;
    }
    setInventory(createPlanInventoryFromPreset(id));
  };

  const updateQty = (id: string, qty: number) => {
    setInventory((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, qty) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const goToShortlist = () => {
    if (!fromPlace) {
      toast.error('Confirm where you are moving from');
      return;
    }
    setStep('shortlist');
  };

  const goToInventory = () => setStep('inventory');

  const goToReport = () => {
    if (totals.totalVolume <= 0) {
      toast.error('Pick a home size to load inventory first');
      return;
    }
    setStep('report');
  };

  const copyPlan = async () => {
    const text = buildFullPlanClipboard({
      from: fromPlace,
      to: toPlace,
      drivingMiles,
      inventory,
      estimatedWeight: weight,
      shortlist,
      truckLabel: truck.truck,
    });
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Move plan copied');
    } catch {
      toast.error('Could not copy — try again');
    }
  };

  const persistPlan = useCallback(() => {
    saveMyMovePlan(planSnapshot);
  }, [planSnapshot]);

  const profileHref = useCallback((slug: string) => {
    // Persist before leave so Back restores shortlist/inventory/step
    saveMyMovePlan({
      step,
      fromPlace,
      toPlace,
      drivingMiles,
      shortlist,
      preset,
      inventory,
      updatedAt: new Date().toISOString(),
    });
    return buildCompanyProfileHref(slug, MY_MOVE_PLAN_RETURN_PATH);
  }, [step, fromPlace, toPlace, drivingMiles, shortlist, preset, inventory]);

  const openEstimateMailto = useCallback(
    (mover: HomeRouteMover, planOverride?: MyMovePlanState | null) => {
      const plan = planOverride ?? loadMyMovePlan();
      const from = plan?.fromPlace ?? fromPlace;
      const to = plan?.toPlace ?? toPlace;
      const miles = plan?.drivingMiles ?? drivingMiles;
      const items = plan?.inventory?.length ? plan.inventory : inventory;
      const estWeight = estimateWeight(planInventoryTotals(items).totalVolume);

      const { mailto } = buildOutreachEmail({
        from,
        to,
        drivingMiles: miles,
        inventory: items,
        estimatedWeight: estWeight,
        mover,
      });
      try {
        // Prefer assigning location for broader mobile client support
        window.location.href = mailto;
        toast.success(`Opening email draft for ${mover.name}`, {
          description: 'Review and send from your mail app. Add your name and phone before sending.',
        });
      } catch {
        toast.error('Could not open your email app — use Copy request instead.');
      }
    },
    [fromPlace, toPlace, drivingMiles, inventory]
  );

  const copyOutreach = async (mover: HomeRouteMover) => {
    const { body } = buildOutreachEmail({
      from: fromPlace,
      to: toPlace,
      drivingMiles,
      inventory,
      estimatedWeight: weight,
      mover,
    });
    try {
      await navigator.clipboard.writeText(body);
      toast.success(`Estimate request for ${mover.name} copied`);
    } catch {
      toast.error('Could not copy — try again');
    }
  };

  const handleEmailOutreach = useCallback(
    (mover: HomeRouteMover) => {
      persistPlan();

      if (saveMyMove.loading) {
        toast.message('Preparing sign-in…', {
          description: 'Try Email again in a moment.',
        });
        stashPendingWizardOutreach({
          companySlug: mover.slug,
          companyName: mover.name,
        });
        return;
      }

      if (!saveMyMove.user) {
        stashPendingWizardOutreach({
          companySlug: mover.slug,
          companyName: mover.name,
        });
        // Also save mover + email details after auth (My Move shortlist)
        stashPendingSaveAction({
          type: 'mover',
          payload: {
            companySlug: mover.slug,
            companyName: mover.name,
            sendEmail: true,
          },
        });
        setEmailPendingSlug(mover.slug);
        saveMyMove.openSaveModal({
          // Return to wizard (not Move HQ) so outreach can complete
          redirectPath: MY_MOVE_PLAN_RETURN_PATH,
          context: 'mover',
        });
        toast.message('Sign in to send estimate requests', {
          description: 'Save My Move keeps your plan and opens a ready-to-send email draft.',
        });
        return;
      }

      setEmailPendingSlug(null);
      openEstimateMailto(mover);
    },
    [persistPlan, saveMyMove, openEstimateMailto]
  );

  // Allow a new post-auth outreach after sign-out
  useEffect(() => {
    if (!saveMyMove.user) {
      outreachHandledRef.current = false;
    }
  }, [saveMyMove.user]);

  // After magic-link / OAuth / password sign-in, complete a stashed estimate email
  useEffect(() => {
    if (!hydrated || saveMyMove.loading || !saveMyMove.user) return;
    if (outreachHandledRef.current) return;

    const pending = consumePendingWizardOutreach();
    if (!pending) {
      setEmailPendingSlug(null);
      return;
    }

    outreachHandledRef.current = true;
    setEmailPendingSlug(null);

    const plan = loadMyMovePlan();
    const moverFromState =
      shortlist.find((m) => m.slug === pending.companySlug) ||
      plan?.shortlist.find((m) => m.slug === pending.companySlug);

    const mover: HomeRouteMover = moverFromState ?? {
      slug: pending.companySlug,
      name: pending.companyName,
      headquarters: '',
      overallRating: 0,
      reviewCount: 0,
      reputationScore: 0,
      isVerified: false,
      usdotNumber: '',
      mcNumber: '',
      shortDescription: '',
      services: [],
      coverageTier: 'national',
    };

    // Restore wizard context after auth round-trip
    if (plan?.step) {
      setStep(plan.step);
    }

    // Small delay so mail clients don't compete with auth redirect paint
    window.setTimeout(() => {
      openEstimateMailto(mover, plan);
    }, 350);
  }, [hydrated, saveMyMove.loading, saveMyMove.user, shortlist, openEstimateMailto]);

  const openSave = useCallback(() => {
    persistPlan();
    saveMyMove.openSaveModal({
      // Land on My Move so create-password offer runs after first save/sign-in
      redirectPath: '/my-move',
      context: 'dashboard',
    });
  }, [saveMyMove, persistPlan]);

  const signedInUser = saveMyMove.user;
  const userHasPassword = Boolean(
    signedInUser &&
      (((signedInUser.user_metadata ?? {}) as Record<string, unknown>)[
        MY_MOVE_PASSWORD_ENABLED_KEY
      ] === true ||
        ((signedInUser.user_metadata ?? {}) as Record<string, unknown>)[
          PORTAL_PASSWORD_ENABLED_KEY
        ] === true)
  );
  const userDismissedPasswordPrompt = Boolean(
    signedInUser &&
      ((signedInUser.user_metadata ?? {}) as Record<string, unknown>)[
        MY_MOVE_PASSWORD_PROMPT_DISMISSED_KEY
      ] === true
  );
  const offerPasswordUpgrade =
    Boolean(signedInUser) && !userHasPassword && !userDismissedPasswordPrompt;

  return (
    <div id={MY_MOVE_PLAN_SECTION_ID} className="w-full scroll-mt-24">
      <div className="rounded-3xl border border-white/60 bg-white/90 p-4 shadow-xl shadow-primary/10 backdrop-blur-md sm:p-6 md:p-8">
        {/* Phase + readiness */}
        <div className="mb-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden />
              My Move Plan — city or ZIP · no lead form
            </div>
            <div
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
              aria-live="polite"
            >
              Move readiness {readiness}
              <span className="font-normal text-muted-foreground">/100</span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2" role="list" aria-label="Plan phases">
            {PHASES.map((phase, idx) => {
              const active = phase.id === activePhase;
              const done =
                (phase.id === 'plan' && step !== 'route') ||
                (phase.id === 'build' && step === 'report') ||
                (phase.id === 'book' && step === 'report');
              return (
                <div key={phase.id} className="flex flex-1 items-center gap-1 sm:gap-2" role="listitem">
                  <div
                    className={cn(
                      'flex h-8 flex-1 items-center justify-center rounded-full text-xs font-semibold transition-colors sm:h-9 sm:text-sm',
                      active && 'bg-primary text-primary-foreground shadow-sm',
                      done && !active && 'bg-primary/15 text-primary',
                      !active && !done && 'bg-muted text-muted-foreground'
                    )}
                  >
                    {done && !active ? (
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    ) : null}
                    <span className={cn(done && !active && 'ml-1')}>{phase.label}</span>
                  </div>
                  {idx < PHASES.length - 1 ? (
                    <div className="hidden h-px w-3 bg-border sm:block" aria-hidden />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${barPct}%` }}
            />
          </div>
        </div>

        {/* STEP: route */}
        {step === 'route' ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                Where are you moving?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Confirm origin (required) and destination. We&apos;ll match movers near pickup
                and track distance for your plan.
              </p>
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

            {fromPlace ? (
              <p className="text-sm text-muted-foreground">
                Route:{' '}
                <span className="font-semibold text-foreground">
                  {fromPlace.label}
                  {toPlace ? ` → ${toPlace.label}` : ''}
                </span>
                {drivingMiles ? (
                  <> · ~{drivingMiles.toLocaleString()} mi est.</>
                ) : null}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Type a city (e.g. Boca Raton) or ZIP — confirm City, State when asked.
              </p>
            )}

            <Button
              type="button"
              size="lg"
              disabled={!fromPlace || routeLoading}
              onClick={goToShortlist}
              className="h-14 w-full gap-2 rounded-2xl text-base font-semibold shadow-md sm:h-16 sm:text-lg"
            >
              {routeLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              ) : (
                <Truck className="h-5 w-5" aria-hidden />
              )}
              Start My Move Plan
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
          </div>
        ) : null}

        {/* STEP: shortlist */}
        {step === 'shortlist' ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                  Pick up to 3 movers
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Shortlist favorites for{' '}
                  <span className="font-medium text-foreground">
                    {route?.localAreaLabel || fromPlace?.label || 'your area'}
                  </span>
                  . You can edit this later.
                </p>
              </div>
              <Badge variant="outline" className="shrink-0">
                {shortlist.length}/3
              </Badge>
            </div>

            <div className="rounded-xl border border-primary/15 bg-primary/5 px-3 py-2 text-xs leading-relaxed text-foreground sm:text-sm">
              <strong className="font-semibold">Why 3?</strong> Getting three estimates on the{' '}
              <em>same</em> inventory is the only way to compare fairly — we help you send
              identical details to each mover.
            </div>

            <p className="text-xs text-muted-foreground">
              Top 10 for your pickup area — local first, then statewide, then national (by
              reputation score).
            </p>

            {movers.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No area matches yet —{' '}
                <Link href="/companies" className="font-medium text-primary hover:underline">
                  browse the directory
                </Link>{' '}
                or continue and add movers later.
              </p>
            ) : (
              <div className="max-h-[28rem] space-y-4 overflow-y-auto pr-0.5 sm:max-h-none">
                {(
                  [
                    {
                      tier: 'local' as const,
                      label: `Local · ${route?.localAreaLabel || fromPlace?.label || 'your area'}`,
                    },
                    {
                      tier: 'state' as const,
                      label: `Statewide · ${fromPlace?.stateCode || 'your state'}`,
                    },
                    { tier: 'national' as const, label: 'National carriers' },
                  ] as const
                ).map((group) => {
                  const groupMovers = movers
                    .filter((m) => (m.coverageTier ?? 'national') === group.tier)
                    .slice(0, 10);
                  if (!groupMovers.length) return null;
                  return (
                    <div key={group.tier}>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {group.label}
                        </span>
                        <span className="h-px flex-1 bg-border" aria-hidden />
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {groupMovers.map((m) => {
                          const selected = shortlist.some((s) => s.slug === m.slug);
                          return (
                            <button
                              key={m.slug}
                              type="button"
                              onClick={() => toggleMover(m)}
                              className={cn(
                                'rounded-2xl border p-3 text-left transition-all',
                                selected
                                  ? 'border-primary bg-primary/10 shadow-sm'
                                  : 'border-border bg-card hover:border-primary/40'
                              )}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <div className="font-semibold tracking-tight leading-snug">
                                    {m.name}
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="mt-1 border-primary/20 bg-background px-1.5 py-0 text-[10px] font-medium capitalize text-primary"
                                  >
                                    {group.tier}
                                  </Badge>
                                </div>
                                <span
                                  className={cn(
                                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]',
                                    selected
                                      ? 'border-primary bg-primary text-primary-foreground'
                                      : 'border-muted-foreground/30'
                                  )}
                                >
                                  {selected ? <Check className="h-3 w-3" /> : null}
                                </span>
                              </div>
                              <div className="mt-1 text-xs text-muted-foreground">
                                {m.headquarters}
                              </div>
                              <div className="mt-2 flex items-center gap-2">
                                <StarRating rating={m.overallRating} size="sm" />
                                <span className="text-xs text-muted-foreground">
                                  <EditorialReviewVolume count={m.reviewCount} />
                                </span>
                              </div>
                              <div className="mt-1 text-xs font-medium text-primary">
                                Score {m.reputationScore}/100
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep('route')} className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="button" variant="outline" onClick={goToInventory}>
                  Skip for now
                </Button>
                <Button type="button" onClick={goToInventory} className="gap-2">
                  Continue to inventory
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {/* STEP: inventory */}
        {step === 'inventory' ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                How big is your move?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tap a home size — we pre-load typical items. Adjust quantities; totals update live.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {PRESET_OPTIONS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p.id)}
                  className={cn(
                    'flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-xl border-2 px-2 py-3 text-center transition-all',
                    'hover:border-primary hover:bg-primary/5 active:scale-[0.98]',
                    preset === p.id
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border/70 bg-card'
                  )}
                >
                  <span className="text-xl" aria-hidden>
                    {p.icon}
                  </span>
                  <span className="text-sm font-semibold">{p.label}</span>
                </button>
              ))}
            </div>

            {totals.totalVolume > 0 ? (
              <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-background to-background p-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Volume
                    </div>
                    <div className="text-2xl font-semibold tabular-nums">
                      {totals.totalVolume.toLocaleString()}
                      <span className="ml-1 text-sm font-normal text-muted-foreground">
                        cu ft
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Est. weight
                    </div>
                    <div className="text-2xl font-semibold tabular-nums">
                      {weight.toLocaleString()}
                      <span className="ml-1 text-sm font-normal text-muted-foreground">
                        lbs
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Equipment
                    </div>
                    <div className="text-sm font-semibold leading-snug">{truck.truck}</div>
                    <div className="text-xs text-muted-foreground">
                      {truck.movers} · {truck.duration}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>Truck fill (illustrative)</span>
                    <span>{truck.gaugePercent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${truck.gaugePercent}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {inventory.length > 0 ? (
              <div className="max-h-56 space-y-1 overflow-y-auto rounded-xl border p-2 sm:max-h-64">
                {inventory.slice(0, 40).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted/50"
                  >
                    <span className="min-w-0 flex-1 truncate">
                      {item.name}
                      {item.room ? (
                        <span className="ml-1 text-xs text-muted-foreground">· {item.room}</span>
                      ) : null}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-md border"
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        aria-label={`Decrease ${item.name}`}
                      >
                        −
                      </button>
                      <span className="w-6 text-center tabular-nums text-xs font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-md border"
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        aria-label={`Increase ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                {inventory.length > 40 ? (
                  <p className="px-2 py-1 text-xs text-muted-foreground">
                    +{inventory.length - 40} more items in your plan
                  </p>
                ) : null}
              </div>
            ) : null}

            <p className="text-xs text-muted-foreground">
              Want room-by-room detail?{' '}
              <Link
                href="/moving-calculator"
                className="font-medium text-primary hover:underline"
              >
                Open full calculator
              </Link>
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep('shortlist')}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="button"
                disabled={totals.totalVolume <= 0}
                onClick={goToReport}
                className="gap-2"
              >
                See my move report
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : null}

        {/* STEP: report */}
        {step === 'report' ? (
          <div className="space-y-5">
            <div>
              <Badge className="mb-2 bg-emerald-600 hover:bg-emerald-600">
                Report ready — no account required
              </Badge>
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                Your personalized move report
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Use this profile when you request estimates so every mover quotes the same load.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border bg-card p-4">
                <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  Route
                </div>
                <div className="font-semibold">
                  {fromPlace?.label ?? '—'}
                  {toPlace ? (
                    <>
                      <br />
                      <span className="text-muted-foreground">→</span> {toPlace.label}
                    </>
                  ) : null}
                </div>
                {drivingMiles ? (
                  <div className="mt-1 text-sm text-muted-foreground">
                    ~{drivingMiles.toLocaleString()} miles
                  </div>
                ) : null}
              </div>
              <div className="rounded-2xl border bg-card p-4">
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Inventory profile
                </div>
                <div className="text-2xl font-semibold tabular-nums">
                  {totals.totalVolume.toLocaleString()}{' '}
                  <span className="text-sm font-normal text-muted-foreground">cu ft</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  ~{weight.toLocaleString()} lbs · {totals.totalItems} items
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">{truck.truck}</div>
                <div className="text-xs text-muted-foreground">
                  {truck.label} · {truck.movers}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold">Request estimates from your shortlist</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setStep('shortlist')}
                >
                  Edit shortlist
                </Button>
              </div>

              {shortlist.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No movers selected yet.{' '}
                  <button
                    type="button"
                    className="font-medium text-primary hover:underline"
                    onClick={() => setStep('shortlist')}
                  >
                    Pick up to 3
                  </button>{' '}
                  so you can send the same inventory to each.
                </p>
              ) : (
                <ul className="space-y-3">
                  {shortlist.map((m) => {
                    const emailBusy = emailPendingSlug === m.slug;
                    return (
                      <li
                        key={m.slug}
                        className="flex flex-col gap-2 rounded-xl border bg-muted/30 p-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <div className="font-semibold">{m.name}</div>
                          <div className="text-xs text-muted-foreground">{m.headquarters}</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="gap-1"
                            onClick={() => void copyOutreach(m)}
                          >
                            <ClipboardCopy className="h-3.5 w-3.5" />
                            Copy request
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            className="gap-1"
                            disabled={saveMyMove.loading && emailBusy}
                            onClick={() => handleEmailOutreach(m)}
                          >
                            <Mail className="h-3.5 w-3.5" />
                            {emailBusy && !signedInUser ? 'Sign in…' : 'Email'}
                          </Button>
                          <Button type="button" size="sm" variant="ghost" asChild>
                            <Link
                              href={profileHref(m.slug)}
                              onClick={() => persistPlan()}
                            >
                              Profile
                            </Link>
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-semibold">
                  {signedInUser ? 'Your plan is ready to keep' : 'Save this plan for later?'}
                </div>
                <p className="text-sm text-muted-foreground">
                  {signedInUser
                    ? 'Signed in — open Move HQ anytime, or add a password for faster future logins.'
                    : 'Optional free My Move profile — email your plan or come back anytime. Your report is already yours above.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" className="gap-1" onClick={() => void copyPlan()}>
                  <ClipboardCopy className="h-4 w-4" />
                  Copy full plan
                </Button>
                {signedInUser ? (
                  <Button type="button" variant="outline" asChild className="gap-1">
                    <Link href="/my-move">Open Move HQ</Link>
                  </Button>
                ) : (
                  <Button type="button" onClick={openSave} className="gap-1">
                    Save My Move
                  </Button>
                )}
                {offerPasswordUpgrade ? (
                  <Button type="button" className="gap-1" asChild>
                    <Link href="/my-move/create-password?next=%2Fmy-move">
                      <KeyRound className="h-4 w-4" />
                      Create password
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep('inventory')}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Edit inventory
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/moving-calculator">Refine in full calculator</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Below wizard: quick links when still on route */}
      {step === 'route' && fromPlace && movers.length > 0 ? (
        <div className="mt-8">
          <div className="mb-3 flex items-end justify-between gap-2">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              Preview movers near{' '}
              <span className="text-primary">
                {route?.localAreaLabel || fromPlace.label}
              </span>
            </h2>
            <button
              type="button"
              onClick={goToShortlist}
              className="text-sm font-medium text-primary hover:underline"
            >
              Build full plan →
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {movers.slice(0, 4).map((m) => (
              <Link
                key={m.slug}
                href={profileHref(m.slug)}
                onClick={() => persistPlan()}
                className="group rounded-2xl border bg-card p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-1 font-semibold group-hover:text-primary">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.headquarters}</div>
                <div className="mt-2 flex items-center gap-2">
                  <StarRating rating={m.overallRating} size="sm" />
                  <span className="text-xs text-muted-foreground">
                    <EditorialReviewVolume count={m.reviewCount} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
