import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import { productData, type ProductCategory } from '@/data/products';
import { FileDown, ExternalLink } from 'lucide-react';

type PageParams = { locale: string; category: string };

export function generateStaticParams() {
  return Object.keys(productData).map((category) => ({ category }));
}

export default async function ProductCategoryPage({
  params
}: {
  params: Promise<PageParams>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products');
  const tn = await getTranslations('nav');
  const l = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';

  const categories = t.raw('categories') as { slug: string; name: string }[];
  const label = categories.find((c) => c.slug === category)?.name;
  if (!label) notFound();

  const data: ProductCategory | undefined = productData[category];

  return (
    <>
      <PageHero eyebrow={tn('products')} title={label} />

      {data && (
        <section className="section">
          <div className="container-wide grid lg:grid-cols-12 gap-y-10 lg:gap-x-16">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="label">Overview</p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <p className="body text-lg md:text-xl">{data.overview[l]}</p>
              </Reveal>
              {data.applications && (
                <Reveal delay={0.15}>
                  <ul className="mt-10 flex flex-wrap gap-2">
                    {data.applications[l].map((app) => (
                      <li
                        key={app}
                        className="px-4 py-2 border border-ink-200 text-sm text-ink-700"
                      >
                        {app}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          </div>

          {data.series.map((series, si) => (
            <div key={si} className="container-wide mt-20 md:mt-24">
              <Reveal>
                <h2 className="h-display text-3xl md:text-4xl lg:text-5xl">
                  {l === 'zh' ? series.titleZh : series.titleEn}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-10 border-t border-ink-200">
                  {series.products.map((p) => (
                    <li
                      key={p.id}
                      className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-baseline gap-4 md:gap-10 border-b border-ink-200 py-6"
                    >
                      <div>
                        <p className="h-display text-lg md:text-xl">
                          {l === 'zh' ? p.nameZh : p.nameEn}
                        </p>
                        <p className="mt-1 text-xs font-mono text-ink-500">
                          {p.id}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        {p.msdsUrl && (
                          <a
                            href={p.msdsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-ink-700 hover:text-ink-900"
                          >
                            <FileDown className="h-4 w-4" />
                            MSDS
                          </a>
                        )}
                        {p.detailHref && (
                          <Link
                            href={p.detailHref}
                            className="inline-flex items-center gap-2 text-ink-700 hover:text-ink-900"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Detail
                          </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
