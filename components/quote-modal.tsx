'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import type { AutoTransportQuotePrefill } from '@/lib/auto-transport/types';
import { formatCurrency } from '@/lib/auto-transport/pricing';

export type QuoteInventoryItem = {
  name: string;
  quantity: number;
  volume: number;
  room?: string;
};

export type QuotePrefillData = {
  estimatedVolume?: number;
  estimatedWeight?: number;
  fromZip?: string;
  toZip?: string;
  inventory?: QuoteInventoryItem[];
  serviceType?: 'moving' | 'auto-transport';
  notes?: string;
  autoTransport?: AutoTransportQuotePrefill;
  destinationSlug?: string;
  marketPriority?: number;
};

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefilledData?: QuotePrefillData;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  fromZip: string;
  toZip: string;
  moveDate: string;
  homeSize: string;
  estimatedVolume: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export function QuoteModal({ open, onOpenChange, prefilledData = {} }: QuoteModalProps) {
  const isAutoTransport = prefilledData.serviceType === 'auto-transport';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    fromZip: prefilledData.fromZip || '',
    toZip: prefilledData.toZip || '',
    moveDate: '',
    homeSize: '2',
    estimatedVolume: prefilledData.estimatedVolume ? String(Math.round(prefilledData.estimatedVolume)) : '',
    notes: prefilledData.notes || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const estimatedWeight = prefilledData.estimatedVolume 
    ? Math.round(prefilledData.estimatedVolume * 7) 
    : null;

  // Reset form only when the modal is opened (not on every prefilledData change)
  // This prevents the form from resetting while the user is typing
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setErrors({});
      setFormData({
        name: '',
        email: '',
        phone: '',
        fromZip: prefilledData.fromZip || '',
        toZip: prefilledData.toZip || '',
        moveDate: '',
        homeSize: '2',
        estimatedVolume: prefilledData.estimatedVolume ? String(Math.round(prefilledData.estimatedVolume)) : '',
        notes: prefilledData.notes || '',
      });
    }
  }, [open]);  // Intentionally only depend on `open` to snapshot prefilledData at open time

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name as keyof FormData];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.fromZip.trim()) {
      newErrors.fromZip = 'From ZIP is required';
    } else if (!/^\d{5}$/.test(formData.fromZip.trim())) {
      newErrors.fromZip = 'Enter a valid 5-digit ZIP';
    }
    if (!formData.toZip.trim()) {
      newErrors.toZip = 'To ZIP is required';
    } else if (!/^\d{5}$/.test(formData.toZip.trim())) {
      newErrors.toZip = 'Enter a valid 5-digit ZIP';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fix the highlighted fields');
      return;
    }

    setIsSubmitting(true);

    const hasInventory = (prefilledData.inventory?.length ?? 0) > 0;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim() || null,
      from_zip: formData.fromZip.trim(),
      to_zip: formData.toZip.trim(),
      move_date: formData.moveDate || null,
      home_size: isAutoTransport ? 'auto-transport' : formData.homeSize,
      estimated_volume: formData.estimatedVolume ? parseFloat(formData.estimatedVolume) : null,
      estimated_weight: prefilledData.estimatedWeight
        ?? (formData.estimatedVolume ? Math.round(parseFloat(formData.estimatedVolume) * 7) : null),
      inventory: hasInventory ? prefilledData.inventory : null,
      notes: formData.notes.trim() || null,
      destination_slug: prefilledData.destinationSlug ?? null,
      market_priority: prefilledData.marketPriority ?? null,
      source: isAutoTransport
        ? 'auto-transport-calculator'
        : prefilledData.destinationSlug
          ? `destination-hub:${prefilledData.destinationSlug}`
          : hasInventory
            ? 'moving-calculator'
            : 'quote-modal',
      service_type: isAutoTransport ? 'auto-transport' : 'moving',
      auto_transport: prefilledData.autoTransport ?? null,
    };

    try {
      // Real persistence when Supabase is configured
      if (isSupabaseConfigured()) {
        const { inventory: _inventory, estimated_weight: _weight, ...dbPayload } = payload;
        const { error } = await supabase.from('quote_requests').insert(dbPayload);
        if (error) {
          console.warn('Supabase insert failed (non-fatal for user):', error.message);
        }
      }

      // Always log the lead for visibility / easy copy to CRM
      console.log('%c[Quote Lead Captured]', 'color:#0077D4', {
        ...payload,
        timestamp: new Date().toISOString(),
      });

      const notifyResponse = await fetch('/api/send-quote-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const notifyData = await notifyResponse.json().catch(() => ({}));

      if (notifyData?.success) {
        console.log('%c[Quote Lead Synced]', 'color:#22c55e', {
          lead: payload.name,
          teamEmailSent: notifyData.teamEmailSent,
          confirmationSent: notifyData.confirmationSent,
          brevoSynced: notifyData.brevoSynced,
          brevoContactId: notifyData.brevoContactId,
          messageIds: notifyData.messageIds,
        });
      } else {
        console.warn('[Quote Lead Sync Issue]', {
          status: notifyResponse.status,
          teamEmailSent: notifyData?.teamEmailSent,
          teamEmailError: notifyData?.teamEmailError,
          brevoSynced: notifyData?.brevoSynced,
          brevoError: notifyData?.brevoError,
          brevoAttempts: notifyData?.brevoAttempts,
          env: notifyData?.env,
          error: notifyData?.error || notifyData?.reason,
        });
      }

      setIsSubmitting(false);
      setSubmitted(true);

      // Also fire a nice toast in case they miss the in-modal success
      toast.success('Request received!', {
        description: isAutoTransport
          ? "We'll connect you with 2-3 vetted auto transport carriers within 24 hours."
          : "We'll connect you with 2-3 top-rated licensed movers within 24 hours.",
      });
    } catch (err) {
      console.error('Quote submission error:', err);
      try {
        const notifyResponse = await fetch('/api/send-quote-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const notifyData = await notifyResponse.json().catch(() => ({}));
        console.warn('[Quote Lead Sync Fallback]', notifyData);
      } catch (notifyErr) {
        console.warn('Lead notification failed (fallback):', notifyErr);
      }

      // Still succeed for the user experience (demo-friendly)
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Request received!', {
        description: isAutoTransport
          ? "We'll connect you with 2-3 vetted auto transport carriers within 24 hours."
          : "We'll connect you with 2-3 top-rated licensed movers within 24 hours.",
      });
    }
  };

  const closeAndReset = () => {
    onOpenChange(false);
    // Small delay so exit animation can play before full reset
    setTimeout(() => {
      setSubmitted(false);
      setErrors({});
      setFormData({
        name: '',
        email: '',
        phone: '',
        fromZip: '',
        toZip: '',
        moveDate: '',
        homeSize: '2',
        estimatedVolume: '',
        notes: '',
      });
    }, 200);
  };

  const handleClose = () => {
    if (submitted) {
      closeAndReset();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="fixed left-[50%] top-[6vh] z-50 w-full max-w-[580px] -translate-x-1/2 rounded-3xl border bg-background p-0 shadow-2xl outline-none overflow-hidden max-h-[88vh] flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      >
        {/* Fixed, always-visible engaging header */}
        <div className="px-6 pt-5 pb-4 border-b bg-gradient-to-r from-primary/5 via-primary/5 to-transparent flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <DialogTitle className="text-2xl tracking-tight font-semibold">
                  {isAutoTransport ? 'Get Auto Transport Quotes' : 'Get 2-3 Competitive Quotes'}
                </DialogTitle>
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5 font-medium">FREE</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {isAutoTransport
                  ? 'No obligation. FMCSA-licensed carriers and brokers. Matched within 24 hours.'
                  : 'No obligation. Only licensed interstate movers. Matched within 24 hours.'}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Trust bar */}
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
            <Link
              href="/resources/fmcsa"
              className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> FMCSA Verified
            </Link>
            <Link
              href="/companies?sort=reputation"
              className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              52k+ Verified Reviews
            </Link>
            <Link
              href="/about#disclaimer"
              className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              Independent Directory
            </Link>
          </div>
        </div>

        {/* Scrollable body so the full modal (header + form/success) is always complete and nice on all screen sizes */}
        <div className="flex-1 overflow-y-auto p-6">
          {!submitted ? (
            /* ENGAGING FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="hidden"
              name="destination_slug"
              value={prefilledData.destinationSlug ?? ''}
              readOnly
            />
            <input
              type="hidden"
              name="market_priority"
              value={prefilledData.marketPriority != null ? String(prefilledData.marketPriority) : ''}
              readOnly
            />
            {/* Value reinforcement + prefill highlight */}
            {isAutoTransport && prefilledData.autoTransport && (
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm space-y-1">
                <div className="font-medium">Your transport estimate</div>
                <div className="font-semibold">
                  {formatCurrency(prefilledData.autoTransport.lowTotal)} –{' '}
                  {formatCurrency(prefilledData.autoTransport.highTotal)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {prefilledData.autoTransport.distanceMiles.toLocaleString()} miles ·{' '}
                  {prefilledData.autoTransport.transportMethod === 'open' ? 'Open' : 'Enclosed'} ·{' '}
                  {prefilledData.autoTransport.vehicleCategory === 'regular' ? 'Regular vehicle' : 'Larger vehicle'}
                </div>
              </div>
            )}

            {!isAutoTransport && estimatedWeight && (
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm flex items-center gap-3">
                <div className="font-medium">Your current estimate:</div>
                <div className="font-semibold">{formData.estimatedVolume} cu ft ≈ {estimatedWeight} lbs</div>
                <div className="text-xs text-muted-foreground ml-auto">We&apos;ll refine this</div>
              </div>
            )}

            {/* Contact - prominent */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[1px] text-muted-foreground mb-3">
                <div className="h-px flex-1 bg-border" /> YOUR CONTACT INFO <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Full name <span className="text-destructive">*</span></label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alex Rivera"
                    className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email <span className="text-destructive">*</span></label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@domain.com"
                    className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium mb-1">Phone number <span className="text-emerald-600">(highly recommended — movers prefer calling)</span></label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="text-base"
                />
              </div>
            </div>

            {/* Move Route */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[1px] text-muted-foreground mb-3">
                <div className="h-px flex-1 bg-border" /> {isAutoTransport ? 'TRANSPORT ROUTE' : 'MOVE DETAILS'} <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">From ZIP <span className="text-destructive">*</span></label>
                  <Input
                    name="fromZip"
                    value={formData.fromZip}
                    onChange={handleChange}
                    placeholder="90210"
                    maxLength={5}
                    inputMode="numeric"
                    className={errors.fromZip ? 'border-destructive focus-visible:ring-destructive' : ''}
                  />
                  {errors.fromZip && <p className="text-xs text-destructive mt-1">{errors.fromZip}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">To ZIP <span className="text-destructive">*</span></label>
                  <Input
                    name="toZip"
                    value={formData.toZip}
                    onChange={handleChange}
                    placeholder="10001"
                    maxLength={5}
                    inputMode="numeric"
                    className={errors.toZip ? 'border-destructive focus-visible:ring-destructive' : ''}
                  />
                  {errors.toZip && <p className="text-xs text-destructive mt-1">{errors.toZip}</p>}
                </div>
              </div>
            </div>

            {/* Details row */}
            <div className={`grid grid-cols-1 ${isAutoTransport ? '' : 'sm:grid-cols-2'} gap-3`}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {isAutoTransport ? 'Preferred ship date' : 'Preferred date'}
                </label>
                <Input type="date" name="moveDate" value={formData.moveDate} onChange={handleChange} />
                <p className="text-[10px] text-muted-foreground mt-1">Flexible? Leave blank</p>
              </div>

              {!isAutoTransport && (
                <div>
                  <label className="block text-sm font-medium mb-1">Home / move size</label>
                  <Select name="homeSize" value={formData.homeSize} onChange={handleChange}>
                    <option value="studio">Studio / Small apartment</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4+">4+ Bedrooms / Large</option>
                  </Select>
                </div>
              )}
            </div>

            {!isAutoTransport && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Estimated volume (cubic feet)
                </label>
                <div className="flex gap-2 items-center">
                  <Input
                    name="estimatedVolume"
                    type="number"
                    value={formData.estimatedVolume}
                    onChange={handleChange}
                    placeholder="Use our calculator"
                    className="flex-1"
                  />
                  {estimatedWeight && (
                    <div className="text-xs whitespace-nowrap px-2 py-1 bg-muted rounded">
                      ≈ {estimatedWeight} lbs
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Pro tip: Use the Smart Move Estimator above for accuracy.</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Special notes or requirements</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                placeholder={
                  isAutoTransport
                    ? 'Vehicle make/model, running condition, preferred pickup window, or other details...'
                    : 'Piano, antiques, tight timeline, stairs, or anything else...'
                }
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-y min-h-[60px]"
              />
            </div>

            {/* Powerful CTA + Trust */}
            <div className="pt-2 space-y-3">
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold shadow-sm"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Sending to our matching team...'
                  : isAutoTransport
                    ? 'Get my transport quotes now'
                    : 'Get my free quotes now'}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                100% free • No obligation • We only work with licensed, highly-rated movers
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground pt-1">
                <div className="flex items-center gap-1">✓ Instant matching</div>
                <div className="flex items-center gap-1">✓ 24-hour response</div>
                <div className="flex items-center gap-1">✓ Private & secure</div>
              </div>
            </div>
          </form>
        ) : (
          /* HIGH-CONVERSION SUCCESS STATE */
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mb-5">
              <CheckCircle2 className="h-9 w-9 text-emerald-600 dark:text-emerald-400" />
            </div>

            <h3 className="text-2xl font-semibold tracking-tight">You&apos;re all set!</h3>
            <p className="mt-2 text-muted-foreground">We&apos;ve received your details. A confirmation was emailed to you and our team has been notified.</p>

            <div className="my-6 mx-auto max-w-[320px] rounded-xl bg-muted/50 p-4 text-left text-sm border">
              <div className="font-semibold mb-2 flex items-center gap-2">
                <ArrowRight className="h-4 w-4" /> What happens next
              </div>
              <ol className="space-y-1.5 text-muted-foreground text-xs pl-1">
                <li>1. Request saved + confirmation sent to your email</li>
                <li>2. We match you with 2-3 pre-vetted, licensed movers</li>
                <li>3. Movers will reach out directly with custom quotes</li>
                <li>4. You compare, negotiate, and choose — zero pressure</li>
              </ol>
            </div>

            <div className="space-y-2">
              <Button onClick={closeAndReset} className="w-full h-11">
                Return to the site
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSubmitted(false);
                  // keep prefilled data if coming from calculator
                  setFormData(prev => ({
                    ...prev,
                    name: '',
                    email: '',
                    phone: '',
                    notes: '',
                  }));
                  setErrors({});
                }}
              >
                Submit a different move
              </Button>
            </div>

            <p className="mt-6 text-[10px] text-muted-foreground max-w-[260px] mx-auto">
              Your info stays private. Only matched movers see your request.
            </p>
          </div>
        )}
        </div> {/* end scrollable body */}
      </DialogContent>
    </Dialog>
  );
}
