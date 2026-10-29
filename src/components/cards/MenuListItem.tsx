import { Photo } from "../common/Photo";
import { Link } from "../../router";
import type { Food } from "../../data/foods";
import { PricePill } from "./FoodCard";

/** Wide horizontal menu row: thumbnail, name, short description and yellow price pill. */
export function MenuListItem({ food }: { food: Food }) {
  return (
    <Link to={`/product/${food.id}`} className="shape-wide group flex items-center gap-4 bg-brand-cream px-4 py-4 transition-colors hover:bg-brand-peach/60 sm:px-6">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white p-1 sm:h-20 sm:w-20">
        <Photo src={food.photo} fallback={food.image} alt={food.name} className="h-full w-full rounded-lg object-cover transition-transform group-hover:scale-110" />
      </div>
      <div className="min-w-0">
        <h3 className="truncate font-display text-lg font-bold leading-tight">{food.name}</h3>
        <p className="mt-0.5 line-clamp-2 text-[0.7rem] leading-snug text-neutral-500 sm:text-xs">{food.description}</p>
        <div className="mt-2"><PricePill food={food} tone="yellow" /></div>
      </div>
    </Link>
  );
}
