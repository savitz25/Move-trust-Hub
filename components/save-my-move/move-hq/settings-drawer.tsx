'use client';

import { useEffect } from 'react';
import { Download, LogOut, Settings, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { updateEmailPreferencesAction } from '@/actions/account';
import { toast } from 'sonner';

type SettingsDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  marketingOptIn: boolean;
  moverAlertsOptIn: boolean;
  exporting: boolean;
  deleting: boolean;
  onExport: () => void;
  onDeleteAccount: () => void;
  onSignOut: () => void;
};

export function SettingsDrawer({
  open,
  onOpenChange,
  email,
  marketingOptIn,
  moverAlertsOptIn,
  exporting,
  deleting,
  onExport,
  onDeleteAccount,
  onSignOut,
}: SettingsDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', onEscape);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEscape);
      document.body.style.overflow = prev;
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            aria-label="Close settings"
            onClick={() => onOpenChange(false)}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-l bg-background shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="move-hq-settings-title"
          >
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 id="move-hq-settings-title" className="text-lg font-semibold flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" aria-hidden="true" />
                Settings
              </h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                aria-label="Close settings panel"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 text-sm">
              <p className="text-muted-foreground">
                Signed in as <span className="font-medium text-foreground">{email}</span>
              </p>

              <section>
                <h3 className="font-semibold mb-3">Email preferences</h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 opacity-80">
                    <input type="checkbox" checked disabled className="mt-1" />
                    <span>
                      <strong>Transactional emails</strong> (sign-in links, requested documents) —
                      always on
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1"
                      defaultChecked={marketingOptIn}
                      onChange={(e) =>
                        updateEmailPreferencesAction({
                          marketingOptIn: e.target.checked,
                          moverAlertsOptIn,
                        }).then(() => toast.success('Preferences updated'))
                      }
                    />
                    <span>Marketing updates (off by default)</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1"
                      defaultChecked={moverAlertsOptIn}
                      onChange={(e) =>
                        updateEmailPreferencesAction({
                          marketingOptIn,
                          moverAlertsOptIn: e.target.checked,
                        }).then(() => toast.success('Preferences updated'))
                      }
                    />
                    <span>Saved mover alerts (FMCSA / safety changes)</span>
                  </label>
                </div>
              </section>

              <section className="space-y-3 pt-2 border-t">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={onExport} disabled={exporting}>
                  <Download className="h-4 w-4" />
                  {exporting ? 'Exporting…' : 'Download my data'}
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={onSignOut}>
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start gap-2"
                  onClick={onDeleteAccount}
                  disabled={deleting}
                >
                  <Trash2 className="h-4 w-4" />
                  {deleting ? 'Deleting…' : 'Delete my account'}
                </Button>
              </section>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}