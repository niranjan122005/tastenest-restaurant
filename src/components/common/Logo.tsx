import { Link } from "../../router";

/** TasteNest brand logo (transparent PNG, shown at 2x for crisp edges). */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" aria-label="TasteNest home" className={`inline-flex items-center leading-none ${className}`}>
      <img src="/images/logo.png" alt="TasteNest – Good food, happy mood" width={1328} height={969} className="h-14 w-auto max-w-none shrink-0 md:h-[4.25rem]" />
    </Link>
  );
}
