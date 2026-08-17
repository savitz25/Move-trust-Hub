-- Task 009: immutable server discovery releases and evidence-preserving quality decisions.
alter table move_v2.consumer_discovery_release add column if not exists freshness_inputs jsonb not null default '{}';
alter table move_v2.consumer_discovery_release add column if not exists superseded_at timestamptz;
create unique index if not exists consumer_discovery_current_release_idx on move_v2.consumer_discovery_release((status)) where status='CURRENT';
create table if not exists move_v2.provider_location_decision(
 decision_id uuid primary key default gen_random_uuid(),provider_id uuid not null references move_v2.provider,
 release_version text not null,status text not null check(status in('VERIFIED','LOCATION_REVIEW','NOT_RESOLVED')),
 selected_location jsonb,selection_reason text not null,conflict_types text[] not null default '{}',
 source_observations jsonb not null,decision_version text not null,decided_at timestamptz not null,
 unique(provider_id,release_version,decision_version)
);
create table if not exists move_v2.provider_contact_selection(
 provider_id uuid not null references move_v2.provider,release_version text not null,contact_kind text not null,
 selected_value text,selection_reason text not null,all_observations jsonb not null,selected_at timestamptz not null,
 primary key(provider_id,release_version,contact_kind)
);
alter table move_v2.provider_location_decision enable row level security;alter table move_v2.provider_contact_selection enable row level security;
revoke all on move_v2.provider_location_decision,move_v2.provider_contact_selection from anon,authenticated;
comment on table move_v2.provider_location_decision is 'Immutable evidence decision history; prior source observations are retained.';
