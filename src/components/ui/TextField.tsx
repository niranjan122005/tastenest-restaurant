import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const FIELD = "w-full rounded-lg bg-brand-cream px-4 py-3 text-xs text-ink placeholder:text-neutral-500 outline-none ring-1 ring-transparent transition focus:ring-brand-red/60";

interface BaseProps { label: string; icon?: ReactNode; error?: string; hideLabel?: boolean }

export function TextField({ label, icon, error, hideLabel = true, className = "", ...rest }: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className={hideLabel ? "sr-only" : "mb-1 block text-xs font-medium"}>{label}</label>
      <div className="relative">
        <input id={id} aria-invalid={!!error} className={`${FIELD} ${icon ? "pr-10" : ""} ${error ? "ring-brand-red" : ""}`} {...rest} />
        {icon && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600">{icon}</span>}
      </div>
      {error && <p role="alert" className="mt-1 text-[0.7rem] text-brand-red">{error}</p>}
    </div>
  );
}

export function TextArea({ label, icon, error, className = "", ...rest }: Omit<BaseProps, "hideLabel"> & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">{label}</label>
      <div className="relative">
        <textarea id={id} aria-invalid={!!error} className={`${FIELD} min-h-32 resize-y ${error ? "ring-brand-red" : ""}`} {...rest} />
        {icon && <span className="pointer-events-none absolute right-3 top-3 text-neutral-600">{icon}</span>}
      </div>
      {error && <p role="alert" className="mt-1 text-[0.7rem] text-brand-red">{error}</p>}
    </div>
  );
}

export function SelectField({ label, error, className = "", children, ...rest }: Omit<BaseProps, "icon" | "hideLabel"> & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">{label}</label>
      <select id={id} aria-invalid={!!error} className={`${FIELD} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-9 ${error ? "ring-brand-red" : ""}`}
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23444' stroke-width='3'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }} {...rest}>
        {children}
      </select>
      {error && <p role="alert" className="mt-1 text-[0.7rem] text-brand-red">{error}</p>}
    </div>
  );
}
