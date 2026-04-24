import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Reveal from '@/components/ui/Reveal';

const credentials: { zh: string; en: string }[] = [
  { zh: '江苏省工程技术研发中心', en: 'Jiangsu Provincial R&D Centre' },
  { zh: '博士后流动分站', en: 'Postdoctoral Research Station' },
  { zh: '校企联合研发中心', en: 'University–Industry Joint Centre' },
  { zh: '多项自主知识产权关键技术', en: 'Proprietary Core Technologies' }
];

export default function RDSection() {
  const t = useTranslations('rd');
  const locale = useLocale() as 'en' | 'zh';

  return (
    <section className="section bg-ink-50">
      <div className="container-wide grid lg:grid-cols-12 gap-y-12 lg:gap-x-16">
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="label">02 — {t('eyebrow')}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl">
              {t('title')}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link href="/rd" className="btn-link mt-10">
              {t('cta')}
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <p className="body text-lg md:text-xl">{t('body')}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-12 grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-ink-200 border-y border-ink-200">
              {credentials.map((c, i) => (
                <li key={i} className="py-6 sm:py-8 sm:px-8 flex items-start gap-4">
                  <span className="num pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <span className="h-display text-lg md:text-xl leading-snug">
                    {locale === 'zh' ? c.zh : c.en}
                  </span>