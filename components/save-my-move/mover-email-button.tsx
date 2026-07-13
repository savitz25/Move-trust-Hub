'use client';

import { useId, useState } from 'react';
import { Mail } from 'lucide-react';
import { useSaveMyMove } from '@/components/save-my-move/save-my-move-provider';
import { saveMoverAction } from '@/actions/save-my-move';
import { emailMoverDetailsClient } from '@/lib/save-my-move/email-mover-client';
import { stashPendingSaveAction } from '@/lib/save-my-move/pending-action';
import { trackSaveMyMoveMover } from '@/components/ga-events';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const TOOLTIP = 'Email me about this mover';

type MoverEmailButtonProps = {
  companySlug: string;
  companyName: string;
  className?: string;
};

export function MoverEmailButton({
  companySlug,
  companyName,
  className,
}: MoverEmailButtonProps) {
  const tooltipId = useId();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const { requireAuth, user, loading, isMoverSaved, markMoverSaved } = useSaveMyMove();
  const saved = user ? isMoverSaved(companySlug) : false;

  const handleClick = async () => {
    if (loading || sending) return;

    if (!user) {
      stashPendingSaveAction({
        type: 'mover',
        payload: { companySlug, companyName, sendEmail: true },
      });
      requireAuth({ context: 'mover', redirectPath: `/companies/${companySlug}` });
      return;
    }

    setSending(true);
    try {
      if (!saved) {
        await saveMoverAction({ companySlug });
        markMoverSaved(companySlug);
        trackSaveMyMoveMover({ company_slug: companySlug });
      }

      const emailResult = await emailMoverDetailsClient(companySlug);
      if (emailResult.success) {
        toast.success(`We emailed you details about ${companyName}`);
      } else {
        toast.error(emailResult.error ?? 'Could not send email');
      }
    } catch {
      toast.error('Something went wrong — try again');
    } finally {
      setSending(false);
    }
  };

  return (
    <span className="relative inline-flex shrink-0">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading || sending}
        className={cn(
          'inline-flex items-center justify-center rounded-md p-1.5 transition-colors',
          'text-muted-foreground hover:text-primary hover:bg-primary/10',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          sending && 'opacity-60',
          className
        )}
        aria-label={TOOLTIP}
        aria-describedby={tooltipOpen ? tooltipId : undefined}
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
        onFocus={() => setTooltipOpen(true)}
        onBlur={() => setTooltipOpen(false)}
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
      </button>
      {tooltipOpen && (
        <span
          id={tooltipId}
          role="tooltip"
          className="pointer-events-none absolute left-1/2 bottom-full z-20 mb-2 w-max max-w-[200px] -translate-x-1/2 rounded-md border bg-popover px-2.5 py-1.5 text-center text-[11px] leading-snug text-popover-foreground shadow-md"
        >
          {TOOLTIP}
        </span>
      )}
    </span>
  );
}