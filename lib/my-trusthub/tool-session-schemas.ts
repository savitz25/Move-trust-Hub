/**
 * Proposed schema_key registry entries for B2.
 * Move owns the payload shape. This module does not call Ask, Supabase, or a handoff route.
 * Production stays on the current device keys until a Founder GO turns the export on.
 */

export const TOOL_SESSION_VERSION = 'move-tool-session/1';

export const TOOL_SESSION_DEVICE_KEYS = {
  inventory: 'move-calculator-inventory',
  plan: 'mth-my-move-plan-v1',
  planLibrary: 'mth-my-move-plans-library-v1',
  quoteCheck: 'mth-quote-check-compare-a-v1',
  compareStorage: 'im-compare-storage',
  savedMovers: 'mth-local-saved-movers',
} as const;

export type ToolSessionDeviceKey =
  (typeof TOOL_SESSION_DEVICE_KEYS)[keyof typeof TOOL_SESSION_DEVICE_KEYS];

export type ToolSessionSchema = {
  schemaKey: string;
  deviceKey: ToolSessionDeviceKey;
  storage: 'local' | 'session';
  /** Account table this device blob can later map to. Null when Move has no such table. */
  legacyTable: 'saved_inventories' | 'saved_comparisons' | 'saved_movers' | null;
};

export const TOOL_SESSION_SCHEMAS: readonly ToolSessionSchema[] = [
  {
    schemaKey: 'move.tool.inventory.v1',
    deviceKey: TOOL_SESSION_DEVICE_KEYS.inventory,
    storage: 'local',
    legacyTable: 'saved_inventories',
  },
  {
    schemaKey: 'move.tool.plan.v1',
    deviceKey: TOOL_SESSION_DEVICE_KEYS.plan,
    storage: 'session',
    legacyTable: null,
  },
  {
    schemaKey: 'move.tool.plan-library.v1',
    deviceKey: TOOL_SESSION_DEVICE_KEYS.planLibrary,
    storage: 'local',
    legacyTable: null,
  },
  {
    schemaKey: 'move.tool.comparison.v1',
    deviceKey: TOOL_SESSION_DEVICE_KEYS.quoteCheck,
    storage: 'session',
    legacyTable: null,
  },
  {
    schemaKey: 'move.tool.compare-storage.v1',
    deviceKey: TOOL_SESSION_DEVICE_KEYS.compareStorage,
    storage: 'local',
    legacyTable: 'saved_comparisons',
  },
  {
    schemaKey: 'move.tool.saved-movers.v1',
    deviceKey: TOOL_SESSION_DEVICE_KEYS.savedMovers,
    storage: 'local',
    legacyTable: 'saved_movers',
  },
];

export function toolSessionSchema(deviceKey: string): ToolSessionSchema | null {
  return TOOL_SESSION_SCHEMAS.find((row) => row.deviceKey === deviceKey) ?? null;
}
