import {
  TOOL_SESSION_SCHEMAS,
  TOOL_SESSION_VERSION,
  type ToolSessionDeviceKey,
  type ToolSessionSchema,
} from '@/lib/my-trusthub/tool-session-schemas';

/**
 * Add to My TrustHub is default-off.
 * A caller must pass enabled: true. No page does that in this commit.
 */
export const TOOL_SESSION_EXPORT_ENABLED = false;

export type ToolSessionStore = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export type ToolSessionSnapshot = Partial<Record<ToolSessionDeviceKey, string | null>>;

export type ToolSessionHandoff = {
  version: typeof TOOL_SESSION_VERSION;
  hub: 'move';
  schemaKey: string;
  deviceKey: ToolSessionDeviceKey;
  storage: 'local' | 'session';
  legacyTable: ToolSessionSchema['legacyTable'];
  requestKey: string;
  resumeRef: string;
  payload: unknown;
  raw: string;
};

export type ToolSessionBundle = {
  outcome: 'ready';
  sessions: ToolSessionHandoff[];
  rejected: { deviceKey: string; reason: 'invalid_json' | 'invalid_shape' }[];
};

function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortValue);
  if (value && typeof value === 'object') {
    const source = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(source).sort()) out[key] = sortValue(source[key]);
    return out;
  }
  return value;
}

export function canonicalToolJson(value: unknown): string {
  return JSON.stringify(sortValue(value));
}

export async function toolSessionRequestKey(schemaKey: string, raw: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${schemaKey}\n${raw}`)
  );
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function validInventoryItem(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return typeof value.id === 'string' && typeof value.name === 'string'
    && typeof value.volume === 'number' && typeof value.quantity === 'number';
}

/** Accept the Zustand persist blob or a saved_inventories payload. */
export function isInventoryPayload(value: unknown): boolean {
  if (!isRecord(value)) return false;
  const items = isRecord(value.state) ? value.state.inventory : value.inventory;
  return Array.isArray(items) && items.every(validInventoryItem);
}

export function isPlanPayload(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return value.step === 'route' || value.step === 'shortlist' || value.step === 'inventory' || value.step === 'report';
}

export function isPlanLibraryPayload(value: unknown): boolean {
  return Array.isArray(value) && value.every((row) => isRecord(row) && typeof row.id === 'string' && isRecord(row.plan));
}

export function isQuoteCheckPayload(value: unknown): boolean {
  return isRecord(value);
}

export function isCompareStoragePayload(value: unknown): boolean {
  if (!isRecord(value)) return false;
  const slugs = isRecord(value.state) ? value.state.selectedSlugs : value.selectedSlugs;
  return slugs === undefined || (Array.isArray(slugs) && slugs.every((slug) => typeof slug === 'string'));
}

export function isSavedMoversPayload(value: unknown): boolean {
  return Array.isArray(value) && value.every((row) => isRecord(row) && typeof row.companySlug === 'string');
}

function shapeOk(schema: ToolSessionSchema, value: unknown): boolean {
  switch (schema.deviceKey) {
    case 'move-calculator-inventory':
      return isInventoryPayload(value);
    case 'mth-my-move-plan-v1':
      return isPlanPayload(value);
    case 'mth-my-move-plans-library-v1':
      return isPlanLibraryPayload(value);
    case 'mth-quote-check-compare-a-v1':
      return isQuoteCheckPayload(value);
    case 'im-compare-storage':
      return isCompareStoragePayload(value);
    case 'mth-local-saved-movers':
      return isSavedMoversPayload(value);
    default:
      return false;
  }
}

export function collectDeviceToolSessions(input: {
  local: ToolSessionStore;
  session: ToolSessionStore;
}): ToolSessionSnapshot {
  const snapshot: ToolSessionSnapshot = {};
  for (const schema of TOOL_SESSION_SCHEMAS) {
    const store = schema.storage === 'session' ? input.session : input.local;
    snapshot[schema.deviceKey] = store.getItem(schema.deviceKey);
  }
  return snapshot;
}

export async function buildToolSessionHandoff(input: {
  enabled?: boolean;
  snapshot: ToolSessionSnapshot;
}): Promise<{ outcome: 'disabled' } | ToolSessionBundle> {
  if (input.enabled !== true) return { outcome: 'disabled' };
  const sessions: ToolSessionHandoff[] = [];
  const rejected: ToolSessionBundle['rejected'] = [];
  for (const schema of TOOL_SESSION_SCHEMAS) {
    const raw = input.snapshot[schema.deviceKey];
    if (raw == null || raw === '') continue;
    let payload: unknown;
    try {
      payload = JSON.parse(raw);
    } catch {
      rejected.push({ deviceKey: schema.deviceKey, reason: 'invalid_json' });
      continue;
    }
    if (!shapeOk(schema, payload)) {
      rejected.push({ deviceKey: schema.deviceKey, reason: 'invalid_shape' });
      continue;
    }
    const canonical = canonicalToolJson(payload);
    const requestKey = await toolSessionRequestKey(schema.schemaKey, canonical);
    sessions.push({
      version: TOOL_SESSION_VERSION,
      hub: 'move',
      schemaKey: schema.schemaKey,
      deviceKey: schema.deviceKey,
      storage: schema.storage,
      legacyTable: schema.legacyTable,
      requestKey,
      resumeRef: requestKey,
      payload,
      raw: canonical,
    });
  }
  return { outcome: 'ready', sessions, rejected };
}

/**
 * Restore one tool from resume_ref. Writes only that device key.
 * Refuses the write when the ref does not match the payload digest.
 */
export async function applyToolSessionResume(input: {
  enabled?: boolean;
  handoff: ToolSessionHandoff;
  local: ToolSessionStore;
  session: ToolSessionStore;
}): Promise<{ restored: true; deviceKey: string } | { restored: false; reason: 'disabled' | 'digest_mismatch' | 'unknown_schema' }> {
  if (input.enabled !== true) return { restored: false, reason: 'disabled' };
  const schema = TOOL_SESSION_SCHEMAS.find((row) => row.schemaKey === input.handoff.schemaKey && row.deviceKey === input.handoff.deviceKey);
  if (!schema) return { restored: false, reason: 'unknown_schema' };
  const expected = await toolSessionRequestKey(schema.schemaKey, canonicalToolJson(input.handoff.payload));
  if (input.handoff.resumeRef !== expected || input.handoff.requestKey !== expected) {
    return { restored: false, reason: 'digest_mismatch' };
  }
  const store = schema.storage === 'session' ? input.session : input.local;
  store.setItem(schema.deviceKey, input.handoff.raw);
  return { restored: true, deviceKey: schema.deviceKey };
}
