'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  PlusCircle,
  Search,
} from 'lucide-react';
import { submitLenderOnboarding } from '@/actions/lender-onboarding';
import { OnboardingNmlsLookup } from '@/components/lender/onboarding/onboarding-nmls-lookup';
import { LenderMultiSourcePreview } from '@/components/lender/onboarding/lender-multi-source-preview';
import { LenderOnboardingProgress } from '@/components/lender/onboarding/lender-onboarding-progress';
import { NmlsOfficialSourceLink } from '@/components/lender/onboarding/nmls-official-source-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { EnrichedLenderPreview } from '@/lib/lender/onboarding/types';
import { toast } from 'sonner';

type FlowMode = 'lookup' | 'verify' | 'submit' | 'done';

type SuccessState = {
  profileSlug: string;
};

type Props = {
  initialNmlsId?: string;
};

export function LenderOnboardClient({ initialNmlsId }: Props) {
  const [flow, setFlow] = useState<FlowMode>('lookup');
  const [preview, setPreview] = useState<EnrichedLenderPreview | null>(null);
  const [nmlsId, setNmlsId] = useState(initialNmlsId ?? '');
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState('');
  const [lenderType, setLenderType] = useState('Mortgage');
  const [details, setDetails] = useState('');
  const [submittedByName, setSubmittedByName] = useState('');
  const [submittedByEmail, setSubmittedByEmail] = useState('');
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [pending, startTransition] = useTransition();

  const progressStep: 1 | 2 | 3 | 4 =
    flow === 'lookup' ? 1 : flow === 'verify' ? 2 : flow === 'submit' ? 3 : 4;

  function resetLookup() {
    setFlow('lookup');
    setPreview(null);
    setNmlsId(initialNmlsId ?? '');
    setLookupError(null);
  }

  function handlePreviewReady(p: EnrichedLenderPreview, id: string) {
    setPreview(p);
    setNmlsId(id);
    setLookupError(null);
    setFlow('verify');
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
      setFlow('done');
      toast.success('Submission received — pending admin review.');
    });
  }

  if (flow === 'done') {
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
          <Button variant="outline" className="mt-6" onClick={resetLookup}>
            Verify another lender
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Building2 className="h-5 w-5 text-[#3B82F6]" />
        <h2 className="text-xl font-semibold text-[#0A2540]">
          {flow === 'lookup' ? 'NMLS Lender Lookup' : 'Verification Results'}
        </h2>
      </div>

      <LenderOnboardingProgress current={progressStep} />

      {flow === 'lookup' ? (
        <>
          <p className="text-sm text-zinc-600 mb-5 leading-relaxed">
            Search by <strong>NMLS ID</strong>, <strong>company name</strong>, or{' '}
            <strong>location</strong>. We fetch live NMLS Consumer Access data, then enrich with
            Google, BBB, and CFPB — without leaving Lender Trust Hub.
          </p>
          <OnboardingNmlsLookup
            onPreviewReady={handlePreviewReady}
            onError={setLookupError}
            disabled={pending}
            initialNmlsId={initialNmlsId}
          />
          {lookupError ? (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {lookupError}
            </p>
          ) : null}
        </>
      ) : null}

      {(flow === 'verify' || flow === 'submit') && preview ? (
        <div className="space-y-5">
          <LenderMultiSourcePreview preview={preview} />

          {flow === 'verify' ? (
            <div className="rounded-xl border border-[#3B82F6]/20 bg-[#3B82F6]/5 p-5 space-y-4">
              <p className="text-sm font-medium text-[#0A2540] flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-[#3B82F6]" />
                What would you like to do next?
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Button variant="outline" className="gap-2" onClick={resetLookup}>
                  <Search className="h-4 w-4" />
                  Verify another lender
                </Button>
                <Button className="gap-2" onClick={() => setFlow('submit')}>
                  <PlusCircle className="h-4 w-4" />
                  Submit for directory inclusion
                </Button>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                You&apos;re in <strong>verify-only</strong> mode — review the data above with no
                submission required. Choose directory inclusion only if you want a moderated profile
                published on Lender Trust Hub.
              </p>
              <NmlsOfficialSourceLink />
            </div>
          ) : null}

          {flow === 'submit' ? (
            <form onSubmit={handleSubmit} className="space-y-4 border-t pt-5">
              <h3 className="text-lg font-semibold text-[#0A2540]">Submit for directory inclusion</h3>
              <p className="text-sm text-zinc-600">
                Add your contact details. Our team reviews NMLS and enrichment data before publishing
                at <code className="text-xs">/lender/lenders/[slug]</code>.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">ZIP code (optional)</label>
                  <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Refines county experience score"
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

              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={() => setFlow('verify')} disabled={pending}>
                  Back to results
                </Button>
                <Button type="submit" className="gap-2" disabled={pending}>
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
              </div>
            </form>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}