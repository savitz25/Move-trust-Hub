import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { furnitureItems } from '@/data/furniture';

export type InputMode = 'room' | 'quick';

export interface InventoryItem {
  id: string; // unique instance id (e.g. name + timestamp or uuid)
  name: string;
  volume: number;
  quantity: number;
  room?: string; // only used in 'room' mode
}

interface CalculatorState {
  mode: InputMode;
  inventory: InventoryItem[];
  selectedRoom: string | null; // for Room Mode UI

  // Actions
  setMode: (mode: InputMode) => void;
  setSelectedRoom: (room: string | null) => void;

  addItem: (name: string, room?: string) => void;
  addCustomItem: (name: string, volume: number, room?: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  clearInventory: () => void;

  // Derived
  totalVolume: number;
  itemCount: number;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      mode: 'room',
      inventory: [],
      selectedRoom: null,

      setMode: (mode) => set({ mode }),
      setSelectedRoom: (room) => set({ selectedRoom: room }),

      addItem: (name, room) => {
        const itemDef = furnitureItems.find(i => i.name === name);
        if (!itemDef) return;

        const { inventory, mode } = get();
        const effectiveRoom = mode === 'room' ? (room || get().selectedRoom || undefined) : undefined;

        // If same item + same room exists, just increment quantity
        const existing = inventory.find(
          (it) => it.name === name && (it.room || undefined) === effectiveRoom
        );

        if (existing) {
          set({
            inventory: inventory.map((it) =>
              it.id === existing.id ? { ...it, quantity: it.quantity + 1 } : it
            ),
          });
        } else {
          const newItem: InventoryItem = {
            id: generateId(),
            name,
            volume: itemDef.volume,
            quantity: 1,
            room: effectiveRoom,
          };
          set({ inventory: [...inventory, newItem] });
        }
      },

      addCustomItem: (name, volume, room) => {
        const { inventory, mode } = get();
        const effectiveRoom = mode === 'room' ? (room || get().selectedRoom || undefined) : undefined;

        const newItem: InventoryItem = {
          id: generateId(),
          name: name.trim() || 'Custom Item',
          volume: Math.max(1, Math.min(500, Math.round(volume))), // sane bounds
          quantity: 1,
          room: effectiveRoom,
        };
        set({ inventory: [...inventory, newItem] });
      },

      updateQuantity: (id, newQuantity) => {
        if (newQuantity < 1) return;
        set({
          inventory: get().inventory.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          ),
        });
      },

      removeItem: (id) => {
        set({ inventory: get().inventory.filter((item) => item.id !== id) });
      },

      clearInventory: () => set({ inventory: [] }),
    }),
    {
      name: 'move-calculator-inventory',
      // Only persist relevant fields
      partialize: (state) => ({
        inventory: state.inventory,
        mode: state.mode,
      }),
    }
  )
);
