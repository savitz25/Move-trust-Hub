import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { NMLS_OFFICIAL_URL } from '@/lib/lender/onboarding/constants';

type Props = {
  className?: string;
  label?: string;
};

export function NmlsOfficialSourceLink({
  className = '',
  label = 'Official NMLS Consumer Access source',
}: Props) {
  return (
    <Link
      href={NMLS_OFFICIAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-[#3B82F6] hover:underline underline-offset-2 ${className}`}
    >
      {label}
      <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
    </Link>
  );
}