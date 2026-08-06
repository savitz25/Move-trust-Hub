import { Check } from 'lucide-react';
import { MOVE_HERO_CHIPS } from '@/lib/design/move-design-system';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  chips?: readonly string[];
};

/** Forced high-contrast chip text + icon — never muted slate */
const CHIP_INK = '#1E293B';

/**
 * Hero trust chips — dark ink text/checkmarks for AA contrast on light hero.
 */
export function HeroFeatureChips({
  className,
  chips = MOVE_HERO_CHIPS,
}: Props) {
  return (
    <ul
      className={cn(
        'flex flex-wrap items-center justify-center gap-1.5 sm:gap-2',
        className
      )}
      aria-label="What you get with Move Trust Hub research"
    >
      {chips.map((label) => (
        <li
          key={label}
          className={cn(
            'inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-400/90',
            'bg-primary/[0.06] px-2.5 py-1.5 text-[11px] font-medium leading-snug',
            'sm:px-3 sm:text-sm dark:border-primary/25 dark:bg-primary/10'
          )}
          style={{ color: CHIP_INK }}
        >
          <span
            className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-slate-400/80 bg-white sm:h-4 sm:w-4"
            style={{ color: CHIP_INK }}
            aria-hidden
          >
            <Check
              className="h-2 w-2 sm:h-2.5 sm:w-2.5"
              strokeWidth={3}
              color={CHIP_INK}
              style={{ color: CHIP_INK }}
            />
          </span>
          <span className="text-left" style={{ color: CHIP_INK }}>
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
