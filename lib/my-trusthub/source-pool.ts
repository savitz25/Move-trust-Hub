import 'server-only';
import { Pool } from 'pg';
import { serverGate, type Env } from './config';
import type { SourcePool } from './postgres-transfer-store';

export const SOURCE_ROLE = 'mth_move_profile_transfer';
export type SourceTarget = { backend: string; host: string; database: string; login: string; port: 5432;
  mode: 'DIRECT' | 'SUPAVISOR_SESSION'; connectionUser: string };

/** No target has been approved by this rebuild ticket. The operator must publish
 * a reviewed isolated target packet before configuring this metadata or secrets.
 * Approval is not inferred from an arbitrary connection string. */
export function sourceTarget(env: Env): SourceTarget | null {
  if (!serverGate(env) || env.MTH_MOVE_SOURCE_PACKET_APPROVED !== 'true') return null;
  const backend = env.MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND;
  const host = env.MTH_MOVE_SOURCE_DATABASE_HOST;
  const mode = env.MTH_MOVE_SOURCE_DATABASE_MODE;
  const login = 'mth_move_profile_transfer_preview';
  if (!backend || !/^[a-z]{20}$/.test(backend) || ['arepfylnilkjmyduhwbz','qvvxvbcdmbjzrgvwjatw'].includes(backend)) return null;
  if (mode === 'DIRECT' && host === `db.${backend}.supabase.co`)
    return { backend, host, port: 5432, database: 'postgres', login, mode, connectionUser: login };
  // Separate Move-login session-affinity evidence is required; Ask's parity
  // result does not certify this role/target. Transaction pooling is forbidden.
  if (mode === 'SUPAVISOR_SESSION' && env.MTH_MOVE_SOURCE_SESSION_PARITY_APPROVED === 'true' &&
    host && /^aws-[0-9]+-[a-z0-9-]+\.pooler\.supabase\.com$/.test(host))
    return { backend, host, port: 5432, database: 'postgres', login, mode, connectionUser: `${login}.${backend}` };
  return null;
}
export function createIsolatedSourcePool(env: Env, target: SourceTarget | null): (SourcePool & { end(): Promise<void> }) | null {
  if (!serverGate(env) || !target) return null;
  try {
    const raw = env.MTH_MOVE_PARENT_SAVE_DATABASE_URL, ca = env.MTH_MOVE_PARENT_SAVE_DATABASE_CA;
    if (!raw || !ca) return null;
    const url = new URL(raw);
    if (!['postgres:', 'postgresql:'].includes(url.protocol) || url.search || url.hash || url.hostname !== target.host ||
      url.port !== String(target.port) || !url.password ||
      decodeURIComponent(url.username) !== target.connectionUser || decodeURIComponent(url.pathname.slice(1)) !== target.database ||
      /arepfylnilkjmyduhwbz|qvvxvbcdmbjzrgvwjatw/.test(raw)) return null;
    const pool = new Pool({ connectionString: raw, ssl: { ca, servername: target.host, rejectUnauthorized: true }, max: 2,
      connectionTimeoutMillis: 5000, idleTimeoutMillis: 10000, query_timeout: 5000, statement_timeout: 5000, lock_timeout: 3000 });
    // Idle connection loss must not emit credentials or crash the instance.
    // pg discards that connection; the next operation still fails closed.
    pool.on('error', () => {});
    return {
      async connect() {
        const db = await pool.connect();
        try {
          const r = await db.query(`select session_user as login, rolsuper, rolcreaterole, rolcreatedb, rolreplication, rolbypassrls,
            pg_has_role(session_user,'mth_move_profile_transfer','MEMBER') as source_member
            from pg_roles where rolname=session_user`);
          const role = r.rows[0];
          if (role?.login !== target.login || !role.source_member || role.rolsuper || role.rolcreaterole || role.rolcreatedb || role.rolreplication || role.rolbypassrls) throw Error('source_role_denied');
          const unsafe = await db.query(`select
            exists(select 1 from pg_extension where extname='pg_net') or
            exists(select 1 from pg_namespace where nspname='net') or
            exists(select 1 from pg_roles where rolname not in(session_user,'mth_move_profile_transfer')
              and pg_has_role(session_user,oid,'MEMBER')) or
            exists(select 1 from pg_namespace where nspname not like 'pg_%' and nspname<>'information_schema'
              and has_schema_privilege(session_user,oid,'CREATE')) or
            exists(select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace where p.prosecdef and
              n.nspname not like 'pg_%' and n.nspname not in('information_schema','mth_profile_transfer') and
              has_function_privilege(session_user,p.oid,'EXECUTE')) or
            exists(select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace
              where n.nspname not like 'pg_%' and n.nspname not in('information_schema','mth_profile_transfer') and c.relkind in('r','v','m','p')
              and has_table_privilege(session_user,c.oid,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER')) as denied`);
          if (unsafe.rows[0]?.denied !== false) throw Error('source_platform_denied');
          await db.query('set role mth_move_profile_transfer');
          return { query: db.query.bind(db), release(destroy?: boolean) {
            if (destroy) { db.release(true); return; }
            // Keep the checkout until RESET completes, including in session
            // pooling. A reset failure destroys the connection.
            void db.query('reset role').then(() => db.release(), () => db.release(true));
          } };
        } catch { db.release(true); throw Error('source_unavailable'); }
      },
      end: () => pool.end(),
    };
  } catch { return null; }
}
