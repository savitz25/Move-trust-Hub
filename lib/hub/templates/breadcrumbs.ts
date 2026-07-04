import { hubPath } from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';
import type { TemplateBreadcrumb } from '@/lib/hub/templates/types';

export function hubHomeCrumb(hub: HubId): TemplateBreadcrumb {
  return { label: 'Home', href: hubPath(hub, '/') };
}

export function resourceArticleBreadcrumbs(
  hub: HubId,
  article: { title: string; slug: string; category: string }
): TemplateBreadcrumb[] {
  return [
    hubHomeCrumb(hub),
    { label: 'Resources', href: hubPath(hub, '/resources') },
    { label: article.category },
    { label: article.title },
  ];
}

export function stateGuideBreadcrumbs(
  hub: HubId,
  state: { name: string; slug: string }
): TemplateBreadcrumb[] {
  return [
    hubHomeCrumb(hub),
    { label: 'Destinations', href: hubPath(hub, '/destinations') },
    { label: `${state.name} insurance guide` },
  ];
}

export function hubSectionBreadcrumbs(
  hub: HubId,
  section: string,
  title?: string
): TemplateBreadcrumb[] {
  const crumbs: TemplateBreadcrumb[] = [hubHomeCrumb(hub), { label: section }];
  if (title) crumbs.push({ label: title });
  return crumbs;
}