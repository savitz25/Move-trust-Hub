'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Loader2,
  Navigation,
  Route,
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
  consumePendingEmailMoveReport,
  peekPendingEmailMoveReport,
  stashPendingEmailMoveReport,
} from '@/lib/my-move-plan/pending-email-report';
import { buildPlanName } from '@/lib/my-move-plan/plan-library';
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
import { upsertActivePlanFromState } from '@/lib/my-move-plan/plan-library';
import type {
  MyMovePlanState,
  MyMovePlanStep,
  PlanInventoryItem,
} from '@/lib/my-move-plan/types';
import {
  CALCULATOR_FROM_PLAN_HREF,
  seedCalculatorFromPlan,
} from '@/lib/my-move-plan/calculator-bridge';
import { ReportReadyStep } from '@/components/my-move-plan/report-ready-step';
import { ErrorBoundary } from '@/components/error-boundary';
import { useCalculatorStore } from '@/store/calculator-store';
import { cn } from '@/lib/utils';

type RouteResponse = HomeRouteResult & {
  drivingMiles?: number | null;
  error?: string;
};

const PRESET_OPTIONS = MOVE_PRESETS.filter((p) => p.id !== 'custom');

const PHASES = [
  { id: 'plan', label: 'Plan', hint: 'Route' },
  { id: 'build', label: 'Build', hint: 'Movers + load' },
  { id: 'book', label: 'Book', hint: 'Report' },
] as const;

const PHASE_SHELL: Record<
  'plan' | 'build' | 'book',
  { shell: string; progress: string; chip: string; eyebrow: string }
> = {
  plan: {
    shell:
      'border-sky-200/70 bg-gradient-to-b from-sky-50/90 via-white to-white shadow-sky-900/5',
    progress: 'bg-sky-600',
    chip: 'border-sky-200 bg-sky-50 text-sky-800',
    eyebrow: 'Plan · lock your route',
  },
  build: {
    shell:
      'border-violet-200/70 bg-gradient-to-b from-violet-50/80 via-white to-white shadow-violet-900/5',
    progress: 'bg-violet-600',
    chip: 'border-violet-200 bg-violet-50 text-violet-800',
    eyebrow: 'Build · shortlist & inventory',
  },
  book: {
    shell:
      'border-emerald-200/80 bg-gradient-to-b from-emerald-50/70 via-white to-white shadow-emerald-900/5',
    progress: 'bg-emerald-600',
    chip: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    eyebrow: 'Book · report & estimates',
  },
};

type WizardProps = {
  fallbackMovers?: HomeRouteMover[];
  /** Notify parent (homepage hero) when the wizard step changes. */
  onStepChange?: (step: MyMovePlanStep) => void;
};

export function MyMovePlanWizard({ fallbackMovers = [], onStepChange }: WizardProps) {
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
  const [emailSending, setEmailSending] = useState(false);
  const [reportEmailed, setReportEmailed] = useState(false);
  const [emailedTo, setEmailedTo] = useState<string | null>(null);

  const routeAbort = useRef<AbortController | null>(null);
  const outreachHandledRef = useRef(false);
  const emailReportHandledRef = useRef(false);
  const pendingEmailModalOpenedRef = useRef(false);

  const applySavedPlan = useCallback((saved: ReturnType<typeof loadMyMovePlan>) => {
    if (!saved) return;
    if (saved.fromPlace) {
      setFromPlace(saved.fromPlace);
      setFromText(saved.fromPlace.label);
    }
    if (saved.toPlace) {
      setToPlace(saved.toPlace);
      setToText(saved.toPlace.label);
    } else if (saved.fromPlace) {
      setToPlace(null);
      setToText('');
    }
    if (saved.drivingMiles != null) setDrivingMiles(saved.drivingMiles);
    if (Array.isArray(saved.shortlist)) setShortlist(saved.shortlist);
    if (saved.preset !== undefined) setPreset(saved.preset);
    if (Array.isArray(saved.inventory)) setInventory(saved.inventory);
    if (saved.step) setStep(saved.step);
  }, []);

  // Resume session + scroll back after profile / calculator navigation
  useEffect(() => {
    const saved = loadMyMovePlan();
    applySavedPlan(saved);
    setHydrated(true);

    if (typeof window !== 'undefined' && window.location.hash === `#${MY_MOVE_PLAN_SECTION_ID}`) {
      window.requestAnimationFrame(() => {
        document
          .getElementById(MY_MOVE_PLAN_SECTION_ID)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [applySavedPlan]);

  // Re-apply plan when returning from the full calculator (SPA or bfcache)
  useEffect(() => {
    const rehydrate = () => {
      const saved = loadMyMovePlan();
      if (!saved?.inventory?.length && !saved?.step) return;
      applySavedPlan(saved);
      if (window.location.hash === `#${MY_MOVE_PLAN_SECTION_ID}`) {
        document
          .getElementById(MY_MOVE_PLAN_SECTION_ID)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('pageshow', rehydrate);
    window.addEventListener('focus', rehydrate);
    return () => {
      window.removeEventListener('pageshow', rehydrate);
      window.removeEventListener('focus', rehydrate);
    };
  }, [applySavedPlan]);

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
    // Persist into multi-plan library once the user has a route or inventory
    if (fromPlace || planSnapshot.inventory.length > 0) {
      try {
        upsertActivePlanFromState(planSnapshot);
      } catch {
        // library write is best-effort
      }
    }
  }, [planSnapshot, hydrated, fromPlace, step]);

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

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

  /** Clickable Plan / Build (and Book when inventory is ready). */
  const goToPhase = (phaseId: 'plan' | 'build' | 'book') => {
    if (phaseId === 'plan') {
      setStep('route');
      return;
    }
    if (phaseId === 'build') {
      if (!fromPlace) {
        toast.message('Lock your route first', {
          description: 'Confirm where you are moving from to build your shortlist.',
        });
        setStep('route');
        return;
      }
      // Prefer inventory if already started; otherwise shortlist
      if (inventory.length > 0 || preset) {
        setStep('inventory');
      } else {
        setStep('shortlist');
      }
      return;
    }
    // book
    if (totals.totalVolume <= 0) {
      toast.message('Build your inventory first', {
        description: 'Pick a home size so movers quote the same load.',
      });
      if (fromPlace) setStep(inventory.length || preset ? 'inventory' : 'shortlist');
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

  const openFullCalculator = useCallback(() => {
    saveMyMovePlan(planSnapshot);
    const loadFromShare = useCalculatorStore.getState().loadFromShare;
    seedCalculatorFromPlan({ loadFromShare });
    window.location.href = CALCULATOR_FROM_PLAN_HREF;
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
        toast.error('Could not open your email app — use Copy email template instead.');
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
      toast.success(`Email template for ${mover.name} copied`);
    } catch {
      toast.error('Could not copy — try again');
    }
  };

  const handleEmailOutreach = useCallback(
    (mover: HomeRouteMover) => {
      persistPlan();

      if (saveMyMove.loading) {
        toast.message('Preparing sign-in…', {
          description: 'Try again in a moment.',
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
          redirectPath: MY_MOVE_PLAN_RETURN_PATH,
          context: 'mover',
        });
        toast.message('Sign in to send estimate requests', {
          description: 'Your plan is saved — we’ll open a ready-to-send draft after you sign in.',
        });
        return;
      }

      setEmailPendingSlug(null);
      openEstimateMailto(mover);
    },
    [persistPlan, saveMyMove, openEstimateMailto]
  );

  const sendMoveReportEmail = useCallback(async (): Promise<boolean> => {
    // Prefer session snapshot so post-auth races still send the documented plan
    let sessionPlan: MyMovePlanState | null = null;
    try {
      sessionPlan = loadMyMovePlan();
    } catch {
      sessionPlan = null;
    }

    const items =
      sessionPlan?.inventory?.length && Array.isArray(sessionPlan.inventory)
        ? sessionPlan.inventory
        : Array.isArray(inventory)
          ? inventory
          : [];
    const movers =
      sessionPlan?.shortlist?.length && Array.isArray(sessionPlan.shortlist)
        ? sessionPlan.shortlist.filter(Boolean)
        : Array.isArray(shortlist)
          ? shortlist.filter(Boolean)
          : [];
    const from = sessionPlan?.fromPlace ?? fromPlace;
    const to = sessionPlan?.toPlace ?? toPlace;
    const miles =
      typeof sessionPlan?.drivingMiles === 'number'
        ? sessionPlan.drivingMiles
        : drivingMiles;
    const movePreset = sessionPlan?.preset ?? preset;
    const planForName: MyMovePlanState = {
      step: 'report',
      fromPlace: from,
      toPlace: to,
      drivingMiles: miles,
      shortlist: movers,
      preset: movePreset,
      inventory: items,
      updatedAt: new Date().toISOString(),
    };

    const { totalVolume } = planInventoryTotals(items);
    if (items.length === 0 || totalVolume <= 0) {
      toast.error('Add inventory before emailing your report');
      return false;
    }

    setEmailSending(true);
    try {
      let planName = 'My Move Report';
      try {
        planName = buildPlanName(planForName);
      } catch {
        planName = 'My Move Report';
      }

      const payload = {
        inventory: items.map((item) => ({
          id: item.id,
          name: item.name,
          volume: item.volume,
          quantity: item.quantity,
          room: item.room,
        })),
        name: planName,
        movePreset,
        isMovePlan: true,
        routeFrom: from?.label ?? null,
        routeTo: to?.label ?? null,
        drivingMiles: miles,
        shortlistNames: movers
          .map((m) => m?.name)
          .filter((n): n is string => typeof n === 'string' && n.trim().length > 0),
        shortlistSlugs: movers
          .map((m) => m?.slug)
          .filter((s): s is string => typeof s === 'string' && s.trim().length > 0),
      };

      const res = await fetch('/api/save-my-move/email-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        email?: string;
        success?: boolean;
      };

      if (!res.ok) {
        toast.error(data.error ?? 'Could not send your report email');
        return false;
      }

      const deliveredTo = data.email ?? saveMyMove.user?.email ?? null;
      setEmailedTo(deliveredTo);
      setReportEmailed(true);
      setStep('report');
      toast.success('Move report sent', {
        description: deliveredTo ? `Delivered to ${deliveredTo}` : 'Check your inbox',
      });
      return true;
    } catch (err) {
      console.error('[my-move-plan] sendMoveReportEmail failed', err);
      toast.error('Network error while sending your report', {
        description: 'Your plan is still saved — try again in a moment.',
      });
      return false;
    } finally {
      setEmailSending(false);
    }
  }, [
    inventory,
    preset,
    fromPlace,
    toPlace,
    drivingMiles,
    shortlist,
    saveMyMove.user?.email,
  ]);

  const handleEmailMeReport = useCallback(() => {
    try {
      persistPlan();
      setReportEmailed(false);
      setEmailedTo(null);

      const { totalVolume } = planInventoryTotals(inventory);
      if (!Array.isArray(inventory) || inventory.length === 0 || totalVolume <= 0) {
        toast.message('Build your inventory first', {
          description: 'We need a documented load to email your move report.',
        });
        setStep('inventory');
        return;
      }

      if (saveMyMove.loading) {
        toast.message('Preparing sign-in…');
        stashPendingEmailMoveReport();
        return;
      }

      if (!saveMyMove.user) {
        stashPendingEmailMoveReport();
        saveMyMove.openSaveModal({
          redirectPath: MY_MOVE_PLAN_RETURN_PATH,
          context: 'dashboard',
        });
        toast.message('Sign in to email your report', {
          description: 'After you sign in, we’ll send the move report to your email.',
        });
        return;
      }

      void sendMoveReportEmail();
    } catch (err) {
      console.error('[my-move-plan] handleEmailMeReport failed', err);
      toast.error('Could not start emailing your report', {
        description: 'Please try again. Your plan is still on this device.',
      });
    }
  }, [persistPlan, inventory, saveMyMove, sendMoveReportEmail]);

  // Allow a new post-auth flow after sign-out
  useEffect(() => {
    if (!saveMyMove.user) {
      outreachHandledRef.current = false;
      emailReportHandledRef.current = false;
      pendingEmailModalOpenedRef.current = false;
    }
  }, [saveMyMove.user]);

  // After magic-link / OAuth / password sign-in, email stashed move report
  useEffect(() => {
    if (!hydrated || saveMyMove.loading || !saveMyMove.user) return;
    if (emailReportHandledRef.current) return;
    if (!consumePendingEmailMoveReport()) return;

    emailReportHandledRef.current = true;
    const plan = loadMyMovePlan();
    if (plan) {
      applySavedPlan(plan);
      setStep(plan.step || 'report');
    } else {
      setStep('report');
    }

    window.setTimeout(() => {
      void sendMoveReportEmail();
    }, 400);
  }, [
    hydrated,
    saveMyMove.loading,
    saveMyMove.user,
    sendMoveReportEmail,
    applySavedPlan,
  ]);

  // If the user clicked email while auth was still loading, open the sign-in
  // modal once the provider is ready (and they are still signed out).
  useEffect(() => {
    if (!hydrated || saveMyMove.loading || saveMyMove.user) return;
    if (pendingEmailModalOpenedRef.current) return;
    if (!peekPendingEmailMoveReport()) return;
    pendingEmailModalOpenedRef.current = true;
    saveMyMove.openSaveModal({
      redirectPath: MY_MOVE_PLAN_RETURN_PATH,
      context: 'dashboard',
    });
  }, [hydrated, saveMyMove.loading, saveMyMove.user, saveMyMove]);

  // After magic-link / OAuth / password sign-in, complete a stashed per-mover outreach
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

    if (plan?.step) {
      setStep(plan.step);
    }

    window.setTimeout(() => {
      openEstimateMailto(mover, plan);
    }, 350);
  }, [hydrated, saveMyMove.loading, saveMyMove.user, shortlist, openEstimateMailto]);

  const openSave = useCallback(() => {
    persistPlan();
    saveMyMove.openSaveModal({
      redirectPath: '/my-move',
      context: 'dashboard',
    });
  }, [saveMyMove, persistPlan]);

  const removeMover = useCallback((slug: string) => {
    setShortlist((prev) => prev.filter((m) => m.slug !== slug));
    toast.message('Removed from shortlist');
  }, []);

  const signedInUser = saveMyMove.user;
  const phaseTheme = PHASE_SHELL[activePhase];
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
      <div
        className={cn(
          'rounded-3xl border p-4 shadow-xl backdrop-blur-md sm:p-6 md:p-8 transition-colors duration-300',
          phaseTheme.shell
        )}
      >
        {/* Phase stepper */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden />
              <span>
                My Move Plan
                <span className="hidden sm:inline"> · no lead forms · independent</span>
              </span>
            </div>
            {step !== 'report' ? (
              <div
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold',
                  phaseTheme.chip
                )}
                aria-live="polite"
              >
                Readiness {readiness}
                <span className="font-normal opacity-70">/100</span>
              </div>
            ) : null}
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {phaseTheme.eyebrow}
          </p>

          <div className="flex items-center gap-1 sm:gap-2" role="list" aria-label="Plan phases">
            {PHASES.map((phase, idx) => {
              const active = phase.id === activePhase;
              const done =
                (phase.id === 'plan' && step !== 'route') ||
                (phase.id === 'build' && step === 'report') ||
                (phase.id === 'book' && step === 'report');
              const clickable =
                phase.id === 'plan' ||
                phase.id === 'build' ||
                (phase.id === 'book' && totals.totalVolume > 0);
              return (
                <div key={phase.id} className="flex flex-1 items-center gap-1 sm:gap-2" role="listitem">
                  <button
                    type="button"
                    disabled={!clickable && !active}
                    onClick={() => goToPhase(phase.id)}
                    aria-current={active ? 'step' : undefined}
                    className={cn(
                      'flex min-h-9 w-full flex-1 flex-col items-center justify-center rounded-2xl px-1 py-1.5 text-center text-xs font-semibold transition-colors sm:min-h-11 sm:text-sm',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                      clickable && !active && 'cursor-pointer hover:opacity-90',
                      active && activePhase === 'plan' && 'bg-sky-600 text-white shadow-sm',
                      active && activePhase === 'build' && 'bg-violet-600 text-white shadow-sm',
                      active && activePhase === 'book' && 'bg-emerald-600 text-white shadow-sm',
                      done && !active && 'bg-foreground/10 text-foreground',
                      !active && !done && 'bg-muted/80 text-muted-foreground',
                      !clickable && !active && 'cursor-default opacity-70'
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {done && !active ? <Check className="h-3.5 w-3.5" aria-hidden /> : null}
                      {phase.label}
                    </span>
                    <span
                      className={cn(
                        'hidden text-[10px] font-normal sm:block',
                        active ? 'text-white/80' : 'text-muted-foreground'
                      )}
                    >
                      {phase.hint}
                    </span>
                  </button>
                  {idx < PHASES.length - 1 ? (
                    <div className="hidden h-px w-3 bg-border sm:block" aria-hidden />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-muted/80">
            <div
              className={cn('h-full rounded-full transition-all duration-500 ease-out', phaseTheme.progress)}
              style={{ width: `${barPct}%` }}
            />
          </div>
        </div>

        {/* STEP: route (Plan) */}
        {step === 'route' ? (
          <div className="space-y-5">
            <div className="rounded-2xl border border-sky-100 bg-white/80 p-4 sm:p-5">
              <div className="mb-1 flex items-center gap-2 text-sky-700">
                <Route className="h-4 w-4" aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-wide">Step 1 · Plan</span>
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-[#0A2540] sm:text-2xl">
                Where are you moving?
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Start with your pickup city or ZIP. Destination is optional — we&apos;ll match
                trusted movers near origin and estimate distance for your report.
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
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
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-sky-200/80 bg-sky-50/80 px-3 py-2.5 text-sm">
                <Check className="h-4 w-4 text-sky-700" aria-hidden />
                <span className="font-semibold text-foreground">
                  {fromPlace.label}
                  {toPlace ? ` → ${toPlace.label}` : ''}
                </span>
                {drivingMiles ? (
                  <Badge variant="secondary" className="tabular-nums">
                    ~{drivingMiles.toLocaleString()} mi
                  </Badge>
                ) : routeLoading ? (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" /> Calculating route…
                  </span>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Type a city (e.g. Boca Raton) or ZIP — confirm City, State when asked. You&apos;re
                almost ready to build your plan.
              </p>
            )}

            <Button
              type="button"
              size="lg"
              disabled={!fromPlace || routeLoading}
              onClick={goToShortlist}
              className="h-14 w-full gap-2 rounded-2xl bg-sky-600 text-base font-semibold shadow-md hover:bg-sky-700 sm:h-16 sm:text-lg"
            >
              {routeLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              ) : (
                <Truck className="h-5 w-5" aria-hidden />
              )}
              Continue to shortlist
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
          </div>
        ) : null}

        {/* STEP: shortlist (Build) */}
        {step === 'shortlist' ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 rounded-2xl border border-violet-100 bg-white/80 p-4">
              <div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
                  Step 2 · Build · Shortlist
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-[#0A2540] sm:text-2xl">
                  Pick up to 3 movers
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Shortlist favorites for{' '}
                  <span className="font-medium text-foreground">
                    {route?.localAreaLabel || fromPlace?.label || 'your area'}
                  </span>
                  . Same inventory goes to each later — that&apos;s the fair comparison.
                </p>
              </div>
              <Badge
                className={cn(
                  'shrink-0 border-violet-200 bg-violet-100 text-violet-900 hover:bg-violet-100',
                  shortlist.length === 3 && 'border-emerald-200 bg-emerald-100 text-emerald-900'
                )}
              >
                {shortlist.length}/3
              </Badge>
            </div>

            <div className="space-y-2 rounded-2xl border border-violet-200/70 bg-violet-50/90 px-4 py-3 text-sm leading-relaxed text-foreground">
              <p>
                <strong className="font-semibold text-violet-900">Why shortlist three movers?</strong>{' '}
                Three estimates on the <em>same</em> inventory is how you compare fairly — not
                vague phone quotes on different load sizes.
              </p>
              <p className="text-violet-950/80">
                <strong className="font-semibold text-violet-900">Shared inventory next.</strong>{' '}
                After you pick movers, you&apos;ll document one load profile. Every shortlisted
                carrier gets that same brief — no lead resellers, no paid ranking.
              </p>
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
                                  ? 'border-violet-500 bg-violet-50 shadow-sm ring-1 ring-violet-200'
                                  : 'border-border bg-card hover:border-violet-300'
                              )}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <div className="font-semibold tracking-tight leading-snug">
                                    {m.name}
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="mt-1 border-violet-200 bg-background px-1.5 py-0 text-[10px] font-medium capitalize text-violet-800"
                                  >
                                    {group.tier}
                                  </Badge>
                                </div>
                                <span
                                  className={cn(
                                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]',
                                    selected
                                      ? 'border-violet-600 bg-violet-600 text-white'
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
                              <div className="mt-1 text-xs font-medium text-violet-800">
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
                Back to route
              </Button>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="button" variant="outline" onClick={goToInventory}>
                  Skip for now
                </Button>
                <Button
                  type="button"
                  onClick={goToInventory}
                  className="gap-2 bg-violet-600 hover:bg-violet-700"
                >
                  Continue to inventory
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {/* STEP: inventory (Build) */}
        {step === 'inventory' ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-violet-100 bg-white/80 p-4">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
                Step 2 · Build · Inventory
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-[#0A2540] sm:text-2xl">
                Document one shared load for all three movers
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tap a home size to pre-load typical items, then refine quantities. This inventory
                becomes the quote brief every shortlisted mover receives — so estimates stay
                comparable.
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
                    'hover:border-violet-400 hover:bg-violet-50/80 active:scale-[0.98]',
                    preset === p.id
                      ? 'border-violet-600 bg-violet-100/80 shadow-sm'
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
              <div className="rounded-2xl border border-violet-200/60 bg-gradient-to-br from-violet-50/80 via-white to-white p-4 shadow-sm">
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
                      className="h-full rounded-full bg-violet-500 transition-all duration-300"
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

            <div className="rounded-xl border border-violet-200/60 bg-white/70 px-3 py-3 sm:flex sm:items-center sm:justify-between sm:gap-3">
              <p className="text-sm text-muted-foreground">
                Need room-by-room detail? Open the full calculator — then return to your report
                with the updated inventory.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-full shrink-0 border-violet-300 sm:mt-0 sm:w-auto"
                onClick={openFullCalculator}
              >
                Open full calculator
              </Button>
            </div>

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
                className="gap-2 bg-violet-600 hover:bg-violet-700"
              >
                See my move report
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : null}

        {/* STEP: report (Book · Report Ready) */}
        {step === 'report' ? (
          <ErrorBoundary
            fallbackTitle="Could not load your move report"
            onRetry={() => {
              setReportEmailed(false);
              setEmailedTo(null);
              setEmailSending(false);
              setStep('report');
            }}
          >
            <ReportReadyStep
              readiness={readiness}
              fromPlace={fromPlace}
              toPlace={toPlace}
              drivingMiles={drivingMiles}
              inventory={inventory}
              totalVolume={totals.totalVolume}
              totalItems={totals.totalItems}
              weight={weight}
              truck={truck}
              shortlist={shortlist}
              signedIn={Boolean(signedInUser)}
              userEmail={signedInUser?.email ?? null}
              emailPendingSlug={emailPendingSlug}
              offerPasswordUpgrade={offerPasswordUpgrade}
              authLoading={saveMyMove.loading}
              emailSending={emailSending}
              reportEmailed={reportEmailed}
              emailedTo={emailedTo}
              profileHref={profileHref}
              onEmailMeReport={handleEmailMeReport}
              onEmailMover={handleEmailOutreach}
              onCopyTemplate={(m) => void copyOutreach(m)}
              onCopyPlan={() => void copyPlan()}
              onSaveMyMove={openSave}
              onEditInventory={() => setStep('inventory')}
              onEditShortlist={() => setStep('shortlist')}
              onRemoveMover={removeMover}
              onPersistPlan={persistPlan}
              onOpenFullCalculator={openFullCalculator}
              onResetEmailConfirmation={() => {
                setReportEmailed(false);
                setEmailedTo(null);
              }}
            />
          </ErrorBoundary>
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
