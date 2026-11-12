import { getLocalState } from '@/lib/local-movers/states';

/** One warning per state per kind inside this process. */
export const COUNTY_LOAD_VISIBILITY_INTERVAL_MS = 5 * 60 * 1000;

export type CountyLoadVisibilityKind = 'county_partial_load' | 'snapshot_fallback';

export type CountyLoadVisibilityInput = {
  state: string;
  freshComplete: boolean;
  usedFallback: boolean;
  failedCountyCount: number;
};

export type CountyLoadCaptureContext = {
  level: 'warning';
  tags: {
    hub: 'move';
    state: string;
    kind: CountyLoadVisibilityKind;
    failed_county_count: string;
  };
  fingerprint: string[];
};

export type CountyLoadCapture = (message: string, context: CountyLoadCaptureContext) => void;

const sentAtByKey = new Map<string, number>();

export function resetCountyLoadVisibilityWindowForTests(): void {
  sentAtByKey.clear();
}

function fingerprintPrefix(kind: CountyLoadVisibilityKind): string {
  return kind === 'county_partial_load' ? 'move-county-partial-load' : 'move-county-snapshot-fallback';
}

function messageFor(kind: CountyLoadVisibilityKind, state: string): string {
  return kind === 'county_partial_load'
    ? `Move county load incomplete for ${state}`
    : `Move county load used last-good snapshot for ${state}`;
}

/**
 * State loads and sitemap evaluation both finish in one settled pass.
 * An incomplete pass emits one partial-load warning. A last-good snapshot
 * emits one fallback warning. Each kind is kept to one event per state
 * per five minutes in this process. Payloads carry the public state slug
 * and a count only.
 */
export function deliverCountyLoadVisibility(
  input: CountyLoadVisibilityInput,
  capture: CountyLoadCapture,
  options?: { now?: number; sentAt?: Map<string, number> }
): void {
  const state = getLocalState(input.state)?.slug;
  if (!state) return;
  if (!Number.isSafeInteger(input.failedCountyCount) || input.failedCountyCount < 0) return;

  const now = options?.now ?? Date.now();
  const sentAt = options?.sentAt ?? sentAtByKey;
  const kinds: CountyLoadVisibilityKind[] = [];
  if (!input.freshComplete) kinds.push('county_partial_load');
  if (input.usedFallback) kinds.push('snapshot_fallback');

  for (const kind of kinds) {
    const key = `${kind}:${state}`;
    const previous = sentAt.get(key);
    if (previous !== undefined && now - previous < COUNTY_LOAD_VISIBILITY_INTERVAL_MS) continue;
    sentAt.set(key, now);
    try {
      capture(messageFor(kind, state), {
        level: 'warning',
        tags: {
          hub: 'move',
          state,
          kind,
          failed_county_count: String(input.failedCountyCount),
        },
        fingerprint: [fingerprintPrefix(kind), state],
      });
    } catch {
      // A reporting failure must not change the county load.
    }
  }
}
