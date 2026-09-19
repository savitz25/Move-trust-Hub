import 'server-only';
import type { HttpDependencies } from './profile-save-http';

/** Release binding deliberately absent. Before wiring: durable specialist store,
 * reviewed exact public resolver/binding access, rate limiter, isolated pair,
 * parent browser POST target and approved P13 scoped current-session channel.
 * No process-local persistence, legacy Auth fallback or credentials provisioned.
 */
export function getMoveProfileSaveRuntime():HttpDependencies|null {
  // Even an accidental flag change cannot open production or bypass missing adapters.
  if(process.env.VERCEL_ENV==='production' || process.env.MTH_MOVE_PARENT_SAVE_MODE!=='isolated')return null;
  return null;
}
