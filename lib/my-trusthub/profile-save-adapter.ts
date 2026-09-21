/** Specialist-only service. Dependencies are server adapters, NEVER browser JSON.
 * A durable store, scoped P13 channel, approved origins and exact binding resolver
 * are mandatory. No deployed in-memory fallback, service-role fallback or new identity.
 */
import { createHash, randomBytes } from 'node:crypto';
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import type { PublicationState } from '@/lib/provider/types';
import { isSelection, projection } from './selection';
import { profileCapability, type TrustedProfile, type SaveCapability } from './vendor/v2-3-profile-save';
import { TRANSFER_VERSION, STAGING_TTL_MS, isGuestStageInput, manifestDigest, itemKey, validateProfileReturn,
  type GuestStageInput, type GuestStageRef, type ItemReceipt, type CommitInput, type TrustedOriginRegistry } from './vendor/v2-3-profile-transfer';
import type { Operation, RequestFor, ResponseFor } from './vendor/interface';

const opaque = (v: unknown): v is string => typeof v === 'string' && /^[A-Za-z0-9_-]{43}$/.test(v);
const hash = (v: string) => createHash('sha256').update(v).digest('hex');
export type BrowserBinding = { binding: string; csrfVerified: true; origin: string; environment: 'isolated' };
export type CurrentGrant = { accountContextRef: string; selectionConfirmed: true; projectRef?: string };
export type TrustedMoveRecord = {
  id: string; slug: string; publicationState?: PublicationState | null;
  // Class is supplied by reviewed mapper data, NOT assumed from local slug/US DOT.
  reviewedClass: string | null; binding: TrustedProfile['binding'];
};
export function mapMoveProfile(slug: string, row: TrustedMoveRecord | null): TrustedProfile | null {
  // Existing directory aliases include fuzzy name matching. Do not use that for Save.
  if (!row || row.slug !== slug || !row.id || row.id.length > 200 || !row.reviewedClass) return null;
  return {hub:'move',nativeId:row.id,profileClass:row.reviewedClass,
    published:isAnonymousPublicProfileAllowed(row),supportedClass:row.reviewedClass === 'mover',binding:row.binding};
}
export type TransferRecord = {
  browserHash: string; manifest: GuestStageInput; parentStage: GuestStageRef;
  continuationRef: string; requestPrefix: string; expiresAt: number;
  accountContextRef?: string; projectRef?: string;
};
export interface TransferStore {
  /** Production adapter MUST be durable with atomic uniqueness/locking, bounded TTL/rate limits. */
  putIfAbsent(ticketHash: string, record: TransferRecord): Promise<void>;
  withRecord<T>(ticketHash: string, work: (record: TransferRecord | null, checkpoint?: () => Promise<void>) => Promise<T>): Promise<T>;
}
export type AdapterConfig = {
  enabled: boolean; environment: 'isolated' | 'production'; verifiedIsolatedPair: boolean;
  moveOrigin: string; parentOrigin: string;
  // Isolated assembly supplies the reviewed fixed parent browser form route.
  parentFormPath: string | null;
};
export interface Dependencies {
  config: AdapterConfig; store: TransferStore;
  resolveExactPublished(slug: string): Promise<TrustedMoveRecord | null>;
  parent<K extends Operation>(operation: K, input: RequestFor<K>['input'], browser: BrowserBinding): Promise<ResponseFor<K>>;
  /** Verified parent-session/P13 service, not legacy Move Auth or client-supplied context. */
  currentGrant(browser: BrowserBinding, ticketHash: string): Promise<CurrentGrant | null>;
  now(): number;
}
export type AdapterResult =
  | {state:'local_only'; capability:SaveCapability; localCopy:'keep'}
  | {state:'unavailable'|'invalid'|'expired'|'account_changed'; localCopy:'keep'}
  | {state:'continue'; ticket:string; target:string; fields:{continuationRef:string}; localCopy:'keep'}
  | {state:'parent_saved'; projectFailed:boolean; returnPath:string; localCopy:'keep'};
const failure = (state:'unavailable'|'invalid'|'expired'|'account_changed'): AdapterResult => ({state,localCopy:'keep'});
function isolatedOrigin(value:string):boolean {
  try { const url=new URL(value);return url.origin===value && !url.username && !url.password &&
    ((url.protocol==='http:' && ['localhost','127.0.0.1'].includes(url.hostname)) ||
      (url.protocol==='https:' && (url.hostname.endsWith('.vercel.app') || url.hostname.endsWith('.test')))); } catch {return false;}
}
export function enabled(config:AdapterConfig):boolean {
  return config.enabled && config.environment==='isolated' && config.verifiedIsolatedPair &&
    isolatedOrigin(config.moveOrigin) && isolatedOrigin(config.parentOrigin) && config.moveOrigin!==config.parentOrigin;
}
function allowedBrowser(browser:BrowserBinding,config:AdapterConfig):boolean {
  return browser.csrfVerified===true && browser.environment==='isolated' && browser.origin===config.moveOrigin && opaque(browser.binding);
}
function sameGrant(a:CurrentGrant|null,b:CurrentGrant):boolean {
  return !!a && a.selectionConfirmed===true && a.accountContextRef===b.accountContextRef && a.projectRef===b.projectRef;
}
function matches(receipt:ItemReceipt|null,input:CommitInput):receipt is ItemReceipt {
  return !!receipt && opaque(receipt.receiptRef) && receipt.localCopy==='keep' && receipt.requestKey===input.requestKey &&
    receipt.accountContextRef===input.accountContextRef && receipt.manifestDigest===input.manifestDigest &&
    !!receipt.item && itemKey(receipt.item)===itemKey(input.item) && receipt.project?.projectRef===input.projectRef &&
    (input.projectRef ? ['added','already_member','failed'].includes(receipt.project.outcome) : receipt.project.outcome==='not_requested') &&
    ['saved','already_saved'].includes(receipt.parent?.outcome) && typeof receipt.parent.savedRef==='string' && /^[A-Za-z0-9_-]{1,200}$/.test(receipt.parent.savedRef);
}
export class MoveProfileSaveAdapter {
  constructor(private readonly dependencies:Dependencies) {}
  async prepare(selection:unknown,browser:BrowserBinding):Promise<AdapterResult> {
    const d=this.dependencies;
    if(!enabled(d.config))return failure('unavailable');
    if(!allowedBrowser(browser,d.config) || !isSelection(selection))return failure('invalid');
    try {
      const selected:GuestStageInput['selected']=[];
      for(const row of selection) {
        if(hash(projection(row.companySlug,row.savedAt))!==row.digest)return failure('invalid');
        const trusted=mapMoveProfile(row.companySlug,await d.resolveExactPublished(row.companySlug));
        if(!trusted)return {state:'local_only',capability:'IDENTITY_REVIEW_REQUIRED',localCopy:'keep'};
        const capability=profileCapability(trusted);
        if(capability!=='SAVE_SUPPORTED')return {state:'local_only',capability,localCopy:'keep'};
        selected.push({localItemId:row.companySlug,revision:row.revision,digest:row.digest,
          profile:{hub:'move',nativeId:trusted.nativeId,profileClass:trusted.profileClass}});
      }
      const manifest:GuestStageInput={version:TRANSFER_VERSION,sourceHub:'move',audience:'ask',selected,
        returnTask:{kind:'profile',hub:'move',canonicalSlug:selection[0]!.companySlug,profile:selected[0]!.profile}};
      if(!isGuestStageInput(manifest))return failure('invalid');
      // Require the server-bound route; browser input cannot choose a destination.
      const path=d.config.parentFormPath;
      if(!path || !/^\/[a-z0-9/-]+$/.test(path) || path.startsWith('//') || path.includes('..'))return failure('unavailable');
      const stage=await d.parent('prepareGuestProfileTransfer',manifest,browser);
      if(!stage.ok || !opaque(stage.result.transferRef) || stage.result.manifestDigest!==manifestDigest(manifest) ||
        !Number.isFinite(stage.result.expiresAt) || stage.result.expiresAt<=d.now() || stage.result.expiresAt>d.now()+STAGING_TTL_MS)return failure('unavailable');
      const continuation=await d.parent('prepareProfileSaveContinuation',{sourceHub:'move',audience:'ask',...{
        transferRef:stage.result.transferRef,manifestDigest:stage.result.manifestDigest}},browser);
      if(!continuation.ok || !opaque(continuation.result.continuationRef) || !Number.isFinite(continuation.result.expiresAt) ||
        continuation.result.expiresAt<=d.now() || continuation.result.expiresAt>stage.result.expiresAt)return failure('unavailable');
      const ticket=randomBytes(32).toString('base64url');
      await d.store.putIfAbsent(hash(ticket),{browserHash:hash(browser.binding),manifest,parentStage:stage.result,
        continuationRef:continuation.result.continuationRef,requestPrefix:randomBytes(32).toString('base64url'),expiresAt:continuation.result.expiresAt});
      return {state:'continue',ticket,target:d.config.parentOrigin+path,fields:{continuationRef:continuation.result.continuationRef},localCopy:'keep'};
    } catch {return failure('unavailable');}
  }
  /** Browser gives only its opaque ticket and current selected projection. Parent
   * derives identity, approval and optional Project through the verified channel.
   * No URL completion flag, consumer ID, Project ID or receipt body is authority.
   */
  async finish(ticket:unknown,selection:unknown,browser:BrowserBinding):Promise<AdapterResult> {
    const d=this.dependencies;
    if(!enabled(d.config))return failure('unavailable');
    if(!allowedBrowser(browser,d.config) || !opaque(ticket) || !isSelection(selection))return failure('invalid');
    try {return await d.store.withRecord(hash(ticket),async (record, checkpoint)=>{
      if(!record || record.browserHash!==hash(browser.binding))return failure('invalid');
      if(selection.length!==record.manifest.selected.length || selection.some((row,i)=>{
        const item=record.manifest.selected[i]!;
        return row.companySlug!==item.localItemId || row.revision!==item.revision || row.digest!==item.digest || hash(projection(row.companySlug,row.savedAt))!==item.digest;
      }))return failure('invalid');
      const grant=await d.currentGrant(browser,hash(ticket));
      if(!grant || !grant.selectionConfirmed || !opaque(grant.accountContextRef) || (grant.projectRef!==undefined && !opaque(grant.projectRef)))return failure('unavailable');
      if(record.accountContextRef && !sameGrant(grant,{accountContextRef:record.accountContextRef,projectRef:record.projectRef,selectionConfirmed:true}))return failure('account_changed');
      if(!record.accountContextRef && record.expiresAt<=d.now())return failure('expired');
      // withRecord must persist this binding atomically, including on lost responses.
      record.accountContextRef=grant.accountContextRef;record.projectRef=grant.projectRef;
      // Persist ownership BEFORE any remote commit. A lost response or process
      // crash must never roll this binding back and allow a different account.
      await checkpoint?.();
      let projectFailed=false;
      for(const [index,item] of record.manifest.selected.entries()) {
        if(!sameGrant(await d.currentGrant(browser,hash(ticket)),grant))return failure('account_changed');
        const input:CommitInput={requestKey:record.requestPrefix+':'+index,accountContextRef:grant.accountContextRef,
          transferRef:record.parentStage.transferRef,manifestDigest:record.parentStage.manifestDigest,item,...(grant.projectRef?{projectRef:grant.projectRef}:{})};
        const lookup=await d.parent('getProfileSaveReceipt',{requestKey:input.requestKey,accountContextRef:input.accountContextRef},browser);
        if(!lookup.ok)return failure('unavailable');
        let receipt=lookup.result;
        if(!receipt){
          if(record.expiresAt<=d.now())return failure('expired');
          // Publication/binding rechecked locally and again by the parent at commit.
          const current=mapMoveProfile(item.localItemId,await d.resolveExactPublished(item.localItemId));
          if(!current || current.nativeId!==item.profile.nativeId)return failure('invalid');
          const capability=profileCapability(current);
          if(capability!=='SAVE_SUPPORTED')return {state:'local_only',capability,localCopy:'keep'};
          const commit=await d.parent('commitProfileSave',input,browser);
          if(!commit.ok)return failure('unavailable');receipt=commit.result;
        }
        if(!matches(receipt,input))return failure('unavailable');
        const verified=await d.parent('verifyProfileSaveReceipt',{requestKey:input.requestKey,accountContextRef:input.accountContextRef,
          receiptRef:receipt.receiptRef,manifestDigest:input.manifestDigest,item,...(grant.projectRef?{projectRef:grant.projectRef}:{})},browser);
        if(!verified.ok || !matches(verified.result,input) || verified.result.receiptRef!==receipt.receiptRef)return failure('unavailable');
        if(!sameGrant(await d.currentGrant(browser,hash(ticket)),grant))return failure('account_changed');
        projectFailed ||= verified.result.project.outcome==='failed';
      }
      const registry:TrustedOriginRegistry={environment:'isolated',isolatedBackendVerified:true,
        origins:{move:d.config.moveOrigin,insurance:'https://insurance.test',lender:'https://lender.test'}};
      const path='/companies/'+record.manifest.returnTask.canonicalSlug;
      if(!validateProfileReturn(path,record.manifest.returnTask,registry))return failure('invalid');
      return {state:'parent_saved',projectFailed,returnPath:path,localCopy:'keep'};
    });}catch{return failure('unavailable');}
  }
}
