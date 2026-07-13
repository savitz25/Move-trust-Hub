import type { InventoryItem } from '@/store/calculator-store';

export function groupInventoryByRoom(inventory: InventoryItem[]): [string, InventoryItem[]][] {
  const groups: Record<string, InventoryItem[]> = {};
  for (const item of inventory) {
    const room = item.room || 'Unassigned';
    if (!groups[room]) groups[room] = [];
    groups[room].push(item);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}