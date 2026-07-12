-- IP-based rate limiting for magic link requests (complements email_hash limits)

create table if not exists public.magic_link_ip_rate_limits (
  ip_hash text primary key,
  request_count integer not null default 1,
  window_start timestamptz not null default now(),
  last_request_at timestamptz not null default now()
);

alter table public.magic_link_ip_rate_limits enable row level security;

create policy "Service role manages magic link ip limits"
  on public.magic_link_ip_rate_limits for all
  to service_role
  using (true)
  with check (true);