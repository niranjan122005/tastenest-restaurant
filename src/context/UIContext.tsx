import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

type Panel = "cart" | "search" | "reserve" | "menu" | null;

export interface AfterLogin { path: string; panel?: Exclude<Panel, null>; reason: string }

interface UIValue {
  panel: Panel;
  open: (p: Exclude<Panel, null>) => void;
  close: () => void;
  /** Where to go (and which overlay to reopen) once the visitor has logged in. */
  afterLogin: AfterLogin | null;
  setAfterLogin: (a: AfterLogin | null) => void;
  toast: string | null;
  notify: (message: string) => void;
}

const UIContext = createContext<UIValue | null>(null);

/** Which overlay (cart drawer, search, reservation modal, mobile menu) is open + a toast message. */
export function UIProvider({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null);
  const [afterLogin, setAfterLogin] = useState<AfterLogin | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const open = useCallback((p: Exclude<Panel, null>) => setPanel(p), []);
  const close = useCallback(() => setPanel(null), []);
  const notify = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const value = useMemo(() => ({ panel, open, close, afterLogin, setAfterLogin, toast, notify }), [panel, open, close, afterLogin, toast, notify]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
