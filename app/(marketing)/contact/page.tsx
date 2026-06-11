import { Card, CardContent } from '@/components/ui/card';

export const metadata = { title: 'Contact InterstateMovers USA' };

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-xl">
      <h1 className="text-4xl font-semibold tracking-tight mb-6">Contact</h1>

      <Card>
        <CardContent className="pt-6 space-y-4 text-sm">
          <p>This is an informational directory. For questions about specific moves, please contact the moving company directly.</p>
          <div>
            <strong>General inquiries &amp; data corrections</strong><br />
            <a href="mailto:hello@interstatemoversusa.com" className="text-primary">hello@interstatemoversusa.com</a>
          </div>
          <div>
            <strong>Press / Partnerships</strong><br />
            We do not accept paid placements or affiliate partnerships with movers.
          </div>
          <div className="pt-3 border-t text-xs text-muted-foreground">
            We typically respond within 5 business days. For urgent licensing concerns, please file directly with FMCSA.
          </div>
        </CardContent>
      </Card>

      <p className="text-xs mt-6 text-muted-foreground">Note: This is a demo site. In a real production deployment you would wire up a contact form (Formspree, Resend, etc).</p>
    </div>
  );
}
