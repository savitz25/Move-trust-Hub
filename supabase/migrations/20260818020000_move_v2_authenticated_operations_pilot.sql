-- Task 011: server-only operational proof records. Applied only to canonical Move V2 DB.
create table if not exists move_v2.refresh_observation(
 refresh_observation_id uuid primary key default gen_random_uuid(),provider_id uuid references move_v2.provider(provider_id),
 source text not null,source_reference text not null,observed_at timestamptz not null,source_status text not null,
 evidence_fingerprint text not null,observation jsonb not null,job_id uuid references public.move_v2_refresh_job(id),
 created_at timestamptz not null default now(),unique(provider_id,source,evidence_fingerprint)
);
create table if not exists move_v2.operational_action_log(
 operational_action_id uuid primary key default gen_random_uuid(),actor text not null,command text not null,provider_id uuid,
 source text,prior_fingerprint text,new_fingerprint text,review_case_id uuid,decision_id uuid,release_id uuid,
 acted_at timestamptz not null default now(),details jsonb not null default '{}'
);
create table if not exists move_v2.discovery_release_pointer(
 pointer_name text primary key,current_release_id uuid not null references move_v2.consumer_discovery_release(consumer_discovery_release_id),
 prior_release_id uuid references move_v2.consumer_discovery_release(consumer_discovery_release_id),updated_at timestamptz not null,
 operational_action_id uuid references move_v2.operational_action_log(operational_action_id)
);
alter table move_v2.refresh_observation enable row level security;alter table move_v2.operational_action_log enable row level security;alter table move_v2.discovery_release_pointer enable row level security;
revoke all on move_v2.refresh_observation,move_v2.operational_action_log,move_v2.discovery_release_pointer from anon,authenticated;
drop trigger if exists move_v2_refresh_observation_immutable on move_v2.refresh_observation;create trigger move_v2_refresh_observation_immutable before update or delete on move_v2.refresh_observation for each row execute function move_v2_deny_immutable_change();
drop trigger if exists move_v2_operational_log_immutable on move_v2.operational_action_log;create trigger move_v2_operational_log_immutable before update or delete on move_v2.operational_action_log for each row execute function move_v2_deny_immutable_change();
