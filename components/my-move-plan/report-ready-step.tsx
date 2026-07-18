'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  ExternalLink,
  KeyRound,
  Mail,
  MapPin,
  MoreHorizontal,
  Package,
  PartyPopper,
  ShieldCheck,
  Truck,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { HomeRouteMover } from '@/lib/home/resolve-route-from-zip';
import type { ConfirmedPlace } from '@/components/location/location-place-input';
import { formatItemDisplayName } from '@/lib/moving-calculator/display-names';
import type { PlanInventoryItem } from '@/lib/my-move-plan/types';

type TruckRec = {
  truck: string;
  label: string;
  movers: string;
  duration?: string;
};

type Props = {
  readiness: number;
  fromPlace: ConfirmedPlace | null;
  toPlace: ConfirmedPlace | null;
  drivingMiles: number | null;
  inventory: PlanInventoryItem[];
  totalVolume: number;
  totalItems: number;
  weight: number;
  truck: TruckRec;
  shortlist: HomeRouteMover[];
  signedIn: boolean;
  userEmail?: string | null;
  emailPendingSlug: string | null;
  offerPasswordUpgrade: boolean;
  authLoading: boolean;
  emailSending?: boolean;
  reportEmailed?: boolean;
  emailedTo?: string | null;
  profileHref: (slug: string) => string;
  onEmailMeReport: () => void;
  onEmailMover: (mover: HomeRouteMover) => void;
  onCopyTemplate: (mover: HomeRouteMover) => void;
  onCopyPlan: () => void;
  onSaveMyMove: () => void;
  onEditInventory: () => void;
  onEditShortlist: () => void;
  onRemoveMover: (slug: string) => void;
  onPersistPlan: () => void;
  onOpenFullCalculator?: () => void;
  onResetEmailConfirmation?: () => void;
};

export function ReportReadyStep({
  readiness,
  fromPlace,
  toPlace,
  drivingMiles,
  inventory,
  totalVolume,
  totalItems,
  weight,
  truck,
  shortlist,
  signedIn,
  userEmail = null,
  emailPendingSlug,
  offerPasswordUpgrade,
  authLoading,
  emailSending = false,
  reportEmailed = false,
  emailedTo = null,
  profileHref,
  onEmailMeReport,
  onEmailMover,
  onCopyTemplate,
  onCopyPlan,
  onSaveMyMove,
  onEditInventory,
  onEditShortlist,
  onRemoveMover,
  onPersistPlan,
  onOpenFullCalculator,
  onResetEmailConfirmation,
}: Props) {
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [menuOpenSlug, setMenuOpenSlug] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Defensive: never assume parent passed arrays (session restore / partial plans)
  const safeShortlist = (Array.isArray(shortlist) ? shortlist : []).filter(
    (m): m is HomeRouteMover => Boolean(m && typeof m.slug === 'string' && m.slug)
  );
  const safeInventory = (Array.isArray(inventory) ? inventory : []).filter(
    (item): item is PlanInventoryItem => Boolean(item && typeof item.name === 'string')
  );
  const inventoryByRoom = useMemo(() => {
    const groups = new Map<string, PlanInventoryItem[]>();
    for (const item of safeInventory) {
      const room = item.room?.trim() || 'Unassigned';
      const list = groups.get(room) ?? [];
      list.push(item);
      groups.set(room, list);
    }
    return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [safeInventory]);
  const safeVolume = Number.isFinite(totalVolume) ? totalVolume : 0;
  const safeWeight = Number.isFinite(weight) ? weight : 0;
  const safeItems = Number.isFinite(totalItems) ? totalItems : 0;
  const safeReadiness = Number.isFinite(readiness) ? readiness : 0;
  const truckLabel = truck?.truck || 'Truck size TBD';
  const truckSize = truck?.label || 'Size TBD';
  const truckMovers = truck?.movers || '';
  const truckDuration = truck?.duration;

  const n = safeShortlist.length;
  const primaryLabel = signedIn
    ? 'Email me my move report'
    : 'Sign in & email me my report';
  const primaryBusy = authLoading || emailSending;

  useEffect(() => {
    if (!menuOpenSlug) return;
    const onDoc = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenSlug(null);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [menuOpenSlug]);

  if (reportEmailed) {
    const deliveredTo = emailedTo || userEmail || 'your inbox';
    return (
      <div className="space-y-6 sm:space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-5 py-8 text-center shadow-sm sm:px-8 sm:py-10">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-200/30 blur-2xl"
            aria-hidden
          />
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
            <CheckCircle2 className="h-9 w-9" aria-hidden />
          </div>
          <p className="relative mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Report delivered
          </p>
          <h2 className="relative mt-2 text-balance text-2xl font-semibold tracking-tight text-[#0A2540] sm:text-3xl">
            Your move report has been sent
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            We emailed your professional move report to{' '}
            <strong className="text-foreground">{deliveredTo}</strong>.
          </p>
        </div>

        <section className="rounded-2xl border bg-card px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold">What to do next</h3>
          <ol className="mt-3 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                1
              </span>
              <span>
                <strong className="text-foreground">Check your inbox</strong> (and spam/junk) for
                “Your Move Report” from Move Trust Hub. Open the PDF attachment if included.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                2
              </span>
              <span>
                <strong className="text-foreground">Contact your shortlisted movers</strong> and
                share this same report so every quote uses identical inventory and route details.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                3
              </span>
              <span>
                <strong className="text-foreground">Compare fairly</strong>
                {n > 0
                  ? ` — your ${n} shortlisted mover${n === 1 ? '' : 's'} should price the same load for side-by-side estimates.`
                  : ' — shortlist up to 3 movers so you can compare apples-to-apples quotes.'}
              </span>
            </li>
          </ol>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {safeShortlist.slice(0, 3).map((m) => {
              let href = `/companies/${m.slug}`;
              try {
                href = profileHref(m.slug);
              } catch {
                // keep fallback href
              }
              return (
                <Button key={m.slug} variant="outline" size="sm" asChild className="justify-start">
                  <Link
                    href={href}
                    onClick={() => {
                      try {
                        onPersistPlan();
                      } catch {
                        // non-fatal
                      }
                    }}
                  >
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    {m.name || m.slug}
                  </Link>
                </Button>
              );
            })}
            <Button variant="outline" size="sm" asChild>
              <Link href="/my-move/reports">My Move Reports</Link>
            </Button>
            {onResetEmailConfirmation ? (
              <Button type="button" variant="ghost" size="sm" onClick={onResetEmailConfirmation}>
                Back to report
              </Button>
            ) : null}
          </div>
        </section>

        {n > 0 ? (
          <section className="rounded-2xl border bg-muted/20 px-4 py-4 sm:px-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden />
              Fair comparison reminder
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              All shortlisted movers should receive the same inventory and route from this report —
              that&apos;s how you get comparable estimates. No lead resellers; you contact movers
              directly.
            </p>
          </section>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Celebratory header */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-5 py-7 text-center shadow-sm sm:px-8 sm:py-9">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-200/30 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-sky-200/40 blur-2xl"
          aria-hidden
        />

        <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
          <PartyPopper className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </div>

        <p className="relative mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Book · report ready
        </p>
        <h2 className="relative mt-2 text-balance text-2xl font-semibold tracking-tight text-[#0A2540] sm:text-3xl">
          Your move report is ready
        </h2>
        <p className="relative mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Everything you need for comparable estimates — same route, same inventory, three
          independent movers with documented inventory.
        </p>

        {/* Achievement score */}
        <div
          className="relative mx-auto mt-6 inline-flex flex-col items-center rounded-2xl border border-emerald-200/80 bg-white/90 px-6 py-4 shadow-sm"
          aria-live="polite"
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
            Move readiness
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-4xl font-bold tabular-nums tracking-tight text-emerald-700 sm:text-5xl">
              {safeReadiness}
            </span>
            <span className="text-lg font-medium text-muted-foreground">/100</span>
          </div>
          {safeReadiness >= 100 ? (
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              Plan complete — ready to request quotes
            </span>
          ) : (
            <span className="mt-1 text-xs text-muted-foreground">
              Add shortlist movers or inventory to strengthen your report
            </span>
          )}
        </div>
      </div>

      {/* Unified report document */}
      <article className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md shadow-slate-900/5">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b bg-slate-50/90 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Package className="h-4 w-4 text-primary" aria-hidden />
            Your quote brief
          </div>
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Independent · Move Trust Hub
          </span>
        </header>

        <div className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="space-y-1.5 p-4 sm:p-5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Route
            </div>
            <p className="text-sm font-semibold leading-snug text-foreground">
              {fromPlace?.label ?? 'Origin TBD'}
            </p>
            {toPlace ? (
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground/50">→</span> {toPlace.label}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">Destination optional</p>
            )}
            {drivingMiles ? (
              <p className="text-xs font-medium tabular-nums text-primary">
                ~{drivingMiles.toLocaleString()} miles est.
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5 p-4 sm:p-5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <Package className="h-3.5 w-3.5" aria-hidden />
              Load size
            </div>
            <p className="text-2xl font-semibold tabular-nums tracking-tight">
              {safeVolume.toLocaleString()}
              <span className="ml-1 text-sm font-normal text-muted-foreground">cu ft</span>
            </p>
            <p className="text-xs text-muted-foreground">
              ~{safeWeight.toLocaleString()} lbs · {safeItems} items
            </p>
            <button
              type="button"
              onClick={() => setInventoryOpen((o) => !o)}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              {inventoryOpen ? (
                <>
                  Hide inventory <ChevronUp className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  Preview inventory <ChevronDown className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>

          <div className="space-y-1.5 p-4 sm:p-5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <Truck className="h-3.5 w-3.5" aria-hidden />
              Recommended truck
            </div>
            <p className="text-sm font-semibold leading-snug">{truckLabel}</p>
            <p className="text-xs text-muted-foreground">
              {truckSize}
              {truckMovers ? ` · ${truckMovers}` : ''}
              {truckDuration ? ` · ${truckDuration}` : ''}
            </p>
          </div>
        </div>

        {inventoryOpen ? (
          <div className="border-t bg-slate-50/50 px-4 py-3 sm:px-5">
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Inventory ({safeInventory.length} lines · {safeItems} pcs)
              </p>
              <p className="text-xs font-semibold tabular-nums text-foreground">
                {safeVolume.toLocaleString()} cu ft total
              </p>
            </div>
            <div className="max-h-56 space-y-3 overflow-y-auto">
              {inventoryByRoom.map(([room, items]) => {
                const roomVol = Math.round(
                  items.reduce((s, i) => s + i.volume * i.quantity, 0)
                );
                const roomPcs = items.reduce((s, i) => s + i.quantity, 0);
                return (
                  <div key={room}>
                    <div className="mb-1 flex items-baseline justify-between gap-2 border-b border-border/60 pb-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                        {room}
                      </span>
                      <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                        {roomVol.toLocaleString()} cu ft · {roomPcs} pcs
                      </span>
                    </div>
                    <ul className="space-y-0.5 text-xs sm:text-sm">
                      {items.map((item) => {
                        const lineVol = Math.round(item.volume * item.quantity);
                        return (
                          <li
                            key={item.id || `${room}-${item.name}`}
                            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-2 py-0.5"
                          >
                            <span className="tabular-nums font-semibold text-foreground">
                              {item.quantity}&nbsp;×
                            </span>
                            <span className="min-w-0 truncate text-foreground">
                              {formatItemDisplayName(item.name)}
                            </span>
                            <span className="shrink-0 tabular-nums text-muted-foreground">
                              {lineVol.toLocaleString()} cu ft
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </article>

      {/* Primary conversion — email me the report */}
      <section className="space-y-3 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/[0.06] to-transparent p-4 sm:p-5">
        <div className="flex items-start gap-2">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div>
            <h3 className="text-base font-semibold tracking-tight sm:text-lg">
              Get your report by email
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              We&apos;ll send a professional move report
              {signedIn && userEmail ? (
                <>
                  {' '}
                  to <strong className="text-foreground">{userEmail}</strong>
                </>
              ) : (
                ' to your inbox'
              )}
              — route, inventory, and truck profile you can share with every shortlisted mover.
            </p>
          </div>
        </div>

        <Button
          type="button"
          size="lg"
          className="h-14 w-full gap-2 rounded-2xl text-base font-semibold shadow-md shadow-primary/20 sm:h-16 sm:text-lg"
          disabled={primaryBusy || safeVolume <= 0}
          onClick={() => {
            try {
              onEmailMeReport();
            } catch {
              // Parent also guards; never let a sync throw white-screen the app
            }
          }}
        >
          <Mail className="h-5 w-5" aria-hidden />
          {emailSending ? 'Sending report…' : primaryLabel}
        </Button>
        {safeVolume <= 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            Add inventory before emailing your report.
          </p>
        ) : !signedIn ? (
          <p className="text-center text-xs text-muted-foreground">
            Free My Move sign-in required so we know where to send your report. Magic link, Google,
            or password — no spam.
          </p>
        ) : null}

        <div className="pt-1">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Users className="h-4 w-4 text-primary" aria-hidden />
            Your shortlist
            {n > 0 ? (
              <span className="font-normal text-muted-foreground">({n}/3)</span>
            ) : null}
          </div>
        </div>

        {n === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            You have not shortlisted movers yet.{' '}
            <button
              type="button"
              className="font-medium text-primary hover:underline"
              onClick={onEditShortlist}
            >
              Pick up to 3
            </button>{' '}
            so you can share this same report for fair quotes.
          </p>
        ) : (
          <ul className="divide-y rounded-xl border bg-white/90">
            {safeShortlist.map((m, idx) => {
              const open = menuOpenSlug === m.slug;
              const moverName = m.name || m.slug;
              let moverHref = `/companies/${m.slug}`;
              try {
                moverHref = profileHref(m.slug);
              } catch {
                // keep fallback
              }
              return (
                <li
                  key={m.slug}
                  className="flex items-center gap-3 px-3 py-2.5 sm:px-4"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800"
                    aria-hidden
                  >
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{moverName}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {m.headquarters || 'Shortlisted mover'}
                    </div>
                  </div>
                  <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  <div className="relative shrink-0" ref={open ? menuRef : undefined}>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      aria-label={`More actions for ${moverName}`}
                      aria-expanded={open}
                      onClick={() =>
                        setMenuOpenSlug((s) => (s === m.slug ? null : m.slug))
                      }
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    {open ? (
                      <div className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-lg border bg-popover py-1 text-sm shadow-lg">
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted"
                          onClick={() => {
                            setMenuOpenSlug(null);
                            try {
                              onCopyTemplate(m);
                            } catch {
                              // non-fatal
                            }
                          }}
                        >
                          <ClipboardCopy className="h-3.5 w-3.5" />
                          Copy email template
                        </button>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted"
                          disabled={authLoading && emailPendingSlug === m.slug}
                          onClick={() => {
                            setMenuOpenSlug(null);
                            try {
                              onEmailMover(m);
                            } catch {
                              // non-fatal
                            }
                          }}
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Email this mover
                        </button>
                        <Link
                          href={moverHref}
                          onClick={() => {
                            try {
                              onPersistPlan();
                            } catch {
                              // non-fatal
                            }
                            setMenuOpenSlug(null);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 hover:bg-muted"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          View profile
                        </Link>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-destructive hover:bg-muted"
                          onClick={() => {
                            setMenuOpenSlug(null);
                            onRemoveMover(m.slug);
                          }}
                        >
                          Remove from shortlist
                        </button>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {n > 0 ? (
          <button
            type="button"
            onClick={onEditShortlist}
            className="text-xs font-medium text-muted-foreground hover:text-primary hover:underline"
          >
            Edit shortlist
          </button>
        ) : null}
      </section>

      {/* What happens next */}
      <section className="rounded-2xl border bg-card px-4 py-4 sm:px-5">
        <h3 className="text-sm font-semibold">What happens next</h3>
        <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
          <li className="flex gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
              1
            </span>
            <span>
              Typical reply time is <strong className="text-foreground">1–2 business days</strong>{' '}
              after you send your report.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
              2
            </span>
            <span>
              All shortlisted movers quote the <strong className="text-foreground">same inventory</strong>{' '}
              — that&apos;s how you compare fairly.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800">
              <ShieldCheck className="h-3 w-3" aria-hidden />
            </span>
            <span>
              Your information goes only to these movers —{' '}
              <strong className="text-foreground">no lead resellers</strong>, no paid ranking.
            </span>
          </li>
        </ul>
      </section>

      {/* Tertiary footer */}
      <footer className="flex flex-col gap-3 border-t border-dashed pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <button
            type="button"
            onClick={onEditInventory}
            className="text-muted-foreground hover:text-foreground hover:underline"
          >
            Edit inventory
          </button>
          <button
            type="button"
            onClick={onCopyPlan}
            className="text-muted-foreground hover:text-foreground hover:underline"
          >
            Copy full plan
          </button>
          <Link
            href="/my-move/reports"
            className="text-muted-foreground hover:text-foreground hover:underline"
          >
            All my plans
          </Link>
          {signedIn ? (
            <Link
              href="/my-move"
              className="text-muted-foreground hover:text-foreground hover:underline"
            >
              Open Move HQ
            </Link>
          ) : (
            <button
              type="button"
              onClick={onSaveMyMove}
              className="text-muted-foreground hover:text-foreground hover:underline"
            >
              Save My Move
            </button>
          )}
          {offerPasswordUpgrade ? (
            <Link
              href="/my-move/create-password?next=%2Fmy-move"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
            >
              <KeyRound className="h-3.5 w-3.5" />
              Create password
            </Link>
          ) : null}
        </div>
        {onOpenFullCalculator ? (
          <button
            type="button"
            onClick={onOpenFullCalculator}
            className="text-left text-xs text-muted-foreground hover:text-primary hover:underline"
          >
            Refine inventory in full calculator →
          </button>
        ) : null}
      </footer>
    </div>
  );
}
