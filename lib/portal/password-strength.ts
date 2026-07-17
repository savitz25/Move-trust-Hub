/** Client-safe password strength scoring (mirrors server rules). */

export function scorePasswordStrength(password: string): {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  ok: boolean;
  percent: number;
} {
  if (!password) {
    return { score: 0, label: 'Enter a password', ok: false, percent: 0 };
  }
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  const clamped = Math.min(4, score) as 0 | 1 | 2 | 3 | 4;
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'] as const;
  return {
    score: clamped,
    label: password.length < 8 ? 'At least 8 characters' : labels[clamped],
    ok: password.length >= 8 && clamped >= 2,
    percent: Math.round((clamped / 4) * 100),
  };
}
