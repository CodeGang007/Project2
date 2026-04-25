import clsx from 'clsx';

export default function MolecularFormula({
  formula,
  className
}: {
  formula: string;
  className?: string;
}) {
  const parts = formula.match(/([A-Za-z]+|\d+|\W+)/g) ?? [formula];
  return (
    <span className={clsx('font-mono tabular-nums', className)}>
      {parts.map((p, i) =>
        /^\d+$/.test(p) ? (
          <sub key={i} className="text-[0.7em] align-baseline">
            {p}
          </sub>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </span>
  );
}
