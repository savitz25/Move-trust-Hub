'use client';

import { useState, useTransition } from 'react';
import { Loader2, RefreshCw, Shield, Truck } from 'lucide-react';
import {
  refreshCompanyAllDataAction,
  refreshCompanyBbbAction,
  refreshCompanyFmcsaAction,
  refreshCompanyGoogleAction,
} from '@/actions/admin-refresh-company';
import type { AdminCompanyDetail } from '@/lib/admin/company-dashboard-types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Props = {
  companyId: string;
  onRefreshed: (detail: AdminCompanyDetail | null) => void;
  onListItemUpdated?: () => void;
};

type RefreshKey = 'fmcsa' | 'google' | 'bbb' | 'all' | null;

export function DataRefreshButtons({ companyId, onRefreshed, onListItemUpdated }: Props) {
  const [pending, startTransition] = useTransition();
  const [active, setActive] = useState<RefreshKey>(null);

  async function run(
    key: RefreshKey,
    action: () => Promise<{ success: boolean; error?: string; message?: string }>
  ) {
    setActive(key);
    startTransition(async () => {
      try {
        const result = await action();
        if (result.success) {
          toast.success(result.message ?? 'Data refreshed successfully');
          onListItemUpdated?.();
          const { getAdminCompanyDetail } = await import('@/actions/admin-companies');
          onRefreshed(await getAdminCompanyDetail(companyId));
        } else {
          toast.error(result.error ?? 'Refresh failed');
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Refresh failed');
      } finally {
        setActive(null);
      }
    });
  }

  const disabled = pending;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Pull fresh data from external sources. Each action is idempotent and updates only
        verification fields — FMCSA licensing data is never overwritten by Google or BBB pulls.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          className="h-auto justify-start gap-3 border-[#0A2540]/15 py-3 text-left"
          disabled={disabled}
          title="Fetch latest USDOT / FMCSA carrier snapshot from the QCMobile API"
          onClick={() =>
            run('fmcsa', () => refreshCompanyFmcsaAction(companyId, { force: true }))
          }
        >
          {active === 'fmcsa' ? (
            <Loader2 className="h-5 w-5 shrink-0 animate-spin text-[#00BFA5]" />
          ) : (
            <Truck className="h-5 w-5 shrink-0 text-[#0A2540]" />
          )}
          <span>
            <span className="block font-semibold text-[#0A2540]">Pull Fresh DOT / FMCSA Data</span>
            <span className="block text-xs font-normal text-muted-foreground">
              Safety rating, authority, complaints, shipments
            </span>
          </span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-auto justify-start gap-3 border-[#0A2540]/15 py-3 text-left"
          disabled={disabled}
          title="Fetch Google Places rating, review count, and snippets"
          onClick={() => run('google', () => refreshCompanyGoogleAction(companyId))}
        >
          {active === 'google' ? (
            <Loader2 className="h-5 w-5 shrink-0 animate-spin text-[#00BFA5]" />
          ) : (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center text-sm font-bold text-[#0A2540]">
              G
            </span>
          )}
          <span>
            <span className="block font-semibold text-[#0A2540]">Pull Fresh Google Data</span>
            <span className="block text-xs font-normal text-muted-foreground">
              Business profile, rating, review count
            </span>
          </span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-auto justify-start gap-3 border-[#0A2540]/15 py-3 text-left"
          disabled={disabled}
          title="Scrape BBB public profile for rating and accreditation"
          onClick={() => run('bbb', () => refreshCompanyBbbAction(companyId))}
        >
          {active === 'bbb' ? (
            <Loader2 className="h-5 w-5 shrink-0 animate-spin text-[#00BFA5]" />
          ) : (
            <Shield className="h-5 w-5 shrink-0 text-[#0A2540]" />
          )}
          <span>
            <span className="block font-semibold text-[#0A2540]">Scrape Fresh BBB Data</span>
            <span className="block text-xs font-normal text-muted-foreground">
              Letter grade, accreditation, profile URL
            </span>
          </span>
        </Button>

        <Button
          type="button"
          className="h-auto justify-start gap-3 bg-[#0A2540] py-3 text-left hover:bg-[#0A2540]/90"
          disabled={disabled}
          title="Run FMCSA, Google, and BBB refresh sequentially"
          onClick={() =>
            run('all', () => refreshCompanyAllDataAction(companyId, { forceFmcsa: true }))
          }
        >
          {active === 'all' ? (
            <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
          ) : (
            <RefreshCw className="h-5 w-5 shrink-0" />
          )}
          <span>
            <span className="block font-semibold">Refresh All Data Sources</span>
            <span className="block text-xs font-normal text-white/80">
              DOT + Google + BBB in one pass
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
}