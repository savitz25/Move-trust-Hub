import { getLicenseDepartment } from '@/lib/insurance/tools/license-verification';
import type { Provider } from '@/types/insurance/provider';

export function getProviderLicenseUrl(provider: Provider): string {
  const dept = getLicenseDepartment(provider.state);
  return dept?.lookupUrl ?? 'https://content.naic.org/consumer.htm';
}