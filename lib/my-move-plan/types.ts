import type { MovePresetId } from '@/lib/moving-calculator/move-presets';
import type { HomeRouteMover } from '@/lib/home/resolve-route-from-zip';
import type { ConfirmedPlace } from '@/components/location/location-place-input';

export type MyMovePlanStep = 'route' | 'shortlist' | 'inventory' | 'report';

export type PlanInventoryItem = {
  id: string;
  name: string;
  volume: number;
  quantity: number;
  room?: string;
};

export type MyMovePlanState = {
  step: MyMovePlanStep;
  fromPlace: ConfirmedPlace | null;
  toPlace: ConfirmedPlace | null;
  drivingMiles: number | null;
  shortlist: HomeRouteMover[];
  preset: MovePresetId | null;
  inventory: PlanInventoryItem[];
  updatedAt: string;
};

export const MY_MOVE_PLAN_STORAGE_KEY = 'mth-my-move-plan-v1';

export const EMPTY_PLAN_STATE: MyMovePlanState = {
  step: 'route',
  fromPlace: null,
  toPlace: null,
  drivingMiles: null,
  shortlist: [],
  preset: null,
  inventory: [],
  updatedAt: new Date(0).toISOString(),
};