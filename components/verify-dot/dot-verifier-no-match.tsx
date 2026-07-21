'use client';

import { useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  MapPin,
  Route,
  Search,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SuggestCompanyModal } from '@/components/suggestions/suggest-company-modal';
import { cn } from '@/lib/utils';

export type NoMatchSearchMode = 'license' | 'name';

export type NoMatchContext = {
  mode: NoMatchSearchMode;
  /** Human-readable search summary, e.g. DOT 1234567 or "Acme Movers" in TX */
  searchLabel: string;
  /** Prefill for local onboarding */
  companyName?: string;
  stateCode?: string;
  /** Original DOT/MC query when license mode */
  carrierQuery?: string;
};

type Props = {
  context: NoMatchContext;
  onSwitchToLicense: () => void;
  onSwitchToName: () => void;
  onDismiss?: () => void;
  sourcePage?: string;
};

type ScopeChoice = 'interstate' | 'intrastate' | null;

const SAFER_HOME = 'https://safer.fmcsa.dot.gov/CompanySnapshot.aspx';

export function DotVerifierNoMatch({
  context,
  onSwitchToLicense,
  onSwitchToName,
  onDismiss,
  sourcePage = '/verify-dot',
}: Props) {
  const [scope, setScope] = useState<ScopeChoice>(null);
  const [localModalOpen, setLocalModalOpen] = useState(false);
  const [interstateSuggestOpen, setInterstateSuggestOpen] = useState(false);

  function selectIntrastate() {
    setScope('intrastate');
    setLocalModalOpen(true);
  }

  function selectInterstate() {
    setScope('interstate');
  }

  return (
    <div
      className="mt-6 space-y-5 rounded-xl border border-amber-200/80 bg-amber-50/50 p-5 sm:p-6 dark:border-amber-900/40 dark:bg-amber-950/20 animate-in fade-in slide-in-from-bottom-2 duration-300"
      role="region"
      aria-labelledby="no-match-heading"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
          <ShieldAlert className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <h2 id="no-match-heading" className="text-lg font-semibold text-foreground">
            No FMCSA carrier found
          </h2>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            We couldn&apos;t match{' '}
            <strong className="text-foreground">{context.searchLabel}</strong> in the federal
            FMCSA database. That often means a wrong number — or a legitimate{' '}
            <strong className="text-foreground">local / in-state</strong> mover that doesn&apos;t
            need a USDOT.
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground">
          Is this an Interstate or Intrastate (Local) moving company?
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Your answer determines the right next step — we won&apos;t leave you at a dead end.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={selectInterstate}
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
              Crosses state or international borders. Requires a USDOT number and FMCSA licensing.
            </p>
          </button>

          <button
            type="button"
            onClick={selectIntrastate}
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
              Operates only within one state (no USDOT required). Verified with Google + BBB and
              listed on selected county pages only.
            </p>
          </button>
        </div>
      </div>

      {scope === 'interstate' ? (
        <div className="space-y-4 rounded-lg border bg-background p-4 sm:p-5">
          <p className="text-sm font-medium text-foreground">Next steps for interstate movers</p>

          {context.mode === 'license' ? (
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                The number may be mistyped, outdated, or not an active FMCSA record. Many people
                confuse MC numbers with USDOT numbers.
              </p>
              <p>
                <strong className="text-foreground">Try Search by Name + State</strong> to find
                the correct USDOT, then verify again with that number.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Button type="button" className="gap-2 min-h-[44px]" onClick={onSwitchToName}>
                  Search by Name + State
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 min-h-[44px]"
                  asChild
                >
                  <a href={SAFER_HOME} target="_blank" rel="noopener noreferrer">
                    Open FMCSA SAFER
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                If this company hauls across state lines, it should have a USDOT number even when
                our name search didn&apos;t match.
              </p>
              <p>
                Look up the company on the official{' '}
                <strong className="text-foreground">FMCSA SAFER</strong> site, copy the correct
                USDOT or MC number, then return here and use{' '}
                <strong className="text-foreground">Search by DOT / MC</strong>.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Button type="button" variant="outline" className="gap-2 min-h-[44px]" asChild>
                  <a href={SAFER_HOME} target="_blank" rel="noopener noreferrer">
                    Find USDOT on FMCSA SAFER
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button type="button" className="gap-2 min-h-[44px]" onClick={onSwitchToLicense}>
                  Search by DOT / MC
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground mb-2">
              Still can&apos;t find them but believe they should be listed?
            </p>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="min-h-[40px]"
              onClick={() => setInterstateSuggestOpen(true)}
            >
              Suggest this company for review
            </Button>
          </div>
        </div>
      ) : null}

      {scope === 'intrastate' && !localModalOpen ? (
        <div className="rounded-lg border border-emerald-200/80 bg-background p-4 text-sm text-muted-foreground dark:border-emerald-900/40">
          <p>
            Local movers are added with <strong className="text-foreground">Google + BBB</strong>{' '}
            verification and your county coverage — no FMCSA lookup.
          </p>
          <Button type="button" className="mt-3 min-h-[44px] gap-2" onClick={() => setLocalModalOpen(true)}>
            Continue local mover setup
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ) : null}

      {onDismiss ? (
        <button
          type="button"
          className="text-xs text-muted-foreground underline-offset-2 hover:underline"
          onClick={onDismiss}
        >
          Dismiss and try a different search
        </button>
      ) : null}

      <SuggestCompanyModal
        open={localModalOpen}
        onOpenChange={setLocalModalOpen}
        sourcePage={sourcePage}
        forceScope="intrastate"
        initialName={context.companyName ?? ''}
        initialState={context.stateCode ?? ''}
        carrierQuery=""
      />

      <SuggestCompanyModal
        open={interstateSuggestOpen}
        onOpenChange={setInterstateSuggestOpen}
        sourcePage={sourcePage}
        forceScope="interstate"
        initialName={context.companyName ?? ''}
        carrierQuery={context.carrierQuery ?? ''}
      />
    </div>
  );
}
