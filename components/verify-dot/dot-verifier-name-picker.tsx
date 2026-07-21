'use client';

import { Building2, MapPin } from 'lucide-react';
import type { VerifyDotNameCandidate } from '@/actions/verify-dot';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DotVerifierNotListedCta } from '@/components/verify-dot/dot-verifier-not-listed-cta';

type Props = {
  companyName: string;
  state: string;
  candidates: VerifyDotNameCandidate[];
  onSelect: (candidate: VerifyDotNameCandidate) => void;
  selectingDot: string | null;
  disabled?: boolean;
  sourcePage?: string;
  /** Hide when embedded inside Suggest Company onboarding (avoids nested modals). */
  showNotListedCta?: boolean;
};

function formatMc(mc: string | null): string {
  if (!mc) return '—';
  const digits = mc.replace(/\D/g, '');
  return digits ? `MC-${digits}` : '—';
}

function displayName(candidate: VerifyDotNameCandidate): string {
  if (candidate.dbaName && candidate.dbaName !== candidate.legalName) {
    return `${candidate.legalName} (DBA ${candidate.dbaName})`;
  }
  return candidate.legalName;
}

export function DotVerifierNamePicker({
  companyName,
  state,
  candidates,
  onSelect,
  selectingDot,
  disabled,
  sourcePage = '/verify-dot',
  showNotListedCta = true,
}: Props) {
  return (
    <div className="space-y-4" role="region" aria-label="Select the correct carrier">
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-sm font-medium text-foreground">
          Multiple carriers match &ldquo;{companyName}&rdquo; in {state}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Select the company you want to verify. We&apos;ll run the full FMCSA lookup
          and suggestion flow for that carrier.
        </p>
      </div>

      <ul className="space-y-2" role="listbox" aria-label="FMCSA carrier matches">
        {candidates.map((candidate) => {
          const isSelecting = selectingDot === candidate.dotNumber;
          const location = [candidate.city, candidate.state].filter(Boolean).join(', ');

          return (
            <li key={candidate.dotNumber}>
              <Button
                type="button"
                variant="outline"
                className="h-auto w-full justify-start gap-3 px-4 py-3 text-left"
                onClick={() => onSelect(candidate)}
                disabled={disabled || Boolean(selectingDot)}
                role="option"
                aria-selected={isSelecting}
              >
                <Building2 className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="font-medium text-foreground leading-snug">
                    {displayName(candidate)}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    {location ? (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {location}
                      </span>
                    ) : null}
                    <span className="font-mono">DOT {candidate.dotNumber}</span>
                    <span className="font-mono">{formatMc(candidate.mcNumber)}</span>
                  </div>
                </div>
                {isSelecting ? (
                  <Badge variant="secondary" className="shrink-0">
                    Verifying…
                  </Badge>
                ) : (
                  <Badge variant="outline" className="shrink-0">
                    Select
                  </Badge>
                )}
              </Button>
            </li>
          );
        })}
      </ul>

      {showNotListedCta ? (
        <DotVerifierNotListedCta
          sourcePage={sourcePage}
          companyName={companyName}
          stateCode={state}
          context="name-results"
        />
      ) : null}
    </div>
  );
}