import { Icon } from "../common/Icon";

interface Props { page: number; pages: number; onChange: (page: number) => void }

export function Pagination({ page, pages, onChange }: Props) {
  if (pages <= 1) return null;
  const base = "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors";
  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          className={`${base} ${n === page ? "bg-brand-pink text-white" : "bg-brand-cream hover:bg-brand-tan"}`}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        aria-label="Next page"
        className={`${base} bg-brand-cream hover:bg-brand-tan disabled:opacity-40`}
      >
        <Icon name="arrowRight" size={14} />
      </button>
    </nav>
  );
}
