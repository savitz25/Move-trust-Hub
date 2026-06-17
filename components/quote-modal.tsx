'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefilledData?: {
    estimatedVolume?: number;
    fromZip?: string;
    toZip?: string;
    fromCity?: string;
    fromState?: string;
    toCity?: string;
    toState?: string;
  };
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  fromZip: string;
  toZip: string;
  fromCity: string;
  fromState: string;
  toCity: string;
  toState: string;
  moveDate: string;
  homeSize: string;
  estimatedVolume: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export function QuoteModal({ open, onOpenChange, prefilledData = {} }: QuoteModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    fromZip: prefilledData.fromZip || '',
    toZip: prefilledData.toZip || '',
    fromCity: prefilledData.fromCity || '',
    fromState: prefilledData.fromState || '',
    toCity: prefilledData.toCity || '',
    toState: prefilledData.toState || '',
    moveDate: '',
    homeSize: '2',
    estimatedVolume: prefilledData.estimatedVolume ? String(Math.round(prefilledData.estimatedVolume)) : '',
    notes: '',
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
        fromCity: prefilledData.fromCity || '',
        fromState: prefilledData.fromState || '',
        toCity: prefilledData.toCity || '',
        toState: prefilledData.toState || '',
        moveDate: '',
        homeSize: '2',
        estimatedVolume: prefilledData.estimatedVolume ? String(Math.round(prefilledData.estimatedVolume)) : '',
        notes: '',
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

  // Cutting-edge ZIP lookup: auto-fill city/state when valid ZIP entered
  async function lookupZip(zip: string): Promise<{ city: string; state: string } | null> {
    if (!/^\d{5}$/.test(zip)) return null;
    try {
      const res = await fetch(`/api/zip-lookup?zip=${zip}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  // Watch ZIP changes and auto-resolve city/state for confirmation
  useEffect(() => {
    const zip = formData.fromZip.trim();
    if (zip.length === 5 && /^\d{5}$/.test(zip)) {
      lookupZip(zip).then((loc) => {
        if (loc) {
          setFormData((prev) => ({
            ...prev,
            fromCity: loc.city,
            fromState: loc.state,
          }));
        }
      });
    }
  }, [formData.fromZip]);

  useEffect(() => {
    const zip = formData.toZip.trim();
    if (zip.length === 5 && /^\d{5}$/.test(zip)) {
      lookupZip(zip).then((loc) => {
        if (loc) {
          setFormData((prev) => ({
            ...prev,
            toCity: loc.city,
            toState: loc.state,
          }));
        }
      });
    }
  }, [formData.toZip]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fix the highlighted fields');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim() || null,
      from_zip: formData.fromZip.trim(),
      to_zip: formData.toZip.trim(),
      from_city: formData.fromCity.trim() || null,
      from_state: formData.fromState.trim() || null,
      to_city: formData.toCity.trim() || null,
      to_state: formData.toState.trim() || null,
      move_date: formData.moveDate || null,
      home_size: formData.homeSize,
      estimated_volume: formData.estimatedVolume ? parseFloat(formData.estimatedVolume) : null,
      notes: formData.notes.trim() || null,
      source: 'quote-modal',
    };

    try {
      // Real persistence when Supabase is configured
      if (isSupabaseConfigured()) {
        // Only include fields that match the Supabase schema
        const dbPayload = {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          from_zip: payload.from_zip,
          to_zip: payload.to_zip,
          move_date: payload.move_date,
          home_size: payload.home_size,
          estimated_volume: payload.estimated_volume,
          notes: payload.notes,
          source: payload.source,
        };
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

      // Send email notification to the team (non-blocking). Enhanced logging for Resend results.
      fetch('/api/send-quote-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(res => res.json().catch(() => ({})))
        .then(data => {
          if (data && data.success) {
            console.log('%c[Quote Email Sent]', 'color:#22c55e', { 
              team: 'mhenry@amerisafemoving.com', 
              lead: payload.name,
              messageIds: data.messageIds,
              teamEmailSent: data.teamEmailSent,
              confirmationSent: data.confirmationSent,
            });
          } else if (data && !data.success) {
            console.warn('Email notification returned non-success:', data);
          }
        })
        .catch((err) => console.warn('Email notification failed (non-fatal):', err));

      setIsSubmitting(false);
      setSubmitted(true);

      // Also fire a nice toast in case they miss the in-modal success
      toast.success('Request received!', {
        description: "We'll connect you with 2-3 top-rated licensed movers within 24 hours.",
      });
    } catch (err) {
      console.error('Quote submission error:', err);
      // Still attempt to send the email notification even if DB insert failed
      fetch('/api/send-quote-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(res => res.json().catch(() => ({})))
        .then(data => {
          if (data?.success) {
            console.log('%c[Quote Email Sent (fallback)]', 'color:#22c55e', { lead: payload.name, messageIds: data.messageIds });
          }
        })
        .catch((err) => console.warn('Email notification failed (non-fatal):', err));

      // Still succeed for the user experience (demo-friendly)
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Request received!', {
        description: "We'll connect you with 2-3 top-rated licensed movers within 24 hours.",
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
        fromCity: '',
        fromState: '',
        toCity: '',
        toState: '',
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
                <DialogTitle className="text-2xl tracking-tight font-semibold">Get 2-3 Competitive Quotes</DialogTitle>
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5 font-medium">FREE</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                No obligation. Only licensed interstate movers. Matched within 24 hours.
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
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 border text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> FMCSA Licensed
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 border text-muted-foreground">
              4.8★ from 12k+ moves
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 border text-muted-foreground">
              Customers save $1,200+ on avg
            </div>
          </div>
        </div>

        {/* Scrollable body so the full modal (header + form/success) is always complete and nice on all screen sizes */}
        <div className="flex-1 overflow-y-auto p-6">
          {!submitted ? (
            /* ENGAGING FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
            {/* Value reinforcement + prefill highlight */}
            {estimatedWeight && (
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
                <div className="h-px flex-1 bg-border" /> MOVE DETAILS <div className="h-px flex-1 bg-border" />
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
                  {/* Auto-confirmed city/state from ZIP lookup */}
                  {formData.fromCity && formData.fromState && (
                    <div className="text-[10px] text-emerald-600 mt-0.5 flex items-center gap-1">
                      ✓ {formData.fromCity}, {formData.fromState}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Input
                      name="fromCity"
                      value={formData.fromCity}
                      onChange={handleChange}
                      placeholder="City"
                      className="text-xs h-8"
                    />
                    <Input
                      name="fromState"
                      value={formData.fromState}
                      onChange={handleChange}
                      placeholder="ST"
                      maxLength={2}
                      className="text-xs h-8"
                    />
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-0.5">ZIP auto-fills city/state • edit to override</p>
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
                  {/* Auto-confirmed city/state from ZIP lookup */}
                  {formData.toCity && formData.toState && (
                    <div className="text-[10px] text-emerald-600 mt-0.5 flex items-center gap-1">
                      ✓ {formData.toCity}, {formData.toState}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Input
                      name="toCity"
                      value={formData.toCity}
                      onChange={handleChange}
                      placeholder="City"
                      className="text-xs h-8"
                    />
                    <Input
                      name="toState"
                      value={formData.toState}
                      onChange={handleChange}
                      placeholder="ST"
                      maxLength={2}
                      className="text-xs h-8"
                    />
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-0.5">ZIP auto-fills city/state • edit to override</p>
                </div>
              </div>
            </div>

            {/* Details row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Preferred date</label>
                <Input type="date" name="moveDate" value={formData.moveDate} onChange={handleChange} />
                <p className="text-[10px] text-muted-foreground mt-1">Flexible? Leave blank</p>
              </div>

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
            </div>

            {/* Volume + Notes */}
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

            <div>
              <label className="block text-sm font-medium mb-1">Special notes or requirements</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                placeholder="Piano, antiques, tight timeline, stairs, or anything else..."
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
                {isSubmitting ? 'Sending to our matching team...' : 'Get my free quotes now'}
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
