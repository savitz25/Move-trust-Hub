import Link from 'next/link';
import { MovingCalculatorLoader } from '@/components/moving-calculator/moving-calculator-loader';
import { CalculatorPageShell } from '@/components/calculators/calculator-page-shell';
import { calculatorFaqItems } from '@/lib/seo/schemas';

const METHODOLOGY = [
  'Room-by-room mode uses industry-standard cubic-foot volumes for common furniture, appliances, and box counts.',
  'Weight is estimated at 7 pounds per cubic foot — a widely used household-goods average for interstate quoting.',
  'Truck size, crew size, and loading-time brackets are derived from total cubic footage tiers used by van-line planners.',
  'Export your inventory before contacting movers so every carrier prices the same documented volume.',
  'Move Trust Hub is an independent directory — calculator results are estimates only, not binding quotes.',
];

export default function MovingCalculatorPage() {
  return (
    <CalculatorPageShell
      wide
      title="Free Moving Calculator — Cubic Feet, Weight & Truck Size"
      description="Build a room-by-room moving inventory and instantly estimate total cubic footage, household-goods weight, and recommended truck size before you compare FMCSA-licensed interstate movers."
      methodology={METHODOLOGY}
      faq={calculatorFaqItems}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Moving Calculator' },
      ]}
    >
      <MovingCalculatorLoader />

      <div className="mt-8 rounded-xl border bg-card p-5 text-sm text-muted-foreground">
        <p>
          Ready to research carriers?{' '}
          <Link href="/companies" className="text-primary font-medium hover:underline">
            Compare trusted movers
          </Link>{' '}
          in our independent directory, or{' '}
          <Link href="/contact" className="text-primary font-medium hover:underline">
            contact us
          </Link>{' '}
          with questions about your estimate.
        </p>
      </div>
    </CalculatorPageShell>
  );
}