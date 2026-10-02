import 'server-only';
import { createHostedMoveRuntime } from './hosted-runtime';
import type { HttpDependencies } from './profile-save-http';
import { createIsolatedMoveRuntime, type IsolatedMovePorts } from './isolated-runtime';
import { deploymentPair } from './reviewed-origins';

/** Routes assemble reviewed ports lazily for the one admitted pair. Production
 * stays unavailable unless the explicit production handoff pins resolve; any
 * missing reviewed input stays unavailable. An explicit null still means no
 * ports. No process-local persistence, legacy Auth fallback, or generated
 * credentials.
 */
export function getMoveProfileSaveBindings(ports?: IsolatedMovePorts | null) {
  if (!deploymentPair(process.env)) return null;
  if (ports !== undefined) return createIsolatedMoveRuntime(process.env, ports);
  return createHostedMoveRuntime(process.env);
}

export function getMoveProfileSaveRuntime(ports?: IsolatedMovePorts | null): HttpDependencies | null {
  return getMoveProfileSaveBindings(ports)?.http ?? null;
}
