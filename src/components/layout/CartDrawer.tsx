import { Photo } from "../common/Photo";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import { useRouter } from "../../router";
import { useRequireLogin } from "../../hooks/useRequireLogin";
import { formatPrice } from "../../data/foods";
import { useEscape } from "../../hooks/useEscape";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { Icon } from "../common/Icon";
import { Button } from "../ui/Button";
import { QuantityInput } from "../ui/QuantityInput";

export function CartDrawer() {
  const { panel, close } = useUI();
  const { lines, total, setQty, remove } = useCart();
  const { user } = useAuth();
  const requireLogin = useRequireLogin();
  const { navigate } = useRouter();
  const open = panel === "cart";

  useEscape(open, close);
  useLockBodyScroll(open);

  const checkout = () => {
    if (!requireLogin(null, "place your order", "/checkout")) return;
    close();
    navigate("/checkout");
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={close} className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
      <aside role="dialog" aria-modal="true" aria-label="Shopping cart" className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <h2 className="font-display text-2xl font-bold">Your Cart</h2>
          <button onClick={close} aria-label="Close cart" className="rounded-full p-2 hover:bg-brand-cream"><Icon name="close" /></button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <Icon name="cart" size={44} className="text-brand-tan" />
            <p className="font-display text-xl font-bold">Your cart is empty</p>
            <Button variant="pill" to="/shop" onClick={close}>Browse the shop</Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-black/5 overflow-y-auto px-5" data-testid="cart-lines">
              {lines.map(({ food, qty }) => (
                <li key={food.id} className="flex items-center gap-3 py-4">
                  <Photo src={food.photo} fallback={food.image} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-base font-bold leading-tight">{food.name}</p>
                    <p className="text-xs font-semibold text-brand-red">{formatPrice(food.price)}</p>
                    <div className="mt-1"><QuantityInput size="sm" value={qty} onChange={(n) => setQty(food.id, n)} /></div>
                  </div>
                  <button onClick={() => remove(food.id)} aria-label={`Remove ${food.name}`} className="rounded-full p-2 text-neutral-500 hover:bg-brand-cream hover:text-brand-red"><Icon name="trash" size={18} /></button>
                </li>
              ))}
            </ul>
            <div className="border-t border-black/10 px-5 py-4">
              <p className="flex items-center justify-between font-display text-xl font-bold"><span>Subtotal</span><span data-testid="cart-total">{formatPrice(total)}</span></p>
              <p className="mt-0.5 text-[0.7rem] text-neutral-500">{user ? `Ordering as ${user}` : "Log in, then add your address and payment method."}</p>
              <Button variant="pill" className="mt-3 w-full py-3.5" onClick={checkout}>Checkout</Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
