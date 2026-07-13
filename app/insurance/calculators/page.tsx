import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { CalculatorLandingTemplate } from '@/components/hub/templates';
import { hubPath } from '@/lib/hub/paths';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { INSURANCE_SECTION_PRESETS } from '@/lib/hub/templates/section-presets';
import {
  INSURANCE_CALCULATOR_CARDS,
  INSURANCE_CALCULATOR_FAQ,
} from '@/lib/hub/templates/landing-data';

const preset = INSURANCE_SECTION_PRESETS.calculators;

export const metadata: Metadata = buildTemplateMetadata({
  hub: 'insurance',
  title: preset.title,
  description: preset.description,
  path: '/calculators',
});

export default function CalculatorsPage() {
  return (
    <CalculatorLandingTemplate
      hub="insurance"
      path="/calculators"
      eyebrow={preset.eyebrow}
      title={preset.title}
      description={preset.description}
      calculators={INSURANCE_CALCULATOR_CARDS}
      faq={INSURANCE_CALCULATOR_FAQ}
    >
      <section
        aria-labelledby="calc-resource-links"
        className="mx-auto mt-14 max-w-4xl rounded-xl border bg-muted/20 p-6"
      >
        <h2 id="calc-resource-links" className="text-lg font-semibold">
          Pair calculators with guides
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Use our educational guides after running estimates — especially Medicare and ACA
          comparisons before enrollment windows close.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link
              href={hubPath('insurance', '/resources/medicare-advantage-vs-medigap')}
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              Medicare Advantage vs Medigap comparison
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link
              href={hubPath('insurance', '/resources/aca-obamacare-guide')}
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              ACA / Obamacare enrollment guide
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link
              href={hubPath('insurance', '/resources')}
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              All insurance resources
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </section>
    </CalculatorLandingTemplate>
  );
}