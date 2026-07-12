import type { InventoryItem, InputMode } from '@/store/calculator-store';

export type SavedInventoryPayload = {
  inventory: InventoryItem[];
  mode: InputMode;
  movePreset: string | null;
  totalVolume: number;
  totalItems: number;
};

export type SavedInventoryRow = {
  id: string;
  user_id: string;
  name: string;
  inventory: InventoryItem[];
  mode: string | null;
  move_preset: string | null;
  total_volume: number | null;
  total_items: number | null;
  created_at: string;
  updated_at: string;
};

export type SavedMoverRow = {
  id: string;
  user_id: string;
  company_slug: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type SavedComparisonRow = {
  id: string;
  user_id: string;
  company_slugs: string[];
  name: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type UserProfileRow = {
  id: string;
  email: string;
  marketing_opt_in: boolean;
  mover_alerts_opt_in: boolean;
  created_at: string;
  updated_at: string;
};

export type SaveMyMoveContext =
  | 'inventory'
  | 'mover'
  | 'comparison'
  | 'dashboard';

export type LocalMergePayload = {
  inventory?: SavedInventoryPayload | null;
  compareSlugs?: string[];
};