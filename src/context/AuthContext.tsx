import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

/** Ready-made account shown on the login page. */
export const DEMO_ACCOUNT = { username: "demo", password: "demo1234" } as const;

interface AuthValue {
  user: string | null;
  /** Demo login: any username with a password of 4+ characters. Returns an error message or null. */
  login: (username: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<string | null>("tastenest.user", null);

  const login = useCallback((username: string, password: string) => {
    if (!username.trim()) return "Please enter your username.";
    if (password.length < 4) return "Password must be at least 4 characters.";
    setUser(username.trim());
    return null;
  }, [setUser]);

  const logout = useCallback(() => setUser(null), [setUser]);
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
