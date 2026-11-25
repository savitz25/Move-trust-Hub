/**
 * Move side of CONTRACT-SCHEMA-KEY-v1 from Ask 245f626581c662f7380dadb71d1e22dcda7ee428.
 * The only approved key is move.inventory/v1. Other keys are a proposal.
 * This module does not fetch and does not remove device keys.
 */
import { TOOL_SESSION_DEVICE_KEYS, type ToolSessionDeviceKey } from '@/lib/my-trusthub/tool-session-schemas';

export const ADD_TO_MY_TRUSTHUB_ENV = 'ADD_TO_MY_TRUSTHUB';
export const PRODUCTION_VERCEL_PROJECT_ID = 'prj_gudPGeW9SZBkgiL8zxvi3Swfo6T0';
export const PRODUCTION_VERCEL_PROJECT_NAME = 'move-trust-hub';

export const APPROVED_SCHEMA_KEY = 'move.inventory/v1';
export const SCHEMA_KEY_PATTERN =
  /^[a-z][a-z0-9]*\.(inventory|plan|calculator|comparison|worksheet)\/v([1-9][0-9]{0,3})$/;

export const B2_CONTRACT_SHA = '245f626581c662f7380dadb71d1e22dcda7ee428';

export type ContractStatus = 'approved' | 'proposed';
export type SessionType = 'inventory' | 'plan' | 'calculator' | 'comparison' | 'worksheet';

export type DeviceContract = {
  deviceKey: ToolSessionDeviceKey;
  schemaKey: string;
  schemaVersion: number;
  sessionType: SessionType;
  contractStatus: ContractStatus;
};

/** One device blob maps to one proposed or approved contract key. */
export const DEVICE_CONTRACTS: readonly DeviceContract[] = [
  {
    deviceKey: TOOL_SESSION_DEVICE_KEYS.inventory,
    schemaKey: 'move.inventory/v1',
    schemaVersion: 1,
    sessionType: 'inventory',
    contractStatus: 'approved',
  },
  {
    deviceKey: TOOL_SESSION_DEVICE_KEYS.plan,
    schemaKey: 'move.plan/v1',
    schemaVersion: 1,
    sessionType: 'plan',
    contractStatus: 'proposed',
  },
  {
    deviceKey: TOOL_SESSION_DEVICE_KEYS.planLibrary,
    schemaKey: 'move.worksheet/v1',
    schemaVersion: 1,
    sessionType: 'worksheet',
    contractStatus: 'proposed',
  },
  {
    deviceKey: TOOL_SESSION_DEVICE_KEYS.quoteCheck,
    schemaKey: 'move.comparison/v1',
    schemaVersion: 1,
    sessionType: 'comparison',
    contractStatus: 'proposed',
  },
  {
    deviceKey: TOOL_SESSION_DEVICE_KEYS.compareStorage,
    schemaKey: 'move.comparison/v2',
    schemaVersion: 2,
    sessionType: 'comparison',
    contractStatus: 'proposed',
  },
];

export type ContractEnv = { flag?: string; projectId?: string; projectName?: string };

export type InventoryPayload = {
  room_counts: { total: number };
  estimated_cubic_feet: number;
};

export type InventorySummary = {
  title: string;
  primary_value: number;
  unit: 'estimated cubic feet';
  label: string;
};

export type ContractSaveRequest = {
  hub: 'move';
  sessionType: SessionType;
  schemaKey: string;
  schemaVersion: number;
  payload: InventoryPayload;
  summary: InventorySummary;
  idempotencyKey: string;
  contractStatus: ContractStatus;
  localCopy: 'keep';
};

export type ContractSaveRefusal = {
  outcome: 'refused';
  reason:
    | 'inactive'
    | 'unknown_device'
    | 'invalid_json'
    | 'payload_not_object'
    | 'payload_out_of_contract'
    | 'over_bytes'
    | 'schema_not_approved';
  localCopy: 'keep';
};

export type ContractSaveReady = {
  outcome: 'ready';
  request: ContractSaveRequest;
  localCopy: 'keep';
};

const MAX_BYTES = 65536;
const ROOMS_MIN = 1;
const ROOMS_MAX = 20;
const CUBIC_MIN = 50;
const CUBIC_MAX = 20000;
const INVENTORY_TITLE = 'Moving inventory';
export const MOVE_INVENTORY_RESUME_HREF = 'https://www.movetrusthub.com/my-move';
const RESUME_REF =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function integerInRange(value: unknown, minimum: number, maximum: number): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= minimum && value <= maximum;
}

/** Registered move.inventory/v1 payload: aggregate rooms and volume, nothing itemized. */
export function inventoryContractPayload(payload: unknown): payload is InventoryPayload {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  const record = payload as Record<string, unknown>;
  if (Object.keys(record).sort().join() !== 'estimated_cubic_feet,room_counts') return false;
  const rooms = record.room_counts;
  if (!rooms || typeof rooms !== 'object' || Array.isArray(rooms)) return false;
  const roomRecord = rooms as Record<string, unknown>;
  if (Object.keys(roomRecord).join() !== 'total') return false;
  return (
    integerInRange(roomRecord.total, ROOMS_MIN, ROOMS_MAX) &&
    integerInRange(record.estimated_cubic_feet, CUBIC_MIN, CUBIC_MAX)
  );
}

function inventorySummary(payload: InventoryPayload): InventorySummary {
  return {
    title: INVENTORY_TITLE,
    primary_value: payload.estimated_cubic_feet,
    unit: 'estimated cubic feet',
    label: `${payload.room_counts.total} rooms`,
  };
}

function projectDeviceInventory(parsed: unknown): InventoryPayload | null {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
  const root = parsed as Record<string, unknown>;
  const state =
    root.state && typeof root.state === 'object' && !Array.isArray(root.state)
      ? (root.state as Record<string, unknown>)
      : root;
  if (!Array.isArray(state.inventory)) return null;
  const rooms = new Set<string>();
  let cubic = 0;
  for (const item of state.inventory) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
    const row = item as Record<string, unknown>;
    const volume = Number(row.volume);
    const quantity = Number(row.quantity);
    if (!Number.isFinite(volume) || volume < 0 || !Number.isFinite(quantity) || quantity < 1) return null;
    cubic += volume * quantity;
    if (typeof row.room === 'string' && row.room.trim()) rooms.add(row.room.trim());
  }
  const payload = {
    room_counts: { total: rooms.size },
    estimated_cubic_feet: Math.round(cubic),
  };
  return inventoryContractPayload(payload) ? payload : null;
}

function exact(value: string | undefined): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

export function addToMyTrustHubActive(env?: ContractEnv): boolean {
  const source = env ?? {
    flag: exact(process.env[ADD_TO_MY_TRUSTHUB_ENV]),
    projectId: exact(process.env.VERCEL_PROJECT_ID),
    projectName: exact(process.env.VERCEL_PROJECT_NAME),
  };
  if (source.flag !== '1') return false;
  if (!source.projectId || !source.projectName) return false;
  if (
    source.projectId === PRODUCTION_VERCEL_PROJECT_ID ||
    source.projectName === PRODUCTION_VERCEL_PROJECT_NAME
  ) {
    return false;
  }
  return true;
}

export function deviceContract(deviceKey: string): DeviceContract | null {
  return DEVICE_CONTRACTS.find((row) => row.deviceKey === deviceKey) ?? null;
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    const source = value as Record<string, unknown>;
    return `{${Object.keys(source).sort().map((key) => `${JSON.stringify(key)}:${canonical(source[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/** Ask idempotency keys are UUIDs. The same payload keeps the same key. */
export async function inventoryIdempotencyKey(schemaKey: string, payload: InventoryPayload): Promise<string> {
  const hex = await sha256Hex(`${schemaKey}\n${canonical(payload)}`);
  const chars = hex.slice(0, 32).split('');
  chars[12] = '4';
  const variant = (Number.parseInt(chars[16], 16) & 0x3) | 0x8;
  chars[16] = variant.toString(16);
  const body = chars.join('');
  return `${body.slice(0, 8)}-${body.slice(8, 12)}-${body.slice(12, 16)}-${body.slice(16, 20)}-${body.slice(20, 32)}`;
}

export async function buildContractSaveRequest(
  deviceKey: string,
  raw: string | null,
  env?: ContractEnv
): Promise<ContractSaveReady | ContractSaveRefusal> {
  if (!addToMyTrustHubActive(env)) return { outcome: 'refused', reason: 'inactive', localCopy: 'keep' };
  const contract = deviceContract(deviceKey);
  if (!contract || !SCHEMA_KEY_PATTERN.test(contract.schemaKey)) {
    return { outcome: 'refused', reason: 'unknown_device', localCopy: 'keep' };
  }
  if (contract.contractStatus !== 'approved' || contract.schemaKey !== APPROVED_SCHEMA_KEY) {
    return { outcome: 'refused', reason: 'schema_not_approved', localCopy: 'keep' };
  }
  if (!raw) return { outcome: 'refused', reason: 'invalid_json', localCopy: 'keep' };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { outcome: 'refused', reason: 'invalid_json', localCopy: 'keep' };
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { outcome: 'refused', reason: 'payload_not_object', localCopy: 'keep' };
  }
  const payload = projectDeviceInventory(parsed);
  if (!payload) return { outcome: 'refused', reason: 'payload_out_of_contract', localCopy: 'keep' };
  const summary = inventorySummary(payload);
  const encoded = JSON.stringify(payload);
  if (new TextEncoder().encode(encoded).length > MAX_BYTES) {
    return { outcome: 'refused', reason: 'over_bytes', localCopy: 'keep' };
  }
  const request: ContractSaveRequest = {
    hub: 'move',
    sessionType: contract.sessionType,
    schemaKey: contract.schemaKey,
    schemaVersion: contract.schemaVersion,
    payload,
    summary,
    idempotencyKey: await inventoryIdempotencyKey(contract.schemaKey, payload),
    contractStatus: 'approved',
    localCopy: 'keep',
  };
  return { outcome: 'ready', request, localCopy: 'keep' };
}

export type InventoryResume =
  | { outcome: 'valid'; href: typeof MOVE_INVENTORY_RESUME_HREF; crossHub: 'unavailable' }
  | { outcome: 'refused'; reason: 'resume_ref' | 'schema' | 'payload' };

/** Resume stays on /my-move. The resume ref is checked and left out of the href. */
export function validateInventoryResume(input: {
  resumeRef: string;
  schemaKey: string;
  schemaVersion: number;
  payload: unknown;
}): InventoryResume {
  if (typeof input.resumeRef !== 'string' || !RESUME_REF.test(input.resumeRef)) {
    return { outcome: 'refused', reason: 'resume_ref' };
  }
  if (input.schemaKey !== APPROVED_SCHEMA_KEY || input.schemaVersion !== 1) {
    return { outcome: 'refused', reason: 'schema' };
  }
  if (!inventoryContractPayload(input.payload)) return { outcome: 'refused', reason: 'payload' };
  if (MOVE_INVENTORY_RESUME_HREF.includes(input.resumeRef)) {
    return { outcome: 'refused', reason: 'resume_ref' };
  }
  return { outcome: 'valid', href: MOVE_INVENTORY_RESUME_HREF, crossHub: 'unavailable' };
}

export type MemoryStore = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem?(key: string): void;
};

export type MockReceipt = {
  outcome: 'saved' | 'replayed' | 'conflict' | 'refused';
  reason?: string;
  sessionRef?: string;
  localCopy: 'keep';
};

/**
 * In-memory Ask stand-in. It accepts only the approved inventory key.
 * The same idempotency key and body replay. A changed body conflicts.
 * It never receives a device store.
 */
export function createMockAsk() {
  const seen = new Map<string, { body: string; payload: InventoryPayload; sessionRef: string }>();
  return {
    async save(request: ContractSaveRequest): Promise<MockReceipt> {
      if (request.schemaKey !== APPROVED_SCHEMA_KEY || request.contractStatus !== 'approved') {
        return { outcome: 'refused', reason: 'schema_not_approved', localCopy: 'keep' };
      }
      if (!inventoryContractPayload(request.payload)) {
        return { outcome: 'refused', reason: 'payload_out_of_contract', localCopy: 'keep' };
      }
      if (!RESUME_REF.test(request.idempotencyKey)) {
        return { outcome: 'refused', reason: 'idempotency_key', localCopy: 'keep' };
      }
      const body = canonical(request.payload);
      const prior = seen.get(request.idempotencyKey);
      if (prior && prior.body !== body) return { outcome: 'conflict', localCopy: 'keep' };
      if (prior) return { outcome: 'replayed', sessionRef: prior.sessionRef, localCopy: 'keep' };
      const sessionRef = request.idempotencyKey;
      seen.set(request.idempotencyKey, { body, payload: request.payload, sessionRef });
      return { outcome: 'saved', sessionRef, localCopy: 'keep' };
    },
    async resume(resumeRef: string): Promise<InventoryResume> {
      for (const row of seen.values()) {
        if (row.sessionRef !== resumeRef) continue;
        return validateInventoryResume({
          resumeRef,
          schemaKey: APPROVED_SCHEMA_KEY,
          schemaVersion: 1,
          payload: row.payload,
        });
      }
      return { outcome: 'refused', reason: 'resume_ref' };
    },
  };
}

export function importSelectedDeviceCopies(
  store: MemoryStore,
  items: { deviceKey: string; raw: string }[],
  selectedDeviceKeys: readonly string[]
): { outcome: 'imported' | 'refused'; written: string[]; localCopy: 'keep' } {
  if (selectedDeviceKeys.length === 0) return { outcome: 'refused', written: [], localCopy: 'keep' };
  const written: string[] = [];
  for (const item of items) {
    if (!selectedDeviceKeys.includes(item.deviceKey)) continue;
    store.setItem(item.deviceKey, item.raw);
    written.push(item.deviceKey);
  }
  return { outcome: 'imported', written, localCopy: 'keep' };
}
