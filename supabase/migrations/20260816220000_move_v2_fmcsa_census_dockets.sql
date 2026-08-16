create table if not exists move_v2.fmcsa_docket_identifier (
  provider_id uuid not null references move_v2.provider(provider_id),
  source_release_id uuid not null references move_v2.fmcsa_source_release(source_release_id),
  usdot text not null, docket_prefix text not null check(docket_prefix in ('MC','MX','FF')),
  docket_number text not null, official_value text not null, status_code text,
  primary key(source_release_id,provider_id,docket_prefix,docket_number)
);
create index if not exists fmcsa_docket_exact_idx on move_v2.fmcsa_docket_identifier(docket_prefix,docket_number);
alter table move_v2.fmcsa_docket_identifier enable row level security;
revoke all on move_v2.fmcsa_docket_identifier from anon, authenticated;
