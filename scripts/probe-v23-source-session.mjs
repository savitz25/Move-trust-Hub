// PREPARED ONLY: separately authorized, pinned isolated Move login. Read-only
// statements and transaction rollback. No secrets or provider errors are logged.
import assert from 'node:assert/strict';
import { Pool } from 'pg';
import { sourceTarget, SOURCE_ROLE } from '../lib/my-trusthub/source-pool.ts';
const env=process.env;
if(env.MTH_MOVE_SOURCE_PROBE_AUTHORIZED!=='true')throw Error('Source probe not authorized');
// The probe establishes parity; it may bypass only the parity-result flag.
const target=sourceTarget({...env,MTH_MOVE_SOURCE_SESSION_PARITY_APPROVED:'true'});
if(!target||target.mode!=='SUPAVISOR_SESSION')throw Error('Pinned session target required');
let url;try{url=new URL(env.MTH_MOVE_PARENT_SAVE_DATABASE_URL);}catch{throw Error('Invalid source input');}
if(!['postgres:','postgresql:'].includes(url.protocol)||url.hostname!==target.host||url.port!=='5432'||
  decodeURIComponent(url.username)!==target.connectionUser||url.pathname!=='/postgres'||!url.password||url.search||url.hash||!env.MTH_MOVE_PARENT_SAVE_DATABASE_CA)throw Error('Invalid source input');
const pool=new Pool({host:target.host,port:5432,user:target.connectionUser,password:decodeURIComponent(url.password),database:'postgres',
  ssl:{ca:env.MTH_MOVE_PARENT_SAVE_DATABASE_CA,servername:target.host,rejectUnauthorized:true},max:2,connectionTimeoutMillis:5000,
  application_name:'move-v23-source-parity'});
pool.on('error',()=>{});
try {
  const a=await pool.connect(),b=await pool.connect();
  try {
    const id=(await a.query('select session_user login,current_user role,current_database() db,pg_backend_pid() pid')).rows[0];
    assert.equal(id.login,target.login);assert.equal(id.role,target.login);assert.equal(id.db,'postgres');
    assert.equal(a.connection.stream.authorized,true);
    assert.notEqual((await b.query('select pg_backend_pid() pid')).rows[0].pid,id.pid);
    const limits=(await a.query("select current_setting('statement_timeout') s,current_setting('lock_timeout') l,current_setting('idle_in_transaction_session_timeout') i")).rows[0];
    assert.deepEqual(limits,{s:'5s',l:'3s',i:'5s'});
    assert.equal((await a.query('select rolconnlimit from pg_roles where rolname=session_user')).rows[0].rolconnlimit,4);
    await a.query('set role '+SOURCE_ROLE);
    assert.equal((await a.query('select current_user role,pg_backend_pid() pid')).rows[0].pid,id.pid);
    await a.query('select ticket_hash from mth_profile_transfer.stages limit 0');
    await a.query('reset role');
    await assert.rejects(a.query('select ticket_hash from mth_profile_transfer.stages limit 0'));
    await a.query('begin isolation level serializable');await a.query('set local role '+SOURCE_ROLE);
    await a.query('savepoint move_probe');await a.query("set local statement_timeout='4s'");
    await a.query('rollback to savepoint move_probe');await a.query('rollback');
    assert.equal((await a.query('select current_user u')).rows[0].u,target.login);
    const sql="select pg_try_advisory_lock(hashtextextended('move-v23-source-parity',0)) locked";
    assert.equal((await a.query(sql)).rows[0].locked,true);
    assert.equal((await b.query(sql)).rows[0].locked,false);
    await a.query("select pg_advisory_unlock(hashtextextended('move-v23-source-parity',0))");
    assert.equal((await b.query(sql)).rows[0].locked,true);
    await b.query("select pg_advisory_unlock(hashtextextended('move-v23-source-parity',0))");
    assert.equal((await a.query('select pg_backend_pid() pid')).rows[0].pid,id.pid);
  } finally {a.release(true);b.release(true);}
  const clean=await pool.connect();try{assert.equal((await clean.query('select current_user u')).rows[0].u,target.login);}finally{clean.release();}
  console.log('MOVE_V23_SOURCE_SESSION_PARITY_PASS');
} catch {console.error('MOVE_V23_SOURCE_SESSION_PARITY_FAIL');process.exitCode=1;}
finally {await pool.end();}
