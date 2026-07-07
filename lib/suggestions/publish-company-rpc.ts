import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';
import type { CompanyInsertPayload } from '@/lib/suggestions/insert-company';
import { logger } from '@/lib/logging/logger';

export type DirectoryHealth = {
  companies_table_exists?: boolean;
  companies_row_count?: number;
  suggestions_pending?: number;
};

export async function getDirectoryCompanyViaRpc(
  admin: SupabaseClient<Database>,
  slugOrAlias: string
): Promise<Record<string, unknown> | null> {
  const { data, error } = await admin.rpc('mth_get_directory_company', {
    p_key: slugOrAlias.trim(),
  });

  if (error || !data) {
    return null;
  }

  return data as Record<string, unknown>;
}

export type PublishCompanyRpcResult =
  | { ok: true; companyId: string; slug: string; existing: boolean }
  | { ok: false; error: string; code?: string; rpcMissing?: boolean };

function isRpcUnavailable(message?: string | null, code?: string | null): boolean {
  if (!message) return false;
  const lower = message.toLowerCase();
  return (
    code === 'PGRST202' ||
    lower.includes('mth_publish_directory_company') ||
    (lower.includes('function') && lower.includes('schema cache'))
  );
}

export async function fetchDirectoryHealthRpc(
  admin: SupabaseClient<Database>
): Promise<DirectoryHealth | null> {
  const { data, error } = await admin.rpc('mth_directory_health');
  if (error) {
    if (!isRpcUnavailable(error.message, error.code)) {
      logger.warn('directory.health_rpc_failed', {
        code: error.code,
        message: error.message,
      });
    }
    return null;
  }
  return (data as DirectoryHealth | null) ?? null;
}

export async function publishCompanyViaRpc(
  admin: SupabaseClient<Database>,
  row: CompanyInsertPayload
): Promise<PublishCompanyRpcResult> {
  const { data, error } = await admin.rpc('mth_publish_directory_company', {
    payload: row,
  });

  if (error) {
    return {
      ok: false,
      error: error.message,
      code: error.code ?? undefined,
      rpcMissing: isRpcUnavailable(error.message, error.code),
    };
  }

  const result = data as {
    company_id?: string;
    slug?: string;
    existing?: boolean;
  } | null;

  if (!result?.company_id || !result?.slug) {
    return { ok: false, error: 'Publish RPC returned an empty result' };
  }

  return {
    ok: true,
    companyId: result.company_id,
    slug: result.slug,
    existing: Boolean(result.existing),
  };
}