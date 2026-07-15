import Link from "next/link";
import { getAllSubjects, buildSearchIndex, encodeUrl } from "@/lib/notes";
import { NoteSearch } from "@/components/note-search";

export const dynamic = "force-static";

export default function NotesIndexPage() {
  const subjects = getAllSubjects();
  const searchIndex = buildSearchIndex();

  return (
    <div className="max-w-3xl lg:max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="text-sm text-gray-400 hover:text-black transition-colors no-underline"
      >
        ← 首页
      </Link>

      <h1 className="text-2xl font-serif font-bold text-black mt-6 mb-4">
        三副
      </h1>

      <NoteSearch index={searchIndex} />

      <div className="mt-8 border-t border-gray-200">
        {subjects.length === 0 ? (
          <p className="text-gray-400 text-sm py-6">还没有笔记。</p>
        ) : (
          subjects.map((s) => (
            <Link
              key={s.name}
              href={`/notes/${encodeUrl(s.name)}`}
              className="flex items-baseline justify-between py-4 border-b border-gray-200 no-underline hover:bg-gray-50 transition-colors px-2 -mx-2"
            >
              <span className="text-black font-medium">
                {s.name}
                <span className="text-gray-400 text-sm font-normal ml-2">
                  {s.count} 篇笔记
                </span>
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}