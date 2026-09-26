import { PROFILE_SAVE_ENDPOINT, PROFILE_SAVE_RUNTIME_VERSION,
  type Operation, type RequestFor, type ResponseFor } from './vendor/interface';
import { enabled, type AdapterConfig, type BrowserBinding } from './profile-save-adapter';
import { ASK_PREVIEW, MOVE_PREVIEW } from './reviewed-origins';
import { ASSERTION_HEADER, signAssertion, type AssertionKey } from './service-assertion';

/** Move may stage and read receipts. Parent confirmation owns commit and consume. */
export const MOVE_SERVICE_OPERATIONS = ['prepareGuestProfileTransfer', 'prepareProfileSaveContinuation', 'getProfileSaveReceipt', 'verifyProfileSaveReceipt'] as const;
const allowed = new Set<string>(MOVE_SERVICE_OPERATIONS);

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
    if (!context || !Object.hasOwn(context, 'session') || !Object.hasOwn(context, 'grant')) throw Error('unauthorized');
    if (config.parentOrigin !== ASK_PREVIEW || config.moveOrigin !== MOVE_PREVIEW || url !== ASK_PREVIEW + PROFILE_SAVE_ENDPOINT) throw Error('unauthorized');
    const operation = (envelope as { operation?: string }).operation;
    if (!operation || !allowed.has(operation)) throw Error('unauthorized');
    const bytes = Buffer.from(JSON.stringify(envelope));
    const scope = operation.startsWith('prepare') ? 'transfer:stage' : 'receipt:verify';
    const headers = { 'Content-Type': 'application/json', [ASSERTION_HEADER]: signAssertion(key, 'move', url, scope, bytes, browser.binding, context.session, context.grant) };
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
      if(!response.ok || response.redirected)return {ok:false,error:'unavailable'};
      if(!response.body)return {ok:false,error:'invalid'};
      const reader=response.body.getReader(),chunks:Uint8Array[]=[];let size=0;
      while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;
        if(size>65_536){await reader.cancel();return {ok:false,error:'invalid'};}chunks.push(value);}
      const body=JSON.parse(Buffer.concat(chunks).toString('utf8'));
      if(!body || body.ok!==true || body.operation!==operation || !Object.hasOwn(body,'result') ||
        Object.keys(body).some(k=>!['ok','operation','result'].includes(k)))return {ok:false,error:'unavailable'};
      // Specific result receipt/digest checks happen in the specialist adapter.
      return body as ResponseFor<K>;
    } catch {return {ok:false,error:'unavailable'};}
  };
}
