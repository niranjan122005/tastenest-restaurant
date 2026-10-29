import { useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";
import { useRouter } from "../router";

/**
 * Returns a guard: `requireLogin("reserve", "reserve a table")` (optionally with a `returnTo` path) is true when the visitor is
 * logged in. Otherwise it sends them to the login page and remembers where to come back to.
 */
export function useRequireLogin() {
  const { user } = useAuth();
  const { close, setAfterLogin, notify } = useUI();
  const { path, navigate } = useRouter();

  return useCallback((panel: "cart" | "reserve" | null, action: string, returnTo?: string) => {
    if (user) return true;
    setAfterLogin({ path: returnTo ?? path, panel: panel ?? undefined, reason: `Please log in to ${action}.` });
    notify(`Please log in to ${action}`);
    close();
    navigate("/account");
    return false;
  }, [user, path, navigate, close, setAfterLogin, notify]);
}
