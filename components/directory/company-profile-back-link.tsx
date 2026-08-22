'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import {
  companyProfileBackLabel,
  readCompanyReturnPath,
  sanitizeCompanyReturnPath,
  storeCompanyReturnPath,
} from '@/lib/directory/profile-back-link';
import { parseAskSearchHandoff } from '@/lib/search-handoff/parse';
import { resolveAskSearchHandoff } from '@/lib/search-handoff/resolve';

/**
 * Back navigation without polluting crawlable URLs.
 * - Reads optional legacy ?from= once, stores it, then strips the query via replace.
 * - Otherwise uses sessionStorage (set by CompanyProfileLink on click).
 */
export function CompanyProfileBack() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [returnPath, setReturnPath] = useState<string | null>(null);
  const askCtx = parseAskSearchHandoff(searchParams);
  const askDest = askCtx ? resolveAskSearchHandoff(askCtx) : null;
  const askHref = askDest?.href ?? null;

  useEffect(() => {
    if (askHref) return;
    const fromQuery = sanitizeCompanyReturnPath(searchParams.get('from'));
    if (fromQuery) {
      storeCompanyReturnPath(fromQuery);
      setReturnPath(fromQuery);
      // Drop tracking params from the address bar; canonical stays clean.
      router.replace(pathname, { scroll: false });
      return;
    }
    setReturnPath(readCompanyReturnPath());
  }, [askHref, pathname, router, searchParams]);

  const href = askDest?.href ?? returnPath ?? '/companies';
  const label = askDest?.backLabel ?? (returnPath ? companyProfileBackLabel(returnPath) : 'Back to Directory');

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm mb-4 text-muted-foreground hover:text-foreground"
      data-ask-handoff-back={askDest ? '1' : undefined}
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}
