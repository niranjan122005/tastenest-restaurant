import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";
import { useRequireLogin } from "../hooks/useRequireLogin";
import { formatPrice } from "../data/foods";
import { Photo } from "../components/common/Photo";
import { Icon } from "../components/common/Icon";
import { Button } from "../components/ui/Button";
import { PageBanner } from "../components/ui/PageBanner";
import { TextArea, TextField } from "../components/ui/TextField";

type Method = "cod" | "card" | "upi";
const METHODS: { id: Method; label: string; hint: string }[] = [
  { id: "cod", label: "Cash on delivery", hint: "Pay when your food arrives" },
  { id: "card", label: "Credit / debit card", hint: "Visa, Mastercard, Rupay" },
  { id: "upi", label: "UPI", hint: "GPay, PhonePe, Paytm" },
];

const FREE_DELIVERY_FROM = 50;
const DELIVERY_FEE = 3.99;

const EMPTY_ADDRESS = { name: "", phone: "", street: "", city: "", zip: "", notes: "" };
const EMPTY_CARD = { number: "", holder: "", expiry: "", cvv: "" };

/** "4242424242424242" -> "4242 4242 4242 4242" */
const formatCardNumber = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
/** "1228" -> "12/28" */
const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

function expiryValid(v: string) {
  const m = /^(\d{2})\/(\d{2})$/.exec(v);
  if (!m) return false;
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}

interface Placed { id: string; total: number; address: string; method: string; eta: string }

export default function Checkout() {
  const { user } = useAuth();
  const { lines, total, clear } = useCart();
  const { notify } = useUI();
  const requireLogin = useRequireLogin();

  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [method, setMethod] = useState<Method>("cod");
  const [card, setCard] = useState(EMPTY_CARD);
  const [upi, setUpi] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState<Placed | null>(null);

  // Ordering needs a logged-in user: bounce to the login page and come back here afterwards.
  useEffect(() => { if (!user && !placed) requireLogin(null, "place your order", "/checkout"); }, [user, placed, requireLogin]);
  useEffect(() => { if (user) setAddress((a) => (a.name ? a : { ...a, name: user })); }, [user]);

  const delivery = useMemo(() => (total === 0 || total >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE), [total]);
  const grandTotal = total + delivery;

  const setA = (k: keyof typeof EMPTY_ADDRESS) => (e: { target: { value: string } }) => setAddress((a) => ({ ...a, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (address.name.trim().length < 2) next.name = "Enter the receiver's name.";
    if (!/^[+\d][\d\s-]{8,}$/.test(address.phone.trim())) next.phone = "Enter a valid phone number.";
    if (address.street.trim().length < 5) next.street = "Enter your street address.";
    if (address.city.trim().length < 2) next.city = "Enter your city.";
    if (!/^\d{5,6}$/.test(address.zip.trim())) next.zip = "Enter a 5 or 6 digit ZIP / PIN code.";
    if (method === "card") {
      if (card.number.replace(/\s/g, "").length !== 16) next.number = "Card number must be 16 digits.";
      if (card.holder.trim().length < 2) next.holder = "Enter the name on the card.";
      if (!expiryValid(card.expiry)) next.expiry = "Use a valid future date (MM/YY).";
      if (!/^\d{3,4}$/.test(card.cvv)) next.cvv = "CVV must be 3 or 4 digits.";
    }
    if (method === "upi" && !/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upi.trim())) next.upi = "Enter a valid UPI ID, e.g. name@okbank.";
    setErrors(next);
    if (Object.keys(next).length) {
      // Errors can be off-screen on long/mobile layouts: tell the user and jump to the first one.
      notify("Please fix the highlighted fields");
      setTimeout(() => {
        const el = document.querySelector<HTMLElement>('form[aria-label="Checkout"] [aria-invalid="true"]');
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      }, 0);
      return;
    }

    const label = METHODS.find((m) => m.id === method)!.label;
    setPlaced({
      id: `TN-${Date.now().toString().slice(-6)}`,
      total: grandTotal,
      address: `${address.name}, ${address.street}, ${address.city} ${address.zip}`,
      method: method === "card" ? `${label} ending ${card.number.replace(/\s/g, "").slice(-4)}` : label,
      eta: "30–40 minutes",
    });
    clear(); // card details are never stored
    setCard(EMPTY_CARD);
    notify("Order placed successfully");
    window.scrollTo({ top: 0 });
  };

  if (placed) {
    return (
      <>
        <PageBanner title="Order confirmed" />
        <section className="px-4 py-14 md:py-20">
          <div className="mx-auto max-w-lg rounded-3xl bg-brand-cream p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white"><Icon name="check" size={28} /></span>
            <h2 className="mt-4 font-display text-3xl font-bold">Order placed!</h2>
            <p className="mt-1 text-sm text-neutral-600">Thanks {user}! Your food is being prepared.</p>
            <dl className="mt-6 space-y-2 rounded-2xl bg-white p-5 text-left text-xs" data-testid="order-summary">
              <div className="flex justify-between gap-4"><dt className="text-neutral-500">Order number</dt><dd className="font-bold">{placed.id}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-neutral-500">Deliver to</dt><dd className="text-right font-medium">{placed.address}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-neutral-500">Payment</dt><dd className="text-right font-medium">{placed.method}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-neutral-500">Estimated delivery</dt><dd className="font-medium">{placed.eta}</dd></div>
              <div className="flex justify-between gap-4 border-t border-black/10 pt-2 text-sm"><dt className="font-bold">Total</dt><dd className="font-bold text-brand-red">{formatPrice(placed.total)}</dd></div>
            </dl>
            <Button variant="pill" to="/shop" className="mt-6">Continue shopping</Button>
          </div>
        </section>
      </>
    );
  }

  if (lines.length === 0) {
    return (
      <>
        <PageBanner title="Checkout" />
        <section className="px-4 py-20 text-center">
          <Icon name="cart" size={44} className="mx-auto text-brand-tan" />
          <h2 className="mt-3 font-display text-2xl font-bold">Your cart is empty</h2>
          <p className="mt-1 text-sm text-neutral-500">Add something tasty before checking out.</p>
          <Button variant="pill" to="/shop" className="mt-5">Browse the shop</Button>
        </section>
      </>
    );
  }

  const radio = (m: Method) => `flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 text-left transition ${method === m ? "border-brand-red bg-brand-cream" : "border-black/10 hover:border-brand-red/50"}`;

  return (
    <>
      <PageBanner title="Checkout" />
      <form noValidate onSubmit={submit} aria-label="Checkout" className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:px-8 lg:grid-cols-[1fr_380px] lg:py-16">
        <div className="min-w-0 space-y-8">
          <fieldset className="min-w-0">
            <legend className="font-display text-2xl font-bold">Delivery <span className="text-brand-red">address</span></legend>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextField label="Full name" placeholder="Full name" autoComplete="name" value={address.name} onChange={setA("name")} error={errors.name} icon={<Icon name="user" size={15} />} />
              <TextField label="Phone number" placeholder="Phone number" type="tel" autoComplete="tel" value={address.phone} onChange={setA("phone")} error={errors.phone} icon={<Icon name="phone" size={15} />} />
              <TextField className="sm:col-span-2" label="Street address" placeholder="House no., street, area" autoComplete="street-address" value={address.street} onChange={setA("street")} error={errors.street} icon={<Icon name="pin" size={15} />} />
              <TextField label="City" placeholder="City" autoComplete="address-level2" value={address.city} onChange={setA("city")} error={errors.city} />
              <TextField label="ZIP / PIN code" placeholder="ZIP / PIN code" inputMode="numeric" autoComplete="postal-code" value={address.zip} onChange={setA("zip")} error={errors.zip} />
              <TextArea className="sm:col-span-2" label="Delivery notes (optional)" placeholder="Delivery notes (optional) – landmark, gate code…" value={address.notes} onChange={setA("notes")} rows={2} />
            </div>
          </fieldset>

          <fieldset className="min-w-0">
            <legend className="font-display text-2xl font-bold">Payment <span className="text-brand-red">method</span></legend>
            <div role="radiogroup" aria-label="Payment method" className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {METHODS.map((m) => (
                <label key={m.id} className={radio(m.id)}>
                  <input type="radio" name="payment" value={m.id} checked={method === m.id} onChange={() => { setMethod(m.id); setErrors({}); }} className="h-4 w-4 accent-brand-red" />
                  <span><span className="block font-display text-sm font-bold leading-tight">{m.label}</span><span className="block text-[0.65rem] text-neutral-500">{m.hint}</span></span>
                </label>
              ))}
            </div>

            {method === "card" && (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <TextField className="sm:col-span-2" label="Card number" placeholder="1234 5678 9012 3456" inputMode="numeric" autoComplete="cc-number" value={card.number} onChange={(e) => setCard((c) => ({ ...c, number: formatCardNumber(e.target.value) }))} error={errors.number} />
                <TextField className="sm:col-span-2" label="Name on card" placeholder="Name on card" autoComplete="cc-name" value={card.holder} onChange={(e) => setCard((c) => ({ ...c, holder: e.target.value }))} error={errors.holder} />
                <TextField label="Expiry date" placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp" value={card.expiry} onChange={(e) => setCard((c) => ({ ...c, expiry: formatExpiry(e.target.value) }))} error={errors.expiry} />
                <TextField label="CVV" placeholder="CVV" type="password" inputMode="numeric" maxLength={4} autoComplete="cc-csc" value={card.cvv} onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value.replace(/\D/g, "") }))} error={errors.cvv} />
                <p className="text-[0.65rem] text-neutral-500 sm:col-span-2">Demo store: no real payment is made and card details are never saved.</p>
              </div>
            )}
            {method === "upi" && (
              <div className="mt-4"><TextField label="UPI ID" placeholder="yourname@okbank" value={upi} onChange={(e) => setUpi(e.target.value)} error={errors.upi} /></div>
            )}
            {method === "cod" && <p className="mt-4 rounded-xl bg-brand-cream p-3 text-xs text-neutral-600">Keep the exact amount ready. You pay the delivery partner when the order arrives.</p>}
          </fieldset>
        </div>

        <aside className="h-fit rounded-3xl bg-brand-cream p-6 lg:sticky lg:top-28" aria-label="Order summary">
          <h2 className="font-display text-2xl font-bold">Order summary</h2>
          <ul className="mt-4 divide-y divide-black/10" data-testid="checkout-lines">
            {lines.map(({ food, qty }) => (
              <li key={food.id} className="flex items-center gap-3 py-3">
                <Photo src={food.photo} fallback={food.image} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1"><p className="truncate font-display text-sm font-bold leading-tight">{food.name}</p><p className="text-[0.7rem] text-neutral-500">Qty {qty}</p></div>
                <p className="text-xs font-bold">{formatPrice(food.price * qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-1.5 text-xs">
            <div className="flex justify-between"><dt>Subtotal</dt><dd data-testid="checkout-subtotal">{formatPrice(total)}</dd></div>
            <div className="flex justify-between"><dt>Delivery</dt><dd data-testid="checkout-delivery">{delivery === 0 ? "Free" : formatPrice(delivery)}</dd></div>
            {delivery > 0 && <p className="text-[0.65rem] text-neutral-500">Free delivery on orders over {formatPrice(FREE_DELIVERY_FROM)}.</p>}
            <div className="flex justify-between border-t border-black/10 pt-2 font-display text-xl font-bold"><dt>Total</dt><dd className="text-brand-red" data-testid="checkout-total">{formatPrice(grandTotal)}</dd></div>
          </dl>
          {Object.keys(errors).length > 0 && <p role="alert" className="mt-4 rounded-lg bg-white p-2 text-center text-[0.7rem] font-semibold text-brand-red">Some details are missing or invalid. Please check the highlighted fields.</p>}
          <Button type="submit" variant="pill" className="mt-5 w-full py-3.5">Place order</Button>
        </aside>
      </form>
    </>
  );
}
