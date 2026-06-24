import type {
  AutoTransportEstimate,
  TransportMethod,
  VehicleCategory,
} from '@/lib/auto-transport/types';

const RATE_TABLE: Record<
  VehicleCategory,
  Record<TransportMethod, { low: number; high: number }>
> = {
  regular: {
    open: { low: 0.5, high: 1.0 },
    enclosed: { low: 0.65, high: 1.15 },
  },
  larger: {
    open: { low: 0.75, high: 1.25 },
    enclosed: { low: 0.9, high: 1.4 },
  },
};

export const VEHICLE_CATEGORY_LABELS: Record<VehicleCategory, string> = {
  regular: 'Regular (Sedan, Hatchback, Convertible, Small Car)',
  larger: 'Larger (SUV, Pickup Truck, Van, etc.)',
};

export const TRANSPORT_METHOD_LABELS: Record<TransportMethod, string> = {
  open: 'Open Transport',
  enclosed: 'Enclosed Transport',
};

export function getRateRange(
  vehicleCategory: VehicleCategory,
  transportMethod: TransportMethod
): { low: number; high: number } {
  return RATE_TABLE[vehicleCategory][transportMethod];
}

export function calculateAutoTransportEstimate(
  distanceMiles: number,
  vehicleCategory: VehicleCategory,
  transportMethod: TransportMethod
): AutoTransportEstimate {
  const rates = getRateRange(vehicleCategory, transportMethod);

  return {
    distanceMiles,
    vehicleCategory,
    transportMethod,
    lowPerMile: rates.low,
    highPerMile: rates.high,
    lowTotal: Math.round(distanceMiles * rates.low),
    highTotal: Math.round(distanceMiles * rates.high),
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}