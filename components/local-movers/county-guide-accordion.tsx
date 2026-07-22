'use client';

import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CountyGuideSection = {
  id: string;
  title: string;
  /** Short helper under the title when collapsed */
  summary?: string;
  icon?: ReactNode;
  children: ReactNode;
  /** Open on first paint — default false so listings stay primary */
  defaultOpen?: boolean;
};

type Props = {
  countyLabel: string;
  sections: CountyGuideSection[];
  className?: string;
};

function GuideSection({
  section,
  defaultOpen = false,
}: {
  section: CountyGuideSection;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            'flex w-full items-center justify-between gap-3 p-4 sm:p-5 text-left',
            'min-h-[48px] transition-colors hover:bg-muted/30',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset'
          )}
        >
          <span className="flex items-start gap-3 min-w-0">
            {section.icon ? (
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {section.icon}
              </span>
            ) : null}
            <span className="min-w-0">
              <span className="block text-base sm:text-lg font-semibold tracking-tight text-foreground">
                {section.title}
              </span>
              {section.summary && !open ? (
                <span className="mt-0.5 block text-xs sm:text-sm text-muted-foreground line-clamp-2">
                  {section.summary}
                </span>
              ) : null}
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
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t px-4 sm:px-5 pb-5 pt-4">{section.children}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Secondary county education: costs, market notes, tips, FAQs.
 * Closed by default so the mover list remains the primary intent.
 */
export function CountyGuideAccordion({ countyLabel, sections, className }: Props) {
  if (!sections.length) return null;

  return (
    <section
      className={cn('mb-10', className)}
      aria-labelledby="county-guide-heading"
      id="county-guide"
    >
      <div className="mb-4">
        <h2
          id="county-guide-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          {countyLabel} guide &amp; local details
        </h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Expand any section for costs, seasonal notes, parking/HOA rules, tips, and FAQs.
          All content is unique to this county — nothing was removed, just moved below the listings.
        </p>
      </div>
      <div className="space-y-3">
        {sections.map((section) => (
          <GuideSection
            key={section.id}
            section={section}
            defaultOpen={section.defaultOpen}
          />
        ))}
      </div>
    </section>
  );
}
