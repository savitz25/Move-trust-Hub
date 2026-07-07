-- Run this if Approve fails with "schema cache" or publish RPC is missing.
-- Requires 20260708140000_ensure_companies_directory.sql already applied.
--
-- 1) Paste supabase/migrations/20260709140000_publish_directory_company_rpc.sql
-- 2) Then run the line below
-- 3) Supabase → Settings → API → Reload schema

notify pgrst, 'reload schema';