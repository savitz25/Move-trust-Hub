'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MOVE_PRESETS, getPresetToastMessage, type MovePresetId } from '@/lib/moving-calculator/move-presets';
import { useCalculatorStore } from '@/store/calculator-store';
import { trackPresetSelected } from '@/components/ga-events';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type OnboardingStripProps = {
  onPresetSelect?: (presetId: MovePresetId) => void;
};

export function OnboardingStrip({ onPresetSelect }: OnboardingStripProps) {
  const { onboardingDismissed, loadPreset, inventory } = useCalculatorStore();

  const handleSelect = (presetId: MovePresetId) => {
    loadPreset(presetId);
    trackPresetSelected({ preset: presetId });
    onPresetSelect?.(presetId);
    toast.success(getPresetToastMessage(presetId), {
      description: presetId === 'scratch' || presetId === 'custom'
        ? 'Add items room by room or search below.'
        : 'Fine-tune quantities anytime.',
    });
  };

  const collapsed = onboardingDismissed && inventory.length > 0;

  return (
    <AnimatePresence mode="wait">
      {!collapsed ? (
        <motion.section
          key="onboarding"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
          aria-label="Choose your move size"
        >
          <div className="rounded-xl border bg-gradient-to-br from-primary/5 via-background to-background p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight mb-1">
              How big is your move?
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Pick a starting point — we&apos;ll pre-load typical furniture. No account needed.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
              {MOVE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelect(preset.id)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-border/70',
                    'bg-card px-3 text-center transition-all duration-150',
                    // Mobile: 48px+ touch height; desktop unchanged
                    'min-h-[88px] py-4 sm:min-h-0 sm:py-5',
                    'hover:border-primary hover:bg-primary/5 hover:shadow-trust',
                    'active:scale-[0.98] md:active:scale-100',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                  )}
                >
                  <span className="text-2xl md:text-2xl" aria-hidden="true">{preset.icon}</span>
                  <span className="text-sm font-semibold">{preset.label}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">
                    {preset.description}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleSelect('scratch')}
              className="mt-3 text-sm text-muted-foreground hover:text-primary underline underline-offset-2 transition-colors"
            >
              Start from scratch instead
            </button>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}