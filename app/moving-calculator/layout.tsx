import type { Metadata } from 'next';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildCalculatorSchemaGraph } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Free Moving Calculator | Estimate Cubic Feet, Weight & Truck Size',
  description:
    'Build a room-by-room moving inventory and instantly calculate total cubic feet, estimated weight, and recommended truck size. Free interstate move estimator from Move Trust Hub.',
  keywords: [
    'moving calculator',
    'cubic feet calculator',
    'moving inventory calculator',
    'estimate move weight',
    'truck size calculator',
    'interstate move estimator',
    'moving volume calculator',
  ],
  openGraph: {
    title: 'Free Moving Calculator | Estimate Cubic Feet, Weight & Truck Size',
    description:
      'Add furniture room by room and get instant cubic footage, weight, and truck size recommendations before requesting mover quotes.',
    url: 'https://www.movetrusthub.com/moving-calculator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.movetrusthub.com/moving-calculator',
  },
};

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