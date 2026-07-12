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
};

export function ItemCard({
  name,
  volume,
  quantity,
  icon,
  onAdd,
  onRemove,
  compact,
}: ItemCardProps) {
  const displayName = formatItemDisplayName(name);
  const active = quantity > 0;

  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-xl border bg-card p-2.5 transition-all duration-150',
        active ? 'border-primary/40 bg-primary/5 shadow-sm' : 'border-border/70 hover:border-border hover:shadow-trust',
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