import { notFound } from 'next/navigation';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import { isAnonymousCompanyNotFound } from '@/lib/provider/anonymous-company-route';

/**
 * Resolve anonymous publication eligibility before profile UI streams.
 * Combined with no sitewide loading.tsx on this segment (FL-010R).
 */
export default async function CompanySlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(String(slug ?? '').trim());
  if (!decoded) notFound();
  const company = await getCompanyBySlugAsync(decoded);
  if (!company || isAnonymousCompanyNotFound(company)) {
    notFound();
  }
  return children;
}
