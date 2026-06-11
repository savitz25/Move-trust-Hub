import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="text-7xl mb-2">📦</div>
      <h1 className="text-4xl font-semibold mb-2">Page or company not found</h1>
      <p className="text-muted-foreground mb-6">The mover profile may have moved or the URL is incorrect.</p>
      <div className="flex gap-3 justify-center">
        <Link href="/companies"><Button>Browse Directory</Button></Link>
        <Link href="/"><Button variant="outline">Go Home</Button></Link>
      </div>
    </div>
  );
}
