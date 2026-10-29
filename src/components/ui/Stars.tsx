/** Rating stars (supports halves). Purely presentational. */
export function Stars({ value, size = 12, className = "" }: { value: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        const gid = `star-${i}-${Math.round(fill * 100)}`;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
            <defs>
              <linearGradient id={gid}>
                <stop offset={`${fill * 100}%`} stopColor="#f7941d" />
                <stop offset={`${fill * 100}%`} stopColor="#d9d2bf" />
              </linearGradient>
            </defs>
            <path fill={`url(#${gid})`} d="m10 1.500 2.600 5.400 5.900.8-4.300 4.100 1 5.800L10 14.800 4.800 17.600l1-5.800L1.500 7.700l5.900-.8L10 1.500Z" />
          </svg>
        );
      })}
    </span>
  );
}
