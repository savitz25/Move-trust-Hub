import { createHash } from 'node:crypto';
import { ASK_ORIGIN, MOVE_ORIGIN, FORM_PATH, opaque } from './config';
import { MoveProfileSaveAdapter, type AdapterConfig, type BrowserBinding } from './profile-save-adapter';
import { PostgresTransferStore, type SourcePool } from './postgres-transfer-store';
import { ParentChannel } from './parent-channel';
import { resolveExactPublished, resolveSource, type PublicationReader } from './exact-publication';
import { ProtocolError } from './errors';
import type { AssertionKey } from './service-assertion';
import { isSelectedItem, itemKey, type ItemReceipt } from './vendor/v2-3-profile-transfer';

export const hash = (s: string) => createHash('sha256').update(s).digest('hex');
export const CONFIG: AdapterConfig = { enabled: true, environment: 'isolated', verifiedIsolatedPair: true, moveOrigin: MOVE_ORIGIN, parentOrigin: ASK_ORIGIN, parentFormPath: FORM_PATH };
export type RuntimePorts = { pool: SourcePool; readPublication: PublicationReader; parent: ParentChannel; askKey: AssertionKey };

/** Concrete protocol assembly. Production routes construct only from gated,
 * verified infrastructure. Test doubles belong exclusively to local tests. */
export function createMoveRuntime(ports: RuntimePorts) {
  const store = new PostgresTransferStore(ports.pool, 'dedicated');
  const adapter = new MoveProfileSaveAdapter({ config: CONFIG, store, now: Date.now,
    resolveExactPublished: (slug, browser) => resolveExactPublished(slug, browser, ports.readPublication, ports.parent),
    parent: (op, input, browser, grant) => ports.parent.operation(op, input, browser, grant),
    currentGrant: (browser, continuation, proof) => ports.parent.currentGrant(continuation, proof, browser.binding) });
  return { store, adapter, askKey: ports.askKey,
    resolve: (profile: unknown) => resolveSource(profile, ports.readPublication),
    async challenge(ticket: string, browser: BrowserBinding) {
      if (!opaque(ticket)) throw new ProtocolError('invalid');
      return store.withRecord(hash(ticket), async record => {
        if (!record || record.browserHash !== hash(browser.binding)) throw new ProtocolError('unauthorized');
        return ports.parent.challenge(record.continuationRef, browser.binding);
      });
    },
    async source(continuation: string, browser: string) {
      return store.withContinuation(continuation, async r => {
        if (!r || r.browserHash !== hash(browser)) throw new ProtocolError('unauthorized');
        if (r.expiresAt <= Date.now()) throw new ProtocolError('expired');
        return { continuationRef: r.continuationRef, transferRef: r.parentStage.transferRef, manifest: r.manifest,
          manifestDigest: r.parentStage.manifestDigest, browserProof: browser, expiresAt: r.expiresAt, requestPrefix: r.requestPrefix };
      });
    },
    async acknowledge(continuation: string, receipts: unknown, browser: string) {
      if (!Array.isArray(receipts) || !receipts.length || receipts.length > 50) throw new ProtocolError('invalid');
      return store.withContinuation(continuation, async (r, checkpoint) => {
        if (!r || r.browserHash !== hash(browser) || receipts.length !== r.manifest.selected.length) throw new ProtocolError('unauthorized');
        const context = receipts[0]?.accountContextRef, project = receipts[0]?.project?.projectRef;
        if (!opaque(context) || project !== undefined && !opaque(project) || r.accountContextRef && (r.accountContextRef !== context || r.projectRef !== project)) throw new ProtocolError('conflict');
        for (const [i, v] of receipts.entries()) {
          const receipt = v as ItemReceipt;
          if (!receipt || !opaque(receipt.receiptRef) || !isSelectedItem(receipt.item) || receipt.requestKey !== r.requestPrefix + ':' + i || receipt.accountContextRef !== context ||
            receipt.manifestDigest !== r.parentStage.manifestDigest || receipt.project?.projectRef !== project ||
            itemKey(receipt.item) !== itemKey(r.manifest.selected[i]) || receipt.localCopy !== 'keep' || !['saved','already_saved'].includes(receipt.parent?.outcome)) throw new ProtocolError('invalid');
        }
        r.accountContextRef = context; r.projectRef = project; await checkpoint();
        // Acknowledgment binds immutable owner context only. It cannot supply a
        // current grant or return browser success, even with authentic receipts.
      });
    },
  };
}
export type MoveRuntime = ReturnType<typeof createMoveRuntime>;
