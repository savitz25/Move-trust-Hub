/**
 * PBC-PROD-003 pre-merge fixtures A–H (pure gate). No production DB mutation.
 * Case I (anon table deny) is covered by live script / validate-pbc-prod-003.
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import {
  PBC_REGULATOR,
  PBC_SOURCE_KEY,
  palmBeachPermitBlockHeading,
  selectPublishedPalmBeachPermits,
  statusPublicLabel,
  type PalmBeachCredentialRow,
} from '@/lib/county-regulatory/pbc/public-read-core';

const COMPANY = 'america-s-family-moving-and-storage-llc';

function row(
  overrides: Partial<PalmBeachCredentialRow> = {}
): PalmBeachCredentialRow {
  return {
    company_id: COMPANY,
    credential_number: 'MV1029',
    normalized_status: 'LICENSED',
    source_status: 'LICENSED',
    regulator: PBC_REGULATOR,
    source: PBC_SOURCE_KEY,
    retrieved_at: '2026-08-21T17:36:35.678Z',
    fdacs_im: 'IM2089',
    evidence_publication_state: 'PUBLISHED',
    ...overrides,
  };
}

describe('PBC-PROD-003 publication gate fixtures', () => {
  it('A: public company + PUBLISHED credential → renders Palm Beach DTO', () => {
    const out = selectPublishedPalmBeachPermits({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row()],
    });
    assert.equal(out.length, 1);
    assert.equal(out[0].credentialNumber, 'MV1029');
    assert.equal(out[0].statusPublicLabel, 'Active county moving-business permit');
    assert.equal(out[0].regulator, PBC_REGULATOR);
    assert.equal(out[0].sourceKey, PBC_SOURCE_KEY);
  });

  it('B: public company + INTERNAL_ONLY credential → renders nothing', () => {
    const out = selectPublishedPalmBeachPermits({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row({ evidence_publication_state: 'INTERNAL_ONLY' })],
    });
    assert.equal(out.length, 0);
  });

  it('C: INGESTED company + PUBLISHED credential → no anonymous evidence', () => {
    assert.equal(
      isAnonymousPublicProfileAllowed({ publicationState: 'INGESTED' }),
      false
    );
    const out = selectPublishedPalmBeachPermits({
      companyId: COMPANY,
      publicationState: 'INGESTED',
      rows: [row()],
    });
    assert.equal(out.length, 0);
  });

  it('D: wrong program credential → hidden', () => {
    const out = selectPublishedPalmBeachPermits({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row({ source: 'fdacs-state-hhg' })],
    });
    assert.equal(out.length, 0);
  });

  it('E: withheld credential → hidden', () => {
    const out = selectPublishedPalmBeachPermits({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row({ evidence_publication_state: 'WITHHELD' })],
    });
    assert.equal(out.length, 0);
  });

  it('F: multiple credentials → deterministic sort, not expanded beyond rows', () => {
    const out = selectPublishedPalmBeachPermits({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [
        row({ credential_number: 'MV1229' }),
        row({ credential_number: 'MV1062' }),
      ],
    });
    assert.equal(out.length, 2);
    assert.deepEqual(
      out.map((p) => p.credentialNumber),
      ['MV1062', 'MV1229']
    );
  });

  it('G: missing source → fail closed', () => {
    const out = selectPublishedPalmBeachPermits({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row({ source: null })],
    });
    assert.equal(out.length, 0);
  });

  it('H: DB/fetch failure → county evidence omitted', () => {
    const out = selectPublishedPalmBeachPermits({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row()],
      fetchError: true,
    });
    assert.equal(out.length, 0);
  });

  it('copy contract forbids endorsement language', () => {
    const forbidden = [
      'approved',
      'certified',
      'safe',
      'recommended',
      'fully compliant',
      'legitimate mover',
    ];
    const copy =
      'Permit information verified against Palm Beach County records. Regulatory record verification is not a MoveTrustHub endorsement.';
    for (const term of forbidden) {
      assert.equal(new RegExp(`\\b${term}\\b`, 'i').test(copy), false);
    }
  });

  it('status semantics: LICENSED → permit label, not endorsement', () => {
    assert.equal(
      statusPublicLabel('LICENSED'),
      'Active county moving-business permit'
    );
    assert.match(statusPublicLabel('SUSPEND'), /Permit status reported by Palm Beach County/);
  });

  it('plural heading for multi-MV DTO; singular for one', () => {
    const two = selectPublishedPalmBeachPermits({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [
        row({ credential_number: 'MV50' }),
        row({ credential_number: 'MV868' }),
      ],
    });
    assert.equal(two.length, 2);
    assert.equal(
      palmBeachPermitBlockHeading(two),
      'Palm Beach County Moving Permits'
    );
    assert.equal(
      palmBeachPermitBlockHeading(two.slice(0, 1)),
      'Palm Beach County Moving Permit'
    );
  });

  it('wrong-company rows rejected even if PUBLISHED', () => {
    const out = selectPublishedPalmBeachPermits({
      companyId: COMPANY,
      publicationState: 'PUBLISHABLE',
      rows: [row({ company_id: 'other-company', credential_number: 'MV50' })],
    });
    assert.equal(out.length, 0);
  });
});
