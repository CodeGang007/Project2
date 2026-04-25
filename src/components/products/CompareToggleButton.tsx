'use client';

import { Scale, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { useCompare } from './CompareContext';

export default function CompareToggleButton({
  category,
  productId,
  locale: _locale,
  labels,
  className
}: {
  category: string;
  productId: string;
  locale: 'en' | 'zh';
  labels: { add: string; added: string; full: string };
  className?: string;
}) {
  const { toggle, has, isFull } = useCompare();
  const selected = has(productId);

  return (
    <button
      type="button"
      onClick={() => toggle({ category, productId })}
      disabled={!selected && isFull}
      aria-pressed={selected}
      title={!selected && isFull ? labels.full : undefined}
      className={clsx(
        'inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors',
        selected
          ? 'bg-accent text-ink-950 hover:bg-accent-light'
          : 'border border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white hover:text-ink-900',
        !selected && isFull && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {selected ? (
        <>
          <CheckCircle2 className="h-3.5 w-3.5" />
          {labels.added}
        </>
      ) : (
        <>
          <Scale className="h-3.5 w-3.5" />
          {labels.add}
        </>
      )}
    </button>
  );
}
