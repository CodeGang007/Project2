import Image from 'next/image';
import { MapPin, Calendar, Tag } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export type CommunityProject = {
  title: string;
  location: string;
  year: string;
  impact: string;
  body: string;
  image: string;
  tag: string;
};

export default function CommunityProjects({
  items,
  impactLabel = 'Impact'
}: {
  items: CommunityProject[];
  impactLabel?: string;
}) {
  return (
    <ul className="space-y-10 md:space-y-14">
      {items.map((project, i) => {
        const flipped = i % 2 === 1;
        return (
          <Reveal key={project.title} delay={0.05 + i * 0.05}>
            <li
              className={`group grid lg:grid-cols-12 gap-y-8 lg:gap-x-14 items-center ${
                flipped ? 'lg:[direction:rtl]' : ''
              }`}
            >
              <div className="lg:col-span-7 [direction:ltr]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-900">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent"
                    aria-hidden
                  />
                  <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm text-ink-900 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em]">
                    <Tag className="h-3 w-3" />
                    {project.tag}
                  </span>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
                    <p className="text-xs font-mono uppercase tracking-[0.22em] text-white/75 inline-flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </p>
                    <p className="text-xs font-mono uppercase tracking-[0.22em] text-white/75 inline-flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {project.year}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 [direction:ltr]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                  {impactLabel}
                </p>
                <p className="mt-2 font-display font-medium text-3xl md:text-4xl bg-gradient-to-br from-ink-900 to-ink-600 bg-clip-text text-transparent tabular-nums">
                  {project.impact}
                </p>
                <h3 className="mt-5 h-display text-2xl md:text-3xl leading-snug">
                  {project.title}
                </h3>
                <p className="mt-3 text-base text-ink-600 leading-relaxed">{project.body}</p>
              </div>
            </li>
          </Reveal>
        );
      })}
    </ul>
  );
}
