import { Icon } from "../common/Icon";

interface Props { value: number; onChange: (n: number) => void; min?: number; max?: number; size?: "sm" | "md" }

/** − 1 + stepper (round buttons like the product page design). */
export function QuantityInput({ value, onChange, min = 1, max = 99, size = "md" }: Props) {
  const btn = `flex items-center justify-center rounded-full bg-brand-pink text-white transition hover:bg-rose-600 disabled:opacity-40 ${size === "md" ? "h-8 w-8" : "h-6 w-6"}`;
  return (
    <div className="inline-flex items-center gap-3">
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease quantity">
        <Icon name="minus" size={size === "md" ? 14 : 12} />
      </button>
      <span className="min-w-4 text-center text-sm font-medium" aria-live="polite" data-testid="qty-value">{value}</span>
      <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase quantity">
        <Icon name="plus" size={size === "md" ? 14 : 12} />
      </button>
    </div>
  );
}
