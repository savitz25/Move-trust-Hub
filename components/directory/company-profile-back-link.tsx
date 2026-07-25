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

  useEffect(() => {
    const fromQuery = sanitizeCompanyReturnPath(searchParams.get('from'));
    if (fromQuery) {
      storeCompanyReturnPath(fromQuery);
      setReturnPath(fromQuery);
      // Drop tracking params from the address bar; canonical stays clean.
      router.replace(pathname, { scroll: false });
      return;
    }
    setReturnPath(readCompanyReturnPath());
  }, [pathname, router, searchParams]);

  const href = returnPath ?? '/companies';
  const label = returnPath ? companyProfileBackLabel(returnPath) : 'Back to Directory';

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm mb-4 text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}
