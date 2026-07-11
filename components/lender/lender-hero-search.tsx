'use client';

import { LenderSearchField } from '@/components/lender/lender-search-field';

export function LenderHeroSearch({ className }: { className?: string }) {
  return (
    <LenderSearchField
      className={className}
      helperText="5-digit ZIP opens your county directory. Anything else searches lender names, cities, and loan types."
    />
  );
}