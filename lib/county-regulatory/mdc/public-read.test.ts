/**
 * MDC-PROD-003 pre-merge fixtures. No production DB mutation.
 * Covers: INTERNAL_ONLY hidden, PUBLISHED+public shown, INGESTED hidden,
 * wrong program/company, DB failure, sanitized DTO, Miami semantics,
 * prohibited endorsement copy absent.
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import {
  MDC_CREDENTIAL_TYPE_PUBLIC,
  MDC_DISCLAIMER,
  MDC_REGULATOR,
  MDC_SOURCE_KEY,
  MDC_SOURCE_NAME,
  MDC_VERIFICATION_COPY,
  miamiDadeRegistrationBlockHeading,
  selectPublishedMiamiDadeRegistrations,
  statusPublicLabel,
  type MiamiDadeCredentialRow,
} from '@/lib/county-regulatory/mdc/public-read-core';

const COMPANY = 'fl-im-27';

function row(
  overrides: Partial<MiamiDadeCredentialRow> = {}
): MiamiDadeCredentialRow {
  return {
    company_id: COMPANY,
    credential_number: 'MR-00002',
    normalized_status: 'ISSUED',
    source_status: 'Issued',
    regulator: MDC_REGULATOR,
    source: MDC_SOURCE_KEY,
    retrieved_at: '2026-08-21T20:28:27.536Z',
    fdacs_im: 'IM27',
    evidence_publication_state: 'PUBLISHED',
    ...overrides,
  };
}

describe('MDC-PROD-003 publication gate fixtures', () => {
  it('PUBLIC + PUBLISHED → renders Miami-Dade sanitized DTO', () => {
    const out = selectPublishedMiamiDadeRegistrations({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row()],
    });
    assert.equal(out.length, 1);
    assert.equal(out[0].credentialNumber, 'MR-00002');
    assert.equal(
      out[0].statusPublicLabel,
      'Issued county moving-business registration'
    );
    assert.equal(out[0].regulator, MDC_REGULATOR);
    assert.equal(out[0].sourceKey, MDC_SOURCE_KEY);
    assert.equal(out[0].credentialType, MDC_CREDENTIAL_TYPE_PUBLIC);
    assert.equal(out[0].sourceName, MDC_SOURCE_NAME);
    assert.equal(out[0].disclaimer, MDC_DISCLAIMER);
    assert.equal(out[0].jurisdiction, 'Miami-Dade County, Florida');
    // Never expose internal fields
    assert.equal('manifestHash' in out[0], false);
    assert.equal('waveId' in out[0], false);
    assert.equal('matchScores' in out[0], false);
  });

  it('INTERNAL_ONLY → hidden', () => {
    const out = selectPublishedMiamiDadeRegistrations({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row({ evidence_publication_state: 'INTERNAL_ONLY' })],
    });
    assert.equal(out.length, 0);
  });

  it('INGESTED company + PUBLISHED → no anonymous evidence', () => {
    assert.equal(
      isAnonymousPublicProfileAllowed({ publicationState: 'INGESTED' }),
      false
    );
    const out = selectPublishedMiamiDadeRegistrations({
      companyId: COMPANY,
      publicationState: 'INGESTED',
      rows: [row()],
    });
    assert.equal(out.length, 0);
  });

  it('wrong program → hidden', () => {
    const out = selectPublishedMiamiDadeRegistrations({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row({ source: 'pbc-consumer-affairs-moving-business-permit' })],
    });
    assert.equal(out.length, 0);
  });

  it('WITHHELD → hidden', () => {
    const out = selectPublishedMiamiDadeRegistrations({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row({ evidence_publication_state: 'WITHHELD' })],
    });
    assert.equal(out.length, 0);
  });

  it('wrong company → hidden', () => {
    const out = selectPublishedMiamiDadeRegistrations({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row({ company_id: 'other-company', credential_number: 'MR-00015' })],
    });
    assert.equal(out.length, 0);
  });

  it('DB/fetch failure → county evidence omitted', () => {
    const out = selectPublishedMiamiDadeRegistrations({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row()],
      fetchError: true,
    });
    assert.equal(out.length, 0);
  });

  it('missing source → fail closed', () => {
    const out = selectPublishedMiamiDadeRegistrations({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row({ source: null })],
    });
    assert.equal(out.length, 0);
  });

  it('deterministic sort for multi-registration DTO', () => {
    const out = selectPublishedMiamiDadeRegistrations({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [
        row({ credential_number: 'MR-01221' }),
        row({ credential_number: 'MR-00002' }),
      ],
    });
    assert.equal(out.length, 2);
    assert.deepEqual(
      out.map((p) => p.credentialNumber),
      ['MR-00002', 'MR-01221']
    );
  });

  it('status semantics: ISSUED → registration label, not Licensed/Approved', () => {
    assert.equal(
      statusPublicLabel('ISSUED'),
      'Issued county moving-business registration'
    );
    assert.equal(
      statusPublicLabel('Issued'),
      'Issued county moving-business registration'
    );
    assert.match(
      statusPublicLabel('EXPIRED'),
      /Registration status reported by Miami-Dade County/
    );
    assert.doesNotMatch(statusPublicLabel('ISSUED'), /Licensed|Approved|Certified/i);
  });

  it('plural heading for multi; singular for one', () => {
    const two = selectPublishedMiamiDadeRegistrations({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [
        row({ credential_number: 'MR-00002' }),
        row({ credential_number: 'MR-00015' }),
      ],
    });
    assert.equal(
      miamiDadeRegistrationBlockHeading(two),
      'Miami-Dade Moving Business Registrations'
    );
    assert.equal(
      miamiDadeRegistrationBlockHeading(two.slice(0, 1)),
      'Miami-Dade Moving Business Registration'
    );
  });

  it('prohibited endorsement copy absent from verification + disclaimer', () => {
    const forbidden = [
      'approved',
      'certified',
      'safe',
      'recommended',
      'fully compliant',
      'legitimate mover',
      'government approved',
      'licensed by movetrusthub',
    ];
    const copy = `${MDC_VERIFICATION_COPY} ${MDC_DISCLAIMER} Source: ${MDC_SOURCE_NAME}.`;
    for (const term of forbidden) {
      assert.equal(new RegExp(`\\b${term}\\b`, 'i').test(copy), false, term);
    }
  });

  it('Palm Beach source never leaks through MDC selector', () => {
    const out = selectPublishedMiamiDadeRegistrations({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [
        row(),
        row({
          source: 'pbc-consumer-affairs-moving-business-permit',
          credential_number: 'MV1029',
        }),
      ],
    });
    assert.equal(out.length, 1);
    assert.equal(out[0].credentialNumber, 'MR-00002');
  });
});
