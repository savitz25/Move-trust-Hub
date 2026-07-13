-- My Move admin: activity events + query indexes for /admin/my-move-users

create table if not exists public.my_move_activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_my_move_activity_user
  on public.my_move_activity_events (user_id);

create index if not exists idx_my_move_activity_created
  on public.my_move_activity_events (created_at desc);

create index if not exists idx_my_move_activity_user_type
  on public.my_move_activity_events (user_id, event_type);

create index if not exists idx_user_profiles_created
  on public.user_profiles (created_at desc);

create index if not exists idx_user_profiles_email
  on public.user_profiles (email);

create index if not exists idx_saved_comparisons_user
  on public.saved_comparisons (user_id);

alter table public.my_move_activity_events enable row level security;

create policy "Service role manages my move activity"
  on public.my_move_activity_events for all
  to service_role
  using (true)
  with check (true);

-- Aggregated list for admin dashboard (service_role only via server)
create or replace function public.admin_list_my_move_users(
  p_search text default '',
  p_sort_column text default 'account_created_at',
  p_sort_dir text default 'desc',
  p_limit int default 50,
  p_offset int default 0
)
returns table (
  user_id uuid,
  email text,
  account_created_at timestamptz,
  last_active_at timestamptz,
  inventory_count bigint,
  mover_count bigint,
  comparison_count bigint,
  emails_sent bigint,
  total_count bigint
)
language sql
security definer
set search_path = public
as $$
  with filtered as (
    select
      up.id as user_id,
      up.email,
      up.created_at as account_created_at,
      greatest(
        up.updated_at,
        coalesce((select max(si.updated_at) from saved_inventories si where si.user_id = up.id), up.created_at),
        coalesce((select max(sm.updated_at) from saved_movers sm where sm.user_id = up.id), up.created_at),
        coalesce((select max(sc.updated_at) from saved_comparisons sc where sc.user_id = up.id), up.created_at),
        coalesce((select max(ae.created_at) from my_move_activity_events ae where ae.user_id = up.id), up.created_at)
      ) as last_active_at,
      (select count(*)::bigint from saved_inventories si where si.user_id = up.id) as inventory_count,
      (select count(*)::bigint from saved_movers sm where sm.user_id = up.id) as mover_count,
      (select count(*)::bigint from saved_comparisons sc where sc.user_id = up.id) as comparison_count,
      (
        select count(*)::bigint
        from my_move_activity_events ae
        where ae.user_id = up.id
          and ae.event_type in ('email_inventory', 'email_mover')
      ) as emails_sent
    from user_profiles up
    where p_search = ''
      or up.email ilike '%' || replace(replace(p_search, '%', ''), '_', '') || '%'
  ),
  numbered as (
    select
      *,
      count(*) over () as total_count
    from filtered
  )
  select
    user_id,
    email,
    account_created_at,
    last_active_at,
    inventory_count,
    mover_count,
    comparison_count,
    emails_sent,
    total_count
  from numbered
  order by
    case when p_sort_column = 'user_id' and p_sort_dir = 'asc' then user_id end asc,
    case when p_sort_column = 'user_id' and p_sort_dir = 'desc' then user_id end desc,
    case when p_sort_column = 'email' and p_sort_dir = 'asc' then email end asc,
    case when p_sort_column = 'email' and p_sort_dir = 'desc' then email end desc,
    case when p_sort_column = 'account_created_at' and p_sort_dir = 'asc' then account_created_at end asc,
    case when p_sort_column = 'account_created_at' and p_sort_dir = 'desc' then account_created_at end desc,
    case when p_sort_column = 'last_active_at' and p_sort_dir = 'asc' then last_active_at end asc,
    case when p_sort_column = 'last_active_at' and p_sort_dir = 'desc' then last_active_at end desc,
    case when p_sort_column = 'inventory_count' and p_sort_dir = 'asc' then inventory_count end asc,
    case when p_sort_column = 'inventory_count' and p_sort_dir = 'desc' then inventory_count end desc,
    case when p_sort_column = 'mover_count' and p_sort_dir = 'asc' then mover_count end asc,
    case when p_sort_column = 'mover_count' and p_sort_dir = 'desc' then mover_count end desc,
    case when p_sort_column = 'comparison_count' and p_sort_dir = 'asc' then comparison_count end asc,
    case when p_sort_column = 'comparison_count' and p_sort_dir = 'desc' then comparison_count end desc,
    case when p_sort_column = 'emails_sent' and p_sort_dir = 'asc' then emails_sent end asc,
    case when p_sort_column = 'emails_sent' and p_sort_dir = 'desc' then emails_sent end desc,
    account_created_at desc
  limit greatest(p_limit, 1)
  offset greatest(p_offset, 0);
$$;

revoke all on function public.admin_list_my_move_users(text, text, text, int, int) from public;
grant execute on function public.admin_list_my_move_users(text, text, text, int, int) to service_role;