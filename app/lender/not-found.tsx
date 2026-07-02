import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { hubPath } from '@/lib/hub/paths';

export default function LenderNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
        Lender Trust Hub
      </p>
      <h1 className="text-3xl font-semibold tracking-tight mb-3">Page not found</h1>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        This lender directory page does not exist yet or may have moved. Try the homepage,
        calculators, or local lender browser.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href={hubPath('lender', '/')}>Lender home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={hubPath('lender', '/local-lenders')}>Local lenders</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/lender/">Move Trust Hub</Link>
        </Button>
      </div>
    </div>
  );
}