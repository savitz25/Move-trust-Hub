import 'server-only';
import { createPreviewMoveRuntime } from './hosted-runtime';
import type { HttpDependencies } from './profile-save-http';
import { createIsolatedMoveRuntime, type IsolatedMovePorts } from './isolated-runtime';

/** Preview routes assemble reviewed ports lazily. Production and any missing
 * reviewed input stay unavailable. An explicit null still means no ports.
 * No process-local persistence, legacy Auth fallback, or generated credentials.
 */
export function getMoveProfileSaveBindings(ports?: IsolatedMovePorts | null) {
  if (process.env.VERCEL_ENV === 'production' || process.env.MTH_MOVE_PARENT_SAVE_MODE !== 'isolated') return null;
  if (ports !== undefined) return createIsolatedMoveRuntime(process.env, ports);
  return createPreviewMoveRuntime(process.env);
}

export function getMoveProfileSaveRuntime(ports?: IsolatedMovePorts | null): HttpDependencies | null {
  return getMoveProfileSaveBindings(ports)?.http ?? null;
}
