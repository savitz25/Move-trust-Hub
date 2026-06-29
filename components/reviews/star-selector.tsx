'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
  size?: 'md' | 'lg';
  label?: string;
};

export function StarSelector({
  value,
  onChange,
  disabled = false,
  size = 'lg',
  label = 'Your rating',
}: Props) {
  const sizeClass = size === 'lg' ? 'h-9 w-9' : 'h-7 w-7';

  return (
    <div>
      <p className="text-sm font-medium mb-2">{label}</p>
      <div
        className="flex items-center gap-1"
        role="radiogroup"
        aria-label={label}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            disabled={disabled}
            onClick={() => onChange(star)}
            className={cn(
              'rounded-md p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Star
              className={cn(
                sizeClass,
                star <= value
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-muted-foreground/35'
              )}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground tabular-nums">
          {value > 0 ? `${value} / 5` : 'Select a rating'}
        </span>
      </div>
    </div>
  );
}