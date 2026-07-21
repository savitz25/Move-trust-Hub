'use client';

import { useState } from 'react';
import { ArrowRight, MapPin, Route, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SuggestCompanyModal } from '@/components/suggestions/suggest-company-modal';
import { cn } from '@/lib/utils';

type ScopeChoice = 'interstate' | 'intrastate' | null;

type Props = {
  sourcePage?: string;
  /** Prefill for local / interstate suggest modals */
  companyName?: string;
  stateCode?: string;
  /** DOT/MC when known (license search) */
  carrierQuery?: string;
  /** Where this CTA appears — tweaks helper copy */
  context?: 'name-results' | 'dot-results' | 'no-results';
  className?: string;
};

/**
 * “Don’t see your company” → Interstate vs Intrastate branching into onboarding.
 */
export function DotVerifierNotListedCta({
  sourcePage = '/verify-dot',
  companyName = '',
  stateCode = '',
  carrierQuery = '',
  context = 'name-results',
  className,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [scope, setScope] = useState<ScopeChoice>(null);
  const [localOpen, setLocalOpen] = useState(false);
  const [interstateOpen, setInterstateOpen] = useState(false);

  function openChooser() {
    setExpanded(true);
    setScope(null);
  }

  function chooseIntrastate() {
    setScope('intrastate');
    setLocalOpen(true);
  }

  function chooseInterstate() {
    setScope('interstate');
    setInterstateOpen(true);
  }

  const intro =
    context === 'dot-results'
      ? 'If the FMCSA record above is not the company you meant, you can still add the right mover.'
      : context === 'no-results'
        ? 'No perfect match? Choose how this company operates and we will guide you into the right onboarding path.'
        : 'None of these FMCSA matches look right? Choose how the company operates and we will open the correct onboarding path.';

  return (
    <div
      className={cn(
        'rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 sm:p-5',
        className
      )}
      role="region"
      aria-label="Don't see your company"
    >
      {!expanded ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background border text-primary">
              <SearchX className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground">Don&apos;t see your company?</p>
              <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{intro}</p>
            </div>
          </div>
          <Button
            type="button"
            size="lg"
            className="min-h-[48px] shrink-0 gap-2 w-full sm:w-auto"
            onClick={openChooser}
          >
            Don&apos;t see your company
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-foreground">
              Is this an Interstate or Intrastate (Local) moving company?
            </p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              This chooses the right onboarding path. You can change details after you continue.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={chooseInterstate}
              className={cn(
                'rounded-xl border bg-background p-4 text-left transition-colors',
                scope === 'interstate'
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/30'
                  : 'hover:border-primary/40 hover:bg-muted/40'
              )}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200">
                <Route className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-3 font-semibold text-foreground">Interstate</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Crosses state lines. We continue with FMCSA verification and listing in the main
                interstate directory.
              </p>
            </button>

            <button
              type="button"
              onClick={chooseIntrastate}
              className={cn(
                'rounded-xl border bg-background p-4 text-left transition-colors',
                scope === 'intrastate'
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/30'
                  : 'hover:border-primary/40 hover:bg-muted/40'
              )}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                <MapPin className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-3 font-semibold text-foreground">Intrastate / Local</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Operates only within one state (often no USDOT). Google Places, website scan, county
                selection — listed on county pages only.
              </p>
            </button>
          </div>

          <button
            type="button"
            className="text-xs text-muted-foreground underline-offset-2 hover:underline"
            onClick={() => {
              setExpanded(false);
              setScope(null);
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <SuggestCompanyModal
        open={localOpen}
        onOpenChange={setLocalOpen}
        sourcePage={sourcePage}
        forceScope="intrastate"
        initialName={companyName}
        initialState={stateCode}
        carrierQuery=""
      />

      <SuggestCompanyModal
        open={interstateOpen}
        onOpenChange={setInterstateOpen}
        sourcePage={sourcePage}
        forceScope="interstate"
        initialName={companyName}
        initialState={stateCode}
        carrierQuery={carrierQuery}
      />
    </div>
  );
}
