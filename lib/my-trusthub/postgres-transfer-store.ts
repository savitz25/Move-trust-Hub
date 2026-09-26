import { createHash } from 'node:crypto';
import type { TransferRecord, TransferStore } from './profile-save-adapter';
import { isGuestStageInput, manifestDigest } from './vendor/v2-3-profile-transfer';

export interface SourceConnection {
  query<T = Record<string, unknown>>(sql: string, values?: unknown[]): Promise<{ rows: T[]; rowCount?: number | null }>;
  release(destroy?: boolean): void;
}
export interface SourcePool { connect(): Promise<SourceConnection> }
const digest = (s: string) => createHash('sha256').update(s).digest('hex');
const opaque = (s: unknown): s is string => typeof s === 'string' && /^[A-Za-z0-9_-]{43}$/.test(s);
const hash = (s: unknown): s is string => typeof s === 'string' && /^[a-f0-9]{64}$/.test(s);
const keys = (v: object, allowed: string[]) => Object.keys(v).every(k => allowed.includes(k));
export const SOURCE_RETENTION_MS = 24 * 60 * 60_000;

/** Closed server record: no arbitrary notes, tools, parent subject or Saved ID. */
export function validTransferRecord(v: unknown): v is TransferRecord {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  const r = v as TransferRecord;
  return keys(r, ['browserHash','manifest','bindings','parentStage','continuationRef','requestPrefix','expiresAt','accountContextRef','projectRef']) &&
    hash(r.browserHash) && isGuestStageInput(r.manifest) && r.manifest.sourceHub === 'move' &&
    Array.isArray(r.bindings) && r.bindings.length === r.manifest.selected.length && r.bindings.every(b =>
      !!b && keys(b, ['id','networkEntityId','status']) && typeof b.id === 'string' && typeof b.networkEntityId === 'string' && b.status === 'accepted') &&
    !!r.parentStage && keys(r.parentStage, ['transferRef','manifestDigest','expiresAt']) &&
    opaque(r.parentStage.transferRef) && r.parentStage.manifestDigest === manifestDigest(r.manifest) &&
    Number.isFinite(r.expiresAt) && Number.isFinite(r.parentStage.expiresAt) && r.expiresAt <= r.parentStage.expiresAt &&
    opaque(r.continuationRef) && opaque(r.requestPrefix) &&
    (r.accountContextRef === undefined || opaque(r.accountContextRef)) &&
    (r.projectRef === undefined || (opaque(r.projectRef) && opaque(r.accountContextRef))) &&
    Buffer.byteLength(JSON.stringify(r), 'utf8') <= 131072;
}

/** Dedicated/session-affine connection is mandatory; NOT transaction pooling.
 * A nonblocking session advisory lock serializes a ticket across short committed
 * checkpoints. No DB transaction remains open over parent HTTP calls. Do not
 * automatically retry work: it can include a parent commit already made durable.
 */
export class PostgresTransferStore implements TransferStore {
  constructor(private readonly pool: SourcePool, affinity: 'dedicated', private readonly now = Date.now) {
    if (affinity !== 'dedicated') throw Error('source_session_affinity_required');
  }
  async putIfAbsent(ticketHash: string, record: TransferRecord): Promise<void> {
    if (!hash(ticketHash) || !validTransferRecord(record) || record.expiresAt <= this.now() || record.expiresAt > this.now() + 600000)
      throw Error('invalid_source_record');
    const db = await this.pool.connect();
    try {
      await db.query(`insert into mth_profile_transfer.stages
        (ticket_hash,browser_hash,continuation_hash,record,expires_at,receipt_retry_until)
        values($1,$2,$3,$4,to_timestamp($5/1000.0),to_timestamp($6/1000.0))`,
      [ticketHash, record.browserHash, digest(record.continuationRef), JSON.stringify(record), record.expiresAt, this.now() + SOURCE_RETENTION_MS]);
    } finally { db.release(); }
  }
  async withRecord<T>(ticketHash: string, work: (record: TransferRecord | null, checkpoint: () => Promise<void>) => Promise<T>): Promise<T> {
    if (!hash(ticketHash)) throw Error('invalid_source_ticket');
    const db = await this.pool.connect();
    let locked = false, destroy = false;
    const lockKey = `move-v23:${ticketHash}`;
    try {
      const lock = await db.query<{ locked: boolean }>('select pg_try_advisory_lock(hashtextextended($1,0)) as locked', [lockKey]);
      if (!lock.rows[0]?.locked) throw Error('source_busy_retry');
      locked = true;
      const rows = await db.query<{ record: TransferRecord }>(`select record from mth_profile_transfer.stages
        where ticket_hash=$1 and receipt_retry_until>clock_timestamp()`, [ticketHash]);
      const record = rows.rows[0]?.record ?? null;
      if (record && !validTransferRecord(record)) throw Error('invalid_source_record');
      const checkpoint = async () => {
        if (!record) return;
        if (!validTransferRecord(record)) throw Error('invalid_source_record');
        const result = await db.query(`update mth_profile_transfer.stages set record=$2
          where ticket_hash=$1 and receipt_retry_until>clock_timestamp() returning ticket_hash`, [ticketHash, JSON.stringify(record)]);
        if (!result.rows.length) throw Error('source_expired');
      };
      const result = await work(record, checkpoint);
      await checkpoint();
      return result;
    } finally {
      if (locked) {
        try { await db.query('select pg_advisory_unlock(hashtextextended($1,0))', [lockKey]); }
        catch { destroy = true; }
      }
      db.release(destroy);
    }
  }
  /** Called only by the independently authenticated parent source-channel port. */
  async withContinuation<T>(continuation: string, work: (record: TransferRecord | null, checkpoint: () => Promise<void>) => Promise<T>): Promise<T> {
    if (!opaque(continuation)) throw Error('invalid_continuation');
    const db = await this.pool.connect();
    let key: string | undefined;
    try {
      const rows = await db.query<{ ticket_hash: string }>(`select ticket_hash from mth_profile_transfer.stages
        where continuation_hash=$1 and receipt_retry_until>clock_timestamp()`, [digest(continuation)]);
      key = rows.rows[0]?.ticket_hash;
    } finally { db.release(); }
    return key ? this.withRecord(key, work) : work(null, async () => {});
  }
  async allowRate(bucket: string): Promise<boolean> {
    const db = await this.pool.connect();
    try {
      const r = await db.query<{ count: number }>(`insert into mth_profile_transfer.quota(bucket,minute,count)
        values($1,floor(extract(epoch from clock_timestamp())/60)::bigint,1)
        on conflict(bucket) do update set minute=excluded.minute,
        count=case when quota.minute=excluded.minute then quota.count+1 else 1 end returning count`, [digest(bucket)]);
      return Number(r.rows[0]?.count) <= 30;
    } finally { db.release(); }
  }
  /** One SQL statement, shared by all instances. No read-then-write replay race. */
  async claim(key: string, expiresAt: number): Promise<boolean> {
    if (!hash(key) || !Number.isFinite(expiresAt) || expiresAt <= this.now() || expiresAt > this.now() + 34000) return false;
    const db = await this.pool.connect();
    try {
      const result = await db.query(`insert into mth_profile_transfer.nonces(key_hash,expires_at)
        values($1,to_timestamp($2/1000.0)) on conflict(key_hash) do nothing returning key_hash`, [key, expiresAt]);
      return result.rows.length === 1;
    } finally { db.release(); }
  }
  async registerBrowser(browser: string): Promise<void> {
    if (!opaque(browser)) throw Error('invalid_browser');
    const db = await this.pool.connect();
    try { await db.query(`insert into mth_profile_transfer.browsers(browser_hash,expires_at)
      values($1,clock_timestamp()+interval '1 day') on conflict(browser_hash) do nothing`, [digest(browser)]); }
    finally { db.release(); }
  }
  async knownBrowser(browser: string): Promise<boolean> {
    if (!opaque(browser)) return false;
    const db = await this.pool.connect();
    try { return (await db.query(`select browser_hash from mth_profile_transfer.browsers
      where browser_hash=$1 and expires_at>clock_timestamp()`, [digest(browser)])).rows.length === 1; }
    finally { db.release(); }
  }
  /** Bounded opportunistic cleanup on every BFF request; no request-controlled SQL. */
  async cleanup(limit = 100): Promise<void> {
    if (!Number.isInteger(limit) || limit < 1 || limit > 500) throw Error('invalid_cleanup_limit');
    const db = await this.pool.connect();
    try {
      await db.query(`delete from mth_profile_transfer.stages where ticket_hash in
        (select ticket_hash from mth_profile_transfer.stages where receipt_retry_until<clock_timestamp()
        order by receipt_retry_until limit $1)`, [limit]);
      await db.query(`delete from mth_profile_transfer.quota where bucket in
        (select bucket from mth_profile_transfer.quota where minute<floor(extract(epoch from clock_timestamp())/60)-1440
        order by minute limit $1)`, [limit]);
      await db.query(`delete from mth_profile_transfer.nonces where key_hash in
        (select key_hash from mth_profile_transfer.nonces where expires_at<clock_timestamp()
        order by expires_at limit $1)`, [limit]);
      await db.query(`delete from mth_profile_transfer.browsers where browser_hash in
        (select browser_hash from mth_profile_transfer.browsers where expires_at<clock_timestamp()
        order by expires_at limit $1)`, [limit]);
    } finally { db.release(); }
  }
}
