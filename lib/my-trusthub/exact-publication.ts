import { PROFILE, PROFILE_SLUG, exactObject, exactProfile } from './config';
import { ProtocolError } from './errors';
import { boundedBody } from './service-assertion';
import type { TrustedMoveRecord } from './profile-save-adapter';
import type { ParentChannel } from './parent-channel';

export type PublicRow = { id: string; slug: string; publication_state: string | null };
export type PublicationReader = () => Promise<PublicRow[]>;
export type Publication = { identity: typeof PROFILE; canonicalSlug: string; publicationState: 'PUBLISHABLE'; reviewedClass: 'mover'; checkedAt: number };

/** The founder-reviewed mover mapping is exact, not inferred from a page, name,
 * generic directory visibility or the browser. Current publication is read afresh. */
export async function resolveSource(profile: unknown, read: PublicationReader, now = Date.now): Promise<Publication> {
  if (!exactProfile(profile)) throw new ProtocolError('invalid');
  const rows = await read();
  if (rows.length !== 1 || rows[0].id !== PROFILE.nativeId || rows[0].slug !== PROFILE_SLUG || rows[0].publication_state !== 'PUBLISHABLE') throw new ProtocolError('unavailable');
  return { identity: PROFILE, canonicalSlug: PROFILE_SLUG, publicationState: 'PUBLISHABLE', reviewedClass: 'mover', checkedAt: now() };
}

/** Anonymous public REST SELECT only. Never use the legacy service-role client,
 * cookies, Auth, directory cache, seed fallback, RPC or fuzzy alias resolver. */
export function publicPublicationReader(origin: string, publicKey: string, send: typeof fetch = fetch): PublicationReader {
  const allowed = 'https://arepfylnilkjmyduhwbz.supabase.co';
  if (origin !== allowed || !publicKey) throw new ProtocolError('unavailable');
  // Only an anon JWT or publishable API key can enter this read-only client.
  if (!publicKey.startsWith('sb_publishable_')) {
    try { if (JSON.parse(Buffer.from(publicKey.split('.')[1], 'base64url').toString('utf8')).role !== 'anon') throw 0; }
    catch { throw new ProtocolError('unavailable'); }
  }
  return async () => {
    const url = new URL('/rest/v1/companies', allowed);
    url.searchParams.set('select', 'id,slug,publication_state');
    url.searchParams.set('id', 'eq.' + PROFILE.nativeId);
    url.searchParams.set('slug', 'eq.' + PROFILE_SLUG);
    url.searchParams.set('limit', '2');
    const response = await send(url, { method: 'GET', cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(5000), headers: { apikey: publicKey } });
    if (!response.ok || response.redirected) throw new ProtocolError('unavailable');
    const rows = JSON.parse((await boundedBody(response, 4096)).toString('utf8'));
    if (!Array.isArray(rows) || rows.some(r => !exactObject(r, ['id', 'slug', 'publication_state']))) throw new ProtocolError('unavailable');
    return rows;
  };
}

export async function resolveExactPublished(slug: string, browser: string, read: PublicationReader, parent: Pick<ParentChannel, 'binding'>): Promise<TrustedMoveRecord | null> {
  if (slug !== PROFILE_SLUG) return null;
  const source = await resolveSource(PROFILE, read);
  const metadata = await parent.binding(browser);
  if (!exactObject(metadata, ['profile', 'binding']) || !exactProfile(metadata.profile) || !exactObject(metadata.binding, ['id', 'networkEntityId', 'status'])) return null;
  const binding = metadata.binding;
  const uuid = (v: unknown): v is string => typeof v === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
  if (binding.status !== 'accepted' || !uuid(binding.id) || !uuid(binding.networkEntityId)) return null;
  return { id: source.identity.nativeId, slug, publicationState: source.publicationState, reviewedClass: source.reviewedClass,
    binding: { id: binding.id, networkEntityId: binding.networkEntityId, status: 'accepted' } };
}
