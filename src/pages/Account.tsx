import { useState, type FormEvent } from "react";
import { DEMO_ACCOUNT, useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";
import { useRouter } from "../router";
import { Button } from "../components/ui/Button";
import { PageBanner } from "../components/ui/PageBanner";
import { TextField } from "../components/ui/TextField";

function LoginForm() {
  const { login } = useAuth();
  const { notify, afterLogin, setAfterLogin, open } = useUI();
  const { navigate } = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err = login(username, password);
    setError(err);
    if (err) return;
    notify(`Welcome back, ${username.trim()}!`);
    if (afterLogin) {
      // Send them straight back to what they were doing (reservation form / cart).
      const { path, panel } = afterLogin;
      setAfterLogin(null);
      navigate(path);
      if (panel) setTimeout(() => open(panel), 0);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex"><span className="shape-brush bg-brand-red px-6 py-1.5 font-display text-xs font-bold uppercase text-white">Log In</span></div>
      {afterLogin && <p role="status" className="rounded-t-lg bg-brand-cream px-5 py-2 text-xs font-semibold text-brand-red">{afterLogin.reason}</p>}
      <form noValidate onSubmit={submit} className="space-y-3 rounded-b-lg rounded-tr-lg bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.12)]" aria-label="Log in">
        <TextField label="Username" placeholder="User Name" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} className="[&_input]:rounded-full" />
        <TextField label="Password" type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="[&_input]:rounded-full" />
        {error && <p role="alert" className="text-xs text-brand-red">{error}</p>}
        <label className="flex items-center gap-2 text-[0.7rem]"><input type="checkbox" className="h-3.5 w-3.5 accent-brand-red" /> Remember me</label>
        <Button type="submit" variant="pill" className="w-full py-3">Login</Button>
        <div className="rounded-xl border border-dashed border-brand-red/40 bg-brand-cream/60 p-3 text-center text-[0.7rem]" data-testid="demo-account">
          <p className="font-bold uppercase tracking-wide text-brand-red">Demo account</p>
          <p className="mt-1 text-neutral-600">Username: <b>{DEMO_ACCOUNT.username}</b> &nbsp;·&nbsp; Password: <b>{DEMO_ACCOUNT.password}</b></p>
          <button type="button" onClick={() => { setUsername(DEMO_ACCOUNT.username); setPassword(DEMO_ACCOUNT.password); setError(null); }} className="mt-2 rounded-full bg-brand-red px-4 py-1 font-display text-xs font-bold uppercase text-white hover:opacity-90">Use demo account</button>
        </div>
        <button type="button" onClick={() => notify("Password reset link sent (demo)")} className="text-[0.7rem] text-brand-red hover:underline">Forgot Your Password?</button>
      </form>
    </div>
  );
}

function Welcome() {
  const { user, logout } = useAuth();
  const { navigate } = useRouter();
  return (
    <div className="mx-auto max-w-md rounded-2xl bg-brand-cream p-8 text-center">
      <h2 className="font-display text-3xl font-bold">Hello, <span className="text-brand-red">{user}</span>!</h2>
      <p className="mt-2 text-sm text-neutral-600">You're logged in. You can now place orders and reserve tables.</p>
      <div className="mt-5 flex justify-center gap-3">
        <Button variant="pill" onClick={() => navigate("/shop")}>Order food</Button>
        <Button variant="dark" onClick={logout}>Log out</Button>
      </div>
    </div>
  );
}

export default function Account() {
  const { user } = useAuth();
  return (
    <>
      <PageBanner title="My account" crumb="Account" />
      <section className="px-4 py-14 md:py-20">{user ? <Welcome /> : <LoginForm />}</section>
    </>
  );
}
