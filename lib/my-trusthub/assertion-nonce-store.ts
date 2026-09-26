import type { SourcePool } from './postgres-transfer-store';
import type { NonceStore } from './service-assertion';

/** Durable replay guard. Claim is one INSERT … ON CONFLICT in Postgres.
 * A failed statement denies the request. There is no process-local fallback.
 */
export class PostgresAssertionNonceStore implements NonceStore {
  constructor(private readonly pool: SourcePool) {}
  async claim(key: string, expiresAt: number): Promise<boolean> {
    if (!/^[a-f0-9]{64}$/.test(key) || !Number.isFinite(expiresAt)) return false;
    const db = await this.pool.connect();
    try {
      const result = await db.query<{ claimed: boolean }>(
        'select mth_profile_transfer.claim_assertion_nonce($1, to_timestamp($2/1000.0)) as claimed',
        [key, expiresAt]);
      return result.rows[0]?.claimed === true;
    } finally { db.release(); }
  }
}
