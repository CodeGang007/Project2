import { setRequestLocale, getTranslations } from 'next-intl/server';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const tn = await getTranslations('nav');

  const lines = [
    { label: 'T', value: t('phone'), href: `tel:${t('phone').replace(/\s/g, '')}` },
    { label: 'E', value: t('email'), href: `mailto:${t('email')}` },
    { label: 'A', value: t('address'), href: '#map' }
  ];

  return (
    <>
      <PageHero eyebrow={tn('contact')} title={t('title')} />
      <section className="section">
        <div className="container-wide grid lg:grid-cols-12 gap-y-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <Reveal>
              <dl className="divide-y divide-ink-200 border-y border-ink-200">
                {lines.map(({ label, value, href }) => (
                  <div
                    key={label}
                    className="grid grid-cols-[auto_1fr] items-baseline gap-8 py-6"
                  >
                    <dt className="font-mono text-xs tracking-widest text-ink-500">
                      {label}
                    </dt>
                    <dd>
                      <a
                        href={href}
                        className="text-lg md:text-xl font-medium tracking-tight text-ink-900 hover:text-ink-600 transition-colors"
                      >
                        {value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal direction="right">
              <div
                id="map"
                className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[380px] bg-ink-100 border border-ink-200 overflow-hidden"
              >
                <iframe
                  title="Dynai HQ location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=118.77,32.15,118.83,32.22&layer=mapnik&marker=32.19,118.80"
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
