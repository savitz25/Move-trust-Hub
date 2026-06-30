'use client';

import { memo, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
};

export const DestinationsCollapsibleSection = memo(function DestinationsCollapsibleSection({
  title,
  open,
  onToggle,
  children,
  className,
  headingClassName,
}: Props) {
  const panelId = useId();
  const headingId = useId();

  return (
    <div className={cn('rounded-lg border border-border/50 overflow-hidden', className)}>
      <button
        type="button"
        id={headingId}
        className={cn(
          'w-full flex items-center justify-between px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20 min-h-[48px] transition-colors hover:bg-muted/40',
          headingClassName
        )}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {title}
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="px-3 pb-3 pt-1">{children}</div>
        </div>
      </div>
    </div>
  );
});