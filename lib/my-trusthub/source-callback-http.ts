import { MOVE_ORIGIN, SOURCE_PATH, exactObject, opaque } from './config';
import { boundedBody, verifyAssertion } from './service-assertion';
import { ProtocolError, PRIVATE_HEADERS, errorResponse } from './errors';
import type { MoveRuntime } from './runtime';

export async function handleSource(request: Request, runtime: MoveRuntime | null): Promise<Response> {
  try {
    if (!runtime) throw new ProtocolError('unavailable');
    if (request.method !== 'POST' || request.url !== MOVE_ORIGIN + SOURCE_PATH || request.headers.has('origin') || request.headers.get('content-type')?.split(';')[0] !== 'application/json') throw new ProtocolError('unauthorized');
    const bytes = await boundedBody(request, 131072), body = JSON.parse(bytes.toString('utf8'));
    const action = body?.action;
    if (!['source','acknowledge','resolve'].includes(action)) throw new ProtocolError('invalid');
    const c = await verifyAssertion(request, bytes, runtime.askKey, 'ask', action === 'acknowledge' ? 'source:ack' : 'source:read', runtime.store);
    if (c.grant !== null || (action === 'acknowledge' ? c.session === null : c.session !== null)) throw new ProtocolError('unauthorized');
    await runtime.store.cleanup();
    let result: unknown;
    if (action === 'resolve' && exactObject(body, ['action','profile'])) result = await runtime.resolve(body.profile);
    else if (action === 'source' && exactObject(body, ['action','continuationRef']) && opaque(body.continuationRef)) result = await runtime.source(body.continuationRef, c.browser);
    else if (action === 'acknowledge' && exactObject(body, ['action','continuationRef','receipts']) && opaque(body.continuationRef)) {
      await runtime.acknowledge(body.continuationRef, body.receipts, c.browser);
      return Response.json({ ok: true }, { headers: PRIVATE_HEADERS });
    } else throw new ProtocolError('invalid');
    return Response.json({ ok: true, result }, { headers: PRIVATE_HEADERS });
  } catch (error) { return errorResponse(error); }
}
