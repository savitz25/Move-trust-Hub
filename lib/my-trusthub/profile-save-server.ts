import 'server-only';
import type { HttpDependencies } from './profile-save-http';
import { createIsolatedMoveRuntime, type IsolatedMovePorts } from './isolated-runtime';

/** Release binding deliberately absent. Before wiring: durable specialist store,
 * reviewed exact public resolver/binding access, rate limiter, isolated pair,
 * parent browser POST target and approved P13 scoped current-session channel.
 * No process-local persistence, legacy Auth fallback or credentials provisioned.
 */
export function getMoveProfileSaveBindings(ports:IsolatedMovePorts|null=null) {
  // Even an accidental flag change cannot open production or bypass missing adapters.
  if(process.env.VERCEL_ENV==='production' || process.env.MTH_MOVE_PARENT_SAVE_MODE!=='isolated')return null;
  return createIsolatedMoveRuntime(process.env,ports);
}

export function getMoveProfileSaveRuntime(ports:IsolatedMovePorts|null=null):HttpDependencies|null {
  return getMoveProfileSaveBindings(ports)?.http ?? null;
}
