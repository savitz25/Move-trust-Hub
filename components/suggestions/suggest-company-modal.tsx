'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { Building2, ExternalLink, Loader2, PlusCircle } from 'lucide-react';
import {
  getSuggestionSubmitterDefaults,
  previewLocalCompanySuggestion,
  submitCompanySuggestion,
} from '@/actions/suggest-company';
import { LocalCountyPicker } from '@/components/suggestions/local-county-picker';
import { LocalCoverageWebsiteStep } from '@/components/suggestions/local-coverage-website-step';
import { OnboardingCarrierLookup } from '@/components/suggestions/onboarding-carrier-lookup';
import { OnboardingCoverageConsent } from '@/components/suggestions/onboarding-coverage-consent';
import { ServiceScopeStep } from '@/components/suggestions/service-scope-step';
import { MultiSourcePreviewCard } from '@/components/verification/multi-source-preview-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { EnrichedCompanyPreview } from '@/lib/suggestions/types';
import type { ServiceScope, SelectedCounty } from '@/lib/suggestions/service-scope';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';
import { US_STATES } from '@/lib/verify-dot/us-states';
import { toast } from 'sonner';

type SubmitSuccessState = {
  profileSlug: string;
  pendingReview: boolean;
  serviceScope: ServiceScope;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourcePage: string;
  enrichedPreview?: EnrichedCompanyPreview | null;
  carrierQuery?: string;
  initialName?: string;
  /** Prefill state for intrastate / local funnel (2-letter code) */
  initialState?: string;
  loadingPreview?: boolean;
  previewError?: string | null;
  onEnrichedPreviewChange?: (preview: EnrichedCompanyPreview | null) => void;
  /** Skip scope step when opened from DOT verify with known interstate carrier */
  forceScope?: ServiceScope | null;
};

export function SuggestCompanyModal({
  open,
  onOpenChange,
  sourcePage,
  enrichedPreview = null,
  carrierQuery: initialCarrierQuery = '',
  initialName = '',
  initialState = '',
  loadingPreview = false,
  previewError = null,
  onEnrichedPreviewChange,
  forceScope = null,
}: Props) {
  const [serviceScope, setServiceScope] = useState<ServiceScope | null>(
    forceScope ?? (initialCarrierQuery ? 'interstate' : null)
  );
  const [activePreview, setActivePreview] = useState<EnrichedCompanyPreview | null>(enrichedPreview);
  const [carrierQuery, setCarrierQuery] = useState(initialCarrierQuery);
  const [lookupError, setLookupError] = useState<string | null>(previewError);
  const [localName, setLocalName] = useState(initialName);
  const [localState, setLocalState] = useState(initialState);
  const [selectedCounties, setSelectedCounties] = useState<SelectedCounty[]>([]);
  const [details, setDetails] = useState('');
  const [suggestedByName, setSuggestedByName] = useState('');
  const [suggestedByEmail, setSuggestedByEmail] = useState('');
  const [isTrustedSubmitter, setIsTrustedSubmitter] = useState(false);
  const [coverageConsent, setCoverageConsent] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteCoverage, setWebsiteCoverage] = useState<WebsiteCoverageData | null>(null);
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<SubmitSuccessState | null>(null);
  const [pending, startTransition] = useTransition();

  const isLocal = serviceScope === 'intrastate';
  const readyInterstate = Boolean(activePreview?.fmcsa?.legalName && carrierQuery.trim());
  const readyLocal =
    Boolean(localName.trim().length >= 2) &&
    localState.length === 2 &&
    selectedCounties.length > 0 &&
    Boolean(activePreview?.google || activePreview?.publicScrape);
  const readyToSubmit = isLocal ? readyLocal : readyInterstate;

  useEffect(() => {
    if (open && enrichedPreview?.fmcsa) {
      setActivePreview(enrichedPreview);
      if (!serviceScope) setServiceScope(forceScope ?? 'interstate');
    }
  }, [open, enrichedPreview, serviceScope, forceScope]);

  useEffect(() => {
    if (open) setLookupError(previewError);
  }, [open, previewError]);

  // Apply forced scope + prefill when opening (e.g. Verify DOT → Local funnel).
  useEffect(() => {
    if (!open) return;
    if (forceScope) setServiceScope(forceScope);
    if (initialName) setLocalName(initialName);
    if (initialState) setLocalState(initialState);
    if (initialCarrierQuery) setCarrierQuery(initialCarrierQuery);
  }, [open, forceScope, initialName, initialState, initialCarrierQuery]);

  useEffect(() => {
    if (!open) return;
    getSuggestionSubmitterDefaults().then((defaults) => {
      setIsTrustedSubmitter(defaults.isTrustedSubmitter);
      if (defaults.isTrustedSubmitter) {
        setSuggestedByName(defaults.suggestedByName);
        setSuggestedByEmail(defaults.suggestedByEmail);
      }
    });
  }, [open]);

  function resetForm() {
    setServiceScope(forceScope ?? (initialCarrierQuery ? 'interstate' : null));
    setActivePreview(null);
    setCarrierQuery(initialCarrierQuery);
    setLookupError(null);
    setLocalName(initialName);
    setLocalState(initialState);
    setSelectedCounties([]);
    setDetails('');
    setSuggestedByName('');
    setSuggestedByEmail('');
    setCoverageConsent(false);
    setWebsiteUrl('');
    setWebsiteCoverage(null);
    setCompanyPhone('');
    setCompanyEmail('');
    setSubmitted(false);
    setSubmitSuccess(null);
    onEnrichedPreviewChange?.(null);
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm();
    onOpenChange(next);
  }

  function handlePreviewReady(preview: EnrichedCompanyPreview, query: string) {
    setActivePreview(preview);
    setCarrierQuery(query);
    setLookupError(null);
    onEnrichedPreviewChange?.(preview);
    const site = preview.google?.website_url?.trim() || '';
    if (site) setWebsiteUrl(site);
    const ph =
      preview.google?.phone?.trim() ||
      preview.fmcsa?.phone?.trim() ||
      '';
    if (ph) setCompanyPhone(ph);
  }

  function handleLocalSearch(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      setLookupError(null);
      setWebsiteCoverage(null);
      setSelectedCounties([]);
      const res = await previewLocalCompanySuggestion({
        companyName: localName,
        stateCode: localState,
      });
      if (!res.success || !res.preview) {
        setLookupError(res.error ?? 'Could not find this local mover.');
        setActivePreview(null);
        return;
      }
      setActivePreview(res.preview);
      onEnrichedPreviewChange?.(res.preview);
      const googleSite = res.preview.google?.website_url?.trim() ?? '';
      if (googleSite) {
        setWebsiteUrl(googleSite);
      }
      const googlePhone = res.preview.google?.phone?.trim() ?? '';
      if (googlePhone) {
        setCompanyPhone(googlePhone);
      }
    });
  }

  const preselectCountyKeys =
    websiteCoverage?.counties
      ?.map((c) => {
        if (typeof c === 'string') return c;
        const rec = c as { stateSlug?: string; countySlug?: string };
        if (rec.stateSlug && rec.countySlug) return `${rec.stateSlug}/${rec.countySlug}`;
        return '';
      })
      .filter(Boolean) ?? [];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!readyToSubmit || !serviceScope) return;

    startTransition(async () => {
      const google = activePreview?.google;
      const res = await submitCompanySuggestion({
        serviceScope,
        carrierQuery: isLocal ? null : carrierQuery,
        name: isLocal
          ? localName || google?.name || null
          : null,
        stateCode: isLocal ? localState : null,
        details: details || null,
        suggestedByName,
        suggestedByEmail,
        sourcePage,
        website: '',
        enrichmentSnapshot: activePreview
          ? {
              google: activePreview.google,
              publicScrape: activePreview.publicScrape,
              fetchedAt: activePreview.fetchedAt,
            }
          : null,
        coverageConsent: isLocal
          ? Boolean(websiteCoverage && websiteCoverage.status === 'ok') ||
            Boolean(websiteUrl || google?.website_url)
          : coverageConsent,
        websiteUrl: websiteUrl || google?.website_url || null,
        // Store website scan for local too (helps admin review); counties still drive placement.
        coverageSnapshot: websiteCoverage,
        selectedCounties: isLocal ? selectedCounties : [],
        headquarters:
          google?.formatted_address ||
          activePreview?.fmcsa?.headquarters ||
          null,
        phone:
          companyPhone.trim() ||
          google?.phone ||
          activePreview?.fmcsa?.phone ||
          null,
        contactEmail: companyEmail.trim() || null,
      });

      if (!res.success) {
        if (res.existingProfileSlug) {
          toast.error(
            <span>
              {res.error ?? 'This company is already listed.'}{' '}
              <Link href={`/companies/${res.existingProfileSlug}`} className="underline font-medium">
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
        setSubmitSuccess({
          profileSlug: res.profileSlug,
          pendingReview: Boolean(res.pendingReview),
          serviceScope,
        });
      }
      setSubmitted(true);
      if (res.pendingReview) {
        toast.success('Submission received — pending admin review.');
      } else {
        toast.success(
          isLocal
            ? 'Local mover published to selected county pages.'
            : 'Company published to the directory.'
        );
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Add company to directory
          </DialogTitle>
          <DialogClose onClose={() => handleOpenChange(false)} />
        </DialogHeader>

        {submitted ? (
          <div className="px-6 pb-6 space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {submitSuccess?.pendingReview
                ? submitSuccess.serviceScope === 'intrastate'
                  ? 'Thank you — your local mover submission is in the admin queue. After approval, it will appear only on the county pages you selected (not the main interstate directory).'
                  : 'Thank you — your submission is in the admin review queue. Once approved, the profile will be live in the interstate directory.'
                : submitSuccess?.serviceScope === 'intrastate'
                  ? 'Published as a local/in-state mover on the county pages you selected.'
                  : 'Published — this company is live in the main interstate directory.'}
            </p>
            {submitSuccess?.profileSlug ? (
              <div className="rounded-md border bg-muted/40 p-4 space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Profile path
                </p>
                <p className="text-sm font-mono text-foreground">
                  /companies/{submitSuccess.profileSlug}
                </p>
                {!submitSuccess.pendingReview ? (
                  <Link
                    href={`/companies/${submitSuccess.profileSlug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View profile
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </div>
            ) : null}
            <Button className="w-full" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : loadingPreview ? (
          <div className="px-6 pb-8 flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            Pulling verification data…
          </div>
        ) : (
          <div className="px-6 pb-6 space-y-4">
            {!serviceScope ? (
              <ServiceScopeStep
                value={serviceScope}
                onChange={setServiceScope}
                disabled={pending}
              />
            ) : serviceScope === 'interstate' && !readyInterstate ? (
              <>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-sky-800">
                    Interstate · FMCSA required
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => {
                      setServiceScope(null);
                      setActivePreview(null);
                    }}
                  >
                    Change type
                  </Button>
                </div>
                <OnboardingCarrierLookup
                  initialCarrierQuery={initialCarrierQuery}
                  initialCompanyName={initialName}
                  onPreviewReady={handlePreviewReady}
                  onError={setLookupError}
                  disabled={pending}
                />
                {lookupError ? (
                  <p className="text-sm text-destructive" role="alert">
                    {lookupError}
                  </p>
                ) : null}
              </>
            ) : serviceScope === 'intrastate' && !readyLocal ? (
              <>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-800">
                    Intrastate / Local · no USDOT
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => {
                      setServiceScope(null);
                      setActivePreview(null);
                      setSelectedCounties([]);
                    }}
                  >
                    Change type
                  </Button>
                </div>
                <form onSubmit={handleLocalSearch} className="space-y-3">
                  <div>
                    <label className="text-sm font-medium" htmlFor="local-name">
                      Business name
                    </label>
                    <Input
                      id="local-name"
                      value={localName}
                      onChange={(e) => setLocalName(e.target.value)}
                      className="mt-1.5"
                      placeholder="e.g. Metro Local Movers"
                      disabled={pending}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium" htmlFor="local-state">
                      State
                    </label>
                    <select
                      id="local-state"
                      value={localState}
                      onChange={(e) => {
                        setLocalState(e.target.value);
                        setSelectedCounties([]);
                        setActivePreview(null);
                      }}
                      className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      required
                      disabled={pending}
                    >
                      <option value="">Select state…</option>
                      {US_STATES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <PlusCircle className="h-4 w-4 mr-2" />
                    )}
                    Look up with Google
                  </Button>
                </form>
                {lookupError ? (
                  <p className="text-sm text-destructive" role="alert">
                    {lookupError}
                  </p>
                ) : null}
                {activePreview ? (
                  <div className="space-y-3">
                    <MultiSourcePreviewCard preview={activePreview} />
                    <LocalCoverageWebsiteStep
                      defaultWebsiteUrl={
                        websiteUrl || activePreview.google?.website_url || ''
                      }
                      coverage={websiteCoverage}
                      onCoverageChange={setWebsiteCoverage}
                      onWebsiteUrlChange={setWebsiteUrl}
                      phone={companyPhone}
                      email={companyEmail}
                      onPhoneChange={setCompanyPhone}
                      onEmailChange={setCompanyEmail}
                      disabled={pending}
                    />
                    <LocalCountyPicker
                      stateCode={localState}
                      selected={selectedCounties}
                      onChange={setSelectedCounties}
                      disabled={pending}
                      preselectKeys={preselectCountyKeys}
                      autoSelectedKeys={preselectCountyKeys}
                    />
                  </div>
                ) : null}
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {isLocal ? 'Local / in-state' : 'Interstate'} · review & submit
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => {
                      setActivePreview(null);
                      if (!isLocal) setCarrierQuery('');
                      onEnrichedPreviewChange?.(null);
                    }}
                    disabled={pending}
                  >
                    Back
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  {isLocal
                    ? 'Local movers are labeled as in-state and listed only on selected county pages — not the main /companies directory.'
                    : isTrustedSubmitter
                      ? 'Admin mode — review the preview, then publish to the interstate directory.'
                      : 'Review the multi-source preview. FMCSA is primary for interstate movers.'}
                </p>

                {activePreview ? <MultiSourcePreviewCard preview={activePreview} /> : null}

                {isLocal ? (
                  <div className="space-y-3">
                    <LocalCoverageWebsiteStep
                      defaultWebsiteUrl={
                        websiteUrl || activePreview?.google?.website_url || ''
                      }
                      coverage={websiteCoverage}
                      onCoverageChange={setWebsiteCoverage}
                      onWebsiteUrlChange={setWebsiteUrl}
                      phone={companyPhone}
                      email={companyEmail}
                      onPhoneChange={setCompanyPhone}
                      onEmailChange={setCompanyEmail}
                      disabled={pending}
                    />
                    <LocalCountyPicker
                      stateCode={localState}
                      selected={selectedCounties}
                      onChange={setSelectedCounties}
                      disabled={pending}
                      preselectKeys={preselectCountyKeys}
                      autoSelectedKeys={preselectCountyKeys}
                    />
                  </div>
                ) : (
                  <OnboardingCoverageConsent
                    defaultWebsiteUrl={
                      websiteUrl || activePreview?.google?.website_url || ''
                    }
                    coverage={websiteCoverage}
                    onCoverageChange={setWebsiteCoverage}
                    onConsentChange={setCoverageConsent}
                    onWebsiteUrlChange={setWebsiteUrl}
                    phone={companyPhone}
                    email={companyEmail}
                    onPhoneChange={setCompanyPhone}
                    onEmailChange={setCompanyEmail}
                    disabled={pending}
                  />
                )}

                <div>
                  <label htmlFor="suggest-details" className="text-sm font-medium">
                    Your notes <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="suggest-details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Service area notes, website, or why you’re adding this mover…"
                    className="mt-1.5 flex min-h-[88px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    maxLength={1000}
                    disabled={pending}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="suggest-by-name" className="text-sm font-medium">
                      Your name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="suggest-by-name"
                      value={suggestedByName}
                      onChange={(e) => setSuggestedByName(e.target.value)}
                      className="mt-1.5"
                      required
                      maxLength={80}
                      disabled={pending}
                    />
                  </div>
                  <div>
                    <label htmlFor="suggest-by-email" className="text-sm font-medium">
                      Your email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="suggest-by-email"
                      type="email"
                      value={suggestedByEmail}
                      onChange={(e) => setSuggestedByEmail(e.target.value)}
                      className="mt-1.5"
                      required
                      maxLength={254}
                      disabled={pending}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={pending || !readyToSubmit}>
                  {pending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  {isTrustedSubmitter ? 'Publish now' : 'Submit for review'}
                </Button>
              </form>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
