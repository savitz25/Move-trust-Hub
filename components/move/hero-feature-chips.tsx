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
        'flex flex-wrap items-center justify-center gap-2 sm:gap-2.5',
        className
      )}
      aria-label="What you get with Move Trust Hub research"
    >
      {chips.map((label) => (
        <li
          key={label}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border border-primary/15',
            'bg-primary/[0.06] px-3 py-1.5 text-xs font-medium text-[#3d4f63]',
            'sm:text-sm dark:border-primary/25 dark:bg-primary/10 dark:text-slate-200'
          )}
        >
          <span
            className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-hidden
          >
            <Check className="h-2.5 w-2.5 stroke-[3]" />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}
