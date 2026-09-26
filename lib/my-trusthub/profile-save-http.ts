import { randomBytes, timingSafeEqual } from 'node:crypto';
import { API_PATH, MOVE_ORIGIN, exactObject, opaque } from './config';
import { boundedBody } from './service-assertion';
import { ProtocolError, PRIVATE_HEADERS } from './errors';
import { hash, type MoveRuntime } from './runtime';
import type { BrowserBinding } from './profile-save-adapter';

export const COOKIE_NAME = 'mth_move_profile_transfer';
const json = (value: unknown, status = 200) => Response.json(value, { status, headers: PRIVATE_HEADERS });
const retained = (state: string, status: number) => json({ state, localCopy: 'keep' }, status);

export async function handleMoveProfileSave(request: Request, runtime: MoveRuntime | null): Promise<Response> {
  try {
    if (!runtime) return retained('unavailable', 503);
    if (request.method !== 'POST' || request.url !== MOVE_ORIGIN + API_PATH || request.headers.get('origin') !== MOVE_ORIGIN ||
      request.headers.get('sec-fetch-site') !== 'same-origin' || request.headers.get('content-type')?.split(';')[0] !== 'application/json') return retained('invalid', 403);
    const body = JSON.parse((await boundedBody(request, 65536)).toString('utf8'));
    await runtime.store.cleanup();
    // Global ceiling also bounds browser registration/quota-row growth.
    if (!await runtime.store.allowRate('global:bff')) return retained('unavailable', 429);
    const cookie = request.headers.get('cookie')?.split(';').map(v => v.trim()).find(v => v.startsWith(COOKIE_NAME + '='))?.slice(COOKIE_NAME.length + 1);
    if (exactObject(body, ['action']) && body.action === 'bootstrap') {
      const csrf = opaque(cookie) && await runtime.store.knownBrowser(cookie) ? cookie : randomBytes(32).toString('base64url');
      await runtime.store.registerBrowser(csrf);
      const response = json({ csrf });
      response.headers.set('Set-Cookie', `${COOKIE_NAME}=${csrf}; Path=${API_PATH}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`);
      return response;
    }
    const csrf = request.headers.get('x-mth-csrf');
    if (!opaque(cookie) || !opaque(csrf) || !timingSafeEqual(Buffer.from(cookie), Buffer.from(csrf)) || !await runtime.store.knownBrowser(cookie)) return retained('invalid', 403);
    if (!await runtime.store.allowRate('browser:' + cookie)) return retained('unavailable', 429);
    const browser: BrowserBinding = { binding: cookie, csrfVerified: true, origin: MOVE_ORIGIN, environment: 'isolated' };
    if (exactObject(body, ['action','selected']) && body.action === 'prepare') return json(await runtime.adapter.prepare(body.selected, browser));
    if (exactObject(body, ['action','ticket']) && body.action === 'challenge' && opaque(body.ticket)) return json(await runtime.challenge(body.ticket, browser));
    if (exactObject(body, ['action','ticket','selected','proofRef']) && body.action === 'receipt' && opaque(body.ticket) && opaque(body.proofRef)) {
      // Duplicate BFF proof submissions require a fresh popup, even on retry.
      if (!await runtime.store.claim(hash('finish:' + cookie + ':' + body.proofRef), Date.now() + 30000)) return retained('unavailable', 403);
      return json(await runtime.adapter.finish(body.ticket, body.selected, browser, body.proofRef));
    }
    return retained('invalid', 400);
  } catch (error) {
    const code = error instanceof ProtocolError ? error.code : error instanceof SyntaxError ? 'invalid' : 'unavailable';
    return retained(code === 'unauthorized' ? 'account_changed' : code, { invalid: 400, unauthorized: 403, expired: 410, conflict: 409, rate_limited: 429, unavailable: 503 }[code]);
  }
}
