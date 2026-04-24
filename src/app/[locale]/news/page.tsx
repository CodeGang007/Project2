import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';

type NewsItem = { id: string; title: string; date: string; excerpt: string };

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return { year: '', monthDay: iso };
  return {
    year: String(d.getUTCFullYear()),
    monthDay: `${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(
      d.getUTCDate()
    ).padStart(2, '0')}`
  };
}

export default async function NewsIndexPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('news');
  const tn = await getTranslations('nav');
  const items = t.raw('items') as NewsItem[];

  return (
    <>
      <PageHero eyebrow={tn('news')} title={t('title')} />
      <section className="section">
        <div className="container-wide">
          <ul className="border-t border-ink-200">
            {items.map((item, i) => {
              const { year, monthDay } = formatDate(item.date);
              return (
                <li key={item.id}>
                  <Reveal delay={i * 0.05}>
                    <Link
                      href={`/news/${item.id}`}
                      className="group grid grid-cols-1 md:grid-cols-[140px_1fr_auto] items-baseline gap-4 md:gap-12 border-b border-ink-200 py-8 md:py-10 transition-colors hover:bg-ink-50"
                    >
                      <div className="flex items-baseline gap-3 font-mono text-xs text-ink-500 tabular-nums">
                        <span>{monthDay}</span>
                        <span className="text-ink-300">·</span>
                        <span>{year}</span>
                      </div>
                      <div>
                        <h3 className="h-display text-xl md:text-2xl lg:text-3xl group-hover:text-brand-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm md:text-base text-ink-600 line-clamp-2 max-w-2xl">
                          {item.excerpt}
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className="hidden md:inline-block text-ink-400 group-hover:text-ink-900 transition-all group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
