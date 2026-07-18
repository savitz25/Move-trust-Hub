import Link from 'next/link';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';
import { MyMoveReports } from '@/components/my-move-plan/my-move-reports';
import { Button } from '@/components/ui/button';

export const metadata = buildResourceMetadata(
  '/my-move/reports',
  'My Move Reports — Saved Plans',
  'View and manage all of your Move Trust Hub move plans: routes, inventories, shortlists, and readiness scores.'
);

export const dynamic = 'force-dynamic';

export default function MyMoveReportsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/my-move" className="hover:text-primary hover:underline">
          My Move
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground">Reports</span>
      </div>
      <MyMoveReports />
      <div className="mt-10 flex flex-wrap gap-3 border-t pt-6">
        <Button variant="outline" asChild>
          <Link href="/my-move">Back to Move HQ</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/#my-move-plan">Homepage planner</Link>
        </Button>
      </div>
    </div>
  );
}
