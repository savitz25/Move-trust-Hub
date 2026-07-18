/**
 * Multi-plan library for My Move Reports.
 * Guests: localStorage. Active wizard plan remains in sessionStorage.
 */

import { computeMoveReadiness } from '@/lib/my-move-plan/readiness';
import { planInventoryTotals } from '@/lib/my-move-plan/inventory';
import { estimateWeight, getMoveRecommendation } from '@/lib/moving-calculator/estimates';
import {
  EMPTY_PLAN_STATE,
  type MyMovePlanState,
} from '@/lib/my-move-plan/types';
import { loadMyMovePlan, saveMyMovePlan } from '@/lib/my-move-plan/storage';

export const PLAN_LIBRARY_KEY = 'mth-my-move-plans-library-v1';
export const ACTIVE_PLAN_ID_KEY = 'mth-my-move-plan-active-id';

export type MovePlanRecord = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  plan: MyMovePlanState;
  readiness: number;
  /** Present when synced from Supabase */
  cloudId?: string | null;
};

function newId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `plan-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function buildPlanName(plan: MyMovePlanState | null | undefined): string {
  const from = plan?.fromPlace?.label?.split(',')[0]?.trim() || 'Origin';
  const to = plan?.toPlace?.label?.split(',')[0]?.trim();
  const route = to ? `${from} → ${to}` : from;
  const { totalVolume } = planInventoryTotals(plan?.inventory);
  if (totalVolume > 0) {
    return `${route} · ${totalVolume.toLocaleString()} cu ft`;
  }
  const shortlist = Array.isArray(plan?.shortlist) ? plan!.shortlist : [];
  if (shortlist.length > 0) {
    return `${route} · ${shortlist.length} mover${shortlist.length === 1 ? '' : 's'}`;
  }
  return route;
}

export function planStats(plan: MyMovePlanState) {
  const safePlan: MyMovePlanState = {
    ...EMPTY_PLAN_STATE,
    ...plan,
    shortlist: Array.isArray(plan?.shortlist) ? plan.shortlist.filter(Boolean) : [],
    inventory: Array.isArray(plan?.inventory) ? plan.inventory.filter(Boolean) : [],
  };
  const { totalVolume, totalItems } = planInventoryTotals(safePlan.inventory);
  const weight = estimateWeight(totalVolume);
  const truck = getMoveRecommendation(totalVolume);
  return {
    totalVolume,
    totalItems,
    weight,
    truckLabel: truck.truck,
    truckSize: truck.label,
    readiness: computeMoveReadiness(safePlan),
    routeFrom: safePlan.fromPlace?.label ?? null,
    routeTo: safePlan.toPlace?.label ?? null,
    drivingMiles: safePlan.drivingMiles,
    shortlistNames: safePlan.shortlist
      .map((m) => m?.name)
      .filter((n): n is string => typeof n === 'string' && n.trim().length > 0),
    shortlistCount: safePlan.shortlist.length,
  };
}

function readLibraryRaw(): MovePlanRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PLAN_LIBRARY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MovePlanRecord[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((p) => p && typeof p.id === 'string' && p.plan)
      .map((p) => ({
        ...p,
        plan: {
          ...EMPTY_PLAN_STATE,
          ...p.plan,
          shortlist: Array.isArray(p.plan.shortlist) ? p.plan.shortlist : [],
          inventory: Array.isArray(p.plan.inventory) ? p.plan.inventory : [],
        },
        archived: Boolean(p.archived),
        readiness: typeof p.readiness === 'number' ? p.readiness : computeMoveReadiness(p.plan),
      }));
  } catch {
    return [];
  }
}

function writeLibrary(records: MovePlanRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PLAN_LIBRARY_KEY, JSON.stringify(records));
  } catch {
    // quota
  }
}

export function listLocalPlans(opts?: { includeArchived?: boolean }): MovePlanRecord[] {
  const all = readLibraryRaw();
  const filtered = opts?.includeArchived ? all : all.filter((p) => !p.archived);
  return filtered.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getLocalPlan(id: string): MovePlanRecord | null {
  return readLibraryRaw().find((p) => p.id === id) ?? null;
}

export function getActivePlanId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(ACTIVE_PLAN_ID_KEY);
  } catch {
    return null;
  }
}

export function setActivePlanId(id: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (!id) localStorage.removeItem(ACTIVE_PLAN_ID_KEY);
    else localStorage.setItem(ACTIVE_PLAN_ID_KEY, id);
  } catch {
    // ignore
  }
}

/**
 * Upsert the current wizard plan into the local library.
 * Creates a new record if no active id / not found.
 */
export function upsertActivePlanFromState(
  state: MyMovePlanState,
  opts?: { forceNew?: boolean; name?: string }
): MovePlanRecord {
  const now = new Date().toISOString();
  const library = readLibraryRaw();
  const activeId = opts?.forceNew ? null : getActivePlanId();
  const existingIdx = activeId ? library.findIndex((p) => p.id === activeId) : -1;

  const plan: MyMovePlanState = {
    ...EMPTY_PLAN_STATE,
    ...state,
    shortlist: Array.isArray(state?.shortlist) ? state.shortlist.filter(Boolean) : [],
    inventory: Array.isArray(state?.inventory) ? state.inventory.filter(Boolean) : [],
    updatedAt: now,
  };
  const readiness = computeMoveReadiness(plan);
  const name = opts?.name?.trim() || buildPlanName(plan);

  if (existingIdx >= 0) {
    const prev = library[existingIdx];
    const updated: MovePlanRecord = {
      ...prev,
      name: opts?.name?.trim() ? name : prev.name || name,
      updatedAt: now,
      plan,
      readiness,
      archived: false,
    };
    library[existingIdx] = updated;
    writeLibrary(library);
    setActivePlanId(updated.id);
    return updated;
  }

  const created: MovePlanRecord = {
    id: newId(),
    name,
    createdAt: now,
    updatedAt: now,
    archived: false,
    plan,
    readiness,
  };
  library.unshift(created);
  writeLibrary(library);
  setActivePlanId(created.id);
  return created;
}

/** Save whatever is currently in sessionStorage into the library. */
export function snapshotSessionPlanToLibrary(): MovePlanRecord | null {
  const session = loadMyMovePlan();
  if (!session?.fromPlace && !(session?.inventory?.length)) return null;
  // Need at least a route or inventory to be meaningful
  if (!session.fromPlace && session.inventory.length === 0) return null;
  return upsertActivePlanFromState(session);
}

export function openPlanInSession(id: string): MovePlanRecord | null {
  const record = getLocalPlan(id);
  if (!record) return null;
  saveMyMovePlan(record.plan);
  setActivePlanId(record.id);
  return record;
}

export function deleteLocalPlan(id: string): void {
  const next = readLibraryRaw().filter((p) => p.id !== id);
  writeLibrary(next);
  if (getActivePlanId() === id) setActivePlanId(null);
}

export function archiveLocalPlan(id: string, archived = true): void {
  const library = readLibraryRaw();
  const idx = library.findIndex((p) => p.id === id);
  if (idx < 0) return;
  library[idx] = {
    ...library[idx],
    archived,
    updatedAt: new Date().toISOString(),
  };
  writeLibrary(library);
}

export function renameLocalPlan(id: string, name: string): void {
  const library = readLibraryRaw();
  const idx = library.findIndex((p) => p.id === id);
  if (idx < 0) return;
  library[idx] = {
    ...library[idx],
    name: name.trim() || library[idx].name,
    updatedAt: new Date().toISOString(),
  };
  writeLibrary(library);
}

/** Merge cloud rows into local library (by cloudId). */
export function mergeCloudPlansIntoLocal(
  cloudRows: Array<{
    id: string;
    name: string;
    plan: MyMovePlanState;
    archived: boolean;
    created_at: string;
    updated_at: string;
  }>
): void {
  const library = readLibraryRaw();
  const byCloud = new Map(
    library.filter((p) => p.cloudId).map((p) => [p.cloudId as string, p] as const)
  );

  for (const row of cloudRows) {
    const existing = byCloud.get(row.id);
    const plan: MyMovePlanState = {
      ...EMPTY_PLAN_STATE,
      ...row.plan,
      shortlist: Array.isArray(row.plan?.shortlist) ? row.plan.shortlist : [],
      inventory: Array.isArray(row.plan?.inventory) ? row.plan.inventory : [],
    };
    if (existing) {
      const idx = library.findIndex((p) => p.id === existing.id);
      if (idx >= 0) {
        // Prefer newer updated_at
        const localT = new Date(existing.updatedAt).getTime();
        const cloudT = new Date(row.updated_at).getTime();
        if (cloudT >= localT) {
          library[idx] = {
            ...existing,
            name: row.name,
            plan,
            archived: row.archived,
            updatedAt: row.updated_at,
            createdAt: row.created_at,
            readiness: computeMoveReadiness(plan),
            cloudId: row.id,
          };
        }
      }
    } else {
      library.push({
        id: newId(),
        cloudId: row.id,
        name: row.name,
        plan,
        archived: row.archived,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        readiness: computeMoveReadiness(plan),
      });
    }
  }
  writeLibrary(library);
}

export function upsertLocalWithCloudId(
  localId: string,
  cloudId: string
): void {
  const library = readLibraryRaw();
  const idx = library.findIndex((p) => p.id === localId);
  if (idx < 0) return;
  library[idx] = { ...library[idx], cloudId };
  writeLibrary(library);
}
