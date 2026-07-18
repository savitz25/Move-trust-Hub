-- =====================================================
-- Ensure portal owner/dispute columns exist on company_reviews
-- Production previously lagged the full mover portal migration,
-- which caused admin moderation SELECT to fail (missing columns)
-- and silently show an empty Pending queue while inserts succeeded.
-- =====================================================

alter table public.company_reviews
  add column if not exists owner_response text;

alter table public.company_reviews
  add column if not exists owner_response_at timestamptz;

alter table public.company_reviews
  add column if not exists owner_response_by uuid references auth.users(id) on delete set null;

alter table public.company_reviews
  add column if not exists dispute_status text;

alter table public.company_reviews
  add column if not exists dispute_category text;

alter table public.company_reviews
  add column if not exists dispute_reason text;

alter table public.company_reviews
  add column if not exists disputed_at timestamptz;

alter table public.company_reviews
  add column if not exists disputed_by uuid references auth.users(id) on delete set null;

alter table public.company_reviews
  add column if not exists dispute_moderation_note text;

alter table public.company_reviews
  add column if not exists dispute_resolved_at timestamptz;

update public.company_reviews
set dispute_status = 'none'
where dispute_status is null;

alter table public.company_reviews
  alter column dispute_status set default 'none';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'company_reviews_dispute_status_check'
  ) then
    alter table public.company_reviews
      add constraint company_reviews_dispute_status_check
      check (dispute_status in ('none', 'under_review', 'resolved_upheld', 'resolved_rejected'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'company_reviews_dispute_category_check'
  ) then
    alter table public.company_reviews
      add constraint company_reviews_dispute_category_check
      check (
        dispute_category is null
        or dispute_category in (
          'mistaken_identity',
          'fraud',
          'harassment',
          'not_a_customer',
          'other_policy'
        )
      );
  end if;
end $$;

create index if not exists idx_company_reviews_dispute
  on public.company_reviews (dispute_status, disputed_at desc)
  where dispute_status = 'under_review';
