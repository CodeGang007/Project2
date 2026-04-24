'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

const directionMap: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 }
};

/**
 * Scroll-triggered reveal wrapper — modern replacement for the
 * `revealOnScroll` + animate.css combination the original site used.
 * Respects `prefers-reduced-motion`.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  distance,
  className,
  once = true
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset = directionMap[direction];
  const d = distance ?? 40;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: (offset.x / 40) * d,
        y: (offset.y / 40) * d
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
