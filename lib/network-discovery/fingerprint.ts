import { createHash } from 'node:crypto';
import type { NetworkDiscoveryEntity } from './types';

/** Content fingerprint excluding volatile timestamps. */
export function contentFingerprint(entities: NetworkDiscoveryEntity[]): string {
  const normalized = entities.map((e) => {
    const { updated_at: _u, ...rest } = e;
    return rest;
  });
  const payload = JSON.stringify(normalized);
  return createHash('sha256').update(payload).digest('hex');
}
