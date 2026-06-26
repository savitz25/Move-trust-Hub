'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { useHomeQuote } from '@/components/home/home-quote-provider';

export function HomeQuoteButton({ onClick, ...props }: ButtonProps) {
  const { openQuote } = useHomeQuote();

  return (
    <Button
      {...props}
      onClick={(event) => {
        openQuote();
        onClick?.(event);
      }}
    />
  );
}