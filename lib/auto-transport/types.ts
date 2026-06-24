export type VehicleCategory = 'regular' | 'larger';
export type TransportMethod = 'open' | 'enclosed';

export type ZipDistanceResult = {
  fromZip: string;
  toZip: string;
  straightLineMiles: number;
  drivingMiles: number;
  fromCity?: string;
  fromState?: string;
  toCity?: string;
  toState?: string;
};

export type AutoTransportEstimate = {
  distanceMiles: number;
  vehicleCategory: VehicleCategory;
  transportMethod: TransportMethod;
  lowPerMile: number;
  highPerMile: number;
  lowTotal: number;
  highTotal: number;
};

export type AutoTransportQuotePrefill = {
  fromZip: string;
  toZip: string;
  vehicleCategory: VehicleCategory;
  transportMethod: TransportMethod;
  distanceMiles: number;
  lowTotal: number;
  highTotal: number;
  fromCity?: string;
  fromState?: string;
  toCity?: string;
  toState?: string;
};