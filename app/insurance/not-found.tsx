import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { hubPath } from '@/lib/hub/paths';

export default function InsuranceNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-2">
        Insurance Trust Hub
      </p>
      <h1 className="text-3xl font-semibold tracking-tight mb-3">Page not found</h1>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        This insurance directory page does not exist yet or may have moved. Try the homepage,
        health hubs browser, or calculators.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href={hubPath('insurance', '/')}>Insurance home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={hubPath('insurance', '/hubs/browse')}>Browse markets</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/">Move Trust Hub</Link>
        </Button>
      </div>
    </div>
  );
}