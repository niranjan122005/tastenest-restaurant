import { useState } from "react";
import { Link, useRouter } from "../../router";
import { NAV, type NavItem } from "../../data/site";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import { useRequireLogin } from "../../hooks/useRequireLogin";
import { Icon } from "../common/Icon";
import { Logo } from "../common/Logo";
import { Button } from "../ui/Button";

const isActive = (item: NavItem, path: string) =>
  item.to === "/" ? path === "/" : path === item.to || path.startsWith(`${item.to}/`) || !!item.children?.some((c) => path === c.to);

function DesktopNav() {
  const { path } = useRouter();
  /** Label of the dropdown that is currently open (hover / keyboard focus). Clicking a link closes it. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  return (
    <nav aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-3 lg:gap-8">
        {NAV.map((item) => {
          const open = openMenu === item.label;
          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
              onFocus={() => item.children && setOpenMenu(item.label)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpenMenu(null); }}
            >
              <Link
                to={item.to}
                aria-current={isActive(item, path) ? "page" : undefined}
                aria-haspopup={item.children ? "menu" : undefined}
                aria-expanded={item.children ? open : undefined}
                onClick={() => { setOpenMenu(null); (document.activeElement as HTMLElement | null)?.blur(); }}
                className={`flex items-center gap-0.5 py-6 font-display text-[0.8rem] font-bold uppercase tracking-wide transition-colors hover:text-brand-red ${isActive(item, path) ? "text-brand-red" : "text-ink"}`}
              >
                {item.label}
                {item.children && <Icon name="chevronDown" size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />}
              </Link>
              {item.children && (
                <ul className={`absolute left-1/2 top-full z-40 w-44 -translate-x-1/2 rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5 transition ${open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"}`}>
                  {item.children.map((c) => (
                    <li key={c.to}>
                      <Link to={c.to} onClick={() => { setOpenMenu(null); (document.activeElement as HTMLElement | null)?.blur(); }} className="block px-4 py-2 font-display text-sm font-semibold uppercase hover:bg-brand-cream hover:text-brand-red">{c.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileNav() {
  const { open, close, panel } = useUI();
  const requireLogin = useRequireLogin();
  const { path } = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  if (panel !== "menu") return null;
  return (
    <nav aria-label="Mobile" className="border-t border-black/5 bg-white px-4 pb-5 xl:hidden">
      <ul>
        {NAV.map((item) => (
          <li key={item.label} className="border-b border-black/5">
            <div className="flex items-center justify-between">
              <Link to={item.to} onClick={close} className={`flex-1 py-3 font-display text-base font-bold uppercase ${isActive(item, path) ? "text-brand-red" : ""}`}>{item.label}</Link>
              {item.children && (
                <button aria-label={`Toggle ${item.label} submenu`} aria-expanded={expanded === item.label} onClick={() => setExpanded(expanded === item.label ? null : item.label)} className="p-3">
                  <Icon name="chevronDown" size={16} className={`transition-transform ${expanded === item.label ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
            {item.children && expanded === item.label && (
              <ul className="mb-2 ml-3 border-l-2 border-brand-tan pl-3">
                {item.children.map((c) => (
                  <li key={c.to}><Link to={c.to} onClick={close} className="block py-2 text-sm font-medium text-neutral-700 hover:text-brand-red">{c.label}</Link></li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <Button variant="brush" className="mt-4 w-full" onClick={() => { close(); setTimeout(() => { if (requireLogin("reserve", "reserve a table")) open("reserve"); }, 0); }}>Reserve a table</Button>
    </nav>
  );
}

export function Header() {
  const { count } = useCart();
  const { open, close, panel, notify } = useUI();
  const { user, logout } = useAuth();
  const requireLogin = useRequireLogin();
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
        <div className="shrink-0 py-3"><Logo /></div>
        <DesktopNav />
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={() => open("search")} aria-label="Search" className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 transition hover:border-brand-red hover:text-brand-red">
            <Icon name="search" size={16} />
          </button>
          {user && (
            <button onClick={() => { logout(); notify("You have been logged out"); }} aria-label={`Log out ${user}`} title={`Log out (${user})`} className="flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-black/15 px-3 font-display text-xs font-bold uppercase transition hover:border-brand-red hover:text-brand-red">
              <Icon name="user" size={14} className="hidden sm:block" /><span className="hidden max-w-20 truncate sm:inline">{user}</span><span className="text-brand-red">Log out</span>
            </button>
          )}
          <button onClick={() => open("cart")} aria-label={`Open cart, ${count} items`} className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/15 transition hover:border-brand-red hover:text-brand-red">
            <Icon name="cart" size={16} />
            <span data-testid="cart-count" className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[0.6rem] font-bold text-white">{count}</span>
          </button>
          <span className="hidden xl:block"><Button variant="brush" onClick={() => { if (requireLogin("reserve", "reserve a table")) open("reserve"); }}>Reserve a table</Button></span>
          <button onClick={() => (panel === "menu" ? close() : open("menu"))} aria-label="Toggle menu" aria-expanded={panel === "menu"} className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 xl:hidden">
            <Icon name={panel === "menu" ? "close" : "menu"} size={18} />
          </button>
        </div>
      </div>
      <MobileNav />
    </header>
  );
}
