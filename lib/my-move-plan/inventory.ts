import { furnitureItems } from '@/data/furniture';
import {
  buildPresetInventory,
  type MovePresetId,
} from '@/lib/moving-calculator/move-presets';
import type { PlanInventoryItem } from '@/lib/my-move-plan/types';

const getVolume = (name: string) => furnitureItems.find((i) => i.name === name)?.volume;

export function createPlanInventoryFromPreset(
  presetId: Exclude<MovePresetId, 'custom' | 'scratch'>
): PlanInventoryItem[] {
  return buildPresetInventory(presetId, getVolume);
}

export function planInventoryTotals(
  inventory: PlanInventoryItem[] | null | undefined
) {
  const items = Array.isArray(inventory) ? inventory : [];
  let totalVolume = 0;
  let totalItems = 0;
  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    const volume = Number(item.volume);
    const quantity = Number(item.quantity);
    if (!Number.isFinite(volume) || !Number.isFinite(quantity)) continue;
    totalVolume += volume * quantity;
    totalItems += quantity;
  }
  return {
    totalVolume: Math.round(totalVolume),
    totalItems,
  };
}