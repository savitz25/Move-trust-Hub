'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Download,
  ExternalLink,
  Loader2,
  Search,
  X,
} from 'lucide-react';
import {
  exportMyMoveUsersCsvAction,
  getMyMoveUserDetailAction,
  listMyMoveUsersAction,
} from '@/actions/admin-my-move-users';
import type { MyMoveUserDetail, MyMoveUsersListResult } from '@/lib/admin/my-move-users';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type SortColumn =
  | 'user_id'
  | 'display_name'
  | 'email'
  | 'account_created_at'
  | 'last_active_at'
  | 'inventory_count'
  | 'mover_count'
  | 'comparison_count'
  | 'emails_sent';

type ColumnDef = {
  key: SortColumn;
  label: string;
  align?: 'left' | 'right';
  hideOnMobile?: boolean;
};

const COLUMNS: ColumnDef[] = [
  { key: 'user_id', label: 'User ID', hideOnMobile: true },
  { key: 'display_name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'account_created_at', label: 'Created' },
  { key: 'last_active_at', label: 'Last active' },
  { key: 'inventory_count', label: 'Inventories', align: 'right' },
  { key: 'mover_count', label: 'Movers', align: 'right', hideOnMobile: true },
  { key: 'comparison_count', label: 'Comparisons', align: 'right', hideOnMobile: true },
  { key: 'emails_sent', label: 'Emails', align: 'right' },
];

function formatDate(value: string | null | undefined) {
  if (!value) return '—';
  return new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatShortDate(value: string | null | undefined) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  });
}

function SortIcon({
  column,
  sortColumn,
  sortDir,
}: {
  column: SortColumn;
  sortColumn: SortColumn;
  sortDir: 'asc' | 'desc';
}) {
  if (column !== sortColumn) {
    return <ArrowUpDown className="ml-1 inline h-3.5 w-3.5 opacity-40" aria-hidden="true" />;
  }
  return sortDir === 'asc' ? (
    <ArrowUp className="ml-1 inline h-3.5 w-3.5 text-primary" aria-hidden="true" />
  ) : (
    <ArrowDown className="ml-1 inline h-3.5 w-3.5 text-primary" aria-hidden="true" />
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border bg-muted/30 px-3 py-2 text-center">
      <div className="text-lg font-semibold tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

function UserDetailPanel({
  detail,
  loading,
  onClose,
}: {
  detail: MyMoveUserDetail | null;
  loading: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEscape);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEscape);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const user = detail?.user;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          aria-label="Close user detail"
          onClick={onClose}
        />
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative z-10 flex h-full w-full max-w-xl flex-col border-l bg-background shadow-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="my-move-user-detail-title"
        >
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="min-w-0">
              <h2 id="my-move-user-detail-title" className="truncate text-lg font-semibold">
                {loading ? 'Loading…' : user?.displayName ?? user?.email ?? 'User detail'}
              </h2>
              {user?.email ? (
                <p className="truncate text-sm text-muted-foreground">{user.email}</p>
              ) : null}
            </div>
            <Button size="icon" variant="ghost" onClick={onClose} aria-label="Close">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-muted-foreground">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading profile…
              </div>
            ) : !detail ? (
              <p className="py-8 text-center text-muted-foreground">User not found.</p>
            ) : (
              <div className="space-y-6">
                <section>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Profile
                  </h3>
                  <div className="grid gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <span className="text-muted-foreground">User ID</span>
                      <p className="font-mono text-xs break-all">{detail.user.userId}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Account created</span>
                      <p>{formatDate(detail.user.accountCreatedAt)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last active</span>
                      <p>{formatDate(detail.user.lastActiveAt)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last sign in</span>
                      <p>{formatDate(detail.user.lastSignInAt)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:col-span-2">
                      <Badge variant={detail.user.marketingOptIn ? 'default' : 'secondary'}>
                        Marketing {detail.user.marketingOptIn ? 'on' : 'off'}
                      </Badge>
                      <Badge variant={detail.user.moverAlertsOptIn ? 'default' : 'secondary'}>
                        Mover alerts {detail.user.moverAlertsOptIn ? 'on' : 'off'}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <StatPill label="Inventories" value={detail.user.inventoryCount} />
                    <StatPill label="Movers" value={detail.user.moverCount} />
                    <StatPill label="Comparisons" value={detail.user.comparisonCount} />
                    <StatPill label="Emails" value={detail.user.emailsSent} />
                  </div>
                </section>

                <section>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Inventories ({detail.inventories.length})
                  </h3>
                  {detail.inventories.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No saved inventories.</p>
                  ) : (
                    <ul className="space-y-2">
                      {detail.inventories.map((inv) => (
                        <li key={inv.id} className="rounded-lg border p-3 text-sm">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium">{inv.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {inv.totalItems} items · {inv.totalVolume.toFixed(1)} cu ft
                                {inv.movePreset ? ` · ${inv.movePreset}` : ''}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Updated {formatShortDate(inv.updatedAt)}
                              </p>
                            </div>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={inv.calculatorHref} target="_blank">
                                Open
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Saved movers ({detail.movers.length})
                  </h3>
                  {detail.movers.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No saved movers.</p>
                  ) : (
                    <ul className="space-y-2">
                      {detail.movers.map((m) => (
                        <li key={m.id} className="rounded-lg border p-3 text-sm">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium">{m.companyName}</p>
                              {m.notes ? (
                                <p className="text-xs text-muted-foreground line-clamp-2">{m.notes}</p>
                              ) : null}
                              <p className="text-xs text-muted-foreground">
                                Saved {formatShortDate(m.createdAt)}
                              </p>
                            </div>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={m.profileHref} target="_blank">
                                Profile
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Saved comparisons ({detail.comparisons.length})
                  </h3>
                  {detail.comparisons.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No saved comparisons.</p>
                  ) : (
                    <ul className="space-y-2">
                      {detail.comparisons.map((c) => (
                        <li key={c.id} className="rounded-lg border p-3 text-sm">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium">{c.name ?? 'Untitled comparison'}</p>
                              <p className="text-xs text-muted-foreground">
                                {c.companyNames.join(' · ')}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Saved {formatShortDate(c.createdAt)}
                              </p>
                            </div>
                            {c.compareHref ? (
                              <Button size="sm" variant="outline" asChild>
                                <Link href={c.compareHref} target="_blank">
                                  Compare
                                  <ExternalLink className="ml-1 h-3 w-3" />
                                </Link>
                              </Button>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Activity timeline
                  </h3>
                  {detail.timeline.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No recorded activity.</p>
                  ) : (
                    <ol className="relative space-y-3 border-l pl-4">
                      {detail.timeline.map((evt) => (
                        <li key={evt.id} className="text-sm">
                          <span className="absolute -left-[5px] mt-1.5 h-2 w-2 rounded-full bg-primary" />
                          <p className="font-medium">{evt.label}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(evt.createdAt)}</p>
                        </li>
                      ))}
                    </ol>
                  )}
                </section>
              </div>
            )}
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}

export function MyMoveUsersDashboard({
  initialData,
  adminReady,
}: {
  initialData: MyMoveUsersListResult;
  adminReady: boolean;
}) {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<SortColumn>('account_created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [detail, setDetail] = useState<MyMoveUserDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [pending, startTransition] = useTransition();
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  const loadUsers = useCallback(() => {
    if (!adminReady) return;
    startTransition(async () => {
      try {
        const result = await listMyMoveUsersAction({
          search: debouncedSearch,
          sortColumn,
          sortDir,
          page,
        });
        setData(result);
      } catch {
        toast.error('Failed to load My Move users');
      }
    });
  }, [adminReady, debouncedSearch, sortColumn, sortDir, page]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortColumn, sortDir]);

  function toggleSort(column: SortColumn) {
    if (sortColumn === column) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDir(column === 'display_name' || column === 'email' ? 'asc' : 'desc');
    }
  }

  async function openDetail(userId: string) {
    setSelectedUserId(userId);
    setDetail(null);
    setDetailLoading(true);
    try {
      const result = await getMyMoveUserDetailAction(userId);
      setDetail(result);
    } catch {
      toast.error('Failed to load user detail');
      setSelectedUserId(null);
    } finally {
      setDetailLoading(false);
    }
  }

  function closeDetail() {
    setSelectedUserId(null);
    setDetail(null);
  }

  async function handleExport() {
    setExporting(true);
    try {
      const csv = await exportMyMoveUsersCsvAction({
        search: debouncedSearch,
        sortColumn,
        sortDir,
      });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `my-move-users-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('CSV exported');
    } catch {
      toast.error('Export failed');
    } finally {
      setExporting(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(data.totalCount / data.pageSize));

  return (
    <div className="space-y-4">
      {!adminReady && (
        <Card className="border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900">
          Add <code className="rounded bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code> to load
          My Move customer data.
        </Card>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="pl-9"
            aria-label="Search My Move users"
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            {pending ? 'Updating…' : `${data.totalCount} user${data.totalCount === 1 ? '' : 's'}`}
          </p>
          <Button variant="outline" size="sm" disabled={exporting || !adminReady} onClick={handleExport}>
            {exporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-3 font-medium whitespace-nowrap ${
                    col.align === 'right' ? 'text-right' : ''
                  } ${col.hideOnMobile ? 'hidden md:table-cell' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className={`inline-flex items-center hover:text-foreground ${
                      col.align === 'right' ? 'ml-auto' : ''
                    } ${sortColumn === col.key ? 'text-foreground' : 'text-muted-foreground'}`}
                  >
                    {col.label}
                    <SortIcon column={col.key} sortColumn={sortColumn} sortDir={sortDir} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-10 text-center text-muted-foreground">
                  {pending ? 'Loading users…' : 'No My Move accounts match your search.'}
                </td>
              </tr>
            ) : (
              data.rows.map((row) => (
                <tr
                  key={row.userId}
                  className="cursor-pointer border-t transition-colors hover:bg-muted/30"
                  onClick={() => openDetail(row.userId)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openDetail(row.userId);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${row.displayName ?? row.email}`}
                >
                  <td className="hidden max-w-[120px] truncate px-3 py-2.5 font-mono text-xs md:table-cell">
                    {row.userId.slice(0, 8)}…
                  </td>
                  <td className="px-3 py-2.5 font-medium">{row.displayName ?? '—'}</td>
                  <td className="max-w-[180px] truncate px-3 py-2.5 text-muted-foreground">
                    {row.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5">{formatShortDate(row.accountCreatedAt)}</td>
                  <td className="whitespace-nowrap px-3 py-2.5">{formatShortDate(row.lastActiveAt)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{row.inventoryCount}</td>
                  <td className="hidden px-3 py-2.5 text-right tabular-nums md:table-cell">
                    {row.moverCount}
                  </td>
                  <td className="hidden px-3 py-2.5 text-right tabular-nums md:table-cell">
                    {row.comparisonCount}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{row.emailsSent}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data.totalCount > data.pageSize ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Page {data.page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || pending}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || pending}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}

      {selectedUserId ? (
        <UserDetailPanel detail={detail} loading={detailLoading} onClose={closeDetail} />
      ) : null}
    </div>
  );
}