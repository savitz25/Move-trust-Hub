/**
 * Bridge My Move Plan wizard inventory ↔ full Moving Calculator store.
 */

import type { InventoryItem } from '@/store/calculator-store';
import type { MovePresetId } from '@/lib/moving-calculator/move-presets';
import {
  loadMyMovePlan,
  saveMyMovePlan,
} from '@/lib/my-move-plan/storage';
import type { PlanInventoryItem } from '@/lib/my-move-plan/types';
import { MY_MOVE_PLAN_RETURN_PATH } from '@/lib/my-move-plan/return-path';

/** Query flag: calculator was opened from the My Move Plan wizard. */
export const FROM_PLAN_QUERY = 'fromPlan';

export const CALCULATOR_FROM_PLAN_HREF = `/moving-calculator?${FROM_PLAN_QUERY}=1`;

export function isCalculatorFromPlan(searchParams: {
  get: (key: string) => string | null;
}): boolean {
  const v = searchParams.get(FROM_PLAN_QUERY);
  return v === '1' || v === 'true' || v === 'yes';
}

export function planItemsToCalculator(
  items: PlanInventoryItem[]
): Omit<InventoryItem, 'id'>[] {
  return items.map(({ name, volume, quantity, room }) => ({
    name,
    volume,
    quantity,
    room,
  }));
}

export function calculatorItemsToPlan(items: InventoryItem[]): PlanInventoryItem[] {
  return items
    .filter((i) => i && i.quantity > 0)
    .map((i) => ({
      id: i.id,
      name: i.name,
      volume: Number(i.volume) || 0,
      quantity: Number(i.quantity) || 0,
      room: i.room,
    }));
}

/** Push wizard inventory into the calculator before navigating. */
export function seedCalculatorFromPlan(opts: {
  loadFromShare: (
    items: Omit<InventoryItem, 'id'>[],
    mode?: 'room' | 'quick',
    preset?: MovePresetId | null
  ) => void;
}): boolean {
  const plan = loadMyMovePlan();
  if (!plan?.inventory?.length) return false;
  opts.loadFromShare(
    planItemsToCalculator(plan.inventory),
    'room',
    plan.preset ?? null
  );
  return true;
}

/**
 * Write calculator inventory back into the My Move Plan session and
 * land the user on Report Ready when they return home.
 */
export function pushCalculatorInventoryIntoPlan(opts: {
  inventory: InventoryItem[];
  movePreset?: MovePresetId | null;
  step?: 'inventory' | 'report';
}): void {
  const existing = loadMyMovePlan();
  const nextInventory = calculatorItemsToPlan(opts.inventory);
  saveMyMovePlan({
    step: opts.step ?? 'report',
    fromPlace: existing?.fromPlace ?? null,
    toPlace: existing?.toPlace ?? null,
    drivingMiles: existing?.drivingMiles ?? null,
    shortlist: existing?.shortlist ?? [],
    preset: opts.movePreset ?? existing?.preset ?? null,
    inventory: nextInventory.length ? nextInventory : existing?.inventory ?? [],
    updatedAt: new Date().toISOString(),
  });
}

export function returnToMyMoveReportPath(): string {
  return MY_MOVE_PLAN_RETURN_PATH;
}
