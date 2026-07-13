'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#0077D4', '#00A651', '#22c55e', '#38bdf8', '#f59e0b'];

type ConfettiBurstProps = {
  active: boolean;
  onDone?: () => void;
};

export function ConfettiBurst({ active, onDone }: ConfettiBurstProps) {
  const [pieces, setPieces] = useState<number[]>([]);

  useEffect(() => {
    if (!active) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      onDone?.();
      return;
    }

    setPieces(Array.from({ length: 18 }, (_, i) => i));
    const timer = window.setTimeout(() => {
      setPieces([]);
      onDone?.();
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [active, onDone]);

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {pieces.map((id) => (
            <motion.span
              key={id}
              initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              animate={{
                opacity: 0,
                y: -40 - Math.random() * 60,
                x: (Math.random() - 0.5) * 120,
                scale: 0.4,
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 h-2 w-2 rounded-sm"
              style={{ backgroundColor: COLORS[id % COLORS.length] }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}