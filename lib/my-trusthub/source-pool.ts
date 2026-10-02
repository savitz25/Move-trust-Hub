import 'server-only';
import { Pool } from 'pg';
import type { SourceConnection, SourcePool } from './postgres-transfer-store';
import { containsForbiddenMoveTarget, ISOLATED_PAIR, PRODUCTION_PAIR, type MovePair } from './reviewed-origins';

export const SOURCE_LOGIN='mth_move_v23_preview', SOURCE_CAPABILITY='mth_move_profile_transfer',
  SOURCE_SEARCH_PATH='pg_catalog, mth_profile_transfer',
  SOURCE_PROJECT_REF='zvoijbohtyuhqfuvteoy',
  SOURCE_POOLER_USER=`${SOURCE_LOGIN}.${SOURCE_PROJECT_REF}`,
  SOURCE_SESSION_PORT='5432';
type InnerClient = { query(sql: string, values?: unknown[]): Promise<{ rows: any[]; rowCount?: number | null }>; release(destroy?: boolean): void };
type InnerPool = { connect(): Promise<InnerClient>; end(): Promise<void> };

/** Checkout wrapper for the NOINHERIT login. The login has no My TrustHub rights
 * of its own. A source connection is never exposed until capability-role identity
 * is proven: search_path, then SET ROLE, then session_user/current_user/search_path.
 * Any failure destroys the client and throws. release() always destroys the
 * physical client (no async RESET ROLE), so a pooled backend is never reused. */
export function bindSourceCapability(inner: InnerPool, login: string = SOURCE_LOGIN): SourcePool & { end(): Promise<void> } {
  return {
    async connect(): Promise<SourceConnection> {
      const client=await inner.connect();
      try {
        await client.query(`select set_config('search_path', $1, false)`, [SOURCE_SEARCH_PATH]);
        await client.query(`SET ROLE ${SOURCE_CAPABILITY}`);
        const who=(await client.query(`select session_user as login, current_user as active_role,
          current_setting('search_path') as search_path`)).rows[0];
        if(who?.login!==login || who.active_role!==SOURCE_CAPABILITY || who.search_path!==SOURCE_SEARCH_PATH)
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

/** Lazy pool for the one deployment pair. No .env loading, cross-pair fallback
 * or fixture store. approved.databaseUser is the logical login for the pair
 * (mth_move_v23_preview or mth_move_v23_prod). The Supavisor session URI
 * username is that role plus the pair's exact project ref. Port 5432 is
 * required; 6543 and an omitted port are rejected because the store holds a
 * session advisory lock. The host comes only from approved metadata. Each
 * checkout goes through bindSourceCapability before any application statement. */
export function createIsolatedSourcePool(env: Record<string,string|undefined>, approved: {
  sourceBackend: string; databaseHost: string; databaseName: string; databaseUser: string; sessionAffinity: 'dedicated';
}, createPool: (config: IsolatedPoolConfig) => InnerPool = (config) => new Pool(config), pair: MovePair = ISOLATED_PAIR): (SourcePool & { end(): Promise<void> }) | null {
  if (approved.sessionAffinity!=='dedicated' || !approved.sourceBackend || env.MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND!==approved.sourceBackend ||
      approved.sourceBackend!==pair.sourceBackend || approved.databaseUser!==pair.login) return null;
  if (pair.kind==='isolated') {
    if (env.VERCEL_ENV==='production' || env.NODE_ENV==='production' && env.VERCEL_ENV!=='preview' || env.MTH_MOVE_PARENT_SAVE_MODE!=='isolated' ||
        env.MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED!=='true' || approved.databaseUser!==SOURCE_LOGIN || containsForbiddenMoveTarget(approved.sourceBackend)) return null;
  } else if (env.VERCEL_ENV!=='production' || env.MTH_MOVE_PARENT_SAVE_MODE!=='production' || env.MTH_MOVE_PARENT_SAVE_PRODUCTION_APPROVED!=='true' ||
      pair!==PRODUCTION_PAIR) return null;
  try {
    const raw=env.MTH_MOVE_PARENT_SAVE_DATABASE_URL,ca=env.MTH_MOVE_PARENT_SAVE_DATABASE_CA;
    if(!raw || !ca) return null;
    const url=new URL(raw);
    const poolerUser=`${pair.login}.${pair.project}`;
    if(!['postgres:','postgresql:'].includes(url.protocol) || url.search || url.hash ||
      url.port!==SOURCE_SESSION_PORT ||
      url.hostname!==approved.databaseHost || decodeURIComponent(url.pathname.slice(1))!==approved.databaseName ||
      decodeURIComponent(url.username)!==poolerUser ||
      /^(postgres|service_role|supabase_admin)$/.test(approved.databaseUser) ||
      (pair.kind==='isolated' && containsForbiddenMoveTarget(raw))) return null;
    // Production: the URL may name only the production project; any other ref is rejected.
    if(pair.kind==='production' && containsForbiddenMoveTarget(raw.replace(pair.project,''))) return null;
    return bindSourceCapability(createPool({connectionString:raw,ssl:{ca,rejectUnauthorized:true},max:2,
      connectionTimeoutMillis:5000,idleTimeoutMillis:10000,query_timeout:5000,statement_timeout:5000,lock_timeout:3000}), pair.login);
  } catch { return null; }
}
