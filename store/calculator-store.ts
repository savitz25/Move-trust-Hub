import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { furnitureItems } from '@/data/furniture';
import {
  buildPresetInventory,
  type MovePresetId,
} from '@/lib/moving-calculator/move-presets';

export type InputMode = 'room' | 'quick';

export interface InventoryItem {
  id: string;
  name: string;
  volume: number;
  quantity: number;
  room?: string;
}

type UndoSnapshot = InventoryItem[];

interface CalculatorState {
  mode: InputMode;
  inventory: InventoryItem[];
  selectedRoom: string | null;
  movePreset: MovePresetId | null;
  onboardingDismissed: boolean;
  undoStack: UndoSnapshot[];

  setMode: (mode: InputMode) => void;
  setSelectedRoom: (room: string | null) => void;
  dismissOnboarding: () => void;
  markInteraction: () => void;

  addItem: (name: string, room?: string) => void;
  addCustomItem: (name: string, volume: number, room?: string) => void;
  addSuggestedBoxes: (boxes: { name: string; quantity: number; volume: number }[]) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  clearInventory: () => void;
  loadPreset: (presetId: MovePresetId) => void;
  loadFromShare: (items: Omit<InventoryItem, 'id'>[], mode?: InputMode, preset?: MovePresetId | null) => void;
  undo: () => void;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const getVolume = (name: string) => furnitureItems.find((i) => i.name === name)?.volume;

const pushUndo = (inventory: InventoryItem[]) =>
  JSON.parse(JSON.stringify(inventory)) as UndoSnapshot;

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      mode: 'room',
      inventory: [],
      selectedRoom: 'Living Room',
      movePreset: null,
      onboardingDismissed: false,
      undoStack: [],

      setMode: (mode) => {
        get().markInteraction();
        set({ mode });
      },

      setSelectedRoom: (room) => {
        get().markInteraction();
        set({ selectedRoom: room });
      },

      dismissOnboarding: () => set({ onboardingDismissed: true }),

      markInteraction: () => {
        const { onboardingDismissed } = get();
        if (!onboardingDismissed) set({ onboardingDismissed: true });
      },

      addItem: (name, room) => {
        const itemDef = furnitureItems.find((i) => i.name === name);
        if (!itemDef) return;

        const { inventory, mode, undoStack } = get();
        const effectiveRoom = mode === 'room' ? room || get().selectedRoom || undefined : undefined;

        const existing = inventory.find(
          (it) => it.name === name && (it.room || undefined) === effectiveRoom
        );

        set({ undoStack: [...undoStack.slice(-4), pushUndo(inventory)] });

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
        get().markInteraction();
      },

      addCustomItem: (name, volume, room) => {
        const { inventory, mode, undoStack } = get();
        const effectiveRoom = mode === 'room' ? room || get().selectedRoom || undefined : undefined;

        const newItem: InventoryItem = {
          id: generateId(),
          name: name.trim() || 'Custom Item',
          volume: Math.max(1, Math.min(500, Math.round(volume))),
          quantity: 1,
          room: effectiveRoom,
        };
        set({
          undoStack: [...undoStack.slice(-4), pushUndo(inventory)],
          inventory: [...inventory, newItem],
        });
        get().markInteraction();
      },

      addSuggestedBoxes: (boxes) => {
        const { inventory, undoStack } = get();
        set({ undoStack: [...undoStack.slice(-4), pushUndo(inventory)] });

        let updated = [...inventory];
        for (const box of boxes) {
          const existing = updated.find(
            (it) => it.name === box.name && it.room === 'Boxes and Bins'
          );
          if (existing) {
            updated = updated.map((it) =>
              it.id === existing.id
                ? { ...it, quantity: it.quantity + box.quantity }
                : it
            );
          } else {
            updated.push({
              id: generateId(),
              name: box.name,
              volume: box.volume,
              quantity: box.quantity,
              room: 'Boxes and Bins',
            });
          }
        }
        set({ inventory: updated, selectedRoom: 'Boxes and Bins' });
        get().markInteraction();
      },

      updateQuantity: (id, newQuantity) => {
        if (newQuantity < 1) return;
        const { inventory, undoStack } = get();
        set({
          undoStack: [...undoStack.slice(-4), pushUndo(inventory)],
          inventory: inventory.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          ),
        });
        get().markInteraction();
      },

      removeItem: (id) => {
        const { inventory, undoStack } = get();
        set({
          undoStack: [...undoStack.slice(-4), pushUndo(inventory)],
          inventory: inventory.filter((item) => item.id !== id),
        });
        get().markInteraction();
      },

      clearInventory: () => {
        const { inventory, undoStack } = get();
        set({
          undoStack: [...undoStack.slice(-4), pushUndo(inventory)],
          inventory: [],
          movePreset: null,
        });
      },

      loadPreset: (presetId) => {
        const { inventory, undoStack } = get();
        const safeInventory = Array.isArray(inventory) ? inventory : [];
        set({ undoStack: [...undoStack.slice(-4), pushUndo(safeInventory)] });

        if (presetId === 'scratch' || presetId === 'custom') {
          set({ inventory: [], movePreset: presetId, selectedRoom: 'Living Room' });
        } else {
          try {
            const items = buildPresetInventory(presetId, getVolume);
            set({
              inventory: Array.isArray(items) ? items : [],
              movePreset: presetId,
              selectedRoom: 'Living Room',
              mode: 'room',
            });
          } catch {
            set({
              inventory: [],
              movePreset: presetId,
              selectedRoom: 'Living Room',
              mode: 'room',
            });
          }
        }
        get().markInteraction();
      },

      loadFromShare: (items, mode, preset) => {
        const list = Array.isArray(items) ? items : [];
        set({
          inventory: list.map((item) => ({
            name: String(item?.name ?? 'Item'),
            volume: Math.max(0, Number(item?.volume) || 0),
            quantity: Math.max(1, Number(item?.quantity) || 1),
            room: item?.room,
            id: generateId(),
          })),
          mode: mode === 'quick' || mode === 'room' ? mode : 'room',
          movePreset: preset ?? null,
          onboardingDismissed: true,
        });
      },

      undo: () => {
        const { undoStack, inventory } = get();
        if (undoStack.length === 0) return;
        const previous = undoStack[undoStack.length - 1];
        set({
          inventory: previous,
          undoStack: undoStack.slice(0, -1),
        });
      },
    }),
    {
      name: 'move-calculator-inventory',
      version: 2,
      partialize: (state) => ({
        inventory: state.inventory,
        mode: state.mode,
        movePreset: state.movePreset,
        onboardingDismissed: state.onboardingDismissed,
        selectedRoom: state.selectedRoom,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<CalculatorState>;
        const inventory = Array.isArray(p.inventory)
          ? p.inventory.filter(
              (item) =>
                item &&
                typeof item === 'object' &&
                typeof (item as InventoryItem).name === 'string' &&
                typeof (item as InventoryItem).id === 'string'
            )
          : current.inventory;
        return {
          ...current,
          ...p,
          inventory,
          mode: p.mode === 'quick' || p.mode === 'room' ? p.mode : current.mode,
          undoStack: [],
        };
      },
    }
  )
);