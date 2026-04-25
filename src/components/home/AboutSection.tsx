import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Counter from '@/components/ui/Counter';

type Stat = { value: string; suffix?: string; label: string };

const bases = [
  { name: 'Nanjing', zh: '南京', role: 'HQ · Jiangbei New Materials Park' },
  { name: 'Binhai', zh: '滨海', role: 'Scale production · Jiangsu' },
  { name: 'Maoming', zh: '茂名', role: 'Southern China · Guangdong' }
];

export default function AboutSection() {
  const t = useTranslations('about');
  const stats = t.raw('stats') as Stat[];

  return (
    <section id="about" className="relative overflow-hidden section bg-white">
      {/* Soft decorative gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-100/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative container-wide">
        <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-700">
                <Sparkles className="h-3 w-3 text-accent" />
                01 · {t('eyebrow')}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                {t('title')}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-sm text-ink-500 font-mono tracking-[0.15em] uppercase">
                {t('sinceLabel')}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-lg md:text-xl text-ink-600 leading-relaxed">{t('body')}</p>
            </Reveal>

            {/* Production bases card */}
            <Reveal delay={0.15}>
              <div className="mt-10 rounded-2xl border border-ink-200/80 bg-gradient-to-br from-white to-ink-50 p-6 md:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                  Production bases
                </p>
                <ul className="mt-5 grid sm:grid-cols-3 gap-4">
                  {bases.map((b) => (
                    <li
                      key={b.name}
                      className="group relative rounded-xl bg-white border border-ink-100 p-4 hover:border-brand-300 hover:shadow-md hover:shadow-brand-500/10 transition-all"
                    >
                      <div className="flex items-center gap-2 text-brand-700">
                        <MapPin className="h-4 w-4" />
                        <span className="font-semibold text-ink-900">{b.name}</span>
                        <span className="text-ink-400 text-xs">· {b.zh}</span>
                      </div>
                      <p className="mt-2 text-xs text-ink-500 leading-relaxed">{b.role}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                href="/about"
                className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:gap-3 transition-all"
              >
                <span className="border-b border-ink-900 pb-0.5">{t('cta')}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Stats ribbon with animated counters */}
        <Reveal delay={0.25}>
          <dl className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-ink-200/80 overflow-hidden bg-white">
            {stats.map((s, i) => {
              const numeric = parseInt(s.value, 10);
              return (
                <div
                  key={s.label}
                  className={
                    'relative py-10 md:py-12 px-6 md:px-8 group hover:bg-gradient-to-br hover:from-brand-50 hover:to-white transition-colors duration-300 ' +
                    (i > 0 ? 'md:border-l border-ink-200/80 ' : '') +
                    (i >= 2 ? 'border-t md:border-t-0 border-ink-200/80 ' : '')
                  }
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-500 leading-relaxed">
                    {s.label}
                  </dt>
                  <dd className="mt-4 font-display font-medium text-5xl md:text-6xl lg:text-7xl text-ink-900 leading-none tracking-tight bg-gradient-to-br from-ink-900 to-ink-700 bg-clip-text text-transparent">
                    {!isNaN(numeric) ? (
                      <Counter to={numeric} suffix={s.suffix || ''} />
                    ) : (
                      <>{s.value}{s.suffix}</>
                    )}
                  </dd>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand-500 to-accent group-hover:w-full transition-all duration-500"
                  />
                </div>
              );
            })}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
