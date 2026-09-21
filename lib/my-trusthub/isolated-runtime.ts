import { createHash } from 'node:crypto';
import { MoveProfileSaveAdapter, enabled, type Dependencies, type AdapterConfig } from './profile-save-adapter';
import { parentFacade, type ScopedChannel } from './parent-facade';
import { PostgresTransferStore, type SourcePool } from './postgres-transfer-store';
import { COOKIE_NAME, type HttpDependencies } from './profile-save-http';
import { itemKey, type ItemReceipt } from './vendor/v2-3-profile-transfer';

/** Parent #185 91ff29c: additive browser route; frozen six-operation wire unchanged. */
export const PARENT_FORM_PATH = '/my/profile-save';
const hash = (s: string) => createHash('sha256').update(s).digest('hex');
const opaque = (s: unknown): s is string => typeof s === 'string' && /^[A-Za-z0-9_-]{43}$/.test(s);
export type IsolatedMovePorts = {
  /** Approved metadata, not a flag inferred from a URL or Vercel Preview status. */
  verifiedPair: { moveOrigin: string; parentOrigin: string; sourceBackend: string; isolated: true };
  sessionAffinity: 'dedicated'; pool: SourcePool;
  channel: ScopedChannel;
  resolveExactPublished: Dependencies['resolveExactPublished'];
  currentGrant: Dependencies['currentGrant'];
  /** Independent verified P13/BFF authority, NEVER a browser claim. Parent calls
   * these ports server-to-server; no invented parent grant/receipt HTTP route. */
  verifySourceCaller(proof: unknown, scope: 'source:read' | 'source:ack'): Promise<{ browserProof: string } | null>;
};
export function isolatedConfig(env: Record<string,string|undefined>, p: IsolatedMovePorts | null): AdapterConfig | null {
  if (!p || env.VERCEL_ENV === 'production' || env.NODE_ENV === 'production' && env.VERCEL_ENV !== 'preview' ||
      env.NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED !== '1' || env.MTH_MOVE_PARENT_SAVE_MODE !== 'isolated' ||
      env.MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED !== 'true' || p.verifiedPair.isolated !== true ||
      p.sessionAffinity !== 'dedicated' || p.verifiedPair.sourceBackend !== env.MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND ||
      !p.verifiedPair.sourceBackend || p.verifiedPair.sourceBackend.includes('arepfylnilkjmyduhwbz') ||
      p.verifiedPair.sourceBackend.includes('qvvxvbcdmbjzrgvwjatw') ||
      p.verifiedPair.moveOrigin !== env.MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN ||
      p.verifiedPair.parentOrigin !== env.MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN ||
      env.MTH_MOVE_PARENT_SAVE_FORM_PATH !== PARENT_FORM_PATH) return null;
  const config: AdapterConfig = { enabled:true,environment:'isolated',verifiedIsolatedPair:true,
    moveOrigin:p.verifiedPair.moveOrigin,parentOrigin:p.verifiedPair.parentOrigin,parentFormPath:PARENT_FORM_PATH };
  return enabled(config) ? config : null;
}

/** Complete source assembly; Builder 4 supplies approved pool and existing
 * verified parent/P13 ports. No credentials, fake sessions or SQLite fallback. */
export function createIsolatedMoveRuntime(env: Record<string,string|undefined>, p: IsolatedMovePorts | null) {
  const config = isolatedConfig(env,p);
  if (!config || !p) return null;
  const store = new PostgresTransferStore(p.pool,p.sessionAffinity);
  const adapter = new MoveProfileSaveAdapter({ config,store,parent:parentFacade(config,p.channel),
    resolveExactPublished:p.resolveExactPublished,currentGrant:p.currentGrant,now:Date.now });
  const http: HttpDependencies = { config,adapter,allowRequest: async request => {
    const cookie=request.headers.get('cookie')?.split(';').map(v=>v.trim()).find(v=>v.startsWith(COOKIE_NAME+'='))?.slice(COOKIE_NAME.length+1);
    // Global bootstrap quota is intentionally conservative until a browser cookie
    // exists; do not trust arbitrary forwarded IP headers or create raw IP logs.
    return store.allowRate(opaque(cookie) ? cookie : 'bootstrap');
  } };
  return {http,store,
    async source(continuationRef: string, proof: unknown) {
      const caller = await p.verifySourceCaller(proof,'source:read');
      if (!caller || !opaque(caller.browserProof)) return null;
      return store.withContinuation(continuationRef,async r => {
        if (!r || r.browserHash!==hash(caller.browserProof) || r.expiresAt<=Date.now()) return null;
        return { continuationRef:r.continuationRef,transferRef:r.parentStage.transferRef,manifest:r.manifest,
          manifestDigest:r.parentStage.manifestDigest,browserProof:caller.browserProof,expiresAt:r.expiresAt,requestPrefix:r.requestPrefix };
      });
    },
    async acknowledge(continuationRef: string, receipts: ItemReceipt[], proof: unknown) {
      const caller = await p.verifySourceCaller(proof,'source:ack');
      if (!caller || !opaque(caller.browserProof) || !receipts.length) throw Error('unauthorized_source_ack');
      await store.withContinuation(continuationRef,async (r,checkpoint) => {
        if (!r || r.browserHash!==hash(caller.browserProof) || receipts.length!==r.manifest.selected.length) throw Error('invalid_source_ack');
        const context=receipts[0]!.accountContextRef, project=receipts[0]!.project.projectRef;
        if (!opaque(context) || project!==undefined&&!opaque(project) || r.accountContextRef &&
          (r.accountContextRef!==context || r.projectRef!==project)) throw Error('source_account_changed');
        for (const [i,receipt] of receipts.entries()) {
          if (receipt.requestKey!==r.requestPrefix+':'+i || receipt.accountContextRef!==context ||
              receipt.manifestDigest!==r.parentStage.manifestDigest || receipt.project.projectRef!==project ||
              itemKey(receipt.item)!==itemKey(r.manifest.selected[i]!) || receipt.localCopy!=='keep') throw Error('invalid_source_ack');
        }
        r.accountContextRef=context;r.projectRef=project;await checkpoint();
        // An acknowledgment only binds context. It NEVER grants browser success:
        // finish still checks current parent authority and verifies each receipt.
      });
    }
  };
}
