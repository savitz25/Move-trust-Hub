import { Check } from 'lucide-react';
import { MOVE_HERO_CHIPS } from '@/lib/design/move-design-system';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  chips?: readonly string[];
};

/**
 * Hero trust chips — checkmarks + controlled orange accents.
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
            'inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-300/80',
            'bg-primary/[0.06] px-2.5 py-1.5 text-[11px] font-medium leading-snug text-slate-700',
            'sm:px-3 sm:text-sm dark:border-primary/25 dark:bg-primary/10 dark:text-slate-200'
          )}
        >
          <span
            className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-slate-700 text-white sm:h-4 sm:w-4 dark:bg-slate-200 dark:text-slate-900"
            aria-hidden
          >
            <Check className="h-2 w-2 stroke-[3] sm:h-2.5 sm:w-2.5" />
          </span>
          <span className="text-left">{label}</span>
        </li>
      ))}
    </ul>
  );
}
