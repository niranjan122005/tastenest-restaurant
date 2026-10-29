import { Link } from "../../router";

/** Cream hero strip used by every inner page: title + breadcrumb + egg/drumstick doodles. */
export function PageBanner({ title, crumb }: { title: string; crumb?: string }) {
  return (
    <section className="relative overflow-hidden bg-brand-cream">
      <img src="/images/decor/banner-wings.svg" alt="" className="absolute left-0 top-3 w-12 sm:w-16 md:w-20" />
      <div className="mx-auto flex min-h-[150px] max-w-7xl items-center px-4 py-8 sm:min-h-[200px] md:min-h-[260px] md:px-8">
        <div className="relative z-10 pl-2 sm:pl-10 md:pl-24">
          <h1 className="font-display text-3xl font-bold leading-none sm:text-4xl md:text-5xl">{title}</h1>
          <p className="mt-2 text-[0.7rem] font-medium sm:text-xs">
            <Link to="/" className="text-brand-red hover:underline">Home</Link>
            <span className="mx-1 text-neutral-500">/</span>
            <span className="text-neutral-700">{crumb ?? title}</span>
          </p>
        </div>
      </div>
      <img
        src="/images/decor/banner-egg.svg"
        alt=""
        className="pointer-events-none absolute -right-6 top-1/2 w-[58%] max-w-[560px] -translate-y-1/2 select-none sm:right-4 sm:w-[42%] md:right-16 md:w-[34%]"
      />
      {/* Hand-drawn swirl */}
      <svg className="absolute left-[28%] top-8 hidden w-28 text-white sm:block md:w-40" viewBox="0 0 160 60" fill="none" aria-hidden="true">
        <path d="M5 48C40 34 60 34 98 28c28-4 44-4 50-20M120 8l28 2-8 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </section>
  );
}
