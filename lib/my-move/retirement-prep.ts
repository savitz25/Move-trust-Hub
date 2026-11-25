/**
 * My Move retirement preparation. Default-off and local.
 * Production project identity never activates this module.
 * It does not fetch, does not open a database client, and does not write legacy rows.
 */

export const MY_MOVE_RETIREMENT_PREP_ENV = 'MY_MOVE_RETIREMENT_PREP';
export const MY_MOVE_RETIREMENT_PREP_ON = '1';

export const PRODUCTION_VERCEL_PROJECT_ID = 'prj_gudPGeW9SZBkgiL8zxvi3Swfo6T0';
export const PRODUCTION_VERCEL_PROJECT_NAME = 'move-trust-hub';

export const LEGACY_TABLES = [
  'user_profiles',
  'saved_inventories',
  'saved_movers',
  'saved_comparisons',
  'saved_move_plans',
] as const;

export type LegacyTable = (typeof LEGACY_TABLES)[number];

export const LEGACY_EXPORT_WINDOW_DAYS = 180;

/** Proposed B2 path. Callers must not fetch it from this module. */
export const LINK_NOT_MERGE_PATH = '/api/my-trusthub/link-not-merge';

export type RetirementEnv = {
  flag?: string;
  projectId?: string;
  projectName?: string;
};

export type HubSessionProof = {
  hub: 'move' | 'my-trusthub';
  sessionId: string;
};

export type LinkNotMergeInput = {
  moveSession: HubSessionProof | null;
  myTrustHubSession: HubSessionProof | null;
  consent: boolean;
  email?: string | null;
};

export type LinkNotMergeReady = {
  outcome: 'ready';
  method: 'POST';
  path: typeof LINK_NOT_MERGE_PATH;
  consent: true;
  hubs: ['move', 'my-trusthub'];
  moveSessionId: string;
  myTrustHubSessionId: string;
  legacyTablesUntouched: typeof LEGACY_TABLES;
  mutations: [];
  requestKey: string;
};

export type LinkNotMergeRefusal = {
  outcome: 'refused';
  reason:
    | 'inactive'
    | 'missing_move_session'
    | 'missing_my_trusthub_session'
    | 'hub_mismatch'
    | 'consent_required'
    | 'email_only'
    | 'email_shaped_session';
};

export type LegacyExportRow = {
  table: LegacyTable;
  id: string;
  recordedAt: string;
  payload: unknown;
};

export type LegacyExportAccessWindow = 'inside' | 'outside';

export type LegacyExportDocumentRow = LegacyExportRow & {
  accessWindow: LegacyExportAccessWindow;
};

export type LegacyExportReady = {
  outcome: 'ready';
  format: 'json';
  windowDays: typeof LEGACY_EXPORT_WINDOW_DAYS;
  asOf: string;
  userInitiated: true;
  rows: LegacyExportDocumentRow[];
  omitted: number;
  deleted: false;
};

export type LegacyExportRefusal = {
  outcome: 'refused';
  reason: 'inactive' | 'not_user_initiated';
};

const DAY_MS = 24 * 60 * 60 * 1000;

function exact(value: string | undefined): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function readEnv(env: RetirementEnv | undefined): RetirementEnv {
  if (env) return env;
  return {
    flag: exact(process.env[MY_MOVE_RETIREMENT_PREP_ENV]),
    projectId: exact(process.env.VERCEL_PROJECT_ID),
    projectName: exact(process.env.VERCEL_PROJECT_NAME),
  };
}

/** True only for exact "1" on a non-production project. No trim. Missing identity stays off. */
export function myMoveRetirementPrepActive(env?: RetirementEnv): boolean {
  const source = readEnv(env);
  if (source.flag !== MY_MOVE_RETIREMENT_PREP_ON) return false;
  if (!source.projectId || !source.projectName) return false;
  if (
    source.projectId === PRODUCTION_VERCEL_PROJECT_ID ||
    source.projectName === PRODUCTION_VERCEL_PROJECT_NAME
  ) {
    return false;
  }
  return true;
}

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

function canonical(value: unknown): string {
  return JSON.stringify(sortValue(value));
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function emailShaped(value: string): boolean {
  return value.includes('@');
}

/**
 * Hub side of link-not-merge. Both live session proofs and consent are required.
 * Email is never an identity. The returned object is not sent.
 */
export async function buildLinkNotMergeRequest(
  input: LinkNotMergeInput,
  env?: RetirementEnv
): Promise<LinkNotMergeReady | LinkNotMergeRefusal> {
  if (!myMoveRetirementPrepActive(env)) return { outcome: 'refused', reason: 'inactive' };

  const move = input.moveSession;
  const mine = input.myTrustHubSession;
  if (input.email && (!move || !mine)) return { outcome: 'refused', reason: 'email_only' };
  if (!move) return { outcome: 'refused', reason: 'missing_move_session' };
  if (!mine) return { outcome: 'refused', reason: 'missing_my_trusthub_session' };
  if (move.hub !== 'move' || mine.hub !== 'my-trusthub') {
    return { outcome: 'refused', reason: 'hub_mismatch' };
  }
  if (emailShaped(move.sessionId) || emailShaped(mine.sessionId)) {
    return { outcome: 'refused', reason: 'email_shaped_session' };
  }
  if (input.consent !== true) return { outcome: 'refused', reason: 'consent_required' };

  const body = {
    consent: true as const,
    hubs: ['move', 'my-trusthub'] as ['move', 'my-trusthub'],
    legacyTablesUntouched: LEGACY_TABLES,
    moveSessionId: move.sessionId,
    mutations: [] as [],
    myTrustHubSessionId: mine.sessionId,
    path: LINK_NOT_MERGE_PATH,
  };
  return {
    outcome: 'ready',
    method: 'POST',
    ...body,
    requestKey: await sha256Hex(canonical(body)),
  };
}

function isLegacyTable(value: string): value is LegacyTable {
  return (LEGACY_TABLES as readonly string[]).includes(value);
}

/**
 * User-initiated JSON export. 180 days is the access window.
 * Older rows stay in the document with accessWindow "outside".
 * Future rows, unknown tables, and unreadable dates are counted in omitted.
 * Nothing is deleted.
 */
export function buildLegacyExport(
  input: {
    userInitiated: boolean;
    asOf: string;
    rows: readonly LegacyExportRow[];
  },
  env?: RetirementEnv
): LegacyExportReady | LegacyExportRefusal {
  if (!myMoveRetirementPrepActive(env)) return { outcome: 'refused', reason: 'inactive' };
  if (input.userInitiated !== true) return { outcome: 'refused', reason: 'not_user_initiated' };

  const asOfMs = Date.parse(input.asOf);
  const windowMs = LEGACY_EXPORT_WINDOW_DAYS * DAY_MS;
  const rows: LegacyExportDocumentRow[] = [];
  let omitted = 0;
  for (const row of input.rows) {
    const recordedMs = Date.parse(row.recordedAt);
    const placeable =
      isLegacyTable(row.table) &&
      Number.isFinite(asOfMs) &&
      Number.isFinite(recordedMs) &&
      recordedMs <= asOfMs;
    if (!placeable) {
      omitted += 1;
      continue;
    }
    const accessWindow: LegacyExportAccessWindow =
      asOfMs - recordedMs <= windowMs ? 'inside' : 'outside';
    rows.push({
      table: row.table,
      id: row.id,
      recordedAt: row.recordedAt,
      payload: row.payload,
      accessWindow,
    });
  }

  return {
    outcome: 'ready',
    format: 'json',
    windowDays: LEGACY_EXPORT_WINDOW_DAYS,
    asOf: input.asOf,
    userInitiated: true,
    rows,
    omitted,
    deleted: false,
  };
}
