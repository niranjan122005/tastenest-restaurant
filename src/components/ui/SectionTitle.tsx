import { Ornament } from "../common/Ornament";

interface Props {
  eyebrow?: string;
  /** Plain part of the heading. */
  title: string;
  /** Coloured (red) last word(s) of the heading. */
  accent?: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ eyebrow, title, accent, subtitle, className = "" }: Props) {
  return (
    <div className={`text-center ${className}`}>
      {eyebrow && (
        <p className="flex items-center justify-center gap-2 font-display text-[0.7rem] font-bold uppercase tracking-wider text-brand-orange">
          <span className="h-px w-5 bg-brand-orange" aria-hidden="true" />
          {eyebrow}
          <span className="h-px w-5 bg-brand-orange" aria-hidden="true" />
        </p>
      )}
      <h2 className="mt-1 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
        {title} {accent && <span className="text-brand-red">{accent}</span>}
      </h2>
      <Ornament className="mt-2" />
      {subtitle && <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-neutral-500 sm:text-sm">{subtitle}</p>}
    </div>
  );
}
