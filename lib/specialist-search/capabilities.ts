import type { SpecialistSearchCapability } from './contract';

export const MOVE_SEARCH_CAPABILITIES: SpecialistSearchCapability[] = [
  { key: 'fmcsa-identity', label: 'FMCSA identity and authority', supportState: 'KNOWN', coverage: 'Published federal directory profiles', sourceSystems: ['FMCSA'], limitations: ['Current authority is not a recommendation.'] },
  { key: 'fl-fdacs', label: 'Florida intrastate registration', supportState: 'KNOWN', coverage: 'Acquired FDACS IM records', sourceSystems: ['Florida FDACS'], limitations: ['State registration is separate from federal interstate authority.'] },
  { key: 'complaints', label: 'Complaint observations', supportState: 'PARTIAL', coverage: 'Attributable stored observations only', sourceSystems: ['FMCSA'], limitations: ['A complaint is not wrongdoing; missing observations are not zero.'] },
  { key: 'nj-roster', label: 'New Jersey PM/PW/PC roster', supportState: 'REQUEST_ONLY', coverage: 'Agency request/search process', sourceSystems: ['NJ public sources'], limitations: ['NOV observations are not a complete mover population.'] },
  { key: 'ca-roster', label: 'California CAL-T roster', supportState: 'NOT_ACQUIRED', coverage: 'No complete acquired bulk universe', sourceSystems: ['California public sources'], limitations: ['Citation rows are not mover population counts.'] },
  { key: 'service-territory', label: 'Service territory', supportState: 'UNSUPPORTED', coverage: 'Recorded headquarters only', sourceSystems: ['FMCSA'], limitations: ['Headquarters does not establish where a mover serves.'] },
];
