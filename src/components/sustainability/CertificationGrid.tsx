import { Award, BadgeCheck } from 'lucide-react';
import clsx from 'clsx';
import Reveal from '@/components/ui/Reveal';

export type Certification = {
  code: string;
  scope: string;
  since: string;
  color: string;
  body: string;
};

const palettes: Record<string, { bg: string; ring: string; text: string }> = {
  brand: { bg: 'bg-gradient-to-br from-brand-600 via-brand-800 to-ink-950', ring: 'ring-brand-400/40', text: 'text-brand-100' },
  emerald: { bg: 'bg-gradient-to-br from-emerald-700 via-emerald-900 to-ink-950', ring: 'ring-emerald-400/40', text: 'text-emerald-100' },
  amber: { bg: 'bg-gradient-to-br from-amber-600 via-orange-800 to-ink-950', ring: 'ring-amber-400/40', text: 'text-amber-100' },
  rose: { bg: 'bg-gradient-to-br from-rose-600 via-rose-900 to-ink-950', ring: 'ring-rose-400/40', text: 'text-rose-100' },
  fuchsia: { bg: 'bg-gradient-to-br from-fuchsia-700 via-purple-900 to-ink-950', ring: 'ring-fuchsia-400/40', text: 'text-fuchsia-100' },
  cyan: { bg: 'bg-gradient-to-br from-cyan-600 via-blue-900 to-ink-950', ring: 'ring-cyan-400/40', text: 'text-cyan-100' }
};

export default function CertificationGrid({
  items,
  sinceLabel = 'since'
}: {
  items: Certification[];
  sinceLabel?: string;
}) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {items.map((cert, i) => {
        const palette = palettes[cert.color] || palettes.brand;
        return (
          <Reveal key={cert.code} delay={0.04 + i * 0.04}>
            <li className="group h-full rounded-2xl border border-ink-200/80 bg-white overflow-hidden hover:border-ink-900/20 hover:shadow-[0_25px_50px_-25px_rgba(8,8,7,0.2)] transition-all duration-500">
              {/* Badge area */}
              <div
                className={clsx(
                  'relative aspect-[5/3] overflow-hidden text-white',
                  palette.bg
                )}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/15 blur-3xl"
                />

                <div className="relative h-full flex flex-col justify-between p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className={clsx('inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]', palette.text)}>
                      <Award className="h-3 w-3" />
                      Certified
                    </span>
                    <BadgeCheck className="h-6 w-6 text-white/70 group-hover:text-white transition-colors" />
                  </div>

                  <div>
                    <p className="font-display font-semibold text-3xl md:text-4xl leading-none tracking-tight">
                      {cert.code}
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      {sinceLabel} {cert.since}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 md:p-6">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400">
                  {cert.scope}
                </p>
                <p className="mt-3 text-sm text-ink-700 leading-relaxed">{cert.body}</p>
              </div>
            </li>
          </Reveal>
        );
      })}
    </ul>
  );
}
