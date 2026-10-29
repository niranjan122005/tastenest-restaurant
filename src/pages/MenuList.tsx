import { useState } from "react";
import { foodsByCategory, type FoodCategory } from "../data/foods";
import { MenuListItem } from "../components/cards/MenuListItem";
import { CategoryTabs } from "../components/ui/CategoryTabs";
import { PageBanner } from "../components/ui/PageBanner";
import { SectionTitle } from "../components/ui/SectionTitle";

export default function MenuList() {
  const [category, setCategory] = useState<FoodCategory>("Pizza");
  const foods = foodsByCategory(category);
  return (
    <>
      <PageBanner title="Menu List" />
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
        <SectionTitle eyebrow="Our best foods" title="Our delicious fast" accent="foods" />
        <CategoryTabs value={category} onChange={setCategory} className="mt-5" />
        <ul role="tabpanel" aria-label={`${category} menu`} className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {foods.map((f) => <li key={f.id}><MenuListItem food={f} /></li>)}
        </ul>
      </section>
    </>
  );
}
