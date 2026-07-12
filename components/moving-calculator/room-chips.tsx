'use client';

import {
  Bath, Bed, Briefcase, Car, Package, Shirt, Sofa, Trees, UtensilsCrossed,
} from 'lucide-react';
import { roomCategories } from '@/data/furniture';
import type { InventoryItem } from '@/store/calculator-store';
import { cn } from '@/lib/utils';

const ROOM_ICONS: Record<string, React.ReactNode> = {
  Bathroom: <Bath className="h-3.5 w-3.5" />,
  Bedroom: <Bed className="h-3.5 w-3.5" />,
  'Living Room': <Sofa className="h-3.5 w-3.5" />,
  Kitchen: <UtensilsCrossed className="h-3.5 w-3.5" />,
  'Dining Room': <UtensilsCrossed className="h-3.5 w-3.5" />,
  Office: <Briefcase className="h-3.5 w-3.5" />,
  'Garage / Laundry': <Car className="h-3.5 w-3.5" />,
  Outdoor: <Trees className="h-3.5 w-3.5" />,
  Nursery: <Shirt className="h-3.5 w-3.5" />,
  Appliances: <Package className="h-3.5 w-3.5" />,
  Other: <Package className="h-3.5 w-3.5" />,
  'Boxes and Bins': <Package className="h-3.5 w-3.5" />,
};

type RoomChipsProps = {
  selectedRoom: string | null;
  inventory: InventoryItem[];
  onSelect: (room: string) => void;
};

export function RoomChips({ selectedRoom, inventory, onSelect }: RoomChipsProps) {
  const roomCounts = roomCategories.reduce<Record<string, number>>((acc, room) => {
    acc[room] = inventory
      .filter((item) => item.room === room)
      .reduce((sum, item) => sum + item.quantity, 0);
    return acc;
  }, {});

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin"
      role="tablist"
      aria-label="Rooms"
    >
      {roomCategories.map((room) => {
        const count = roomCounts[room] ?? 0;
        const selected = selectedRoom === room;
        return (
          <button
            key={room}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onSelect(room)}
            className={cn(
              'inline-flex items-center gap-1.5 shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              selected
                ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                : 'border-border/70 bg-card text-foreground hover:border-primary/50 hover:bg-primary/5'
            )}
          >
            {ROOM_ICONS[room] ?? <Package className="h-3.5 w-3.5" />}
            <span>{room}</span>
            {count > 0 && (
              <span
                className={cn(
                  'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold tabular-nums',
                  selected ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-primary/10 text-primary'
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}