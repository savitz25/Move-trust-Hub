import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  variant?: 'button' | 'link';
  className?: string;
};

export function SuggestLenderCta({ variant = 'button', className }: Props) {
  if (variant === 'link') {
    return (
      <Link
        href="/lender/onboard"
        className={`inline-flex items-center gap-1 text-sm text-[#3B82F6] hover:underline ${className ?? ''}`}
      >
        <Building2 className="h-3.5 w-3.5" />
        List your lending company
      </Link>
    );
  }

  return (
    <Button variant="outline" size="sm" asChild className={className}>
      <Link href="/lender/onboard" className="gap-1.5">
        <Building2 className="h-3.5 w-3.5" />
        List your lending company
      </Link>
    </Button>
  );
}