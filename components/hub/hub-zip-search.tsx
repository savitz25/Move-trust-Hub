'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  LocationPlaceInput,
  type ConfirmedPlace,
} from '@/components/location/location-place-input';

import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

type HubZipSearchProps = {
  hub: HubId;
  placeholder?: string;
  className?: string;
};

export function HubZipSearch({
  hub,
  placeholder = 'City or ZIP code',
  className,
}: HubZipSearchProps) {
  const [zip, setZip] = useState('');
  const [placeText, setPlaceText] = useState('');
  const [place, setPlace] = useState<ConfirmedPlace | null>(null);
  const router = useRouter();
  const isMoversHub = hub === 'move';

  const routeFromZip = (cleaned: string) => {
    const target =
      hub === 'lender'
        ? `${hubPath('lender', '/local-lenders')}?zip=${cleaned}`
        : hub === 'insurance'
          ? `${hubPath('insurance', '/hubs/browse')}?zip=${cleaned}`
          : `/local-movers?zip=${cleaned}`;

    void import('@/components/ga-events').then(({ trackZipSearch }) => {
      trackZipSearch({ hub, zip: cleaned, destination: target });
    });

    if (isMoversHub) {
      // Prefer county page via place-resolve
      void fetch(`/api/place-resolve?zip=${cleaned}`)
        .then(async (res) => {
          if (!res.ok) {
            router.push(target);
            return;
          }
          const data = await res.json();
          router.push(data.moversHref || target);
        })
        .catch(() => router.push(target));
      return;
    }

    router.push(target);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (place?.moversHref && isMoversHub) {
      router.push(place.moversHref);
      return;
    }
    const cleaned = zip.replace(/\D/g, '').slice(0, 5);
    if (cleaned.length < 5) return;
    routeFromZip(cleaned);
  }

  const onPlaceConfirm = useCallback(
    (p: ConfirmedPlace | null) => {
      setPlace(p);
      if (p?.moversHref && isMoversHub) {
        void import('@/components/ga-events').then(({ trackZipSearch }) => {
          trackZipSearch({
            hub,
            zip: p.zip || p.label,
            destination: p.moversHref,
          });
        });
        router.push(p.moversHref);
      }
    },
    [hub, isMoversHub, router]
  );

  if (isMoversHub) {
    return (
      <div className={className ?? 'mx-auto w-full max-w-md space-y-2'}>
        <LocationPlaceInput
          label="Your city or ZIP"
          placeholder={placeholder}
          value={placeText}
          onChange={setPlaceText}
          confirmed={place}
          onConfirm={onPlaceConfirm}
          variant="default"
        />
        <p className="text-center text-[11px] text-muted-foreground">
          Confirm City, State when listed — we open the matching county movers guide.
        </p>
      </div>
    );
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
