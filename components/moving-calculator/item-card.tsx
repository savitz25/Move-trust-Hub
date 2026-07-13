'use client';

import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatItemDisplayName } from '@/lib/moving-calculator/display-names';
import { cn } from '@/lib/utils';

type ItemCardProps = {
  name: string;
  volume: number;
  quantity: number;
  icon?: React.ReactNode;
  onAdd: () => void;
  onRemove: () => void;
  compact?: boolean;
  /** Mobile calculator: stacked layout with 48px+ touch targets */
  mobile?: boolean;
};

export function ItemCard({
  name,
  volume,
  quantity,
  icon,
  onAdd,
  onRemove,
  compact,
  mobile,
}: ItemCardProps) {
  const displayName = formatItemDisplayName(name);
  const active = quantity > 0;

  const cardBase = cn(
    'rounded-xl border bg-card transition-all duration-150 max-w-full',
    active
      ? 'border-primary/40 bg-primary/5 shadow-sm'
      : 'border-border/70 hover:border-border hover:shadow-trust'
  );

  if (mobile) {
    return (
      <div className={cn(cardBase, 'p-3 w-full touch-manipulation')}>
        <div className="flex items-start gap-2.5 min-w-0">
          {icon ? (
            <div className="shrink-0 text-muted-foreground opacity-70 mt-0.5" aria-hidden="true">
              {icon}
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm leading-snug break-words">{displayName}</div>
            <div className="text-xs text-muted-foreground tabular-nums mt-0.5">{volume} cu ft</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/50 pt-3">
          <span className="text-xs font-medium text-muted-foreground shrink-0">Qty</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl shrink-0"
              onClick={onRemove}
              disabled={quantity === 0}
              aria-label={`Remove one ${displayName}`}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span
              className={cn(
                'w-10 text-center text-lg font-bold tabular-nums',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
              aria-live="polite"
            >
              {quantity}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl shrink-0 hover:bg-primary/10 hover:text-primary hover:border-primary/40"
              onClick={onAdd}
              aria-label={`Add one ${displayName}`}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group flex items-center gap-2',
        cardBase,
        'p-2.5',
        compact ? 'p-2' : 'sm:p-3'
      )}
    >
      {icon && (
        <div className="shrink-0 text-muted-foreground opacity-70" aria-hidden="true">
          {icon}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className={cn('font-medium leading-snug', compact ? 'text-xs' : 'text-sm')}>
          {displayName}
        </div>
        <div className="text-[11px] text-muted-foreground tabular-nums">
          {volume} cu ft
        </div>
      </div>

      <div className="flex items-center gap-0.5 shrink-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg"
          onClick={onRemove}
          disabled={quantity === 0}
          aria-label={`Remove one ${displayName}`}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <span
          className={cn(
            'w-7 text-center text-sm font-semibold tabular-nums transition-colors',
            active ? 'text-primary' : 'text-muted-foreground'
          )}
          aria-live="polite"
        >
          {quantity}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
          onClick={onAdd}
          aria-label={`Add one ${displayName}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}