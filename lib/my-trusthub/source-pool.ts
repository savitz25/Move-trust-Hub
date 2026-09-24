import 'server-only';
import { Pool } from 'pg';
import type { SourceConnection, SourcePool } from './postgres-transfer-store';
import { containsForbiddenMoveTarget } from './reviewed-origins';

export const SOURCE_LOGIN='mth_move_v23_preview', SOURCE_CAPABILITY='mth_move_profile_transfer',
  SOURCE_SEARCH_PATH='pg_catalog, mth_profile_transfer';
type InnerClient = { query(sql: string, values?: unknown[]): Promise<{ rows: any[]; rowCount?: number | null }>; release(destroy?: boolean): void };
type InnerPool = { connect(): Promise<InnerClient>; end(): Promise<void> };

/** Checkout wrapper for the NOINHERIT login. The login has no My TrustHub rights
 * of its own. A source connection is never exposed until capability-role identity
 * is proven: search_path, then SET ROLE, then session_user/current_user/search_path.
 * Any failure destroys the client and throws. release() always destroys the
 * physical client (no async RESET ROLE), so a pooled backend is never reused. */
export function bindSourceCapability(inner: InnerPool): SourcePool & { end(): Promise<void> } {
  return {
    async connect(): Promise<SourceConnection> {
      const client=await inner.connect();
      try {
        await client.query(`select set_config('search_path', $1, false)`, [SOURCE_SEARCH_PATH]);
        await client.query(`SET ROLE ${SOURCE_CAPABILITY}`);
        const who=(await client.query(`select session_user as login, current_user as active_role,
          current_setting('search_path') as search_path`)).rows[0];
        if(who?.login!==SOURCE_LOGIN || who.active_role!==SOURCE_CAPABILITY || who.search_path!==SOURCE_SEARCH_PATH)
          throw Error('source_role_binding_failed');
      } catch (error) {
        client.release(true);
        throw error;
      }
      let released=false;
      return { query:(sql,values)=>client.query(sql,values),
        release:()=>{ if(!released){ released=true; client.release(true); } } };
    },
    end:()=>inner.end(),
  };
}

export type IsolatedPoolConfig = {
  connectionString: string;
  ssl: { ca: string; rejectUnauthorized: true };
  max: 2;
  connectionTimeoutMillis: 5000;
  idleTimeoutMillis: 10000;
  query_timeout: 5000;
  statement_timeout: 5000;
  lock_timeout: 3000;
};

/** Lazy isolated-only pool. No .env loading, production fallback, or fixture store.
 * The only accepted login is mth_move_v23_preview. Each checkout goes through
 * bindSourceCapability before any application statement. Dedicated session
 * affinity only; this pool is not usable with a transaction pooler. */
export function createIsolatedSourcePool(env: Record<string,string|undefined>, approved: {
  sourceBackend: string; databaseHost: string; databaseName: string; databaseUser: string; sessionAffinity: 'dedicated';
}, createPool: (config: IsolatedPoolConfig) => InnerPool = (config) => new Pool(config)): (SourcePool & { end(): Promise<void> }) | null {
  if (env.VERCEL_ENV==='production' || env.NODE_ENV==='production' && env.VERCEL_ENV!=='preview' || env.MTH_MOVE_PARENT_SAVE_MODE!=='isolated' ||
      env.MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED!=='true' || approved.sessionAffinity!=='dedicated' ||
      !approved.sourceBackend || env.MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND!==approved.sourceBackend ||
      approved.databaseUser!==SOURCE_LOGIN || containsForbiddenMoveTarget(approved.sourceBackend)) return null;
  try {
    const raw=env.MTH_MOVE_PARENT_SAVE_DATABASE_URL,ca=env.MTH_MOVE_PARENT_SAVE_DATABASE_CA;
    if(!raw || !ca) return null;
    const url=new URL(raw);
    if(!['postgres:','postgresql:'].includes(url.protocol) || url.search || url.hash ||
      url.hostname!==approved.databaseHost || decodeURIComponent(url.pathname.slice(1))!==approved.databaseName ||
      decodeURIComponent(url.username)!==approved.databaseUser ||
      /^(postgres|service_role|supabase_admin)$/.test(approved.databaseUser) ||
      containsForbiddenMoveTarget(raw)) return null;
    return bindSourceCapability(createPool({connectionString:raw,ssl:{ca,rejectUnauthorized:true},max:2,
      connectionTimeoutMillis:5000,idleTimeoutMillis:10000,query_timeout:5000,statement_timeout:5000,lock_timeout:3000}));
  } catch { return null; }
}
