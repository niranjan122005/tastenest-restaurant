import { FEATURED_TESTIMONIALS } from "../data/people";
import { TestimonialCard } from "../components/cards/TestimonialCard";
import { PageBanner } from "../components/ui/PageBanner";
import { SectionTitle } from "../components/ui/SectionTitle";
import { ReviewsSection } from "../components/sections/ReviewsSection";

export default function Testimonials() {
  return (
    <>
      <PageBanner title="Testimonials" />
      <section className="relative mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
        <img src="/images/decor/tomato-basil.svg" alt="" className="pointer-events-none absolute -top-2 right-2 hidden w-24 sm:block" />
        <SectionTitle eyebrow="Testimonials" title="Our customers" accent="feedback" />
        <div className="mt-20 grid gap-x-8 gap-y-24 md:grid-cols-2">
          {FEATURED_TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </section>
      <ReviewsSection />
    </>
  );
}
