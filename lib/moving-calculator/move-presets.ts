import type { InventoryItem } from '@/store/calculator-store';

export type MovePresetId =
  | 'studio'
  | '1-bedroom'
  | '2-bedroom'
  | '3-bedroom'
  | '4-plus'
  | 'custom'
  | 'scratch';

export type MovePreset = {
  id: MovePresetId;
  label: string;
  description: string;
  icon: string;
};

export const MOVE_PRESETS: MovePreset[] = [
  { id: 'studio', label: 'Studio', description: 'Efficiency or studio apartment', icon: '🏢' },
  { id: '1-bedroom', label: '1 Bedroom', description: 'Typical one-bedroom home', icon: '🛏️' },
  { id: '2-bedroom', label: '2 Bedroom', description: 'Two-bedroom apartment or house', icon: '🏠' },
  { id: '3-bedroom', label: '3 Bedroom', description: 'Family-sized three-bedroom', icon: '🏡' },
  { id: '4-plus', label: '4+ Bedroom', description: 'Large home or multi-family', icon: '🏘️' },
  { id: 'custom', label: 'Custom', description: 'Start empty, build your own', icon: '✏️' },
];

type PresetEntry = { name: string; quantity: number; room: string };

const PRESET_INVENTORY: Record<Exclude<MovePresetId, 'custom' | 'scratch'>, PresetEntry[]> = {
  studio: [
    { name: 'Bed, Queen (Mattress And Box Spring)', quantity: 1, room: 'Bedroom' },
    { name: 'Night Stand', quantity: 1, room: 'Bedroom' },
    { name: 'Dresser, Single', quantity: 1, room: 'Bedroom' },
    { name: 'Lamp, Table', quantity: 1, room: 'Bedroom' },
    { name: 'Sofa, 2 Cushion Loveseat', quantity: 1, room: 'Living Room' },
    { name: 'Table, Coffee', quantity: 1, room: 'Living Room' },
    { name: 'Tv Flat Screen 30', quantity: 1, room: 'Living Room' },
    { name: 'Table, End', quantity: 1, room: 'Living Room' },
    { name: 'Refrigerator, Top And Bottom', quantity: 1, room: 'Kitchen' },
    { name: 'Microwave', quantity: 1, room: 'Kitchen' },
    { name: 'Chair, Dining', quantity: 2, room: 'Kitchen' },
    { name: 'Box, Med (3.0 Cf) 18X18X16', quantity: 8, room: 'Boxes and Bins' },
    { name: 'Box, Large (4.5 Cf) 18X18X24', quantity: 4, room: 'Boxes and Bins' },
  ],
  '1-bedroom': [
    { name: 'Bed, Queen (Mattress And Box Spring)', quantity: 1, room: 'Bedroom' },
    { name: 'Night Stand', quantity: 2, room: 'Bedroom' },
    { name: 'Dresser, Double', quantity: 1, room: 'Bedroom' },
    { name: 'Chest Of Drawers (Medium)', quantity: 1, room: 'Bedroom' },
    { name: 'Lamp, Floor', quantity: 1, room: 'Bedroom' },
    { name: 'Sofa, 3 Cushion', quantity: 1, room: 'Living Room' },
    { name: 'Table, Coffee', quantity: 1, room: 'Living Room' },
    { name: 'Table, End', quantity: 2, room: 'Living Room' },
    { name: 'Tv Flat Screen 49', quantity: 1, room: 'Living Room' },
    { name: 'Entertainment Center, Reg', quantity: 1, room: 'Living Room' },
    { name: 'Dining Table (Medium)', quantity: 1, room: 'Dining Room' },
    { name: 'Chair, Dining', quantity: 4, room: 'Dining Room' },
    { name: 'Refrigerator, Top And Bottom', quantity: 1, room: 'Kitchen' },
    { name: 'Stove', quantity: 1, room: 'Kitchen' },
    { name: 'Microwave', quantity: 1, room: 'Kitchen' },
    { name: 'Desk, Medium', quantity: 1, room: 'Office' },
    { name: 'Desk Chair, Medium', quantity: 1, room: 'Office' },
    { name: 'Washing Machine', quantity: 1, room: 'Appliances' },
    { name: 'Dryer', quantity: 1, room: 'Appliances' },
    { name: 'Box, Med (3.0 Cf) 18X18X16', quantity: 12, room: 'Boxes and Bins' },
    { name: 'Box, Large (4.5 Cf) 18X18X24', quantity: 8, room: 'Boxes and Bins' },
    { name: 'Box, Wardrobe', quantity: 2, room: 'Boxes and Bins' },
  ],
  '2-bedroom': [
    { name: 'Bed, Queen (Mattress And Box Spring)', quantity: 1, room: 'Bedroom' },
    { name: 'Bed, Twin (Mattress And Box Spring)', quantity: 1, room: 'Bedroom' },
    { name: 'Night Stand', quantity: 3, room: 'Bedroom' },
    { name: 'Dresser, Double', quantity: 1, room: 'Bedroom' },
    { name: 'Dresser, Single', quantity: 1, room: 'Bedroom' },
    { name: 'Chest Of Drawers (Medium)', quantity: 1, room: 'Bedroom' },
    { name: 'Sofa, 3 Cushion', quantity: 1, room: 'Living Room' },
    { name: 'Chair, Recliner', quantity: 1, room: 'Living Room' },
    { name: 'Table, Coffee', quantity: 1, room: 'Living Room' },
    { name: 'Table, End', quantity: 2, room: 'Living Room' },
    { name: 'Tv Flat Screen 49', quantity: 1, room: 'Living Room' },
    { name: 'Entertainment Center, Reg', quantity: 1, room: 'Living Room' },
    { name: 'Bookcase, Med', quantity: 1, room: 'Living Room' },
    { name: 'Dining Table (Large)', quantity: 1, room: 'Dining Room' },
    { name: 'Chair, Dining', quantity: 6, room: 'Dining Room' },
    { name: 'Buffet, Base', quantity: 1, room: 'Dining Room' },
    { name: 'Refrigerator, Top And Bottom', quantity: 1, room: 'Kitchen' },
    { name: 'Stove', quantity: 1, room: 'Kitchen' },
    { name: 'Dishwasher', quantity: 1, room: 'Kitchen' },
    { name: 'Microwave', quantity: 1, room: 'Kitchen' },
    { name: 'Desk, Medium', quantity: 1, room: 'Office' },
    { name: 'Desk Chair, Medium', quantity: 1, room: 'Office' },
    { name: 'File Cabinet, 2 Drawer', quantity: 1, room: 'Office' },
    { name: 'Washing Machine', quantity: 1, room: 'Appliances' },
    { name: 'Dryer', quantity: 1, room: 'Appliances' },
    { name: 'Lawnmower, Push', quantity: 1, room: 'Garage / Laundry' },
    { name: 'Box, Med (3.0 Cf) 18X18X16', quantity: 20, room: 'Boxes and Bins' },
    { name: 'Box, Large (4.5 Cf) 18X18X24', quantity: 12, room: 'Boxes and Bins' },
    { name: 'Box, Wardrobe', quantity: 3, room: 'Boxes and Bins' },
  ],
  '3-bedroom': [
    { name: 'Bed, King (Mattress And Box Spring)', quantity: 1, room: 'Bedroom' },
    { name: 'Bed, Queen (Mattress And Box Spring)', quantity: 1, room: 'Bedroom' },
    { name: 'Bed, Twin (Mattress And Box Spring)', quantity: 1, room: 'Bedroom' },
    { name: 'Night Stand', quantity: 4, room: 'Bedroom' },
    { name: 'Dresser, Triple', quantity: 1, room: 'Bedroom' },
    { name: 'Dresser, Double', quantity: 1, room: 'Bedroom' },
    { name: 'Chest Of Drawers (Large)', quantity: 1, room: 'Bedroom' },
    { name: 'Armoire, Regular', quantity: 1, room: 'Bedroom' },
    { name: 'Sofa, 3 Cushion', quantity: 1, room: 'Living Room' },
    { name: 'Sofa, 2 Cushion Loveseat', quantity: 1, room: 'Living Room' },
    { name: 'Chair, Recliner', quantity: 2, room: 'Living Room' },
    { name: 'Table, Coffee', quantity: 1, room: 'Living Room' },
    { name: 'Table, End', quantity: 3, room: 'Living Room' },
    { name: 'Tv Flat Screen 49', quantity: 2, room: 'Living Room' },
    { name: 'Entertainment Center, Lg', quantity: 1, room: 'Living Room' },
    { name: 'Bookcase, Med', quantity: 2, room: 'Living Room' },
    { name: 'Dining Table (Large)', quantity: 1, room: 'Dining Room' },
    { name: 'Chair, Dining', quantity: 8, room: 'Dining Room' },
    { name: 'China Cab, 1 Piece', quantity: 1, room: 'Dining Room' },
    { name: 'Refrigerator, Side By Side', quantity: 1, room: 'Kitchen' },
    { name: 'Stove', quantity: 1, room: 'Kitchen' },
    { name: 'Dishwasher', quantity: 1, room: 'Kitchen' },
    { name: 'Microwave', quantity: 1, room: 'Kitchen' },
    { name: 'Desk, Medium', quantity: 1, room: 'Office' },
    { name: 'Desk Chair, Medium', quantity: 1, room: 'Office' },
    { name: 'File Cabinet, 4 Drawer', quantity: 1, room: 'Office' },
    { name: 'Bookcase, Sm', quantity: 1, room: 'Office' },
    { name: 'Washing Machine', quantity: 1, room: 'Appliances' },
    { name: 'Dryer', quantity: 1, room: 'Appliances' },
    { name: 'Lawnmower, Push', quantity: 1, room: 'Garage / Laundry' },
    { name: 'Patio Table, Medium', quantity: 1, room: 'Outdoor' },
    { name: 'Patio Chair', quantity: 4, room: 'Outdoor' },
    { name: 'Box, Med (3.0 Cf) 18X18X16', quantity: 30, room: 'Boxes and Bins' },
    { name: 'Box, Large (4.5 Cf) 18X18X24', quantity: 18, room: 'Boxes and Bins' },
    { name: 'Box, Wardrobe', quantity: 5, room: 'Boxes and Bins' },
    { name: 'Box, China/Dish 18X18X28', quantity: 3, room: 'Boxes and Bins' },
  ],
  '4-plus': [
    { name: 'Bed, King (Mattress And Box Spring)', quantity: 2, room: 'Bedroom' },
    { name: 'Bed, Queen (Mattress And Box Spring)', quantity: 1, room: 'Bedroom' },
    { name: 'Bed, Twin (Mattress And Box Spring)', quantity: 2, room: 'Bedroom' },
    { name: 'Night Stand', quantity: 6, room: 'Bedroom' },
    { name: 'Dresser, Triple', quantity: 2, room: 'Bedroom' },
    { name: 'Dresser, Double', quantity: 1, room: 'Bedroom' },
    { name: 'Armoire, Large', quantity: 1, room: 'Bedroom' },
    { name: 'Sofa, 3 Cushion', quantity: 2, room: 'Living Room' },
    { name: 'Sofa, 2 Cushion Loveseat', quantity: 1, room: 'Living Room' },
    { name: 'Chair, Recliner', quantity: 3, room: 'Living Room' },
    { name: 'Table, Coffee', quantity: 2, room: 'Living Room' },
    { name: 'Table, End', quantity: 4, room: 'Living Room' },
    { name: 'Tv Flat Screen 61', quantity: 3, room: 'Living Room' },
    { name: 'Entertainment Center, Lg', quantity: 2, room: 'Living Room' },
    { name: 'Bookcase Lg', quantity: 3, room: 'Living Room' },
    { name: 'Dining Table (Large)', quantity: 1, room: 'Dining Room' },
    { name: 'Chair, Dining', quantity: 10, room: 'Dining Room' },
    { name: 'China Cab, 2 Piece', quantity: 1, room: 'Dining Room' },
    { name: 'Refrigerator, Side By Side', quantity: 1, room: 'Kitchen' },
    { name: 'Stove', quantity: 1, room: 'Kitchen' },
    { name: 'Dishwasher', quantity: 1, room: 'Kitchen' },
    { name: 'Microwave', quantity: 1, room: 'Kitchen' },
    { name: 'Desk, Medium', quantity: 2, room: 'Office' },
    { name: 'Desk Chair, Medium', quantity: 2, room: 'Office' },
    { name: 'File Cabinet, 4 Drawer', quantity: 2, room: 'Office' },
    { name: 'Washing Machine', quantity: 1, room: 'Appliances' },
    { name: 'Dryer', quantity: 1, room: 'Appliances' },
    { name: 'Lawnmower, Riding', quantity: 1, room: 'Outdoor' },
    { name: 'Patio Table, Large', quantity: 1, room: 'Outdoor' },
    { name: 'Patio Chair', quantity: 6, room: 'Outdoor' },
    { name: 'Barbecue Grill, Large', quantity: 1, room: 'Outdoor' },
    { name: 'Box, Med (3.0 Cf) 18X18X16', quantity: 45, room: 'Boxes and Bins' },
    { name: 'Box, Large (4.5 Cf) 18X18X24', quantity: 30, room: 'Boxes and Bins' },
    { name: 'Box, Wardrobe', quantity: 8, room: 'Boxes and Bins' },
    { name: 'Box, China/Dish 18X18X28', quantity: 5, room: 'Boxes and Bins' },
    { name: 'Box, Extra Large 23X23X16', quantity: 5, room: 'Boxes and Bins' },
  ],
};

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export function buildPresetInventory(
  presetId: Exclude<MovePresetId, 'custom' | 'scratch'>,
  getVolume: (name: string) => number | undefined
): InventoryItem[] {
  const entries = PRESET_INVENTORY[presetId] ?? [];
  return entries
    .map((entry) => {
      const volume = getVolume(entry.name);
      if (!volume) return null;
      return {
        id: generateId(),
        name: entry.name,
        volume,
        quantity: entry.quantity,
        room: entry.room,
      };
    })
    .filter((item): item is InventoryItem => item !== null);
}

export function getPresetToastMessage(presetId: MovePresetId): string {
  const preset = MOVE_PRESETS.find((p) => p.id === presetId);
  if (!preset || presetId === 'custom' || presetId === 'scratch') {
    return 'Start adding items below to build your inventory.';
  }
  return `We pre-loaded typical items for a ${preset.label.toLowerCase()} home. Adjust anything below.`;
}