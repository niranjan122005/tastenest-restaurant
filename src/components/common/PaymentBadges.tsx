/** Generic card-scheme badges for the footer (drawn in SVG so no logos need to be hot-linked). */
export function PaymentBadges() {
  return (
    <div className="flex items-center gap-1.5" aria-label="Accepted payment cards">
      <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-extrabold italic leading-4 text-[#1a1f71]">VISA</span>
      <span className="flex h-5 w-8 items-center justify-center rounded bg-white" aria-label="Mastercard">
        <span className="h-3 w-3 rounded-full bg-[#eb001b]" />
        <span className="-ml-1.5 h-3 w-3 rounded-full bg-[#f79e1b]/90" />
      </span>
      <span className="rounded bg-[#2e77bc] px-1.5 py-0.5 text-[9px] font-bold leading-4 text-white">AMEX</span>
      <span className="rounded bg-white px-1.5 py-0.5 text-[9px] font-bold leading-4 text-[#003087]">Pay</span>
    </div>
  );
}
