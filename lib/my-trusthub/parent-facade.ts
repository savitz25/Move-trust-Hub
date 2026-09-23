import { PROFILE_SAVE_ENDPOINT, PROFILE_SAVE_RUNTIME_VERSION,
  type Operation, type RequestFor, type ResponseFor } from './vendor/interface';
import { enabled, type AdapterConfig, type BrowserBinding } from './profile-save-adapter';

/** The channel implementation must supply approved P13 service identity, scopes,
 * current parent session and browser binding OUTSIDE JSON. Never forward browser
 * Authorization/Cookie headers or use Move's legacy SDK/service role as parent auth.
 */
export type ScopedChannel = {
  post(url:string,envelope:unknown,browser:BrowserBinding,signal:AbortSignal):Promise<Response>;
};
export function parentFacade(config:AdapterConfig,channel:ScopedChannel) {
  return async <K extends Operation>(operation:K,input:RequestFor<K>['input'],browser:BrowserBinding):Promise<ResponseFor<K>> => {
    if(!enabled(config))return {ok:false,error:'disabled'};
    try {
      const envelope={version:PROFILE_SAVE_RUNTIME_VERSION,operation,input};
      if(Buffer.byteLength(JSON.stringify(envelope),'utf8')>65_536)return {ok:false,error:'invalid'};
      const response=await channel.post(config.parentOrigin+PROFILE_SAVE_ENDPOINT,envelope,browser,AbortSignal.timeout(10_000));
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
