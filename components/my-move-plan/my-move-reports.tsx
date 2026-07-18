'use client';

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import {
  Archive,
  ArchiveRestore,
  FileText,
  MapPin,
  MoreHorizontal,
  Package,
  Pencil,
  Send,
  Trash2,
  Truck,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useSaveMyMove } from '@/components/save-my-move/save-my-move-provider';
import {
  archiveLocalPlan,
  deleteLocalPlan,
  listLocalPlans,
  mergeCloudPlansIntoLocal,
  openPlanInSession,
  planStats,
  renameLocalPlan,
  snapshotSessionPlanToLibrary,
  upsertLocalWithCloudId,
  type MovePlanRecord,
} from '@/lib/my-move-plan/plan-library';
import { saveMyMovePlan } from '@/lib/my-move-plan/storage';
import { MY_MOVE_PLAN_RETURN_PATH } from '@/lib/my-move-plan/return-path';
import {
  archiveCloudMovePlanAction,
  deleteCloudMovePlanAction,
  listCloudMovePlansAction,
  upsertCloudMovePlanAction,
} from '@/actions/move-plans';
import { cn } from '@/lib/utils';

type Props = {
  /**
   * Dashboard embedding mode:
   * - full featured plan cards as the visual priority
   * - not a thin strip
   */
  compact?: boolean;
  /** Optional: notify parent when plan count is known (for layout hierarchy). */
  onPlanCount?: (count: number) => void;
};

export function MyMoveReports({ compact = false, onPlanCount }: Props) {
  const router = useRouter();
  const { user, openSaveModal } = useSaveMyMove();
  const [plans, setPlans] = useState<MovePlanRecord[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(() => {
    // Capture current wizard session into library if meaningful
    snapshotSessionPlanToLibrary();
    setPlans(listLocalPlans({ includeArchived: showArchived }));
  }, [showArchived]);

  useEffect(() => {
    refresh();
    setHydrated(true);
  }, [refresh]);

  // Pull cloud plans when signed in
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    startTransition(async () => {
      const { plans: cloud } = await listCloudMovePlansAction({
        includeArchived: true,
      });
      if (cancelled || !cloud.length) return;
      mergeCloudPlansIntoLocal(cloud);
      // Push local-only plans up
      const local = listLocalPlans({ includeArchived: true });
      for (const p of local) {
        if (p.cloudId) continue;
        if (!p.plan.fromPlace && p.plan.inventory.length === 0) continue;
        const res = await upsertCloudMovePlanAction({
          name: p.name,
          plan: p.plan,
          archived: p.archived,
        });
        if (res.success && res.cloudId) {
          upsertLocalWithCloudId(p.id, res.cloudId);
        }
      }
      if (!cancelled) {
        setPlans(listLocalPlans({ includeArchived: showArchived }));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [user, showArchived]);

  const visible = useMemo(
    () =>
      showArchived ? plans : plans.filter((p) => !p.archived),
    [plans, showArchived]
  );

  useEffect(() => {
    if (!hydrated) return;
    onPlanCount?.(visible.length);
  }, [hydrated, visible.length, onPlanCount]);

  function openPlan(id: string, stepOverride?: 'report' | 'inventory' | 'shortlist') {
    const record = openPlanInSession(id);
    if (!record) {
      toast.error('Plan not found');
      return;
    }
    if (stepOverride) {
      saveMyMovePlan({ ...record.plan, step: stepOverride });
    }
    toast.success('Plan loaded', {
      description: 'Continue from your My Move Plan on the homepage.',
    });
    router.push(MY_MOVE_PLAN_RETURN_PATH);
  }

  function handleDelete(id: string, cloudId?: string | null) {
    if (!window.confirm('Delete this move plan permanently?')) return;
    deleteLocalPlan(id);
    if (cloudId && user) {
      startTransition(async () => {
        await deleteCloudMovePlanAction(cloudId);
      });
    }
    refresh();
    toast.success('Plan deleted');
    setMenuId(null);
  }

  function handleArchive(id: string, archived: boolean, cloudId?: string | null) {
    archiveLocalPlan(id, archived);
    if (cloudId && user) {
      startTransition(async () => {
        await archiveCloudMovePlanAction(cloudId, archived);
      });
    }
    refresh();
    toast.success(archived ? 'Plan archived' : 'Plan restored');
    setMenuId(null);
  }

  function handleRename(id: string, cloudId?: string | null) {
    const current = plans.find((p) => p.id === id);
    const next = window.prompt('Rename plan', current?.name ?? '');
    if (!next?.trim()) return;
    renameLocalPlan(id, next.trim());
    const updated = listLocalPlans({ includeArchived: true }).find((p) => p.id === id);
    if (updated && user) {
      startTransition(async () => {
        const res = await upsertCloudMovePlanAction({
          cloudId: cloudId ?? updated.cloudId,
          name: next.trim(),
          plan: updated.plan,
          archived: updated.archived,
        });
        if (res.cloudId) upsertLocalWithCloudId(id, res.cloudId);
      });
    }
    refresh();
    toast.success('Plan renamed');
    setMenuId(null);
  }

  function handleSyncNow() {
    if (!user) {
      openSaveModal({ redirectPath: '/my-move/reports', context: 'dashboard' });
      return;
    }
    const rec = snapshotSessionPlanToLibrary();
    if (!rec) {
      toast.message('Nothing to save yet', {
        description: 'Start a plan on the homepage first.',
      });
      return;
    }
    startTransition(async () => {
      const res = await upsertCloudMovePlanAction({
        cloudId: rec.cloudId,
        name: rec.name,
        plan: rec.plan,
        archived: rec.archived,
      });
      if (res.success && res.cloudId) {
        upsertLocalWithCloudId(rec.id, res.cloudId);
        toast.success('Plan saved to your account');
      } else {
        toast.success('Plan saved on this device', {
          description: res.error
            ? 'Cloud sync unavailable — local copy kept.'
            : undefined,
        });
      }
      refresh();
    });
  }

  if (!hydrated) {
    return (
      <div className="h-32 animate-pulse rounded-2xl border bg-muted/20" aria-busy="true" />
    );
  }

  if (compact) {
    const featured = visible.slice(0, 3);
    const hasPlans = featured.length > 0;

    return (
      <section
        aria-labelledby="move-plans-heading"
        className={cn(
          'relative overflow-hidden rounded-3xl border shadow-md',
          hasPlans
            ? 'border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-white to-sky-50/60 shadow-emerald-900/5'
            : 'border-border/80 bg-card shadow-sm'
        )}
      >
        {/* Header */}
        <div className="relative flex flex-col gap-4 border-b border-black/5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">
          <div className="flex gap-3 sm:gap-4">
            <span
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm',
                hasPlans ? 'bg-emerald-600 shadow-emerald-600/25' : 'bg-primary/90'
              )}
            >
              <FileText className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800/80">
                Primary · your work
              </p>
              <h2
                id="move-plans-heading"
                className="text-xl font-semibold tracking-tight text-[#0A2540] sm:text-2xl"
              >
                Move Plans &amp; Reports
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {hasPlans
                  ? `${visible.length} plan${visible.length === 1 ? '' : 's'} ready — open any report to continue, email it to yourself, or refine inventory.`
                  : 'Plans you build on the homepage appear here with route, inventory, and shortlist in one place.'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant={hasPlans ? 'outline' : 'default'} size="sm">
              <Link href="/#my-move-plan">Start a plan</Link>
            </Button>
            {hasPlans ? (
              <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/my-move/reports">View all plans</Link>
              </Button>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href="/my-move/reports">Open reports</Link>
              </Button>
            )}
          </div>
        </div>

        {!hasPlans ? (
          <div className="px-5 py-8 text-center sm:px-6 sm:py-10">
            <p className="text-sm text-muted-foreground">
              No plans yet. Lock a route, shortlist movers, and build inventory on the homepage —
              your report becomes the centerpiece of Move HQ.
            </p>
            <Button asChild className="mt-4">
              <Link href="/#my-move-plan">Open My Move Plan wizard</Link>
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-black/5">
            {featured.map((record, idx) => {
              const stats = planStats(record.plan);
              const isPrimary = idx === 0;
              return (
                <li
                  key={record.id}
                  className={cn(
                    'px-4 py-5 sm:px-6',
                    isPrimary && 'bg-white/70 sm:bg-white/50'
                  )}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:justify-between">
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {isPrimary ? (
                          <Badge className="bg-emerald-600 hover:bg-emerald-600">Latest</Badge>
                        ) : null}
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">
                          {record.name}
                        </h3>
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-emerald-800">
                          Readiness {record.readiness}/100
                        </span>
                      </div>

                      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                        <span className="font-medium text-foreground">
                          {stats.routeFrom ?? 'Route TBD'}
                        </span>
                        {stats.routeTo ? (
                          <>
                            <span className="text-foreground/40">→</span>
                            <span className="font-medium text-foreground">{stats.routeTo}</span>
                          </>
                        ) : null}
                        {stats.drivingMiles ? (
                          <span className="tabular-nums text-xs">
                            · ~{stats.drivingMiles.toLocaleString()} mi
                          </span>
                        ) : null}
                      </p>

                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <div className="rounded-xl border bg-white/80 px-3 py-2.5 shadow-sm">
                          <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            <Package className="h-3 w-3" /> Volume
                          </div>
                          <p className="mt-0.5 text-base font-semibold tabular-nums">
                            {stats.totalVolume > 0
                              ? `${stats.totalVolume.toLocaleString()} cu ft`
                              : '—'}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {stats.totalVolume > 0
                              ? `~${stats.weight.toLocaleString()} lbs · ${stats.totalItems} items`
                              : 'No inventory yet'}
                          </p>
                        </div>
                        <div className="rounded-xl border bg-white/80 px-3 py-2.5 shadow-sm">
                          <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            <Truck className="h-3 w-3" /> Truck
                          </div>
                          <p className="mt-0.5 text-sm font-semibold leading-snug line-clamp-2">
                            {stats.totalVolume > 0 ? stats.truckLabel : '—'}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {stats.totalVolume > 0 ? stats.truckSize : 'Add inventory'}
                          </p>
                        </div>
                        <div className="col-span-2 rounded-xl border bg-white/80 px-3 py-2.5 shadow-sm sm:col-span-2">
                          <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            <Users className="h-3 w-3" /> Shortlist
                          </div>
                          <p className="mt-0.5 text-sm font-semibold">
                            {stats.shortlistCount}/3 movers
                          </p>
                          <p className="line-clamp-1 text-[11px] text-muted-foreground">
                            {stats.shortlistNames.length
                              ? stats.shortlistNames.join(' · ')
                              : 'No movers shortlisted'}
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] text-muted-foreground">
                        Updated{' '}
                        {formatDistanceToNow(new Date(record.updatedAt), { addSuffix: true })}
                        <span className="mx-1.5 text-border">·</span>
                        Created{' '}
                        {formatDistanceToNow(new Date(record.createdAt), { addSuffix: true })}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center lg:w-44 lg:flex-col lg:items-stretch">
                      <Button
                        type="button"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 lg:flex-none"
                        onClick={() => openPlan(record.id)}
                      >
                        Open plan
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full gap-1.5"
                        onClick={() => openPlan(record.id, 'report')}
                      >
                        <Send className="h-3.5 w-3.5" />
                        Send report
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-full gap-1.5 text-muted-foreground"
                        onClick={() => openPlan(record.id, 'inventory')}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {hasPlans && visible.length > 3 ? (
          <div className="border-t border-black/5 px-5 py-3 text-center sm:px-6">
            <Link
              href="/my-move/reports"
              className="text-sm font-medium text-primary hover:underline"
            >
              View {visible.length - 3} more plan{visible.length - 3 === 1 ? '' : 's'} →
            </Link>
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            My Move Reports
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            Your move plans
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">
            Every plan you build while exploring Move Trust Hub lives here — route, inventory,
            shortlist, and readiness. Open any plan to continue, re-send estimates, or edit.
            {!user ? (
              <>
                {' '}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  onClick={() =>
                    openSaveModal({ redirectPath: '/my-move/reports', context: 'dashboard' })
                  }
                >
                  Sign in
                </button>{' '}
                to sync plans across devices.
              </>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleSyncNow} disabled={pending}>
            {user ? 'Save current plan' : 'Sign in to sync'}
          </Button>
          <Button asChild size="sm">
            <Link href="/#my-move-plan">Start new plan</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setShowArchived(false)}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
            !showArchived ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          )}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setShowArchived(true)}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
            showArchived ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          )}
        >
          Include archived
        </button>
        <span className="text-xs text-muted-foreground">
          {visible.length} plan{visible.length === 1 ? '' : 's'}
        </span>
      </div>

      {visible.length === 0 ? (
        <Card className="p-10 text-center">
          <FileText className="mx-auto h-10 w-10 text-muted-foreground/60" aria-hidden />
          <h2 className="mt-3 text-lg font-semibold">No move plans yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Build a free plan on the homepage — lock a route, shortlist movers, and document your
            inventory. Your report will show up here automatically.
          </p>
          <Button asChild className="mt-5">
            <Link href="/#my-move-plan">Open My Move Plan</Link>
          </Button>
        </Card>
      ) : (
        <ul className="grid gap-4">
          {visible.map((record) => {
            const stats = planStats(record.plan);
            const menuOpen = menuId === record.id;
            return (
              <li key={record.id}>
                <Card
                  className={cn(
                    'overflow-hidden transition-shadow hover:shadow-md',
                    record.archived && 'opacity-80'
                  )}
                >
                  <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-wrap items-start gap-2">
                        <h2 className="text-lg font-semibold tracking-tight">{record.name}</h2>
                        {record.archived ? (
                          <Badge variant="secondary">Archived</Badge>
                        ) : null}
                        {record.cloudId ? (
                          <Badge variant="outline" className="text-[10px]">
                            Synced
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px]">
                            This device
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                          {stats.routeFrom ?? 'Route TBD'}
                          {stats.routeTo ? (
                            <>
                              <span className="text-foreground/40">→</span>
                              {stats.routeTo}
                            </>
                          ) : null}
                        </span>
                        {stats.drivingMiles ? (
                          <span className="tabular-nums">
                            ~{stats.drivingMiles.toLocaleString()} mi
                          </span>
                        ) : null}
                      </div>

                      <div className="grid gap-2 sm:grid-cols-3">
                        <div className="rounded-xl border bg-muted/20 px-3 py-2">
                          <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            <Package className="h-3 w-3" /> Inventory
                          </div>
                          <p className="mt-0.5 text-sm font-semibold tabular-nums">
                            {stats.totalVolume.toLocaleString()} cu ft
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ~{stats.weight.toLocaleString()} lbs · {stats.totalItems} items
                          </p>
                        </div>
                        <div className="rounded-xl border bg-muted/20 px-3 py-2">
                          <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            <Truck className="h-3 w-3" /> Truck
                          </div>
                          <p className="mt-0.5 text-sm font-semibold leading-snug">
                            {stats.totalVolume > 0 ? stats.truckLabel : '—'}
                          </p>
                          <p className="text-xs text-muted-foreground">{stats.truckSize}</p>
                        </div>
                        <div className="rounded-xl border bg-muted/20 px-3 py-2">
                          <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            <Users className="h-3 w-3" /> Shortlist
                          </div>
                          <p className="mt-0.5 text-sm font-semibold">
                            {stats.shortlistCount}/3 movers
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {stats.shortlistNames.length
                              ? stats.shortlistNames.join(', ')
                              : 'None selected'}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-800">
                          Readiness {record.readiness}/100
                        </span>
                        <span>
                          Updated{' '}
                          {formatDistanceToNow(new Date(record.updatedAt), { addSuffix: true })}
                        </span>
                        <span>
                          Created{' '}
                          {formatDistanceToNow(new Date(record.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2 sm:min-w-[180px]">
                      <Button
                        type="button"
                        className="w-full"
                        onClick={() => openPlan(record.id)}
                      >
                        Open plan
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full gap-1"
                        onClick={() => openPlan(record.id, 'report')}
                      >
                        <Send className="h-3.5 w-3.5" />
                        Send report
                      </Button>
                      <div className="relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="w-full gap-1"
                          onClick={() => setMenuId(menuOpen ? null : record.id)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          More
                        </Button>
                        {menuOpen ? (
                          <div className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-lg border bg-popover py-1 text-sm shadow-lg">
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 hover:bg-muted"
                              onClick={() => openPlan(record.id, 'inventory')}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit plan
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 hover:bg-muted"
                              onClick={() => handleRename(record.id, record.cloudId)}
                            >
                              Rename
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 hover:bg-muted"
                              onClick={() =>
                                handleArchive(record.id, !record.archived, record.cloudId)
                              }
                            >
                              {record.archived ? (
                                <>
                                  <ArchiveRestore className="h-3.5 w-3.5" /> Restore
                                </>
                              ) : (
                                <>
                                  <Archive className="h-3.5 w-3.5" /> Archive
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-destructive hover:bg-muted"
                              onClick={() => handleDelete(record.id, record.cloudId)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
