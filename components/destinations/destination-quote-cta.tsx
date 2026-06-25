'use client';

import { useState } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuoteModal } from '@/components/quote-modal';
import type { Market } from '@/lib/destinations/types';

type Props = {
  market: Market;
  label?: string;
  variant?: 'primary' | 'footer';
};

export function DestinationQuoteCta({
  market,
  label,
  variant = 'primary',
}: Props) {
  const [open, setOpen] = useState(false);
  const destinationLabel = `${market.displayName}, ${market.stateCode}`;
  const buttonLabel =
    label ?? `Get Free Quotes to ${market.displayName}`;

  return (
    <>
      <Button
        size={variant === 'footer' ? 'lg' : 'default'}
        variant={variant === 'footer' ? 'secondary' : 'default'}
        className={variant === 'footer' ? 'gap-2' : 'gap-2'}
        onClick={() => setOpen(true)}
      >
        {variant === 'footer' ? (
          <FileText className="h-4 w-4" aria-hidden="true" />
        ) : null}
        {buttonLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
      <QuoteModal
        open={open}
        onOpenChange={setOpen}
        prefilledData={{
          toZip: market.defaultToZip,
          destinationSlug: market.slug,
          marketPriority: market.priority,
          notes: `Inbound destination: ${destinationLabel}`,
        }}
      />
    </>
  );
}