'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

type HubZipSearchProps = {
  hub: HubId;
  placeholder?: string;
  className?: string;
};

export function HubZipSearch({
  hub,
  placeholder = 'Enter ZIP code',
  className,
}: HubZipSearchProps) {
  const [zip, setZip] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = zip.replace(/\D/g, '').slice(0, 5);
    if (cleaned.length < 5) return;

    const target =
      hub === 'lender'
        ? `${hubPath('lender', '/local-lenders')}?zip=${cleaned}`
        : hub === 'insurance'
          ? `${hubPath('insurance', '/hubs/browse')}?zip=${cleaned}`
          : `/local-movers?zip=${cleaned}`;

    void import('@/components/ga-events').then(({ trackZipSearch }) => {
      trackZipSearch({ hub, zip: cleaned, destination: target });
    });
    router.push(target);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={className ?? 'mx-auto flex w-full max-w-md gap-2'}
    >
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={5}
        placeholder={placeholder}
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        aria-label="ZIP code"
        className="h-12 text-base"
      />
      <Button type="submit" size="lg" className="gap-2 shrink-0">
        <Search className="h-4 w-4" aria-hidden="true" />
        Search
      </Button>
    </form>
  );
}