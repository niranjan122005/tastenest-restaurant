import { Link } from "../../router";
import { formatDate, type Post } from "../../data/blog";
import { Icon } from "../common/Icon";
import { Photo } from "../common/Photo";

export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-brand-cream transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/blog/${post.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Photo src={post.photo} fallback={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-brand-red px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-wide text-white">{post.category}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-3 text-[0.7rem] text-neutral-500">
          <span className="flex items-center gap-1"><Icon name="clock" size={12} />{formatDate(post.date)}</span>
          <span>{post.readMins} min read</span>
        </p>
        <h3 className="mt-2 font-display text-xl font-bold leading-tight"><Link to={`/blog/${post.slug}`} className="hover:text-brand-red">{post.title}</Link></h3>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-neutral-600">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-1 pt-4 font-display text-sm font-bold uppercase text-brand-red hover:gap-2">
          Read more <Icon name="arrowRight" size={14} />
        </Link>
      </div>
    </article>
  );
}
