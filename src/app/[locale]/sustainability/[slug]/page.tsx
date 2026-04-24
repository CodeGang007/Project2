import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';

export default async function SustainabilityPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('sustainability');
  const tn = await getTranslations('nav');
  const cards = t.raw('cards') as { slug: string; title: string }[];
  const card = cards.find((c) => c.slug === slug);
  if (!card) notFound();

  return (
    <>
      <PageHero eyebrow={tn('sustainability')} title={card.title} />
      <section className="section">
        <div className="container-wide grid lg:grid-cols-12 gap-y-8 lg:gap-x-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="label">{t('eyebr