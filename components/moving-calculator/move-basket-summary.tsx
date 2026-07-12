'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck, Users, Clock, ChevronDown, ChevronUp, Minus, Plus, Trash2,
  Package, AlertTriangle, Shield,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedNumber } from '@/components/moving-calculator/animated-number';
import { ExportActions } from '@/components/moving-calculator/export-actions';
import { SaveInventoryButton } from '@/components/save-my-move/save-inventory-button';
import {
  formatItemDisplayName,
  isSpecialHandlingItem,
} from '@/lib/moving-calculator/display-names';
import {
  estimateWeight,
  getMoveRecommendation,
  getBracketProgress,
  suggestBoxes,
  LBS_PER_CU_FT,
} from '@/lib/moving-calculator/estimates';
import { MOVE_PRESETS } from '@/lib/moving-calculator/move-presets';
import type { InventoryItem } from '@/store/calculator-store';
import { trackBoxesSuggested } from '@/components/ga-events';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type MoveBasketSummaryProps = {
  inventory: InventoryItem[];
  groupedByRoom: [string, InventoryItem[]][];
  totalVolume: number;
  totalItems: number;
  movePreset: string | null;
  mode: string;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onAddBoxes: (boxes: ReturnType<typeof suggestBoxes>) => void;
  mobileCollapsed?: boolean;
  onToggleMobile?: () => void;
};

export function MoveBasketSummary({
  inventory,
  groupedByRoom,
  totalVolume,
  totalItems,
  movePreset,
  mode,
  onUpdateQty,
  onRemove,
  onClear,
  onAddBoxes,
  mobileCollapsed,
  onToggleMobile,
}: MoveBasketSummaryProps) {
  const [expandedRooms, setExpandedRooms] = useState<Record<string, boolean>>({});
  const recommendation = getMoveRecommendation(totalVolume);
  const totalWeight = estimateWeight(totalVolume);
  const progress = getBracketProgress(totalVolume);
  const specialItems = inventory.filter((i) => isSpecialHandlingItem(i.name));
  const boxSuggestions = suggestBoxes(totalVolume);
  const presetLabel = MOVE_PRESETS.find((p) => p.id === movePreset)?.label ?? null;

  const toggleRoom = (room: string) => {
    setExpandedRooms((prev) => ({ ...prev, [room]: !prev[room] }));
  };

  const handleAddBoxes = () => {
    onAddBoxes(boxSuggestions);
    const count = boxSuggestions.reduce((s, b) => s + b.quantity, 0);
    trackBoxesSuggested({ box_count: count });
    toast.success('Suggested boxes added', {
      description: `${count} boxes added to your inventory.`,
    });
  };

  const summaryContent = (
    <>
      {/* Totals hero */}
      <div className="rounded-xl bg-primary text-primary-foreground p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Total Volume</p>
            <div className="text-3xl sm:text-4xl font-bold tabular-nums tracking-tight">
              <AnimatedNumber value={Math.round(totalVolume)} />
              <span className="text-lg font-medium ml-1 opacity-90">cu ft</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Est. Weight</p>
            <div className="text-2xl sm:text-3xl font-bold tabular-nums">
              <AnimatedNumber value={totalWeight} />
              <span className="text-sm font-medium ml-0.5 opacity-90">lbs</span>
            </div>
            <p className="text-[10px] opacity-70">at {LBS_PER_CU_FT} lbs/cu ft</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span><AnimatedNumber value={totalItems} /> items</span>
          <Badge variant="secondary" className="bg-primary-foreground/15 text-primary-foreground border-0">
            {recommendation.label}
          </Badge>
        </div>

        {/* Truck gauge */}
        <div className="mt-3">
          <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-foreground/90 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
          <div className="flex justify-between text-[10px] opacity-70 mt-1">
            <span>Studio</span>
            <span>Large home</span>
          </div>
        </div>
      </div>

      {/* Truck / crew / time */}
      <div className="grid grid-cols-1 gap-2 text-sm">
        <div className="flex items-start gap-2.5 rounded-lg border bg-muted/20 px-3 py-2.5">
          <Truck className="h-4 w-4 mt-0.5 text-primary shrink-0" />
          <div>
            <p className="font-medium text-xs text-muted-foreground">Recommended truck</p>
            <p className="leading-snug">{recommendation.truck}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-start gap-2 rounded-lg border bg-muted/20 px-3 py-2.5">
            <Users className="h-4 w-4 mt-0.5 text-primary shrink-0" />
            <div>
              <p className="font-medium text-xs text-muted-foreground">Crew</p>
              <p className="text-sm">{recommendation.movers}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg border bg-muted/20 px-3 py-2.5">
            <Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" />
            <div>
              <p className="font-medium text-xs text-muted-foreground">Est. time</p>
              <p className="text-sm">{recommendation.duration}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Box suggestion */}
      {totalVolume > 0 && (
        <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3">
          <div className="flex items-start gap-2">
            <Package className="h-4 w-4 mt-0.5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Box suggestion</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                ~{boxSuggestions.reduce((s, b) => s + b.quantity, 0)} boxes for a move this size
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={handleAddBoxes} className="shrink-0 text-xs h-8">
              Add boxes
            </Button>
          </div>
        </div>
      )}

      {/* Special handling */}
      {specialItems.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-3">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 mb-2">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-sm font-semibold">Special handling</p>
          </div>
          <ul className="space-y-1">
            {specialItems.map((item) => (
              <li key={item.id} className="text-xs text-amber-900 dark:text-amber-100">
                {formatItemDisplayName(item.name)} × {item.quantity}
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-amber-700 dark:text-amber-300 mt-2">
            Tell movers about these items when requesting quotes.
          </p>
        </div>
      )}

      {/* Itemized list */}
      {inventory.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">By room</p>
            <Button variant="ghost" size="sm" onClick={onClear} className="text-destructive hover:text-destructive h-7 text-xs">
              Clear all
            </Button>
          </div>
          {groupedByRoom.map(([room, items]) => {
            const roomVol = items.reduce((s, i) => s + i.volume * i.quantity, 0);
            const expanded = expandedRooms[room] !== false;
            return (
              <div key={room} className="rounded-lg border overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleRoom(room)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium hover:bg-muted/30 transition-colors"
                  aria-expanded={expanded}
                >
                  <span>{room} <span className="text-muted-foreground font-normal">({Math.round(roomVol)} cu ft)</span></span>
                  {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 pb-2 space-y-1">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-1.5 rounded-md bg-muted/20 px-2 py-1.5 text-xs">
                            <span className="flex-1 min-w-0 truncate font-medium">
                              {formatItemDisplayName(item.name)}
                            </span>
                            <div className="flex items-center gap-0.5 shrink-0">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                                onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-5 text-center tabular-nums font-semibold">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                                onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 text-destructive hover:text-destructive"
                                onClick={() => onRemove(item.id)}
                                aria-label="Remove item"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-xl">
          <Package className="h-8 w-8 mx-auto mb-2 opacity-40" />
          <p>Your move basket is empty.</p>
          <p className="text-xs mt-1">Pick a move size above or add items to get started.</p>
        </div>
      )}

      {/* Export */}
      {inventory.length > 0 && (
        <div className="space-y-2">
          <SaveInventoryButton
            inventory={inventory}
            mode={mode}
            movePreset={movePreset}
            totalVolume={totalVolume}
            className="w-full"
          />
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Export inventory</p>
          <ExportActions
            inventory={inventory}
            groupedByRoom={groupedByRoom}
            totalVolume={totalVolume}
            totalItems={totalItems}
            mode={mode}
            presetLabel={presetLabel}
          />
        </div>
      )}

      {/* Trust + CTA */}
      <div className="rounded-lg border bg-muted/20 p-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>We never sell your information. No account required.</span>
        </div>
        <Button size="sm" className="w-full" asChild>
          <Link href="/companies">Compare licensed movers</Link>
        </Button>
      </div>
    </>
  );

  // Mobile: sticky bottom bar
  if (mobileCollapsed !== undefined) {
    return (
      <>
        {/* Sticky bottom bar (mobile) */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-card/95 backdrop-blur-sm shadow-trust-lg">
          <button
            type="button"
            onClick={onToggleMobile}
            className="w-full flex items-center justify-between px-4 py-3"
            aria-expanded={!mobileCollapsed}
          >
            <div className="flex items-center gap-3">
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Your Move Basket</p>
                <p className="text-lg font-bold tabular-nums">
                  <AnimatedNumber value={Math.round(totalVolume)} /> cu ft
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    · <AnimatedNumber value={totalItems} /> items
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">{recommendation.label}</Badge>
              {mobileCollapsed ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </button>

          <AnimatePresence>
            {!mobileCollapsed && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden border-t max-h-[70vh] overflow-y-auto"
              >
                <div className="p-4 space-y-4">{summaryContent}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="lg:hidden h-20" aria-hidden="true" />
      </>
    );
  }

  // Desktop sidebar
  return (
    <Card className={cn('shadow-trust lg:sticky lg:top-4')}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" />
          Your Move Basket
        </CardTitle>
        <p className="text-xs text-muted-foreground">Live estimate · auto-saved locally</p>
      </CardHeader>
      <CardContent className="space-y-4">{summaryContent}</CardContent>
    </Card>
  );
}