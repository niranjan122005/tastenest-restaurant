import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { getFood, type Food } from "../data/foods";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CartLine { id: string; qty: number }

interface CartValue {
  lines: { food: Food; qty: number }[];
  count: number;
  total: number;
  add: (food: Food, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useLocalStorage<CartLine[]>("tastenest.cart", []);

  const add = useCallback((food: Food, qty = 1) => {
    setRaw((prev) => {
      const found = prev.find((l) => l.id === food.id);
      if (found) return prev.map((l) => (l.id === food.id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id: food.id, qty }];
    });
  }, [setRaw]);

  const setQty = useCallback((id: string, qty: number) => {
    setRaw((prev) => (qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, [setRaw]);

  const remove = useCallback((id: string) => setRaw((prev) => prev.filter((l) => l.id !== id)), [setRaw]);
  const clear = useCallback(() => setRaw([]), [setRaw]);

  const value = useMemo<CartValue>(() => {
    const lines = raw.flatMap((l) => {
      const food = getFood(l.id);
      return food ? [{ food, qty: l.qty }] : [];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.food.price, 0),
      add, setQty, remove, clear,
    };
  }, [raw, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
