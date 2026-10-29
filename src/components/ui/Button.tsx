import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "../../router";

type Variant = "brush" | "dark" | "pill" | "pink" | "outline";

const VARIANTS: Record<Variant, string> = {
  brush: "shape-brush bg-brand-red px-6 py-3 text-xs tracking-wide text-white hover:bg-red-700",
  dark: "rounded-full bg-ink px-7 py-3 text-xs tracking-wide text-white hover:bg-neutral-700",
  pill: "rounded-full bg-brand-red px-6 py-3 text-xs tracking-wide text-white hover:bg-red-700",
  pink: "rounded-full bg-brand-pink px-6 py-3 text-xs tracking-wide text-white hover:bg-rose-600",
  outline: "rounded-full border border-ink px-6 py-3 text-xs tracking-wide text-ink hover:bg-ink hover:text-white",
};

interface Common { variant?: Variant; className?: string; children: ReactNode }
type AsLink = Common & { to: string; onClick?: () => void };
type AsButton = Common & { to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

/** One button for the whole site: renders a <Link> when `to` is given, otherwise a <button>. */
export function Button(props: AsLink | AsButton) {
  const { variant = "pill", className = "", children } = props;
  const classes = `inline-flex items-center justify-center gap-2 font-display text-[0.8rem] font-bold uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`;
  if (props.to !== undefined) {
    return <Link to={props.to} onClick={props.onClick} className={classes}>{children}</Link>;
  }
  const { variant: _v, className: _c, children: _ch, to: _t, ...rest } = props;
  return <button type="button" className={classes} {...rest}>{children}</button>;
}
