import { randomBytes, timingSafeEqual } from 'node:crypto';
import { enabled, type AdapterConfig, type MoveProfileSaveAdapter, type BrowserBinding, type CurrentGrant } from './profile-save-adapter';
export const COOKIE_NAME='mth_move_profile_transfer';
const headers={'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'};
const opaque=(value:unknown):value is string=>typeof value==='string'&&/^[A-Za-z0-9_-]{43}$/.test(value);
export type HttpDependencies={config:AdapterConfig;adapter:MoveProfileSaveAdapter;
  /** Reviewed per-browser limiter, not an unbounded deployed process-local Map. */
  allowRequest(request:Request):Promise<boolean>;
  /** Ask current-grant bridge. Missing ports stay unavailable and never commit. */
  grantChallenge?(browser:BrowserBinding,ticket:string):Promise<{target:string;challengeRef:string}|null>;
  resolveGrant?(browser:BrowserBinding,ticket:string,proofRef:string):Promise<CurrentGrant|'account_changed'|null>;
};
const json=(body:unknown,status=200)=>Response.json(body,{status,headers});
async function boundedJson(request:Request):Promise<unknown> {
  if(!request.body)throw Error('invalid');
  const reader=request.body.getReader();const chunks:Uint8Array[]=[];let size=0;
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;
    if(size>65_536){await reader.cancel();throw Error('invalid');}chunks.push(value);}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export async function handleMoveProfileSave(request:Request,dependencies:HttpDependencies|null):Promise<Response> {
  if(!dependencies || !enabled(dependencies.config))return json({state:'unavailable',localCopy:'keep'},503);
  const d=dependencies,url=new URL(request.url);
  if(request.method!=='POST' || url.search || url.origin!==d.config.moveOrigin ||
    request.headers.get('origin')!==d.config.moveOrigin || request.headers.get('sec-fetch-site')!=='same-origin' ||
    request.headers.get('content-type')?.split(';')[0]!=='application/json')return json({state:'invalid',localCopy:'keep'},403);
  try {
    if(!await d.allowRequest(request))return json({state:'unavailable',localCopy:'keep'},429);
    const body=await boundedJson(request);
    if(!body || typeof body!=='object' || Array.isArray(body))return json({state:'invalid',localCopy:'keep'},400);
    const input=body as Record<string,unknown>;
    const existing=request.headers.get('cookie')?.split(';').map(v=>v.trim()).find(v=>v.startsWith(COOKIE_NAME+'='))?.slice(COOKIE_NAME.length+1);
    if(input.action==='bootstrap' && Object.keys(input).length===1){
      const csrf=existing && /^[A-Za-z0-9_-]{43}$/.test(existing)?existing:randomBytes(32).toString('base64url');
      const result=json({csrf});
      result.headers.set('Set-Cookie',`${COOKIE_NAME}=${csrf}; Path=/api/my-trusthub/profile-save; HttpOnly; SameSite=Strict; Max-Age=86400${url.protocol==='https:'?'; Secure':''}`);
      return result;
    }
    const csrf=request.headers.get('x-mth-csrf');
    if(!existing || !csrf || !/^[A-Za-z0-9_-]{43}$/.test(existing) || !/^[A-Za-z0-9_-]{43}$/.test(csrf) ||
      !timingSafeEqual(Buffer.from(existing),Buffer.from(csrf)))return json({state:'invalid',localCopy:'keep'},403);
    const browser:BrowserBinding={binding:existing,csrfVerified:true,origin:d.config.moveOrigin,environment:'isolated'};
    if(input.action==='prepare' && Object.keys(input).length===2 && Object.hasOwn(input,'selected'))
      return json(await d.adapter.prepare(input.selected,browser));
    if(input.action==='grant-challenge' && Object.keys(input).length===2 && Object.hasOwn(input,'ticket')){
      if(!d.grantChallenge || !opaque(input.ticket))return json({state:'unavailable',localCopy:'keep'},503);
      const challenge=await d.grantChallenge(browser,input.ticket);
      return challenge?json({state:'challenge',target:challenge.target,challengeRef:challenge.challengeRef,localCopy:'keep'}):json({state:'unavailable',localCopy:'keep'},503);
    }
    if(input.action==='receipt' && Object.keys(input).length===4 && Object.hasOwn(input,'ticket') && Object.hasOwn(input,'selected') && Object.hasOwn(input,'proofRef')){
      if(!opaque(input.proofRef))return json({state:'invalid',localCopy:'keep'},400);
      if(!d.resolveGrant)return json({state:'unavailable',localCopy:'keep'},503);
      const grant=await d.resolveGrant(browser,input.ticket,input.proofRef);
      if(grant==='account_changed')return json({state:'account_changed',localCopy:'keep'});
      if(!grant)return json({state:'unavailable',localCopy:'keep'},503);
      return json(await d.adapter.finish(input.ticket,input.selected,browser,grant));
    }
    return json({state:'invalid',localCopy:'keep'},400);
  }catch{return json({state:'unavailable',localCopy:'keep'},503);}
}
