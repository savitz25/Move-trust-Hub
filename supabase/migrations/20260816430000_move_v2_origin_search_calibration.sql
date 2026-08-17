-- Task 006: additive explicit-geography calibration and bounded origin-search read model.
create table if not exists move_v2.google_identity_decision_history (
  decision_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider,
  place_id text, decision_status text not null, score integer, reason_codes text[] not null default '{}',
  conflict_codes text[] not null default '{}', rule_version text not null, query_variant text,
  acquisition_method text not null, decided_at timestamptz not null,
  unique nulls not distinct(provider_id,place_id,rule_version,query_variant)
);
create table if not exists move_v2.provider_service_geography_observation (
  service_geography_observation_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider,
  raw_claim text not null, geography_type text not null check(geography_type in ('STATE','COUNTY','CITY','ZIP','REGION','NAMED_SERVICE_AREA')),
  normalized_label text, normalized_geoid text, normalization_reason text not null,
  is_exclusion boolean not null default false, source_url text not null, source_observed_at timestamptz not null,
  confidence numeric not null, rule_version text not null,
  unique nulls not distinct(provider_id,raw_claim,geography_type,normalized_geoid,is_exclusion,source_url)
);
create table if not exists move_v2.zcta_geometry (
  zcta text primary key, geography_source_release_id uuid not null references move_v2.geography_source_release,
  geometry jsonb not null, land_area_sq_m numeric, centroid_lat numeric, centroid_lon numeric
);
create table if not exists move_v2.zcta_county_relationship (
  zcta text not null references move_v2.zcta_geometry, county_geoid text not null references move_v2.county_geometry,
  state text not null, relationship_type text not null check(relationship_type in ('PRIMARY','CROSS_COUNTY')),
  estimated_overlap numeric not null, rule_version text not null, primary key(zcta,county_geoid,rule_version)
);
create table if not exists move_v2.postal_zip_resolution (
  postal_zip text primary key, zcta text references move_v2.zcta_geometry, status text not null check(status in ('GEOGRAPHIC_ZCTA','UNSUPPORTED_NON_GEOGRAPHIC','REVIEW')),
  state text, primary_county_geoid text references move_v2.county_geometry, rule_version text not null,
  explanation text not null, resolved_at timestamptz not null
);
create table if not exists move_v2.origin_search_release (
  origin_search_release_id uuid primary key default gen_random_uuid(), model_version text not null,
  geography_vintage text not null, input_fingerprint text not null unique, status text not null,
  created_at timestamptz not null, published_at timestamptz
);
create table if not exists move_v2.origin_search_placement (
  origin_search_placement_id uuid primary key default gen_random_uuid(), origin_search_release_id uuid not null references move_v2.origin_search_release,
  provider_id uuid not null references move_v2.provider, state text not null, county_geoid text not null references move_v2.county_geometry,
  zcta text references move_v2.zcta_geometry, evidence_tier integer not null, placement_reason text not null,
  evidence_reference jsonb not null, distance_miles numeric, active boolean not null default true,
  created_at timestamptz not null, invalidated_at timestamptz,
  unique nulls not distinct(origin_search_release_id,provider_id,county_geoid,zcta,placement_reason)
);
create index if not exists google_decision_provider_idx on move_v2.google_identity_decision_history(provider_id,decided_at desc);
create index if not exists service_geography_provider_idx on move_v2.provider_service_geography_observation(provider_id,geography_type,is_exclusion);
create index if not exists zcta_county_lookup_idx on move_v2.zcta_county_relationship(zcta,state,relationship_type);
create index if not exists origin_county_active_idx on move_v2.origin_search_placement(state,county_geoid,evidence_tier,provider_id) where active and invalidated_at is null;
create index if not exists origin_zip_active_idx on move_v2.origin_search_placement(zcta,evidence_tier,provider_id) where active and invalidated_at is null;
create index if not exists origin_provider_active_idx on move_v2.origin_search_placement(provider_id,placement_reason) where active and invalidated_at is null;

alter table move_v2.google_identity_decision_history enable row level security;
alter table move_v2.provider_service_geography_observation enable row level security;
alter table move_v2.zcta_geometry enable row level security;
alter table move_v2.zcta_county_relationship enable row level security;
alter table move_v2.postal_zip_resolution enable row level security;
alter table move_v2.origin_search_release enable row level security;
alter table move_v2.origin_search_placement enable row level security;
revoke all on move_v2.google_identity_decision_history,move_v2.provider_service_geography_observation,
 move_v2.zcta_geometry,move_v2.zcta_county_relationship,move_v2.postal_zip_resolution,
 move_v2.origin_search_release,move_v2.origin_search_placement from anon,authenticated;
