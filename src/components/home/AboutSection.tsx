import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Reveal from '@/components/ui/Reveal';

type Stat = { value: string; label: string };

export default function AboutSection() {
  const t = useTranslations('about');
  const stats = t.raw('stats') as Stat[];

  return (
    <section id="about" className="section bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16">
          {/* Left: label + heading */}
          <div className="lg:col-span-5 lg:pr-4">
            <Reveal>
              <p className="label">01 — {t('eyebrow')}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl">
                {t('title')}
              </h2>
            </Reveal>
          </div>

          {/* Right: body + CTA */}
          <div className="lg:col-span-7 lg:pt-2">
            <Reveal delay={0.1}>
              <p className="body text-lg md:text-xl max-w-2xl">{t('body')}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link href="/about" className="btn-link mt-10">
                {t('cta')}
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Stats ribbon — no boxes, thin rules */}
        <Reveal delay={0.2}>
          <dl className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 border-t border-ink-200">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={
                  'py-8 md:py-10 pr-6 ' +
         