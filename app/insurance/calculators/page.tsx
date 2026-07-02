import type { Metadata } from 'next';
import { wrapHubPageMetadata } from '@/lib/hub/wrap-metadata';
import Link from 'next/link';
import { Calculator, Heart, Shield, PiggyBank } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/insurance/ui/card';
import { Button } from '@/components/insurance/ui/button';
import { SchemaInjector } from '@/components/hub/schema-injector';
import { insuranceHref } from '@/lib/insurance/paths';

export const metadata: Metadata = wrapHubPageMetadata('insurance', {
  title: 'Insurance Calculators — Premium, Medicare & ACA Tools',
  description:
    'Free insurance calculators: premium estimator, Medicare coverage gap tool, and ACA subsidy estimator. Estimates only — verify with licensed agents.',
  path: '/calculators',
});

const FAQ = [
  {
    question: 'Are Insurance Trust Hub calculators free?',
    answer:
      'Yes. All tools are free, require no account, and produce educational estimates only — not binding quotes or enrollment decisions.',
  },
  {
    question: 'Can I use these results to enroll in a plan?',
    answer:
      'Use them for planning, then verify premiums, networks, and eligibility with licensed agents and official marketplace or Medicare sources.',
  },
];

const CALCULATORS = [
  {
    href: insuranceHref('/calculators/premium-estimator'),
    icon: Calculator,
    title: 'Premium Estimator',
    description:
      'Estimate auto, homeowners, health, and Medicare premium ranges by state and profile. Clearly labeled estimates only.',
  },
  {
    href: insuranceHref('/calculators/medicare-gap'),
    icon: Heart,
    title: 'Medicare Gap Analyzer',
    description:
      'Identify potential coverage gaps when moving states, aging into Medicare, or transitioning from employer plans.',
  },
  {
    href: insuranceHref('/calculators/aca-subsidy'),
    icon: PiggyBank,
    title: 'ACA Subsidy Estimator',
    description:
      'Rough 2026 marketplace subsidy estimate based on household size, income, and ZIP. Not official CMS data.',
  },
  {
    href: insuranceHref('/tools/license-verification'),
    icon: Shield,
    title: 'License Verification Guide',
    description: 'Step-by-step instructions to verify agent licensing with your state Department of Insurance.',
  },
];

export default function CalculatorsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <SchemaInjector data={faqSchema} />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">Insurance Calculators</h1>
          <p className="mt-3 text-muted-foreground text-lg">
            Educational tools to estimate costs and identify coverage gaps. All outputs are estimates
            only — consult a licensed agent and verify with official sources.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
          {CALCULATORS.map((calc) => (
            <Card key={calc.href} className="flex flex-col">
              <CardHeader>
                <calc.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{calc.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground flex-1">{calc.description}</p>
                <Button variant="outline" className="mt-4 w-fit" asChild>
                  <Link href={calc.href}>Open Calculator</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <section aria-labelledby="insurance-calc-faq" className="mt-14 max-w-3xl rounded-xl border p-6">
          <h2 id="insurance-calc-faq" className="text-xl font-semibold mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {FAQ.map((item) => (
              <div key={item.question}>
                <h3 className="font-medium">{item.question}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}