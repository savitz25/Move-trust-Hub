'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SuggestCompanyModal } from '@/components/suggestions/suggest-company-modal';

type Props = {
  sourcePage: string;
  initialName?: string;
  initialUsdot?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  label?: string;
};

export function SuggestCompanyCta({
  sourcePage,
  initialName = '',
  initialUsdot = '',
  variant = 'default',
  size = 'lg',
  className,
  label = 'Company not listed? Suggest it',
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        {label}
      </Button>
      <SuggestCompanyModal
        open={open}
        onOpenChange={setOpen}
        sourcePage={sourcePage}
        initialName={initialName}
        initialUsdot={initialUsdot}
      />
    </>
  );
}