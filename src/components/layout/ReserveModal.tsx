import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import { useEscape } from "../../hooks/useEscape";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { Icon } from "../common/Icon";
import { Button } from "../ui/Button";
import { SelectField, TextField } from "../ui/TextField";

const today = () => new Date().toISOString().slice(0, 10);
const EMPTY = { name: "", phone: "", date: "", time: "19:00", guests: "2" };

export function ReserveModal() {
  const { panel, close, notify } = useUI();
  const { user } = useAuth();
  const open = panel === "reserve" && !!user;
  const [form, setForm] = useState({ ...EMPTY, name: user ?? "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof EMPTY, string>>>({});

  useEffect(() => { if (open) setForm((f) => (f.name ? f : { ...f, name: user ?? "" })); }, [open, user]);
  useEscape(open, close);
  useLockBodyScroll(open);
  if (!open) return null;

  const set = (k: keyof typeof EMPTY) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number.";
    if (!form.date) next.date = "Pick a date.";
    else if (form.date < today()) next.date = "Date can't be in the past.";
    setErrors(next);
    if (Object.keys(next).length) return;
    notify(`Table for ${form.guests} reserved on ${form.date} at ${form.time}`);
    setForm({ ...EMPTY, name: user ?? "" });
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={close}>
      <form role="dialog" aria-modal="true" aria-label="Reserve a table" noValidate onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Reserve a <span className="text-brand-red">Table</span></h2>
            <p className="text-xs text-neutral-500">We'll hold your table for 15 minutes.</p>
          </div>
          <button type="button" onClick={close} aria-label="Close" className="rounded-full p-2 hover:bg-brand-cream"><Icon name="close" /></button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <TextField className="col-span-2" label="Your name" placeholder="Your name" value={form.name} onChange={set("name")} error={errors.name} icon={<Icon name="user" size={15} />} />
          <TextField className="col-span-2" label="Phone number" placeholder="Phone number" type="tel" value={form.phone} onChange={set("phone")} error={errors.phone} icon={<Icon name="phone" size={15} />} />
          <TextField label="Date" type="date" min={today()} value={form.date} onChange={set("date")} error={errors.date} />
          <TextField label="Time" type="time" value={form.time} onChange={set("time")} />
          <SelectField className="col-span-2" label="Guests" value={form.guests} onChange={set("guests")}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
          </SelectField>
        </div>
        <Button type="submit" variant="pill" className="mt-5 w-full py-3.5">Confirm reservation</Button>
      </form>
    </div>
  );
}
