import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const footerGroups: {
  key: string;
  href: string;
  children?: { key: string; href: string }[];
}[] = [
  {
    key: 'about',
    href: '/about',
    children: [
      { key: 'aboutCompany', href: '/about' },
      { key: 'research', href: '/rd' },
      { key: 'publication', href: '/newsletter' }
    ]
  },
  { key: 'products', href: '/products' },
  { key: 'news', href: '/news' },
  {
    key: 'joinUs',
    href: '/careers',
    children: [
      { key: 'careers', href: '/careers' },
      { key: 'jobs', href: '/jobs' }
    ]
  },
  {
    key: 'sustainability',
    href: '/sustainability/disclosure',
    children: [
      { key: 'disclosure', href: '/sustainability/disclosure' },
      { key: 'safety', href: '/sustainability/safety' },
      { key: 'community', href: '/sustainability/community' }
    ]
  },
  { key: 'contact', href: '/contact' }
];

export default function Footer() {
  const t = useTranslations('nav');
  const tf = useTranslations('footer');
  const tc = useTranslations('contact');

  return (
    <footer className="bg-white border-t border-ink-200">
      <div className="container-wide py-20 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img
            src="https://www.dynai.com/Html/images/logo.png"
            alt="Dynai"
            className="h-10 w-auto"
          />
          <address className="not-italic mt-8 space-y-2 text-sm text-ink-600 max-w-sm">
            <p>{tc('address')}</p>
            <p>
              <a href={`tel:${tc('phone')}`} className="hover:text-ink-900 transition-colors">
                {tc('phone')}
              </a>
            </p>
            <p>
              <a href={`mailto:${tc('email')}`} className="hover:text-ink-900 transition-colors">
                {tc('email')}
              </a>
            </p>
          </address>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-20 w-20 p-1 bg-white border border-ink-200">
              <img
                src="https://www.dynai.com/Html/images/img15.jpg"
                alt="Dynai mobile platform QR"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="text-xs text-ink-500">
              <p className="text-ink-900 font-medium">{tf('qrCaption')}</p>
              <p className="mt-1">{tf('qrSubtitle')}</p>
            </div>
          </div>
        </div>

        <nav className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10" aria-label="Footer">
          {footerGroups.map((group) => (
            <div key={group.key}>
              <Link
                href={group.href}
                className="text-[11px] font-medium uppercase tracking-widest text-ink-400 hover:text-ink-900 transition-colors"
              >
                {t(group.key)}
              </Link>
              {group.children && (
                <ul className="mt-5 space-y-3">
                  {group.children.map((child) => (
                    <li key={child.key}>
                      <Link
                        href={child.href}
                        className="text-sm text-ink-800 hover:text-ink-900 transition-colors"
                      >
                        {t(child.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-ink-100">
        <div className="container-wide py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-ink-500">
          <p>{tf('copyright')}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-ink-900 transition-colors"
              >
                {tf('icp')}
              </a>
            </li>
            <li>
              <Link href="/sitemap" className="hover:text-ink-900 transition-colors">
                {tf('sitemap')}
              </Link>
            </li>
            <li>
              <Link href="/legal" className="hover:text-ink-900 transition-colors">
                {tf('copyrightNotice')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
