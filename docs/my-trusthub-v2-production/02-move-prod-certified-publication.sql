-- MY TRUSTHUB V2 PRODUCTION HANDOFF — HINDMAN CANARY PUBLICATION ATTESTATION.
-- Target arepfylnilkjmyduhwbz. Operator session; requires 01 first and
--   select set_config('mth.v23_production','approved',false);
--
-- WHAT THIS IS: a one-row operator attestation that the exact canary profile
-- (Move mover, USDOT 1002530, slug hindman-isaacs-moving-storage-inc) is
-- PUBLISHABLE, read by the Move runtime through the capability role only.
-- WHAT THIS IS NOT: a mover registry or a publication source. The real
-- production publication source stays the public mover evidence that renders
-- /companies/<slug>. Widening beyond Hindman replaces this table with a
-- resolver over that real source in a separate, reviewed ship; the check
-- constraints below make any second row impossible on purpose.
begin;
do $$ begin
  if current_setting('mth.v23_production', true) is distinct from 'approved' then
    raise exception 'Production target approval required';
  end if;
  if to_regnamespace('mth_profile_transfer') is null or to_regrole('mth_move_profile_transfer') is null then
    raise exception '01-move-prod-source-stage.sql must be applied first';
  end if;
  if to_regclass('mth_profile_transfer.certified_publication') is not null then
    raise exception 'certified_publication already exists; review, do not re-create';
  end if;
end $$;
create table mth_profile_transfer.certified_publication (
  hub text not null check (hub = 'move'),
  native_id text primary key check (native_id = 'usdot-1002530'),
  canonical_slug text not null unique check (canonical_slug = 'hindman-isaacs-moving-storage-inc'),
  publication_state text not null check (publication_state = 'PUBLISHABLE'),
  reviewed_class text not null check (reviewed_class = 'mover'),
  attested_at timestamptz not null default clock_timestamp(),
  evidence_ref text not null check (length(evidence_ref) between 8 and 200)
);
comment on table mth_profile_transfer.certified_publication is
  'My TrustHub V2 production CANARY attestation for exactly one mover (Hindman & Isaacs, USDOT 1002530). Not a mover registry; not a publication source. Replaced by the supported-published-mover resolver when the canary widens.';
revoke all on mth_profile_transfer.certified_publication from public, anon, authenticated, service_role;
alter table mth_profile_transfer.certified_publication enable row level security;
alter table mth_profile_transfer.certified_publication force row level security;
grant select on mth_profile_transfer.certified_publication to mth_move_profile_transfer;
create policy certified_exact_canary on mth_profile_transfer.certified_publication for select
  to mth_move_profile_transfer using (native_id = 'usdot-1002530');
-- The attestation row. evidence_ref is the operator's fresh read of the public
-- profile (URL plus timestamp), the same evidence used for the Ask binding.
insert into mth_profile_transfer.certified_publication (hub, native_id, canonical_slug, publication_state, reviewed_class, evidence_ref)
values ('move', 'usdot-1002530', 'hindman-isaacs-moving-storage-inc', 'PUBLISHABLE', 'mover',
  coalesce(nullif(current_setting('mth.v23_canary_evidence_ref', true), ''), 'REPLACE-WITH-EVIDENCE-REF'));
do $$ begin
  if (select evidence_ref from mth_profile_transfer.certified_publication) = 'REPLACE-WITH-EVIDENCE-REF' then
    raise exception 'Set mth.v23_canary_evidence_ref (public profile URL + read timestamp) before applying';
  end if;
  raise notice 'MTH_PROD_CANARY_PUBLICATION_APPLIED';
end $$;
commit;
