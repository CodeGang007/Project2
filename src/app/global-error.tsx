'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[global error]', error);
  }, [error]);

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
            Critical error
          </p>
          <h1
            style={{
              marginTop: 16,
              fontSize: '2.5rem',
              lineHeight: 1.1,
              fontWeight: 500
            }}
          >
            We hit an unexpected error.
          </h1>
          <p
            style={{
              marginTop: 16,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6
            }}
          >
            The page failed to load. Please try refreshing — if the problem persists,
            contact us at dynai.info@dynai.com.
          </p>
          {error?.digest && (
            <p
              style={{
                marginTop: 12,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 11,
                color: 'rgba(255,255,255,0.4)'
              }}
            >
              ref · {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 24,
              padding: '12px 20px',
              border: 0,
              borderRadius: 9999,
              background: '#e0c073',
              color: '#080807',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
