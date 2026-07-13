'use client';

import { useEffect, useId, useRef } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type MobileBottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Full viewport height sheet (item picker) vs partial (summary) */
  fullScreen?: boolean;
  className?: string;
};

/**
 * Mobile-only bottom sheet pattern for the Moving Calculator.
 * Desktop/tablet (md+) never renders this component.
 */
export function MobileBottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  fullScreen = false,
  className,
}: MobileBottomSheetProps) {
  const dragControls = useDragControls();
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [open, onOpenChange]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 400) {
      onOpenChange(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.35 }}
            onDragEnd={handleDragEnd}
            className={cn(
              'absolute inset-x-0 bottom-0 flex flex-col rounded-t-2xl border-t bg-background shadow-trust-lg',
              fullScreen ? 'top-12 max-h-[calc(100dvh-3rem)]' : 'max-h-[min(88dvh,640px)]',
              className
            )}
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            <div
              className="flex shrink-0 cursor-grab active:cursor-grabbing flex-col items-center pt-3 pb-2 px-4"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30 mb-3" aria-hidden />
              <div className="flex w-full items-start justify-between gap-3">
                <div className="min-w-0 text-left">
                  <h2 id={titleId} className="text-lg font-semibold leading-tight">
                    {title}
                  </h2>
                  {description ? (
                    <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                  ) : null}
                </div>
                <Button
                  ref={closeRef}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 shrink-0 rounded-full"
                  onClick={() => onOpenChange(false)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}