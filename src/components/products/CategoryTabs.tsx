'use client';

import { Link, usePathname } from '@/i18n/routing';
import clsx from 'clsx';

export default function CategoryTabs({
  tabs,
  activeSlug,
  onDark = true
}: {
  tabs: { slug: string; name: string }[];
  activeSlug?: string;
  onDark?: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Product categories"
      className="relative -mb-px"
    >
      <ul className="flex items-end gap-1 md:gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab, i) => {
          const href = `/products/${tab.slug}` as const;
          const active =
            (activeSlug && activeSlug === tab.slug) ||
            pathname === href ||
            pathname.startsWith(href + '/');
          return (
            <li key={tab.slug} className="flex-shrink-0">
              <Link
                href={href as any}
                className={clsx(
                  'group relative inline-flex items-baseline gap-2 px-3.5 md:px-4 py-3 text-xs md:text-[13px] font-semibold whitespace-nowrap transition-colors',
                  onDark
                    ? active
                      ? 'text-white'
                      : 'text-white/55 hover:text-white'
                    : active
                    ? 'text-ink-900'
                    : 'text-ink-500 hover:text-ink-900'
                )}
              >
                <span
                  className={clsx(
                    'font-mono tabular-nums text-[10px]',
                    onDark ? 'text-white/40' : 'text-ink-400'
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{tab.name}</span>
                <span
                  aria-hidden
                  className={clsx(
                    'absolute left-3 right-3 md:left-4 md:right-4 bottom-0 h-[2px] bg-accent-light origin-left transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-60'
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
