-- Align app ↔ production saved_move_plans.
-- Production (arepfylnilkjmyduhwbz) already uses:
--   label, payload, readiness_score, archived_at, origin_label, destination_label
-- This migration is idempotent for envs that still have the older name/plan/readiness/archived columns.

-- Prefer live schema; add missing live columns if older migration only created name/plan/…
do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'saved_move_plans'
  ) then
    -- Live columns
    alter table public.saved_move_plans
      add column if not exists label text,
      add column if not exists payload jsonb,
      add column if not exists readiness_score integer,
      add column if not exists archived_at timestamptz,
      add column if not exists origin_label text,
      add column if not exists destination_label text;

    -- Backfill from legacy names if present
    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'saved_move_plans' and column_name = 'name'
    ) then
      update public.saved_move_plans
      set label = coalesce(nullif(label, ''), name, 'My Move Plan')
      where label is null or label = '';
    end if;

    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'saved_move_plans' and column_name = 'plan'
    ) then
      update public.saved_move_plans
      set payload = coalesce(payload, plan, '{}'::jsonb)
      where payload is null;
    end if;

    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'saved_move_plans' and column_name = 'readiness'
    ) then
      update public.saved_move_plans
      set readiness_score = coalesce(readiness_score, readiness, 0)
      where readiness_score is null;
    end if;

    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'saved_move_plans' and column_name = 'archived'
    ) then
      update public.saved_move_plans
      set archived_at = coalesce(archived_at, case when archived then now() else null end)
      where archived is true and archived_at is null;
    end if;

    -- Defaults
    alter table public.saved_move_plans
      alter column label set default 'My Move Plan';
    update public.saved_move_plans set label = 'My Move Plan' where label is null;
    update public.saved_move_plans set payload = '{}'::jsonb where payload is null;
    update public.saved_move_plans set readiness_score = 0 where readiness_score is null;

    -- Optional: keep NOT NULL on live fields if all rows filled
    -- alter table public.saved_move_plans alter column label set not null;
    -- alter table public.saved_move_plans alter column payload set not null;
  end if;
end $$;

-- After any schema change in SQL Editor, reload PostgREST:
-- NOTIFY pgrst, 'reload schema';
