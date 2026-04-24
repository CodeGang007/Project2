import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { Link } from '@/i18n/routing';

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  className?: string;
}

/** Shared CTA link with animated underline + sliding arrow. */
export default function ArrowLink({
  href,
  children,
  variant = 'dark',
  className
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      prefetch
      className={clsx(
        'group inline-flex items-center gap-2.5 text-sm font-medium',
        variant === 'dark' ? 'text-ink-900' : 'text-white',
        className
      )}
    >
      <span
        className={clsx(
          'border-b pb-1 transition-colors',
          variant === 'dark'
            ? 'border-ink-300 group-hover:border-ink-900'
            : 'border-white/40 group-hover:border-white'
        )}
      >
        {children}
      </span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
        strokeWidth={1.5}
        aria-hidden
      />
    </Link>
  );
}
