'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefilledData?: {
    estimatedVolume?: number;
    fromZip?: string;
    toZip?: string;
  };
}

export function QuoteModal({ open, onOpenChange, prefilledData = {} }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fromZip: prefilledData.fromZip || '',
    toZip: prefilledData.toZip || '',
    moveDate: '',
    bedrooms: '2',
    estimatedVolume: prefilledData.estimatedVolume ? String(Math.round(prefilledData.estimatedVolume)) : '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.fromZip || !formData.toZip) {
      toast.error('Please fill out the required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call / lead submission
    await new Promise(resolve => setTimeout(resolve, 800));

    // In a real marketing site, this would POST to your CRM, email service, or Supabase leads table
    console.log('Lead captured:', {
      ...formData,
      source: 'interstatemovers-usa',
      timestamp: new Date().toISOString(),
    });

    toast.success('Thank you! Your quote request has been submitted.', {
      description: "We'll match you with up to 5 top-rated interstate movers within 24 hours.",
    });

    setIsSubmitting(false);
    onOpenChange(false);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      fromZip: '',
      toZip: '',
      moveDate: '',
      bedrooms: '2',
      estimatedVolume: '',
      notes: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Get Free Quotes from Top Movers</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Tell us about your move and we&apos;ll connect you with 3-5 verified interstate movers for free quotes.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Full Name *</label>
              <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Jane Smith" />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address *</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@email.com" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Moving From (ZIP) *</label>
              <Input name="fromZip" value={formData.fromZip} onChange={handleChange} required placeholder="90210" maxLength={5} />
            </div>
            <div>
              <label className="text-sm font-medium">Moving To (ZIP) *</label>
              <Input name="toZip" value={formData.toZip} onChange={handleChange} required placeholder="10001" maxLength={5} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Preferred Move Date</label>
              <Input type="date" name="moveDate" value={formData.moveDate} onChange={handleChange} />
            </div>
            <div>
              <label className="text-sm font-medium">Home Size</label>
              <select 
                name="bedrooms" 
                value={formData.bedrooms} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="studio">Studio / Small</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4+">4+ Bedrooms</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Estimated Cubic Feet (optional)</label>
            <Input 
              name="estimatedVolume" 
              type="number" 
              value={formData.estimatedVolume} 
              onChange={handleChange} 
              placeholder="e.g. 2500" 
            />
            <p className="text-xs text-muted-foreground mt-1">Use our calculator for a more accurate estimate.</p>
          </div>

          <div>
            <label className="text-sm font-medium">Additional Details</label>
            <textarea 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange}
              placeholder="Any special items (piano, antiques), flexible dates, etc."
              className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Get My Free Quotes'}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">Maybe Later</Button>
            </DialogClose>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            100% free. No obligation. We only work with licensed interstate movers.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
