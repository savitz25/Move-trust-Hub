-- Ensure Save My Move shortlist / compare tables exist with RLS (production align).
-- Safe to re-run. Shared project: arepfylnilkjmyduhwbz

-- =====================================================
-- saved_inventories
-- =====================================================
create table if not exists public.saved_inventories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'My Move',
  inventory jsonb not null default '[]'::jsonb,
  mode text default 'room',
  move_preset text,
  total_volume numeric default 0,
  total_items integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_saved_inventories_user on public.saved_inventories (user_id);
alter table public.saved_inventories enable row level security;

drop policy if exists "Users manage own inventories" on public.saved_inventories;
create policy "Users manage own inventories"
  on public.saved_inventories for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Service role manages inventories" on public.saved_inventories;
create policy "Service role manages inventories"
  on public.saved_inventories for all
  to service_role
  using (true)
  with check (true);

-- =====================================================
-- saved_movers (shortlist)
-- =====================================================
create table if not exists public.saved_movers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_slug text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, company_slug)
);

create index if not exists idx_saved_movers_user on public.saved_movers (user_id);
alter table public.saved_movers enable row level security;

drop policy if exists "Users manage own saved movers" on public.saved_movers;
create policy "Users manage own saved movers"
  on public.saved_movers for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Service role manages saved movers" on public.saved_movers;
create policy "Service role manages saved movers"
  on public.saved_movers for all
  to service_role
  using (true)
  with check (true);

-- =====================================================
-- saved_comparisons
-- =====================================================
create table if not exists public.saved_comparisons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_slugs text[] not null default '{}',
  name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_saved_comparisons_user on public.saved_comparisons (user_id);
alter table public.saved_comparisons enable row level security;

drop policy if exists "Users can manage own saved comparisons" on public.saved_comparisons;
create policy "Users can manage own saved comparisons"
  on public.saved_comparisons for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Service role manages saved comparisons" on public.saved_comparisons;
create policy "Service role manages saved comparisons"
  on public.saved_comparisons for all
  to service_role
  using (true)
  with check (true);

-- updated_at helpers (no-op if function missing — create minimal)
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists saved_inventories_updated_at on public.saved_inventories;
create trigger saved_inventories_updated_at
  before update on public.saved_inventories
  for each row execute function public.handle_updated_at();

drop trigger if exists saved_movers_updated_at on public.saved_movers;
create trigger saved_movers_updated_at
  before update on public.saved_movers
  for each row execute function public.handle_updated_at();

drop trigger if exists saved_comparisons_updated_at on public.saved_comparisons;
create trigger saved_comparisons_updated_at
  before update on public.saved_comparisons
  for each row execute function public.handle_updated_at();

notify pgrst, 'reload schema';
