create table if not exists move_v2.fmcsa_auto_provider_fact (
  provider_id uuid primary key references move_v2.provider(provider_id),
  source_release_id uuid not null references move_v2.fmcsa_source_release(source_release_id),
  usdot text not null unique, legal_name text not null, dba_name text, display_name text not null,
  usdot_status text, carrier_operation text, state text, city text, phone text,
  power_units integer, drivers integer, motor_vehicle_cargo_reported boolean not null,
  published_at timestamptz not null default now()
);
create table if not exists move_v2.provider_service_role (
  provider_id uuid not null references move_v2.provider(provider_id),
  vertical text not null check(vertical in ('HHG','AUTO_TRANSPORT')),
  relevance text not null, classification text not null,
  rule_version text not null, reason_codes text[] not null, conflicts text[] not null default '{}',
  supporting_source_keys text[] not null default '{}', source_release_ids uuid[] not null,
  classified_at timestamptz not null default now(), superseded_at timestamptz,
  primary key(provider_id,vertical,rule_version)
);
create unique index if not exists provider_service_role_current on move_v2.provider_service_role(provider_id,vertical) where superseded_at is null;
create index if not exists provider_service_role_class_idx on move_v2.provider_service_role(vertical,classification,provider_id) where superseded_at is null;
create index if not exists fmcsa_auto_state_provider_idx on move_v2.fmcsa_auto_provider_fact(state,provider_id);
create or replace view move_v2.auto_transport_read_model as
select f.*,r.relevance,r.classification,r.reason_codes,r.conflicts,r.supporting_source_keys,s.source_data_updated_at,s.retrieved_at
from move_v2.fmcsa_auto_provider_fact f join move_v2.provider_service_role r using(provider_id)
join move_v2.fmcsa_source_release s on s.source_release_id=f.source_release_id
where r.vertical='AUTO_TRANSPORT' and r.superseded_at is null and s.ingestion_status='PUBLISHED';
alter table move_v2.fmcsa_auto_provider_fact enable row level security;
alter table move_v2.provider_service_role enable row level security;
revoke all on move_v2.fmcsa_auto_provider_fact,move_v2.provider_service_role,move_v2.auto_transport_read_model from anon,authenticated;
