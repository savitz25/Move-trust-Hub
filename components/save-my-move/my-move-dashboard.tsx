'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { GitCompare, Heart, LogOut, Package, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSaveMyMove } from '@/components/save-my-move/save-my-move-provider';
import { MoveHqHero } from '@/components/save-my-move/move-hq/move-hq-hero';
import { MoveHqQuickActions } from '@/components/save-my-move/move-hq/move-hq-quick-actions';
import { MyMoveReports } from '@/components/my-move-plan/my-move-reports';
import { MoveHqEmptyState } from '@/components/save-my-move/move-hq/move-hq-empty-state';
import { InventoryCard } from '@/components/save-my-move/move-hq/inventory-card';
import { MoverCard } from '@/components/save-my-move/move-hq/mover-card';
import { ComparisonCard } from '@/components/save-my-move/move-hq/comparison-card';
import { CompareBar } from '@/components/save-my-move/move-hq/compare-bar';
import { SettingsDrawer } from '@/components/save-my-move/move-hq/settings-drawer';
import {
  deleteInventoryAction,
  deleteComparisonAction,
  getMyMoveDashboardData,
  removeSavedMoverAction,
  saveInventoryAction,
  updateMoverNotesAction,
} from '@/actions/save-my-move';
import {
  exportAccountDataAction,
  deleteAccountAction,
} from '@/actions/account';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import type { InventoryItem } from '@/store/calculator-store';
import { parseInventoryJson } from '@/lib/save-my-move/types';
import { generateInventoryPdf } from '@/lib/moving-calculator/pdf-export';
import { groupInventoryByRoom } from '@/lib/moving-calculator/group-inventory';
import { MOVE_PRESETS } from '@/lib/moving-calculator/move-presets';
import {
  computeMoveReadiness,
  greetingNameFromEmail,
  totalInventoryVolume,
} from '@/lib/save-my-move/dashboard-utils';
import { buildMyMoveDemoData } from '@/lib/save-my-move/dashboard-demo';
import type { MyMoveDashboardPayload } from '@/lib/save-my-move/dashboard-types';
import { trackPdfDownloaded } from '@/components/ga-events';
import { toast } from 'sonner';

type Props = {
  initialData: MyMoveDashboardPayload | null;
  demo?: boolean;
  passwordEnabled?: boolean;
};

function emptyHqPayload(
  user: { id: string; email?: string | null },
  warning?: string
): MyMoveDashboardPayload {
  return {
    user: { id: user.id, email: user.email ?? '' },
    profile: null,
    inventories: [],
    movers: [],
    comparisons: [],
    companyNames: {},
    companySummaries: {},
    cloudSyncWarning: warning,
  };
}

export function MyMoveDashboard({
  initialData,
  demo = false,
  passwordEnabled = false,
}: Props) {
  const { user, loading, openSaveModal } = useSaveMyMove();
  const [data, setData] = useState(initialData);
  const [dataLoading, setDataLoading] = useState(false);
  const [cloudWarning, setCloudWarning] = useState<string | null>(
    initialData?.cloudSyncWarning ?? null
  );
  const [retryToken, setRetryToken] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [emailingId, setEmailingId] = useState<string | null>(null);
  const [selectedMovers, setSelectedMovers] = useState<string[]>([]);
  const [planCount, setPlanCount] = useState(0);
  const plansPrimary = planCount > 0;

  const handleSignOut = async () => {
    // Always leave a clean page — never leave the user on a crashed client tree.
    try {
      setSettingsOpen(false);
      const supabase = createBrowserSupabaseClient();
      if (supabase) {
        await supabase.auth.signOut({ scope: 'global' });
      }
    } catch {
      // Session may already be gone; still navigate away.
    }
    try {
      for (const key of Object.keys(window.localStorage)) {
        if (key.startsWith('sb-') && key.includes('auth')) {
          window.localStorage.removeItem(key);
        }
      }
    } catch {
      // private mode / blocked storage
    }
    window.location.assign('/');
  };

  const retryCloudLoad = () => {
    setCloudWarning(null);
    setData(null);
    setRetryToken((n) => n + 1);
  };

  useEffect(() => {
    if (demo && user) {
      setData(buildMyMoveDemoData(user.email ?? 'you@example.com'));
      setCloudWarning(null);
      return;
    }
    if (!user) return;
    // SSR already gave us a shell — skip client fetch unless Retry was requested
    if (retryToken === 0 && initialData != null) return;

    let cancelled = false;

    async function loadDashboard() {
      setDataLoading(true);
      setCloudWarning(null);

      // Post-SSO: wait for session; one soft retry on transient null/401
      for (let attempt = 0; attempt < 2 && !cancelled; attempt++) {
        try {
          const next = await getMyMoveDashboardData();
          if (cancelled) return;
          if (next) {
            setData(next);
            setCloudWarning(next.cloudSyncWarning ?? null);
            setDataLoading(false);
            return;
          }
          // null = not authenticated on server yet (or transient 401)
          if (attempt === 0) {
            await new Promise((r) => setTimeout(r, 450));
            continue;
          }
        } catch (err) {
          console.error('[MyMoveDashboard] getMyMoveDashboardData', err);
          if (attempt === 0) {
            await new Promise((r) => setTimeout(r, 450));
            continue;
          }
        }
      }

      if (cancelled) return;
      // Soft empty HQ — never hard Retry wall for empty / soft cloud failure
      const soft = emptyHqPayload(
        user!,
        'Cloud plans unavailable. Tools on this device still work.'
      );
      setData(soft);
      setCloudWarning(soft.cloudSyncWarning ?? null);
      setDataLoading(false);
    }

    void loadDashboard();
    return () => {
      cancelled = true;
    };
  }, [user, demo, retryToken, initialData]);

  // Signed-in shell: always have payload so HQ renders (empty = success)
  const viewData =
    data ??
    (user
      ? emptyHqPayload(user)
      : null);

  const readiness = useMemo(() => {
    if (!viewData) {
      return computeMoveReadiness({ inventoryCount: 0, moverCount: 0, comparisonCount: 0 });
    }
    return computeMoveReadiness({
      inventoryCount: viewData.inventories.length,
      moverCount: viewData.movers.length,
      comparisonCount: viewData.comparisons.length,
    });
  }, [viewData]);

  // Brief session resolve only (no account yet to show)
  if (loading && !user) {
    return (
      <div className="h-48 rounded-2xl border bg-muted/20 animate-pulse" aria-busy="true">
        <span className="sr-only">Checking sign-in…</span>
      </div>
    );
  }

  // --- Signed out: guest HQ + Sign in ---
  if (!user) {
    return (
      <div className="space-y-6">
        <MyMoveReports compact onPlanCount={setPlanCount} />
        <div className="flex flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Sign in (optional)</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tools work without an account. Sign in to sync inventories and shortlists across
              devices — guest plans on this device stay either way.
            </p>
          </div>
          <Button
            className="gap-2 shrink-0"
            onClick={() => openSaveModal({ redirectPath: '/my-move', context: 'dashboard' })}
          >
            Sign in
          </Button>
        </div>
        <div className="rounded-2xl border border-dashed bg-muted/20 p-6 text-center sm:p-8">
          <h2 className="text-lg font-semibold">Sync across devices</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            One Ask Trust Hub account across Move, Insurance, and Lending. Magic link by default —
            or optional password. Also Google and Facebook.
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => openSaveModal({ redirectPath: '/my-move', context: 'dashboard' })}
          >
            Save My Move
          </Button>
        </div>
      </div>
    );
  }

  // --- Signed in: ALWAYS account chrome (even while cloud loads / soft-fails) ---
  const isDemoMode = demo;
  const shell = viewData!;
  const greetingName = greetingNameFromEmail(user.email ?? shell.user.email);
  const volumeTotal = totalInventoryVolume(shell.inventories);
  const bannerText = cloudWarning || shell.cloudSyncWarning || null;

  const accountStrip = (
    <div className="flex flex-col gap-3 rounded-2xl border border-primary/15 bg-card px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">
          Signed in as{' '}
          <span className="font-medium text-foreground break-all">
            {user.email ?? shell.user.email || 'Account'}
          </span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Research workspace only — guest tools still work without an account. Sign out anytime;
          local plans on this device stay.
        </p>
        {bannerText ? (
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
            <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-md px-2 py-1.5 flex-1">
              {bannerText}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={retryCloudLoad}
              disabled={dataLoading}
            >
              Retry
            </Button>
          </div>
        ) : null}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 shrink-0"
        onClick={() => void handleSignOut()}
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </Button>
    </div>
  );

  const handleExport = async () => {
    setExporting(true);
    try {
      const exported = await exportAccountDataAction();
      const blob = new Blob([JSON.stringify(exported, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `move-trust-hub-data-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Data downloaded');
    } catch {
      toast.error('Export failed');
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Permanently delete your account and all saved data? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await deleteAccountAction();
      toast.success('Account deleted');
      window.location.href = '/';
    } catch {
      toast.error('Could not delete account');
    } finally {
      setDeleting(false);
    }
  };

  const handleDownloadPdf = (
    inventory: InventoryItem[],
    totalVolume: number,
    totalItems: number,
    movePreset: string | null
  ) => {
    if (inventory.length === 0) {
      toast.error('Inventory is empty');
      return;
    }
    const presetLabel = movePreset
      ? MOVE_PRESETS.find((p) => p.id === movePreset)?.label ?? null
      : null;
    generateInventoryPdf({
      inventory,
      groupedByRoom: groupInventoryByRoom(inventory),
      totalVolume,
      totalItems,
      presetLabel,
    });
    trackPdfDownloaded({ volume: Math.round(totalVolume), item_count: totalItems });
    toast.success('PDF downloaded');
  };

  const handleEmailInventory = async (
    inventory: InventoryItem[],
    name: string,
    movePreset: string | null,
    inventoryId: string
  ) => {
    setEmailingId(inventoryId);
    try {
      const res = await fetch('/api/save-my-move/email-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inventory, name, movePreset }),
      });
      const payload = (await res.json().catch(() => null)) as {
        error?: string;
        pdfAttached?: boolean;
      } | null;

      if (!res.ok) {
        toast.error(payload?.error ?? 'Could not send email');
        return;
      }

      const sentTo = user?.email ?? 'your inbox';
      toast.success('Inventory emailed', {
        description: payload?.pdfAttached
          ? `Sent to ${sentTo} with PDF attached.`
          : `Sent to ${sentTo}.`,
      });
    } catch {
      toast.error('Could not send email. Check your connection and try again.');
    } finally {
      setEmailingId(null);
    }
  };

  const refreshAfter = async (fn: () => Promise<void>) => {
    if (isDemoMode) {
      toast.message('Demo mode — action not saved');
      return;
    }
    await fn();
    window.location.reload();
  };

  const handleRename = async (id: string, name: string, items: InventoryItem[]) => {
    if (isDemoMode) {
      toast.message('Demo mode — rename not saved');
      return;
    }
    const inv = shell.inventories.find((i) => i.id === id);
    if (!inv) return;
    await saveInventoryAction({
      id,
      name,
      inventory: items,
      mode: inv.mode ?? 'room',
      movePreset: inv.move_preset,
    });
    toast.success('Inventory renamed');
    window.location.reload();
  };

  const handleDuplicate = async (
    id: string,
    name: string,
    items: InventoryItem[],
    movePreset: string | null
  ) => {
    if (isDemoMode) {
      toast.message('Demo mode — duplicate not saved');
      return;
    }
    const inv = shell.inventories.find((i) => i.id === id);
    if (!inv) return;
    await saveInventoryAction({
      name: `${name} (copy)`,
      inventory: items,
      mode: inv.mode ?? 'room',
      movePreset,
    });
    toast.success('Inventory duplicated');
    window.location.reload();
  };

  const toggleMoverSelect = (slug: string) => {
    setSelectedMovers((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {accountStrip}

      {dataLoading && !data ? (
        <p className="text-xs text-muted-foreground" aria-live="polite">
          Syncing cloud data…
        </p>
      ) : null}

      <div className="flex items-center justify-end gap-2">
        {isDemoMode && (
          <span className="text-xs font-medium text-amber-700 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
            Preview mode — add <code className="font-mono">?demo=1</code> to explore the layout
          </span>
        )}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => setSettingsOpen(true)}
          aria-label="Open settings"
        >
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </div>

      <MoveHqHero
        greetingName={greetingName}
        totalVolume={volumeTotal}
        inventoryCount={shell.inventories.length}
        readiness={readiness}
      />

      <MoveHqQuickActions />

      {/* Focal point: full move reports */}
      <MyMoveReports compact onPlanCount={setPlanCount} />

      {/* Secondary library — de-emphasized when plans exist */}
      <div
        className={cn(
          'grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8',
          plansPrimary && 'opacity-95'
        )}
      >
        <section
          className={cn(
            'lg:col-span-7 space-y-4',
            plansPrimary && shell.inventories.length === 0 && 'order-2'
          )}
          aria-labelledby="inventories-heading"
        >
          <div className="flex items-center justify-between gap-2">
            <h2
              id="inventories-heading"
              className={cn(
                'font-semibold flex items-center gap-2',
                plansPrimary ? 'text-base text-muted-foreground' : 'text-lg'
              )}
            >
              <Package className="h-5 w-5 text-primary" aria-hidden="true" />
              Saved inventories
            </h2>
            {plansPrimary ? (
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Secondary
              </span>
            ) : null}
          </div>
          {shell.inventories.length === 0 ? (
            <MoveHqEmptyState
              icon={Package}
              title="No inventories yet"
              description={
                plansPrimary
                  ? 'Optional — your full move plan already includes inventory. Use the calculator to save extra named lists.'
                  : "Build a room-by-room list in the calculator — we'll auto-name it and track your volume."
              }
              ctaLabel="Open calculator"
              ctaHref="/moving-calculator"
              quiet={plansPrimary}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {shell.inventories.map((inv) => {
                const items = parseInventoryJson(inv.inventory);
                return (
                  <InventoryCard
                    key={inv.id}
                    id={inv.id}
                    name={inv.name}
                    movePreset={inv.move_preset}
                    totalVolume={Number(inv.total_volume ?? 0)}
                    totalItems={inv.total_items ?? 0}
                    items={items}
                    emailing={emailingId === inv.id}
                    onRename={handleRename}
                    onDuplicate={handleDuplicate}
                    onDelete={(id) => refreshAfter(() => deleteInventoryAction(id))}
                    onDownloadPdf={handleDownloadPdf}
                    onEmail={handleEmailInventory}
                  />
                );
              })}
            </div>
          )}
        </section>

        <div className="lg:col-span-5 space-y-8">
          <section aria-labelledby="movers-heading" className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2
                id="movers-heading"
                className={cn(
                  'font-semibold flex items-center gap-2',
                  plansPrimary ? 'text-base text-muted-foreground' : 'text-lg'
                )}
              >
                <Heart className="h-5 w-5 text-primary" aria-hidden="true" />
                Saved movers
              </h2>
              {plansPrimary ? (
                <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Secondary
                </span>
              ) : null}
            </div>
            {shell.movers.length === 0 ? (
              <MoveHqEmptyState
                icon={Heart}
                title="No saved movers"
                description={
                  plansPrimary
                    ? 'Optional — movers on your plans are already shortlisted. Save more from the directory anytime.'
                    : 'Shortlist FMCSA-licensed carriers from the directory — compare ratings side by side.'
                }
                ctaLabel="Browse movers"
                ctaHref="/companies"
                quiet={plansPrimary}
              />
            ) : (
              <div className="space-y-3">
                {shell.movers.map((mover) => (
                  <MoverCard
                    key={mover.id}
                    id={mover.id}
                    companySlug={mover.company_slug}
                    companyName={
                      shell.companyNames[mover.company_slug] ??
                      mover.company_slug.replace(/-/g, ' ')
                    }
                    summary={shell.companySummaries[mover.company_slug]}
                    notes={mover.notes}
                    selected={selectedMovers.includes(mover.company_slug)}
                    onToggleSelect={toggleMoverSelect}
                    onNotesChange={(id, notes) =>
                      isDemoMode
                        ? Promise.resolve(toast.message('Demo mode'))
                        : updateMoverNotesAction(id, notes).then(() => toast.success('Notes saved'))
                    }
                    onRemove={(id) => refreshAfter(() => removeSavedMoverAction(id))}
                    demo={isDemoMode}
                  />
                ))}
              </div>
            )}
          </section>

          <section aria-labelledby="comparisons-heading" className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2
                id="comparisons-heading"
                className={cn(
                  'font-semibold flex items-center gap-2',
                  plansPrimary ? 'text-base text-muted-foreground' : 'text-lg'
                )}
              >
                <GitCompare className="h-5 w-5 text-primary" aria-hidden="true" />
                Saved comparisons
              </h2>
              {plansPrimary ? (
                <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Secondary
                </span>
              ) : null}
            </div>
            {shell.comparisons.length === 0 ? (
              <MoveHqEmptyState
                icon={GitCompare}
                title="No comparisons saved"
                description={
                  plansPrimary
                    ? 'Optional — compare movers from your plan shortlist anytime.'
                    : 'Pick two or more movers and save a side-by-side view for price and rating deltas.'
                }
                ctaLabel="Compare movers"
                ctaHref="/compare"
                quiet={plansPrimary}
              />
            ) : (
              <div className="space-y-3">
                {shell.comparisons.map((comp) => (
                  <ComparisonCard
                    key={comp.id}
                    id={comp.id}
                    name={comp.name}
                    slugs={comp.company_slugs ?? []}
                    companyNames={shell.companyNames}
                    companySummaries={shell.companySummaries}
                    onDelete={(id) => refreshAfter(() => deleteComparisonAction(id))}
                    demo={isDemoMode}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <CompareBar
        selectedSlugs={selectedMovers}
        companyNames={shell.companyNames}
        onClear={() => setSelectedMovers([])}
      />

      <SettingsDrawer
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        email={user.email ?? shell.user.email}
        marketingOptIn={shell.profile?.marketing_opt_in ?? false}
        moverAlertsOptIn={shell.profile?.mover_alerts_opt_in ?? false}
        passwordEnabled={passwordEnabled}
        exporting={exporting}
        deleting={deleting}
        onExport={handleExport}
        onDeleteAccount={handleDeleteAccount}
        onSignOut={handleSignOut}
      />
    </div>
  );
}