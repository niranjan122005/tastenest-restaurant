import { useMemo, useState } from "react";
import { FOODS, type Food } from "../data/foods";
import { ProductCard } from "../components/cards/FoodCard";
import { Pagination } from "../components/ui/Pagination";
import { PageBanner } from "../components/ui/PageBanner";

const PAGE_SIZE = 12;
const SORTS: Record<string, { label: string; fn: (a: Food, b: Food) => number }> = {
  default: { label: "Default sorting", fn: () => 0 },
  priceAsc: { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  priceDesc: { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  rating: { label: "Sort by rating", fn: (a, b) => b.rating - a.rating },
  name: { label: "Sort by name", fn: (a, b) => a.name.localeCompare(b.name) },
};
type SortKey = string;

export default function Shop() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => [...FOODS].sort(SORTS[sort].fn), [sort]);
  const pages = Math.ceil(sorted.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visible = sorted.slice(start, start + PAGE_SIZE);

  return (
    <>
      <PageBanner title="Shop" />
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <div className="flex flex-col gap-3 rounded-2xl bg-brand-cream px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.7rem] text-brand-pink" data-testid="shop-count">Showing {start + 1}–{start + visible.length} of {sorted.length} results</p>
          <label className="flex items-center">
            <span className="sr-only">Sort products</span>
            <select value={sort} onChange={(e) => { setSort(e.target.value as SortKey); setPage(1); }} className="w-full rounded-full bg-white px-4 py-2 text-[0.7rem] outline-none focus:ring-2 focus:ring-brand-red/40 sm:w-44">
              {(Object.keys(SORTS) as SortKey[]).map((k) => <option key={k} value={k}>{SORTS[k].label}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {visible.map((f) => <ProductCard key={f.id} food={f} />)}
        </div>
        <Pagination page={page} pages={pages} onChange={(p) => { setPage(p); window.scrollTo({ top: 250, behavior: "smooth" }); }} />
      </section>
    </>
  );
}
