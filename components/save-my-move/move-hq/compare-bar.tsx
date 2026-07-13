'use client';

import Link from 'next/link';
import { GitCompare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CompareBarProps = {
  selectedSlugs: string[];
  companyNames: Record<string, string>;
  onClear: () => void;
};

export function CompareBar({ selectedSlugs, companyNames, onClear }: CompareBarProps) {
  if (selectedSlugs.length < 2) return null;

  const href = `/compare?${selectedSlugs.map((s) => `add=${s}`).join('&')}`;
  const labels = selectedSlugs.map((s) => companyNames[s] ?? s.replace(/-/g, ' '));

  return (
    <>
      <div
        className="hidden md:flex fixed bottom-6 left-1/2 z-40 -translate-x-1/2 items-center gap-3 rounded-full border bg-background/95 px-4 py-2.5 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80"
        role="status"
        aria-live="polite"
      >
        <GitCompare className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
        <span className="text-sm font-medium truncate max-w-[16rem]">
          {selectedSlugs.length} selected: {labels.join(', ')}
        </span>
        <Button size="sm" asChild>
          <Link href={href}>Compare selected</Link>
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onClear} aria-label="Clear selection">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg backdrop-blur">
        <div className="flex items-center gap-2">
          <Button className="flex-1 gap-2" asChild>
            <Link href={href}>
              <GitCompare className="h-4 w-4" />
              Compare {selectedSlugs.length} movers
            </Link>
          </Button>
          <Button size="icon" variant="outline" onClick={onClear} aria-label="Clear selection">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}