export function hhgCertificateIsPropertyPermit(): boolean {
  return false;
}
export function stateAuthorityIsUsdot(): boolean {
  return false;
}
export function usdotImpliesActiveInterstateAuthority(): boolean {
  return false;
}
export function mcPresenceImpliesActiveAuthority(): boolean {
  return false;
}
export function applicantIsAuthorizedCarrier(): boolean {
  return false;
}
export function propertyCarrierIsHouseholdGoodsCarrier(): boolean {
  return false;
}
export function propertyCarriersAreMovers(): boolean {
  return false;
}
export function virginiaStateAuthorityCoversInterstateMove(): boolean {
  return false;
}
export function nameOnlyStateToFmcsaIsExact(): boolean {
  return false;
}

export function virginiaMoveIdentity(kind: 'HHG' | 'PROP', number: string): string | null {
  const n = String(number || '').replace(/\D/g, '');
  if (!n) return null;
  return kind === 'HHG' ? `VA-DMV-HHG:${n}` : `VA-DMV-PROP:${n}`;
}
