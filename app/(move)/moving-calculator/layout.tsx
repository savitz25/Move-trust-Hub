import type { Metadata } from 'next';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildCalculatorSchemaGraph } from '@/lib/seo/schemas';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';

export const metadata: Metadata = buildMovePageMetadata({
  title: 'Free Moving Calculator | Estimate Cubic Feet, Weight & Truck Size',
  description:
    'Build a room-by-room moving inventory and instantly calculate total cubic feet, estimated weight, and recommended truck size. Free interstate move estimator from Move Trust Hub.',
  path: '/moving-calculator',
});

export default function MovingCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={buildCalculatorSchemaGraph()} />
      {children}
    </>
  );
}