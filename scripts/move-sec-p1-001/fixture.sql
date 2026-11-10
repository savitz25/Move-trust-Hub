-- Throwaway privilege replica of Move prod for MOVE-SEC-P1-001.
-- Not a data dump. Grants match the 2026-11-10 read-only capture.

create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
grant anon, authenticated, service_role to postgres;

create table public.companies (
  id text primary key,
  slug text unique not null,
  name text not null,
  logo text,
  short_description text,
  description text,
  founded_year integer,
  headquarters text,
  website text,
  usdot_number text,
  mc_number text,
  fmcsa_safety_rating text,
  fmcsa_complaints integer default 0,
  fmcsa_shipments integer default 0,
  bbb_rating text,
  bbb_accredited boolean default false,
  overall_rating numeric(3,2),
  review_count integer default 0,
  reputation_score integer default 0,
  years_in_business integer,
  avg_price_per_move integer,
  price_range text,
  coverage text,
  services jsonb default '[]'::jsonb,
  specialties jsonb default '[]'::jsonb,
  rating_breakdown jsonb,
  is_verified boolean default false,
  last_updated timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  fmcsa_last_checked timestamptz,
  authority_active boolean,
  out_of_service boolean default false,
  complaints_last_12m integer default 0,
  revocation_date date,
  data_hash text,
  fmcsa_legal_name text,
  fmcsa_raw jsonb,
  google_data jsonb,
  public_scrape_data jsonb,
  verification_sources jsonb,
  verification_last_synced_at timestamptz
);

insert into public.companies (id, slug, name, headquarters, usdot_number, is_verified, overall_rating, review_count)
values
  ('seed-co', 'seed-co', 'Seed Co', 'Austin, TX', '1000001', false, 4.20, 3),
  ('seed-two', 'seed-two', 'Seed Two', 'Dallas, TX', '1000002', true, 3.50, 1);

alter table public.companies enable row level security;
create policy "Public can read companies" on public.companies for select using (true);
create policy "Service role can manage companies" on public.companies for all to service_role using (true) with check (true);
grant all on table public.companies to anon, authenticated, service_role;

create view public.companies_with_stats as
select c.*, c.overall_rating as stats_rating, c.review_count as stats_review_count
from public.companies c;
grant all on table public.companies_with_stats to anon, authenticated, service_role;

create table public.moving_companies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  avg_rating numeric(3,2) not null default 0,
  review_count integer not null default 0,
  approved_review_count integer not null default 0,
  updated_at timestamptz not null default now()
);

create table public.company_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.moving_companies(id) on delete cascade,
  user_id uuid,
  reviewer_name text not null,
  reviewer_email text not null,
  rating smallint not null,
  title text,
  content text not null,
  photo_urls jsonb not null default '[]'::jsonb,
  status text not null default 'pending',
  moderation_note text,
  moderated_at timestamptz,
  moderated_by text,
  submitter_ip text,
  email_hash text not null,
  move_date date,
  source_page text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  verification_tier text,
  owner_response text,
  owner_response_at timestamptz,
  owner_response_by uuid,
  dispute_status text,
  dispute_category text,
  dispute_reason text,
  disputed_at timestamptz,
  disputed_by uuid,
  dispute_moderation_note text,
  dispute_resolved_at timestamptz
);

insert into public.moving_companies (id, slug, name)
values ('11111111-1111-1111-1111-111111111111', 'seed-movers', 'Seed Movers');

insert into public.company_reviews (
  id, company_id, user_id, reviewer_name, reviewer_email, rating, title, content,
  status, submitter_ip, email_hash, move_date, owner_response, owner_response_at, dispute_status
) values (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  '33333333-3333-3333-3333-333333333333',
  'Public Reviewer',
  'secret-reviewer@example.com',
  5,
  'Careful crew',
  'They wrapped every piece and showed up on time for the Austin move.',
  'approved',
  '203.0.113.10',
  'hash-secret',
  '2026-04-01',
  'Thanks for the note',
  '2026-04-02',
  'none'
);

insert into public.company_reviews (
  id, company_id, reviewer_name, reviewer_email, rating, content, status, submitter_ip, email_hash
) values (
  '44444444-4444-4444-4444-444444444444',
  '11111111-1111-1111-1111-111111111111',
  'Hidden Reviewer',
  'pending-secret@example.com',
  1,
  'This pending review must stay invisible to anon because status is not approved.',
  'pending',
  '203.0.113.11',
  'hash-pending'
);

alter table public.company_reviews enable row level security;
create policy "Public read approved reviews" on public.company_reviews for select using (status = 'approved');
create policy "Service role manages company reviews" on public.company_reviews for all to service_role using (true) with check (true);
grant all on table public.company_reviews to anon, authenticated, service_role;

create table public.network_auth_handoffs (
  code_hash text primary key,
  user_id uuid not null,
  from_hub text not null,
  to_hub text not null,
  destination_path text,
  expires_at timestamptz not null,
  used_at timestamptz
);

create or replace function public.mth_directory_health()
returns jsonb
language sql
stable
security definer
set search_path = public
as $mth$
  select jsonb_build_object(
    'companies_table_exists', true,
    'companies_row_count', (select count(*)::int from public.companies),
    'suggestions_pending', 0
  );
$mth$;

create or replace function public.mth_publish_directory_company(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $mth$
begin
  return jsonb_build_object('company_id', payload->>'id', 'slug', payload->>'slug', 'existing', false);
end;
$mth$;

create or replace function public.mth_get_directory_company(p_key text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $mth$
declare
  v_row public.companies%rowtype;
begin
  select * into v_row from public.companies where slug = p_key or id = p_key limit 1;
  if found then
    return to_jsonb(v_row);
  end if;
  return null;
end;
$mth$;

create or replace function public.refresh_moving_company_review_stats(p_company_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $mth$
begin
  update public.moving_companies
  set
    avg_rating = coalesce((
      select round(avg(rating)::numeric, 2)
      from public.company_reviews
      where company_id = p_company_id and status = 'approved'
    ), 0),
    review_count = (select count(*) from public.company_reviews where company_id = p_company_id),
    approved_review_count = (
      select count(*) from public.company_reviews
      where company_id = p_company_id and status = 'approved'
    ),
    updated_at = now()
  where id = p_company_id;
end;
$mth$;

create or replace function public.trg_refresh_company_review_stats()
returns trigger
language plpgsql
security definer
set search_path = public
as $mth$
begin
  perform public.refresh_moving_company_review_stats(coalesce(new.company_id, old.company_id));
  return coalesce(new, old);
end;
$mth$;

create trigger company_reviews_stats_refresh
  after insert or update of status, rating or delete on public.company_reviews
  for each row execute procedure public.trg_refresh_company_review_stats();

create or replace function public.consume_network_auth_handoff(p_code_hash text, p_to_hub text)
returns table (out_user_id uuid, out_from_hub text, out_destination_path text)
language plpgsql
security definer
set search_path = public
as $mth$
begin
  return query
  update public.network_auth_handoffs h
  set used_at = now()
  where h.code_hash = p_code_hash
    and h.to_hub = p_to_hub
    and h.used_at is null
    and h.expires_at > now()
  returning h.user_id, h.from_hub, h.destination_path;
end;
$mth$;

create or replace function public.local_canary_movers_for_county(
  p_state_code text,
  p_county_fips text,
  p_limit integer default 24
)
returns table (
  company_id text,
  slug text,
  name text,
  authority_number text,
  regulator text,
  home_county_fips text,
  home_county_name text,
  phone text,
  publication_state text,
  indexable boolean
)
language sql
stable
security definer
set search_path = public
as $mth$
  select
    null::text, null::text, null::text, null::text, null::text,
    null::text, null::text, null::text, null::text, null::boolean
  where false;
$mth$;

grant execute on function public.mth_directory_health() to public, anon, authenticated, service_role;
grant execute on function public.mth_publish_directory_company(jsonb) to public, anon, authenticated, service_role;
grant execute on function public.mth_get_directory_company(text) to public, anon, authenticated, service_role;
grant execute on function public.refresh_moving_company_review_stats(uuid) to public, anon, authenticated, service_role;
grant execute on function public.trg_refresh_company_review_stats() to public, anon, authenticated, service_role;

revoke all on function public.consume_network_auth_handoff(text, text) from public;
grant execute on function public.consume_network_auth_handoff(text, text) to anon, authenticated, service_role;

revoke all on function public.local_canary_movers_for_county(text, text, integer) from public;
grant execute on function public.local_canary_movers_for_county(text, text, integer) to anon, authenticated, service_role;
