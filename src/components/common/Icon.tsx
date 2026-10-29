import type { SVGProps } from "react";

/** Minimal 24×24 stroke icon set. Add a path here and use <Icon name="…" />. */
const PATHS = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  cart: <><path d="M3 4h2.2l2 11h10.6l1.8-8H6.2" /><circle cx="9.5" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></>,
  user: <><circle cx="12" cy="8" r="3.8" /><path d="M4.5 20c.8-4 3.7-6 7.5-6s6.7 2 7.5 6" /></>,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m4 7.5 8 6 8-6" /></>,
  pin: <><path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21Z" /><circle cx="12" cy="10" r="2.4" /></>,
  phone: <path d="M5 4h3.5l1.6 4-2 1.3a11 11 0 0 0 5.6 5.6l1.3-2 4 1.6V18a2 2 0 0 1-2.2 2C10.6 19.4 4.6 13.4 4 6.2A2 2 0 0 1 5 4Z" />,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />,
  arrowRight: <path d="M5 12h14m-5-5 5 5-5 5" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  pencil: <path d="m4 20 4.2-1 10-10a2 2 0 0 0-2.8-2.8l-10 10L4 20Z" />,
  trash: <path d="M5 7h14M10 7V4.5h4V7m-7 0 1 12.5h8L17 7" />,
  facebook: <path d="M14 8.5h2V5h-2.6C10.9 5 10 6.6 10 8.4V10H8v3.2h2V20h3.2v-6.8H16l.5-3.2h-3.3v-1.3c0-.5.3-.7.8-.7Z" />,
  twitter: <path d="M5 5l5.6 7.3L5.2 19h1.7l4.5-5.3L15.3 19H19l-5.9-7.7L18.2 5h-1.7l-4.2 4.9L8.7 5H5Z" />,
  linkedin: <><path d="M6.5 10v8M6.5 6.5v.1M10.5 18v-8m0 3.2c0-2 1.2-3.2 3-3.2s2.5 1.2 2.5 3.2V18" /></>,
  instagram: <><rect x="5" y="5" width="14" height="14" rx="4" /><circle cx="12" cy="12" r="3.2" /><circle cx="16.2" cy="7.8" r=".6" /></>,
} as const;

export type IconName = keyof typeof PATHS;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
