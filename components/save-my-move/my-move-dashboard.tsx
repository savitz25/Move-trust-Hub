'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Package, Heart, GitCompare, Download, Trash2, Mail, ExternalLink,
  Settings, LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useSaveMyMove } from '@/components/save-my-move/save-my-move-provider';
import {
  deleteInventoryAction,
  deleteComparisonAction,
  getMyMoveDashboardData,
  removeSavedMoverAction,
  updateMoverNotesAction,
} from '@/actions/save-my-move';
import {
  updateEmailPreferencesAction,
  exportAccountDataAction,
  deleteAccountAction,
} from '@/actions/account';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import type { InventoryItem } from '@/store/calculator-store';
import { generateInventoryPdf } from '@/lib/moving-calculator/pdf-export';
import { MOVE_PRESETS } from '@/lib/moving-calculator/move-presets';
import { trackPdfDownloaded } from '@/components/ga-events';
import { toast } from 'sonner';

function groupInventoryByRoom(inventory: InventoryItem[]): [string, InventoryItem[]][] {
  const groups: Record<string, InventoryItem[]> = {};
  for (const item of inventory) {
    const room = item.room || 'Unassigned';
    if (!groups[room]) groups[room] = [];
    groups[room].push(item);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

type DashboardData = Awaited<ReturnType<typeof import('@/actions/save-my-move').getMyMoveDashboardData>>;

type Props = {
  initialData: DashboardData | null;
};

export function MyMoveDashboard({ initialData }: Props) {
  const { user, loading, openSaveModal } = useSaveMyMove();
  const [data, setData] = useState(initialData);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
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
  }, [user, data]);

  if (loading || (user && !data && dataLoading)) {
    return <div className="h-40 rounded-xl border bg-muted/20 animate-pulse" />;
  }

  if (!user) {
    return (
      <Card className="p-8 text-center">
        <Package className="h-10 w-10 mx-auto text-primary/60 mb-3" />
        <p className="text-muted-foreground mb-4">
          Sign in to access saved inventories, mover shortlists, and comparisons.
        </p>
        <Button onClick={() => openSaveModal({ redirectPath: '/my-move', context: 'dashboard' })}>
          Save My Move
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          No password needed — Google or a one-time email link.
        </p>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-8 text-center">
        <Package className="h-10 w-10 mx-auto text-primary/60 mb-3" />
        <p className="text-muted-foreground mb-4">
          {dataError
            ? 'Could not load your saved data. Please try again.'
            : 'Loading your saved data…'}
        </p>
        {dataError && (
          <Button onClick={() => window.location.reload()}>Retry</Button>
        )}
      </Card>
    );
  }

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
    const supabase = createBrowserSupabaseClient();
    await supabase?.auth.signOut();
    window.location.reload();
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

  const handleEmailInventory = async (inventory: InventoryItem[], name: string) => {
    try {
      const res = await fetch('/api/save-my-move/email-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inventory, name }),
      });
      if (!res.ok) throw new Error();
      toast.success('Inventory emailed to you');
    } catch {
      toast.error('Could not send email');
    }
  };

  const refreshAfter = async (fn: () => Promise<void>) => {
    await fn();
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>Signed in as {data.user.email}</span>
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut className="h-3.5 w-3.5 mr-1" /> Sign out
        </Button>
      </div>

      {/* Inventories */}
      <section>
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <Package className="h-5 w-5 text-primary" /> My Inventories
        </h2>
        {data.inventories.length === 0 ? (
          <Card className="p-6 text-center text-sm text-muted-foreground">
            No saved inventories yet.{' '}
            <Link href="/moving-calculator" className="text-primary hover:underline">
              Build one in the calculator
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {data.inventories.map((inv) => {
              const items = (inv.inventory as InventoryItem[]) ?? [];
              return (
                <Card key={inv.id}>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">{inv.name}</CardTitle>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {Math.round(Number(inv.total_volume ?? 0))} cu ft · {inv.total_items ?? 0} items
                    </span>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/moving-calculator?load=${inv.id}`}>Open in calculator</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleDownloadPdf(
                          items,
                          Number(inv.total_volume ?? 0),
                          inv.total_items ?? 0,
                          inv.move_preset
                        )
                      }
                    >
                      <Download className="h-3.5 w-3.5 mr-1" /> Download PDF
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEmailInventory(items, inv.name)}
                    >
                      <Mail className="h-3.5 w-3.5 mr-1" /> Email to me
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => refreshAfter(() => deleteInventoryAction(inv.id))}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Saved movers */}
      <section>
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <Heart className="h-5 w-5 text-primary" /> Saved Movers
        </h2>
        {data.movers.length === 0 ? (
          <Card className="p-6 text-center text-sm text-muted-foreground">
            No saved movers yet.{' '}
            <Link href="/companies" className="text-primary hover:underline">
              Browse the directory
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {data.movers.map((mover) => (
              <Card key={mover.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/companies/${mover.company_slug}`}
                      className="font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      {data.companyNames[mover.company_slug] ?? mover.company_slug.replace(/-/g, ' ')}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <Input
                      className="mt-2 text-sm"
                      placeholder="Private notes (only you can see these)"
                      defaultValue={mover.notes ?? ''}
                      onBlur={(e) =>
                        updateMoverNotesAction(mover.id, e.target.value).then(() =>
                          toast.success('Notes saved')
                        )
                      }
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive shrink-0"
                    onClick={() => refreshAfter(() => removeSavedMoverAction(mover.id))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Comparisons */}
      <section>
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <GitCompare className="h-5 w-5 text-primary" /> Saved Comparisons
        </h2>
        {data.comparisons.length === 0 ? (
          <Card className="p-6 text-center text-sm text-muted-foreground">
            No saved comparisons yet.{' '}
            <Link href="/compare" className="text-primary hover:underline">
              Compare movers
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {data.comparisons.map((comp) => {
              const moverNames = comp.company_slugs.map(
                (slug: string) => data.companyNames[slug] ?? slug.replace(/-/g, ' ')
              );

              return (
              <Card key={comp.id} className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium">{comp.name ?? 'Comparison'}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {moverNames.join(' · ')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link
                      href={`/compare?${comp.company_slugs.map((s: string) => `add=${s}`).join('&')}`}
                    >
                      Open
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => refreshAfter(() => deleteComparisonAction(comp.id))}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Email preferences */}
      <section>
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <Settings className="h-5 w-5 text-primary" /> Email Preferences
        </h2>
        <Card className="p-4 space-y-4 text-sm">
          <label className="flex items-start gap-3 opacity-80">
            <input type="checkbox" checked disabled className="mt-1" />
            <span>
              <strong>Transactional emails</strong> (sign-in links, requested documents) — always on
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1"
              defaultChecked={data.profile?.marketing_opt_in ?? false}
              onChange={(e) =>
                updateEmailPreferencesAction({
                  marketingOptIn: e.target.checked,
                  moverAlertsOptIn: data.profile?.mover_alerts_opt_in ?? false,
                }).then(() => toast.success('Preferences updated'))
              }
            />
            <span>Marketing updates (off by default — we never sell your information)</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1"
              defaultChecked={data.profile?.mover_alerts_opt_in ?? false}
              onChange={(e) =>
                updateEmailPreferencesAction({
                  marketingOptIn: data.profile?.marketing_opt_in ?? false,
                  moverAlertsOptIn: e.target.checked,
                }).then(() => toast.success('Preferences updated'))
              }
            />
            <span>Saved mover alerts (FMCSA / safety rating changes for your shortlist)</span>
          </label>
        </Card>
      </section>

      {/* Account actions */}
      <section className="flex flex-wrap gap-3 pt-4 border-t">
        <Button variant="outline" onClick={handleExport} disabled={exporting}>
          <Download className="h-3.5 w-3.5 mr-1.5" />
          {exporting ? 'Exporting…' : 'Download my data'}
        </Button>
        <Button variant="destructive" onClick={handleDeleteAccount} disabled={deleting}>
          <Trash2 className="h-3.5 w-3.5 mr-1.5" />
          {deleting ? 'Deleting…' : 'Delete my account'}
        </Button>
      </section>
    </div>
  );
}