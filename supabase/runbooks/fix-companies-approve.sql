-- =====================================================
-- Run AFTER 20260708140000_ensure_companies_directory.sql
-- if Approve still says "public.companies" / "schema cache"
--
-- Supabase → SQL Editor → paste → Run
-- Then: Project Settings → API → Reload schema
-- =====================================================

notify pgrst, 'reload schema';