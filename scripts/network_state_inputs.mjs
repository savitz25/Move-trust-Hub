export function stateInputs(pub, localStates) {
  return {
    njRosterCoverage: pub.njRosterCoverage,
    njOsmNovsAcquired: pub.njOsmAcquiredRows,

    njSourceAsOf: "2026-09-03",
    caCalTRosterCoverage: pub.caCalTRosterCoverage,
    caCitationRows19237: pub.caCitationRows19237,
    caUnlicensedCitationRows: pub.caUnlicensedCitationRows,
    caExactCalTCitationRows: pub.caExactCalTCitationRows,

    caSourceAsOf: "2026-09-03",
    caTariffEffective: "2026-01-01",
    txRosterCoverage: pub.txSnapshot.authority.roster_coverage,
    txSourceAsOf: pub.txSnapshot.as_of,
    txComplaintBulkCoverage: pub.txSnapshot.complaints.bulk_report,
    txCrosswalkCoverage: pub.txSnapshot.crosswalk.coverage,
    waActiveDirectoryResults: pub.waSnapshot.directory.active_result_count,
    waDirectoryRetrievedAt: pub.waSnapshot.directory.retrieved_at,
    waBulkRosterCoverage: pub.waSnapshot.bulk.utc_hhg_bulk_roster,
    waSourceAsOf: pub.waSnapshot.as_of,
    coActiveHhgPermitListings:
      pub.coSnapshot.active_universe.official_total_permits,
    coRevokedHhgListings:
      pub.coSnapshot.status_classes.classes.REVOKED.official_total,
    coSuspendedHhgListings:
      pub.coSnapshot.status_classes.classes.SUSPENDED.official_total,
    coSourceAsOf: pub.coSnapshot.source.source_publication_date,
    vaHhgListingRows: pub.vaSnapshot.hhg_roster.rows,
    vaPropertyListingRows: pub.vaSnapshot.property_roster.rows,
    vaSourceRetrievedAt: pub.vaSnapshot.clocks.authorized_carriers_retrievedAt,
    nyHhgBulletinObservations:
      pub.nySnapshot.bulletin_2026.hhgApplicationObservations,
    nyBulletinIssues: pub.nySnapshot.bulletin_2026.issues,
    orAuthorizedHhgListRows: pub.orSnapshot.current_hhg_roster.rows,
    orDistinctCertificateIds: pub.orSnapshot.current_hhg_roster.distinctAuthorityIds,
    paHhgOperatorListRows: pub.paSnapshot.current_hhg_roster.PA_PUC_HHG_CARRIER_ROWS,
    paHhgDistinctUtilityCodes: pub.paSnapshot.current_hhg_roster.PA_PUC_HHG_DISTINCT_UTILITY_CODES,
    ncHhgListRows: pub.ncSnapshot.current_hhg_roster.NC_NCUC_HHG_LIST_ROWS,
    ncHhgDistinctCNumbers: pub.ncSnapshot.current_hhg_roster.NC_NCUC_DISTINCT_C_NUMBERS,
    publishedStateIntelligencePaths: pub.publishedStateIntelligencePaths,
    floridaResearchCountyLandings: pub.floridaResearchCountyLandings.length,
    localMoverStateLandings: localStates.length,
  };
}
