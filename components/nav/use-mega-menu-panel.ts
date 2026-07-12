'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

export type MegaMenuAlign = 'start' | 'end' | 'center-viewport';

export type MegaMenuPanelPosition = {
  top: number;
  left: number;
  width: number;
};

const VIEWPORT_MARGIN = 16;
const PANEL_GAP = 8;

function clampPanelLeft(left: number, width: number): number {
  const vw = window.innerWidth;
  return Math.max(VIEWPORT_MARGIN, Math.min(left, vw - width - VIEWPORT_MARGIN));
}

export function computeMegaMenuPosition(
  triggerRect: DOMRect,
  panelWidthPx: number,
  align: MegaMenuAlign
): MegaMenuPanelPosition {
  const vw = window.innerWidth;
  const width = Math.min(panelWidthPx, vw - VIEWPORT_MARGIN * 2);

  let left: number;
  if (align === 'center-viewport') {
    left = (vw - width) / 2;
  } else if (align === 'end') {
    left = clampPanelLeft(triggerRect.right - width, width);
  } else {
    left = clampPanelLeft(triggerRect.left, width);
  }

  return {
    top: triggerRect.bottom + PANEL_GAP,
    left,
    width,
  };
}

/** Fixed viewport position for portaled mega-menu panels (no document flow impact). */
export function useMegaMenuPanelPosition(
  triggerRef: RefObject<HTMLElement | null>,
  open: boolean,
  panelWidthPx: number,
  align: MegaMenuAlign = 'start'
): MegaMenuPanelPosition | null {
  const [position, setPosition] = useState<MegaMenuPanelPosition | null>(null);

  const update = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    setPosition(computeMegaMenuPosition(trigger.getBoundingClientRect(), panelWidthPx, align));
  }, [triggerRef, panelWidthPx, align]);

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, update]);

  return position;
}

/** Delay close so cursor can travel from trigger to portaled panel without flicker. */
export function useMegaMenuHoverBridge(setOpen: (open: boolean) => void, delayMs = 120) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  }, [setOpen]);

  const scheduleClose = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(false), delayMs);
  }, [setOpen, delayMs]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { openMenu, scheduleClose };
}

/** Prevent horizontal scrollbar shift when wide panels open (vertical scroll unaffected). */
export function useMegaMenuBodyLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    const prev = html.style.overflowX;
    html.style.overflowX = 'clip';
    html.dataset.megaMenuOpen = 'true';
    return () => {
      html.style.overflowX = prev;
      delete html.dataset.megaMenuOpen;
    };
  }, [active]);
}