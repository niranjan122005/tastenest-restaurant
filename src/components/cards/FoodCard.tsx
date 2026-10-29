import { Photo } from "../common/Photo";
import { Link } from "../../router";
import { formatPrice, isOnSale, type Food } from "../../data/foods";
import { useCart } from "../../context/CartContext";
import { useUI } from "../../context/UIContext";
import { Stars } from "../ui/Stars";

/** Price pill used in the "fast foods" grid (orange) and the menu list (yellow). */
export function PricePill({ food, tone = "orange" }: { food: Food; tone?: "orange" | "yellow" }) {
  return (
    <span className={`inline-flex flex-col items-center rounded-full px-3 py-1 font-display text-xs font-bold leading-tight text-ink shadow-sm sm:text-sm ${tone === "orange" ? "bg-brand-orange" : "bg-brand-yellow"}`}>
      <span>{formatPrice(food.price)}</span>
      {food.oldPrice && <span className="text-[0.7rem] font-semibold line-through opacity-70">{formatPrice(food.oldPrice)}</span>}
    </span>
  );
}

/** Card with orange price pill + description (About / Home grids). */
export function FoodCard({ food }: { food: Food }) {
  const { add } = useCart();
  const { notify } = useUI();
  return (
    <article className="group text-center">
      <Link to={`/product/${food.id}`} className="block">
        <div className="shape-card relative flex aspect-[5/6] items-start justify-center bg-brand-cream px-5 pt-6 pb-14 transition-transform duration-300 group-hover:-translate-y-1">
          <Photo src={food.photo} fallback={food.image} alt={food.name} className="aspect-square w-full max-w-[190px] rounded-full object-cover shadow-lg ring-4 ring-white/80 transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2"><PricePill food={food} /></div>
        </div>
        <h3 className="mt-3 font-display text-base font-bold leading-tight sm:text-lg">{food.name}</h3>
      </Link>
      <p className="mx-auto mt-0.5 max-w-[14rem] text-[0.7rem] leading-snug text-neutral-500">{food.description}</p>
      <button
        onClick={() => { add(food); notify(`${food.name} added to cart`); }}
        className="mt-2 font-display text-[0.7rem] font-bold uppercase tracking-wide text-brand-red opacity-100 transition hover:underline md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
      >
        + Add to cart
      </button>
    </article>
  );
}

/** Shop card: stars, name and (struck-through) price under the image. */
export function ProductCard({ food }: { food: Food }) {
  const { add } = useCart();
  const { notify } = useUI();
  return (
    <article className="group relative text-center">
      <Link to={`/product/${food.id}`} className="block">
        <div className="shape-card relative flex aspect-square items-center justify-center bg-brand-cream p-6 transition-transform duration-300 group-hover:-translate-y-1">
          {isOnSale(food) && <span className="absolute left-3 top-3 rounded-full bg-brand-red px-2 py-0.5 text-[0.6rem] font-semibold text-white">Sale</span>}
          <Photo src={food.photo} fallback={food.image} alt={food.name} className="aspect-square w-full rounded-full object-cover shadow-lg ring-4 ring-white/80 transition-transform duration-500 group-hover:scale-105" />
        </div>
        <Stars value={food.rating} className="mt-3 justify-center" />
        <h3 className="mt-1 font-display text-base font-bold leading-tight">{food.name}</h3>
        <p className="font-display text-sm font-semibold text-brand-red">
          {formatPrice(food.price)}
          {food.oldPrice && <span className="ml-2 text-neutral-400 line-through">{formatPrice(food.oldPrice)}</span>}
        </p>
      </Link>
      <button
        onClick={() => { add(food); notify(`${food.name} added to cart`); }}
        className="mt-1 font-display text-[0.7rem] font-bold uppercase tracking-wide text-ink underline-offset-2 hover:text-brand-red hover:underline"
      >
        Add to cart
      </button>
    </article>
  );
}
