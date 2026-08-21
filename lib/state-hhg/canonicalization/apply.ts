/**
 * Apply READY canonicalization: company + VERIFIED authority + home county.
 * publication_state=INGESTED, indexable=false. Google Places: 0.
 */
import type pg from 'pg';
import {
  matchStateRegistryIdentity,
  type CanonicalProviderIdentity,
} from '@/lib/state-hhg/identity';
import {
  allocateCompanySlug,
  buildDisplayName,
  buildStateOnlyCompanyId,
  TASK_TAG,
} from '@/lib/state-hhg/canonicalization/ids';
import type { ReadyCandidate } from '@/lib/state-hhg/canonicalization/cohort';
import type {
  CanonicalizationManifestRow,
  CanonicalizationOutcome,
} from '@/lib/state-hhg/canonicalization/types';
import { normalizePhone, normalizeUsdot } from '@/lib/state-hhg/normalize';

export async function loadCanonicalUniverse(
  client: pg.Client
): Promise<{
  providers: CanonicalProviderIdentity[];
  takenSlugs: Set<string>;
  takenIds: Set<string>;
  priorAuthority: Map<string, string>; // STATE|AUTH -> companyId
}> {
  const companies = await client.query(`
    SELECT id, name, fmcsa_legal_name, usdot_number, phone, physical_address,
           headquarters, publication_state, indexable
    FROM public.companies`);
  const providers: CanonicalProviderIdentity[] = companies.rows.map((r) => {
    const hq = r.headquarters ? String(r.headquarters) : null;
    let city: string | null = null;
    let state: string | null = null;
    if (hq) {
      const parts = hq.split(',').map((p: string) => p.trim());
      if (parts.length >= 2) {
        city = parts[0] || null;
        state = parts[parts.length - 1]?.slice(0, 2)?.toUpperCase() || null;
      }
    }
    return {
      companyId: String(r.id),
      legalName: r.fmcsa_legal_name ? String(r.fmcsa_legal_name) : String(r.name),
      dbaName: null,
      publicName: String(r.name),
      usdot: r.usdot_number ? String(r.usdot_number) : null,
      phone: r.phone ? String(r.phone) : null,
      address: r.physical_address ? String(r.physical_address) : null,
      city,
      state,
      publicationState: r.publication_state ? String(r.publication_state) : null,
      indexable: Boolean(r.indexable),
    };
  });

  const slugs = await client.query(`SELECT slug FROM public.companies`);
  const takenSlugs = new Set(
    slugs.rows.map((r: { slug: string }) => String(r.slug))
  );
  const takenIds = new Set(providers.map((p) => p.companyId));

  const prior = await client.query(`
    SELECT state_code, authority_number,
           COALESCE(company_id, matched_company_id) AS cid
      FROM public.provider_state_authority
     WHERE authority_number IS NOT NULL
       AND COALESCE(company_id, matched_company_id) IS NOT NULL`);
  const priorAuthority = new Map<string, string>();
  for (const r of prior.rows) {
    const key = `${String(r.state_code).toUpperCase()}|${String(r.authority_number).toUpperCase()}`;
    if (!priorAuthority.has(key)) priorAuthority.set(key, String(r.cid));
  }

  return { providers, takenSlugs, takenIds, priorAuthority };
}

function sparseDescription(
  displayName: string,
  stateCode: string,
  authorityNumber: string,
  regulator: string
): { short: string; description: string } {
  const short = `${stateCode} intrastate household-goods mover (state registry). Confirm current ${regulator} status before booking.`;
  const description = `${displayName} is staged from official ${regulator} evidence as an intrastate mover candidate. State authority: ${authorityNumber}. This internal profile is not published to the consumer directory.`;
  return { short, description };
}

export async function canonicalizeOne(
  client: pg.Client,
  candidate: ReadyCandidate,
  ctx: {
    providers: CanonicalProviderIdentity[];
    takenSlugs: Set<string>;
    takenIds: Set<string>;
    priorAuthority: Map<string, string>;
    dryRun: boolean;
  }
): Promise<CanonicalizationManifestRow> {
  const notes: string[] = [];
  const displayName = buildDisplayName(candidate.legalName, candidate.dba);
  const priorKey = `${candidate.stateCode}|${candidate.authorityNumber.toUpperCase()}`;
  const priorCompanyId = ctx.priorAuthority.get(priorKey) ?? null;

  // Already attached?
  if (priorCompanyId) {
    notes.push('prior_authority_already_attached');
    return {
      stagingId: candidate.stagingId,
      companyId: priorCompanyId,
      stateCode: candidate.stateCode,
      authorityNumber: candidate.authorityNumber,
      legalName: candidate.legalName,
      dba: candidate.dba,
      slug: null,
      usdot: candidate.usdot,
      phone: candidate.phone,
      email: candidate.email,
      physicalAddress: candidate.physicalAddress,
      city: candidate.city,
      postalCode: candidate.postalCode,
      homeCountyFips: candidate.countyFips,
      homeCountyName: candidate.countyName,
      identityMethod: 'exact_prior_state_authority',
      outcome: 'ALREADY_CANONICALIZED',
      publicationState: 'INGESTED',
      indexable: false,
      source: candidate.source,
      sourceUrl: candidate.sourceUrl,
      rawSourceKey: candidate.rawSourceKey,
      notes,
    };
  }

  const match = matchStateRegistryIdentity(
    {
      legalName: candidate.legalName,
      dba: candidate.dba,
      usdot: candidate.usdot,
      phone: candidate.phone,
      physicalAddress: candidate.physicalAddress,
      city: candidate.city,
      postalCode: candidate.postalCode,
      statusNormalized: candidate.statusNormalized as 'active',
      roleClass: candidate.roleClass as 'mover',
      authorityNumber: candidate.authorityNumber,
      priorAuthorityCompanyId: priorCompanyId,
    },
    ctx.providers
  );

  if (match.disposition === 'REVIEW_REQUIRED' || match.franchiseSafetyHold) {
    notes.push(match.reviewReason ?? 'review_required');
    if (!ctx.dryRun) {
      await client.query(
        `UPDATE public.provider_state_authority
            SET verification_state = 'REVIEW_REQUIRED',
                review_reason = $1,
                match_method = $2,
                match_confidence = $3,
                updated_at = now()
          WHERE state_code = $4 AND raw_source_key = $5`,
        [
          match.reviewReason,
          match.matchMethod === 'none' ? null : match.matchMethod,
          match.matchConfidence || null,
          candidate.stateCode,
          candidate.rawSourceKey,
        ]
      );
      await client.query(
        `UPDATE public.state_hhg_registry_staging
            SET disposition = 'REVIEW_REQUIRED',
                review_reason = $1,
                updated_at = now()
          WHERE id = $2`,
        [match.reviewReason, candidate.stagingId]
      );
    }
    return baseRow(candidate, {
      companyId: null,
      slug: null,
      identityMethod: match.matchMethod,
      outcome: 'MOVED_TO_REVIEW',
      notes,
    });
  }

  let companyId: string;
  let slug: string | null = null;
  let outcome: CanonicalizationOutcome;
  let identityMethod = match.matchMethod;

  if (match.disposition === 'MATCHED_EXISTING' && match.matchedCompanyId) {
    companyId = match.matchedCompanyId;
    outcome = 'MATCHED_DURING_CANONICALIZATION';
    notes.push(`matched_existing:${match.matchMethod}`);
  } else {
    // Create new
    companyId = buildStateOnlyCompanyId(
      candidate.stateCode,
      candidate.authorityNumber
    );
    if (ctx.takenIds.has(companyId)) {
      notes.push(`company_id_collision:${companyId}`);
      return baseRow(candidate, {
        companyId: null,
        slug: null,
        identityMethod: 'none',
        outcome: 'FAILED',
        notes,
      });
    }
    const allocated = allocateCompanySlug({
      displayName,
      stateCode: candidate.stateCode,
      authorityNumber: candidate.authorityNumber,
      takenSlugs: ctx.takenSlugs,
    });
    slug = allocated.slug;
    if (allocated.collision) notes.push('slug_disambiguated_with_authority');
    outcome = 'CREATED';
    identityMethod = 'new_state_authority_identity';

    if (!ctx.dryRun) {
      const { short, description } = sparseDescription(
        displayName,
        candidate.stateCode,
        candidate.authorityNumber,
        candidate.regulator
      );
      const hq = [candidate.city, candidate.stateCode].filter(Boolean).join(', ');
      const phoneDisplay = normalizePhone(candidate.phone);
      const usdot = normalizeUsdot(candidate.usdot);

      await client.query(
        `INSERT INTO public.companies (
           id, slug, name, short_description, description, headquarters,
           phone, email, physical_address, usdot_number, fmcsa_legal_name,
           fmcsa_safety_rating, fmcsa_complaints, fmcsa_shipments,
           authority_active, out_of_service, entity_type, service_scope,
           coverage, services, specialties, overall_rating, review_count,
           reputation_score, years_in_business, avg_price_per_move, price_range,
           is_verified, last_updated, publication_state, indexable, legacy_directory_row
         ) VALUES (
           $1,$2,$3,$4,$5,$6,
           $7,$8,$9,$10,$11,
           'Not Rated',0,0,
           true,false,'Moving Company','intrastate',
           $12,'[]'::jsonb,'[]'::jsonb,0,0,
           0,NULL,NULL,NULL,
           false,now(),'INGESTED',false,false
         )
         ON CONFLICT (id) DO NOTHING`,
        [
          companyId,
          slug,
          displayName,
          short,
          description,
          hq || null,
          phoneDisplay,
          candidate.email,
          [
            candidate.physicalAddress,
            candidate.city,
            candidate.stateCode,
            candidate.postalCode,
          ]
            .filter(Boolean)
            .join(', '),
          usdot,
          candidate.legalName,
          `${candidate.stateCode} intrastate`,
        ]
      );
      ctx.takenIds.add(companyId);
      ctx.takenSlugs.add(slug);
      ctx.providers.push({
        companyId,
        legalName: candidate.legalName,
        dbaName: candidate.dba,
        publicName: displayName,
        usdot,
        phone: phoneDisplay,
        address: candidate.physicalAddress,
        city: candidate.city,
        state: candidate.stateCode,
        publicationState: 'INGESTED',
        indexable: false,
      });
    }
  }

  if (!ctx.dryRun) {
    // Attach / promote state authority to VERIFIED
    await client.query(
      `UPDATE public.provider_state_authority
          SET company_id = $1,
              matched_company_id = $1,
              verification_state = 'VERIFIED',
              status = 'active',
              match_method = $2,
              match_confidence = $3,
              review_reason = NULL,
              last_verified_at = now(),
              updated_at = now()
        WHERE state_code = $4 AND raw_source_key = $5`,
      [
        companyId,
        identityMethod === 'none' ? 'new_state_authority_identity' : identityMethod,
        match.matchConfidence || 1,
        candidate.stateCode,
        candidate.rawSourceKey,
      ]
    );

    await client.query(
      `UPDATE public.state_hhg_registry_staging
          SET disposition = 'MATCHED_EXISTING',
              matched_company_id = $1,
              match_method = $2,
              match_confidence = $3,
              review_reason = NULL,
              updated_at = now()
        WHERE id = $4`,
      [
        companyId,
        identityMethod === 'none' ? 'new_state_authority_identity' : identityMethod,
        match.matchConfidence || 1,
        candidate.stagingId,
      ]
    );

    // Internal capabilities — company remains INGESTED (not consumer-visible)
    await client.query(
      `INSERT INTO public.provider_capability
         (company_id, capability, evidence_source, evidence_state, evidence_at)
       VALUES
         ($1,'hhg_intrastate',$2,'VERIFIED',now()),
         ($1,'hhg_local',$2,'VERIFIED',now())
       ON CONFLICT (company_id, capability) DO UPDATE
         SET evidence_state = 'VERIFIED',
             evidence_source = EXCLUDED.evidence_source,
             evidence_at = EXCLUDED.evidence_at`,
      [companyId, `${candidate.source}:${TASK_TAG}`]
    );

    // Home county evidence (consumer_eligible=false)
    if (candidate.countyFips) {
      await client.query(
        `INSERT INTO public.provider_local_discovery_evidence (
           company_id, state_code, county_fips, county_name, basis,
           evidence_source, source_url, observed_at, confidence,
           verification_state, consumer_eligible, address_provenance, notes, task_tag
         ) VALUES (
           $1,$2,$3,$4,'VERIFIED_HOME_COUNTY',
           $5,$6,now(),'HIGH',
           'VERIFIED',false,$7,$8::jsonb,$9
         )
         ON CONFLICT (company_id, county_fips, basis) DO UPDATE
           SET county_name = EXCLUDED.county_name,
               evidence_source = EXCLUDED.evidence_source,
               updated_at = now()`,
        [
          companyId,
          candidate.stateCode,
          candidate.countyFips,
          candidate.countyName,
          candidate.source,
          candidate.sourceUrl,
          [
            candidate.physicalAddress,
            candidate.city,
            candidate.stateCode,
            candidate.postalCode,
          ]
            .filter(Boolean)
            .join(', '),
          JSON.stringify([
            'Means: based/registered at operating address in this county',
            'Does NOT mean: guarantees pickup throughout the county',
            'consumer_eligible=false until publication gate',
          ]),
          TASK_TAG,
        ]
      );
    } else {
      notes.push('home_county_missing_at_apply');
    }

    ctx.priorAuthority.set(priorKey, companyId);
  }

  return baseRow(candidate, {
    companyId,
    slug,
    identityMethod,
    outcome,
    notes,
  });
}

function baseRow(
  candidate: ReadyCandidate,
  partial: {
    companyId: string | null;
    slug: string | null;
    identityMethod: string | null;
    outcome: CanonicalizationOutcome;
    notes: string[];
  }
): CanonicalizationManifestRow {
  return {
    stagingId: candidate.stagingId,
    companyId: partial.companyId,
    stateCode: candidate.stateCode,
    authorityNumber: candidate.authorityNumber,
    legalName: candidate.legalName,
    dba: candidate.dba,
    slug: partial.slug,
    usdot: candidate.usdot,
    phone: candidate.phone,
    email: candidate.email,
    physicalAddress: candidate.physicalAddress,
    city: candidate.city,
    postalCode: candidate.postalCode,
    homeCountyFips: candidate.countyFips,
    homeCountyName: candidate.countyName,
    identityMethod: partial.identityMethod,
    outcome: partial.outcome,
    publicationState: partial.companyId ? 'INGESTED' : null,
    indexable: false,
    source: candidate.source,
    sourceUrl: candidate.sourceUrl,
    rawSourceKey: candidate.rawSourceKey,
    notes: partial.notes,
  };
}
