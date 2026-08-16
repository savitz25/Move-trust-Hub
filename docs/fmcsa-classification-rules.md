# FMCSA classification rules

Rule version: `MOVE_CLASSIFICATION_RULESET_2026_08_V1`.

- Active, HHG-relevant carrier without current interstate HHG authority → `LOCAL_INTRASTATE_CARRIER_CANDIDATE`, with state authority pending. “Not authorized” never means invalid.
- Active carrier with current HHG carrier authority and consistent current evidence → `INTERSTATE_CARRIER`.
- Current applicable broker authority plus consistent form 84/85 or Motus bond/trust evidence → `AUTHORIZED_BROKER`.
- Independently valid carrier and broker roles → `DUAL_ROLE_CARRIER_BROKER`.
- HHG freight-forwarder authority stays `HHG_FREIGHT_FORWARDER`; it never becomes broker by implication.
- Inactive Census/authority state → `INACTIVE_ENTITY`.
- Contradiction, current suspension/revocation, or active broker authority with materially missing financial evidence → `NEEDS_REGULATORY_REVIEW`.

Later active Motus evidence can restore current eligibility while earlier events remain in history. Current Motus outranks legacy L&I for current status. Paid/subscription state is absent from the classifier input and therefore cannot affect classification, ranking, evidence, or eligibility.
