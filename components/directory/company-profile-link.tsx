'use client';

import Link from 'next/link';
import type { ComponentProps, MouseEvent, ReactNode } from 'react';
import {
  buildCompanyProfileHref,
  storeCompanyReturnPath,
} from '@/lib/directory/profile-back-link';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  slug: string;
  /** Optional return path stored in sessionStorage (never on the crawlable href). */
  returnPath?: string | null;
  children: ReactNode;
};

/**
 * Clean `/companies/{slug}` href for crawlers; stores return path client-side on click.
 */
export function CompanyProfileLink({
  slug,
  returnPath,
  children,
  onClick,
  ...rest
}: Props) {
  const href = buildCompanyProfileHref(slug);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (returnPath) storeCompanyReturnPath(returnPath);
    onClick?.(event);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
