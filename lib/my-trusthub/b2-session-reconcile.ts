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

export type ContractSaveRequest = {
  hub: 'move';
  sessionType: SessionType;
  schemaKey: string;
  schemaVersion: number;
  payload: Record<string, unknown>;
  summary: { deviceKey: string; bytes: number };
  idempotencyKey: string;
  contractStatus: ContractStatus;
  localCopy: 'keep';
};

export type ContractSaveRefusal = {
  outcome: 'refused';
  reason: 'inactive' | 'unknown_device' | 'invalid_json' | 'payload_not_object' | 'over_bytes' | 'schema_not_approved';
  localCopy: 'keep';
};

export type ContractSaveReady = {
  outcome: 'ready';
  request: ContractSaveRequest;
  localCopy: 'keep';
};

const MAX_BYTES = 65536;

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
  const payload = { deviceKey: contract.deviceKey, body: parsed };
  const encoded = JSON.stringify(payload);
  if (new TextEncoder().encode(encoded).length > MAX_BYTES) {
    return { outcome: 'refused', reason: 'over_bytes', localCopy: 'keep' };
  }
  if (contract.contractStatus !== 'approved') {
    return { outcome: 'refused', reason: 'schema_not_approved', localCopy: 'keep' };
  }
  const request: ContractSaveRequest = {
    hub: 'move',
    sessionType: contract.sessionType,
    schemaKey: contract.schemaKey,
    schemaVersion: contract.schemaVersion,
    payload,
    summary: { deviceKey: contract.deviceKey, bytes: new TextEncoder().encode(encoded).length },
    idempotencyKey: await sha256Hex(`${contract.schemaKey}\n${canonical(payload)}`),
    contractStatus: 'approved',
    localCopy: 'keep',
  };
  return { outcome: 'ready', request, localCopy: 'keep' };
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
  const seen = new Map<string, { body: string; sessionRef: string }>();
  return {
    async save(request: ContractSaveRequest): Promise<MockReceipt> {
      if (request.schemaKey !== APPROVED_SCHEMA_KEY || request.contractStatus !== 'approved') {
        return { outcome: 'refused', reason: 'schema_not_approved', localCopy: 'keep' };
      }
      const body = canonical(request.payload);
      const prior = seen.get(request.idempotencyKey);
      if (prior && prior.body !== body) return { outcome: 'conflict', localCopy: 'keep' };
      if (prior) return { outcome: 'replayed', sessionRef: prior.sessionRef, localCopy: 'keep' };
      const sessionRef = request.idempotencyKey.slice(0, 8) + '-0000-4000-8000-' + request.idempotencyKey.slice(8, 20);
      seen.set(request.idempotencyKey, { body, sessionRef });
      return { outcome: 'saved', sessionRef, localCopy: 'keep' };
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
