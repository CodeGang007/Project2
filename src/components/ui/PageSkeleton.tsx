// Shared skeleton shown via loading.tsx — keeps perceived route-change time
// near-zero. Strictly CSS: no client JS, no dynamic imports.

export default function PageSkeleton() {
  return (
    <div className="pt-20 md:pt-28 pb-10 md:pb-16 border-b border-ink-100 bg-white animate-pulse">
      <div className="container-wide">
        <div className="h-3 w-24 bg-ink-100 rounded" />
        <div className="mt-6 h-14 md:h-20 w-full max-w-3xl bg-ink-100 rounded" />
        <div className="mt-3 h-14 md:h-20 w-full max-w-xl bg-ink-100 rounded" />
        <div className="mt-8 h-4 w-full max-w-2xl bg-ink-100 rounded" />
      </div>
    </div>
  );
}
