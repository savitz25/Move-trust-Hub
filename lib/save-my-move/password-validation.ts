/**
 * Client-safe password validation shared with server actions
 * (mirrors Verified Mover Portal rules).
 */
import { scorePasswordStrength } from '@/lib/portal/password-strength';

export function validateMyMovePassword(password: string, confirm: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (password.length > 72) return 'Password must be 72 characters or fewer.';
  if (password !== confirm) return 'Passwords do not match.';
  const strength = scorePasswordStrength(password);
  if (!strength.ok) {
    return 'Choose a stronger password (mix of letters and numbers recommended).';
  }
  return null;
}
