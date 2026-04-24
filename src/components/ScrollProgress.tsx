'use client';

import { useEffect, useState } from 'react';

/** Ultra-thin page scroll progress, mounted once by the header. */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-0 h-px bg-ink-100 overflow-hidden" aria-hidden>
      <div
        className="h-full bg-ink-900 origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${pct / 100})` }}
      />
    </div>
  );
}
