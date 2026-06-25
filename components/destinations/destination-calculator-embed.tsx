import Link from 'next/link';
import { Calculator, ArrowRight, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Market } from '@/lib/destinations/types';

type Props = {
  market: Market;
};

export function DestinationCalculatorEmbed({ market }: Props) {
  const destinationLabel = `${market.displayName}, ${market.stateCode}`;
  const calculatorHref = `/moving-calculator?toZip=${market.defaultToZip}&toCity=${encodeURIComponent(destinationLabel)}&dest=${market.slug}`;

  return (
    <div className="rounded-xl border bg-card p-5 md:p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 className="font-semibold">Free Moving Calculator</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        Build a room-by-room inventory and get instant cubic feet, weight, and truck-size
        estimates for your move to <strong className="text-foreground">{destinationLabel}</strong>.
      </p>
      <div className="rounded-lg border bg-muted/30 p-3 text-sm mb-4 space-y-1">
        <div>
          <span className="text-muted-foreground">Destination ZIP:</span>{' '}
          <span className="font-medium">{market.defaultToZip}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Destination city:</span>{' '}
          <span className="font-medium">{destinationLabel}</span>
        </div>
      </div>
      <ul className="text-xs text-muted-foreground space-y-2 mb-6 flex-1">
        <li className="flex items-start gap-2">
          <Package className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
          Room-by-room or quick-add inventory modes
        </li>
        <li className="flex items-start gap-2">
          <Truck className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
          Truck size and crew recommendations
        </li>
      </ul>
      <Button asChild className="w-full">
        <Link href={calculatorHref}>
          Open Calculator for {market.displayName}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}