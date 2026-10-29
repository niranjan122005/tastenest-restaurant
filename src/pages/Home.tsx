import { HOME_CATEGORIES } from "../data/site";
import { PHOTO, unsplash } from "../data/photos";
import { Photo } from "../components/common/Photo";
import { Link } from "../router";
import { Button } from "../components/ui/Button";
import { SectionTitle } from "../components/ui/SectionTitle";
import { FoodsSection } from "../components/sections/FoodsSection";
import { ReviewsSection } from "../components/sections/ReviewsSection";

/** Round red "Order your burger" sticker with text running around the circle. */
function OrderBadge() {
  return (
    <Link to="/shop" aria-label="Order your burger" className="group absolute bottom-[8%] right-[6%] z-20 block w-20 sm:w-24 md:right-[16%] md:w-28">
      <svg viewBox="0 0 120 120" className="animate-[spin_24s_linear_infinite] drop-shadow-lg group-hover:[animation-play-state:paused]">
        <circle cx="60" cy="60" r="58" fill="#f3294e" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="#fff" strokeWidth="1.500" strokeDasharray="3 4" />
        <defs><path id="badge-circle" d="M60 60m-40 0a40 40 0 1 1 80 0a40 40 0 1 1-80 0" /></defs>
        <text fill="#fff" fontSize="10" fontWeight="700" letterSpacing="3" fontFamily="Barlow Condensed, sans-serif"><textPath href="#badge-circle">ORDER YOUR BURGER • ORDER YOUR BURGER •</textPath></text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold uppercase leading-none text-white sm:text-base">Order<br />Now</span>
    </Link>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream">
      <img src="/images/decor/hero-tomato.png" alt="" className="pointer-events-none absolute right-2 top-12 z-10 w-16 drop-shadow-lg sm:w-24 md:right-[6%] md:top-40 md:w-32" />
      <img src="/images/decor/hero-plate.png" alt="Burger, fries and dips on a wooden board" className="pointer-events-none absolute -left-4 top-[36%] z-10 w-28 drop-shadow-2xl sm:w-40 md:left-[3%] md:top-[28%] md:w-[19%] md:max-w-[280px]" />
      <div className="mx-auto max-w-7xl px-4 pt-10 text-center md:px-8 md:pt-14">
        <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-red">Fast food restaurant</p>
        <h1 className="select-none font-display text-[clamp(1.8rem,8vw,6.5rem)] font-extrabold uppercase leading-[0.88] tracking-tight text-[#e6dbbb]">
          Delicious Fast Food<br />Is Today
        </h1>
      </div>
      <div className="relative mx-auto -mt-[2vw] w-full max-w-[760px] sm:-mt-[7vw] md:-mt-[6vw] lg:-mt-12">
        <img src="/images/decor/hero-chef.png" alt="Chef sprinkling herbs over a fresh pizza" width={1079} height={1249} className="relative z-10 mx-auto w-[66%] max-w-[440px] drop-shadow-2xl" />
        <OrderBadge />
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
      <SectionTitle eyebrow="Our category" title="Browse fast foods" accent="category" />
      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {HOME_CATEGORIES.map((c) => (
          <li key={c.name}>
            <Link to="/menu" className="group flex h-full flex-col items-center rounded-t-[999px] rounded-b-2xl bg-brand-cream px-3 pb-6 pt-10 text-center transition hover:-translate-y-1 hover:bg-brand-peach/70">
              <Photo src={c.photo} fallback={c.icon} className="h-20 w-20 rounded-full object-cover shadow-md ring-2 ring-white transition-transform group-hover:scale-110" />
              <h3 className="mt-4 font-display text-sm font-bold leading-tight">{c.name}</h3>
              <p className="mt-0.5 text-[0.65rem] text-neutral-500">{c.items} Items Available</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Invite() {
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pb-14 md:grid-cols-2 md:gap-12 md:px-8 md:pb-20">
      <Photo src={unsplash(PHOTO.woodPizza, 1000)} fallback="/images/decor/pizza-dumplings.png" alt="Freshly baked pizza on a wooden board" className="mx-auto aspect-square w-full max-w-md rounded-full object-cover shadow-2xl ring-8 ring-brand-cream" />
      <div>
        <p className="font-display text-[0.7rem] font-bold uppercase tracking-wider text-brand-orange">About our restaurant</p>
        <h2 className="mt-1 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">We invite you to visit our <span className="text-brand-red">fast food restaurant</span></h2>
        <p className="mt-4 max-w-lg text-xs leading-relaxed text-neutral-600 sm:text-sm">At the heart of our kitchen are bold flavors, high-quality ingredients, and a commitment to consistency. From juicy burgers, crispy fries, and cheesy pizzas to spicy wraps and refreshing drinks, every item on our menu is made to order and packed with taste.</p>
        <p className="mt-5 font-display text-base font-bold leading-tight">Parvez Hossain Imon</p>
        <p className="text-xs text-neutral-500">Restaurant owner</p>
        <Button to="/contact" variant="brush" className="mt-5">Visit our restaurant</Button>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Invite />
      <FoodsSection className="pt-0 md:pt-0" />
      <ReviewsSection />
    </>
  );
}
