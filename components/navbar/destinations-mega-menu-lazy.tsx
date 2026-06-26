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
    <Link
      prefetch={false}
      href="/moving-to"
      className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      Destinations
      <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
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