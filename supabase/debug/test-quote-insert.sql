-- =====================================================
-- Debug: test quote_requests inserts (run in Supabase SQL Editor)
-- Move Trust Hub — savitz25
-- =====================================================

-- 1) Verify table + RLS
select
  relname as table_name,
  relrowsecurity as rls_enabled
from pg_class
where relname = 'quote_requests';

-- 2) List active policies
select
  policyname,
  roles,
  cmd,
  qual,
  with_check
from pg_policies
where tablename = 'quote_requests'
order by policyname;

-- 3) List columns (check migration applied)
select column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'quote_requests'
order by ordinal_position;

-- 4) Direct insert as postgres (bypasses RLS) — proves table works
insert into public.quote_requests (
  name, email, phone, from_zip, to_zip, home_size, source
) values (
  'SQL Debug Test',
  'debug-test@movetrusthub.com',
  '5550000000',
  '90210',
  '10001',
  '2',
  'sql-editor-debug'
)
returning id, created_at, source;

-- 5) Count rows
select count(*) as total_quotes from public.quote_requests;

-- 6) Latest 5 quotes (visible to you as dashboard owner / postgres role)
select id, name, email, from_zip, to_zip, source, destination_slug, created_at
from public.quote_requests
order by created_at desc
limit 5;

-- 7) Simulate anon RLS check (run AFTER setting role)
-- In SQL Editor this may not fully simulate PostgREST, but helps validate policy text:
-- set local role anon;
-- insert into public.quote_requests (name, email, from_zip, to_zip)
-- values ('Anon Test', 'anon@test.com', '90210', '10001');