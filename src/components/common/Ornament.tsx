/** The green diamond / dot divider shown under section headings. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 14" className={`mx-auto h-3.5 w-44 text-brand-green ${className}`} aria-hidden="true">
      <g fill="currentColor">
        <circle cx="3" cy="7" r="1.6" />
        <path d="m18 7 5-5.500L28 7l-5 5.500Z" />
        <circle cx="100" cy="7" r="4.200" fill="none" stroke="currentColor" strokeWidth="1.600" />
        <circle cx="100" cy="7" r="1.800" />
        <path d="m172 7 5-5.500L182 7l-5 5.500Z" />
        <circle cx="197" cy="7" r="1.600" />
      </g>
      <g stroke="currentColor" strokeWidth="1" opacity=".55">
        <path d="M30 7h60M110 7h60" />
      </g>
    </svg>
  );
}
