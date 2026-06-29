'use client';

import { useCallback, useState } from 'react';
import { submitQuoteRequest, type SubmitQuoteResult } from '@/actions/quotes';
import type { QuoteRequestInput } from '@/lib/quotes/schema';

export function useSubmitQuote() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState<SubmitQuoteResult | null>(null);

  const submit = useCallback(async (payload: QuoteRequestInput) => {
    setIsSubmitting(true);
    try {
      const result = await submitQuoteRequest(payload);
      setLastResult(result);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { submit, isSubmitting, lastResult };
}