'use client';

import { useState } from 'react';
import type { LookupCarrierPreview } from '@/actions/reviews';
import { CarrierReviewSearch } from '@/components/reviews/carrier-review-search';
import { ReviewSubmissionForm } from '@/components/reviews/review-submission-form';
import {
  ReviewProgressSteps,
  type ReviewFlowStep,
} from '@/components/reviews/review-progress-steps';
import { Card } from '@/components/ui/card';

type Props = {
  initialCarrierQuery?: string;
  initialCarrier?: LookupCarrierPreview;
  initialDisplayNumber?: string;
  sourcePage?: string;
  prefillFromProfile?: boolean;
};

export function ReviewPageClient({
  initialCarrierQuery,
  initialCarrier,
  initialDisplayNumber,
  sourcePage = '/review',
  prefillFromProfile = false,
}: Props) {
  const hasPrefill = Boolean(initialCarrier && initialDisplayNumber);

  const [step, setStep] = useState<'search' | 'form'>(hasPrefill ? 'form' : 'search');
  const [carrier, setCarrier] = useState<LookupCarrierPreview | null>(
    initialCarrier ?? null
  );
  const [displayNumber, setDisplayNumber] = useState<string | null>(
    initialDisplayNumber ?? null
  );

  function handleCarrierSelected(preview: LookupCarrierPreview, display: string) {
    setCarrier(preview);
    setDisplayNumber(display);
    setStep('form');
  }

  const searchStep: ReviewFlowStep = 'rate';

  return (
    <Card className="border-2 border-primary/15 shadow-lg p-6 sm:p-8">
      {step === 'search' ? (
        <>
          <ReviewProgressSteps current={searchStep} />
          <h2 className="text-xl font-semibold mb-1">Find your moving company</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Search by <strong>USDOT</strong> or <strong>MC number</strong> to start your review.
            We&apos;ll match our directory or prepare a carrier record when you submit.
          </p>
          <CarrierReviewSearch
            initialQuery={initialCarrierQuery}
            onCarrierSelected={handleCarrierSelected}
          />
        </>
      ) : carrier && displayNumber ? (
        <ReviewSubmissionForm
          carrier={carrier}
          displayNumber={displayNumber}
          sourcePage={sourcePage}
          skipSearch={prefillFromProfile}
          onBack={() => {
            setStep('search');
            setCarrier(null);
            setDisplayNumber(null);
          }}
        />
      ) : null}
    </Card>
  );
}