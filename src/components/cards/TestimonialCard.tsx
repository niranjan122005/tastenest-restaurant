import { Photo } from "../common/Photo";
import type { Testimonial } from "../../data/people";
import { Stars } from "../ui/Stars";

/** Cream rounded card with the quote on the left and the customer photo overlapping on the right. */
export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="relative flex min-h-[250px] items-end overflow-visible rounded-[2.5rem] rounded-tl-[4.5rem] bg-brand-cream pb-5 pl-5 pr-[50%] pt-16 sm:pl-8">
      <svg className="absolute left-6 top-5 text-brand-red" width="34" height="30" viewBox="0 0 34 30" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M13 15H5c0-6 2-9 8-10M31 15h-8c0-6 2-9 8-10" strokeLinecap="round" />
        <path d="M5 15v9h8v-9M23 15v9h8v-9" strokeLinejoin="round" />
      </svg>
      <div>
        <blockquote className="text-[0.75rem] leading-relaxed text-neutral-700 sm:text-sm">“{t.quote}”</blockquote>
        <div className={`mt-4 inline-flex flex-col rounded-tl-3xl rounded-br-3xl bg-brand-pink px-5 py-2 text-white`}>
          <span className="font-display text-sm font-bold leading-tight">{t.name}</span>
          <span className="text-[0.6rem] opacity-90">{t.company}</span>
          <Stars value={5} size={11} className="mt-0.5" />
        </div>
      </div>
      <Photo src={t.photo} fallback={t.image} alt={t.name} className="absolute -top-10 bottom-0 right-4 h-[calc(100%+2.5rem)] w-[40%] rounded-t-[999px] rounded-b-2xl object-cover object-top shadow-lg sm:right-6" />
    </article>
  );
}
