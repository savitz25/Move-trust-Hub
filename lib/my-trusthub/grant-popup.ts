import { ASK_ORIGIN, GRANT_FORM_PATH, exactObject, opaque } from './config';

export type GrantChallenge = { target: string; fields: { challengeRef: string } };
export function validProofMessage(event: Pick<MessageEvent, 'origin' | 'source' | 'data'>, popup: Window): event is MessageEvent<{ type: 'v23-current-grant'; proofRef: string }> {
  return event.origin === ASK_ORIGIN && event.source === popup && exactObject(event.data, ['type','proofRef']) &&
    event.data.type === 'v23-current-grant' && opaque(event.data.proofRef);
}

/** Must be called synchronously from the user's click, before any await.
 * Only this outstanding attempt accepts a message from its exact opened Window.
 * Blur is expected while the popup is active and never aborts the attempt. */
export function openGrantPopup(opener: Window = window, timeoutMs = 90000) {
  const name = 'mth-current-grant-' + crypto.randomUUID();
  const popup = opener.open('about:blank', name, 'popup,width=500,height=650');
  if (!popup) return null;
  let done = false, submitted = false, timer: ReturnType<typeof setTimeout>, closed: ReturnType<typeof setInterval>;
  let resolve!: (proof: string) => void, reject!: (error: Error) => void;
  const proof = new Promise<string>((yes, no) => { resolve = yes; reject = no; });
  // Cancellation can precede the awaited challenge response.
  void proof.catch(() => {});
  const settle = (ref?: string) => {
    if (done) return;
    done = true; clearTimeout(timer); clearInterval(closed);
    opener.removeEventListener('message', message); opener.removeEventListener('pagehide', cancel);
    try { popup.close(); } catch { /* no authority is inferred from close */ }
    try { opener.focus(); } catch { /* focus does not convey authority */ }
    if (ref) resolve(ref); else reject(new Error('Current account check unavailable'));
  };
  const cancel = () => settle();
  const message = (event: MessageEvent) => { if (submitted && validProofMessage(event, popup)) settle(event.data.proofRef); };
  opener.addEventListener('message', message); opener.addEventListener('pagehide', cancel, { once: true });
  timer = setTimeout(cancel, timeoutMs);
  // Delay close detection one task so a postMessage queued immediately before
  // the parent closes can arrive before treating an early close as failure.
  closed = setInterval(() => { if (popup.closed) setTimeout(() => { if (!done) cancel(); }, 100); }, 250);
  return { proof, cancel,
    submit(challenge: GrantChallenge) {
      if (done || submitted || !exactObject(challenge, ['target','fields']) || challenge.target !== ASK_ORIGIN + GRANT_FORM_PATH ||
        !exactObject(challenge.fields, ['challengeRef']) || !opaque(challenge.fields.challengeRef)) { cancel(); throw new Error('Invalid account challenge'); }
      const form = opener.document.createElement('form');
      form.method = 'POST'; form.action = challenge.target; form.target = name; form.setAttribute('data-ph-no-capture', 'true');
      form.hidden = true;
      const input = opener.document.createElement('input'); input.type = 'hidden'; input.name = 'challengeRef'; input.value = challenge.fields.challengeRef;
      form.append(input); opener.document.body.append(form); submitted = true;
      try { form.submit(); popup.focus(); } catch { cancel(); throw new Error('Account popup unavailable'); }
      finally { form.remove(); }
    },
  };
}
