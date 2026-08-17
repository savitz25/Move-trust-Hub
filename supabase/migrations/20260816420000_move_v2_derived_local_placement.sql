-- Task 005: Washington state adapter and versioned fallback-only derived placement.
alter table move_v2.state_source_release drop constraint if exists state_source_release_state_check;
alter table move_v2.state_source_release add constraint state_source_release_state_check check(state in ('NJ','FL','WA'));

create table if not exists move_v2.state_provider_identifier (
  state_provider_identifier_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  state_authority_source_record_id uuid not null references move_v2.state_authority_source_record(state_authority_source_record_id),
  state text not null, identifier_type text not null, identifier_value text not null,
  observed_at timestamptz not null, unique(state_authority_source_record_id,identifier_type,identifier_value)
);

create table if not exists move_v2.geography_source_release (
  geography_source_release_id uuid primary key default gen_random_uuid(), source_name text not null,
  source_url text not null, vintage text not null, retrieved_at timestamptz not null,
  sha256 text not null, feature_count integer not null, unique(source_url,sha256)
);
create table if not exists move_v2.county_geometry (
  county_geoid text primary key, geography_source_release_id uuid not null references move_v2.geography_source_release,
  state text not null, county_name text not null, geometry jsonb not null, land_area_sq_m numeric,
  centroid_lat numeric, centroid_lon numeric
);
create table if not exists move_v2.derived_area_model (
  model_version text primary key, formula text not null, minimum_radius_miles numeric not null,
  maximum_radius_miles numeric not null, meaningful_county_overlap numeric not null,
  input_contract jsonb not null, created_at timestamptz not null, superseded_at timestamptz
);
create table if not exists move_v2.provider_derived_area (
  provider_derived_area_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  model_version text not null references move_v2.derived_area_model(model_version), state text not null,
  center_lat numeric not null, center_lon numeric not null, radius_miles numeric not null,
  input_snapshot jsonb not null, reason_code text not null, created_at timestamptz not null,
  superseded_at timestamptz, unique(provider_id,model_version,created_at)
);
create unique index if not exists provider_active_derived_area_idx on move_v2.provider_derived_area(provider_id) where superseded_at is null;
create table if not exists move_v2.provider_county_placement (
  provider_county_placement_id uuid primary key default gen_random_uuid(), provider_derived_area_id uuid not null references move_v2.provider_derived_area,
  provider_id uuid not null references move_v2.provider(provider_id), state text not null, county_geoid text not null references move_v2.county_geometry,
  placement_type text not null check(placement_type in ('HOME_COUNTY','DERIVED_MEANINGFUL_COVERAGE','DERIVED_EDGE_INTERSECTION')),
  estimated_overlap numeric not null, active boolean not null default true, reason_code text not null,
  created_at timestamptz not null, superseded_at timestamptz, unique(provider_derived_area_id,county_geoid)
);
create index if not exists county_active_provider_idx on move_v2.provider_county_placement(state,county_geoid,provider_id) where active and superseded_at is null;
create index if not exists county_provider_type_idx on move_v2.provider_county_placement(provider_id,placement_type) where active and superseded_at is null;
create table if not exists move_v2.derived_area_calibration_result (
  calibration_result_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  model_version text not null references move_v2.derived_area_model(model_version), mode text not null check(mode in ('SHADOW','PUBLISHED')),
  explicit_area_count integer not null, metrics jsonb not null, evaluated_at timestamptz not null,
  unique(provider_id,model_version,mode)
);

alter table move_v2.state_provider_identifier enable row level security;
alter table move_v2.geography_source_release enable row level security;
alter table move_v2.county_geometry enable row level security;
alter table move_v2.derived_area_model enable row level security;
alter table move_v2.provider_derived_area enable row level security;
alter table move_v2.provider_county_placement enable row level security;
alter table move_v2.derived_area_calibration_result enable row level security;
revoke all on move_v2.state_provider_identifier,move_v2.geography_source_release,move_v2.county_geometry,
 move_v2.derived_area_model,move_v2.provider_derived_area,move_v2.provider_county_placement,
 move_v2.derived_area_calibration_result from anon,authenticated;
