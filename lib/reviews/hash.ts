import 'server-only';

import { createHash } from 'crypto';

function salt(): string {
  return process.env.REVIEW_EMAIL_SALT?.trim() || 'mth-review-default-salt-change-me';
}

export function hashEmail(email: string): string {
  return createHash('sha256')
    .update(`${salt()}:${email.trim().toLowerCase()}`)
    .digest('hex');
}

export function hashIp(ip: string): string {
  return createHash('sha256')
    .update(`${salt()}:ip:${ip.trim()}`)
    .digest('hex');
}