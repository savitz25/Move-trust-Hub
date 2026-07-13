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
  /** Mobile calculator: 44px+ touch targets */
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

  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-xl border bg-card transition-all duration-150',
        mobile ? 'p-3 min-h-[56px]' : 'p-2.5',
        active ? 'border-primary/40 bg-primary/5 shadow-sm' : 'border-border/70 hover:border-border hover:shadow-trust',
        compact && !mobile ? 'p-2' : !mobile ? 'sm:p-3' : ''
      )}
    >
      {icon && (
        <div className="shrink-0 text-muted-foreground opacity-70" aria-hidden="true">
          {icon}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className={cn('font-medium leading-snug', mobile ? 'text-sm' : compact ? 'text-xs' : 'text-sm')}>
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
          className={cn('rounded-xl', mobile ? 'h-11 w-11' : 'h-8 w-8 rounded-lg')}
          onClick={onRemove}
          disabled={quantity === 0}
          aria-label={`Remove one ${displayName}`}
        >
          <Minus className={mobile ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
        </Button>
        <span
          className={cn(
            'text-center font-semibold tabular-nums transition-colors',
            mobile ? 'w-8 text-base' : 'w-7 text-sm',
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
          className={cn(
            'hover:bg-primary/10 hover:text-primary',
            mobile ? 'h-11 w-11 rounded-xl' : 'h-8 w-8 rounded-lg'
          )}
          onClick={onAdd}
          aria-label={`Add one ${displayName}`}
        >
          <Plus className={mobile ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
        </Button>
      </div>
    </div>
  );
}