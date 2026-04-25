// Top-level 404 — used when middleware can't match a locale at all.
// The locale-scoped not-found.tsx handles the common case.
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080807',
          color: '#fff',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
        }}
      >
        <div style={{ maxWidth: 560, padding: 32 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              margin: 0
            }}
          >
            404
          </p>
          <h1
            style={{
              marginTop: 16,
              fontSize: '4rem',
              lineHeight: 1,
              fontWeight: 600
            }}
          >
            Page not found
          </h1>
          <p
            style={{
              marginTop: 16,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist. Pick a language to start over.
          </p>
          <div
            style={{
              marginTop: 24,
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap'
            }}
          >
            {[
              { href: '/en', label: 'English' },
              { href: '/zh', label: '中文' },
              { href: '/zh-TW', label: '繁體中文' }
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  padding: '10px 18px',
                  borderRadius: 9999,
                  background: '#e0c073',
                  color: '#080807',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </body>
    </html>
  );
}
