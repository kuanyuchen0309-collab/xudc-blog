import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">还没有文章。</p>
      ) : (
        posts.map((post) => <PostCard key={post.slug} post={post} />)
      )}
    </div>
  );
}
