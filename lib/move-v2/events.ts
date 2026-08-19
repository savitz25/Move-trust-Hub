export type MoveV2EventName =
  | 'provider_impression' | 'provider_profile_view' | 'provider_saved'
  | 'provider_compared' | 'website_click' | 'phone_click'
  | 'estimate_analyzer_started' | 'research_packet_view';

export interface MoveV2Event {
  name: MoveV2EventName;
  providerId?: string;
  vertical: 'move';
  state?: string;
  county?: string;
  moveType?: 'LOCAL' | 'INTRASTATE' | 'INTERSTATE' | 'UNKNOWN';
  timestamp: string;
}
