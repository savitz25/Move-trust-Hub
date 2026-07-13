'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Calculator, Copy, Download, Mail, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  buildFriendlyInventoryName,
  getInventoryRoomIcons,
  inventorySizePercent,
} from '@/lib/save-my-move/dashboard-utils';
import { isDemoInventoryId } from '@/lib/save-my-move/dashboard-demo';
import { cn } from '@/lib/utils';
import type { InventoryItem } from '@/store/calculator-store';

type InventoryCardProps = {
  id: string;
  name: string;
  movePreset: string | null;
  totalVolume: number;
  totalItems: number;
  items: InventoryItem[];
  emailing: boolean;
  onRename: (id: string, name: string, items: InventoryItem[]) => Promise<void>;
  onDuplicate: (id: string, name: string, items: InventoryItem[], movePreset: string | null) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onDownloadPdf: (items: InventoryItem[], totalVolume: number, totalItems: number, movePreset: string | null) => void;
  onEmail: (items: InventoryItem[], name: string, movePreset: string | null, id: string) => void;
};

export function InventoryCard({
  id,
  name,
  movePreset,
  totalVolume,
  totalItems,
  items,
  emailing,
  onRename,
  onDuplicate,
  onDelete,
  onDownloadPdf,
  onEmail,
}: InventoryCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const menuRef = useRef<HTMLDivElement>(null);
  const isDemo = isDemoInventoryId(id);

  const displayName = buildFriendlyInventoryName({
    name,
    movePreset,
    totalVolume,
    items,
  });
  const roomIcons = getInventoryRoomIcons(items);
  const sizePct = inventorySizePercent(totalVolume);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menuOpen]);

  const commitRename = async () => {
    const next = draftName.trim();
    if (!next || next === name) {
      setRenaming(false);
      setDraftName(name);
      return;
    }
    await onRename(id, next, items);
    setRenaming(false);
  };

  return (
    <article
      className={cn(
        'group rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/20',
        isDemo && 'opacity-90'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {renaming ? (
            <Input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onBlur={() => void commitRename()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') void commitRename();
                if (e.key === 'Escape') {
                  setRenaming(false);
                  setDraftName(name);
                }
              }}
              className="h-8 text-sm font-semibold"
              autoFocus
              aria-label="Rename inventory"
            />
          ) : (
            <button
              type="button"
              onClick={() => setRenaming(true)}
              className="text-left font-semibold text-base leading-snug hover:text-primary transition-colors flex items-start gap-1.5 group/title"
              disabled={isDemo}
            >
              <span className="line-clamp-2">{displayName}</span>
              {!isDemo && (
                <Pencil className="h-3 w-3 mt-1 opacity-0 group-hover/title:opacity-60 shrink-0" aria-hidden="true" />
              )}
            </button>
          )}
          <p className="text-xs text-muted-foreground mt-1 tabular-nums">
            {totalItems} items · {Math.round(totalVolume).toLocaleString()} cu ft
          </p>
        </div>

        <div className="relative shrink-0" ref={menuRef}>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            aria-label="More inventory actions"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            disabled={isDemo}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-20 mt-1 w-44 rounded-lg border bg-popover py-1 shadow-lg text-sm"
            >
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2 hover:bg-muted"
                onClick={() => {
                  onDownloadPdf(items, totalVolume, totalItems, movePreset);
                  setMenuOpen(false);
                }}
              >
                <Download className="h-3.5 w-3.5" /> Download PDF
              </button>
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2 hover:bg-muted disabled:opacity-50"
                disabled={emailing}
                onClick={() => {
                  onEmail(items, displayName, movePreset, id);
                  setMenuOpen(false);
                }}
              >
                <Mail className="h-3.5 w-3.5" />
                {emailing ? 'Sending…' : 'Email to me'}
              </button>
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2 hover:bg-muted"
                onClick={() => {
                  void onDuplicate(id, displayName, items, movePreset);
                  setMenuOpen(false);
                }}
              >
                <Copy className="h-3.5 w-3.5" /> Duplicate
              </button>
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2 text-destructive hover:bg-destructive/10"
                onClick={() => {
                  void onDelete(id);
                  setMenuOpen(false);
                }}
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2" aria-hidden="true">
        <span className="text-base leading-none">{roomIcons.join(' ')}</span>
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500 transition-all"
            style={{ width: `${sizePct}%` }}
          />
        </div>
      </div>

      <div className="mt-4">
        <Button size="sm" className="w-full sm:w-auto gap-1.5" asChild={!isDemo} disabled={isDemo}>
          {isDemo ? (
            <span>
              <Calculator className="h-3.5 w-3.5" /> Open in Calculator
            </span>
          ) : (
            <Link href={`/moving-calculator?load=${id}`}>
              <Calculator className="h-3.5 w-3.5" /> Open in Calculator
            </Link>
          )}
        </Button>
      </div>
    </article>
  );
}