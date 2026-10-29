import { Photo } from "../components/common/Photo";
import { useState } from "react";
import { FOODS, formatPrice, getFood } from "../data/foods";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";
import { Link } from "../router";
import { ProductCard } from "../components/cards/FoodCard";
import { Icon } from "../components/common/Icon";
import { Button } from "../components/ui/Button";
import { PageBanner } from "../components/ui/PageBanner";
import { QuantityInput } from "../components/ui/QuantityInput";
import { Stars } from "../components/ui/Stars";
import NotFound from "./NotFound";

type Tab = "description" | "reviews";

const DESCRIPTION = [
  "Welcome to Tastenest, where culinary meets exceptional service. Our restaurant is a haven for food lovers seeking an elevated dining experience. Immerse yourself in a sophisticated and inviting ambiance. The carefully curated décor sets the stage for intimate dinners, celebrations, and memorable moments shared with friends and family.",
  "From crispy and golden fries to mouthwatering burgers and wraps, our menu offers a variety of flavors. Each item is crafted with quality ingredients, and a commitment to freshness. Whether you're grabbing a quick bite or stopping by for a casual meal, our welcoming atmosphere makes every visit enjoyable.",
];

export default function ProductDetails({ id }: { id: string }) {
  const food = getFood(id);
  const { add } = useCart();
  const { notify } = useUI();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("description");
  const [wished, setWished] = useState(false);

  if (!food) return <NotFound />;

  const related = [...FOODS.filter((f) => f.id !== food.id && f.category === food.category), ...FOODS.filter((f) => f.id !== food.id && f.category !== food.category)].slice(0, 4);

  return (
    <>
      <PageBanner title="Product Details" crumb="Product" />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:gap-12 md:px-8 md:py-16">
        <div className="shape-card flex aspect-square items-center justify-center rounded-[3rem] bg-brand-cream p-6 sm:p-10">
          <Photo src={food.photo} fallback={food.image} alt={food.name} loading="eager" className="aspect-square h-full w-full rounded-full object-cover shadow-xl ring-8 ring-white/70" />
        </div>

        <div className="self-center">
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{food.name}</h2>
          <p className="mt-2 font-display text-xl font-bold text-brand-red">
            {formatPrice(food.price)}
            {food.oldPrice && <span className="ml-2 text-base font-medium text-neutral-400 line-through">{formatPrice(food.oldPrice)}</span>}
          </p>
          <p className="mt-1 flex items-center gap-2 text-[0.7rem] text-neutral-500"><Stars value={food.rating} /> ({food.reviews} Reviews)</p>
          <p className="mt-4 text-xs leading-relaxed text-neutral-600 sm:text-sm">{food.description}. The registration fee covers access to all conference sessions, workshops, networking events, exhibition areas, and conference materials. Please refer to the registration page for a detailed breakdown of inclusions.</p>
          <p className="mt-4 flex items-center gap-2 text-xs font-semibold">Availability: <span className="flex items-center gap-1 font-normal text-neutral-600"><Icon name="check" size={14} className="text-brand-green" /> In Stock</span></p>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-brand-tan/60 py-5">
            <QuantityInput value={qty} onChange={setQty} />
            <Button variant="pink" className="min-w-40 flex-1 py-3 sm:flex-none sm:px-16" onClick={() => { add(food, qty); notify(`${qty} × ${food.name} added to cart`); }}>Add to cart</Button>
            <button onClick={() => { setWished(!wished); notify(wished ? "Removed from wishlist" : "Added to wishlist"); }} aria-pressed={wished} aria-label="Toggle wishlist" className={`flex h-9 w-9 items-center justify-center rounded-full transition ${wished ? "bg-brand-pink text-white" : "bg-brand-peach text-brand-pink hover:bg-brand-pink hover:text-white"}`}>
              <Icon name="heart" size={16} className={wished ? "fill-current" : ""} />
            </button>
          </div>

          <dl className="mt-4 space-y-1 text-xs">
            <div className="flex gap-1"><dt className="font-semibold">SKU:</dt><dd className="text-neutral-600">Fast Food</dd></div>
            <div className="flex gap-1"><dt className="font-semibold">Category:</dt><dd className="text-neutral-600">{food.category}</dd></div>
            <div className="flex gap-1"><dt className="font-semibold">Tag:</dt><dd className="text-neutral-600">Fast Food, {food.category}</dd></div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 md:px-8">
        <div role="tablist" className="flex gap-3 border-b border-brand-orange/40 pb-0">
          {([["description", "Description"], ["reviews", "Reviews (0)"]] as const).map(([key, label]) => (
            <button key={key} role="tab" aria-selected={tab === key} onClick={() => setTab(key)} className={`shape-brush -mb-px px-5 py-2 font-display text-xs font-bold uppercase text-white ${tab === key ? "bg-brand-red" : "bg-brand-pink/90 hover:bg-brand-pink"}`}>{label}</button>
          ))}
        </div>
        {tab === "description" ? (
          <div role="tabpanel" className="flex flex-col gap-5 py-8 sm:flex-row">
            <Photo src={food.photo} fallback={food.image} className="h-24 w-24 shrink-0 rounded-xl object-cover" />
            <div className="space-y-3 text-xs leading-relaxed text-neutral-600">{DESCRIPTION.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
        ) : (
          <div role="tabpanel" className="py-8 text-sm text-neutral-600">There are no reviews yet. Be the first to review “{food.name}”.</div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-8 md:pb-24">
        <div className="text-center">
          <p className="flex items-center justify-center gap-2 font-display text-[0.7rem] font-bold uppercase tracking-wider text-brand-orange"><span className="h-px w-6 bg-brand-orange" />Products<span className="h-px w-6 bg-brand-orange" /></p>
          <h2 className="font-display text-3xl font-bold uppercase">Related products</h2>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {related.map((f) => <ProductCard key={f.id} food={f} />)}
        </div>
        <p className="mt-10 text-center"><Link to="/shop" className="font-display text-sm font-bold uppercase text-brand-red hover:underline">← Back to shop</Link></p>
      </section>
    </>
  );
}
