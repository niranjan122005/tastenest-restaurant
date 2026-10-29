import { FOOD_CATEGORIES, type FoodCategory } from "../../data/foods";

interface Props {
  value: FoodCategory;
  onChange: (c: FoodCategory) => void;
  className?: string;
}

/** Brush-style filter tabs (Pizza / Burger / Sushi / Chicken / Fries). */
export function CategoryTabs({ value, onChange, className = "" }: Props) {
  return (
    <div role="tablist" aria-label="Food categories" className={`scrollbar-none overflow-x-auto px-1 py-1 ${className}`}>
      <div className="mx-auto flex w-max gap-2">
      {FOOD_CATEGORIES.map((c) => {
        const active = c === value;
        return (
          <button
            key={c}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(c)}
            className={`shape-brush shrink-0 px-5 py-1.5 font-display text-[0.7rem] font-bold uppercase tracking-wide transition-colors sm:px-6 ${
              active ? "bg-brand-red text-white" : "bg-brand-tan/70 text-ink hover:bg-brand-tan"
            }`}
          >
            {c}
          </button>
        );
      })}
      </div>
    </div>
  );
}
