/**
 * One-shot generator for Maryland Core 8 Tier-1 intelligence packs.
 * Run: npx tsx scripts/generate-md-tier1-packs.ts
 *
 * Core 8: montgomery, prince-georges, baltimore, anne-arundel, howard, frederick, harford, baltimore-city
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

type Zone = {
  id: string;
  name: string;
  shortName: string;
  neighborhoods: string[];
  housingTypes: string;
  challenges: string[];
  moverTips: string;
  cityKeywords: string[];
};

type PackSpec = {
  slug: string;
  fileSlug: string;
  exportName: string;
  displayName: string;
  hubTitle: string;
  eyebrow: string;
  h1: string;
  heroOpener: string;
  majorCorridors: string;
  whatTitle: string;
  whatIntro: string;
  bullets: { title: string; detail: string }[];
  zonesHeading: string;
  zonesIntro: string;
  zones: Zone[];
  costTitle: string;
  costIntro: string;
  drivers: { title: string; detail: string }[];
  ranges: { label: string; value: string; note: string }[];
  seasonalTitle: string;
  seasonalIntro: string;
  seasonal: { title: string; detail: string }[];
  specialized: { id: string; title: string; intro: string; bullets: string[] };
  relocationTitle: string;
  schools: { title: string; detail: string }[];
  hospitals: { title: string; detail: string }[];
  housing: { title: string; detail: string }[];
  townFit: { title: string; detail: string }[];
  jobs: { title: string; detail: string }[];
  lifestyle: { title: string; detail: string }[];
  resourcesTitle: string;
  resourceItems: { label: string; href: string }[];
  directoryHint: string;
};

const MD_REG = {
  title: 'Intrastate Maryland HHG registration vs interstate FMCSA',
  detail:
    'Moves entirely within Maryland by household goods carriers using commercial motor vehicles generally require active Maryland household goods mover registration with the Department of Labor, Division of Occupational and Professional Licensing. Match the legal name on the estimate to Maryland registration before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
};

const specs: PackSpec[] = [
  {
    slug: 'montgomery',
    fileSlug: 'montgomery',
    exportName: 'montgomeryCountyMdIntelligence',
    displayName: 'Montgomery County',
    hubTitle: 'Montgomery County Moving Intelligence Hub',
    eyebrow: 'Montgomery · Bethesda/Rockville/Silver Spring federal density & I-270/I-495',
    h1: 'Moving in Montgomery County: Bethesda–Rockville Access, Federal Density & I-270/I-495 Logistics',
    heroOpener:
      'Montgomery County is Maryland’s high-density DC-northwest collar: Bethesda and Chevy Chase elevators, Silver Spring multi-unit, Rockville/North Bethesda corporate stock, and I-495/I-270 portal time that is not Prince George’s east-of-DC product and not Fairfax Virginia logistics. A Bethesda high-rise, a Silver Spring condo, a Rockville HOA two-story, and a Germantown multi-family unit do not share truck access or empty-mile risk. This hub is for Montgomery — not a renamed Fairfax or PG page.',
    majorCorridors: 'I-495 · I-270 · MD-355 · MD-97 · River Road corridors',
    whatTitle: 'What makes moving in Montgomery County different',
    whatIntro:
      'These are Bethesda/Rockville/Silver Spring realities — federal/contractor calendars, high-rise COIs, and beltway timing — not PG National Harbor patterns or Baltimore metro defaults.',
    bullets: [
      { title: 'Federal and contractor relo calendars create hard report dates', detail: 'PCS and contractor start dates compress windows more than pure family suburb moves.' },
      { title: 'Bethesda / Chevy Chase / North Bethesda elevators rewrite labor hours', detail: 'Building packets and freight elevators dominate near-core jobs.' },
      { title: 'I-495 / I-270 define portal-to-portal time', detail: 'Cross-county pairs look local on maps and regional at peak.' },
      { title: 'HOA growth outer belt is not Bethesda high-rise product', detail: 'Germantown and Clarksburg access rules differ from downtown Bethesda staging.' },
      { title: 'Not Prince George’s and not Fairfax VA as the default product', detail: 'Survey each Montgomery address — northwest DC collar has its own inventory patterns.' },
      MD_REG,
    ],
    zonesHeading: 'Montgomery access zones',
    zonesIntro: 'Plan by Bethesda/Chevy Chase, Silver Spring, Rockville/North Bethesda, and outer I-270 growth.',
    zones: [
      { id: 'bethesda-chevy-chase', name: 'Bethesda, Chevy Chase & Friendship Heights edges', shortName: 'Bethesda / Chevy Chase', neighborhoods: ['Bethesda', 'Chevy Chase', 'Friendship Heights edges', 'Somerset edges'], housingTypes: 'High-rises, condos, luxury SFH, multi-unit', challenges: ['Elevators and COI', 'Scarce curb staging', 'I-495 peak congestion'], moverTips: 'Get building packets early. Prefer mid-week morning freight windows.', cityKeywords: ['bethesda', 'chevy chase'] },
      { id: 'silver-spring', name: 'Silver Spring & east-central multi-unit', shortName: 'Silver Spring', neighborhoods: ['Downtown Silver Spring', 'Takoma Park edges', 'Four Corners edges', 'White Oak edges'], housingTypes: 'Mid-rises, multi-family, older SFH', challenges: ['Elevator reservations', 'Lease-end waves', 'MD-97 / Colesville congestion'], moverTips: 'Book elevators early for month-end. Survey curb and truck length.', cityKeywords: ['silver spring', 'takoma park'] },
      { id: 'rockville-north', name: 'Rockville, North Bethesda & Pike corridors', shortName: 'Rockville / North Bethesda', neighborhoods: ['Rockville', 'North Bethesda', 'Potomac edges', 'MD-355 corridors'], housingTypes: 'HOA SFH, multi-family, corporate-adjacent housing', challenges: ['I-270 congestion', 'HOA rules', 'Corporate hard dates'], moverTips: 'Align crew days with report dates. Collect HOA packets.', cityKeywords: ['rockville', 'north bethesda', 'potomac'] },
      { id: 'i270-outer', name: 'Germantown, Gaithersburg & outer I-270 growth', shortName: 'Outer I-270', neighborhoods: ['Germantown', 'Gaithersburg', 'Clarksburg', 'Damascus edges'], housingTypes: 'HOA SFH, multi-family, townhomes', challenges: ['I-270 portal time', 'HOA gate lists', 'Longer empty miles to Bethesda core'], moverTips: 'Price outer-belt pairs portal-to-portal. Collect HOA rules early.', cityKeywords: ['germantown', 'gaithersburg', 'clarksburg'] },
    ],
    costTitle: 'What drives Montgomery County moving costs',
    costIntro: 'Elevator/COI friction, federal hard dates, and I-495/I-270 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'High-rise elevator & curb friction', detail: 'Bethesda/North Bethesda labor hours spike.' },
      { title: 'I-495 / I-270 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA soft costs on outer belt', detail: 'Gate lists push demand into peak windows.' },
      { title: 'Federal/contractor hard-date premiums', detail: 'Short windows raise weekend demand.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$550–$1,800+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,700–$4,800+', note: 'Core curb friction trends up' },
      { label: '3–4+ BR / tower / cross-metro', value: '$3,200–$10,000+', note: 'Towers and long beltway pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$125–$210+/hr', note: 'Portal-to-portal' },
    ],
    seasonalTitle: 'When to schedule a move in Montgomery County',
    seasonalIntro: 'Federal calendars, multi-family lease turns, summer peak, and winter ice reshape windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-495/I-270 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book HOA Saturdays early.' },
      { title: 'Federal fiscal and PCS peaks', detail: 'Summer and fiscal-year transitions cluster demand.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway and curb contingency.' },
    ],
    specialized: {
      id: 'montgomery-bethesda-federal-hoa',
      title: 'Bethesda/Rockville federal density & high-rise module',
      intro: 'Montgomery estimates fail when building packets, HOA rules, or I-270 empty miles are ignored.',
      bullets: [
        'Request Bethesda/Silver Spring building packets at lease signing or escrow.',
        'Price I-495/I-270 pairs portal-to-portal.',
        'Separate federal/contractor hard dates from standard suburban SFH scopes.',
        'Clarify Montgomery vs PG/Howard/Fairfax destinations on multi-county estimates.',
        'Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    relocationTitle: 'Considering a move to Montgomery County?',
    schools: [
      { title: 'How districts work here', detail: 'Montgomery County Public Schools serves most addresses; magnet and cluster boundaries matter. Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'MCPS tools and Maryland State Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'Suburban Hospital, Adventist HealthCare, Holy Cross, NIH-adjacent care, and DC systems (via commute) serve the county. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from Germantown into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'High-rise core vs outer-belt HOA stock', detail: 'Bethesda product differs sharply from Germantown/Clarksburg two-stories.' },
      { title: 'Cost variation', detail: 'Close-in renovated stock often prices differently from far-north multi-family.' },
    ],
    townFit: [
      { title: 'Bethesda / Chevy Chase lifestyle', detail: 'Walkable amenities with elevator and curb tradeoffs.' },
      { title: 'Silver Spring pattern', detail: 'Multi-unit density with MD-97 logistics.' },
      { title: 'Outer I-270 pattern', detail: 'HOA product with longer portal time to DC core jobs.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'Federal agencies, contractors, biotech/health, hospitality, and professional services shape employment.' },
      { title: 'Commute realism', detail: 'I-270, I-495, and Metro-adjacent peaks are real. Test drive peak routes before choosing a submarket.' },
    ],
    lifestyle: [
      { title: 'Northwest DC-collar identity', detail: 'Montgomery is Maryland’s high-density DC northwest — not PG east-of-DC or Baltimore metro defaults.' },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourcesTitle: 'Useful Montgomery County resources',
    resourceItems: [
      { label: 'Montgomery County — official site', href: 'https://www.montgomerycountymd.gov/' },
      { label: 'MDOT CHART traffic', href: 'https://chart.maryland.gov/' },
    ],
    directoryHint: 'Prefer high-rise/HOA experience and honest I-270/I-495 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.',
  },
  {
    slug: 'prince-georges',
    fileSlug: 'prince-georges',
    exportName: 'princeGeorgesCountyMdIntelligence',
    displayName: "Prince George's County",
    hubTitle: "Prince George's County Moving Intelligence Hub",
    eyebrow: "Prince George's · DC-east, National Harbor/Bowie/College Park & I-495/I-95",
    h1: "Moving in Prince George's County: DC-East Patterns, National Harbor & I-495/I-95 Logistics",
    heroOpener:
      "Prince George's County is Maryland’s DC-east metro: National Harbor multi-unit, College Park campus waves, Bowie and Upper Marlboro suburban stock, and I-495/I-95/US-50 portal time that is not Bethesda high-rise product and not Fairfax Virginia logistics. A National Harbor condo, a College Park multi-family turn, a Bowie HOA two-story, and a Largo multi-unit do not share truck access or empty-mile risk. This hub is for Prince George's — not a Montgomery clone.",
    majorCorridors: 'I-495 · I-95 · US-50 · MD-4 · MD-214',
    whatTitle: "What makes moving in Prince George's County different",
    whatIntro: 'These are DC-east / PG realities — National Harbor staging, campus calendars, and beltway timing — not Montgomery northwest federal campuses as the default.',
    bullets: [
      { title: 'National Harbor and inner-belt multi-unit rewrite staging plans', detail: 'Elevators, hotel-adjacent congestion, and curb limits dominate waterfront jobs.' },
      { title: 'College Park / UMD lease cycles cluster crews', detail: 'Academic peaks fill elevators and street parking first.' },
      { title: 'I-495 / I-95 / US-50 define portal-to-portal time', detail: 'East-of-DC pairs look local on maps and regional at peak.' },
      { title: 'Bowie / Upper Marlboro suburban product is not National Harbor product', detail: 'HOA packets and longer empty miles rewrite quotes.' },
      { title: 'Not Montgomery northwest and not DC city defaults alone', detail: 'Treat PG as its own east-metro inventory pattern.' },
      MD_REG,
    ],
    zonesHeading: "Prince George's access zones",
    zonesIntro: 'Plan by National Harbor/inner south, College Park, Bowie/central suburbs, and Upper Marlboro/south growth.',
    zones: [
      { id: 'national-harbor', name: 'National Harbor, Oxon Hill & inner south multi-unit', shortName: 'National Harbor', neighborhoods: ['National Harbor', 'Oxon Hill', 'Fort Washington edges'], housingTypes: 'High-rises, condos, multi-family', challenges: ['Elevators and COI', 'Tourism/event congestion', 'I-495 peak timing'], moverTips: 'Get building packets early. Avoid major event peaks when flexible.', cityKeywords: ['national harbor', 'oxon hill'] },
      { id: 'college-park', name: 'College Park, Hyattsville & UMD-adjacent stock', shortName: 'College Park', neighborhoods: ['College Park', 'Hyattsville', 'Riverdale Park edges', 'Greenbelt edges'], housingTypes: 'Student multi-family, older SFH, mid-rises', challenges: ['Lease-end waves', 'Scarce curb staging', 'US-1 / I-95 timing'], moverTips: 'Book academic peaks early. Confirm elevator reservations.', cityKeywords: ['college park', 'hyattsville', 'greenbelt'] },
      { id: 'bowie-central', name: 'Bowie, Largo & central suburban belt', shortName: 'Bowie / Largo', neighborhoods: ['Bowie', 'Largo', 'Mitchellville edges', 'Kettering edges'], housingTypes: 'HOA SFH, multi-family, townhomes', challenges: ['US-50 / MD-4 congestion', 'HOA rules', 'Longer portal time to DC core'], moverTips: 'Collect HOA packets. Price central pairs portal-to-portal.', cityKeywords: ['bowie', 'largo'] },
      { id: 'upper-marlboro-south', name: 'Upper Marlboro, Clinton & south growth', shortName: 'South PG', neighborhoods: ['Upper Marlboro', 'Clinton', 'Brandywine edges', 'Accokeek edges'], housingTypes: 'SFH, multi-family, growth suburbs', challenges: ['MD-4 / MD-5 timing', 'Longer empty miles', 'HOA pockets'], moverTips: 'Price south pairs honestly. Photo driveway and street width.', cityKeywords: ['upper marlboro', 'clinton', 'brandywine'] },
    ],
    costTitle: "What drives Prince George's County moving costs",
    costIntro: 'Multi-unit access, campus peaks, and I-495/I-95 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'National Harbor elevator & event friction', detail: 'Waterfront labor hours spike.' },
      { title: 'Campus multi-unit lease waves', detail: 'UMD peaks fill elevators first.' },
      { title: 'I-495 / I-95 / US-50 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA soft costs on suburban belts', detail: 'Gate lists push peak windows.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$500–$1,650+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,500–$4,300+', note: 'Multi-unit friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,800–$9,000+', note: 'Long beltway pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$115–$200+/hr', note: 'Portal-to-portal' },
    ],
    seasonalTitle: "When to schedule a move in Prince George's County",
    seasonalIntro: 'UMD calendars, federal adjacency peaks, summer family demand, and winter ice reshape windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-495 pain.' },
      { title: 'Academic peaks: August and May', detail: 'Book College Park multi-unit far ahead.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book Bowie Saturdays early.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'pg-dc-east-national-harbor-college-park',
      title: 'DC-east National Harbor & College Park module',
      intro: "Prince George's estimates fail when campus waves, National Harbor packets, or I-495 empty miles are treated like Montgomery northwest defaults.",
      bullets: [
        'Request National Harbor building packets early; survey College Park curb carefully.',
        'Price I-495/I-95/US-50 pairs portal-to-portal.',
        'Align multi-unit moves with UMD calendars when possible.',
        'Clarify PG vs Montgomery/Anne Arundel destinations on multi-county estimates.',
        'Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    relocationTitle: "Considering a move to Prince George's County?",
    schools: [
      { title: 'How districts work here', detail: "Prince George's County Public Schools serves most addresses. Confirm zoning carefully." },
      { title: 'Research sources', detail: 'PGCPS tools and Maryland State Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: "UM Capital Region, Luminis, MedStar affiliates, and DC systems (via commute) serve east-metro corridors. Confirm networks." },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from Bowie and Upper Marlboro into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Waterfront multi-unit vs suburban HOA stock', detail: 'National Harbor product differs from Bowie two-stories.' },
      { title: 'Cost variation', detail: 'Inner-belt renovated stock often prices differently from far-south multi-family.' },
    ],
    townFit: [
      { title: 'National Harbor lifestyle', detail: 'Waterfront multi-unit with elevator tradeoffs.' },
      { title: 'College Park pattern', detail: 'Campus multi-unit density and academic calendars.' },
      { title: 'Bowie suburban pattern', detail: 'HOA product with US-50 logistics.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'Federal agencies (including joint-base adjacency), education, healthcare, logistics, and professional services shape employment.' },
      { title: 'Commute realism', detail: 'I-495, I-95, and US-50 peaks are real. Test drive peak routes before choosing a submarket.' },
    ],
    lifestyle: [
      { title: 'DC-east identity', detail: "Prince George's is Maryland’s east-of-DC metro — not Montgomery northwest or Baltimore defaults." },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourcesTitle: "Useful Prince George's County resources",
    resourceItems: [
      { label: "Prince George's County — official site", href: 'https://www.princegeorgescountymd.gov/' },
      { label: 'MDOT CHART traffic', href: 'https://chart.maryland.gov/' },
    ],
    directoryHint: 'Prefer multi-unit/campus experience and honest I-495 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.',
  },
  {
    slug: 'baltimore',
    fileSlug: 'baltimore',
    exportName: 'baltimoreCountyMdIntelligence',
    displayName: 'Baltimore County',
    hubTitle: 'Baltimore County Moving Intelligence Hub',
    eyebrow: 'Baltimore County · Towson/Owings Mills/White Marsh metro ring & I-695',
    h1: 'Moving in Baltimore County: Towson–Owings Mills Ring, Metro Suburbs & I-695 Logistics',
    heroOpener:
      'Baltimore County is the metro ring around the city — not the city core: Towson multi-unit and campus edges, Owings Mills HOA growth, White Marsh corridors, and I-695/I-83/I-95 portal time that is not Baltimore City row-home logistics and not DC-suburb Montgomery product. A Towson condo, an Owings Mills two-story, and a Catonsville multi-family unit do not share truck access or empty-mile risk. This hub is for Baltimore County — not Baltimore City and not a renamed Howard page.',
    majorCorridors: 'I-695 · I-83 · I-95 · MD-45 · York Road corridors',
    whatTitle: 'What makes moving in Baltimore County different',
    whatIntro: 'These are metro-ring realities — suburban HOAs, Towson density, and Beltway timing — not city row-homes or Annapolis capital product.',
    bullets: [
      { title: 'Towson multi-unit and campus-adjacent stock rewrite access plans', detail: 'Elevators and curb limits dominate near core Towson jobs.' },
      { title: 'Owings Mills / White Marsh HOA product is not city row-home product', detail: 'Gate lists and longer empty miles rewrite quotes.' },
      { title: 'I-695 defines cross-county portal-to-portal time', detail: 'Ring pairs look local on maps and regional at peak.' },
      { title: 'Not Baltimore City narrow-street logistics as the default', detail: 'County suburban stock differs sharply from city micro-markets.' },
      { title: 'Not DC-collar Montgomery patterns either', detail: 'Baltimore metro ring has its own inventory and congestion profile.' },
      MD_REG,
    ],
    zonesHeading: 'Baltimore County access zones',
    zonesIntro: 'Plan by Towson core, Owings Mills west, White Marsh/east, and Catonsville/southwest edges.',
    zones: [
      { id: 'towson', name: 'Towson core & multi-unit belt', shortName: 'Towson', neighborhoods: ['Towson', 'Loch Raven edges', 'Rodgers Forge edges', 'York Road corridors'], housingTypes: 'Multi-family, mid-rises, older SFH', challenges: ['Elevator reservations', 'York Road congestion', 'Campus/office peaks'], moverTips: 'Book elevators early. Prefer mid-week mornings off York Road peak.', cityKeywords: ['towson'] },
      { id: 'owings-mills', name: 'Owings Mills, Reisterstown & northwest growth', shortName: 'Owings Mills', neighborhoods: ['Owings Mills', 'Reisterstown', 'Pikesville edges', 'I-795 corridors'], housingTypes: 'HOA SFH, multi-family, townhomes', challenges: ['I-695 / I-795 congestion', 'HOA rules', 'Longer portal time to Towson'], moverTips: 'Collect HOA packets. Price northwest pairs portal-to-portal.', cityKeywords: ['owings mills', 'reisterstown', 'pikesville'] },
      { id: 'white-marsh', name: 'White Marsh, Perry Hall & east corridors', shortName: 'White Marsh / east', neighborhoods: ['White Marsh', 'Perry Hall', 'Middle River edges', 'I-95 corridors'], housingTypes: 'HOA SFH, multi-family', challenges: ['I-95 congestion', 'HOA rules', 'Industrial adjacency pockets'], moverTips: 'Price east pairs honestly. Survey multi-unit access type.', cityKeywords: ['white marsh', 'perry hall'] },
      { id: 'catonsville-sw', name: 'Catonsville, Arbutus & southwest edges', shortName: 'Catonsville / SW', neighborhoods: ['Catonsville', 'Arbutus', 'Lansdowne edges', 'Security Blvd corridors'], housingTypes: 'Older SFH, multi-family, mixed stock', challenges: ['I-695 timing', 'Stairs and basements', 'Mixed curb limits'], moverTips: 'Survey older stock carefully. Clarify county vs city destinations.', cityKeywords: ['catonsville', 'arbutus'] },
    ],
    costTitle: 'What drives Baltimore County moving costs',
    costIntro: 'Multi-unit access and I-695 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Towson multi-unit friction', detail: 'Elevator labor hours spike.' },
      { title: 'I-695 / I-83 / I-95 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA soft costs on growth edges', detail: 'Gate lists push peak windows.' },
      { title: 'Older southwest stock long carries', detail: 'Stairs and basements raise labor hours.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$480–$1,550+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,450–$4,100+', note: 'Multi-unit friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,600–$8,000+', note: 'Long Beltway pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$190+/hr', note: 'Portal-to-portal' },
    ],
    seasonalTitle: 'When to schedule a move in Baltimore County',
    seasonalIntro: 'School calendars, multi-family turns, summer peak, and winter ice reshape metro-ring windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-695 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book HOA Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Towson elevators fill first.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'baltimore-county-towson-ring',
      title: 'Towson metro-ring & I-695 module',
      intro: 'Baltimore County estimates fail when multi-unit access or Beltway empty miles are treated like city row-home jobs.',
      bullets: [
        'Survey Towson elevators and curb carefully.',
        'Price I-695 pairs portal-to-portal.',
        'Do not quote county jobs as city row-home defaults.',
        'Clarify Baltimore County vs Baltimore City destinations on multi-county estimates.',
        'Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    relocationTitle: 'Considering a move to Baltimore County?',
    schools: [
      { title: 'How districts work here', detail: 'Baltimore County Public Schools serves county addresses (not Baltimore City schools). Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'BCPS tools and Maryland State Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'GBMC, University of Maryland St. Joseph, MedStar Franklin Square, and other systems serve the ring. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from Owings Mills and White Marsh into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Towson multi-unit vs HOA growth stock', detail: 'Core product differs from Owings Mills/White Marsh two-stories.' },
      { title: 'Cost variation', detail: 'Near-Towson renovated stock often prices differently from far-ring multi-family.' },
    ],
    townFit: [
      { title: 'Towson lifestyle', detail: 'Multi-unit density with York Road logistics.' },
      { title: 'Owings Mills northwest pattern', detail: 'HOA product with I-795 timing.' },
      { title: 'White Marsh east pattern', detail: 'Growth suburbs with I-95 logistics.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'Healthcare, education, retail/logistics, and Baltimore-city-commute professional jobs shape employment.' },
      { title: 'Commute realism', detail: 'I-695 peaks are real. Test drive peak routes around the ring.' },
    ],
    lifestyle: [
      { title: 'Metro-ring identity', detail: 'Baltimore County is suburban ring — not Baltimore City row-homes or DC-collar product as the default.' },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourcesTitle: 'Useful Baltimore County resources',
    resourceItems: [
      { label: 'Baltimore County — official site', href: 'https://www.baltimorecountymd.gov/' },
      { label: 'MDOT CHART traffic', href: 'https://chart.maryland.gov/' },
    ],
    directoryHint: 'Prefer metro-ring multi-unit experience and honest I-695 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.',
  },
  {
    slug: 'baltimore-city',
    fileSlug: 'baltimore-city',
    exportName: 'baltimoreCityMdIntelligence',
    displayName: 'Baltimore City',
    hubTitle: 'Baltimore City Moving Intelligence Hub',
    eyebrow: 'Baltimore City · row-homes, neighborhood micro-markets & I-95/I-83',
    h1: 'Moving in Baltimore City: Rowhomes, Neighborhood Micro-Markets & I-95/I-83 Logistics',
    heroOpener:
      'Baltimore City is independent-city logistics — not Baltimore County suburbs: rowhome carries and narrow streets, Harbor East elevators, neighborhood micro-markets from Fells Point to Hampden, and I-95/I-83 portal time that is not Towson HOA product and not DC-collar Montgomery. A Federal Hill stairs job, a Canton condo, a midtown multi-unit, and a northwest city two-story do not share truck access or empty-mile risk. This hub is for Baltimore City — not Baltimore County.',
    majorCorridors: 'I-95 · I-83 · I-895 · local arterial grid',
    whatTitle: 'What makes moving in Baltimore City different',
    whatIntro: 'These are city rowhome and neighborhood realities — narrow streets, stairs, elevators, and permits — not county Beltway HOA defaults.',
    bullets: [
      { title: 'Rowhomes and narrow streets rewrite labor hours', detail: 'Long carries, stairs, and limited truck length dominate many blocks.' },
      { title: 'Neighborhood micro-markets are not interchangeable', detail: 'Fells Point, Hampden, Charles Village, and Mondawmin each change curb and access rules.' },
      { title: 'Harbor / midtown elevators require building packets', detail: 'COI and freight windows dominate tower jobs.' },
      { title: 'I-95 / I-83 define portal-to-portal time to the county ring', detail: 'City-to-county pairs look short on maps and regional at peak.' },
      { title: 'Not Baltimore County suburban product as the default', detail: 'Photo each address — city stock differs from Towson HOAs.' },
      MD_REG,
    ],
    zonesHeading: 'Baltimore City access zones',
    zonesIntro: 'Plan by harbor/downtown elevators, southeast waterfront, central/north neighborhoods, and west/northwest city stock.',
    zones: [
      { id: 'harbor-downtown', name: 'Downtown, Harbor East & Inner Harbor multi-unit', shortName: 'Harbor / downtown', neighborhoods: ['Downtown', 'Harbor East', 'Inner Harbor edges', 'Mount Vernon edges'], housingTypes: 'High-rises, mid-rises, condos', challenges: ['Elevators and COI', 'Scarce curb staging', 'Event-day congestion'], moverTips: 'Get building packets early. Prefer mid-week morning freight windows.', cityKeywords: ['downtown baltimore', 'harbor east', 'inner harbor'] },
      { id: 'southeast', name: 'Fells Point, Canton, Federal Hill & southeast', shortName: 'Southeast', neighborhoods: ['Fells Point', 'Canton', 'Federal Hill', 'Locust Point edges'], housingTypes: 'Rowhomes, condos, renovated multi-unit', challenges: ['Narrow streets', 'Stairs and long carries', 'Limited truck length'], moverTips: 'Photo street width and stair access. Prefer smaller trucks when required.', cityKeywords: ['fells point', 'canton', 'federal hill'] },
      { id: 'north-central', name: 'Hampden, Charles Village, Roland Park edges', shortName: 'North-central', neighborhoods: ['Hampden', 'Charles Village', 'Remington edges', 'Roland Park edges'], housingTypes: 'Rowhomes, older SFH, multi-unit', challenges: ['Stairs and basements', 'Mixed curb rules', 'I-83 timing'], moverTips: 'Survey stair width carefully. Confirm parking rules block by block.', cityKeywords: ['hampden', 'charles village', 'roland park'] },
      { id: 'west-northwest', name: 'West and northwest city corridors', shortName: 'West / NW city', neighborhoods: ['Reservoir Hill edges', 'Mondawmin edges', 'Park Heights edges', 'Edmondson corridors'], housingTypes: 'Rowhomes, multi-unit, mixed stock', challenges: ['Older stock access', 'Arterial congestion', 'Longer carries'], moverTips: 'Photo access early. Clarify city vs county destinations on estimates.', cityKeywords: ['reservoir hill', 'mondawmin', 'park heights'] },
    ],
    costTitle: 'What drives Baltimore City moving costs',
    costIntro: 'Rowhome stairs, elevators, and narrow-street friction drive quotes more than square footage alone.',
    drivers: [
      { title: 'Rowhome stairs & long carries', detail: 'Labor hours dominate many city jobs.' },
      { title: 'Harbor elevator & curb friction', detail: 'COI wait time spikes tower jobs.' },
      { title: 'I-95 / I-83 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Permit and parking soft costs', detail: 'Limited legal staging rewrites crew plans.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$500–$1,700+', note: 'Higher with stairs or elevators' },
      { label: '2–3BR rowhome or condo', value: '$1,500–$4,500+', note: 'Narrow-street friction trends up' },
      { label: '3–4+ BR / tower / cross-metro', value: '$2,800–$9,000+', note: 'Towers and city-county pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$115–$200+/hr', note: 'Portal-to-portal' },
    ],
    seasonalTitle: 'When to schedule a move in Baltimore City',
    seasonalIntro: 'Lease turns, summer peak, event calendars, and winter ice reshape city windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-95/I-83 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book weekend crews early.' },
      { title: 'Month-end multi-family turns', detail: 'Harbor elevators fill first.' },
      { title: 'Winter ice and snow', detail: 'Confirm contingency for narrow streets and stairs.' },
    ],
    specialized: {
      id: 'baltimore-city-rowhome-micro-markets',
      title: 'Baltimore City rowhome & neighborhood micro-markets module',
      intro: 'City estimates fail when street width, stair access, or building packets are ignored.',
      bullets: [
        'Photo alley/street width and stair access for rowhome jobs.',
        'Request Harbor East/downtown building packets early.',
        'Price I-95/I-83 pairs portal-to-portal to the county ring.',
        'Never quote city jobs as Baltimore County HOA defaults.',
        'Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    relocationTitle: 'Considering a move to Baltimore City?',
    schools: [
      { title: 'How districts work here', detail: 'Baltimore City Public Schools serves city addresses (not Baltimore County schools). Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'City schools tools and Maryland State Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'Johns Hopkins, University of Maryland Medical Center, MedStar, and other systems serve city corridors. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times across neighborhoods into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Rowhomes vs harbor elevators vs northwest mixed stock', detail: 'Micro-markets differ sharply within short distances.' },
      { title: 'Cost variation', detail: 'Waterfront renovated stock often prices differently from west/northwest multi-unit.' },
    ],
    townFit: [
      { title: 'Harbor / downtown lifestyle', detail: 'Elevator amenities with curb tradeoffs.' },
      { title: 'Southeast rowhome pattern', detail: 'Walkable density with stair and street-width logistics.' },
      { title: 'North-central pattern', detail: 'Neighborhood character with mixed multi-unit and SFH.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'Healthcare, higher education, government, ports/logistics, and professional services shape employment.' },
      { title: 'Commute realism', detail: 'I-95 and I-83 peaks are real for county and DC-bound workers.' },
    ],
    lifestyle: [
      { title: 'Independent-city identity', detail: 'Baltimore City is its own market — not Baltimore County suburbs or DC-collar product as the default.' },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourcesTitle: 'Useful Baltimore City resources',
    resourceItems: [
      { label: 'City of Baltimore — official site', href: 'https://www.baltimorecity.gov/' },
      { label: 'MDOT CHART traffic', href: 'https://chart.maryland.gov/' },
    ],
    directoryHint: 'Prefer rowhome/elevator experience and honest I-95 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.',
  },
  {
    slug: 'anne-arundel',
    fileSlug: 'anne-arundel',
    exportName: 'anneArundelCountyMdIntelligence',
    displayName: 'Anne Arundel County',
    hubTitle: 'Anne Arundel County Moving Intelligence Hub',
    eyebrow: 'Anne Arundel · Annapolis capital, Naval Academy/DoD adjacency & US-50/I-97',
    h1: 'Moving in Anne Arundel County: Annapolis Capital Access, DoD Adjacency & US-50/I-97 Logistics',
    heroOpener:
      'Anne Arundel County mixes capital, military, and coastal-suburban product: Annapolis historic stock and elevators, Naval Academy / DoD adjacency calendars, Glen Burnie multi-unit, and US-50/I-97 portal time that is not Howard’s Columbia planned community and not Montgomery northwest density. An Annapolis condo, a Crofton HOA two-story, and a Glen Burnie multi-family unit do not share truck access or empty-mile risk. This hub is for Anne Arundel — not a generic DC-suburb clone.',
    majorCorridors: 'US-50 · I-97 · MD-2 · MD-100',
    whatTitle: 'What makes moving in Anne Arundel County different',
    whatIntro: 'These are Annapolis capital / DoD / coastal-suburban realities — not Columbia planned villages or Bethesda high-rises as the default.',
    bullets: [
      { title: 'Naval Academy and DoD adjacency create hard report dates', detail: 'PCS windows and base-adjacent timing reshape crew calendars.' },
      { title: 'Annapolis historic stock and elevators rewrite access plans', detail: 'Narrow streets and building packets dominate capital-core jobs.' },
      { title: 'US-50 / I-97 define portal-to-portal time', detail: 'Pairs toward DC or Baltimore look regional at peak.' },
      { title: 'Glen Burnie / Odenton multi-unit differs from Annapolis core', detail: 'Lease waves and HOA product are not historic-district logistics.' },
      { title: 'Not a generic Montgomery or Howard clone', detail: 'Capital + military + coastal-suburban mix is unique in Core 8.' },
      MD_REG,
    ],
    zonesHeading: 'Anne Arundel access zones',
    zonesIntro: 'Plan by Annapolis core, west county (Crofton/Odenton), Glen Burnie north, and southern peninsula edges.',
    zones: [
      { id: 'annapolis-core', name: 'Annapolis core & capital corridors', shortName: 'Annapolis', neighborhoods: ['Downtown Annapolis', 'Eastport edges', 'Parole edges', 'West Annapolis edges'], housingTypes: 'Historic SFH, condos, multi-unit, waterfront stock', challenges: ['Narrow streets', 'Elevators and COI', 'Tourism congestion'], moverTips: 'Photo street width. Get building packets early. Avoid major event peaks when flexible.', cityKeywords: ['annapolis', 'eastport'] },
      { id: 'crofton-odenton', name: 'Crofton, Odenton & west county growth', shortName: 'Crofton / Odenton', neighborhoods: ['Crofton', 'Odenton', 'Gambrills edges', 'Fort Meade adjacency'], housingTypes: 'HOA SFH, multi-family, townhomes', challenges: ['MD-3 / MD-32 congestion', 'HOA rules', 'DoD hard dates'], moverTips: 'Collect HOA packets. Align with PCS calendars when possible.', cityKeywords: ['crofton', 'odenton', 'gambrills'] },
      { id: 'glen-burnie', name: 'Glen Burnie, Pasadena & north corridors', shortName: 'Glen Burnie / north', neighborhoods: ['Glen Burnie', 'Pasadena', 'Brooklyn Park edges', 'MD-2 corridors'], housingTypes: 'Multi-family, SFH, mixed stock', challenges: ['I-97 / MD-100 timing', 'Lease-end waves', 'Mixed elevators and stairs'], moverTips: 'Book elevators early for month-end. Price north pairs portal-to-portal.', cityKeywords: ['glen burnie', 'pasadena'] },
      { id: 'south-peninsula', name: 'Edgewater, Severna Park & peninsula edges', shortName: 'Peninsula', neighborhoods: ['Severna Park', 'Edgewater', 'Arnold edges', 'Mayo edges'], housingTypes: 'SFH, multi-family, waterfront-adjacent stock', challenges: ['US-50 congestion', 'Longer empty miles', 'Driveway access'], moverTips: 'Price peninsula pairs honestly. Photo driveway grades.', cityKeywords: ['severna park', 'edgewater', 'arnold'] },
    ],
    costTitle: 'What drives Anne Arundel County moving costs',
    costIntro: 'Capital-core access, DoD hard dates, and US-50/I-97 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Annapolis curb & elevator friction', detail: 'Capital-core labor hours spike.' },
      { title: 'US-50 / I-97 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'DoD/PCS hard-date premiums', detail: 'Short windows raise weekend demand.' },
      { title: 'HOA soft costs on west county growth', detail: 'Gate lists push peak windows.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$500–$1,600+', note: 'Higher near Annapolis core' },
      { label: '2–3BR condo or modest SFH', value: '$1,500–$4,200+', note: 'Core friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,700–$8,500+', note: 'DC/Baltimore pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$115–$195+/hr', note: 'Portal-to-portal' },
    ],
    seasonalTitle: 'When to schedule a move in Anne Arundel County',
    seasonalIntro: 'PCS seasons, capital events, summer tourism, and winter ice reshape windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce US-50 pain.' },
      { title: 'PCS peak: late spring–summer', detail: 'Book west-county and base-adjacent jobs early.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book HOA Saturdays early.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'anne-arundel-annapolis-dod',
      title: 'Annapolis capital & DoD adjacency module',
      intro: 'Anne Arundel estimates fail when historic-street access, PCS hard dates, or US-50 empty miles are ignored.',
      bullets: [
        'Photo Annapolis street width and request building packets early.',
        'Align west-county jobs with PCS calendars when possible.',
        'Price US-50/I-97 pairs portal-to-portal toward DC or Baltimore.',
        'Do not treat Anne Arundel as a Howard or Montgomery clone.',
        'Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    relocationTitle: 'Considering a move to Anne Arundel County?',
    schools: [
      { title: 'How districts work here', detail: 'Anne Arundel County Public Schools serves most addresses. Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'AACPS tools and Maryland State Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'Luminis Health Anne Arundel Medical Center and other systems serve capital and corridor communities. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from Glen Burnie and Crofton into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Capital historic vs west-county HOA vs north multi-unit', detail: 'Submarkets differ sharply within short distances.' },
      { title: 'Cost variation', detail: 'Annapolis-adjacent stock often prices differently from Glen Burnie multi-family.' },
    ],
    townFit: [
      { title: 'Annapolis capital lifestyle', detail: 'Historic density with curb and elevator tradeoffs.' },
      { title: 'Crofton / Odenton pattern', detail: 'HOA product with DoD adjacency logistics.' },
      { title: 'Glen Burnie north pattern', detail: 'Multi-unit density with I-97 timing.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'State government, DoD/Fort Meade adjacency, healthcare, tourism, and professional services shape employment.' },
      { title: 'Commute realism', detail: 'US-50 and I-97 peaks are real for DC- and Baltimore-bound workers.' },
    ],
    lifestyle: [
      { title: 'Capital + coastal-suburban identity', detail: 'Anne Arundel is Annapolis metro — not Columbia planned community or Bethesda high-rise defaults.' },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourcesTitle: 'Useful Anne Arundel County resources',
    resourceItems: [
      { label: 'Anne Arundel County — official site', href: 'https://www.aacounty.org/' },
      { label: 'City of Annapolis', href: 'https://www.annapolis.gov/' },
      { label: 'MDOT CHART traffic', href: 'https://chart.maryland.gov/' },
    ],
    directoryHint: 'Prefer capital-core and DoD-window experience with honest US-50 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.',
  },
  {
    slug: 'howard',
    fileSlug: 'howard',
    exportName: 'howardCountyMdIntelligence',
    displayName: 'Howard County',
    hubTitle: 'Howard County Moving Intelligence Hub',
    eyebrow: 'Howard · Columbia planned community, RT 29/32 growth & school-driven moves',
    h1: 'Moving in Howard County: Columbia Planned Villages, Route 29/32 Growth & School-Driven Logistics',
    heroOpener:
      'Howard County is Columbia planned-community logistics — not Annapolis capital and not Bethesda elevators: village HOA rules, Columbia multi-unit belts, Ellicott City older stock, and US-29/MD-32/I-95 portal time that is not PG National Harbor product and not Baltimore City row-homes. A Columbia village two-story, a Town Center condo, and an Ellicott City multi-level do not share truck access or empty-mile risk. This hub is for Howard — not a generic DC-suburb clone.',
    majorCorridors: 'I-95 · US-29 · MD-32 · MD-100 · MD-175',
    whatTitle: 'What makes moving in Howard County different',
    whatIntro: 'These are Columbia planned-village realities — HOA packets, school calendars, and US-29 timing — not Annapolis historic streets or Montgomery high-rises as the default.',
    bullets: [
      { title: 'Columbia village HOA rules rewrite access plans', detail: 'Gate lists, parking rules, and village covenants dominate many jobs.' },
      { title: 'School-driven moves cluster peak demand', detail: 'Summer transfers and district preferences compress Saturday windows.' },
      { title: 'US-29 / MD-32 / I-95 define portal-to-portal time', detail: 'Pairs toward DC or Baltimore look regional at peak.' },
      { title: 'Ellicott City older stock differs from Columbia multi-unit', detail: 'Stairs, grades, and historic-adjacent access change truck sizing.' },
      { title: 'Not Anne Arundel capital product and not Montgomery northwest', detail: 'Treat Howard as planned-community mid-corridor logistics.' },
      MD_REG,
    ],
    zonesHeading: 'Howard access zones',
    zonesIntro: 'Plan by Columbia villages/Town Center, Ellicott City, north Laurel edges, and west county growth.',
    zones: [
      { id: 'columbia-core', name: 'Columbia villages & Town Center multi-unit', shortName: 'Columbia', neighborhoods: ['Columbia Town Center', 'Owen Brown', 'Wilde Lake', 'Long Reach', 'Hickory Ridge'], housingTypes: 'HOA SFH, multi-family, townhomes, mid-rises', challenges: ['HOA/village rules', 'Elevator reservations', 'US-29 congestion'], moverTips: 'Collect village HOA packets early. Book elevators for month-end.', cityKeywords: ['columbia'] },
      { id: 'ellicott-city', name: 'Ellicott City & historic-adjacent stock', shortName: 'Ellicott City', neighborhoods: ['Ellicott City', 'Ilchester edges', 'Catonsville edges'], housingTypes: 'Older SFH, multi-level, limited multi-family', challenges: ['Grades and stairs', 'Street width', 'US-40 / US-29 timing'], moverTips: 'Photo grades and curb. Prefer smaller trucks when required.', cityKeywords: ['ellicott city'] },
      { id: 'north-laurel', name: 'North Laurel, Savage & south-east edges', shortName: 'North Laurel / SE', neighborhoods: ['North Laurel', 'Savage', 'Jessup edges', 'MD-216 corridors'], housingTypes: 'Multi-family, SFH, mixed stock', challenges: ['I-95 congestion', 'Lease-end waves', 'Industrial adjacency'], moverTips: 'Price SE pairs portal-to-portal. Survey multi-unit access type.', cityKeywords: ['laurel', 'savage', 'jessup'] },
      { id: 'west-howard', name: 'Clarksville, Glenelg & west growth', shortName: 'West Howard', neighborhoods: ['Clarksville', 'Glenelg', 'West Friendship edges', 'MD-32 corridors'], housingTypes: 'HOA SFH, executive stock', challenges: ['Longer empty miles', 'HOA rules', 'MD-32 timing'], moverTips: 'Price west pairs honestly. Collect HOA packets.', cityKeywords: ['clarksville', 'glenelg'] },
    ],
    costTitle: 'What drives Howard County moving costs',
    costIntro: 'Village HOA friction and US-29/I-95 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Columbia HOA / village soft costs', detail: 'Gate lists push peak windows.' },
      { title: 'US-29 / MD-32 / I-95 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Ellicott City grades & stairs', detail: 'Labor hours spike on older stock.' },
      { title: 'School-season Saturday premiums', detail: 'Peak family demand compresses availability.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$520–$1,650+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,550–$4,400+', note: 'HOA friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,900–$9,000+', note: 'DC/Baltimore pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$120–$200+/hr', note: 'Portal-to-portal' },
    ],
    seasonalTitle: 'When to schedule a move in Howard County',
    seasonalIntro: 'School calendars dominate more than pure corporate peaks — plan summer carefully.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce US-29 pain.' },
      { title: 'Peak school-transfer season: late May–mid-August', detail: 'Book Columbia Saturdays far ahead.' },
      { title: 'Month-end multi-family turns', detail: 'Town Center elevators fill first.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'howard-columbia-planned-community',
      title: 'Columbia planned community & school-driven module',
      intro: 'Howard estimates fail when village HOA packets or US-29 empty miles are treated like Annapolis or Bethesda defaults.',
      bullets: [
        'Collect Columbia village HOA packets before final quotes.',
        'Price US-29/MD-32/I-95 pairs portal-to-portal.',
        'Survey Ellicott City grades separately from Columbia multi-unit.',
        'Clarify Howard vs Montgomery/Anne Arundel/Baltimore County destinations.',
        'Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    relocationTitle: 'Considering a move to Howard County?',
    schools: [
      { title: 'How districts work here', detail: 'Howard County Public School System is a primary relocator driver. Confirm polygon zoning carefully.' },
      { title: 'Research sources', detail: 'HCPSS tools and Maryland State Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'Johns Hopkins Howard County Medical Center and other systems serve mid-corridor communities. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from west Howard into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Columbia village HOA vs Ellicott City older stock', detail: 'Planned-community product differs from historic-adjacent multi-level homes.' },
      { title: 'Cost variation', detail: 'Village premium stock often prices differently from north Laurel multi-family.' },
    ],
    townFit: [
      { title: 'Columbia village lifestyle', detail: 'Planned amenities with HOA access tradeoffs.' },
      { title: 'Ellicott City pattern', detail: 'Older stock with grade and stair logistics.' },
      { title: 'West Howard pattern', detail: 'Executive HOA product with longer empty miles.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'Healthcare, education, federal adjacency (via Fort Meade corridors), and professional services shape employment.' },
      { title: 'Commute realism', detail: 'US-29 and I-95 peaks are real for DC- and Baltimore-bound workers.' },
    ],
    lifestyle: [
      { title: 'Planned-community identity', detail: 'Howard is Columbia mid-corridor — not Annapolis capital or Montgomery northwest high-rises as the default.' },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourcesTitle: 'Useful Howard County resources',
    resourceItems: [
      { label: 'Howard County — official site', href: 'https://www.howardcountymd.gov/' },
      { label: 'MDOT CHART traffic', href: 'https://chart.maryland.gov/' },
    ],
    directoryHint: 'Prefer Columbia HOA experience and honest US-29 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.',
  },
  {
    slug: 'frederick',
    fileSlug: 'frederick',
    exportName: 'frederickCountyMdIntelligence',
    displayName: 'Frederick County',
    hubTitle: 'Frederick County Moving Intelligence Hub',
    eyebrow: 'Frederick · I-270 growth corridor, DC-commute west & US-15/I-70',
    h1: 'Moving in Frederick County: I-270 Growth Corridor, DC-West Commute & US-15/I-70 Logistics',
    heroOpener:
      'Frederick County is western growth-corridor Maryland — not Montgomery core: downtown Frederick multi-unit, Urbana/I-270 HOA growth, US-15 north stock, and I-70/I-270 portal time that is not Bethesda elevators and not Baltimore metro ring product. A downtown Frederick condo, an Urbana two-story, and a Thurmont-edge home do not share truck access or empty-mile risk. This hub is for Frederick — not a Montgomery clone.',
    majorCorridors: 'I-70 · I-270 · US-15 · US-40',
    whatTitle: 'What makes moving in Frederick County different',
    whatIntro: 'These are western growth-corridor realities — longer DC-commute empty miles, historic downtown stock, and I-270 timing — not close-in Bethesda product.',
    bullets: [
      { title: 'I-270 DC-commute growth rewrites empty-mile math', detail: 'Pairs toward Montgomery look regional at peak — price portal-to-portal.' },
      { title: 'Downtown Frederick multi-unit differs from Urbana HOA product', detail: 'Historic streets and elevators are not gate-list suburbs.' },
      { title: 'I-70 / US-15 define cross-county portal time', detail: 'North-south and east-west pairs are longer than map glances suggest.' },
      { title: 'Not Montgomery core density as the default', detail: 'Frederick is west-corridor growth with its own inventory patterns.' },
      { title: 'School and family peaks still matter in growth villages', detail: 'Summer Saturdays fill HOA crews first.' },
      MD_REG,
    ],
    zonesHeading: 'Frederick access zones',
    zonesIntro: 'Plan by downtown Frederick, Urbana/I-270 south growth, north US-15 corridors, and east toward Mount Airy edges.',
    zones: [
      { id: 'frederick-core', name: 'Downtown Frederick & near-core multi-unit', shortName: 'Downtown Frederick', neighborhoods: ['Downtown Frederick', 'Baker Park edges', 'East Frederick edges'], housingTypes: 'Multi-unit, renovated SFH, mid-rises', challenges: ['Curb staging', 'Elevators and stairs', 'Event-day congestion'], moverTips: 'Prefer mid-week mornings. Confirm elevator reservations.', cityKeywords: ['frederick', 'downtown frederick'] },
      { id: 'urbana-i270', name: 'Urbana, I-270 south growth & HOA villages', shortName: 'Urbana / I-270', neighborhoods: ['Urbana', 'Ballenger Creek edges', 'Buckeystown edges', 'I-270 corridors'], housingTypes: 'HOA SFH, multi-family, townhomes', challenges: ['I-270 congestion', 'HOA rules', 'Longer portal time to Montgomery'], moverTips: 'Collect HOA packets. Price I-270 pairs portal-to-portal.', cityKeywords: ['urbana', 'ballenger creek'] },
      { id: 'us15-north', name: 'Thurmont, Emmitsburg approaches & north US-15', shortName: 'North US-15', neighborhoods: ['Thurmont', 'Emmitsburg edges', 'Walkersville edges'], housingTypes: 'SFH, rural stock, limited multi-family', challenges: ['Longer empty miles', 'US-15 timing', 'Winter access'], moverTips: 'Price north pairs honestly. Photo driveway and turn radius.', cityKeywords: ['thurmont', 'walkersville', 'emmitsburg'] },
      { id: 'east-frederick', name: 'New Market, Mount Airy edges & east corridors', shortName: 'East Frederick', neighborhoods: ['New Market', 'Mount Airy edges', 'I-70 east corridors'], housingTypes: 'HOA SFH, multi-family, small-town stock', challenges: ['I-70 congestion', 'Longer empty miles to core', 'HOA pockets'], moverTips: 'Clarify Frederick vs Carroll destinations. Collect HOA packets.', cityKeywords: ['new market', 'mount airy'] },
    ],
    costTitle: 'What drives Frederick County moving costs',
    costIntro: 'Growth-corridor empty miles and HOA friction drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'I-270 / I-70 long empty miles', detail: 'Portal-to-portal spikes on DC-commute pairs.' },
      { title: 'HOA soft costs on Urbana growth', detail: 'Gate lists push peak windows.' },
      { title: 'Downtown curb & multi-unit friction', detail: 'Core labor hours spike.' },
      { title: 'Winter ice on northern approaches', detail: 'Confirm driveway contingency.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,450+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,350–$3,900+', note: 'HOA friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,400–$7,800+', note: 'Montgomery/DC pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$105–$180+/hr', note: 'Portal-to-portal' },
    ],
    seasonalTitle: 'When to schedule a move in Frederick County',
    seasonalIntro: 'Growth-suburb family peaks, downtown events, and winter ice reshape windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-270 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book Urbana Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Downtown elevators fill first.' },
      { title: 'Winter ice and snow', detail: 'Confirm contingency especially north of Frederick.' },
    ],
    specialized: {
      id: 'frederick-i270-growth-corridor',
      title: 'Frederick I-270 growth corridor module',
      intro: 'Frederick estimates fail when I-270 empty miles or HOA packets are treated like close-in Montgomery jobs.',
      bullets: [
        'Price I-270/I-70 pairs portal-to-portal toward Montgomery and DC.',
        'Collect Urbana HOA packets early.',
        'Survey downtown Frederick curb separately from growth suburbs.',
        'Do not treat Frederick as a Montgomery core clone.',
        'Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    relocationTitle: 'Considering a move to Frederick County?',
    schools: [
      { title: 'How districts work here', detail: 'Frederick County Public Schools serves most addresses. Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'FCPS tools and Maryland State Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'Frederick Health Hospital and other systems serve west-corridor communities. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from Urbana and Thurmont into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Downtown multi-unit vs I-270 HOA growth', detail: 'Historic-adjacent product differs from Urbana two-stories.' },
      { title: 'Cost variation', detail: 'Close-in renovated stock often prices differently from northern rural SFH.' },
    ],
    townFit: [
      { title: 'Downtown Frederick lifestyle', detail: 'Walkable amenities with curb tradeoffs.' },
      { title: 'Urbana growth pattern', detail: 'HOA product with I-270 logistics.' },
      { title: 'North US-15 pattern', detail: 'Longer empty miles and rural access.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'Healthcare, government, biotech/federal adjacency, logistics, and DC-commute professional jobs shape employment.' },
      { title: 'Commute realism', detail: 'I-270 peaks toward Montgomery/DC are first-class planning factors.' },
    ],
    lifestyle: [
      { title: 'Western growth-corridor identity', detail: 'Frederick is west-of-Montgomery growth — not Bethesda density or Baltimore metro ring as the default.' },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourcesTitle: 'Useful Frederick County resources',
    resourceItems: [
      { label: 'Frederick County — official site', href: 'https://www.frederickcountymd.gov/' },
      { label: 'City of Frederick', href: 'https://www.cityoffrederickmd.gov/' },
      { label: 'MDOT CHART traffic', href: 'https://chart.maryland.gov/' },
    ],
    directoryHint: 'Prefer growth-corridor HOA experience and honest I-270 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.',
  },
  {
    slug: 'harford',
    fileSlug: 'harford',
    exportName: 'harfordCountyMdIntelligence',
    displayName: 'Harford County',
    hubTitle: 'Harford County Moving Intelligence Hub',
    eyebrow: 'Harford · Bel Air/Aberdeen northeast fringe & I-95 logistics',
    h1: 'Moving in Harford County: Bel Air–Aberdeen Fringe, Northeast Metro Access & I-95 Logistics',
    heroOpener:
      'Harford County is northeast metro fringe — not Baltimore City and not a Towson clone: Bel Air suburban product, Aberdeen Proving Ground adjacency, Edgewood multi-unit, and I-95/MD-24 portal time that is not DC-collar logistics and not city rowhome carries. A Bel Air HOA two-story, an Aberdeen multi-family unit, and a Fallston-edge home do not share truck access or empty-mile risk. This hub is for Harford — not a Baltimore County rename.',
    majorCorridors: 'I-95 · MD-24 · US-1 · MD-22',
    whatTitle: 'What makes moving in Harford County different',
    whatIntro: 'These are northeast-fringe realities — APG adjacency, I-95 timing, and suburban stock — not city micro-markets or DC-suburb density.',
    bullets: [
      { title: 'Aberdeen Proving Ground adjacency creates hard report dates', detail: 'Military and contractor calendars reshape windows.' },
      { title: 'Bel Air suburban HOA product is not city row-home product', detail: 'Gate lists and longer empty miles rewrite quotes.' },
      { title: 'I-95 / MD-24 define portal-to-portal time', detail: 'Pairs toward Baltimore look regional at peak.' },
      { title: 'Not a Baltimore County Towson clone', detail: 'Harford fringe logistics and APG patterns differ.' },
      { title: 'Edgewood multi-unit lease waves cluster demand', detail: 'Month-end turns fill elevators first.' },
      MD_REG,
    ],
    zonesHeading: 'Harford access zones',
    zonesIntro: 'Plan by Bel Air core, Aberdeen/APG corridors, Edgewood/south I-95, and north/rural edges.',
    zones: [
      { id: 'bel-air', name: 'Bel Air core & suburban belt', shortName: 'Bel Air', neighborhoods: ['Bel Air', 'Forest Hill edges', 'Fallston edges', 'MD-24 corridors'], housingTypes: 'HOA SFH, multi-family, townhomes', challenges: ['MD-24 congestion', 'HOA rules', 'Longer portal time to Baltimore'], moverTips: 'Collect HOA packets. Price MD-24 pairs portal-to-portal.', cityKeywords: ['bel air', 'forest hill', 'fallston'] },
      { id: 'aberdeen-apg', name: 'Aberdeen, APG adjacency & north-east corridors', shortName: 'Aberdeen / APG', neighborhoods: ['Aberdeen', 'Havre de Grace edges', 'APG-adjacent housing', 'MD-22 corridors'], housingTypes: 'Multi-family, SFH, military-adjacent stock', challenges: ['PCS hard dates', 'I-95 timing', 'Mixed access types'], moverTips: 'Align with report dates when possible. Survey multi-unit access carefully.', cityKeywords: ['aberdeen', 'havre de grace'] },
      { id: 'edgewood-south', name: 'Edgewood, Joppatowne & south I-95', shortName: 'Edgewood / south', neighborhoods: ['Edgewood', 'Joppatowne', 'Abingdon edges', 'I-95 corridors'], housingTypes: 'Multi-family, SFH, mixed stock', challenges: ['I-95 congestion', 'Lease-end waves', 'Industrial adjacency'], moverTips: 'Book elevators early for month-end. Price south pairs portal-to-portal.', cityKeywords: ['edgewood', 'joppatowne', 'abingdon'] },
      { id: 'north-rural', name: 'Jarrettsville, north rural & US-1 edges', shortName: 'North rural', neighborhoods: ['Jarrettsville', 'Whiteford edges', 'US-1 corridors', 'rural roads'], housingTypes: 'SFH, rural stock, limited multi-family', challenges: ['Longer empty miles', 'Rural access', 'Winter ice'], moverTips: 'Price rural pairs honestly. Photo driveway and turn radius.', cityKeywords: ['jarrettsville', 'whiteford'] },
    ],
    costTitle: 'What drives Harford County moving costs',
    costIntro: 'I-95 empty miles, HOA friction, and multi-unit access drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'I-95 / MD-24 empty miles', detail: 'Portal-to-portal spikes toward Baltimore.' },
      { title: 'HOA soft costs in Bel Air', detail: 'Gate lists push peak windows.' },
      { title: 'APG/PCS hard-date premiums', detail: 'Short windows raise weekend demand.' },
      { title: 'Multi-unit access friction', detail: 'Edgewood elevators rewrite labor hours.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$420–$1,400+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,300–$3,700+', note: 'HOA friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,300–$7,200+', note: 'Baltimore pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal' },
    ],
    seasonalTitle: 'When to schedule a move in Harford County',
    seasonalIntro: 'PCS seasons, family peaks, and winter ice reshape northeast-fringe windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-95 pain.' },
      { title: 'PCS peak: late spring–summer', detail: 'Book Aberdeen-adjacent jobs early.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book Bel Air Saturdays early.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'harford-bel-air-aberdeen-fringe',
      title: 'Bel Air / Aberdeen northeast fringe module',
      intro: 'Harford estimates fail when I-95 empty miles or APG calendars are treated like Baltimore City or Towson defaults.',
      bullets: [
        'Price I-95/MD-24 pairs portal-to-portal toward Baltimore.',
        'Align APG-adjacent jobs with report dates when possible.',
        'Collect Bel Air HOA packets early.',
        'Do not treat Harford as a Baltimore County Towson clone.',
        'Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    relocationTitle: 'Considering a move to Harford County?',
    schools: [
      { title: 'How districts work here', detail: 'Harford County Public Schools serves most addresses. Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'HCPS tools and Maryland State Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'University of Maryland Upper Chesapeake Health and other systems serve northeast corridors. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from Aberdeen and Bel Air into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Bel Air HOA vs Aberdeen multi-unit vs rural north', detail: 'Submarkets differ sharply within short distances.' },
      { title: 'Cost variation', detail: 'Suburban premium stock often prices differently from south I-95 multi-family.' },
    ],
    townFit: [
      { title: 'Bel Air suburban lifestyle', detail: 'HOA product with MD-24 logistics.' },
      { title: 'Aberdeen / APG pattern', detail: 'Military-adjacent multi-unit and SFH mix.' },
      { title: 'North rural pattern', detail: 'Longer empty miles and driveway access.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'APG/DoD adjacency, healthcare, logistics, and Baltimore-commute professional jobs shape employment.' },
      { title: 'Commute realism', detail: 'I-95 peaks toward Baltimore are first-class planning factors.' },
    ],
    lifestyle: [
      { title: 'Northeast fringe identity', detail: 'Harford is metro fringe — not Baltimore City row-homes or DC-collar density as the default.' },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourcesTitle: 'Useful Harford County resources',
    resourceItems: [
      { label: 'Harford County — official site', href: 'https://www.harfordcountymd.gov/' },
      { label: 'MDOT CHART traffic', href: 'https://chart.maryland.gov/' },
    ],
    directoryHint: 'Prefer fringe HOA and APG-window experience with honest I-95 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.',
  },
];

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function renderPack(spec: PackSpec): string {
  const zones = spec.zones
    .map(
      (z) => `    {
      id: "${z.id}",
      name: "${esc(z.name)}",
      shortName: "${esc(z.shortName)}",
      neighborhoods: ${JSON.stringify(z.neighborhoods)},
      housingTypes: "${esc(z.housingTypes)}",
      challenges: ${JSON.stringify(z.challenges)},
      moverTips: "${esc(z.moverTips)}",
      cityKeywords: ${JSON.stringify(z.cityKeywords)},
    }`
    )
    .join(',\n');

  const bullets = spec.bullets
    .map((b) => `      {\n        title: "${esc(b.title)}",\n        detail: "${esc(b.detail)}",\n      }`)
    .join(',\n');
  const drivers = spec.drivers
    .map((d) => `      { title: "${esc(d.title)}", detail: "${esc(d.detail)}" }`)
    .join(',\n');
  const ranges = spec.ranges
    .map((r) => `      { label: "${esc(r.label)}", value: "${esc(r.value)}", note: "${esc(r.note)}" }`)
    .join(',\n');
  const seasonal = spec.seasonal
    .map((s) => `      { title: "${esc(s.title)}", detail: "${esc(s.detail)}" }`)
    .join(',\n');
  const specBullets = spec.specialized.bullets.map((b) => `"${esc(b)}"`).join(',');
  const mk = (items: { title: string; detail: string }[]) =>
    items.map((b) => `          { title: "${esc(b.title)}", detail: "${esc(b.detail)}" }`).join(',\n');
  const resources = spec.resourceItems
    .map((r) => `      { label: "${esc(r.label)}", href: "${esc(r.href)}", external: true }`)
    .join(',\n');

  return `import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMdPack } from '@/lib/local-movers/county-intelligence/maryland/md-shared';

export const ${spec.exportName}: CountyIntelligencePack = finalizeMdPack({
  countySlug: "${spec.slug}",
  hubTitle: "${esc(spec.hubTitle)}",
  eyebrow: "${esc(spec.eyebrow)}",
  h1: "${esc(spec.h1)}",
  heroOpener: "${esc(spec.heroOpener)}",
  heroCredibility:
    'Maryland household goods mover registration (Dept. of Labor) for intrastate MD moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "${esc(spec.majorCorridors)}",
  whatMakesDifferent: {
    title: "${esc(spec.whatTitle)}",
    intro: "${esc(spec.whatIntro)}",
    bullets: [
${bullets},
    ],
  },
  zonesHeading: "${esc(spec.zonesHeading)}",
  zonesIntro: "${esc(spec.zonesIntro)}",
  zones: [
${zones}
  ],
  costDrivers: {
    title: "${esc(spec.costTitle)}",
    intro: "${esc(spec.costIntro)}",
    drivers: [
${drivers}
    ],
    ranges: [
${ranges}
    ],
  },
  seasonal: {
    title: "${esc(spec.seasonalTitle)}",
    intro: "${esc(spec.seasonalIntro)}",
    items: [
${seasonal}
    ],
  },
  specialized: [
    {
      id: "${esc(spec.specialized.id)}",
      title: "${esc(spec.specialized.title)}",
      intro: "${esc(spec.specialized.intro)}",
      bullets: [${specBullets}],
    },
  ],
  relocation: {
    title: "${esc(spec.relocationTitle)}",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
${mk(spec.schools)}
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
${mk(spec.hospitals)}
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
${mk(spec.housing)}
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
${mk(spec.townFit)}
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
${mk(spec.jobs)}
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
${mk(spec.lifestyle)}
      ]},
    ],
  },
  resources: {
    title: "${esc(spec.resourcesTitle)}",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Maryland household goods mover registration for in-state moves and FMCSA for interstate legs.',
    items: [
${resources}
    ],
  },
  directoryHint: "${esc(spec.directoryHint)}",
  lastReviewed: '2026-07-24',
});
`;
}

const outDir = join(process.cwd(), 'lib/local-movers/county-intelligence/maryland');
mkdirSync(outDir, { recursive: true });
for (const spec of specs) {
  const path = join(outDir, `${spec.fileSlug}-md.ts`);
  writeFileSync(path, renderPack(spec), 'utf8');
  console.log('wrote', path);
}
console.log(`Generated ${specs.length} Maryland Tier-1 packs.`);
