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

export function planInventoryTotals(inventory: PlanInventoryItem[]) {
  const totalVolume = inventory.reduce((s, i) => s + i.volume * i.quantity, 0);
  const totalItems = inventory.reduce((s, i) => s + i.quantity, 0);
  return {
    totalVolume: Math.round(totalVolume),
    totalItems,
  };
}