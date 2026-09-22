'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { API_PATH, ASK_ORIGIN, FORM_PATH, exactObject, opaque } from '@/lib/my-trusthub/config';
import { projection } from '@/lib/my-trusthub/selection';
import { listLocalSavedMovers } from '@/lib/save-my-move/local-shortlist';
import { openGrantPopup, type GrantChallenge } from '@/lib/my-trusthub/grant-popup';

const ticketKey = (slug: string) => 'mth-v23-retry:' + slug;
const style = 'min-h-11 max-w-full rounded-md border border-slate-600 px-3 py-2 text-left text-sm font-medium text-slate-900 bg-white break-words focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 disabled:cursor-wait disabled:opacity-75';
type State = 'local' | 'checking' | 'saved' | 'unavailable' | 'account_changed' | 'expired';

/** A secondary conversion. Local storage is never deleted or merged here. */
export function KeepInMyTrustHub({ companySlug }: { companySlug: string }) {
  const [state, setState] = useState<State>('local');
  const [ticket, setTicket] = useState<string | null>(null);
  const [projectFailed, setProjectFailed] = useState(false);
  const active = useRef<AbortController | null>(null);
  const popup = useRef<ReturnType<typeof openGrantPopup>>(null);
  const button = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const id = useId();
  useEffect(() => {
    try { const value = localStorage.getItem(ticketKey(companySlug)); if (opaque(value)) setTicket(value); } catch { /* unavailable retry storage does not change local Save */ }
    let needsRecheck = false;
    const left = () => { if (!active.current) needsRecheck = true; };
    const recheck = () => { if (needsRecheck && !active.current) { setState(s => s === 'saved' ? 'local' : s); needsRecheck = false; } };
    window.addEventListener('blur', left);
    window.addEventListener('focus', recheck);
    return () => { active.current?.abort(); popup.current?.cancel(); window.removeEventListener('focus', recheck); window.removeEventListener('blur', left); };
  }, [companySlug]);
  useEffect(() => {
    if (state !== 'checking' && restoreFocus.current) {
      restoreFocus.current = false;
      window.focus(); button.current?.focus();
    }
  }, [state]);

  const run = async (retry: boolean) => {
    if (active.current) return;
    const controller = new AbortController(); active.current = controller;
    // Browser popup is opened before network/crypto work, within user activation.
    if (retry) {
      popup.current = openGrantPopup();
      if (!popup.current) { active.current = null; setState('unavailable'); return; }
    }
    setState('checking'); setProjectFailed(false);
    const timeout = window.setTimeout(() => controller.abort(), retry ? 95000 : 20000);
    const post = async (body: unknown, csrf?: string) => {
      const response = await fetch(API_PATH, { method: 'POST', cache: 'no-store', redirect: 'error', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', ...(csrf ? { 'x-mth-csrf': csrf } : {}) }, body: JSON.stringify(body), signal: controller.signal });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.state === 'account_changed' ? 'account_changed' : data?.state === 'expired' ? 'expired' : 'unavailable');
      return data;
    };
    try {
      const local = listLocalSavedMovers().find(row => row.companySlug === companySlug);
      if (!local) throw new Error('unavailable');
      const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(projection(local.companySlug, local.savedAt)));
      const digest = Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
      const selected = [{ companySlug, savedAt: local.savedAt, revision: digest, digest }];
      const bootstrap = await post({ action: 'bootstrap' });
      if (!exactObject(bootstrap, ['csrf']) || !opaque(bootstrap.csrf)) throw new Error('unavailable');
      if (!retry) {
        const data = await post({ action: 'prepare', selected }, bootstrap.csrf);
        if (data.state !== 'continue' || !opaque(data.ticket) || data.target !== ASK_ORIGIN + FORM_PATH || !exactObject(data.fields, ['continuationRef']) || !opaque(data.fields.continuationRef)) throw new Error('unavailable');
        // Opaque retry handle only, never proof/session/account identity. Persistence
        // failure prevents navigation so a parent result cannot strand the UI.
        localStorage.setItem(ticketKey(companySlug), data.ticket); setTicket(data.ticket);
        const form = document.createElement('form'); form.method = 'POST'; form.action = data.target;
        form.hidden = true; form.setAttribute('data-ph-no-capture', 'true');
        const input = document.createElement('input'); input.type = 'hidden'; input.name = 'continuationRef'; input.value = data.fields.continuationRef;
        form.append(input); document.body.append(form);
        try { form.submit(); } finally { form.remove(); }
      } else {
        if (!ticket || !popup.current) throw new Error('unavailable');
        const challenge = await post({ action: 'challenge', ticket }, bootstrap.csrf) as GrantChallenge;
        popup.current.submit(challenge);
        const proofRef = await popup.current.proof;
        controller.signal.throwIfAborted();
        // Re-read selection after the popup: local edits during confirmation must
        // fail instead of certifying a changed source projection.
        const current = listLocalSavedMovers().find(row => row.companySlug === companySlug);
        if (!current || current.savedAt !== local.savedAt) throw new Error('unavailable');
        const result = await post({ action: 'receipt', ticket, selected, proofRef }, bootstrap.csrf);
        if (result.state !== 'parent_saved' || result.localCopy !== 'keep') throw new Error(['account_changed','expired'].includes(result.state) ? result.state : 'unavailable');
        setProjectFailed(result.projectFailed === true); setState('saved');
      }
    } catch (error) {
      if (!controller.signal.aborted) setState(error instanceof Error && error.message === 'account_changed' ? 'account_changed' : error instanceof Error && error.message === 'expired' ? 'expired' : 'unavailable');
      else setState('unavailable');
    } finally {
      window.clearTimeout(timeout); popup.current?.cancel(); popup.current = null;
      if (active.current === controller) active.current = null;
      // Focus only after React has enabled the button in the committed UI.
      restoreFocus.current = true;
    }
  };
  const busy = state === 'checking';
  return <span className="flex min-w-0 max-w-full flex-col gap-2" data-ph-no-capture="true">
    <button ref={button} type="button" className={style} disabled={busy} aria-busy={busy} aria-describedby={id} onClick={() => void run(!!ticket)}>
      {busy ? 'Checking My TrustHub…' : ticket ? 'Check My TrustHub save' : 'Keep this in My TrustHub'}
    </button>
    {ticket && !busy ? <button type="button" className={style} onClick={() => void run(false)}>Start a fresh confirmation</button> : null}
    <span id={id} role="status" aria-live="polite" aria-atomic="true" className="max-w-72 break-words text-sm text-slate-700">
      {state === 'saved' ? 'Saved to My TrustHub' : busy ? 'Checking My TrustHub…' : state === 'local' ? 'Saved on this device' : 'My TrustHub sync unavailable'}
      {state === 'account_changed' ? '. Your account changed. Start a fresh confirmation.' : state === 'expired' ? '. This confirmation expired. Start again.' : ''}
      {projectFailed ? '. Project assignment failed; the profile Save was verified.' : ''}
      {' · Local copy retained'}
    </span>
  </span>;
}
