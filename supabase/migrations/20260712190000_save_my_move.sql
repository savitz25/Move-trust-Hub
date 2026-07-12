-- Save My Move: optional passwordless accounts
-- user_profiles, saved_inventories, saved_movers, magic_link_rate_limits

-- =====================================================
-- USER PROFILES (extends auth.users)
-- =====================================================
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  marketing_opt_in boolean not null default false,
  mover_alerts_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_profiles enable row level security;

create policy "Users read own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users update own profile"
  on public.user_profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users insert own profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

create policy "Service role manages profiles"
  on public.user_profiles for all
  to service_role
  using (true)
  with check (true);

-- Auto-create profile on signup (Google or magic link merge via same email)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_profiles (id, email)
  values (new.id, coalesce(new.email, ''))
  on conflict (id) do update
    set email = excluded.email,
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================
-- SAVED INVENTORIES (multiple named per user)
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

create policy "Users manage own inventories"
  on public.saved_inventories for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Service role manages inventories"
  on public.saved_inventories for all
  to service_role
  using (true)
  with check (true);

-- =====================================================
-- SAVED MOVERS (shortlist with private notes)
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

create policy "Users manage own saved movers"
  on public.saved_movers for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Service role manages saved movers"
  on public.saved_movers for all
  to service_role
  using (true)
  with check (true);

-- Ensure saved_comparisons has updated_at if missing
alter table public.saved_comparisons
  add column if not exists updated_at timestamptz default now();

-- =====================================================
-- MAGIC LINK RATE LIMITING
-- =====================================================
create table if not exists public.magic_link_rate_limits (
  email_hash text primary key,
  request_count integer not null default 1,
  window_start timestamptz not null default now(),
  last_request_at timestamptz not null default now()
);

alter table public.magic_link_rate_limits enable row level security;

create policy "Service role manages magic link limits"
  on public.magic_link_rate_limits for all
  to service_role
  using (true)
  with check (true);

-- updated_at triggers
drop trigger if exists saved_inventories_updated_at on public.saved_inventories;
create trigger saved_inventories_updated_at
  before update on public.saved_inventories
  for each row execute function public.handle_updated_at();

drop trigger if exists saved_movers_updated_at on public.saved_movers;
create trigger saved_movers_updated_at
  before update on public.saved_movers
  for each row execute function public.handle_updated_at();

drop trigger if exists user_profiles_updated_at on public.user_profiles;
create trigger user_profiles_updated_at
  before update on public.user_profiles
  for each row execute function public.handle_updated_at();