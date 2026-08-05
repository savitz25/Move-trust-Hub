'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

/**
 * Clean `/companies/{slug}` href for crawlers; stores return path client-side on click.
 * Uses explicit router.push on plain left-clicks so nested UI and soft-nav races cannot
 * leave the user stuck on /companies (scroll-to-top with no profile).
 */
export function CompanyProfileLink({
  slug,
  returnPath,
  children,
  onClick,
  className,
  ...rest
}: Props) {
  const router = useRouter();
  const cleanSlug = (slug || '').trim().replace(/^\/+|\/+$/g, '');
  const href = buildCompanyProfileHref(cleanSlug);

  // Never render a self-link to the directory hub — that only scrolls to top.
  if (!cleanSlug || href === '/companies') {
    return (
      <span className={className} data-profile-link="invalid-slug">
        {children}
      </span>
    );
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (returnPath) storeCompanyReturnPath(returnPath);
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (isModifiedClick(event)) return;

    // Force client navigation. Prevents:
    // - invalid <a><button> nested control swallowing navigation
    // - soft-nav races with directory URL sync leaving users on /companies
    event.preventDefault();
    router.push(href);
  };

  return (
    <Link
      href={href}
      prefetch
      onClick={handleClick}
      className={className}
      data-profile-slug={cleanSlug}
      {...rest}
    >
      {children}
    </Link>
  );
}
