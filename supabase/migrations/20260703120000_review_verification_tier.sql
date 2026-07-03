-- Verification tier for moderated native reviews
alter table public.company_reviews
  add column if not exists verification_tier text not null default 'email_pending'
    check (verification_tier in ('email_pending', 'verified_mth'));

comment on column public.company_reviews.verification_tier is
  'email_pending on submit; verified_mth after moderator approval (email + human review).';

update public.company_reviews
set verification_tier = 'verified_mth'
where status = 'approved' and verification_tier = 'email_pending';