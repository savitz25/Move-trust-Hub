import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import {
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from '@/lib/supabase/config';
import type { Database } from '@/types/supabase';
import type { CarrierNumberType } from '@/lib/verify-dot/schema';
import { logger } from '@/lib/logging/logger';

export async function logDotVerification(params: {
  dotNumber: string;
  numberType: CarrierNumberType;
  sourcePage?: string | null;
  userIp?: string | null;
}): Promise<{ logged: boolean }> {
  const row = {
    dot_number: params.dotNumber,
    number_type: params.numberType,
    source_page: params.sourcePage ?? '/verify-dot',
    user_ip: params.userIp ?? null,
  };

  if (isSupabaseAdminConfigured()) {
    try {
      const admin = createAdminClient();
      const { error } = await admin.from('dot_verifications').insert(row);
      if (!error) {
        logger.info('dot.verification_logged', {
          numberType: params.numberType,
          source: row.source_page,
        });
        return { logged: true };
      }
      logger.warn('dot.verification_log_failed', { message: error.message });
    } catch (err) {
      logger.warn('dot.verification_log_exception', {
        message: err instanceof Error ? err.message : 'unknown',
      });
    }
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase: SupabaseClient<Database> = await createClient();
      const { error } = await supabase.from('dot_verifications').insert(row);
      if (!error) {
        logger.info('dot.verification_logged', { path: 'anon', ...row });
        return { logged: true };
      }
      logger.warn('dot.verification_log_failed', { message: error.message });
    } catch (err) {
      logger.warn('dot.verification_log_exception', {
        message: err instanceof Error ? err.message : 'unknown',
      });
    }
  }

  return { logged: false };
}