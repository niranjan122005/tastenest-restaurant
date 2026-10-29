import { useMemo, useState } from "react";
import { BLOG_CATEGORIES, POSTS, type BlogCategory } from "../data/blog";
import { BlogCard } from "../components/cards/BlogCard";
import { Icon } from "../components/common/Icon";
import { Pagination } from "../components/ui/Pagination";
import { PageBanner } from "../components/ui/PageBanner";
import { SectionTitle } from "../components/ui/SectionTitle";

const PAGE_SIZE = 6;

export default function Blog() {
  const [category, setCategory] = useState<BlogCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((p) => (category === "All" || p.category === category) && (!q || `${p.title} ${p.excerpt}`.toLowerCase().includes(q)));
  }, [category, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const chip = (active: boolean) => `shrink-0 rounded-full px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wide transition-colors ${active ? "bg-brand-red text-white" : "bg-brand-cream text-ink hover:bg-brand-tan"}`;

  return (
    <>
      <PageBanner title="Blog" />
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
        <SectionTitle eyebrow="Latest news" title="Stories from our" accent="kitchen" subtitle="Recipes, tips and news from the TasteNest team." />

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="tablist" aria-label="Blog categories" className="scrollbar-none flex gap-2 overflow-x-auto py-1">
            {(["All", ...BLOG_CATEGORIES] as const).map((c) => (
              <button key={c} role="tab" aria-selected={category === c} onClick={() => { setCategory(c); setPage(1); }} className={chip(category === c)}>{c}</button>
            ))}
          </div>
          <label className="relative block md:w-64">
            <span className="sr-only">Search posts</span>
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search posts…" className="w-full rounded-full bg-brand-cream py-2.5 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-brand-red/40" />
          </label>
        </div>

        {visible.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="blog-grid">
            {visible.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        ) : (
          <p className="mt-16 text-center text-sm text-neutral-500">No posts match your search. Try another keyword or category.</p>
        )}
        <Pagination page={page} pages={pages} onChange={(n) => { setPage(n); window.scrollTo({ top: 300, behavior: "smooth" }); }} />
      </section>
    </>
  );
}
