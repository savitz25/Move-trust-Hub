-- =====================================================
-- Fix quote_requests inserts for Server Actions
-- Move Trust Hub (savitz25)
--
-- Root cause: anon INSERT policy exists but anon has no SELECT.
-- PostgREST .insert().select() fails even when INSERT would succeed.
-- App fix: server uses service_role OR anon insert without RETURNING.
-- This migration ensures INSERT policies are correct on all states.
-- =====================================================

-- Ensure RLS is on
alter table public.quote_requests enable row level security;

-- Drop all known insert policy variants and recreate one permissive validated policy
drop policy if exists "Anyone can submit quote requests" on public.quote_requests;
drop policy if exists "Anonymous can submit valid quote requests" on public.quote_requests;

create policy "Anonymous can submit valid quote requests"
  on public.quote_requests
  for insert
  to anon, authenticated
  with check (
    length(trim(name)) between 2 and 100
    and email ~* '^[^@]+@[^@]+\.[^@]+$'
    and from_zip ~ '^\d{5}$'
    and to_zip ~ '^\d{5}$'
  );

-- Service role full access (required for admin dashboard + server-side inserts)
drop policy if exists "Service role can manage quote requests" on public.quote_requests;
drop policy if exists "Service role full access on quote requests" on public.quote_requests;

create policy "Service role full access on quote requests"
  on public.quote_requests
  for all
  to service_role
  using (true)
  with check (true);

-- NOTE: We intentionally do NOT add anon SELECT — leads are private.
-- Server Actions must use service_role for RETURNING id, or anon insert without .select()

comment on table public.quote_requests is
  'Lead capture from quote forms. Inserts: anon (validated) or service_role (server). No public SELECT.';