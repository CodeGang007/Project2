'use client';

import { useState } from 'react';
import {
  Link2,
  Check,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  Send
} from 'lucide-react';
import clsx from 'clsx';

type ShareLabels = {
  label: string;
  copy: string;
  copied: string;
};

export default function ShareButtons({
  title,
  url,
  labels,
  variant = 'inline'
}: {
  title: string;
  url: string;
  labels: ShareLabels;
  variant?: 'inline' | 'stacked';
}) {
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      key: 'twitter',
      label: 'Twitter / X',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`
    },
    {
      key: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`
    },
    {
      key: 'email',
      label: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encoded}`
    }
  ];

  const onCopy = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
    } catch {
      /* fall through */
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const Btn = ({
    children,
    href,
    label,
    onClick
  }: {
    children: React.ReactNode;
    href?: string;
    label: string;
    onClick?: () => void;
  }) =>
    href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 hover:border-ink-900 hover:bg-ink-900 hover:text-white transition-colors"
      >
        {children}
      </a>
    ) : (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 hover:border-ink-900 hover:bg-ink-900 hover:text-white transition-colors"
      >
        {children}
      </button>
    );

  return (
    <div
      className={clsx(
        'flex items-center gap-4',
        variant === 'stacked' ? 'flex-col' : 'flex-wrap'
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-500 inline-flex items-center gap-1.5">
        <Send className="h-3 w-3" />
        {labels.label}
      </p>
      <div
        className={clsx(
          'flex gap-2 items-center relative',
          variant === 'stacked' ? 'flex-col' : 'flex-row'
        )}
      >
        {links.map(({ key, href, label, icon: Icon }) => (
          <Btn key={key} href={href} label={label}>
            <Icon className="h-4 w-4" />
          </Btn>
        ))}
        <Btn onClick={onCopy} label={labels.copy}>
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
        </Btn>
        {copied && (
          <span
            role="status"
            className={clsx(
              'absolute bg-ink-950 text-white text-[10px] font-semibold uppercase tracking-[0.22em] px-2.5 py-1 rounded-full shadow-lg',
              variant === 'stacked' ? 'left-full ml-3 whitespace-nowrap' : 'top-full mt-3 right-0 whitespace-nowrap'
            )}
          >
            {labels.copied}
          </span>
        )}
      </div>
    </div>
  );
}
