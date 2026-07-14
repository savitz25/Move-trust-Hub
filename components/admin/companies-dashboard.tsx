'use client';

import { useCallback, useMemo, useState, useTransition } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Download,
  Loader2,
  RefreshCw,
  Search,
} from 'lucide-react';
import { exportAdminCompaniesCsv, listAdminCompanies } from '@/actions/admin-companies';
import { refreshCompanyAllDataAction } from '@/actions/admin-refresh-company';
import type { AdminCompanyListItem, AdminCompanyStatus } from '@/lib/admin/company-dashboard-types';
import type { AdminCompanyStats } from '@/actions/admin-company-stats';
import { CompanyEditModal } from '@/components/admin/company-edit-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';

function statusBadge(status: AdminCompanyStatus) {
  if (status === 'active') return <Badge variant="success">Active</Badge>;
  if (status === 'out_of_service') return <Badge variant="destructive">Out of Service</Badge>;
  return <Badge variant="warning">Inactive</Badge>;
}

function reputationColor(score: number) {
  if (score >= 85) return 'text-emerald-700';
  if (score >= 70) return 'text-[#0A2540]';
  if (score >= 50) return 'text-amber-700';
  return 'text-red-700';
}

function formatDate(value: string | null) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

type Props = {
  initialCompanies: AdminCompanyListItem[];
  stats: AdminCompanyStats | null;
  loadWarning?: string;
  dataSource?: 'supabase' | 'seed';
};

export function CompaniesDashboard({
  initialCompanies,
  stats,
  loadWarning,
  dataSource,
}: Props) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [staleOnly, setStaleOnly] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'reputationScore', desc: true }]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [bulkRefreshing, setBulkRefreshing] = useState(false);

  const reload = useCallback(() => {
    startTransition(async () => {
      try {
        const rows = await listAdminCompanies();
        setCompanies(rows);
      } catch {
        toast.error('Failed to reload companies');
      }
    });
  }, []);

  const filteredData = useMemo(() => {
    return companies.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (staleOnly && !c.isStale) return false;
      return true;
    });
  }, [companies, statusFilter, staleOnly]);

  const columns = useMemo<ColumnDef<AdminCompanyListItem>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Company',
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-[#0A2540]">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">{row.original.headquarters}</p>
          </div>
        ),
      },
      {
        id: 'dot',
        header: 'DOT / MC',
        cell: ({ row }) => (
          <div className="tabular-nums text-sm">
            <div>{row.original.usdotNumber || '—'}</div>
            <div className="text-xs text-muted-foreground">{row.original.mcNumber || '—'}</div>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => statusBadge(row.original.status),
      },
      {
        accessorKey: 'reputationScore',
        header: 'Reputation',
        cell: ({ row }) => (
          <span className={`font-semibold tabular-nums ${reputationColor(row.original.reputationScore)}`}>
            {row.original.reputationScore}
          </span>
        ),
      },
      {
        accessorKey: 'lastUpdated',
        header: 'Last Updated',
        cell: ({ row }) => formatDate(row.original.lastUpdated),
      },
      {
        id: 'google',
        header: 'Google',
        cell: ({ row }) => (
          <span className="tabular-nums text-sm">
            {row.original.googleRating != null ? `${row.original.googleRating}★` : '—'} ·{' '}
            {row.original.googleReviewCount}
          </span>
        ),
      },
      {
        accessorKey: 'bbbRating',
        header: 'BBB',
        cell: ({ row }) => row.original.bbbRating,
      },
      {
        id: 'stale',
        header: 'Freshness',
        cell: ({ row }) =>
          row.original.isStale ? (
            <Badge variant="warning">Stale</Badge>
          ) : (
            <Badge variant="outline">Current</Badge>
          ),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditId(row.original.id);
                setEditOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              title="Refresh all data sources"
              onClick={() => {
                startTransition(async () => {
                  const result = await refreshCompanyAllDataAction(row.original.id, {
                    forceFmcsa: true,
                  });
                  if (result.success) {
                    toast.success(result.message ?? 'Refreshed');
                    reload();
                  } else {
                    toast.error(result.error ?? 'Refresh failed');
                  }
                });
              }}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [reload]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filter) => {
      const q = String(filter).toLowerCase();
      const c = row.original;
      return (
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        c.usdotNumber.includes(q) ||
        c.mcNumber.toLowerCase().includes(q) ||
        c.headquarters.toLowerCase().includes(q)
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 25 } },
  });

  async function exportCsv() {
    try {
      const csv = await exportAdminCompaniesCsv();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `movetrusthub-companies-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('CSV exported');
    } catch {
      toast.error('Export failed');
    }
  }

  async function bulkRefreshStale() {
    const stale = companies.filter((c) => c.isStale);
    if (!stale.length) {
      toast.message('No stale companies to refresh');
      return;
    }
    if (!confirm(`Refresh all data for ${stale.length} stale companies? This may take several minutes.`)) {
      return;
    }
    setBulkRefreshing(true);
    let ok = 0;
    for (const c of stale) {
      const result = await refreshCompanyAllDataAction(c.id, { forceFmcsa: false });
      if (result.success) ok++;
    }
    setBulkRefreshing(false);
    toast.success(`Bulk refresh complete — ${ok}/${stale.length} succeeded`);
    reload();
  }

  const staleCount = companies.filter((c) => c.isStale).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0A2540]">Company Management</h2>
          <p className="text-sm text-muted-foreground">
            Search, edit, and refresh FMCSA, Google, and BBB data for directory movers.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={exportCsv}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={bulkRefreshing || staleCount === 0}
            onClick={bulkRefreshStale}
          >
            {bulkRefreshing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh stale ({staleCount})
          </Button>
          <Button variant="outline" size="sm" onClick={reload} disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Reload
          </Button>
        </div>
      </div>

      {loadWarning ? (
        <Card className="border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
          <p className="font-semibold">Company data warning</p>
          <p className="mt-1">{loadWarning}</p>
        </Card>
      ) : null}

      {dataSource === 'seed' && !loadWarning ? (
        <Card className="border-sky-200 bg-sky-50 p-4 text-sm text-sky-950">
          Showing bundled seed companies — connect <code>SUPABASE_SERVICE_ROLE_KEY</code> for live
          directory edits.
        </Card>
      ) : null}

      {stats ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Directory companies', value: stats.supabaseDirectory },
            { label: 'Stale profiles', value: staleCount },
            { label: 'Pending suggestions', value: stats.pendingSuggestions },
            { label: 'Local movers (catalog)', value: stats.localMoversDisplayable },
          ].map((s) => (
            <Card key={s.label} className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-[#0A2540]">{s.value}</p>
            </Card>
          ))}
        </div>
      ) : null}

      <Card className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, DOT, MC, slug, or city…"
              className="pl-9"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              aria-label="Search companies"
            />
          </div>
          <Select
            className="w-full lg:w-40"
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="out_of_service">Out of service</option>
          </Select>
          <label className="flex items-center gap-2 text-sm whitespace-nowrap">
            <input
              type="checkbox"
              checked={staleOnly}
              onChange={(e) => setStaleOnly(e.target.checked)}
            />
            Stale only
          </label>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} of {companies.length} companies
        </p>
      </Card>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        className="flex items-center gap-1 font-semibold hover:text-[#0A2540]"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ArrowUp className="h-3.5 w-3.5" />,
                          desc: <ArrowDown className="h-3.5 w-3.5" />,
                        }[header.column.getIsSorted() as string] ?? (
                          <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                        )}
                      </button>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {pending && !companies.length ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No companies match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Rows per page</span>
            <Select
              className="h-8 w-20"
              value={String(table.getState().pagination.pageSize)}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <span className="text-sm tabular-nums text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      <CompanyEditModal
        companyId={editId}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSaved={reload}
      />
    </div>
  );
}