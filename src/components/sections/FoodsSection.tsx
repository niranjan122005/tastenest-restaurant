import { useState } from "react";
import { foodsByCategory, type FoodCategory } from "../../data/foods";
import { FoodCard } from "../cards/FoodCard";
import { CategoryTabs } from "../ui/CategoryTabs";
import { SectionTitle } from "../ui/SectionTitle";

/** "Our delicious fast foods": heading + category tabs + 4-column grid. Used on Home and About. */
export function FoodsSection({ className = "" }: { className?: string }) {
  const [category, setCategory] = useState<FoodCategory>("Pizza");
  const foods = foodsByCategory(category).slice(0, 8);
  return (
    <section className={`mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20 ${className}`}>
      <SectionTitle eyebrow="Our best foods" title="Our delicious fast" accent="foods" />
      <CategoryTabs value={category} onChange={setCategory} className="mt-5" />
      <div role="tabpanel" aria-label={`${category} dishes`} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {foods.map((f) => <FoodCard key={f.id} food={f} />)}
      </div>
    </section>
  );
}
