/** Homepage section id used for scroll restore after profile back-nav. */
export const MY_MOVE_PLAN_SECTION_ID = 'my-move-plan';

/**
 * Homepage wizard deep-link (secondary CTA only).
 * Primary plan actions from /my-move should use planWorkspaceHref().
 */
export const MY_MOVE_PLAN_RETURN_PATH = '/#my-move-plan';

export type PlanWorkspaceStep = 'route' | 'shortlist' | 'inventory' | 'report';

/** Dedicated plan workspace on Move HQ (primary open/edit/send target). */
export function planWorkspaceHref(
  planId: string,
  opts?: { step?: PlanWorkspaceStep; send?: boolean }
): string {
  const id = encodeURIComponent(planId);
  const params = new URLSearchParams();
  if (opts?.step) params.set('step', opts.step);
  if (opts?.send) params.set('send', '1');
  const q = params.toString();
  return q ? `/my-move/plans/${id}?${q}` : `/my-move/plans/${id}`;
}

