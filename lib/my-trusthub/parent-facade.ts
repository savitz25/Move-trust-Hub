import { PROFILE_SAVE_ENDPOINT, PROFILE_SAVE_RUNTIME_VERSION,
  type Operation, type RequestFor, type ResponseFor } from './vendor/interface';
import { enabled, previewTrace, type AdapterConfig, type BrowserBinding } from './profile-save-adapter';
import { reviewedPair } from './reviewed-origins';
import { ASSERTION_HEADER, signAssertion, type AssertionKey } from './service-assertion';

/** Move may stage and read receipts. Parent confirmation owns commit and consume. */
export const MOVE_SERVICE_OPERATIONS = ['prepareGuestProfileTransfer', 'prepareProfileSaveContinuation', 'getProfileSaveReceipt', 'verifyProfileSaveReceipt'] as const;
const allowed = new Set<string>(MOVE_SERVICE_OPERATIONS);
function traceCode(error: unknown): string {
  if (!(error instanceof Error)) return 'unknown';
  if (/^(unauthorized|unavailable|invalid|disabled)$/.test(error.message)) return error.message;
  return /^[A-Za-z0-9_]{1,40}$/.test(error.name) ? error.name : 'unknown';
}

/** The channel implementation must supply approved P13 service identity, scopes,
 * current parent session and browser binding OUTSIDE JSON. Never forward browser
 * Authorization/Cookie headers or use Move's legacy SDK/service role as parent auth.
 */
export type AssertionContext = { session: string | null; grant: string | null };
export type ScopedChannel = {
  post(url:string,envelope:unknown,browser:BrowserBinding,signal:AbortSignal,context:AssertionContext):Promise<Response>;
};
export function signedParentChannel(config: AdapterConfig, key: AssertionKey, send: typeof fetch): ScopedChannel {
  return { async post(url, envelope, browser, signal, context) {
    if (!context || !Object.hasOwn(context, 'session') || !Object.hasOwn(context, 'grant')) { previewTrace('parent_dispatch', 'context'); throw Error('unauthorized'); }
    const pins = reviewedPair(config.parentOrigin, config.moveOrigin);
    if (!pins || pins.kind !== config.environment || url !== pins.parentOrigin + PROFILE_SAVE_ENDPOINT) { previewTrace('parent_dispatch', 'target'); throw Error('unauthorized'); }
    const operation = (envelope as { operation?: string }).operation;
    if (!operation || !allowed.has(operation)) { previewTrace('parent_dispatch', 'operation'); throw Error('unauthorized'); }
    const bytes = Buffer.from(JSON.stringify(envelope));
    const scope = operation.startsWith('prepare') ? 'transfer:stage' : 'receipt:verify';
    let assertion: string;
    try { assertion = signAssertion(key, 'move', url, scope, bytes, browser.binding, context.session, context.grant, Date.now(), pins); }
    catch (error) { previewTrace('parent_dispatch', traceCode(error)); throw error; }
    previewTrace('parent_dispatch', 'send');
    const headers = { 'Content-Type': 'application/json', [ASSERTION_HEADER]: assertion };
    return send(url, { method: 'POST', body: bytes, headers, cache: 'no-store', redirect: 'error', signal });
  } };
}
export function parentFacade(config:AdapterConfig,channel:ScopedChannel) {
  return async <K extends Operation>(operation:K,input:RequestFor<K>['input'],browser:BrowserBinding,context:AssertionContext={session:null,grant:null}):Promise<ResponseFor<K>> => {
    if(!enabled(config))return {ok:false,error:'disabled'};
    if(!allowed.has(operation))return {ok:false,error:'unauthorized'};
    try {
      const envelope={version:PROFILE_SAVE_RUNTIME_VERSION,operation,input};
      if(Buffer.byteLength(JSON.stringify(envelope),'utf8')>65_536)return {ok:false,error:'invalid'};
      const response=await channel.post(config.parentOrigin+PROFILE_SAVE_ENDPOINT,envelope,browser,AbortSignal.timeout(10_000),context);
      if(!response.ok || response.redirected){previewTrace('parent_response','http_'+String(response.status));return {ok:false,error:'unavailable'};}
      if(!response.body)return {ok:false,error:'invalid'};
      const reader=response.body.getReader(),chunks:Uint8Array[]=[];let size=0;
      while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;
        if(size>65_536){await reader.cancel();return {ok:false,error:'invalid'};}chunks.push(value);}
      const body=JSON.parse(Buffer.concat(chunks).toString('utf8'));
      if(!body || body.ok!==true || body.operation!==operation || !Object.hasOwn(body,'result') ||
        Object.keys(body).some(k=>!['ok','operation','result'].includes(k)))return {ok:false,error:'unavailable'};
      // Specific result receipt/digest checks happen in the specialist adapter.
      return body as ResponseFor<K>;
    } catch (error) { previewTrace('parent_response', traceCode(error)); return {ok:false,error:'unavailable'}; }
  };
}
