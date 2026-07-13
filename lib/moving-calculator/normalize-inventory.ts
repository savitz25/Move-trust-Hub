import type { InventoryItem } from '@/store/calculator-store';

/** Coerce saved/JSON inventory rows into calculator store shape for exports and email. */
export function normalizeInventoryItems(raw: unknown): InventoryItem[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((entry, index) => {
      if (!entry || typeof entry !== 'object') return null;
      const row = entry as Record<string, unknown>;
      const name = typeof row.name === 'string' ? row.name.trim() : '';
      if (!name) return null;

      const volume = Number(row.volume);
      const quantity = Number(row.quantity);

      return {
        id: typeof row.id === 'string' && row.id ? row.id : `item-${index}`,
        name,
        volume: Number.isFinite(volume) ? volume : 0,
        quantity: Number.isFinite(quantity) && quantity > 0 ? Math.round(quantity) : 1,
        room: typeof row.room === 'string' && row.room.trim() ? row.room.trim() : undefined,
      } satisfies InventoryItem;
    })
    .filter((item): item is InventoryItem => item !== null);
}