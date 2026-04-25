import clsx from 'clsx';

/**
 * Decorative molecular-art SVG with deterministic dots + bonds based on `seed`.
 * Not a real structure diagram — a scientific illustration that looks great
 * on product detail pages while we wait for real SMILES renderings.
 */
export default function MoleculeArt({
  seed = 0,
  className,
  accent = true
}: {
  seed?: number;
  className?: string;
  accent?: boolean;
}) {
  const s = Math.abs(seed) + 1;
  const rand = (i: number) => {
    const n = Math.sin(i * 977 + s * 31) * 10000;
    return n - Math.floor(n);
  };

  const nodes = Array.from({ length: 10 }, (_, i) => ({
    x: 10 + rand(i) * 80,
    y: 10 + rand(i + 100) * 80,
    r: 1.2 + rand(i + 200) * 2.5,
    main: rand(i + 300) > 0.55
  }));

  const bonds: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.hypot(dx, dy) < 32 && rand(i * j + 400) > 0.35) bonds.push([i, j]);
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={clsx('h-full w-full', className)}
      role="img"
      aria-label="Decorative molecular illustration"
    >
      <defs>
        <radialGradient id={`moleArtBg-${s}`} cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#moleArtBg-${s})`} />

      {/* Orbital ellipses */}
      <g
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.16"
        strokeWidth="0.3"
      >
        <ellipse cx="50" cy="50" rx="40" ry="18" transform="rotate(12 50 50)" />
        <ellipse cx="50" cy="50" rx="40" ry="18" transform="rotate(72 50 50)" />
        <ellipse cx="50" cy="50" rx="40" ry="18" transform="rotate(132 50 50)" />
      </g>

      {/* Bonds */}
      <g stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.4">
        {bonds.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>

      {/* Atoms */}
      <g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.main ? 'currentColor' : 'rgba(255,255,255,0.6)'}
            fillOpacity={n.main ? 0.95 : 0.7}
          />
        ))}
      </g>

      {accent && (
        <g>
          <circle
            cx={nodes[0].x}
            cy={nodes[0].y}
            r={nodes[0].r + 2}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="0.35"
          />
        </g>
      )}
    </svg>
  );
}
