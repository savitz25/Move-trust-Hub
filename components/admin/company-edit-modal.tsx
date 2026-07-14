'use client';

import { useEffect, useState, useTransition } from 'react';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import {
  getAdminCompanyDetail,
  updateAdminCompany,
} from '@/actions/admin-companies';
import type { AdminCompanyDetail } from '@/lib/admin/company-dashboard-types';
import { DataRefreshButtons } from '@/components/admin/data-refresh-buttons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type Tab = 'basic' | 'sources' | 'refresh' | 'audit';

function formatTs(value: string | null | undefined) {
  if (!value) return 'Never';
  return new Date(value).toLocaleString();
}

type Props = {
  companyId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
};

export function CompanyEditModal({ companyId, open, onOpenChange, onSaved }: Props) {
  const [tab, setTab] = useState<Tab>('basic');
  const [detail, setDetail] = useState<AdminCompanyDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open || !companyId) {
      setDetail(null);
      return;
    }
    setLoading(true);
    getAdminCompanyDetail(companyId)
      .then(setDetail)
      .catch(() => toast.error('Failed to load company'))
      .finally(() => setLoading(false));
  }, [open, companyId]);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'sources', label: 'Data Sources' },
    { id: 'refresh', label: 'Refresh Actions' },
    { id: 'audit', label: 'Audit Log' },
  ];

  function save() {
    if (!detail) return;
    startTransition(async () => {
      const result = await updateAdminCompany({
        id: detail.id,
        name: detail.name,
        slug: detail.slug,
        shortDescription: detail.shortDescription,
        description: detail.description,
        headquarters: detail.headquarters,
        website: detail.website,
        usdotNumber: detail.usdotNumber,
        mcNumber: detail.mcNumber,
        isVerified: detail.isVerified,
      });
      if (result.success) {
        toast.success('Company saved');
        onSaved();
      } else {
        toast.error(result.error ?? 'Save failed');
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <div className="flex w-full items-start justify-between gap-4 pr-8">
            <div>
              <DialogTitle>{detail?.name ?? 'Company'}</DialogTitle>
              {detail ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  USDOT {detail.usdotNumber || '—'} ·{' '}
                  <Link
                    href={`/companies/${detail.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[#00BFA5] hover:underline"
                  >
                    View profile <ExternalLink className="h-3 w-3" />
                  </Link>
                </p>
              ) : null}
            </div>
            <DialogClose onClose={() => onOpenChange(false)} />
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 border-b px-6 pb-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'bg-[#0A2540] text-white'
                  : 'text-[#0A2540]/70 hover:bg-muted'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="space-y-4 px-6 pb-6 pt-2">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading company…</p>
          ) : !detail ? (
            <p className="text-sm text-muted-foreground">Company not found.</p>
          ) : tab === 'basic' ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Company name
                </label>
                <Input
                  className="mt-1"
                  value={detail.name}
                  onChange={(e) => setDetail({ ...detail, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Slug</label>
                <Input
                  className="mt-1"
                  value={detail.slug}
                  onChange={(e) => setDetail({ ...detail, slug: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">USDOT</label>
                <Input
                  className="mt-1"
                  value={detail.usdotNumber}
                  onChange={(e) => setDetail({ ...detail, usdotNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">MC number</label>
                <Input
                  className="mt-1"
                  value={detail.mcNumber}
                  onChange={(e) => setDetail({ ...detail, mcNumber: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Headquarters
                </label>
                <Input
                  className="mt-1"
                  value={detail.headquarters}
                  onChange={(e) => setDetail({ ...detail, headquarters: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">Website</label>
                <Input
                  className="mt-1"
                  value={detail.website}
                  onChange={(e) => setDetail({ ...detail, website: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Short description
                </label>
                <Textarea
                  className="mt-1"
                  rows={2}
                  value={detail.shortDescription}
                  onChange={(e) => setDetail({ ...detail, shortDescription: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Full description
                </label>
                <Textarea
                  className="mt-1"
                  rows={4}
                  value={detail.description}
                  onChange={(e) => setDetail({ ...detail, description: e.target.value })}
                />
              </div>
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input
                  type="checkbox"
                  checked={detail.isVerified}
                  onChange={(e) => setDetail({ ...detail, isVerified: e.target.checked })}
                />
                Directory verified (FMCSA active)
              </label>
              <div className="sm:col-span-2 flex gap-2">
                <Button onClick={save} disabled={pending}>
                  {pending ? 'Saving…' : 'Save changes'}
                </Button>
              </div>
            </div>
          ) : tab === 'sources' ? (
            <div className="space-y-4 text-sm">
              <section className="rounded-lg border p-4">
                <h3 className="font-semibold text-[#0A2540]">FMCSA / DOT</h3>
                <dl className="mt-2 grid gap-1 text-muted-foreground">
                  <div>Last checked: {formatTs(detail.fmcsaLastChecked)}</div>
                  <div>Safety rating: {detail.fmcsaSafetyRating}</div>
                  <div>Complaints (12m): {detail.fmcsaComplaints}</div>
                  <div>Shipments: {detail.fmcsaShipments?.toLocaleString()}</div>
                </dl>
              </section>
              <section className="rounded-lg border p-4">
                <h3 className="font-semibold text-[#0A2540]">Google Places</h3>
                <dl className="mt-2 grid gap-1 text-muted-foreground">
                  <div>Last fetched: {formatTs(detail.googleData?.last_fetched)}</div>
                  <div>Status: {detail.googleData?.status ?? '—'}</div>
                  <div>
                    Rating: {detail.googleData?.rating ?? detail.overallRating} · Reviews:{' '}
                    {detail.googleData?.review_count ?? detail.reviewCount}
                  </div>
                  <div>Place ID: {detail.googleData?.place_id ?? '—'}</div>
                </dl>
              </section>
              <section className="rounded-lg border p-4">
                <h3 className="font-semibold text-[#0A2540]">BBB / Public scrape</h3>
                <dl className="mt-2 grid gap-1 text-muted-foreground">
                  <div>Last checked: {formatTs(detail.bbbLastChecked)}</div>
                  <div>Scraped: {formatTs(detail.publicScrapeData?.last_scraped_at)}</div>
                  <div>BBB rating: {detail.publicScrapeData?.bbb_rating ?? detail.bbbRating}</div>
                  <div>
                    Accredited:{' '}
                    {detail.publicScrapeData?.bbb_accreditation_status ??
                      (detail.bbbAccredited ? 'Yes' : 'No')}
                  </div>
                  {detail.publicScrapeData?.bbb_profile_url ? (
                    <div>
                      <a
                        href={detail.publicScrapeData.bbb_profile_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00BFA5] hover:underline"
                      >
                        BBB profile
                      </a>
                    </div>
                  ) : null}
                </dl>
              </section>
            </div>
          ) : tab === 'refresh' ? (
            <DataRefreshButtons
              companyId={detail.id}
              onRefreshed={setDetail}
              onListItemUpdated={onSaved}
            />
          ) : (
            <ul className="space-y-3">
              {detail.auditLog.map((entry) => (
                <li
                  key={entry.source}
                  className="flex items-start justify-between gap-4 rounded-lg border px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-[#0A2540]">{entry.label}</p>
                    {entry.detail ? (
                      <p className="text-muted-foreground">{entry.detail}</p>
                    ) : null}
                  </div>
                  <div className="shrink-0 text-right text-muted-foreground">
                    {formatTs(entry.timestamp)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}