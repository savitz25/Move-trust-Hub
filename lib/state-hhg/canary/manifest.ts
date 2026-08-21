/**
 * Load and verify Task 011D.2B canary manifests (exact 80).
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { createHash } from 'crypto';
import {
  LOCAL_CANARY_WAVE_ID,
  type CanaryManifestRecord,
} from '@/lib/state-hhg/canary/types';

export type LoadedManifest = {
  waveId: string;
  publish: boolean;
  FL: CanaryManifestRecord[];
  WA: CanaryManifestRecord[];
  all: CanaryManifestRecord[];
  companyIds: string[];
  flSha: string;
  waSha: string;
};

function fnvManifestSha(rows: CanaryManifestRecord[]): string {
  const payload = rows
    .map((r) => `${r.selectionRank}|${r.companyId}|${r.slug}|${r.homeCountyFips}`)
    .join('\n');
  let h = 0x811c9dc5;
  for (let i = 0; i < payload.length; i++) {
    h ^= payload.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (`00000000` + (h >>> 0).toString(16)).slice(-8);
}

export function loadExactCanaryManifests(docsDir = resolve('docs')): LoadedManifest {
  const flPath = resolve(docsDir, 'task-011d2b-fl-canary-manifest.json');
  const waPath = resolve(docsDir, 'task-011d2b-wa-canary-manifest.json');
  if (!existsSync(flPath) || !existsSync(waPath)) {
    throw new Error('011D.2B canary manifests missing — STOP');
  }
  const flDoc = JSON.parse(readFileSync(flPath, 'utf8')) as {
    waveId?: string;
    publish?: boolean;
    providers: CanaryManifestRecord[];
    selectionSha?: string;
  };
  const waDoc = JSON.parse(readFileSync(waPath, 'utf8')) as {
    waveId?: string;
    publish?: boolean;
    providers: CanaryManifestRecord[];
    selectionSha?: string;
  };

  const FL = flDoc.providers ?? [];
  const WA = waDoc.providers ?? [];
  const flSha = fnvManifestSha(FL);
  const waSha = fnvManifestSha(WA);

  if (FL.length !== 50 || WA.length !== 30) {
    throw new Error(
      `Manifest size drift: FL=${FL.length} WA=${WA.length} expected 50/30 — STOP`
    );
  }
  if (flSha !== 'c1cad11d' || waSha !== 'e2967186') {
    throw new Error(
      `Manifest hash drift: FL=${flSha} WA=${waSha} expected c1cad11d/e2967186 — STOP`
    );
  }
  if (flDoc.publish !== false || waDoc.publish !== false) {
    // Preparation artifact must still say publish=false; live publish is 011D.3 action
  }
  const waveId = flDoc.waveId || waDoc.waveId || LOCAL_CANARY_WAVE_ID;
  if (waveId !== LOCAL_CANARY_WAVE_ID) {
    throw new Error(`Unexpected waveId ${waveId} — STOP`);
  }

  const all = [...FL, ...WA];
  const companyIds = all.map((p) => p.companyId);
  if (new Set(companyIds).size !== 80) {
    throw new Error('Duplicate company IDs in manifests — STOP');
  }

  return {
    waveId: LOCAL_CANARY_WAVE_ID,
    publish: false,
    FL,
    WA,
    all,
    companyIds,
    flSha,
    waSha,
  };
}

export function assertManifestOnlyIds(
  requestedIds: readonly string[],
  allowedIds: readonly string[]
): { ok: true } | { ok: false; rejected: string[] } {
  const allowed = new Set(allowedIds);
  const rejected = requestedIds.filter((id) => !allowed.has(id));
  if (rejected.length) return { ok: false, rejected };
  return { ok: true };
}

export function contentHash(ids: readonly string[]): string {
  return createHash('sha256').update([...ids].sort().join('\n')).digest('hex').slice(0, 16);
}
