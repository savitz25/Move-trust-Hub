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
  /** When true, only show a compact preview strip for the dashboard. */
  compact?: boolean;
};

export function MyMoveReports({ compact = false }: Props) {
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
    return (
      <Card className="overflow-hidden border-primary/15">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-semibold tracking-tight">Move Plans &amp; Reports</h2>
              <p className="text-sm text-muted-foreground">
                {visible.length === 0
                  ? 'Plans you build on the homepage appear here.'
                  : `${visible.length} plan${visible.length === 1 ? '' : 's'} on this device${
                      user ? ' / account' : ''
                    }`}
              </p>
            </div>
          </div>
          <Button asChild className="shrink-0">
            <Link href="/my-move/reports">View all plans</Link>
          </Button>
        </div>
        {visible.slice(0, 2).map((p) => {
          const stats = planStats(p.plan);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => openPlan(p.id)}
              className="flex w-full items-center justify-between gap-3 border-t px-4 py-3 text-left text-sm hover:bg-muted/40 sm:px-5"
            >
              <span className="min-w-0 truncate font-medium">{p.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                {p.readiness}/100
              </span>
            </button>
          );
        })}
      </Card>
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
