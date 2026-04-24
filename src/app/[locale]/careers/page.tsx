import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';

export default async function CareersPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('join');
  const tn = await getTranslations('nav');

  return (
    <>
      <PageHero eyebrow={tn('joinUs')} title={t('title')} />
      <section className="section">
        <div className="container-wide grid lg:grid-cols-12 gap-y-8 lg:gap-x-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="label">{t('eyebrow')}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl leading-snug tracking-tight border-l border-ink-900 pl-6 md:pl-8">
                {t('body')}
              </blockquote>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/jobs" className="btn-primary">
                  {tn('jobs')}
                </Link>
                <Link href="/contact" className="btn-outline">
                  {tn('contact')}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
