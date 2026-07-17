'use client';

import { useEffect, useMemo, useState } from 'react';
import { GitCompare, Heart, Package, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSaveMyMove } from '@/components/save-my-move/save-my-move-provider';
import { MoveHqHero } from '@/components/save-my-move/move-hq/move-hq-hero';
import { MoveHqQuickActions } from '@/components/save-my-move/move-hq/move-hq-quick-actions';
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
};

export function MyMoveDashboard({ initialData, demo = false }: Props) {
  const { user, loading, openSaveModal } = useSaveMyMove();
  const [data, setData] = useState(initialData);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [emailingId, setEmailingId] = useState<string | null>(null);
  const [selectedMovers, setSelectedMovers] = useState<string[]>([]);

  useEffect(() => {
    if (demo && user) {
      setData(buildMyMoveDemoData(user.email ?? 'you@example.com'));
      return;
    }
    if (!user || data) return;

    let cancelled = false;
    setDataLoading(true);
    setDataError(false);

    getMyMoveDashboardData()
      .then((next) => {
        if (!cancelled) setData(next);
      })
      .catch(() => {
        if (!cancelled) setDataError(true);
      })
      .finally(() => {
        if (!cancelled) setDataLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, data, demo]);

  const readiness = useMemo(() => {
    if (!data) {
      return computeMoveReadiness({ inventoryCount: 0, moverCount: 0, comparisonCount: 0 });
    }
    return computeMoveReadiness({
      inventoryCount: data.inventories.length,
      moverCount: data.movers.length,
      comparisonCount: data.comparisons.length,
    });
  }, [data]);

  if (loading || (user && !data && dataLoading && !demo)) {
    return <div className="h-48 rounded-2xl border bg-muted/20 animate-pulse" aria-busy="true" />;
  }

  if (!user) {
    return (
      <div className="rounded-2xl border bg-card p-10 text-center shadow-sm">
        <Package className="h-12 w-12 mx-auto text-primary/60 mb-4" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Your Move HQ awaits</h2>
        <p className="text-muted-foreground mt-2 mb-6 max-w-md mx-auto">
          Sign in to sync inventories, mover shortlists, and comparisons across devices.
        </p>
        <Button onClick={() => openSaveModal({ redirectPath: '/my-move', context: 'dashboard' })}>
          Save My Move
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          No password needed — Google, Facebook, or a one-time email link.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border bg-card p-10 text-center shadow-sm">
        <Package className="h-12 w-12 mx-auto text-primary/60 mb-4" aria-hidden="true" />
        <p className="text-muted-foreground mb-4">
          {dataError ? 'Could not load your saved data. Please try again.' : 'Loading your Move HQ…'}
        </p>
        {dataError && <Button onClick={() => window.location.reload()}>Retry</Button>}
      </div>
    );
  }

  const isDemoMode = demo;
  const greetingName = greetingNameFromEmail(data.user.email);
  const volumeTotal = totalInventoryVolume(data.inventories);

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

  const handleSignOut = async () => {
    // Always leave a clean page — never leave the user on a crashed client tree.
    // Reload of /my-move used to race DeferredSaveMyMove and throw useSaveMyMove.
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
      // Clear any leftover auth storage keys that can confuse a half-signed-out client.
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
    const inv = data.inventories.find((i) => i.id === id);
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
    const inv = data.inventories.find((i) => i.id === id);
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
        inventoryCount={data.inventories.length}
        readiness={readiness}
      />

      <MoveHqQuickActions />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        <section className="lg:col-span-7 space-y-4" aria-labelledby="inventories-heading">
          <h2 id="inventories-heading" className="text-lg font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" aria-hidden="true" />
            My Inventories
          </h2>
          {data.inventories.length === 0 ? (
            <MoveHqEmptyState
              icon={Package}
              title="No inventories yet"
              description="Build a room-by-room list in the calculator — we'll auto-name it and track your volume."
              ctaLabel="Open calculator"
              ctaHref="/moving-calculator"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.inventories.map((inv) => {
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
            <h2 id="movers-heading" className="text-lg font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" aria-hidden="true" />
              Saved Movers
            </h2>
            {data.movers.length === 0 ? (
              <MoveHqEmptyState
                icon={Heart}
                title="No saved movers"
                description="Shortlist FMCSA-licensed carriers from the directory — compare ratings side by side."
                ctaLabel="Browse movers"
                ctaHref="/companies"
              />
            ) : (
              <div className="space-y-3">
                {data.movers.map((mover) => (
                  <MoverCard
                    key={mover.id}
                    id={mover.id}
                    companySlug={mover.company_slug}
                    companyName={
                      data.companyNames[mover.company_slug] ??
                      mover.company_slug.replace(/-/g, ' ')
                    }
                    summary={data.companySummaries[mover.company_slug]}
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
            <h2 id="comparisons-heading" className="text-lg font-semibold flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-primary" aria-hidden="true" />
              Saved Comparisons
            </h2>
            {data.comparisons.length === 0 ? (
              <MoveHqEmptyState
                icon={GitCompare}
                title="No comparisons saved"
                description="Pick two or more movers and save a side-by-side view for price and rating deltas."
                ctaLabel="Compare movers"
                ctaHref="/compare"
              />
            ) : (
              <div className="space-y-3">
                {data.comparisons.map((comp) => (
                  <ComparisonCard
                    key={comp.id}
                    id={comp.id}
                    name={comp.name}
                    slugs={comp.company_slugs ?? []}
                    companyNames={data.companyNames}
                    companySummaries={data.companySummaries}
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
        companyNames={data.companyNames}
        onClear={() => setSelectedMovers([])}
      />

      <SettingsDrawer
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        email={data.user.email}
        marketingOptIn={data.profile?.marketing_opt_in ?? false}
        moverAlertsOptIn={data.profile?.mover_alerts_opt_in ?? false}
        exporting={exporting}
        deleting={deleting}
        onExport={handleExport}
        onDeleteAccount={handleDeleteAccount}
        onSignOut={handleSignOut}
      />
    </div>
  );
}