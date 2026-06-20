import { Phone } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { SITE_PHONE_DISPLAY, SITE_PHONE_URI } from '@/lib/contact';

const clickToCallVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        navbar:
          'rounded-full border border-primary/25 bg-primary/[0.06] px-3.5 py-2 text-sm text-primary shadow-sm hover:border-primary/40 hover:bg-primary/10',
        icon:
          'h-10 w-10 rounded-full border border-primary/25 bg-primary/[0.06] text-primary shadow-sm hover:border-primary/40 hover:bg-primary/10',
        footer:
          'rounded-xl border border-primary/20 bg-primary/[0.05] px-4 py-3 text-sm text-primary hover:border-primary/35 hover:bg-primary/10 w-full sm:w-auto',
        prominent:
          'rounded-xl bg-primary px-5 py-3 text-sm text-primary-foreground shadow-md hover:bg-primary/90 w-full sm:w-auto',
      },
      showLabel: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'navbar',
      showLabel: true,
    },
  }
);

type ClickToCallButtonProps = VariantProps<typeof clickToCallVariants> & {
  className?: string;
  hideNumber?: boolean;
};

export function ClickToCallButton({
  variant = 'navbar',
  showLabel = true,
  className,
  hideNumber = false,
}: ClickToCallButtonProps) {
  const isIconOnly = variant === 'icon' || hideNumber;

  return (
    <a
      href={SITE_PHONE_URI}
      className={cn(clickToCallVariants({ variant, showLabel }), className)}
      aria-label={`Call Move Trust Hub at ${SITE_PHONE_DISPLAY}`}
    >
      <Phone
        className={cn(
          'shrink-0',
          variant === 'icon' ? 'h-4 w-4' : 'h-4 w-4'
        )}
        aria-hidden="true"
      />
      {!isIconOnly && (
        <>
          {showLabel && variant !== 'footer' && (
            <span className="hidden xl:inline text-[11px] font-medium uppercase tracking-wider text-primary/70">
              Call
            </span>
          )}
          <span className="tabular-nums tracking-tight">{SITE_PHONE_DISPLAY}</span>
        </>
      )}
      {variant === 'icon' && <span className="sr-only">{SITE_PHONE_DISPLAY}</span>}
    </a>
  );
}