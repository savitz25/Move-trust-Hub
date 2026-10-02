import { createPrivateKey, createPublicKey } from 'node:crypto';
import type { AssertionKey } from './service-assertion';

/** Variable names only. This module never generates, prints, or stores values.
 * MY_TRUSTHUB_V23_MOVE_KEY_ID
 * MY_TRUSTHUB_V23_MOVE_SIGNING_PRIVATE_KEY_PEM
 * MY_TRUSTHUB_V23_ASK_KEY_ID
 * MY_TRUSTHUB_V23_ASK_VERIFY_PUBLIC_KEY_PEM
 * MTH_MOVE_PARENT_SAVE_PARENT_PROTECTION_BYPASS
 * MTH_V23_MOVE_ISOLATED_SOURCE
 * MTH_V23_MOVE_ISOLATED_SOURCE_APPROVED
 */
const KID = /^[A-Za-z0-9_-]{1,64}$/;

function ed25519(pem: string, kind: 'private' | 'public'): boolean {
  try {
    const key = kind === 'private' ? createPrivateKey(pem) : createPublicKey(pem);
    return key.asymmetricKeyType === 'ed25519';
  } catch { return false; }
}

export function moveSigningKey(env: Record<string, string | undefined>): AssertionKey | null {
  const kid = env.MY_TRUSTHUB_V23_MOVE_KEY_ID ?? '';
  const pem = env.MY_TRUSTHUB_V23_MOVE_SIGNING_PRIVATE_KEY_PEM ?? '';
  if (!KID.test(kid) || !pem || !ed25519(pem, 'private')) return null;
  return { kid, pem };
}

export function askVerifyKey(env: Record<string, string | undefined>): AssertionKey | null {
  const kid = env.MY_TRUSTHUB_V23_ASK_KEY_ID ?? '';
  const pem = env.MY_TRUSTHUB_V23_ASK_VERIFY_PUBLIC_KEY_PEM ?? '';
  if (!KID.test(kid) || !pem || !ed25519(pem, 'public')) return null;
  return { kid, pem };
}
