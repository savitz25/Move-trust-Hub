import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';


export type MyMoveUserListRow = {
  userId: string;
  email: string;
  displayName: string | null;
  accountCreatedAt: string;
  lastActiveAt: string;
  lastSignInAt: string | null;
  inventoryCount: number;
  moverCount: number;
  comparisonCount: number;
  emailsSent: number;
};

export type MyMoveUsersListResult = {
  rows: MyMoveUserListRow[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export type MyMoveUserDetail = {
  user: MyMoveUserListRow & {
    marketingOptIn: boolean;
    moverAlertsOptIn: boolean;
  };
  inventories: Array<{
    id: string;
    name: string;
    totalVolume: number;
    totalItems: number;
    movePreset: string | null;
    createdAt: string;
    updatedAt: string;
    calculatorHref: string;
  }>;
  movers: Array<{
    id: string;
    companySlug: string;
    companyName: string;
    notes: string | null;
    createdAt: string;
    profileHref: string;
  }>;
  comparisons: Array<{
    id: string;
    name: string | null;
    companySlugs: string[];
    companyNames: string[];
    createdAt: string;
    compareHref: string;
  }>;
  timeline: Array<{
    id: string;
    type: string;
    label: string;
    createdAt: string;
    metadata: Record<string, unknown>;
  }>;
};

const PAGE_SIZE = 50;

const SORT_COLUMNS = new Set([
  'user_id',
  'email',
  'display_name',
  'account_created_at',
  'last_active_at',
  'inventory_count',
  'mover_count',
  'comparison_count',
  'emails_sent',
]);

function mapRow(
  row: {
    user_id: string;
    email: string;
    account_created_at: string;
    last_active_at: string;
    inventory_count: number;
    mover_count: number;
    comparison_count: number;
    emails_sent: number;
  },
  authMeta: Map<string, { displayName: string | null; lastSignInAt: string | null }>
): MyMoveUserListRow {
  const meta = authMeta.get(row.user_id);
  const lastSignIn = meta?.lastSignInAt;
  const lastActiveAt =
    lastSignIn && new Date(lastSignIn) > new Date(row.last_active_at)
      ? lastSignIn
      : row.last_active_at;

  return {
    userId: row.user_id,
    email: row.email,
    displayName: meta?.displayName ?? resolveDisplayName(row.email),
    accountCreatedAt: row.account_created_at,
    lastActiveAt,
    lastSignInAt: lastSignIn,
    inventoryCount: Number(row.inventory_count) || 0,
    moverCount: Number(row.mover_count) || 0,
    comparisonCount: Number(row.comparison_count) || 0,
    emailsSent: Number(row.emails_sent) || 0,
  };
}

function sortRowsByDisplayName(rows: MyMoveUserListRow[], dir: 'asc' | 'desc') {
  rows.sort((a, b) => {
    const aName = (a.displayName ?? a.email).toLowerCase();
    const bName = (b.displayName ?? b.email).toLowerCase();
    const cmp = aName.localeCompare(bName);
    return dir === 'asc' ? cmp : -cmp;
  });
}

async function fetchRawUserRows(input: {
  search?: string;
  sortColumn: string;
  sortDir: 'asc' | 'desc';
  limit: number;
  offset: number;
}) {
  const admin = createAdminClient();
  const { data, error } = await admin.rpc('admin_list_my_move_users', {
    p_search: input.search?.trim() ?? '',
    p_sort_column: input.sortColumn,
    p_sort_dir: input.sortDir,
    p_limit: input.limit,
    p_offset: input.offset,
  });

  if (error) {
    console.error('[listMyMoveUsers]', error.message);
    throw new Error('Failed to load My Move users');
  }

  return (data ?? []) as Array<{
    user_id: string;
    email: string;
    account_created_at: string;
    last_active_at: string;
    inventory_count: number;
    mover_count: number;
    comparison_count: number;
    emails_sent: number;
    total_count: number;
  }>;
}

function resolveDisplayName(
  email: string,
  meta?: Record<string, unknown> | null
): string | null {
  if (meta) {
    const full =
      (typeof meta.full_name === 'string' && meta.full_name) ||
      (typeof meta.name === 'string' && meta.name) ||
      null;
    if (full?.trim()) return full.trim();
  }
  const local = email.split('@')[0]?.trim();
  return local || null;
}

async function getCompanyNamesBySlugsAdmin(
  slugs: string[]
): Promise<Record<string, string>> {
  const unique = [...new Set(slugs.map((s) => s.trim()).filter(Boolean))];
  if (unique.length === 0) return {};

  const admin = createAdminClient();
  const { data } = await admin.from('companies').select('slug, name').in('slug', unique);

  const names: Record<string, string> = {};
  for (const row of data ?? []) {
    names[row.slug] = row.name;
  }
  for (const slug of unique) {
    if (!names[slug]) names[slug] = slug.replace(/-/g, ' ');
  }
  return names;
}

function activityLabel(type: string): string {
  switch (type) {
    case 'email_inventory':
      return 'Emailed inventory report';
    case 'email_mover':
      return 'Emailed mover details';
    case 'save_inventory':
      return 'Saved inventory';
    case 'save_mover':
      return 'Saved mover to shortlist';
    case 'save_comparison':
      return 'Saved comparison';
    default:
      return type.replace(/_/g, ' ');
  }
}

async function enrichAuthMeta(
  rows: Array<{ user_id: string; email: string }>
): Promise<Map<string, { displayName: string | null; lastSignInAt: string | null }>> {
  const map = new Map<string, { displayName: string | null; lastSignInAt: string | null }>();
  if (rows.length === 0) return map;

  const admin = createAdminClient();

  await Promise.all(
    rows.map(async (row) => {
      try {
        const { data, error } = await admin.auth.admin.getUserById(row.user_id);
        if (error || !data.user) {
          map.set(row.user_id, {
            displayName: resolveDisplayName(row.email),
            lastSignInAt: null,
          });
          return;
        }
        map.set(row.user_id, {
          displayName: resolveDisplayName(row.email, data.user.user_metadata),
          lastSignInAt: data.user.last_sign_in_at ?? null,
        });
      } catch {
        map.set(row.user_id, {
          displayName: resolveDisplayName(row.email),
          lastSignInAt: null,
        });
      }
    })
  );

  return map;
}

export async function listMyMoveUsers(input: {
  search?: string;
  sortColumn?: string;
  sortDir?: 'asc' | 'desc';
  page?: number;
}): Promise<MyMoveUsersListResult> {
  if (!isSupabaseAdminConfigured()) {
    return { rows: [], totalCount: 0, page: 1, pageSize: PAGE_SIZE };
  }

  const page = Math.max(1, input.page ?? 1);
  const sortColumn = SORT_COLUMNS.has(input.sortColumn ?? '')
    ? (input.sortColumn as string)
    : 'account_created_at';
  const sortDir = input.sortDir === 'asc' ? 'asc' : 'desc';
  const offset = (page - 1) * PAGE_SIZE;
  const rpcSortColumn = sortColumn === 'display_name' ? 'account_created_at' : sortColumn;

  if (sortColumn === 'display_name') {
    const allRaw: Awaited<ReturnType<typeof fetchRawUserRows>> = [];
    let fetchOffset = 0;
    let totalCount = 0;

    while (fetchOffset < 10_000) {
      const batch = await fetchRawUserRows({
        search: input.search,
        sortColumn: rpcSortColumn,
        sortDir: 'desc',
        limit: PAGE_SIZE,
        offset: fetchOffset,
      });
      if (batch.length === 0) break;
      totalCount = Number(batch[0]?.total_count) || totalCount;
      allRaw.push(...batch);
      if (allRaw.length >= totalCount) break;
      fetchOffset += PAGE_SIZE;
    }

    const authMeta = await enrichAuthMeta(allRaw);
    const allRows = allRaw.map((row) => mapRow(row, authMeta));
    sortRowsByDisplayName(allRows, sortDir);
    const rows = allRows.slice(offset, offset + PAGE_SIZE);

    return { rows, totalCount, page, pageSize: PAGE_SIZE };
  }

  const rawRows = await fetchRawUserRows({
    search: input.search,
    sortColumn: rpcSortColumn,
    sortDir,
    limit: PAGE_SIZE,
    offset,
  });

  const totalCount = rawRows[0]?.total_count ?? 0;
  const authMeta = await enrichAuthMeta(rawRows);
  const rows = rawRows.map((row) => mapRow(row, authMeta));

  return { rows, totalCount: Number(totalCount) || 0, page, pageSize: PAGE_SIZE };
}

export async function getMyMoveUserDetail(userId: string): Promise<MyMoveUserDetail | null> {
  if (!isSupabaseAdminConfigured()) return null;

  const admin = createAdminClient();

  const [profileRes, invRes, moverRes, compRes, activityRes, authRes] = await Promise.all([
    admin.from('user_profiles').select('*').eq('id', userId).maybeSingle(),
    admin
      .from('saved_inventories')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false }),
    admin
      .from('saved_movers')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false }),
    admin
      .from('saved_comparisons')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),
    admin
      .from('my_move_activity_events')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50),
    admin.auth.admin.getUserById(userId),
  ]);

  if (!profileRes.data) return null;

  const profile = profileRes.data;
  const authUser = authRes.data.user;
  const displayName = resolveDisplayName(profile.email, authUser?.user_metadata);
  const lastSignInAt = authUser?.last_sign_in_at ?? null;

  const moverSlugs = (moverRes.data ?? []).map((m) => m.company_slug);
  const compSlugs = (compRes.data ?? []).flatMap((c) => c.company_slugs ?? []);
  const companyNames = await getCompanyNamesBySlugsAdmin([...moverSlugs, ...compSlugs]);

  const listRow = await listMyMoveUsers({ search: profile.email, page: 1 });
  const summary =
    listRow.rows.find((r) => r.userId === userId) ??
    ({
      userId,
      email: profile.email,
      displayName,
      accountCreatedAt: profile.created_at,
      lastActiveAt: profile.updated_at,
      lastSignInAt,
      inventoryCount: invRes.data?.length ?? 0,
      moverCount: moverRes.data?.length ?? 0,
      comparisonCount: compRes.data?.length ?? 0,
      emailsSent: 0,
    } satisfies MyMoveUserListRow);

  if (lastSignInAt && new Date(lastSignInAt) > new Date(summary.lastActiveAt)) {
    summary.lastActiveAt = lastSignInAt;
  }
  summary.lastSignInAt = lastSignInAt;
  summary.displayName = displayName;

  const timelineFromRecords = [
    ...(invRes.data ?? []).map((inv) => ({
      id: `inv-${inv.id}`,
      type: 'save_inventory',
      label: `Inventory saved: ${inv.name}`,
      createdAt: inv.created_at,
      metadata: { inventoryId: inv.id, name: inv.name },
    })),
    ...(moverRes.data ?? []).map((m) => ({
      id: `mover-${m.id}`,
      type: 'save_mover',
      label: `Mover saved: ${companyNames[m.company_slug] ?? m.company_slug}`,
      createdAt: m.created_at,
      metadata: { companySlug: m.company_slug },
    })),
    ...(compRes.data ?? []).map((c) => ({
      id: `comp-${c.id}`,
      type: 'save_comparison',
      label: `Comparison saved: ${c.name ?? `${(c.company_slugs ?? []).length} movers`}`,
      createdAt: c.created_at,
      metadata: { comparisonId: c.id },
    })),
    ...(activityRes.data ?? []).map((e) => ({
      id: `evt-${e.id}`,
      type: e.event_type,
      label: activityLabel(e.event_type),
      createdAt: e.created_at,
      metadata: (e.metadata as Record<string, unknown>) ?? {},
    })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return {
    user: {
      ...summary,
      marketingOptIn: profile.marketing_opt_in,
      moverAlertsOptIn: profile.mover_alerts_opt_in,
    },
    inventories: (invRes.data ?? []).map((inv) => ({
      id: inv.id,
      name: inv.name,
      totalVolume: Number(inv.total_volume ?? 0),
      totalItems: inv.total_items ?? 0,
      movePreset: inv.move_preset,
      createdAt: inv.created_at,
      updatedAt: inv.updated_at,
      calculatorHref: `/moving-calculator?load=${inv.id}`,
    })),
    movers: (moverRes.data ?? []).map((m) => ({
      id: m.id,
      companySlug: m.company_slug,
      companyName: companyNames[m.company_slug] ?? m.company_slug.replace(/-/g, ' '),
      notes: m.notes,
      createdAt: m.created_at,
      profileHref: `/companies/${m.company_slug}`,
    })),
    comparisons: (compRes.data ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      companySlugs: c.company_slugs ?? [],
      companyNames: (c.company_slugs ?? []).map(
        (slug) => companyNames[slug] ?? slug.replace(/-/g, ' ')
      ),
      createdAt: c.created_at,
      compareHref: `/compare?${(c.company_slugs ?? []).map((s) => `add=${s}`).join('&')}`,
    })),
    timeline: timelineFromRecords.slice(0, 40),
  };
}

export async function exportMyMoveUsersCsv(input: {
  search?: string;
  sortColumn?: string;
  sortDir?: 'asc' | 'desc';
}): Promise<string> {
  const allRows: MyMoveUserListRow[] = [];
  let page = 1;
  let total = 0;

  do {
    const result = await listMyMoveUsers({
      search: input.search,
      sortColumn: input.sortColumn,
      sortDir: input.sortDir,
      page,
    });
    allRows.push(...result.rows);
    total = result.totalCount;
    page += 1;
  } while (allRows.length < total && page <= 200);

  const header = [
    'User ID',
    'Name',
    'Email',
    'Account Created',
    'Last Active',
    'Last Sign In',
    'Inventories',
    'Movers Saved',
    'Comparisons',
    'Emails Sent',
  ];

  const escape = (v: string | number) => {
    const s = String(v);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const lines = [
    header.join(','),
    ...allRows.map((r) =>
      [
        r.userId,
        r.displayName ?? '',
        r.email,
        r.accountCreatedAt,
        r.lastActiveAt,
        r.lastSignInAt ?? '',
        r.inventoryCount,
        r.moverCount,
        r.comparisonCount,
        r.emailsSent,
      ]
        .map(escape)
        .join(',')
    ),
  ];

  return lines.join('\n');
}