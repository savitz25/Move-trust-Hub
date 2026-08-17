-- Task 008: versioned, evidence-first consumer discovery contract. No data publication in this migration.
create table if not exists move_v2.consumer_discovery_release(
 consumer_discovery_release_id uuid primary key default gen_random_uuid(), version text not null,
 input_fingerprint text not null unique, supported_states text[] not null,
 origin_point_method text not null, status text not null, created_at timestamptz not null
);
create table if not exists move_v2.consumer_discovery_candidate(
 consumer_discovery_release_id uuid not null references move_v2.consumer_discovery_release,
 provider_id uuid not null references move_v2.provider, state text not null check(state in('FL','WA')),
 eligibility text not null check(eligibility='STATE_VERIFIED_LOCAL_MOVER'), location_status text not null check(location_status in('VERIFIED','LOCATION_REVIEW','NOT_RESOLVED')),
 latitude numeric, longitude numeric, location_evidence jsonb not null, explicit_evidence jsonb not null default '[]',
 primary key(consumer_discovery_release_id,provider_id),
 check((location_status='VERIFIED')=(latitude is not null and longitude is not null))
);
create index if not exists consumer_discovery_state_idx on move_v2.consumer_discovery_candidate(consumer_discovery_release_id,state,location_status,provider_id);
alter table move_v2.consumer_discovery_release enable row level security;
alter table move_v2.consumer_discovery_candidate enable row level security;
revoke all on move_v2.consumer_discovery_release,move_v2.consumer_discovery_candidate from anon,authenticated;
comment on table move_v2.consumer_discovery_candidate is 'Proximity is discovery metadata only and never provider service-area evidence.';
