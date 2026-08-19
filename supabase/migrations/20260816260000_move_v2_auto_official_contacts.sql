-- Preserve observed official Company Census contact/address evidence for auto providers.
alter table move_v2.fmcsa_auto_provider_fact
  add column if not exists email text,
  add column if not exists physical_address jsonb,
  add column if not exists mailing_address jsonb;
