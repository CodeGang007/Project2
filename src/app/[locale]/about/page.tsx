import { setRequestLocale, getTranslations } from 'next-intl/server';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const tn = await getTranslations('nav');
  const stats = t.raw('stats') as { value: string; label: string }[];

  return (
    <>
      <PageHero
        eyebrow={tn('about')}
        title={t('title')}
        subtitle={t('eyebrow')}
      />
      <section className="section">
        <div className="container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="label">{t('eyebrow')}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <p className="body text-lg md:text-xl">{t('body')}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-ink-200">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={
                      'py-8 ' +
                      (i > 0 ? 'md:border-l border-ink-200 md:pl-8 ' : '') +
                      (i >= 2 ? 'border-t md:border-t-0 border-ink-200 ' : '')
                    }
                  >
                    <dt className="label">{s.label}</dt>
                    <dd className="mt-3 h-display text-3xl md:text-4xl">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
