'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Search, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import LanguageSwitcher from './LanguageSwitcher';

type NavChild = { key: string; href: string };
type NavItem = { key: string; href: string; children?: NavChild[] };

const navItems: NavItem[] = [
  { key: 'home', href: '/' },
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

export default function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close dropdowns on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 border-b transition-colors duration-200',
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-ink-100'
          : 'bg-white border-transparent'
      )}
    >
      <div className="container-wide flex h-16 md:h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Dynai home">
          <img
            src="https://www.dynai.com/Html/images/logo.png"
            alt="Jiangsu Dynai Chemical"
            className="h-9 md:h-11 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-0" aria-label="Primary">
          {navItems.map((item) => (
            <div
              key={item.key}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.key)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="relative block px-4 py-2 text-[13px] font-medium text-ink-700 hover:text-ink-900 transition-colors"
              >
                {t(item.key)}
                <span
                  aria-hidden
                  className={clsx(
                    'absolute left-4 right-4 -bottom-[1px] h-px bg-ink-900 origin-left transition-transform duration-300 ease-editorial',
                    openDropdown === item.key ? 'scale-x-100' : 'scale-x-0'
                  )}
                />
              </Link>

              {item.children && openDropdown === item.key && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 min-w-[200px]">
                  <div className="bg-white border border-ink-100 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.12)] py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        href={child.href}
                        className="block px-5 py-2.5 text-[13px] text-ink-700 hover:bg-ink-50 hover:text-ink-900 transition-colors"
                      >
                        {t(child.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center text-ink-700 hover:text-ink-900 transition-colors"
            aria-label={t('searchPlaceholder')}
            aria-expanded={searchOpen}
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          <span className="hidden md:block w-px h-5 bg-ink-200" aria-hidden />

          <LanguageSwitcher />

          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center text-ink-900"
            onClick={() => setMobileOpen(true)}
            aria-label={t('openMenu')}
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {/* Expanding search bar */}
      {searchOpen && (
        <div className="border-t border-ink-100 bg-white">
          <form action="/products" method="GET" className="container-wide py-4 flex items-center gap-3">
            <Search className="h-4 w-4 text-ink-400" />
            <input
              name="q"
              type="text"
              placeholder={t('searchPlaceholder')}
              className="flex-1 bg-transparent text-base placeholder:text-ink-400 focus:outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-xs text-ink-500 hover:text-ink-900"
            >
              Esc
            </button>
          </form>
        </div>
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="container-wide flex h-16 items-center justify-between border-b border-ink-100">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              aria-label="Dynai home"
            >
              <img
                src="https://www.dynai.com/Html/images/logo.png"
                alt="Dynai"
                className="h-9 w-auto"
              />
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center text-ink-900"
              onClick={() => setMobileOpen(false)}
              aria-label={t('closeMenu')}
            >
              <X className="h-[18px] w-[18px]" />
            </button>
          </div>
          <div className="container-wide pt-2 pb-14">
            <nav className="divide-y divide-ink-100">
              {navItems.map((item) => (
                <div key={item.key}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileSection(
                            openMobileSection === item.key ? null : item.key
                          )
                        }
                        className="flex w-full items-center justify-between py-5 text-xl font-medium text-ink-900"
                        aria-expanded={openMobileSection === item.key}
                      >
                        <span>{t(item.key)}</span>
                        <span
                          aria-hidden
                          className={clsx(
                            'text-ink-400 transition-transform',
                            openMobileSection === item.key && 'rotate-45'
                          )}
                        >
                          +
                        </span>
                      </button>
                      {openMobileSection === item.key && (
                        <div className="pb-5 pl-1 space-y-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.key}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-1.5 text-ink-700 hover:text-ink-900 transition-colors"
                            >
                              {t(child.key)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-5 text-xl font-medium text-ink-900"
                    >
                      {t(item.key)}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
