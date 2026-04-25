import {
  Handshake,
  Users,
  Megaphone,
  Info,
  Mail,
  Phone,
  Clock,
  ArrowUpRight,
  type LucideIcon
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export type DepartmentItem = {
  key: string;
  icon: string;
  title: string;
  body: string;
  email: string;
  phone: string;
  hours: string;
};

const iconMap: Record<string, LucideIcon> = {
  handshake: Handshake,
  users: Users,
  megaphone: Megaphone,
  info: Info
};

export default function DepartmentCards({ items }: { items: DepartmentItem[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-5 md:gap-6">
      {items.map((dept, i) => {
        const Icon = iconMap[dept.icon] || Info;
        return (
          <Reveal key={dept.key} delay={0.05 + i * 0.05}>
            <li className="group h-full rounded-2xl border border-ink-200/80 bg-white p-6 md:p-7 hover:border-ink-900/20 hover:shadow-[0_25px_50px_-25px_rgba(8,8,7,0.2)] transition-all duration-500">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-accent/10 border border-ink-200/70 text-brand-700 group-hover:from-brand-600 group-hover:to-brand-800 group-hover:text-white group-hover:border-brand-600 transition-all duration-500">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] tracking-widest text-ink-300 tabular-nums">
                  0{i + 1}
                </span>
              </div>

              <h3 className="mt-5 font-display font-medium text-xl md:text-2xl leading-snug text-ink-900">
                {dept.title}
              </h3>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">{dept.body}</p>

              <dl className="mt-5 pt-5 border-t border-ink-100 space-y-2.5 text-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400 inline-flex items-center gap-1.5">
                    <Mail className="h-3 w-3" />
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${dept.email}`}
                      className="font-semibold text-ink-900 hover:text-brand-800 transition-colors"
                    >
                      {dept.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400 inline-flex items-center gap-1.5">
                    <Phone className="h-3 w-3" />
                    Phone
                  </dt>
                  <dd>
                    <a
                      href={`tel:${dept.phone.replace(/\s+/g, '')}`}
                      className="font-mono tabular-nums text-ink-900 hover:text-brand-800 transition-colors"
                    >
                      {dept.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-400 inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    Hours
                  </dt>
                  <dd className="text-ink-700 font-medium">{dept.hours}</dd>
                </div>
              </dl>

              <a
                href={`mailto:${dept.email}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors"
              >
                Email this team
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </li>
          </Reveal>
        );
      })}
    </ul>
  );
}
