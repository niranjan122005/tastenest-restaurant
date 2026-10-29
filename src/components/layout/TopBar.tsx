import { CONTACT } from "../../data/site";
import { Icon, type IconName } from "../common/Icon";

const SOCIAL: { icon: IconName; label: string }[] = [
  { icon: "facebook", label: "Facebook" },
  { icon: "twitter", label: "X" },
  { icon: "linkedin", label: "LinkedIn" },
  { icon: "instagram", label: "Instagram" },
];

export function TopBar() {
  return (
    <div className="bg-brand-forest text-[0.7rem] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-6 px-4 py-2 lg:justify-between md:px-8">
        <ul className="hidden items-center gap-6 lg:flex">
          <li className="flex items-center gap-1.5"><Icon name="pin" size={13} className="text-brand-orange" />{CONTACT.address}</li>
          <li className="hidden items-center gap-1.5 lg:flex"><Icon name="mail" size={13} className="text-brand-orange" />{CONTACT.email}</li>
          <li className="flex items-center gap-1.5"><Icon name="clock" size={13} className="text-brand-orange" />Opening Hour: {CONTACT.hours}</li>
        </ul>
        <div className="flex items-center gap-4">
          <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 font-medium hover:text-brand-yellow">
            <Icon name="phone" size={13} className="text-brand-orange" />{CONTACT.phone}
          </a>
          <ul className="flex items-center gap-1.5">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label={s.label} className="flex h-5 w-5 items-center justify-center rounded-full border border-white/40 transition hover:bg-brand-orange hover:border-brand-orange">
                  <Icon name={s.icon} size={11} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
