'use client';

import Link from 'next/link';
import { memo } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Star,
  Calculator,
  MapPinned,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { QuickToolLink } from '@/lib/nav/destinations-menu-data';

const TOOL_ICONS: Record<string, typeof ShieldCheck> = {
  fmcsa: ShieldCheck,
  reviews: Star,
  calculator: Calculator,
  local: MapPinned,
};

type Props = {
  tools: QuickToolLink[];
  onNavigate?: () => void;
};

export const DestinationsMegaMenuTools = memo(function DestinationsMegaMenuTools({
  tools,
  onNavigate,
}: Props) {
  return (
    <div className="flex flex-col h-full min-h-[280px]">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Quick Tools
      </div>
      <ul className="space-y-1.5 text-sm flex-1" role="list">
        {tools.map((tool) => {
          const Icon = TOOL_ICONS[tool.id] ?? ArrowRight;
          return (
            <li key={tool.id}>
              <Link
                prefetch={false}
                href={tool.href}
                className="group flex items-start gap-2.5 rounded-lg border border-transparent px-2 py-2 min-h-[44px] hover:border-border hover:bg-muted/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                onClick={onNavigate}
                aria-label={`${tool.label}: ${tool.description}`}
              >
                <Icon
                  className="h-4 w-4 text-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  <span className="font-medium group-hover:text-primary transition-colors block">
                    {tool.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{tool.description}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 pt-4 border-t space-y-2">
        <Button
          size="sm"
          asChild
          className="w-full gap-2 bg-primary hover:bg-primary/90 shadow-md min-h-[44px] text-sm font-semibold"
        >
          <Link
            prefetch={false}
            href="/moving-calculator"
            onClick={onNavigate}
            aria-label="Use free moving calculator"
          >
            <Calculator className="h-4 w-4" aria-hidden="true" />
            Free Moving Calculator
          </Link>
        </Button>
        <p className="text-[10px] text-center text-muted-foreground">
          Independent · No lead fees · No paid placements
        </p>
      </div>
    </div>
  );
});