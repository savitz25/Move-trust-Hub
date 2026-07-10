'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const RATING_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Great',
  5: 'Excellent',
};

type Props = {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
  size?: 'md' | 'lg' | 'xl';
  label?: string;
  showLabel?: boolean;
};

export function StarSelector({
  value,
  onChange,
  disabled = false,
  size = 'xl',
  label = 'Overall rating',
  showLabel = true,
}: Props) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  const sizeClass =
    size === 'xl' ? 'h-11 w-11 sm:h-12 sm:w-12' : size === 'lg' ? 'h-9 w-9' : 'h-7 w-7';

  return (
    <div className="text-center sm:text-left">
      {showLabel ? (
        <p className="text-sm font-medium mb-3 text-muted-foreground">{label}</p>
      ) : null}

      <div
        className="inline-flex items-center gap-0.5 sm:gap-1"
        role="radiogroup"
        aria-label={label}
        onMouseLeave={() => setHovered(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? 's' : ''} — ${RATING_LABELS[star]}`}
            disabled={disabled}
            onMouseEnter={() => !disabled && setHovered(star)}
            onFocus={() => !disabled && setHovered(star)}
            onBlur={() => setHovered(0)}
            onClick={() => onChange(star)}
            className={cn(
              'rounded-lg p-1.5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              !disabled && 'hover:scale-110 active:scale-95',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Star
              className={cn(
                sizeClass,
                'transition-colors duration-150',
                star <= active
                  ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                  : 'text-muted-foreground/30'
              )}
            />
          </button>
        ))}
      </div>

      <p
        className={cn(
          'mt-3 text-base font-medium transition-opacity duration-150',
          active > 0 ? 'text-foreground opacity-100' : 'text-muted-foreground opacity-70'
        )}
        aria-live="polite"
      >
        {active > 0 ? RATING_LABELS[active] : 'Tap a star to rate your experience'}
      </p>
    </div>
  );
}