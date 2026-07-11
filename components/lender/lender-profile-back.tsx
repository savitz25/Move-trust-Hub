'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { sanitizeLenderReturnPath } from '@/lib/lender/lender-profile-links';

export function LenderProfileBack({ fromParam }: { fromParam?: string }) {
  const returnPath = sanitizeLenderReturnPath(fromParam);
  if (!returnPath) return null;

  let label = 'Back to search results';
  try {
    const url = new URL(returnPath, 'https://www.movetrusthub.com');
    const search = url.searchParams.get('search');
    if (search) label = `Back to results for “${search}”`;
  } catch {
    // keep default label
  }

  return (
    <Link
      href={returnPath}
      className="mb-6 inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0A2540] shadow-sm transition-colors hover:border-[#3B82F6]/40 hover:text-[#3B82F6]"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}