import clsx from 'clsx';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  align = 'left',
  light = false,
  className
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        'space-y-3',
        align === 'center' && 'text-center',
        className
      )}
    >
      <Reveal>
        <p
          className={clsx(
            'text-xs md:text-sm font-semibold tracking-[0.3em] uppercase',
            light ? 'text-brand-200' : 'text-brand-500'
          )}
        >
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={clsx(
            'text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight',
            light ? 'text-white' : 'text-brand-900'
          )}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
