import { useState } from "react";
import { PHOTO, unsplash } from "../../data/photos";
import { Photo } from "../common/Photo";
import { REVIEWS } from "../../data/people";
import { Icon } from "../common/Icon";
import { Stars } from "../ui/Stars";

const pad = (n: number) => String(n).padStart(2, "0");

/** "Customer feedback & reviews" – photo collage on the left, quote slider on the right. */
export function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const review = REVIEWS[index];
  const go = (n: number) => setIndex((n + REVIEWS.length) % REVIEWS.length);

  return (
    <section className="relative overflow-hidden bg-brand-cream py-14 md:py-20">
      <img src="/images/decor/hero-tomato.png" alt="" className="pointer-events-none absolute right-2 top-4 w-20 opacity-90 md:right-24 md:w-28" />
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center">
          <p className="flex items-center justify-center gap-2 font-display text-[0.7rem] font-bold uppercase tracking-wider text-brand-orange">
            <span className="h-px w-5 bg-brand-orange" />Testimonials<span className="h-px w-5 bg-brand-orange" />
          </p>
          <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">Customer feedback <span className="text-brand-red">&amp; reviews</span></h2>
          <p className="mx-auto mt-2 max-w-md text-[0.7rem] text-neutral-500 sm:text-xs">The concept of “quick food” actually dates back to ancient civilizations, where street vendors and food stalls offered simple.</p>
        </div>

        <div className="mt-10 grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <div className="relative mx-auto w-full max-w-md">
            <Photo src={unsplash(PHOTO.eatingPizza, 900)} fallback="/images/people/eating-pizza.jpg" alt="Customer enjoying a slice of pizza" className="aspect-[4/3] w-full rounded-tr-[3rem] rounded-bl-[3rem] object-cover shadow-lg" />
            <span className="absolute left-[76%] top-0 flex aspect-square w-[20%] items-center justify-center rounded-full border-2 border-brand-red bg-white font-display text-3xl font-bold text-brand-red">”</span>
          </div>

          <div className="min-h-[15rem]">
            <Stars value={5} size={13} />
            <blockquote key={index} className="mt-3 animate-[fade_.4s_ease] text-sm leading-relaxed text-neutral-700" data-testid="review-quote">“{review.quote}”</blockquote>
            <p className="mt-5 font-display text-lg font-bold leading-tight">By {review.author}</p>
            <p className="text-xs text-brand-red">{review.role}</p>

            <div className="mt-5 flex items-center gap-3">
              <span className="font-display text-xl font-bold" aria-live="polite" data-testid="review-counter">{pad(index + 1)}<span className="text-xs font-medium text-neutral-500"> /{pad(REVIEWS.length)}</span></span>
              <span className="h-px w-16 bg-neutral-300" />
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose review">
                {REVIEWS.map((r, i) => (
                  <button key={r.author} role="tab" aria-selected={i === index} aria-label={`Review ${i + 1}`} onClick={() => setIndex(i)} className={`h-2 rounded-full transition-all ${i === index ? "w-5 bg-brand-pink" : "w-2 bg-neutral-300 hover:bg-neutral-400"}`} />
                ))}
              </div>
              <div className="ml-auto flex gap-1.5">
                <button onClick={() => go(index - 1)} aria-label="Previous review" className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-brand-pink hover:text-white"><Icon name="chevronLeft" size={16} /></button>
                <button onClick={() => go(index + 1)} aria-label="Next review" className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-brand-pink hover:text-white"><Icon name="chevronRight" size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
