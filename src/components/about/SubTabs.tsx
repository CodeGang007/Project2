'use client';

import { Link, usePathname } from '@/i18n/routing';
import clsx from 'clsx';

export default function SubTabs({
  tabs
}: {
  tabs: { key: string; label: string; href: string }[];
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav
      aria-label="About sub-navigation"
      className="relative -mb-px flex flex-wrap items-center gap-1 md:gap-2"
    >
      {tabs.map((tab) => {
        const active = isActive(tab.href);
        return (
          <Link
            key={tab.key}
            href={tab.href as any}
            className={clsx(
              'group relative inline-flex items-center gap-2 px-4 md:px-5 py-3 text-[13px] md:text-sm font-semibold transition-colors',
              active ? 'text-white' : 'text-white/55 hover:text-white'
            )}
          >
            {active && (
              <span className="h-1.5 w-1.5 rounded-full bg-accent-light" aria-hidden />
            )}
            {tab.label}
            <span
              aria-hidden
              className={clsx(
                'absolute left-2 right-2 md:left-5 md:right-5 bottom-0 h-[2px] bg-accent-light origin-left transition-transform duration-300',
                active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
