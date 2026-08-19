-- Task 004B: preserve all public state-regulator observations without changing FMCSA facts.
alter table move_v2.state_authority_source_record add column if not exists email text;
alter table move_v2.state_authority_source_record add column if not exists website text;
alter table move_v2.state_authority_source_record add column if not exists relationship_observations jsonb not null default '[]'::jsonb;

create table if not exists move_v2.state_authority_contact_observation (
  state_authority_contact_observation_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id),
  state_authority_source_record_id uuid not null references move_v2.state_authority_source_record(state_authority_source_record_id),
  contact_type text not null check(contact_type in ('PHONE','EMAIL','WEBSITE','ADDRESS')),
  value text not null, normalized_value text not null, source_term text not null,
  observed_at timestamptz not null, unique(state_authority_source_record_id,contact_type,normalized_value)
);
create index if not exists state_contact_provider_idx on move_v2.state_authority_contact_observation(provider_id,contact_type);
alter table move_v2.state_authority_contact_observation enable row level security;
revoke all on move_v2.state_authority_contact_observation from anon,authenticated;
