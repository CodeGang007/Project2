import {
  Presentation,
  ScanLine,
  PenLine,
  Wrench,
  Stethoscope,
  Users,
  Mail,
  CheckCircle2,
  ArrowRight,
  type LucideIcon
} from 'lucide-react';
import clsx from 'clsx';
import Reveal from '@/components/ui/Reveal';

export type ProcessStep = {
  key: string;
  title: string;
  body: string;
  icon: string;
};

const stepIcons: Record<string, LucideIcon> = {
  presentation: Presentation,
  scan: ScanLine,
  pen: PenLine,
  wrench: Wrench,
  stethoscope: Stethoscope,
  users: Users,
  mail: Mail,
  check: CheckCircle2
};

export default function RecruitmentProcess({
  steps,
  onDark = false
}: {
  steps: ProcessStep[];
  onDark?: boolean;
}) {
  return (
    <div className="relative">
      {/* Mobile: vertical timeline */}
      <ol
        className={clsx(
          'lg:hidden relative space-y-5 pl-7',
          onDark
            ? 'border-l-2 border-white/15'
            : 'border-l-2 border-ink-200'
        )}
      >
        {steps.map((step, i) => {
          const Icon = stepIcons[step.icon] || PenLine;
          return (
            <Reveal key={step.key} delay={i * 0.04}>
              <li className="relative">
                <span
                  aria-hidden
                  className={clsx(
                    'absolute -left-[34px] top-1 inline-flex h-7 w-7 items-center justify-center rounded-full border',
                    onDark
                      ? 'bg-ink-900 border-white/20 text-accent-light'
                      : 'bg-white border-ink-200 text-brand-700'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <p
                  className={clsx(
                    'text-[10px] font-mono uppercase tracking-[0.22em] tabular-nums',
                    onDark ? 'text-white/45' : 'text-ink-400'
                  )}
                >
                  STEP {String(i + 1).padStart(2, '0')}
                </p>
                <h3
                  className={clsx(
                    'mt-1 font-display font-medium text-lg leading-snug',
                    onDark ? 'text-white' : 'text-ink-900'
                  )}
                >
                  {step.title}
                </h3>
                <p className={clsx('mt-1 text-sm leading-relaxed', onDark ? 'text-white/65' : 'text-ink-600')}>
                  {step.body}
                </p>
              </li>
            </Reveal>
          );
        })}
      </ol>

      {/* Desktop: horizontal step diagram */}
      <ol className="hidden lg:grid grid-cols-8 gap-3 relative">
        {/* Connector line */}
        <span
          aria-hidden
          className={clsx(
            'absolute left-0 right-0 top-7 h-px',
            onDark
              ? 'bg-gradient-to-r from-transparent via-white/15 to-transparent'
              : 'bg-gradient-to-r from-transparent via-ink-200 to-transparent'
          )}
        />

        {steps.map((step, i) => {
          const Icon = stepIcons[step.icon] || PenLine;
          return (
            <Reveal key={step.key} delay={i * 0.04}>
              <li className="relative flex flex-col items-center text-center group">
                {/* Node circle */}
                <span
                  className={clsx(
                    'relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-500',
                    onDark
                      ? 'bg-ink-900 border-white/20 text-white group-hover:bg-accent group-hover:text-ink-950 group-hover:border-accent'
                      : 'bg-white border-ink-200 text-brand-700 group-hover:bg-ink-900 group-hover:text-white group-hover:border-ink-900'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>

                {/* Step number */}
                <span
                  className={clsx(
                    'mt-3 text-[10px] font-mono uppercase tracking-[0.22em] tabular-nums',
                    onDark ? 'text-white/45' : 'text-ink-400'
                  )}
                >
                  STEP {String(i + 1).padStart(2, '0')}
                </span>

                <h3
                  className={clsx(
                    'mt-2 font-display font-medium text-sm leading-snug',
                    onDark ? 'text-white' : 'text-ink-900'
                  )}
                >
                  {step.title}
                </h3>

                <p
                  className={clsx(
                    'mt-1.5 text-[11px] leading-snug',
                    onDark ? 'text-white/55' : 'text-ink-500'
                  )}
                >
                  {step.body}
                </p>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className={clsx(
                      'absolute top-5 -right-4 z-0 h-4 w-4',
                      onDark ? 'text-white/30' : 'text-ink-300'
                    )}
                  />
                )}
              </li>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
