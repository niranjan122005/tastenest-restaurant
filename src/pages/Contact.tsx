import { useState, type FormEvent, type ReactNode } from "react";
import { CONTACT } from "../data/site";
import { PHOTO, unsplash } from "../data/photos";
import { Photo } from "../components/common/Photo";
import { useUI } from "../context/UIContext";
import { Icon, type IconName } from "../components/common/Icon";
import { Button } from "../components/ui/Button";
import { PageBanner } from "../components/ui/PageBanner";
import { SelectField, TextArea, TextField } from "../components/ui/TextField";

function InfoRow({ icon, tone, title, children }: { icon: IconName; tone: string; title: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-4 rounded-full bg-white px-4 py-3 shadow-sm">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white ${tone}`}><Icon name={icon} size={18} /></span>
      <div className="text-[0.7rem] leading-snug text-neutral-600">
        <h3 className="font-display text-base font-bold leading-tight text-ink">{title}</h3>
        {children}
      </div>
    </li>
  );
}

const EMPTY = { name: "", email: "", subject: "", message: "" };
type Errors = Partial<Record<keyof typeof EMPTY, string>>;

function ContactForm() {
  const { notify } = useUI();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const set = (k: keyof typeof EMPTY) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.subject) next.subject = "Please choose a subject.";
    if (form.message.trim().length < 10) next.message = "Your message should be at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    notify("Thanks! Your message has been sent.");
    setForm(EMPTY);
  };

  return (
    <form noValidate onSubmit={submit} aria-label="Contact form">
      <h2 className="font-display text-2xl font-bold">Get In Touch!</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <TextField label="Your name" placeholder="Your name" value={form.name} onChange={set("name")} error={errors.name} icon={<Icon name="user" size={15} />} />
        <TextField label="Your email" type="email" placeholder="Your Email" value={form.email} onChange={set("email")} error={errors.email} icon={<Icon name="mail" size={15} />} />
        <SelectField className="sm:col-span-2" label="Subject" value={form.subject} onChange={set("subject")} error={errors.subject}>
          <option value="">Subject</option>
          <option>General enquiry</option>
          <option>Table reservation</option>
          <option>Catering &amp; events</option>
          <option>Feedback</option>
        </SelectField>
        <TextArea className="sm:col-span-2" label="Message" placeholder="Write Messages..." value={form.message} onChange={set("message")} error={errors.message} icon={<Icon name="pencil" size={15} />} />
      </div>
      <Button type="submit" variant="dark" className="mt-4">Send message now</Button>
    </form>
  );
}

export default function Contact() {
  return (
    <>
      <PageBanner title="Contact" />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.05fr_1fr] md:gap-12 md:px-8 md:py-20">
        <div className="relative rounded-[2.5rem] bg-brand-cream p-6 sm:p-9">
          <h2 className="font-display text-3xl font-bold uppercase">Contact <span className="text-brand-red">Information</span></h2>
          <p className="mt-2 max-w-sm text-[0.7rem] leading-relaxed text-neutral-600">Relax and enjoy your food in our cozy restaurant, or take it to-go. Great taste, great service — every visit is a flavorful experience worth coming back for.</p>
          <ul className="mt-6 space-y-3 pr-0 sm:pr-14">
            <InfoRow icon="pin" tone="bg-brand-red" title="Address"><p>{CONTACT.address}</p></InfoRow>
            <InfoRow icon="phone" tone="bg-brand-pink" title="Contact Info"><p>Mobile: +256 6547 90749</p><p>Email: {CONTACT.email}</p></InfoRow>
            <InfoRow icon="clock" tone="bg-brand-orange" title="Opening Hours"><p>Monday - Saturday: 9:00am - 10:00pm</p><p>Sunday are Closed</p></InfoRow>
          </ul>
          <img src="/images/decor/basil-right.svg" alt="" className="pointer-events-none absolute -right-2 top-1/2 hidden w-20 -translate-y-1/2 sm:block" />
        </div>
        <ContactForm />
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative bg-brand-peach p-5 sm:p-8">
          <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center rounded border border-dashed border-brand-orange px-6 py-8 text-center">
            <p className="font-display text-[0.7rem] font-bold uppercase tracking-wider text-brand-red">Restaurant location</p>
            <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">Visit our restaurant</h2>
            <p className="mt-4 whitespace-pre-line text-xs text-neutral-600">{CONTACT.location}</p>
            <p className="mt-4 whitespace-pre-line text-xs text-neutral-600">{CONTACT.hoursLong}</p>
            <ul className="mt-5 flex gap-2">
              {(["facebook", "twitter", "linkedin", "instagram"] as IconName[]).map((i) => (
                <li key={i}><a href="#" onClick={(e) => e.preventDefault()} aria-label={i} className="flex h-8 w-8 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-white"><Icon name={i} size={14} /></a></li>
              ))}
            </ul>
            <Photo src={unsplash(PHOTO.duoPizza, 300)} fallback="/images/foods/combo-duo.png" className="absolute bottom-4 right-4 hidden h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-white sm:block" />
          </div>
        </div>
        <div className="relative min-h-[300px]">
          <img src="/images/ui/map.jpg" alt="Map showing the restaurant location" className="absolute inset-0 h-full w-full object-cover" />
          <a href={`https://www.google.com/maps/search/${encodeURIComponent(CONTACT.address)}`} target="_blank" rel="noreferrer" className="absolute left-3 top-3 rounded bg-white px-3 py-1.5 text-[0.7rem] font-semibold shadow hover:bg-brand-cream">View larger map</a>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-brand-red drop-shadow-md"><Icon name="pin" size={40} className="fill-current stroke-white" /></span>
        </div>
      </section>
    </>
  );
}
