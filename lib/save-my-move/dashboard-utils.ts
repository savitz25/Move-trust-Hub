import { groupInventoryByRoom } from '@/lib/moving-calculator/group-inventory';
import { MOVE_PRESETS } from '@/lib/moving-calculator/move-presets';
import type { InventoryItem } from '@/store/calculator-store';

export type JourneyStepId = 'inventory' | 'shortlist' | 'compare' | 'verify' | 'book';

export type JourneyStep = {
  id: JourneyStepId;
  label: string;
  complete: boolean;
};

export type MoveReadiness = {
  score: number;
  steps: JourneyStep[];
  completedCount: number;
};

const GENERIC_INVENTORY_NAMES = new Set([
  'my move',
  'imported from this device',
  'imported comparison',
]);

const ROOM_ICONS: Record<string, string> = {
  Bedroom: '🛏️',
  'Living Room': '🛋️',
  Kitchen: '🍳',
  'Dining Room': '🍽️',
  Garage: '🚗',
  Office: '💼',
  'Boxes and Bins': '📦',
  Outdoor: '🌿',
  Nursery: '🧸',
  Bathroom: '🛁',
};

export function getRoomIcon(room: string): string {
  return ROOM_ICONS[room] ?? '📍';
}

export function buildFriendlyInventoryName(input: {
  name: string;
  movePreset: string | null;
  totalVolume: number;
  items: InventoryItem[];
}): string {
  const trimmed = input.name.trim();
  if (trimmed && !GENERIC_INVENTORY_NAMES.has(trimmed.toLowerCase())) {
    return trimmed;
  }

  const preset = MOVE_PRESETS.find((p) => p.id === input.movePreset);
  const presetLabel = preset?.label ?? 'Custom move';
  const rooms = groupInventoryByRoom(input.items)
    .map(([room]) => room)
    .filter((room) => room !== 'Unassigned');

  const notableRooms = rooms.filter((room) => room !== 'Boxes and Bins');
  const extras = notableRooms
    .filter((room) => !presetLabel.toLowerCase().includes(room.toLowerCase().split(' ')[0] ?? ''))
    .slice(0, 2);

  const suffix = extras.length > 0 ? ` + ${extras.join(' + ')}` : '';
  const volume = Math.round(input.totalVolume);

  return `${presetLabel}${suffix} — ${volume.toLocaleString()} cu ft`;
}

export function getInventoryRoomIcons(items: InventoryItem[], limit = 4): string[] {
  const rooms = groupInventoryByRoom(items).map(([room]) => room);
  const icons: string[] = [];
  for (const room of rooms) {
    const icon = getRoomIcon(room);
    if (!icons.includes(icon)) icons.push(icon);
    if (icons.length >= limit) break;
  }
  return icons.length > 0 ? icons : ['📦'];
}

/** Mini bar fill 0–100 based on typical 3BR ~800 cu ft scale */
export function inventorySizePercent(totalVolume: number): number {
  const volume = Math.max(0, totalVolume);
  return Math.min(100, Math.round((volume / 900) * 100));
}

export function computeMoveReadiness(input: {
  inventoryCount: number;
  moverCount: number;
  comparisonCount: number;
}): MoveReadiness {
  const hasInventory = input.inventoryCount > 0;
  const hasShortlist = input.moverCount > 0;
  const hasCompare = input.comparisonCount > 0 || input.moverCount >= 2;
  const hasVerify = input.moverCount > 0;
  const hasBook = false;

  const steps: JourneyStep[] = [
    { id: 'inventory', label: 'Inventory', complete: hasInventory },
    { id: 'shortlist', label: 'Shortlist', complete: hasShortlist },
    { id: 'compare', label: 'Compare', complete: hasCompare },
    { id: 'verify', label: 'Verify', complete: hasVerify },
    { id: 'book', label: 'Book', complete: hasBook },
  ];

  const completedCount = steps.filter((s) => s.complete).length;
  const score = Math.round((completedCount / steps.length) * 100);

  return { score, steps, completedCount };
}

export function totalInventoryVolume(
  inventories: Array<{ total_volume: number | null }>
): number {
  return inventories.reduce((sum, inv) => sum + Number(inv.total_volume ?? 0), 0);
}

export function greetingNameFromEmail(email: string): string {
  const local = email.split('@')[0]?.trim() ?? '';
  if (!local) return 'there';
  const cleaned = local.replace(/[._+-]/g, ' ').split(/\s+/)[0] ?? local;
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}

export function formatPriceDelta(amount: number): string {
  if (amount <= 0) return '—';
  return `$${Math.round(amount).toLocaleString()}`;
}

export function formatRatingDelta(delta: number): string {
  if (Math.abs(delta) < 0.05) return 'Same rating';
  const sign = delta > 0 ? '+' : '';
  return `${sign}${delta.toFixed(1)}★`;
}