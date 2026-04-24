import { setRequestLocale, getTranslations } from 'next-intl/server';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';

export default async function RDPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('rd');
  const tn = await getTranslations('nav');

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
            <Reve