'use client';

import { useId, useState } from 'react';
import { BarChart3, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type HowWeScoreAccordionProps = {
  className?: string;
  children: React.ReactNode;
};

export function HowWeScoreAccordion({ className = '', children }: HowWeScoreAccordionProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section className={cn('rounded-2xl border bg-card', className)}>
      <h2 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            'flex w-full items-center justify-between gap-3 rounded-2xl p-6 text-left',
            'min-h-[44px] transition-colors hover:bg-muted/30',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          )}
        >
          <span className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              How We Score Movers (0–100)
            </span>
          </span>
          <ChevronDown
            className={cn(
              'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200',
              open && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </button>
      </h2>

      <div
        id={panelId}
        role="region"
        aria-label="How We Score Movers details"
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t px-6 pb-6 pt-4">{children}</div>
        </div>
      </div>
    </section>
  );
}