'use client';

import { useEffect, useState, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import {
  useMegaMenuBodyLock,
  useMegaMenuPanelPosition,
  type MegaMenuAlign,
} from '@/components/nav/use-mega-menu-panel';
import { cn } from '@/lib/utils';

type MegaMenuPanelProps = {
  open: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  panelWidthPx: number;
  align?: MegaMenuAlign;
  panelId?: string;
  ariaLabel: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  children: ReactNode;
};

/**
 * Renders mega-menu content in a body portal with position:fixed.
 * Removes panels from nav document flow — zero layout / scrollbar shift.
 */
export function MegaMenuPanel({
  open,
  triggerRef,
  panelWidthPx,
  align = 'start',
  panelId,
  ariaLabel,
  onMouseEnter,
  onMouseLeave,
  className,
  children,
}: MegaMenuPanelProps) {
  const [mounted, setMounted] = useState(false);
  const position = useMegaMenuPanelPosition(triggerRef, open, panelWidthPx, align);

  useMegaMenuBodyLock(open);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open || !position) return null;

  return createPortal(
    <div
      id={panelId}
      role="navigation"
      aria-label={ariaLabel}
      className={cn('mega-menu-panel', className)}
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        maxWidth: `calc(100vw - ${32}px)`,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>,
    document.body
  );
}