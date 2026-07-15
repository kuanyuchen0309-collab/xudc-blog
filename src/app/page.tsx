import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl lg:max-w-4xl mx-auto px-6 py-10">
      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">还没有文章。</p>
      ) : (
        posts.map((post) => <PostCard key={post.slug} post={post} />)
      )}
    </div>
  );
}
