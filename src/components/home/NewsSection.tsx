import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Reveal from '@/components/ui/Reveal';

type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
};

function formatDate(iso: string) {
  // Return { year, monthDay } so we can render a two-line chunky date lockup
  const d = new Date(iso);
  if (isNaN(d.getTime())) return { year: '', monthDay: iso };
  const year = d.getUTCFullYear();
  const monthDay = `${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(
    d.getUTCDate()
  ).padStart(2, '0')}`;
  return { year: String(year), monthDay };
}

export default function NewsSection() {
  const t = useTranslations('news');
  const items = t.raw('items') as NewsItem[];
  const [feature, ...rest] = items;

  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <Reveal>
              <p className="label">04 — {t('eyebrow')}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 h-display text-4xl md:text-5xl lg:text-6xl">
                {t('title')}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link href="/news" className="btn-link">
              {t('cta')}
            </Link>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-16">
          {/* Feature */}
          {feature && (
            <Reveal className="lg:col-span-7">
              <Link
                href={`/news/${feature.id}`}
                className="group block border-t border-ink-200 pt-8"
              >
                <DateLockup iso={feature.date} />
                <h3 className="mt-6 h-display text-2xl md:text-3xl lg:text-4xl group-hover:text-brand-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-5 body max-w-xl">{feature.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-900 border-b border-ink-900 pb-0.5">
                  {t('readMore')}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          )}

          {/* Rest — compact list */}
          <ul className="lg:col-span-5 lg:border-l lg:border-ink-200 lg:pl-10">
            {rest.map((n, i) => (
              <li key={n.id}>
                <Reveal delay={0.1 + i * 0.08}>
                  <Link
                    href={`/news/${n.id}`}
                    className="group block border-t border-ink-200 py-8 first:border-t-0 first:pt-0"
                  >
                    <DateLockup iso={n.date} compact />
                    <h3 className="mt-4 h-display text-lg md:text-xl group-hover:text-brand-700 transition-colors">
                      {n.title}
                    </h3>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function DateLockup({ iso, compact = false }: { iso: string; compact?: boolean }) {
  const { year, monthDay } = formatDate(iso);
  return (
    <div className="font-mono text-ink-500 flex items-baseline gap-3">
      <span className={compact ? 'text-xs tracking-widest' : 'text-sm tracking-widest'}>
        {year}
      </span>
      <span className={compact ? 'text-base' : 'text-2xl md:text-3xl text-ink-900'}>
        {monthDay}
      </span>
    </div>
  );
}
