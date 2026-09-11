'use client';
import {createContext,useContext} from 'react';
import type {User} from '@supabase/supabase-js';
import type {SaveMyMoveContext} from '@/lib/save-my-move/types';

export type SaveMyMoveContextValue = {
  user: User | null;
  loading: boolean;
  savedMoverSlugs: ReadonlySet<string>;
  isMoverSaved: (companySlug: string) => boolean;
  markMoverSaved: (companySlug: string) => void;
  openSaveModal: (opts?: { redirectPath?: string; context?: SaveMyMoveContext }) => void;
  requireAuth: (opts?: { redirectPath?: string; context?: SaveMyMoveContext }) => boolean;
};

export const Ctx = createContext<SaveMyMoveContextValue | null>(null);

/**
 * Used while DeferredSaveMyMove has not mounted the real provider yet.
 * loading: true prevents save/auth clicks from firing against a half-ready client.
 */
export const DEFERRED_FALLBACK: SaveMyMoveContextValue = {
  user: null,
  loading: true,
  savedMoverSlugs: new Set(),
  isMoverSaved: () => false,
  markMoverSaved: () => {},
  openSaveModal: () => {},
  requireAuth: () => false,
};

/**
 * Always safe during DeferredSaveMyMove hydration — never throws.
 * Prefer this (or useSaveMyMoveOptional) over assuming the provider is mounted.
 */
export function useSaveMyMove() {
  return useContext(Ctx) ?? DEFERRED_FALLBACK;
}

/** Safe for navbar chrome while DeferredSaveMyMove hydrates — returns null outside provider. */
export function useSaveMyMoveOptional() {
  return useContext(Ctx);
}

