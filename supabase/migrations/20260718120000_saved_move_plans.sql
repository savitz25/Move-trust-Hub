-- =====================================================
-- SAVED MOVE PLANS (full wizard plans: route, shortlist, inventory)
-- =====================================================
create table if not exists public.saved_move_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'My Move Plan',
  plan jsonb not null default '{}'::jsonb,
  readiness integer not null default 0,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_saved_move_plans_user
  on public.saved_move_plans (user_id);

create index if not exists idx_saved_move_plans_user_updated
  on public.saved_move_plans (user_id, updated_at desc);

alter table public.saved_move_plans enable row level security;

create policy "Users manage own move plans"
  on public.saved_move_plans for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Service role manages move plans"
  on public.saved_move_plans for all
  to service_role
  using (true)
  with check (true);

drop trigger if exists saved_move_plans_updated_at on public.saved_move_plans;
create trigger saved_move_plans_updated_at
  before update on public.saved_move_plans
  for each row execute function public.handle_updated_at();
