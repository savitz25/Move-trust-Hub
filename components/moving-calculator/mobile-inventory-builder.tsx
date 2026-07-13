'use client';

import { useMemo, useState } from 'react';
import {
  Search, Home, Package, Bed, Sofa, UtensilsCrossed, Briefcase,
  Car, Trees, Bath, Shirt, Plus, ChevronDown, ChevronRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getItemsByCategory, roomCategories } from '@/data/furniture';
import {
  fuzzySearchItems,
  groupItemsBySubgroup,
  formatItemDisplayName,
} from '@/lib/moving-calculator/display-names';
import { useCalculatorStore } from '@/store/calculator-store';
import { ItemCard } from '@/components/moving-calculator/item-card';
import { MobileBottomSheet } from '@/components/moving-calculator/mobile-bottom-sheet';
import { trackItemAdded } from '@/components/ga-events';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Bathroom: <Bath className="h-5 w-5" />,
  Bedroom: <Bed className="h-5 w-5" />,
  'Living Room': <Sofa className="h-5 w-5" />,
  Kitchen: <UtensilsCrossed className="h-5 w-5" />,
  'Dining Room': <UtensilsCrossed className="h-5 w-5" />,
  Office: <Briefcase className="h-5 w-5" />,
  'Garage / Laundry': <Car className="h-5 w-5" />,
  Outdoor: <Trees className="h-5 w-5" />,
  Nursery: <Shirt className="h-5 w-5" />,
  Other: <Package className="h-5 w-5" />,
  Appliances: <Package className="h-5 w-5" />,
  'Boxes and Bins': <Package className="h-5 w-5" />,
};

const CUSTOM_SIZES = [
  { label: 'Small', volume: 5 },
  { label: 'Medium', volume: 15 },
  { label: 'Large', volume: 35 },
  { label: 'XL', volume: 60 },
];

type MobileInventoryBuilderProps = {
  onInteraction: (type: string) => void;
  showUndoToast: (message: string) => void;
};

/**
 * Mobile-only (< md) inventory builder: vertical room steps, accordion rooms,
 * and full-screen bottom-sheet item picker. Desktop uses InventoryBuilder.
 */
export function MobileInventoryBuilder({ onInteraction, showUndoToast }: MobileInventoryBuilderProps) {
  const {
    mode,
    inventory,
    selectedRoom,
    setMode,
    setSelectedRoom,
    addItem,
    addCustomItem,
    updateQuantity,
    removeItem,
  } = useCalculatorStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [customName, setCustomName] = useState('');
  const [customSize, setCustomSize] = useState(CUSTOM_SIZES[1].volume);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [expandedRooms, setExpandedRooms] = useState<Record<string, boolean>>({});
  const [customOpen, setCustomOpen] = useState(false);

  const getQty = (name: string, room?: string) => {
    const effectiveRoom = mode === 'room' ? room || selectedRoom : undefined;
    return (
      inventory.find(
        (it) => it.name === name && (it.room || undefined) === (effectiveRoom || undefined)
      )?.quantity ?? 0
    );
  };

  const roomStats = useMemo(() => {
    return roomCategories.map((room) => {
      const items = inventory.filter((i) => i.room === room);
      const count = items.reduce((s, i) => s + i.quantity, 0);
      const volume = items.reduce((s, i) => s + i.volume * i.quantity, 0);
      return { room, count, volume, items };
    });
  }, [inventory]);

  const roomsWithItems = roomStats.filter((r) => r.count > 0).length;
  const progressPct = Math.round((roomsWithItems / roomCategories.length) * 100);

  const pickerGroups = useMemo(() => {
    if (!selectedRoom) return [];
    return groupItemsBySubgroup(getItemsByCategory(selectedRoom), selectedRoom);
  }, [selectedRoom]);

  const searchResults = useMemo(() => {
    if (mode !== 'quick' || !searchQuery.trim()) return [];
    return fuzzySearchItems(searchQuery).slice(0, 40);
  }, [mode, searchQuery]);

  const handleAdd = (name: string, source: string, room?: string) => {
    const targetRoom = room ?? selectedRoom;
    if (mode === 'room' && !targetRoom) {
      toast.error('Select a room first');
      return;
    }
    addItem(name, mode === 'room' ? targetRoom || undefined : undefined);
    onInteraction('add_item');
    trackItemAdded({
      item_name: name,
      room: targetRoom ?? undefined,
      mode,
      source,
    });
    showUndoToast(`Added ${formatItemDisplayName(name)}`);
  };

  const handleDecrement = (name: string, room?: string) => {
    const effectiveRoom = mode === 'room' ? room || selectedRoom || undefined : undefined;
    const existing = inventory.find(
      (it) => it.name === name && (it.room || undefined) === effectiveRoom
    );
    if (!existing) return;
    if (existing.quantity <= 1) {
      removeItem(existing.id);
      showUndoToast(`Removed ${formatItemDisplayName(name)}`);
    } else {
      updateQuantity(existing.id, existing.quantity - 1);
    }
  };

  const handleAddCustom = () => {
    if (!customName.trim()) {
      toast.error('Enter an item name');
      return;
    }
    addCustomItem(customName.trim(), customSize, selectedRoom || undefined);
    onInteraction('add_custom_item');
    showUndoToast(`Added ${customName.trim()}`);
    setCustomName('');
    setCustomOpen(false);
  };

  const openRoomPicker = (room: string) => {
    setSelectedRoom(room);
    setPickerOpen(true);
  };

  const toggleRoomAccordion = (room: string) => {
    setExpandedRooms((prev) => ({ ...prev, [room]: !prev[room] }));
  };

  return (
    <div className="md:hidden space-y-4">
      {/* Progress */}
      <div className="rounded-xl border bg-card p-4 shadow-trust">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">Inventory progress</span>
          <span className="text-muted-foreground tabular-nums">
            {roomsWithItems}/{roomCategories.length} rooms
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${Math.max(progressPct, inventory.length > 0 ? 8 : 0)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Tap a room to add items. Your estimate updates live in the bar below.
        </p>
      </div>

      {/* Mode tabs — large touch targets */}
      <div className="flex rounded-xl border p-1 bg-muted/30 gap-1" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'room'}
          onClick={() => setMode('room')}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-lg min-h-12 text-sm font-semibold transition-colors',
            mode === 'room' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
          )}
        >
          <Home className="h-4 w-4" /> By room
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'quick'}
          onClick={() => setMode('quick')}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-lg min-h-12 text-sm font-semibold transition-colors',
            mode === 'quick' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
          )}
        >
          <Search className="h-4 w-4" /> Search
        </button>
      </div>

      {mode === 'room' && (
        <div className="space-y-2">
          {roomStats.map(({ room, count, volume, items }) => {
            const expanded = expandedRooms[room] ?? false;
            const icon = CATEGORY_ICONS[room];
            return (
              <div key={room} className="rounded-xl border bg-card overflow-hidden shadow-trust">
                <div className="flex items-center gap-2 p-3">
                  <button
                    type="button"
                    onClick={() => toggleRoomAccordion(room)}
                    className="flex flex-1 items-center gap-3 min-h-12 text-left"
                    aria-expanded={expanded}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {icon}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="font-semibold block">{room}</span>
                      <span className="text-xs text-muted-foreground">
                        {count > 0
                          ? `${count} items · ${Math.round(volume)} cu ft`
                          : 'No items yet'}
                      </span>
                    </span>
                    {expanded ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  <Button
                    type="button"
                    size="lg"
                    className="min-h-11 shrink-0 px-4"
                    onClick={() => openRoomPicker(room)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>

                {expanded && items.length > 0 && (
                  <div className="border-t px-3 pb-3 pt-2 space-y-2">
                    {items.map((item) => (
                      <ItemCard
                        key={item.id}
                        name={item.name}
                        volume={item.volume}
                        quantity={item.quantity}
                        onAdd={() => handleAdd(item.name, 'room_accordion', room)}
                        onRemove={() => handleDecrement(item.name, room)}
                        mobile
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {mode === 'quick' && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder='Search — "couch", "fridge", "boxes"...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 min-h-12 text-base"
              aria-label="Search furniture catalog"
              inputMode="search"
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <ItemCard
                  key={item.name}
                  name={item.name}
                  volume={item.volume}
                  quantity={getQty(item.name)}
                  icon={CATEGORY_ICONS[item.category]}
                  onAdd={() => handleAdd(item.name, 'search')}
                  onRemove={() => handleDecrement(item.name)}
                  mobile
                  compact
                />
              ))
            ) : searchQuery ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                No matches for &ldquo;{searchQuery}&rdquo;
              </p>
            ) : (
              <p className="text-center text-sm text-muted-foreground py-8">
                Search 500+ household items or add a custom item below.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Custom item — collapsible */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <button
          type="button"
          onClick={() => setCustomOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 min-h-12 text-sm font-semibold"
        >
          Don&apos;t see it? Add custom item
          {customOpen ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        {customOpen && (
          <div className="border-t px-4 pb-4 pt-3 space-y-3">
            <Input
              placeholder="Item name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="min-h-12 text-base"
            />
            <div className="grid grid-cols-2 gap-2">
              {CUSTOM_SIZES.map((size) => (
                <button
                  key={size.label}
                  type="button"
                  onClick={() => setCustomSize(size.volume)}
                  className={cn(
                    'rounded-xl border min-h-12 px-3 text-sm font-medium transition-colors',
                    customSize === size.volume
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border'
                  )}
                >
                  {size.label} · {size.volume} cu ft
                </button>
              ))}
            </div>
            <Button className="w-full min-h-12" onClick={handleAddCustom} disabled={!customName.trim()}>
              <Plus className="h-4 w-4 mr-2" /> Add custom item
            </Button>
          </div>
        )}
      </div>

      {/* Full-screen item picker sheet */}
      <MobileBottomSheet
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        title={selectedRoom ? `Add to ${selectedRoom}` : 'Add items'}
        description="Tap + to add · large items may need special handling"
        fullScreen
      >
        <div className="space-y-5 pb-6">
          {pickerGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 sticky top-0 bg-background py-2 z-10">
                {group.label}
              </h3>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <ItemCard
                    key={item.name}
                    name={item.name}
                    volume={item.volume}
                    quantity={getQty(item.name, selectedRoom ?? undefined)}
                    onAdd={() => handleAdd(item.name, 'mobile_picker', selectedRoom ?? undefined)}
                    onRemove={() => handleDecrement(item.name, selectedRoom ?? undefined)}
                    mobile
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </MobileBottomSheet>
    </div>
  );
}