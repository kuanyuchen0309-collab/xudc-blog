import Link from "next/link";
import { getAllSubjects, buildSearchIndex } from "@/lib/notes";
import { NoteSearch } from "@/components/note-search";

export const dynamic = "force-static";

export default function NotesIndexPage() {
  const subjects = getAllSubjects();
  const searchIndex = buildSearchIndex();

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <Link
        href="/"
        className="text-sm text-gray-400 hover:text-gray-600 transition-colors no-underline"
      >
        ← 首页
      </Link>

      <h1 className="text-2xl font-serif font-bold text-gray-900 mt-6 mb-4">
        三副
      </h1>

      <NoteSearch index={searchIndex} />

      <div className="space-y-3 mt-8">
        {subjects.length === 0 ? (
          <p className="text-gray-400 text-sm">还没有笔记。</p>
        ) : (
          subjects.map((s) => (
            <Link
              key={s.name}
              href={`/notes/${s.slug}`}
              className="block bg-white rounded-lg shadow-sm px-6 py-4 no-underline hover:shadow-md transition-shadow"
            >
              <span className="text-gray-800 font-medium">{s.name}</span>
              <span className="text-gray-400 text-sm ml-2">
                {s.count} 篇笔记
              </span>
              <span className="float-right text-gray-300">→</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}