import Image from 'next/image';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export type Facility = {
  key: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  tag: string;
};

export default function FacilitiesGrid({ items }: { items: Facility[] }) {
  return (
    <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
      {items.map((f, i) => (
        <Reveal key={f.key} delay={0.05 + i * 0.05}>
          <li className="group h-full rounded-2xl overflow-hidden border border-ink-200/80 bg-white hover:border-ink-900/20 hover:shadow-[0_25px_50px_-25px_rgba(8,8,7,0.2)] transition-all duration-500">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
              <Image
                src={f.image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent"
                aria-hidden
              />
              <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm text-ink-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                <span className="font-mono tabular-nums">0{i + 1}</span>
                · {f.tag}
              </span>
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-white font-display font-medium text-xl md:text-2xl leading-tight">
                  {f.name}
                </h3>
              </div>
            </div>

            <div className="p-5 md:p-6 flex flex-col gap-3">
              <p className="flex items-start gap-2 text-sm text-ink-600 leading-relaxed">
                <MapPin className="h-3.5 w-3.5 text-ink-400 mt-1 flex-shrink-0" />
                <span>{f.address}</span>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Phone className="h-3.5 w-3.5 text-ink-400" />
                <a
                  href={`tel:${f.phone.replace(/\s+/g, '')}`}
                  className="font-mono tabular-nums text-ink-900 hover:text-brand-800 transition-colors"
                >
                  {f.phone}
                </a>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Mail className="h-3.5 w-3.5 text-ink-400" />
                <a
                  href={`mailto:${f.email}`}
                  className="font-semibold text-ink-900 hover:text-brand-800 transition-colors truncate"
                >
                  {f.email}
                </a>
              </p>
              <a
                href={`mailto:${f.email}`}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 group-hover:text-brand-800 transition-colors"
              >
                Email this base
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
