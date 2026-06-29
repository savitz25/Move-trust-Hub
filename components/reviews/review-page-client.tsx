'use client';

import { useState } from 'react';
import type { LookupCarrierPreview } from '@/actions/reviews';
import { CarrierReviewSearch } from '@/components/reviews/carrier-review-search';
import { ReviewSubmissionForm } from '@/components/reviews/review-submission-form';
import { Card } from '@/components/ui/card';

type Props = {
  initialCarrierQuery?: string;
};

export function ReviewPageClient({ initialCarrierQuery }: Props) {
  const [step, setStep] = useState<'search' | 'form'>('search');
  const [carrier, setCarrier] = useState<LookupCarrierPreview | null>(null);
  const [displayNumber, setDisplayNumber] = useState<string | null>(null);

  function handleCarrierSelected(preview: LookupCarrierPreview, display: string) {
    setCarrier(preview);
    setDisplayNumber(display);
    setStep('form');
  }

  return (
    <Card className="border-2 border-primary/15 shadow-lg p-6 sm:p-8">
      {step === 'search' ? (
        <>
          <h2 className="text-lg font-semibold mb-1">Step 1 — Find the mover</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Search by USDOT or MC number. We&apos;ll match our directory or prepare a new
            carrier record when you submit.
          </p>
          <CarrierReviewSearch
            initialQuery={initialCarrierQuery}
            onCarrierSelected={handleCarrierSelected}
          />
        </>
      ) : carrier && displayNumber ? (
        <>
          <h2 className="text-lg font-semibold mb-1">Step 2 — Share your experience</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Honest, detailed reviews help families avoid scams. All submissions are moderated.
          </p>
          <ReviewSubmissionForm
            carrier={carrier}
            displayNumber={displayNumber}
            onBack={() => {
              setStep('search');
              setCarrier(null);
              setDisplayNumber(null);
            }}
          />
        </>
      ) : null}
    </Card>
  );
}