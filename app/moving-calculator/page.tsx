'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Minus, Trash2, Calculator, Truck, Users, Clock, 
  Search, Home, Sofa, Bed, UtensilsCrossed, Briefcase, Car, 
  Shirt, Trees, Bath, Package 
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCalculatorStore, type InventoryItem, type InputMode } from '@/store/calculator-store';
import { furnitureItems, roomCategories, getItemsByCategory, searchItems, type FurnitureItem } from '@/data/furniture';
import { toast } from 'sonner';

// Move size thresholds and recommendations (realistic industry averages)
const MOVE_SIZES = [
  { 
    label: 'Studio / Small', 
    min: 0, 
    max: 900, 
    truck: '10–12 ft truck or 1 container', 
    movers: '2 movers', 
    duration: '2–4 hours',
    color: 'bg-emerald-500' 
  },
  { 
    label: '1-Bedroom', 
    min: 901, 
    max: 1800, 
    truck: '16–20 ft truck or 2 containers', 
    movers: '2–3 movers', 
    duration: '4–6 hours',
    color: 'bg-teal-500' 
  },
  { 
    label: '2-Bedroom', 
    min: 1801, 
    max: 2800, 
    truck: '22–26 ft truck or 3 containers', 
    movers: '3–4 movers', 
    duration: '6–8 hours',
    color: 'bg-blue-500' 
  },
  { 
    label: '3-Bedroom', 
    min: 2801, 
    max: 4000, 
    truck: '26–28 ft truck or 4 containers', 
    movers: '4 movers', 
    duration: '8–10 hours',
    color: 'bg-indigo-500' 
  },
  { 
    label: '4+ Bedroom / Large', 
    min: 4001, 
    max: Infinity, 
    truck: '28+ ft truck or 5+ containers', 
    movers: '4–6 movers', 
    duration: '10+ hours',
    color: 'bg-violet-500' 
  },
];

function getRecommendation(cuFt: number) {
  return MOVE_SIZES.find(s => cuFt >= s.min && cuFt <= s.max) || MOVE_SIZES[MOVE_SIZES.length - 1];
}

// Simple icon map for categories (tropical/trustworthy feel)
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Bedroom': <Bed className="h-4 w-4" />,
  'Living Room': <Sofa className="h-4 w-4" />,
  'Kitchen': <UtensilsCrossed className="h-4 w-4" />,
  'Dining Room': <UtensilsCrossed className="h-4 w-4" />,
  'Office': <Briefcase className="h-4 w-4" />,
  'Garage / Laundry': <Car className="h-4 w-4" />,
  'Outdoor': <Trees className="h-4 w-4" />,
  'Bathroom': <Bath className="h-4 w-4" />,
  'Other': <Package className="h-4 w-4" />,
  'Packing Supplies': <Package className="h-4 w-4" />,
};

export default function MovingCalculatorPage() {
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
    clearInventory,
  } = useCalculatorStore();

  // Local UI state
  const [quickSearch, setQuickSearch] = useState('');
  const [customName, setCustomName] = useState('');
  const [customVolume, setCustomVolume] = useState('');
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [quoteName, setQuoteName] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');

  // For browsing the full (larger) list from xlsx in a modal
  const [showBrowseDialog, setShowBrowseDialog] = useState(false);
  const [browseSearch, setBrowseSearch] = useState('');

  // Computed values
  const totalVolume = useMemo(() => 
    inventory.reduce((sum, item) => sum + item.volume * item.quantity, 0), 
    [inventory]
  );

  const totalItems = useMemo(() => 
    inventory.reduce((sum, item) => sum + item.quantity, 0), 
    [inventory]
  );

  const recommendation = getRecommendation(totalVolume);

  // Grouped by room (only meaningful in room mode)
  const groupedByRoom = useMemo(() => {
    if (mode !== 'room') return [];
    const groups: Record<string, InventoryItem[]> = {};
    inventory.forEach(item => {
      const room = item.room || 'Unassigned';
      if (!groups[room]) groups[room] = [];
      groups[room].push(item);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [inventory, mode]);

  // Items for current view
  // Note: Source xlsx has 400+ items. We use a large curated subset (~127).
  // See scripts/update-furniture-from-xlsx.py to adjust how many are included.
  const currentItems = useMemo(() => {
    let list: FurnitureItem[] = [];

    if (mode === 'room' && selectedRoom) {
      list = getItemsByCategory(selectedRoom);
    } else if (mode === 'quick') {
      list = quickSearch ? searchItems(quickSearch) : furnitureItems;
    }

    // Cap the visible grid for cleanliness. The full set is searchable + available in "Browse full list".
    return list.slice(0, 24);
  }, [mode, selectedRoom, quickSearch]);

  // Handle adding from list
  const handleAdd = (itemName: string) => {
    if (mode === 'room' && !selectedRoom) {
      toast.error('Please select a room first');
      return;
    }
    addItem(itemName);
    toast.success(`Added ${itemName}`, { description: 'Quantity increased' });
  };

  // Add custom
  const handleAddCustom = () => {
    const vol = parseFloat(customVolume);
    if (!customName.trim() || !vol || vol <= 0) {
      toast.error('Please enter a valid item name and volume (cu ft)');
      return;
    }
    addCustomItem(customName.trim(), vol, selectedRoom || undefined);
    setCustomName('');
    setCustomVolume('');
    toast.success('Custom item added');
  };

  // Handle quote "submission" (demo)
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quoteEmail) {
      toast.error('Please provide your name and email');
      return;
    }
    // In real app this would POST to API or email service
    console.log('Quote request:', { 
      name: quoteName, 
      email: quoteEmail, 
      notes: quoteNotes, 
      totalVolume, 
      recommendation: recommendation.label,
      items: inventory.length 
    });
    toast.success('Quote request received!', {
      description: "We'll contact you within 24 hours with a personalized estimate.",
    });
    setShowQuoteDialog(false);
    setQuoteName('');
    setQuoteEmail('');
    setQuoteNotes('');
  };

  // Visual progress: how far into the current bracket
  const progress = useMemo(() => {
    const current = MOVE_SIZES.findIndex(s => totalVolume >= s.min && totalVolume <= s.max);
    if (current === -1 || current === MOVE_SIZES.length - 1) return 100;
    const bracket = MOVE_SIZES[current];
    const next = MOVE_SIZES[current + 1];
    const range = next.min - bracket.min;
    const pos = totalVolume - bracket.min;
    return Math.min(100, Math.max(5, Math.round((pos / range) * 100)));
  }, [totalVolume]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-3">
            <Calculator className="h-4 w-4" /> FREE • INSTANT • ACCURATE
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
            Smart Move Estimator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build your inventory and instantly see your total volume, recommended truck size, and mover requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* LEFT: Input Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Mode Switch */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  How would you like to add items?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={mode === 'room' ? 'default' : 'outline'}
                    onClick={() => setMode('room')}
                    className="flex-1 min-w-[140px]"
                  >
                    <Home className="mr-2 h-4 w-4" /> By Room (Recommended)
                  </Button>
                  <Button
                    variant={mode === 'quick' ? 'default' : 'outline'}
                    onClick={() => setMode('quick')}
                    className="flex-1 min-w-[140px]"
                  >
                    <Package className="mr-2 h-4 w-4" /> Quick Add (Fast)
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {mode === 'room' 
                    ? 'Select a room, then add the items inside it. Great for accurate room-by-room estimates.'
                    : 'Quickly add any item from our full list. Perfect for fast estimates.'}
                </p>
              </CardContent>
            </Card>

            {/* Room Selector (Room Mode) */}
            {mode === 'room' && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Select a Room</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {roomCategories.map((room) => (
                      <Button
                        key={room}
                        variant={selectedRoom === room ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedRoom(room)}
                        className="justify-start gap-2 h-auto py-2"
                      >
                        {CATEGORY_ICONS[room] || <Package className="h-4 w-4" />}
                        <span className="text-sm">{room}</span>
                      </Button>
                    ))}
                  </div>
                  {!selectedRoom && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                      Choose a room above to see relevant items.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Item Selector */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {mode === 'room' && selectedRoom 
                      ? `${selectedRoom} Items` 
                      : mode === 'quick' ? 'Browse / Search Items' : 'Select Items'}
                  </CardTitle>
                  {mode === 'quick' && (
                    <div className="relative w-56">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search furniture..."
                        value={quickSearch}
                        onChange={(e) => setQuickSearch(e.target.value)}
                        className="pl-9 h-9"
                      />
                    </div>
                  )}
                  {mode === 'quick' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => { setBrowseSearch(''); setShowBrowseDialog(true); }}
                      className="ml-2"
                    >
                      Browse full list ({furnitureItems.length})
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[420px] overflow-auto pr-1 custom-scroll">
                  <AnimatePresence>
                    {currentItems.length > 0 ? (
                      currentItems.map((item) => {
                        const alreadyInInventory = inventory.some(
                          inv => inv.name === item.name && 
                                 (mode !== 'room' || inv.room === selectedRoom)
                        );
                        return (
                          <motion.div
                            key={item.name}
                            whileHover={{ scale: 1.01 }}
                            className="flex items-center justify-between gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                          >
                            <div className="min-w-0">
                              <div className="font-medium text-sm leading-tight">{item.name}</div>
                              <div className="text-xs text-muted-foreground tabular-nums">
                                {item.volume} cu ft
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant={alreadyInInventory ? "secondary" : "default"}
                              onClick={() => handleAdd(item.name)}
                              className="shrink-0"
                            >
                              <Plus className="h-3.5 w-3.5 mr-1" /> Add
                            </Button>
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="col-span-full text-center py-8 text-muted-foreground text-sm">
                        No items match your search.
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Custom Item Adder */}
                <div className="mt-4 pt-4 border-t">
                  <div className="text-xs font-medium text-muted-foreground mb-2">DON&apos;T SEE IT? ADD A CUSTOM ITEM</div>
                  <div className="text-[10px] text-muted-foreground">Sourced from your items-volume.xlsx (curated subset of the 400+; now includes Packing Supplies boxes/bins). Use search or "Browse full list" below for more.</div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input 
                      placeholder="Item name (e.g. Antique Armoire)" 
                      value={customName} 
                      onChange={e => setCustomName(e.target.value)} 
                      className="flex-1"
                    />
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        placeholder="Volume (cu ft)" 
                        value={customVolume} 
                        onChange={e => setCustomVolume(e.target.value)} 
                        className="w-28" 
                        min="1" 
                        max="500"
                      />
                      <Button onClick={handleAddCustom} disabled={!customName.trim() || !customVolume}>
                        <Plus className="h-4 w-4 mr-1" /> Add Custom
                      </Button>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">Tip: Measure your item or search online for “cubic feet” estimates.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Live Summary + Results */}
          <div className="lg:col-span-5 space-y-6">
            {/* Prominent Total */}
            <Card className="bg-primary text-primary-foreground border-0 shadow-trust-lg">
              <CardContent className="pt-6 pb-5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-sm opacity-90 font-medium tracking-wider">TOTAL VOLUME</div>
                    <div className="text-7xl font-semibold tabular-nums tracking-tighter mt-1">
                      {Math.round(totalVolume)}
                    </div>
                    <div className="text-xl -mt-2 opacity-90">cubic feet</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-medium">{totalItems}</div>
                    <div className="text-sm opacity-75">items</div>
                  </div>
                </div>

                {/* Visual progress bar */}
                <div className="mt-4">
                  <div className="h-2.5 bg-primary-foreground/20 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${recommendation.color.replace('bg-', 'bg-white/90')}`} 
                      style={{ width: `${progress}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ type: 'spring', stiffness: 120 }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] mt-1 opacity-75">
                    <div>Small</div>
                    <div>Large Move</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  Recommended Move Size
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge className="text-base px-3 py-1" variant="default">
                    {recommendation.label}
                  </Badge>
                  <div className="mt-3 grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Truck className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <div>
                        <div className="font-medium">Truck / Container</div>
                        <div className="text-muted-foreground">{recommendation.truck}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <div>
                        <div className="font-medium">Movers Needed</div>
                        <div className="text-muted-foreground">{recommendation.movers}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <div>
                        <div className="font-medium">Estimated Time</div>
                        <div className="text-muted-foreground">{recommendation.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={() => setShowQuoteDialog(true)}
                >
                  Get Free Quote Based on This Estimate
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  No obligation. We’ll reach out within 1 business day.
                </p>

                <div className="pt-4 border-t text-center">
                  <p className="text-sm font-medium mb-2">Want quotes from real movers right now?</p>
                  <Button variant="outline" onClick={() => setShowQuoteDialog(true)}>
                    Get Matched with 3–5 Verified Movers
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Inventory */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Your Inventory ({totalItems} items)</CardTitle>
                {inventory.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearInventory} className="text-destructive hover:text-destructive">
                    Clear All
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {inventory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-lg">
                    Add items from the left to see them here.<br />
                    Your list is automatically saved.
                  </div>
                ) : mode === 'room' && groupedByRoom.length > 0 ? (
                  <div className="space-y-4">
                    {groupedByRoom.map(([room, items]) => (
                      <div key={room}>
                        <div className="font-medium text-sm flex items-center gap-2 mb-1.5 text-primary">
                          {CATEGORY_ICONS[room] || <Package className="h-3.5 w-3.5" />} {room}
                        </div>
                        <div className="space-y-1.5 pl-1">
                          {items.map(item => (
                            <InventoryRow 
                              key={item.id} 
                              item={item} 
                              onUpdateQty={updateQuantity} 
                              onRemove={removeItem} 
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {inventory.map(item => (
                      <InventoryRow 
                        key={item.id} 
                        item={item} 
                        onUpdateQty={updateQuantity} 
                        onRemove={removeItem} 
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quote Dialog */}
        <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Get a Free Personalized Quote</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleQuoteSubmit} className="space-y-4 pt-2">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input value={quoteName} onChange={e => setQuoteName(e.target.value)} required placeholder="Jane Doe" />
              </div>
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" value={quoteEmail} onChange={e => setQuoteEmail(e.target.value)} required placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Move Date or Additional Notes (optional)</label>
                <Input value={quoteNotes} onChange={e => setQuoteNotes(e.target.value)} placeholder="Moving in June from Austin to Denver..." />
              </div>
              <div className="bg-muted p-3 rounded text-xs text-muted-foreground">
                Based on your estimate: <strong>{Math.round(totalVolume)} cu ft</strong> • {recommendation.label}
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1">Request Quote</Button>
                <Button type="button" variant="outline" onClick={() => setShowQuoteDialog(false)}>Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Full catalog browser for accessing items from the large xlsx source */}
        <Dialog open={showBrowseDialog} onOpenChange={setShowBrowseDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Browse Full Item Catalog ({furnitureItems.length} items)</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search the full list from your xlsx..."
                  value={browseSearch}
                  onChange={(e) => setBrowseSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="max-h-[420px] overflow-auto border rounded-lg p-2 space-y-1">
                {searchItems(browseSearch).slice(0, 60).map((item: FurnitureItem) => {
                  const alreadyInInventory = inventory.some(
                    inv => inv.name === item.name && 
                           (mode !== 'room' || inv.room === selectedRoom)
                  );
                  return (
                    <div key={item.name} className="flex items-center justify-between gap-2 p-2 hover:bg-muted/50 rounded text-sm">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{item.volume} cu ft • {item.category}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant={alreadyInInventory ? "secondary" : "default"}
                        onClick={() => handleAdd(item.name)}
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add
                      </Button>
                    </div>
                  );
                })}
                {searchItems(browseSearch).length > 60 && (
                  <div className="text-xs text-center text-muted-foreground pt-2">Showing first 60 matches. Refine search for more.</div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">This is the curated list generated from your items-volume.xlsx. Add customs for anything missing.</p>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowBrowseDialog(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="mt-10 text-center text-xs text-muted-foreground max-w-md mx-auto">
          Volumes are industry-standard averages. Actual space may vary based on packing style and item sizes. 
          This tool is for estimation only.
        </div>
      </div>
    </div>
  );
}

// Small reusable row for current inventory
function InventoryRow({ 
  item, 
  onUpdateQty, 
  onRemove 
}: { 
  item: InventoryItem; 
  onUpdateQty: (id: string, qty: number) => void; 
  onRemove: (id: string) => void; 
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm bg-card">
      <div className="min-w-0 flex-1">
        <div className="font-medium leading-tight">{item.name}</div>
        {item.room && <div className="text-[10px] text-muted-foreground">{item.room}</div>}
        <div className="text-xs text-muted-foreground tabular-nums">{item.volume} cu ft × {item.quantity}</div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <Button 
          size="icon" 
          variant="outline" 
          className="h-7 w-7" 
          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <div className="w-6 text-center font-medium tabular-nums">{item.quantity}</div>
        <Button 
          size="icon" 
          variant="outline" 
          className="h-7 w-7" 
          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-7 w-7 text-destructive hover:text-destructive" 
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="w-14 text-right font-semibold tabular-nums text-primary">
        {Math.round(item.volume * item.quantity)}
      </div>
    </div>
  );
}
