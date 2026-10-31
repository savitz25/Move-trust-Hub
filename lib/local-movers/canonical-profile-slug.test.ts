import assert from 'node:assert/strict';
import test from 'node:test';
import { resolvePublishedCompanySlugForMover } from './canonical-profile-slug';
import { buildCompanyProfileHref } from '@/lib/directory/profile-back-link';

const publicCompanies = [
  { slug: 'canonical-moving-company', usdotNumber: '1234567', publicationState: 'VERIFIED' as const },
];

test('does not invent a company profile slug when the company is missing', () => {
  assert.equal(resolvePublishedCompanySlugForMover({ profileSlug: undefined }, []), null);
  assert.equal(resolvePublishedCompanySlugForMover({ profileSlug: '' }, []), null);
});

test('replaces a stored duplicate-suffix slug with the canonical USDOT identity', () => {
  assert.equal(
    resolvePublishedCompanySlugForMover(
      { profileSlug: 'canonical-moving-company-2', usdotNumber: '1-234-567' },
      publicCompanies,
    ),
    'canonical-moving-company',
  );
});

test('resolves a redirect alias to its live canonical company before rendering the link', () => {
  const slug = resolvePublishedCompanySlugForMover(
    { profileSlug: 'old-company-name-2', usdotNumber: '1234567' },
    publicCompanies,
  );
  assert.equal(slug, 'canonical-moving-company');
  assert.equal(buildCompanyProfileHref(slug ?? ''), '/companies/canonical-moving-company');
});

test('preserves a legitimate company identity whose canonical slug ends in -2', () => {
  const slug = resolvePublishedCompanySlugForMover(
    { profileSlug: 'genuine-moving-company-2', usdotNumber: '7654321' },
    [{ slug: 'genuine-moving-company-2', usdotNumber: '7654321', publicationState: 'VERIFIED' }],
  );
  assert.equal(slug, 'genuine-moving-company-2');
  assert.equal(buildCompanyProfileHref(slug ?? ''), '/companies/genuine-moving-company-2');
});

test('omits unknown, malformed, ambiguous, and nonpublic profile identities', () => {
  assert.equal(
    resolvePublishedCompanySlugForMover({ profileSlug: '/companies/not-a-slug' }, publicCompanies),
    null,
  );
  assert.equal(
    resolvePublishedCompanySlugForMover({ profileSlug: 'company slug' }, publicCompanies),
    null,
  );
  assert.equal(
    resolvePublishedCompanySlugForMover(
      { profileSlug: 'internal-company', usdotNumber: '1111111' },
      [{ slug: 'internal-company', usdotNumber: '1111111', publicationState: 'INGESTED' }],
    ),
    null,
  );
  assert.equal(
    resolvePublishedCompanySlugForMover(
      { profileSlug: 'one-company', usdotNumber: '2222222' },
      [
        { slug: 'one-company', usdotNumber: '2222222', publicationState: 'VERIFIED' },
        { slug: 'two-company', usdotNumber: '2222222', publicationState: 'VERIFIED' },
      ],
    ),
    null,
  );
});
