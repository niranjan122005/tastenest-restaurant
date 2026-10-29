import { Photo } from "../common/Photo";
import type { Chef } from "../../data/people";

export function ChefCard({ chef }: { chef: Chef }) {
  return (
    <figure className="text-center">
      <div className="overflow-hidden rounded-t-[999px] bg-brand-tan">
        <Photo src={chef.photo} fallback={chef.image} alt={`${chef.name}, ${chef.role}`} className="aspect-[3/4] w-full object-cover object-top" />
      </div>
      <figcaption className="mt-3">
        <h3 className="font-display text-lg font-bold leading-tight">{chef.name}</h3>
        <p className="text-[0.7rem] text-neutral-500">{chef.role}</p>
      </figcaption>
    </figure>
  );
}
