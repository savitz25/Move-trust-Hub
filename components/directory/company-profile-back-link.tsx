import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  companyProfileBackLabel,
  sanitizeCompanyReturnPath,
} from '@/lib/directory/profile-back-link';

export function CompanyProfileBack({ fromParam }: { fromParam?: string }) {
  const returnPath = sanitizeCompanyReturnPath(fromParam);
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