export type UsdotStatusLabel = 'ACTIVE' | 'OUT OF SERVICE' | 'INACTIVE';

export type FmcsaEnrichedFields = {
  addressStreet?: string;
  addressCity?: string;
  addressState?: string;
  addressZip?: string;
  entityType?: string;
  usdotStatus?: UsdotStatusLabel;
  powerUnits?: number;
  carrierOperation?: string;
  cargoCarried?: string;
  mcs150Mileage?: string;
};