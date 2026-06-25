-- =====================================================
-- Quote attribution: destination_slug + market_priority
-- Move Trust Hub — Phase 1 city hub quote tracking
-- Safe to re-run (IF NOT EXISTS)
-- =====================================================

alter table public.quote_requests
  add column if not exists destination_slug text,
  add column if not exists market_priority smallint;

comment on column public.quote_requests.destination_slug is
  'Inbound destination hub slug, e.g. myrtle-beach-sc, knoxville-tn';

comment on column public.quote_requests.market_priority is
  'Priority rank from lib/destinations/markets.ts (1 = highest demand)';

create index if not exists idx_quote_requests_destination
  on public.quote_requests (destination_slug)
  where destination_slug is not null;

create index if not exists idx_quote_requests_market_priority
  on public.quote_requests (market_priority)
  where market_priority is not null;

-- =====================================================
-- Verification (run after migration)
-- =====================================================
-- select column_name, data_type, is_nullable
-- from information_schema.columns
-- where table_schema = 'public'
--   and table_name = 'quote_requests'
--   and column_name in ('destination_slug', 'market_priority')
-- order by column_name;