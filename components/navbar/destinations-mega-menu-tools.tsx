'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import {
  ArrowRight,
  FileText,
  ShieldCheck,
  Star,
  Calculator,
  MapPinned,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { QuickToolLink } from '@/lib/nav/destinations-menu-data';

const QuoteModal = dynamic(
  () => import('@/components/quote-modal').then((m) => m.QuoteModal),
  { ssr: false }
);

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
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  return (
    <div className="flex flex-col h-full min-h-[280px]">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Quick Tools
      </div>
      <ul className="space-y-2 text-sm flex-1">
        {tools.map((tool) => {
          const Icon = TOOL_ICONS[tool.id] ?? ArrowRight;
          return (
            <li key={tool.id}>
              <Link
                prefetch={false}
                href={tool.href}
                className="group flex items-start gap-2.5 rounded-lg border border-transparent px-2 py-1.5 hover:border-border hover:bg-muted/40 transition-colors"
                onClick={onNavigate}
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
          className="w-full gap-2 bg-primary hover:bg-primary/90 shadow-sm min-h-[40px]"
          onClick={() => {
            setShowQuoteModal(true);
            onNavigate?.();
          }}
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          Get Free Moving Quotes
        </Button>
        <Link
          prefetch={false}
          href="/moving-to"
          className="inline-flex items-center justify-center gap-1 w-full text-xs font-medium text-primary hover:underline py-1"
          onClick={onNavigate}
        >
          Browse all destinations
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>

      {showQuoteModal ? (
        <QuoteModal
          open={showQuoteModal}
          onOpenChange={setShowQuoteModal}
          prefilledData={{ notes: 'Destinations mega menu — quote request' }}
        />
      ) : null}
    </div>
  );
});