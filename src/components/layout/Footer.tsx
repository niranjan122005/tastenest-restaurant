import type { ReactNode } from "react";
import { Link } from "../../router";
import { PHOTO, unsplash } from "../../data/photos";
import { Photo } from "../common/Photo";
import { CONTACT } from "../../data/site";
import { Logo } from "../common/Logo";
import { PaymentBadges } from "../common/PaymentBadges";
import { StoreBadges } from "../common/StoreBadges";

function FooterCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-brand-yellow bg-brand-pink px-5 py-5 text-center text-white shadow-[0_3px_0_0_#ffc20e] sm:py-6">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <div className="mx-auto mt-1 flex w-14 items-center justify-center gap-1 text-brand-yellow" aria-hidden="true">
        <span className="h-px w-3 bg-current" /><span className="h-1.5 w-1.5 rotate-45 bg-current" /><span className="h-px w-3 bg-current" />
      </div>
      <div className="mt-3 text-[0.72rem] leading-relaxed sm:text-xs">{children}</div>
    </section>
  );
}

const QUICK_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Our Service", to: "/menu" },
  { label: "Latest Blog", to: "/blog" },
  { label: "Our Shop", to: "/shop" },
  { label: "Contact Us", to: "/contact" },
  { label: "Reservation", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-0 overflow-hidden bg-brand-cream">
      {/* decorative wheat + pizza on a wooden board */}
      <svg className="absolute right-6 top-6 hidden w-14 text-brand-orange/70 sm:block md:right-24" viewBox="0 0 60 90" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
        <path d="M30 88V12M30 70c-10-2-16-8-18-16 10 0 16 6 18 16Zm0 0c10-2 16-8 18-16-10 0-16 6-18 16ZM30 48c-9-2-14-8-16-15 9 0 14 5 16 15Zm0 0c9-2 14-8 16-15-9 0-14 5-16 15ZM30 28c-6-3-9-8-10-14 6 2 9 6 10 14Zm0 0c6-3 9-8 10-14-6 2-9 6-10 14Z" />
      </svg>
      <div className="pointer-events-none absolute -bottom-24 -left-24 hidden h-72 w-72 rounded-full border-[14px] border-[#8a4b24] bg-[#a65f30] shadow-2xl md:block lg:-left-16 lg:h-80 lg:w-80" aria-hidden="true">
        <Photo src={unsplash(PHOTO.boardPizza, 700)} fallback="/images/foods/hero-pizza.png" className="h-full w-full rounded-full object-cover" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 md:px-8 md:pt-20">
        <h2 className="text-center font-display text-4xl font-bold text-brand-green sm:text-5xl md:text-6xl">Let’s Talk With Us</h2>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:mt-12 md:grid-cols-3">
          <FooterCard title="Contact Info">
            <p>Phone: {CONTACT.phone2} &nbsp;+1812345678</p>
            <p>Email: {CONTACT.email.replace("tastenest", "example")}</p>
          </FooterCard>
          <FooterCard title="Quick Links">
            <ul className="mx-auto grid max-w-[16rem] grid-cols-2 gap-x-3 gap-y-0.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}><Link to={l.to} className="hover:text-brand-yellow">{l.label}</Link></li>
              ))}
            </ul>
          </FooterCard>
          <FooterCard title="Download"><StoreBadges /></FooterCard>
        </div>
      </div>

      <div className="relative flex flex-col items-stretch md:grid md:grid-cols-[1fr_auto_1fr] md:items-end">
        <div className="order-2 bg-brand-pink px-4 py-3 text-center text-[0.7rem] text-white md:order-none md:text-left md:pl-24 lg:pl-40">Copyright TasteNest 2025</div>
        <div className="order-1 -mb-px mx-auto rounded-t-[50%_100%] bg-white px-14 pb-2 pt-3 md:order-none md:mx-0"><Logo /></div>
        <div className="order-3 flex justify-center bg-brand-pink px-4 py-2.5 md:order-none md:justify-end md:pr-12"><PaymentBadges /></div>
      </div>
    </footer>
  );
}
