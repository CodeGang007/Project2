import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type NewsItem = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  excerpt: string;
  category: string;
  author?: string;
};

function escapeXml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const page = t.raw('page') as { heroTitle: string; heroSubtitle: string };
  const items = t.raw('items') as NewsItem[];

  const siteUrl = 'https://www.dynai.com';
  const feedUrl = `${siteUrl}/${locale}/news/rss.xml`;
  const newsUrl = `${siteUrl}/${locale}/news`;

  const language = locale === 'zh' ? 'zh-CN' : 'en-GB';
  const title = `${meta('siteName')} — ${page.heroTitle}`;
  const description = page.heroSubtitle;

  const sorted = [...items].sort((a, b) =>
    (b.date || '').localeCompare(a.date || '')
  );

  const itemsXml = sorted
    .map((item) => {
      const url = `${siteUrl}/${locale}/news/${item.id}`;
      const pubDate = new Date(item.date);
      const pubDateRfc = !Number.isNaN(pubDate.getTime())
        ? pubDate.toUTCString()
        : new Date().toUTCString();
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDateRfc}</pubDate>
      <category>${escapeXml(item.category)}</category>${
        item.author ? `\n      <author>${escapeXml(item.author)}</author>` : ''
      }
      <description>${escapeXml(item.excerpt)}</description>
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${newsUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(description)}</description>
    <language>${language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemsXml}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
