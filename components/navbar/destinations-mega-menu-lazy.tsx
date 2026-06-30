'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ChevronDown } from 'lucide-react';

const DestinationsMegaMenu = dynamic(
  () =>
    import('@/components/navbar/destinations-mega-menu').then(
      (m) => m.DestinationsMegaMenu
    ),
  { ssr: false }
);

function DestinationsNavTrigger({ onActivate }: { onActivate: () => void }) {
  return (
    <div className="inline-flex items-center gap-0.5">
      <Link
        prefetch={false}
        href="/moving-to"
        className="font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
        onMouseEnter={onActivate}
        onFocus={onActivate}
      >
        Destinations
      </Link>
      <button
        type="button"
        className="p-0.5 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[28px] flex items-center justify-center"
        aria-label="Open destinations menu"
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
      >
        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

export function DestinationsMegaMenuLazy() {
  const [load, setLoad] = useState(false);
  const [openOnLoad, setOpenOnLoad] = useState(false);
  const triggered = useRef(false);

  const activate = () => {
    if (triggered.current) return;
    triggered.current = true;
    setOpenOnLoad(true);
    setLoad(true);
  };

  return load ? (
    <DestinationsMegaMenu defaultOpen={openOnLoad} />
  ) : (
    <DestinationsNavTrigger onActivate={activate} />
  );
}