import type { EmailOtpType } from '@supabase/supabase-js';

const OTP_TYPE_ALLOW = new Set<string>([
  'signup',
  'invite',
  'magiclink',
  'recovery',
  'email_change',
  'email',
]);

export function isEmailOtpType(value: string): value is EmailOtpType {
  return OTP_TYPE_ALLOW.has(value);
}
