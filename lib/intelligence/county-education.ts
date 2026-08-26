import type { IntelligenceEducationModule } from './payload-types';

export const COUNTY_MOVE_EDUCATION: IntelligenceEducationModule[] = [
  {
    id: 'hq-vs-service-area',
    title: 'Headquarters is not service area',
    body: 'A Florida headquarters field is a stored business address. It does not prove the company operates, is licensed, or is permitted in this county. County seat is geography, not a headquarters-to-county map.',
  },
  {
    id: 'state-registration-vs-company',
    title: 'State registration is not a company',
    body: 'An FDACS IM or MB row is a registration. A directory profile is a company. They are linked only when verification_state is VERIFIED. Most Florida registrations are not public profiles.',
    href: '/florida',
  },
  {
    id: 'county-credential-vs-fdacs-fmcsa',
    title: 'County credential vs FDACS vs FMCSA',
    body: 'A county moving permit or registration is not an FDACS state registration, not FMCSA operating authority, and not a USDOT or MC number. Each identifier stays distinct unless a verified link exists.',
  },
  {
    id: 'complaint-vs-finding',
    title: 'A complaint is not a finding',
    body: 'A complaint is a raw observation, not a violation and not a final finding. An investigation is not enforcement. A notice is not a final order. This county page does not publish complaint or enforcement counts.',
  },
  {
    id: 'no-dataset-not-zero',
    title: 'No local dataset is not zero incidents',
    body: 'When a county has no contributing local dataset, that is a coverage gap — not proof of zero credentials, zero complaints, or zero inspections. Missing evidence is omitted, never shown as zero.',
  },
  {
    id: 'inspection-volume-not-quality',
    title: 'Inspection volume is not quality',
    body: 'Inspection, crash, and out-of-service censuses are not published as county metrics. Count of inspections is not a quality score.',
  },
  {
    id: 'internal-only-not-public',
    title: 'Internal research is not public',
    body: 'INTERNAL_ONLY county credential rows are research holds. They are not company claims and are not listed as published permits or registrations.',
  },
  {
    id: 'statewide-vs-enhanced',
    title: 'Statewide Research vs Enhanced Local Research',
    body: 'Coverage describes evidence depth, not mover quality. These county pages are Statewide Research. Enhanced Local Research requires a validated local operating-geography dataset plus reviewed identity and public-eligibility gates — not a county credential census alone. The relocation guide further down this page is logistics (zones, parking, HOA), not Enhanced coverage.',
    href: '/florida',
  },
  {
    id: 'interstate-vs-intrastate',
    title: 'Interstate vs intrastate',
    body: 'A move that crosses a state line is interstate (USDOT / MC). A move that stays inside Florida is intrastate and may require FDACS registration. A county permit does not replace either.',
    href: '/resources/fmcsa',
  },
];
