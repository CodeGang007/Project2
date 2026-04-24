import { setRequestLocale, getTranslations } from 'next-intl/server';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';

export default async function NewsletterPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tn = await getTranslations('nav');

  return (
    <>
      <PageHero eyebrow={tn('about')} title={tn('publication')} />
      <section className="section">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="body text-lg md:text-xl">
              {locale === 'zh'
                ? '《德纳内刊》电子版本集锦即将上线，敬请期待。'
                : 'The Dynai Newsletter archive is coming soon.'}
            </p>
          </Reveal>
        </div>
      </section>