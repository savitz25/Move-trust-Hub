'use client';

import { useEffect, useRef, useState } from 'react';
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
  emailPendingSlug: string | null;
  offerPasswordUpgrade: boolean;
  authLoading: boolean;
  profileHref: (slug: string) => string;
  onSendAll: () => void;
  onEmailMover: (mover: HomeRouteMover) => void;
  onCopyTemplate: (mover: HomeRouteMover) => void;
  onCopyPlan: () => void;
  onSaveMyMove: () => void;
  onEditInventory: () => void;
  onEditShortlist: () => void;
  onRemoveMover: (slug: string) => void;
  onPersistPlan: () => void;
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
  emailPendingSlug,
  offerPasswordUpgrade,
  authLoading,
  profileHref,
  onSendAll,
  onEmailMover,
  onCopyTemplate,
  onCopyPlan,
  onSaveMyMove,
  onEditInventory,
  onEditShortlist,
  onRemoveMover,
  onPersistPlan,
}: Props) {
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [menuOpenSlug, setMenuOpenSlug] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const n = shortlist.length;
  const sendLabel =
    n === 0
      ? 'Pick movers to send your report'
      : n === 1
        ? 'Send report to this mover'
        : `Send report to all ${n} movers`;

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
          independent movers. No lead fees. No ranking payola.
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
              {readiness}
            </span>
            <span className="text-lg font-medium text-muted-foreground">/100</span>
          </div>
          {readiness >= 100 ? (
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
              {totalVolume.toLocaleString()}
              <span className="ml-1 text-sm font-normal text-muted-foreground">cu ft</span>
            </p>
            <p className="text-xs text-muted-foreground">
              ~{weight.toLocaleString()} lbs · {totalItems} items
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
            <p className="text-sm font-semibold leading-snug">{truck.truck}</p>
            <p className="text-xs text-muted-foreground">
              {truck.label} · {truck.movers}
              {truck.duration ? ` · ${truck.duration}` : ''}
            </p>
          </div>
        </div>

        {inventoryOpen ? (
          <div className="border-t bg-slate-50/50 px-4 py-3 sm:px-5">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Inventory line items ({inventory.length})
            </p>
            <ul className="max-h-48 space-y-1 overflow-y-auto text-xs sm:text-sm">
              {inventory.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between gap-2 border-b border-border/40 py-1 last:border-0"
                >
                  <span className="min-w-0 truncate">
                    {item.name}
                    {item.room ? (
                      <span className="text-muted-foreground"> · {item.room}</span>
                    ) : null}
                  </span>
                  <span className="shrink-0 tabular-nums text-muted-foreground">
                    ×{item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>

      {/* Primary conversion */}
      <section className="space-y-3 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/[0.06] to-transparent p-4 sm:p-5">
        <div className="flex items-start gap-2">
          <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div>
            <h3 className="text-base font-semibold tracking-tight sm:text-lg">
              Get comparable estimates
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              One shared report → fair side-by-side quotes from your shortlist.
            </p>
          </div>
        </div>

        <Button
          type="button"
          size="lg"
          className="h-14 w-full gap-2 rounded-2xl text-base font-semibold shadow-md shadow-primary/20 sm:h-16 sm:text-lg"
          disabled={authLoading}
          onClick={onSendAll}
        >
          <Mail className="h-5 w-5" aria-hidden />
          {sendLabel}
        </Button>

        {n === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            You have not shortlisted movers yet.{' '}
            <button
              type="button"
              className="font-medium text-primary hover:underline"
              onClick={onEditShortlist}
            >
              Pick up to 3
            </button>
          </p>
        ) : (
          <ul className="divide-y rounded-xl border bg-white/90">
            {shortlist.map((m, idx) => {
              const open = menuOpenSlug === m.slug;
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
                    <div className="truncate text-sm font-semibold">{m.name}</div>
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
                      aria-label={`More actions for ${m.name}`}
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
                            onCopyTemplate(m);
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
                            onEmailMover(m);
                          }}
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Email this mover
                        </button>
                        <Link
                          href={profileHref(m.slug)}
                          onClick={() => {
                            onPersistPlan();
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
        <Link
          href="/moving-calculator"
          className="text-xs text-muted-foreground hover:text-primary hover:underline"
        >
          Refine in full calculator →
        </Link>
      </footer>
    </div>
  );
}
