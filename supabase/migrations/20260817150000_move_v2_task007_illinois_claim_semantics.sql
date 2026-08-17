-- Task 007: Illinois official evidence, claim semantics, Census places, and experimental-derived gate.
alter table move_v2.state_source_release drop constraint if exists state_source_release_state_check;
alter table move_v2.state_source_release add constraint state_source_release_state_check check(state in('NJ','FL','WA','IL')) not valid;

alter table move_v2.provider_service_geography_observation add column if not exists page_title text;
alter table move_v2.provider_service_geography_observation add column if not exists claim_type text;
alter table move_v2.provider_service_geography_observation add column if not exists is_exhaustive boolean not null default false;
alter table move_v2.provider_service_geography_observation add column if not exists normalization_rule_version text;
update move_v2.provider_service_geography_observation set normalization_rule_version=rule_version where normalization_rule_version is null;
alter table move_v2.provider_service_geography_observation drop constraint if exists provider_service_geography_observation_geography_type_check;
alter table move_v2.provider_service_geography_observation add constraint provider_service_geography_type_check check(geography_type in('STATE','COUNTY','CITY','PLACE','ZIP','REGION','NAMED_SERVICE_AREA')) not valid;
alter table move_v2.provider_service_geography_observation add constraint provider_service_claim_type_check check(claim_type in('EXHAUSTIVE_EXPLICIT_AREA','POSITIVE_EXPLICIT_AREA','EXPLICIT_EXCLUSION','EXAMPLE_LOCATION_MENTION','VAGUE_REGION','SERVICE_AREA_REVIEW')) not valid;
alter table move_v2.provider_service_geography_observation add constraint provider_service_claim_flags_check check((claim_type='EXHAUSTIVE_EXPLICIT_AREA')=is_exhaustive and (claim_type='EXPLICIT_EXCLUSION')=is_exclusion) not valid;

create table if not exists move_v2.illinois_authority_observation(
  illinois_authority_observation_id uuid primary key default gen_random_uuid(),
  state_authority_source_record_id uuid not null references move_v2.state_authority_source_record,
  ilcc_number text not null, entity_id text not null, usdot text, household_goods_status_exact text not null,
  authority_date date, complaint_observation jsonb, warehousing_observation jsonb,
  observed_at timestamptz not null, source_url text not null,
  unique(state_authority_source_record_id,observed_at)
);
create table if not exists move_v2.illinois_annual_move_observation(
  state_authority_source_record_id uuid not null references move_v2.state_authority_source_record,
  report_year integer not null check(report_year between 1900 and 2200), reported_move_count integer not null check(reported_move_count>=0),
  source_url text not null, observed_at timestamptz not null,
  primary key(state_authority_source_record_id,report_year,observed_at)
);
create table if not exists move_v2.illinois_insurance_observation(
  state_authority_source_record_id uuid not null references move_v2.state_authority_source_record,
  authority_name text not null, insurance_group text not null, insurance_required boolean not null,
  insurance_on_file_not_cancelled boolean not null, interpretation text not null default 'REGULATORY_EVIDENCE_NOT_SAFETY_ENDORSEMENT',
  source_url text not null, observed_at timestamptz not null,
  primary key(state_authority_source_record_id,authority_name,insurance_group,observed_at)
);

create table if not exists move_v2.census_place_geometry(
  place_geoid text primary key, state_fips text not null, place_name text not null,
  geography_source_release_id uuid not null references move_v2.geography_source_release,
  geometry jsonb not null, centroid_lat numeric, centroid_lon numeric,
  source_vintage text not null, source_hash text not null
);
create index if not exists census_place_name_idx on move_v2.census_place_geometry(state_fips,upper(place_name));

create table if not exists move_v2.derived_model_activation_policy(
  policy_version text primary key, model_version text not null, thresholds jsonb not null,
  rationale text not null, created_at timestamptz not null
);
create table if not exists move_v2.derived_model_activation_evaluation(
  policy_version text not null references move_v2.derived_model_activation_policy,
  model_version text not null, evidence_snapshot jsonb not null, passed boolean not null,
  failure_codes text[] not null, evaluated_at timestamptz not null,
  primary key(policy_version,model_version,evaluated_at)
);
insert into move_v2.derived_model_activation_policy(policy_version,model_version,thresholds,rationale,created_at)
values('MOVE_DERIVED_ACTIVATION_2026_08_V1','MOVE_LOCAL_DERIVED_2026_08_V1',
 '{"positiveProviders":40,"exhaustiveProviders":20,"knownPositiveRecall":0.85,"maxExclusionViolationRate":0.05,"maxExhaustiveOvercoverage":0.35,"minimumUrbanProviders":10,"minimumRuralProviders":5,"minimumFleetBands":3,"manualQaRequired":true}',
 'Requires useful positive sensitivity plus bounded negative evidence across operating contexts; thresholds are demanding but allow ordinary classification and sampling error.',now())
on conflict(policy_version) do nothing;

create or replace view move_v2.origin_search_placement_contract as
select o.*,case when placement_reason like 'TRUSTHUB_DERIVED%' then 'EXPERIMENTAL_DERIVED' else 'EXPLICIT' end placement_class
from move_v2.origin_search_placement o;

alter table move_v2.illinois_authority_observation enable row level security;
alter table move_v2.illinois_annual_move_observation enable row level security;
alter table move_v2.illinois_insurance_observation enable row level security;
alter table move_v2.census_place_geometry enable row level security;
alter table move_v2.derived_model_activation_policy enable row level security;
alter table move_v2.derived_model_activation_evaluation enable row level security;
revoke all on move_v2.illinois_authority_observation,move_v2.illinois_annual_move_observation,move_v2.illinois_insurance_observation,move_v2.census_place_geometry,move_v2.derived_model_activation_policy,move_v2.derived_model_activation_evaluation from anon,authenticated;
revoke all on move_v2.origin_search_placement_contract from anon,authenticated;
