import { POSTS, formatDate, getPost } from "../data/blog";
import { Link } from "../router";
import { BlogCard } from "../components/cards/BlogCard";
import { Icon } from "../components/common/Icon";
import { Photo } from "../components/common/Photo";
import { PageBanner } from "../components/ui/PageBanner";
import NotFound from "./NotFound";

export default function BlogPost({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) return <NotFound />;
  const related = POSTS.filter((p) => p.slug !== post.slug).sort((a) => (a.category === post.category ? -1 : 1)).slice(0, 3);

  return (
    <>
      <PageBanner title="Blog Details" crumb="Blog" />
      <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <Photo src={post.photo} fallback={post.image} alt={post.title} loading="eager" className="aspect-[16/9] w-full rounded-3xl object-cover shadow-lg" />
        <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
          <span className="rounded-full bg-brand-red px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-wide text-white">{post.category}</span>
          <span className="flex items-center gap-1"><Icon name="clock" size={13} />{formatDate(post.date)}</span>
          <span className="flex items-center gap-1"><Icon name="user" size={13} />{post.author}</span>
          <span>{post.readMins} min read</span>
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h2>
        <p className="mt-4 text-base font-medium leading-relaxed text-neutral-700">{post.excerpt}</p>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-600">{post.body.map((p) => <p key={p}>{p}</p>)}</div>
        <p className="mt-10"><Link to="/blog" className="font-display text-sm font-bold uppercase text-brand-red hover:underline">← Back to blog</Link></p>
      </article>

      <section className="bg-brand-cream/60 py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-center font-display text-3xl font-bold uppercase">More <span className="text-brand-red">stories</span></h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
        </div>
      </section>
    </>
  );
}
