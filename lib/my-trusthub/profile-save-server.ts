import 'server-only';
import { createPrivateKey, createPublicKey } from 'node:crypto';
import { serverGate } from './config';
import { createIsolatedSourcePool, sourceTarget } from './source-pool';
import { ParentChannel } from './parent-channel';
import { createMoveRuntime, type MoveRuntime } from './runtime';
import { publicPublicationReader } from './exact-publication';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/config';

let runtime: MoveRuntime | undefined;
export function getMoveProfileSaveRuntime(): MoveRuntime | null {
  const env = process.env;
  if (!serverGate(env)) return null;
  if (runtime) return runtime;
  try {
    const kid = env.MY_TRUSTHUB_V23_MOVE_KEY_ID, pem = env.MY_TRUSTHUB_V23_MOVE_SIGNING_PRIVATE_KEY_PEM;
    const askKid = env.MY_TRUSTHUB_V23_ASK_KEY_ID, askPem = env.MY_TRUSTHUB_V23_ASK_VERIFY_PUBLIC_KEY_PEM;
    if (!kid || !pem || !askKid || !askPem || kid === askKid || !/^[A-Za-z0-9_-]{1,80}$/.test(kid) || !/^[A-Za-z0-9_-]{1,80}$/.test(askKid)) return null;
    if (createPrivateKey(pem).asymmetricKeyType !== 'ed25519' || createPublicKey(askPem).asymmetricKeyType !== 'ed25519' ||
      createPublicKey(pem).export({ type: 'spki', format: 'der' }).equals(createPublicKey(askPem).export({ type: 'spki', format: 'der' }))) return null;
    const readPublication = publicPublicationReader(getSupabaseUrl() ?? '', getSupabaseAnonKey() ?? '');
    const pool = createIsolatedSourcePool(env, sourceTarget(env));
    if (!pool) return null;
    runtime = createMoveRuntime({ pool, readPublication, parent: new ParentChannel({ kid, pem }, fetch, env.MTH_MOVE_PARENT_SAVE_PARENT_PROTECTION_BYPASS), askKey: { kid: askKid, pem: askPem } });
    return runtime;
  } catch { return null; }
}
