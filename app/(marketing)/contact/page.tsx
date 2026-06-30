import Link from 'next/link';
import { Mail, MapPin, ShieldCheck } from 'lucide-react';
import { ContactForm } from '@/components/contact/contact-form';
import { Card } from '@/components/ui/card';
import { SITE_EMAIL } from '@/lib/contact';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';

export const metadata = buildResourceMetadata(
  '/contact',
  'Contact Move Trust Hub — Support & Data Requests',
  'Reach Move Trust Hub for directory corrections, privacy requests, review questions, and general support. We respond within 2–5 business days.'
);

export default function ContactPage() {
  return (
    <div className="border-b bg-gradient-to-br from-primary/8 via-background to-background">
      <div className="container mx-auto px-4 py-10 sm:py-14 max-w-3xl">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
          We&apos;re here to help
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Contact Us</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
          Move Trust Hub is an independent moving research directory. Use the form below for
          directory corrections, privacy requests, review questions, or general support. For
          questions about a specific move or contract, contact your moving company directly.
        </p>

        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          <Card className="p-4">
            <Mail className="h-5 w-5 text-primary mb-2" aria-hidden="true" />
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="text-sm font-medium text-primary hover:underline mt-1 block"
            >
              {SITE_EMAIL}
            </a>
          </Card>
          <Card className="p-4">
            <ShieldCheck className="h-5 w-5 text-primary mb-2" aria-hidden="true" />
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Response time</p>
            <p className="text-sm font-medium mt-1">2–5 business days</p>
          </Card>
          <Card className="p-4">
            <MapPin className="h-5 w-5 text-primary mb-2" aria-hidden="true" />
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Service area</p>
            <p className="text-sm font-medium mt-1">United States (online)</p>
          </Card>
        </div>

        <Card className="mt-8 border-2 border-primary/15 shadow-lg p-6 sm:p-8">
          <h2 className="text-lg font-semibold mb-1">Send us a message</h2>
          <p className="text-sm text-muted-foreground mb-6">
            All fields marked with * are required.
          </p>
          <ContactForm />
        </Card>

        <div className="mt-8 text-sm text-muted-foreground space-y-2">
          <p>
            <strong className="text-foreground">Press &amp; partnerships:</strong> We do not
            accept paid placements, sponsored listings, or affiliate partnerships with movers.
          </p>
          <p>
            <strong className="text-foreground">Urgent licensing concerns:</strong> File
            directly with{' '}
            <a
              href="https://www.fmcsa.dot.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              FMCSA
            </a>{' '}
            or your state consumer protection office.
          </p>
          <p>
            See our{' '}
            <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms-of-service" className="text-primary underline underline-offset-2">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}