'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Loader2, Mail } from 'lucide-react';
import { submitContactForm } from '@/actions/contact';
import { CONTACT_SUBJECT_LABELS, type ContactFormInput } from '@/lib/contact/schema';
import { SITE_EMAIL } from '@/lib/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<ContactFormInput['subject']>('general');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await submitContactForm({
      name,
      email,
      subject,
      message,
      website: honeypot,
    });

    setLoading(false);
    if (!res.success) {
      setError(res.error ?? 'Something went wrong. Please try again.');
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="border-emerald-200 bg-emerald-50/60 dark:bg-emerald-950/20 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
        <h2 className="text-xl font-semibold">Message sent</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. We typically respond within 2–5 business days. A
          confirmation has been sent to your email.
        </p>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium">
            Your name <span className="text-destructive">*</span>
          </label>
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={80}
            disabled={loading}
            className="mt-1.5"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </label>
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={254}
            disabled={loading}
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="text-sm font-medium">
          Topic <span className="text-destructive">*</span>
        </label>
        <Select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value as ContactFormInput['subject'])}
          disabled={loading}
          className="mt-1.5"
          required
        >
          {Object.entries(CONTACT_SUBJECT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={20}
          maxLength={5000}
          rows={6}
          disabled={loading}
          placeholder="How can we help? For data corrections, include the company name and USDOT number if known."
          className="mt-1.5"
        />
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        By submitting, you agree to our{' '}
        <Link href="/privacy-policy" className="underline underline-offset-2">
          Privacy Policy
        </Link>
        . We use your information only to respond to this inquiry.
      </p>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
          {!error.includes(SITE_EMAIL) ? (
            <>
              {' '}
              You can also email{' '}
              <a href={`mailto:${SITE_EMAIL}`} className="underline">
                {SITE_EMAIL}
              </a>
              .
            </>
          ) : null}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="gap-2 min-h-[48px]" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" /> Send message
          </>
        )}
      </Button>
    </form>
  );
}