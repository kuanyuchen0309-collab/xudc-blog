import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/utils/date";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="mb-10">
      <time className="text-sm text-gray-400">{formatDate(post.date)}</time>
      <h2 className="mt-1 mb-2">
        <Link
          href={`/posts/${post.slug}`}
          className="text-xl font-serif font-bold text-black no-underline hover:text-[#1a3a5c] transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed m-0">
        {post.excerpt}
      </p>
      {post.tags.length > 0 && (
        <div className="flex gap-2 mt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
