import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Reveal from '@/components/ui/Reveal';

type Card = { slug: string; title: string };

const certifications = [
  { code: 'ISO 9001', zh: '质量管理', en: 'Quality' },
  { code: 'ISO 14001', zh: '环境管理', en: 'Environment' },
  { code: 'ISO 45001', zh: '职业健康安全', en: 'Health & Safety' },
  { code: '2009', zh: '江苏省安全生产标准化二级', en: 'Jiangsu Safety Standardisation L2' },
  { code: '2017', zh: '推行 PSM 过程安全管理', en: 'PSM Process Safety Management' }
];

export default function SustainabilitySection() {
  const t = useTranslations('sustainability');
  const locale = useLocale() as 'en' | 'zh';
  const cards = t.raw('cards') as Card[];

  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 mb-16 md:mb-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label">05 — {t('eyebrow')}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl">
                {t('title')}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <Reveal delay={0.1}>
              <p className="body text-lg md:text-xl max-w-2xl">{t('body')}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link href="/sustainability/disclosure" className="btn-link mt-8">
                {t('cta')}
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Certification ribbon */}
        <Reveal delay={0.2}>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-ink-200">
            {certifications.map((c, i) => (
              <li
                key={c.code}
                className={
                  'py-8 md:py-10 px-0 sm:px-6 ' +
                  (i > 0 ? 'sm:border-l border-ink-200 ' : '') +
                  (i >= 2 ? 'border-t sm:border-t-0 border-ink-200 ' : '') +
                  (i === 3 || i === 4 ? 'lg:border-t-0 lg:border-l border-ink-200 ' : '')
                }
              >
                <p className="font-display text-2xl md:text-3xl text-ink-900 leading-none">
                  {c.code}
                </p>
                <p className="mt-3 text-sm text-ink-600">
                  {locale === 'zh' ? c.zh : c.en}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Pillars — three text-first tiles replacing the image cards */}
        <Reveal delay={0.25}>
          <div className="mt-24 grid md:grid-cols-3 border-t border-ink-200">
            {cards.map((c, i) => (
              <Link
                key={c.slug}
                href={`/sustainability/${c.slug}`}
                className={
                  'group relative py-10 md:py-12 md:pr-10 ' +
                  (i > 0 ? 'md:border-l border-ink-200 md:pl-10 ' : '') +
                  (i > 0 ? 'border-t md:border-t-0 border-ink-200 ' : '')
                }
              >
                <p className="num">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 h-display text-2xl md:text-3xl group-hover:text-brand-700 transition-colors">
                  {c.title}
                </h3>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-900">
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
