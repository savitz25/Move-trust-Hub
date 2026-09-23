import 'server-only';
import { Pool } from 'pg';
import type { SourcePool } from './postgres-transfer-store';
import { containsForbiddenMoveTarget } from './reviewed-origins';

/** Lazy isolated-only pool; never used until Builder 4 supplies approved target
 * metadata. No .env loading, production fallback, role switch or fixture store. */
export function createIsolatedSourcePool(env: Record<string,string|undefined>, approved: {
  sourceBackend: string; databaseHost: string; databaseName: string; databaseUser: string; sessionAffinity: 'dedicated';
}): (SourcePool & { end(): Promise<void> }) | null {
  if (env.VERCEL_ENV==='production' || env.NODE_ENV==='production' && env.VERCEL_ENV!=='preview' || env.MTH_MOVE_PARENT_SAVE_MODE!=='isolated' ||
      env.MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED!=='true' || approved.sessionAffinity!=='dedicated' ||
      !approved.sourceBackend || env.MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND!==approved.sourceBackend ||
      containsForbiddenMoveTarget(approved.sourceBackend)) return null;
  try {
    const raw=env.MTH_MOVE_PARENT_SAVE_DATABASE_URL,ca=env.MTH_MOVE_PARENT_SAVE_DATABASE_CA;
    if(!raw || !ca) return null;
    const url=new URL(raw);
    if(!['postgres:','postgresql:'].includes(url.protocol) || url.search || url.hash ||
      url.hostname!==approved.databaseHost || decodeURIComponent(url.pathname.slice(1))!==approved.databaseName ||
      decodeURIComponent(url.username)!==approved.databaseUser ||
      /^(postgres|service_role|supabase_admin)$/.test(approved.databaseUser) ||
      containsForbiddenMoveTarget(raw)) return null;
    return new Pool({connectionString:raw,ssl:{ca,rejectUnauthorized:true},max:2,
      connectionTimeoutMillis:5000,idleTimeoutMillis:10000,query_timeout:5000,statement_timeout:5000,lock_timeout:3000});
  } catch { return null; }
}
