import { ASSERTION_HEADER, boundedBody, signAssertion, type AssertionKey, type Scope } from './service-assertion';
import { API_PATH, ASK_ORIGIN, GRANT_API_PATH, GRANT_FORM_PATH, exactObject, opaque } from './config';
import { ProtocolError } from './errors';
import { PROFILE_SAVE_RUNTIME_VERSION, type Operation, type RequestFor, type ResponseFor } from './vendor/interface';
import type { BrowserBinding, CurrentGrant } from './profile-save-adapter';

export type ServiceOperation = Extract<Operation, 'prepareGuestProfileTransfer' | 'prepareProfileSaveContinuation' | 'getProfileSaveReceipt' | 'verifyProfileSaveReceipt'>;
const operations: readonly string[] = ['prepareGuestProfileTransfer', 'prepareProfileSaveContinuation', 'getProfileSaveReceipt', 'verifyProfileSaveReceipt'];

/** Server-only callers supply browser authority, never browser headers or a URL.
 * Each request is signed afresh. No parent commit capability is exposed here. */
export class ParentChannel {
  constructor(private readonly key: AssertionKey, private readonly send: typeof fetch = fetch, private readonly bypass?: string) {}
  private async request(path: typeof API_PATH | typeof GRANT_API_PATH, body: unknown, scope: Scope, browser: string, grant?: CurrentGrant) {
    const bytes = Buffer.from(JSON.stringify(body)), limit = path === GRANT_API_PATH ? 4096 : 65536;
    if (bytes.length > limit || !opaque(browser)) throw new ProtocolError('invalid');
    if (grant && (!opaque(grant.proofRef) || !/^[a-f0-9]{64}$/.test(grant.sessionBinding) || grant.expiresAt <= Date.now())) throw new ProtocolError('unauthorized');
    const target = ASK_ORIGIN + path;
    const response = await this.send(target, { method: 'POST', body: bytes, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(5000),
      headers: { 'Content-Type': 'application/json',
        [ASSERTION_HEADER]: signAssertion(this.key, 'move', target, scope, bytes, browser, grant?.sessionBinding ?? null, grant?.proofRef ?? null),
        ...(this.bypass ? { 'x-vercel-protection-bypass': this.bypass } : {}) } });
    if (response.redirected || response.headers.get('content-type')?.split(';')[0] !== 'application/json') throw new ProtocolError('unavailable');
    const value = JSON.parse((await boundedBody(response, limit)).toString('utf8'));
    if (!response.ok || value?.ok !== true) throw new ProtocolError(response.status === 403 ? 'unauthorized' : response.status === 410 ? 'expired' : 'unavailable');
    return value;
  }
  async operation<K extends ServiceOperation>(operation: K, input: RequestFor<K>['input'], browser: BrowserBinding, grant?: CurrentGrant): Promise<ResponseFor<K>> {
    if (!operations.includes(operation)) throw new ProtocolError('unauthorized');
    const stage = operation === 'prepareGuestProfileTransfer' || operation === 'prepareProfileSaveContinuation';
    if (!stage && !grant || stage && grant) throw new ProtocolError('unauthorized');
    const result = await this.request(API_PATH, { version: PROFILE_SAVE_RUNTIME_VERSION, operation, input }, stage ? 'transfer:stage' : 'receipt:verify', browser.binding, grant);
    if (!exactObject(result, ['ok', 'operation', 'result']) || result.operation !== operation) throw new ProtocolError('unavailable');
    return result as ResponseFor<K>;
  }
  async binding(browser: string): Promise<unknown> {
    const result = await this.request(GRANT_API_PATH, { action: 'binding' }, 'transfer:stage', browser);
    if (!exactObject(result, ['ok', 'result'])) throw new ProtocolError('unavailable');
    return result.result;
  }
  async challenge(continuationRef: string, browser: string) {
    if (!opaque(continuationRef)) throw new ProtocolError('invalid');
    const response = await this.request(GRANT_API_PATH, { action: 'challenge', continuationRef }, 'receipt:verify', browser);
    const r = response.result;
    if (!exactObject(response, ['ok', 'result']) || !exactObject(r, ['target', 'fields']) || r.target !== ASK_ORIGIN + GRANT_FORM_PATH || !exactObject(r.fields, ['challengeRef']) || !opaque(r.fields.challengeRef)) throw new ProtocolError('unavailable');
    return { target: r.target as string, fields: { challengeRef: r.fields.challengeRef } };
  }
  async currentGrant(continuationRef: string, proofRef: string, browser: string): Promise<CurrentGrant> {
    if (!opaque(continuationRef) || !opaque(proofRef)) throw new ProtocolError('unauthorized');
    const response = await this.request(GRANT_API_PATH, { action: 'resolve', continuationRef, proofRef }, 'receipt:verify', browser);
    const r = response.result;
    if (!exactObject(response, ['ok', 'result']) || !exactObject(r, r?.projectRef === undefined
      ? ['accountContextRef', 'selectionConfirmed', 'sessionBinding', 'expiresAt']
      : ['accountContextRef', 'selectionConfirmed', 'sessionBinding', 'expiresAt', 'projectRef']) ||
      !opaque(r.accountContextRef) || r.selectionConfirmed !== true || typeof r.sessionBinding !== 'string' || !/^[a-f0-9]{64}$/.test(r.sessionBinding) ||
      typeof r.expiresAt !== 'number' || r.expiresAt <= Date.now() || r.expiresAt > Date.now() + 30000 || r.projectRef !== undefined && !opaque(r.projectRef)) throw new ProtocolError('unauthorized');
    return { ...(r as Omit<CurrentGrant, 'proofRef'>), proofRef };
  }
}
