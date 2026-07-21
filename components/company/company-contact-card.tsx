import type { ReactNode } from 'react';
import { Building2, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Company } from '@/types';
import { cn } from '@/lib/utils';

type Props = {
  company: Pick<
    Company,
    'name' | 'physicalAddress' | 'headquarters' | 'phone' | 'email' | 'website'
  >;
  className?: string;
};

function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone.trim();
}

function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  return digits || phone.trim();
}

function websiteHref(website: string): string {
  const w = website.trim();
  if (!w) return w;
  return /^https?:\/\//i.test(w) ? w : `https://${w}`;
}

function websiteLabel(website: string): string {
  return website
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/$/, '');
}

/**
 * Primary contact block on company profiles — name, address, phone, email, website.
 * Omits empty fields; never shows broken empty rows.
 */
export function CompanyContactCard({ company, className }: Props) {
  const address =
    company.physicalAddress?.trim() || company.headquarters?.trim() || null;
  const phone = company.phone?.trim() || null;
  const email = company.email?.trim() || null;
  const website = company.website?.trim() || null;

  const rows: Array<{
    key: string;
    icon: ReactNode;
    label: string;
    value: string;
    href?: string;
  }> = [];

  rows.push({
    key: 'name',
    icon: <Building2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />,
    label: 'Company',
    value: company.name?.trim() || 'Unnamed company',
  });

  if (address) {
    rows.push({
      key: 'address',
      icon: <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />,
      label: 'Address',
      value: address,
    });
  }
  if (phone) {
    rows.push({
      key: 'phone',
      icon: <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />,
      label: 'Phone',
      value: formatPhoneDisplay(phone),
      href: `tel:${telHref(phone)}`,
    });
  }
  if (email) {
    rows.push({
      key: 'email',
      icon: <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
    });
  }
  if (website) {
    rows.push({
      key: 'website',
      icon: <Globe className="h-4 w-4 shrink-0 text-primary" aria-hidden />,
      label: 'Website',
      value: websiteLabel(website),
      href: websiteHref(website),
    });
  }

  return (
    <Card
      className={cn(
        'border-primary/20 bg-gradient-to-br from-primary/[0.04] to-background shadow-sm',
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Company contact</CardTitle>
        <p className="text-xs text-muted-foreground font-normal">
          Best available public contact details from FMCSA, Google Places, and the company website.
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {rows.map((row) => (
            <li key={row.key} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5">{row.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
                  {row.label}
                </div>
                {row.href ? (
                  <a
                    href={row.href}
                    className="font-semibold text-foreground hover:text-primary break-words"
                    {...(row.key === 'website'
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {row.value}
                  </a>
                ) : (
                  <div className="font-semibold text-foreground break-words">{row.value}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
        {!phone && !email && !website ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Limited contact details on file — verify on the company&apos;s official site before
            booking.
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
