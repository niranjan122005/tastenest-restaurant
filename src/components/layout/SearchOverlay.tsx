import { Photo } from "../common/Photo";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "../../router";
import { FOODS, formatPrice } from "../../data/foods";
import { useUI } from "../../context/UIContext";
import { useEscape } from "../../hooks/useEscape";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { Icon } from "../common/Icon";

export function SearchOverlay() {
  const { panel, close } = useUI();
  const open = panel === "search";
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEscape(open, close);
  useLockBodyScroll(open);
  useEffect(() => {
    if (open) { setQuery(""); setTimeout(() => input.current?.focus(), 50); }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return FOODS.filter((f) => `${f.name} ${f.category} ${f.description}`.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 px-4 pt-20" onClick={close}>
      <div role="dialog" aria-modal="true" aria-label="Search" onClick={(e) => e.stopPropagation()} className="mx-auto max-w-xl rounded-2xl bg-white p-4 shadow-2xl">
        <div className="relative">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input ref={input} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pizza, burger, chicken…" aria-label="Search the menu" className="w-full rounded-xl bg-brand-cream py-3 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-brand-red/50" />
          <button onClick={close} aria-label="Close search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 hover:bg-white"><Icon name="close" size={16} /></button>
        </div>
        <ul className="mt-3 max-h-[55vh] overflow-y-auto" data-testid="search-results">
          {results.map((f) => (
            <li key={f.id}>
              <Link to={`/product/${f.id}`} onClick={close} className="flex items-center gap-3 rounded-xl p-2 hover:bg-brand-cream">
                <Photo src={f.photo} fallback={f.image} className="h-12 w-12 rounded-lg object-cover" />
                <span className="flex-1"><span className="block font-display text-base font-bold leading-tight">{f.name}</span><span className="text-xs text-neutral-500">{f.category}</span></span>
                <span className="font-display font-bold text-brand-red">{formatPrice(f.price)}</span>
              </Link>
            </li>
          ))}
          {query.trim() && results.length === 0 && <li className="p-4 text-center text-sm text-neutral-500">No dishes match “{query}”.</li>}
          {!query.trim() && <li className="p-4 text-center text-sm text-neutral-500">Start typing to find your favourite dish.</li>}
        </ul>
      </div>
    </div>
  );
}
