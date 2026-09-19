'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { listLocalSavedMovers } from '@/lib/save-my-move/local-shortlist';
import { projection, type LocalSelection } from '@/lib/my-trusthub/selection';

const endpoint='/api/my-trusthub/profile-save';
/** Optional explicit conversion. Legacy Save and local research are untouched. */
export function KeepInMyTrustHub({companySlug}:{companySlug:string}) {
  const [busy,setBusy]=useState(false),[message,setMessage]=useState('');
  const [hasTicket,setHasTicket]=useState(false);
  const operation=useRef<AbortController|null>(null),statusId=useId();
  const storageKey='mth-profile-transfer:'+companySlug;
  useEffect(()=>{
    const reset=()=>{operation.current?.abort();operation.current=null;setBusy(false);setMessage('');};
    try{setHasTicket(Boolean(sessionStorage.getItem(storageKey)));}catch{/* no hidden success */}
    window.addEventListener('pagehide',reset);window.addEventListener('blur',reset);
    return ()=>{operation.current?.abort();window.removeEventListener('pagehide',reset);window.removeEventListener('blur',reset);};
  },[storageKey]);
  async function selection():Promise<LocalSelection[]> {
    const local=listLocalSavedMovers().find(row=>row.companySlug===companySlug);
    if(!local)throw Error('not local');
    const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(projection(local.companySlug,local.savedAt)))))
      .map(b=>b.toString(16).padStart(2,'0')).join('');
    return [{companySlug:local.companySlug,savedAt:local.savedAt,revision:digest,digest}];
  }
  async function run(check:boolean) {
    if(operation.current)return;
    const controller=new AbortController();operation.current=controller;setBusy(true);setMessage('Checking My TrustHub…');
    const timeout=window.setTimeout(()=>controller.abort(),15_000);
    try {
      const selected=await selection();
      const post=async(body:unknown,csrf?:string)=>{
        const result=await fetch(endpoint,{method:'POST',credentials:'same-origin',redirect:'error',cache:'no-store',
          headers:{'Content-Type':'application/json',...(csrf?{'X-MTH-CSRF':csrf}:{})},body:JSON.stringify(body),signal:controller.signal});
        if(!result.ok)throw Error('unavailable');return result.json();
      };
      const {csrf}=await post({action:'bootstrap'});
      if(typeof csrf!=='string')throw Error('unavailable');
      const ticket=check?sessionStorage.getItem(storageKey):null;
      const result=await post(check?{action:'receipt',ticket,selected}:{action:'prepare',selected},csrf);
      if(controller.signal.aborted || JSON.stringify(await selection())!==JSON.stringify(selected))return;
      if(!check && result.state==='continue' && typeof result.ticket==='string' && /^[A-Za-z0-9_-]{43}$/.test(result.ticket)){
        // Store opaque retry reference only, not research or auth. No query flags.
        sessionStorage.setItem(storageKey,result.ticket);setHasTicket(true);
        // Form target and opaque fields come from the same-origin reviewed BFF.
        const target=new URL(result.target);
        if(target.search || target.hash || target.username || target.password ||
          !(target.hostname.endsWith('.vercel.app') || target.hostname.endsWith('.test') || ['localhost','127.0.0.1'].includes(target.hostname)) ||
          !['http:','https:'].includes(target.protocol) || !/^[A-Za-z0-9_-]{43}$/.test(result.fields?.continuationRef))throw Error('unavailable');
        const form=document.createElement('form');form.method='POST';form.action=target.href;
        const input=document.createElement('input');input.type='hidden';input.name='continuationRef';input.value=result.fields.continuationRef;
        form.append(input);document.body.append(form);form.submit();return;
      }
      setMessage(check && result.state==='parent_saved'
        ? `Saved to My TrustHub.${result.projectFailed?' Project assignment failed; your Save is retained.':''} Device copy retained.`
        : result.state==='local_only'?'Saved on this device. Account sync is not available for this profile.'
          :'Saved on this device — My TrustHub sync unavailable. Retry when ready.');
    }catch{if(!controller.signal.aborted)setMessage('Saved on this device — My TrustHub sync unavailable. Retry when ready.');}
    finally{window.clearTimeout(timeout);if(operation.current===controller){operation.current=null;setBusy(false);
      if(controller.signal.aborted)setMessage('Saved on this device — My TrustHub sync unavailable. Retry when ready.');}}
  }
  return <span className="inline-flex max-w-64 flex-col gap-1">
    <button type="button" className="rounded border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2" aria-disabled={busy}
      aria-busy={busy} aria-describedby={statusId} onClick={()=>void run(false)}>Keep this in My TrustHub</button>
    {hasTicket?<button type="button" className="rounded border px-3 py-2 text-sm" aria-disabled={busy} onClick={()=>void run(true)}>Check My TrustHub save</button>:null}
    <span id={statusId} role="status" aria-live="polite" className="text-xs">{message}</span>
  </span>;
}
