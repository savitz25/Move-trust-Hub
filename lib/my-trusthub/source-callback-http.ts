import { enabled } from './profile-save-adapter';
import type { createIsolatedMoveRuntime } from './isolated-runtime';
import { isSelectedItem, type ItemReceipt } from './vendor/v2-3-profile-transfer';

/** Move-owned service endpoint, NOT an addition to the immutable parent API.
 * Builder 4 must authenticate the original request (including signed body,
 * audience, expiry/replay and exact scope) in verifySourceCaller. No decoder or
 * browser header is an authority here. No CORS or browser-cookie auth fallback.
 */
export const SOURCE_CALLBACK_PATH='/api/my-trusthub/profile-save/source';
type Runtime=NonNullable<ReturnType<typeof createIsolatedMoveRuntime>>;
const headers={'Cache-Control':'private, no-store, max-age=0','Referrer-Policy':'no-referrer',
  'X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow, noarchive'};
const reply=(body:unknown,status:number)=>Response.json(body,{status,headers});
const opaque=(v:unknown)=>typeof v==='string'&&/^[A-Za-z0-9_-]{43}$/.test(v);
const object=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const exact=(v:Record<string,unknown>,keys:string[])=>Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
function receipt(v:unknown):v is ItemReceipt {
  if(!object(v)||!exact(v,['receiptRef','requestKey','accountContextRef','manifestDigest','item','parent','project','localCopy'])||
    !opaque(v.receiptRef)||!opaque(v.accountContextRef)||typeof v.requestKey!=='string'||!/^[A-Za-z0-9_-]{43}:\d{1,2}$/.test(v.requestKey)||
    typeof v.manifestDigest!=='string'||!/^[a-f0-9]{64}$/.test(v.manifestDigest)||!isSelectedItem(v.item)||v.localCopy!=='keep'||
    !object(v.parent)||!object(v.project))return false;
  return Object.keys(v.parent).every(k=>['outcome','savedRef'].includes(k))&&
    ['saved','already_saved','local_only','identity_review_required','profile_not_published','unsupported_class','failed'].includes(String(v.parent.outcome))&&
    (v.parent.savedRef===undefined||typeof v.parent.savedRef==='string'&&/^[A-Za-z0-9_-]{1,200}$/.test(v.parent.savedRef))&&
    Object.keys(v.project).every(k=>['outcome','projectRef'].includes(k))&&
    ['not_requested','added','already_member','failed'].includes(String(v.project.outcome))&&
    (v.project.projectRef===undefined||opaque(v.project.projectRef));
}
export async function handleSourceCallback(request:Request,runtime:Runtime|null):Promise<Response> {
  if(!runtime||!enabled(runtime.http.config))return reply({ok:false,error:'unavailable'},503);
  const url=new URL(request.url);
  if(request.method!=='POST')return reply({ok:false,error:'invalid'},405);
  if(url.origin!==runtime.http.config.moveOrigin||url.pathname!==SOURCE_CALLBACK_PATH||url.search||
    request.headers.get('content-type')?.split(';')[0].trim()!=='application/json')return reply({ok:false,error:'invalid'},400);
  // Verification receives a bounded reconstruction, including the unchanged raw
  // body bytes and headers. Do not tee an unbounded request into a clone buffer.
  try {
    const reader=request.body?.getReader();if(!reader)return reply({ok:false,error:'invalid'},400);
    const chunks:Uint8Array[]=[];let size=0;
    try {for(;;){const chunk=await reader.read();if(chunk.done)break;size+=chunk.value.byteLength;
      if(size>131072){await reader.cancel();return reply({ok:false,error:'invalid'},413);}chunks.push(chunk.value);}}
    finally{reader.releaseLock();}
    const bytes=Buffer.concat(chunks);
    let body:unknown;try{body=JSON.parse(bytes.toString('utf8'));}catch{return reply({ok:false,error:'invalid'},400);}
    if(!object(body)||typeof body.action!=='string')return reply({ok:false,error:'invalid'},400);
    const proof=new Request(request.url,{method:'POST',headers:request.headers,body:bytes,signal:request.signal});
    if(body.action==='resolve'&&exact(body,['action','profile'])) {
      const profile=body.profile;
      if(!object(profile)||!exact(profile,['hub','nativeId','profileClass'])||
        typeof profile.hub!=='string'||typeof profile.nativeId!=='string'||typeof profile.profileClass!=='string')return reply({ok:false,error:'invalid'},400);
      const caller=await runtime.authorize(proof,'source:read');
      if(!caller)return reply({ok:false,error:'unauthorized'},403);
      const result=await runtime.resolvePublication(profile);
      return result?reply({ok:true,result},200):reply({ok:false,error:'unavailable'},503);
    }
    if(!opaque(body.continuationRef))return reply({ok:false,error:'invalid'},400);
    if(body.action==='source'&&exact(body,['action','continuationRef'])) {
      const result=await runtime.source(body.continuationRef as string,proof);
      return result?reply({ok:true,result},200):reply({ok:false,error:'unauthorized'},403);
    }
    if(body.action==='acknowledge'&&exact(body,['action','continuationRef','receipts'])&&Array.isArray(body.receipts)&&
      body.receipts.length>0&&body.receipts.length<=50&&body.receipts.every(receipt)) {
      await runtime.acknowledge(body.continuationRef as string,body.receipts,proof);
      return reply({ok:true},200); // acknowledgment is NOT a browser Save receipt
    }
    return reply({ok:false,error:'invalid'},400);
  }catch(error){
    const unauthorized=error instanceof Error&&['unauthorized_source_ack','invalid_source_ack','source_account_changed'].includes(error.message);
    return reply({ok:false,error:unauthorized?'unauthorized':'unavailable'},unauthorized?403:503);
  }
}
