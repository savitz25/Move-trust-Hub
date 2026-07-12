'use client';

import { useMemo, useState } from 'react';
import {
  Search, Home, Package, Bed, Sofa, UtensilsCrossed, Briefcase,
  Car, Trees, Bath, Shirt, Plus,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getItemsByCategory } from '@/data/furniture';
import {
  fuzzySearchItems,
  groupItemsBySubgroup,
  formatItemDisplayName,
} from '@/lib/moving-calculator/display-names';
import { useCalculatorStore } from '@/store/calculator-store';
import { RoomChips } from '@/components/moving-calculator/room-chips';
import { ItemCard } from '@/components/moving-calculator/item-card';
import { trackItemAdded } from '@/components/ga-events';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Bathroom: <Bath className="h-4 w-4" />,
  Bedroom: <Bed className="h-4 w-4" />,
  'Living Room': <Sofa className="h-4 w-4" />,
  Kitchen: <UtensilsCrossed className="h-4 w-4" />,
  'Dining Room': <UtensilsCrossed className="h-4 w-4" />,
  Office: <Briefcase className="h-4 w-4" />,
  'Garage / Laundry': <Car className="h-4 w-4" />,
  Outdoor: <Trees className="h-4 w-4" />,
  Nursery: <Shirt className="h-4 w-4" />,
  Other: <Package className="h-4 w-4" />,
  Appliances: <Package className="h-4 w-4" />,
  'Boxes and Bins': <Package className="h-4 w-4" />,
};

const CUSTOM_SIZES = [
  { label: 'Small', volume: 5, description: 'Nightstand, lamp, small decor' },
  { label: 'Medium', volume: 15, description: 'Chair, end table, small appliance' },
  { label: 'Large', volume: 35, description: 'Dresser, desk, large appliance' },
  { label: 'Extra Large', volume: 60, description: 'Armoire, entertainment center' },
];

type InventoryBuilderProps = {
  onInteraction: (type: string) => void;
  showUndoToast: (message: string) => void;
};

export function InventoryBuilder({ onInteraction, showUndoToast }: InventoryBuilderProps) {
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

  const getQty = (name: string, room?: string) => {
    const effectiveRoom = mode === 'room' ? room || selectedRoom : undefined;
    return (
      inventory.find(
        (it) => it.name === name && (it.room || undefined) === (effectiveRoom || undefined)
      )?.quantity ?? 0
    );
  };

  const handleAdd = (name: string, source: string) => {
    if (mode === 'room' && !selectedRoom) {
      toast.error('Select a room first');
      return;
    }
    addItem(name);
    onInteraction('add_item');
    trackItemAdded({
      item_name: name,
      room: selectedRoom ?? undefined,
      mode,
      source,
    });
    showUndoToast(`Added ${formatItemDisplayName(name)}`);
  };

  const handleDecrement = (name: string) => {
    if (mode === 'room' && !selectedRoom) return;
    const effectiveRoom = mode === 'room' ? selectedRoom || undefined : undefined;
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
    trackItemAdded({
      item_name: customName.trim(),
      room: selectedRoom ?? undefined,
      mode,
      source: 'custom',
    });
    showUndoToast(`Added ${customName.trim()}`);
    setCustomName('');
  };

  const roomGroups = useMemo(() => {
    if (mode !== 'room' || !selectedRoom) return [];
    const items = getItemsByCategory(selectedRoom);
    return groupItemsBySubgroup(items, selectedRoom);
  }, [mode, selectedRoom]);

  const searchResults = useMemo(() => {
    if (mode !== 'quick') return [];
    return fuzzySearchItems(searchQuery).slice(0, 60);
  }, [mode, searchQuery]);

  return (
    <Card className="shadow-trust">
      <CardHeader className="pb-3 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-base font-semibold">Inventory Builder</CardTitle>
          <div className="flex rounded-lg border p-0.5 bg-muted/30" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'room'}
              onClick={() => setMode('room')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                mode === 'room' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Home className="h-3.5 w-3.5" /> By Room
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'quick'}
              onClick={() => setMode('quick')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                mode === 'quick' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Search className="h-3.5 w-3.5" /> Search / Quick Add
            </button>
          </div>
        </div>

        {mode === 'room' && (
          <RoomChips
            selectedRoom={selectedRoom}
            inventory={inventory}
            onSelect={setSelectedRoom}
          />
        )}

        {mode === 'quick' && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder='Search anything — "couch", "fridge", "peloton"...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              aria-label="Search furniture catalog"
            />
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {mode === 'room' && selectedRoom && (
          <div className="space-y-5 max-h-[55vh] overflow-y-auto pr-1">
            {roomGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 sticky top-0 bg-card py-1 z-10">
                  {group.label}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.items.map((item) => (
                    <ItemCard
                      key={item.name}
                      name={item.name}
                      volume={item.volume}
                      quantity={getQty(item.name)}
                      icon={CATEGORY_ICONS[selectedRoom]}
                      onAdd={() => handleAdd(item.name, 'room_grid')}
                      onRemove={() => handleDecrement(item.name)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {mode === 'room' && !selectedRoom && (
          <div className="text-center py-12 text-muted-foreground text-sm border border-dashed rounded-xl">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p>Select a room above to browse its items.</p>
          </div>
        )}

        {mode === 'quick' && (
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
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
                  compact
                />
              ))
            ) : searchQuery ? (
              <div className="text-center py-10 text-muted-foreground text-sm">
                <p>No matches for &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-xs mt-1">Try &ldquo;couch&rdquo;, &ldquo;refrigerator&rdquo;, or add a custom item below.</p>
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground text-sm">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p>Search our full catalog of household items.</p>
                <p className="text-xs mt-1">Popular searches: sofa, bed, dresser, TV, boxes</p>
              </div>
            )}
          </div>
        )}

        {/* Custom item */}
        <div className="pt-4 border-t space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Don&apos;t see it? Add a custom item
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Item name (e.g., Antique dresser)"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="flex-1"
              aria-label="Custom item name"
            />
            <Button onClick={handleAddCustom} disabled={!customName.trim()} className="shrink-0">
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Item size">
            {CUSTOM_SIZES.map((size) => (
              <button
                key={size.label}
                type="button"
                role="radio"
                aria-checked={customSize === size.volume}
                onClick={() => setCustomSize(size.volume)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-left text-xs transition-colors',
                  customSize === size.volume
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/70 hover:border-primary/40'
                )}
              >
                <span className="font-semibold">{size.label}</span>
                <span className="text-muted-foreground ml-1">· {size.volume} cu ft</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}