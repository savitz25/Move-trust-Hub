'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LocationPlaceInput,
  type ConfirmedPlace,
} from '@/components/location/location-place-input';

/** City / ZIP search for the local movers hub — routes to county pages. */
export function LocalMoversPlaceSearch() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [place, setPlace] = useState<ConfirmedPlace | null>(null);

  const onConfirm = useCallback(
    (p: ConfirmedPlace | null) => {
      setPlace(p);
      if (p?.moversHref) router.push(p.moversHref);
    },
    [router]
  );

  return (
    <div className="w-full max-w-xl rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
      <LocationPlaceInput
        label="Find movers by city"
        placeholder="e.g. Boca Raton, Austin, or 33433"
        value={text}
        onChange={setText}
        confirmed={place}
        onConfirm={onConfirm}
        variant="default"
      />
    </div>
  );
}
