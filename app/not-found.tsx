import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/** Never inherit root ZIP Planner / homepage title on 404s. */
export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'This page could not be found on Move Trust Hub.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="text-7xl mb-2">📦</div>
      <h1 className="text-4xl font-semibold mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-6">
        This destination guide or company profile may have moved, or the URL is incorrect.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Link href="/moving-to"><Button>Popular Destinations</Button></Link>
        <Link href="/companies"><Button variant="outline">Browse Directory</Button></Link>
        <Link href="/"><Button variant="outline">Go Home</Button></Link>
      </div>
    </div>
  );
}
