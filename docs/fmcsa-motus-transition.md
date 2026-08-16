# FMCSA Motus transition

FMCSA moved operating-authority filings to Motus in May 2026. The legacy Licensing & Insurance files stopped refreshing May 14, 2026 and do not contain new Motus filings. V2 therefore labels current Census identity as `MCMIS_CENSUS_CURRENT`, current authority/insurance as `MOTUS_CURRENT`, and any imported pre-transition L&I material as `LEGACY_LI_HISTORICAL`.

Current classification prefers valid newer Motus evidence. Legacy records remain immutable timeline evidence and can never overwrite newer current status. Conflicts are surfaced with reason codes instead of discarded.
