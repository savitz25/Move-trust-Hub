'use client';

import { useState, useTransition } from 'react';
import { triggerFmcsaRefreshAction } from '@/actions/fmcsa-refresh';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw } from 'lucide-react';

type RunRow = {
  id: string;
  mode: string;
  status: string;
  triggered_by: string;
  companies_total: number;
  companies_processed: number;
  companies_updated: number;
  companies_failed: number;
  changes_detected: number;
  started_at: string;
  finished_at: string | null;
  error_summary: string | null;
};

type ChangeRow = {
  id: string;
  company_name: string | null;
  company_slug: string | null;
  field_name: string;
  old_value: string | null;
  new_value: string | null;
  severity: string;
  created_at: string;
};

export function FmcsaRefreshDashboard({
  runs,
  changes,
  companyStats,
  configured,
}: {
  runs: RunRow[];
  changes: ChangeRow[];
  companyStats: { withUsdot: number; stale: number } | null;
  configured: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [lastResult, setLastResult] = useState<string | null>(null);

  function trigger(mode: 'incremental' | 'full') {
    startTransition(async () => {
      try {
        const result = await triggerFmcsaRefreshAction({ mode, force: true });
        setLastResult(
          `${result.status}: processed ${result.companiesProcessed}, updated ${result.companiesUpdated}, failed ${result.companiesFailed}, changes ${result.changesDetected}`
        );
        window.location.reload();
      } catch (err) {
        setLastResult(err instanceof Error ? err.message : 'Refresh failed');
      }
    });
  }

  return (
    <div className="space-y-8">
      {!configured && (
        <Card className="border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900">
          Set <code className="rounded bg-amber-100 px-1">FMCSA_WEB_KEY</code>,{' '}
          <code className="rounded bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code>, and{' '}
          <code className="rounded bg-amber-100 px-1">CRON_SECRET</code> in Vercel env vars.
        </Card>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button disabled={pending || !configured} onClick={() => trigger('incremental')}>
          <RefreshCw className={`h-4 w-4 mr-2 ${pending ? 'animate-spin' : ''}`} />
          Run incremental refresh
        </Button>
        <Button variant="outline" disabled={pending || !configured} onClick={() => trigger('full')}>
          Run full refresh
        </Button>
        {lastResult ? <span className="text-sm text-muted-foreground">{lastResult}</span> : null}
      </div>

      {companyStats ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Carriers with USDOT" value={companyStats.withUsdot} />
          <Stat label="Stale / never checked" value={companyStats.stale} />
          <Stat label="Recent runs" value={runs.length} />
        </div>
      ) : null}

      <section>
        <h2 className="text-lg font-semibold mb-3">Recent refresh runs</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="p-3">Started</th>
                <th className="p-3">Mode</th>
                <th className="p-3">Status</th>
                <th className="p-3">Processed</th>
                <th className="p-3">Updated</th>
                <th className="p-3">Failed</th>
                <th className="p-3">Changes</th>
              </tr>
            </thead>
            <tbody>
              {runs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-muted-foreground">
                    No refresh runs yet
                  </td>
                </tr>
              ) : (
                runs.map((run) => (
                  <tr key={run.id} className="border-t">
                    <td className="p-3 whitespace-nowrap">
                      {new Date(run.started_at).toLocaleString()}
                    </td>
                    <td className="p-3">{run.mode}</td>
                    <td className="p-3">
                      <StatusBadge status={run.status} />
                    </td>
                    <td className="p-3">
                      {run.companies_processed}/{run.companies_total}
                    </td>
                    <td className="p-3">{run.companies_updated}</td>
                    <td className="p-3">{run.companies_failed}</td>
                    <td className="p-3">{run.changes_detected}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Change log</h2>
        <div className="overflow-x-auto rounded-lg border max-h-[480px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left sticky top-0">
              <tr>
                <th className="p-3">When</th>
                <th className="p-3">Company</th>
                <th className="p-3">Field</th>
                <th className="p-3">Old</th>
                <th className="p-3">New</th>
                <th className="p-3">Severity</th>
              </tr>
            </thead>
            <tbody>
              {changes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-muted-foreground">
                    No changes logged yet
                  </td>
                </tr>
              ) : (
                changes.map((row) => (
                  <tr key={row.id} className="border-t">
                    <td className="p-3 whitespace-nowrap text-xs">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="p-3">
                      {row.company_slug ? (
                        <a
                          href={`/companies/${row.company_slug}`}
                          className="text-primary hover:underline"
                        >
                          {row.company_name ?? row.company_slug}
                        </a>
                      ) : (
                        row.company_name ?? '—'
                      )}
                    </td>
                    <td className="p-3 font-mono text-xs">{row.field_name}</td>
                    <td className="p-3 text-xs">{row.old_value ?? '—'}</td>
                    <td className="p-3 text-xs">{row.new_value ?? '—'}</td>
                    <td className="p-3">
                      <SeverityBadge severity={row.severity} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === 'completed' ? 'success' : status === 'failed' ? 'destructive' : 'secondary';
  return <Badge variant={variant as 'success'}>{status}</Badge>;
}

function SeverityBadge({ severity }: { severity: string }) {
  const variant =
    severity === 'critical'
      ? 'destructive'
      : severity === 'warning'
        ? 'warning'
        : 'secondary';
  return <Badge variant={variant as 'warning'}>{severity}</Badge>;
}