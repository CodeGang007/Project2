import { TrendingUp, ArrowDown, Activity } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export type KpiItem = {
  value: string;
  label: string;
  sublabel?: string;
  trend?: string;
};

export default function KpiDashboard({
  items,
  asOfLabel
}: {
  items: KpiItem[];
  asOfLabel?: string;
}) {
  return (
    <div>
      {asOfLabel && (
        <p className="mb-5 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-ink-500">
          <Activity className="h-3 w-3" />
          {asOfLabel}
        </p>
      )}
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-200/80 rounded-2xl overflow-hidden border border-ink-200/80">
        {items.map((kpi, i) => {
          const isNegative = kpi.value.startsWith('−') || kpi.value.startsWith('-');
          const TrendIcon = isNegative ? ArrowDown : TrendingUp;
          return (
            <Reveal key={kpi.label} delay={0.04 + i * 0.04}>
              <li className="bg-white p-6 md:p-7 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] tracking-widest text-ink-300 tabular-nums">
                    KPI · {String(i + 1).padStart(2, '0')}
                  </p>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <TrendIcon className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="mt-5 font-display font-medium text-4xl md:text-5xl leading-none bg-gradient-to-br from-ink-900 to-ink-600 bg-clip-text text-transparent tabular-nums">
                  {kpi.value}
                </p>
                <p className="mt-3 font-semibold text-ink-900 text-base leading-snug">
                  {kpi.label}
                </p>
                {kpi.sublabel && (
                  <p className="mt-1 text-xs text-ink-500 leading-relaxed">{kpi.sublabel}</p>
                )}
                {kpi.trend && (
                  <p className="mt-auto pt-4 text-[11px] font-mono uppercase tracking-[0.22em] text-accent">
                    {kpi.trend}
                  </p>
                )}
              </li>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
