import 'server-only';

import { getCompanyBySlug } from '@/data/seed-companies';
import {
  companyProfilePath,
  predictCompanyProfileSlug,
  resolveCompanyFromList,
} from '@/lib/directory/slug-resolution';
import type { Company } from '@/types';

export {
  companyProfilePath,
  predictCompanyProfileSlug,
  resolveCompanyFromList,
} from '@/lib/directory/slug-resolution';

export async function resolveCompanyBySlug(
  slugOrAlias: string,
  companies: Company[]
): Promise<Company | undefined> {
  const fromList = resolveCompanyFromList(companies, slugOrAlias);
  if (fromList) return fromList;
  return getCompanyBySlug(slugOrAlias);
}