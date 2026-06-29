import Link from 'next/link';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  href: string;
  variant?: 'button' | 'link';
  className?: string;
};

export function UserReviewsCta({ href, variant = 'button', className }: Props) {
  if (variant === 'link') {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-1 text-xs text-primary hover:underline underline-offset-2 ${className ?? ''}`}
      >
        <MessageSquarePlus className="h-3.5 w-3.5" />
        Leave a Review
      </Link>
    );
  }

  return (
    <Button variant="outline" size="sm" asChild className={className}>
      <Link href={href} className="gap-1.5">
        <MessageSquarePlus className="h-3.5 w-3.5" />
        Leave a Review
      </Link>
    </Button>
  );
}