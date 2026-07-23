'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type NavItem = { id: string; label: string };

export function StateHubStickyNav({ items }: { items: NavItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target?.id;
        if (top) setActiveId(top);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      className="sticky top-14 z-30 -mx-4 mb-8 border-y bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:top-16"
      aria-label="Page sections"
    >
      <ul className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              className={cn(
                'inline-flex rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                activeId === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
