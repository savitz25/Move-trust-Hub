/**
 * MTH-CARD-001: an ordinary click on an Ask card opens the published profile.
 *
 * The header anchor stays the one tab stop and the one navigation. A primary click on the
 * rest of the card is forwarded to that anchor. Controls, open disclosure content, text
 * selections, modified clicks, and rows without a published profile never activate.
 * A scroll gesture does not emit a click, so it does not navigate.
 */

export const CARD_SURFACE_ATTR = "data-card-surface";
export const CARD_SURFACE_PROFILE = "profile";
export const PROFILE_LINK_SELECTOR = 'a[data-search-action="profile"]';

const INTERACTIVE_SELECTOR =
  "a, button, input, select, textarea, label, summary, [role='button'], [contenteditable='true']";

export type CardSurfaceDecision =
  | "activate"
  | "prevented"
  | "secondary-button"
  | "modified"
  | "interactive"
  | "disclosure"
  | "selection"
  | "no-profile";

export type CardSurfaceClickFacts = {
  button: number;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  defaultPrevented: boolean;
  targetIsInteractive: boolean;
  targetInsideDisclosure: boolean;
  selectionText: string;
  hasProfileLink: boolean;
};

export function decideCardSurfaceActivation(facts: CardSurfaceClickFacts): CardSurfaceDecision {
  if (facts.defaultPrevented) return "prevented";
  if (facts.button !== 0) return "secondary-button";
  if (facts.ctrlKey || facts.metaKey || facts.shiftKey || facts.altKey) return "modified";
  if (facts.targetIsInteractive) return "interactive";
  if (facts.targetInsideDisclosure) return "disclosure";
  if (facts.selectionText.trim().length > 0) return "selection";
  if (!facts.hasProfileLink) return "no-profile";
  return "activate";
}

export function profileLinkFor(card: Element): HTMLAnchorElement | null {
  return card.querySelector<HTMLAnchorElement>(PROFILE_LINK_SELECTOR);
}

export function clickFactsFor(event: MouseEvent, card: Element): CardSurfaceClickFacts {
  const target = event.target instanceof Element ? event.target : null;
  const selection = typeof window !== "undefined" ? window.getSelection() : null;
  return {
    button: event.button,
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    shiftKey: event.shiftKey,
    altKey: event.altKey,
    defaultPrevented: event.defaultPrevented,
    targetIsInteractive: target ? target.closest(INTERACTIVE_SELECTOR) !== null : false,
    targetInsideDisclosure: target ? target.closest("details[open]") !== null : false,
    selectionText: selection ? selection.toString() : "",
    hasProfileLink: profileLinkFor(card) !== null,
  };
}

export function handleCardSurfaceClick(event: MouseEvent, card: Element): CardSurfaceDecision {
  const decision = decideCardSurfaceActivation(clickFactsFor(event, card));
  if (decision !== "activate") return decision;
  const link = profileLinkFor(card);
  if (!link) return "no-profile";
  event.preventDefault();
  link.click();
  return decision;
}
