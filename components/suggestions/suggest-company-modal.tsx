'use client';

import { useEffect, useState, useTransition } from 'react';
import { Building2, Loader2, PlusCircle } from 'lucide-react';
import { submitCompanySuggestion } from '@/actions/suggest-company';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourcePage: string;
  initialName?: string;
  initialUsdot?: string;
};

export function SuggestCompanyModal({
  open,
  onOpenChange,
  sourcePage,
  initialName = '',
  initialUsdot = '',
}: Props) {
  const [name, setName] = useState(initialName);
  const [usdot, setUsdot] = useState(initialUsdot);
  const [details, setDetails] = useState('');
  const [suggestedByName, setSuggestedByName] = useState('');
  const [suggestedByEmail, setSuggestedByEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (open && !submitted) {
      setName(initialName);
      setUsdot(initialUsdot);
    }
  }, [open, initialName, initialUsdot, submitted]);

  function resetForm() {
    setName(initialName);
    setUsdot(initialUsdot);
    setDetails('');
    setSuggestedByName('');
    setSuggestedByEmail('');
    setSubmitted(false);
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm();
    onOpenChange(next);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await submitCompanySuggestion({
        name,
        usdot: usdot || null,
        details: details || null,
        suggestedByName,
        suggestedByEmail,
        sourcePage,
        website: '',
      });

      if (!res.success) {
        toast.error(res.error ?? 'Submission failed');
        return;
      }

      setSubmitted(true);
      toast.success('Thank you — we’ll review and add it shortly.');
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Suggest a missing company
          </DialogTitle>
          <DialogClose onClose={() => handleOpenChange(false)} />
        </DialogHeader>

        {submitted ? (
          <div className="px-6 pb-6 space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Thank you — we&apos;ll review and add it shortly. Our team verifies FMCSA
              licensing before publishing new directory listings.
            </p>
            <Button className="w-full" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Help other families find trustworthy movers. If you know the USDOT number,
              we&apos;ll pull FMCSA authority and address data automatically.
            </p>

            <div>
              <label htmlFor="suggest-name" className="text-sm font-medium">
                Company name <span className="text-destructive">*</span>
              </label>
              <Input
                id="suggest-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. ABC Moving & Storage"
                className="mt-1.5"
                required
                maxLength={120}
                disabled={pending}
              />
            </div>

            <div>
              <label htmlFor="suggest-usdot" className="text-sm font-medium">
                USDOT number <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <Input
                id="suggest-usdot"
                value={usdot}
                onChange={(e) => setUsdot(e.target.value)}
                placeholder="e.g. 1234567"
                className="mt-1.5"
                inputMode="numeric"
                maxLength={20}
                disabled={pending}
              />
            </div>

            <div>
              <label htmlFor="suggest-details" className="text-sm font-medium">
                Additional details <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                id="suggest-details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="City/state, website, or why this mover should be listed…"
                className="mt-1.5 flex min-h-[88px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <Button type="submit" className="w-full gap-2" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4" />
                  Submit suggestion
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground">
              Submissions are moderated. We limit duplicate and excessive requests to protect the directory.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}