'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, Loader2, PlusCircle } from 'lucide-react';
import { submitLenderOnboarding } from '@/actions/lender-onboarding';
import { OnboardingNmlsLookup } from '@/components/lender/onboarding/onboarding-nmls-lookup';
import { LenderMultiSourcePreview } from '@/components/lender/onboarding/lender-multi-source-preview';
import { LenderOnboardingProgress } from '@/components/lender/onboarding/lender-onboarding-progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { EnrichedLenderPreview } from '@/lib/lender/onboarding/types';
import { toast } from 'sonner';

type SuccessState = {
  profileSlug: string;
};

export function LenderOnboardClient() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [preview, setPreview] = useState<EnrichedLenderPreview | null>(null);
  const [nmlsId, setNmlsId] = useState('');
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState('');
  const [lenderType, setLenderType] = useState('Mortgage');
  const [details, setDetails] = useState('');
  const [submittedByName, setSubmittedByName] = useState('');
  const [submittedByEmail, setSubmittedByEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [pending, startTransition] = useTransition();

  function handlePreviewReady(p: EnrichedLenderPreview, id: string) {
    setPreview(p);
    setNmlsId(id);
    setLookupError(null);
    setStep(2);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!preview) return;

    startTransition(async () => {
      const res = await submitLenderOnboarding({
        nmlsId,
        lenderType,
        details: details || null,
        submittedByName,
        submittedByEmail,
        sourcePage: '/lender/onboard',
        website: '',
        zipCode: zipCode || null,
        enrichmentSnapshot: {
          google: preview.google,
          publicScrape: preview.publicScrape,
          cfpb: preview.cfpb,
          fetchedAt: preview.fetchedAt,
        },
      });

      if (!res.success) {
        if (res.existingProfileSlug) {
          toast.error(
            <span>
              {res.error}{' '}
              <Link href={`/lender/lenders/${res.existingProfileSlug}`} className="underline">
                View profile
              </Link>
            </span>
          );
        } else {
          toast.error(res.error ?? 'Submission failed');
        }
        return;
      }

      if (res.profileSlug) {
        setSuccess({ profileSlug: res.profileSlug });
      }
      setSubmitted(true);
      setStep(4);
      toast.success('Submission received — pending admin review.');
    });
  }

  if (submitted) {
    return (
      <div>
        <LenderOnboardingProgress current={4} />
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-[#0A2540]">Thank you — submission received</h2>
          <p className="mt-3 text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
            Your lender profile is in our moderation queue. We verify NMLS, Google, BBB, and CFPB
            data before publishing. You will receive a confirmation email when approved.
          </p>
          {success?.profileSlug ? (
            <p className="mt-4 text-sm font-mono text-[#0A2540]">
              /lender/lenders/{success.profileSlug}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Building2 className="h-5 w-5 text-[#3B82F6]" />
        <h2 className="text-xl font-semibold text-[#0A2540]">Lender Provider Onboarding</h2>
      </div>

      <LenderOnboardingProgress current={step} />

      {step === 1 ? (
        <>
          <p className="text-sm text-zinc-600 mb-4">
            Step 1 — Verify your company via <strong>NMLS Consumer Access</strong>. Enter your
            NMLS ID or search by legal name.
          </p>
          <OnboardingNmlsLookup
            onPreviewReady={handlePreviewReady}
            onError={setLookupError}
            disabled={pending}
          />
          {lookupError ? (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {lookupError}
            </p>
          ) : null}
        </>
      ) : null}

      {step >= 2 && preview ? (
        <div className="space-y-4">
          <LenderMultiSourcePreview preview={preview} />

          {step === 2 ? (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => { setStep(1); setPreview(null); }}>
                Search different company
              </Button>
              <Button onClick={() => setStep(3)}>Continue to your details →</Button>
            </div>
          ) : null}

          {step >= 3 ? (
            <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
              <LenderOnboardingProgress current={3} />

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">ZIP code (optional)</label>
                  <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="For county experience scoring"
                    className="mt-1.5"
                    maxLength={10}
                    disabled={pending}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Lender type</label>
                  <select
                    value={lenderType}
                    onChange={(e) => setLenderType(e.target.value)}
                    className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    disabled={pending}
                  >
                    <option value="Mortgage">Mortgage</option>
                    <option value="Bank">Bank</option>
                    <option value="Credit Union">Credit Union</option>
                    <option value="Auto">Auto</option>
                    <option value="Personal">Personal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Notes (optional)</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="mt-1.5 flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm"
                  maxLength={1000}
                  placeholder="Service areas, loan specialties, or context for our review team…"
                  disabled={pending}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Your name *</label>
                  <Input
                    value={submittedByName}
                    onChange={(e) => setSubmittedByName(e.target.value)}
                    required
                    maxLength={80}
                    className="mt-1.5"
                    disabled={pending}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Your email *</label>
                  <Input
                    type="email"
                    value={submittedByEmail}
                    onChange={(e) => setSubmittedByEmail(e.target.value)}
                    required
                    maxLength={254}
                    className="mt-1.5"
                    disabled={pending}
                  />
                </div>
              </div>

              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

              <Button type="submit" className="w-full gap-2" disabled={pending}>
                {pending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4" /> Submit for admin review
                  </>
                )}
              </Button>
            </form>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}