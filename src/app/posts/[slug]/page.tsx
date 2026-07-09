import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Markdown } from "@/components/markdown";
import { formatDate } from "@/utils/date";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "未找到" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <Link
        href="/"
        className="text-sm text-gray-400 hover:text-gray-600 transition-colors no-underline"
      >
        ← 文章列表
      </Link>

      <article className="mt-8 bg-white rounded-lg shadow-sm px-5 sm:px-10 py-10">
        <header className="mb-10 pb-5 border-b border-gray-100">
          <h1 className="text-2xl font-serif font-bold text-gray-900 m-0 leading-snug">
            {post.title}
          </h1>
          <time className="text-sm text-gray-400 mt-3 inline-block">
            {formatDate(post.date)}
          </time>
          {post.tags.length > 0 && (
            <div className="flex gap-2 mt-3">
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
        </header>

        <Markdown content={post.content} />
      </article>
    </div>
  );
}
