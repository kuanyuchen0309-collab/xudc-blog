import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSubjects, getNotesBySubject, encodeUrl } from "@/lib/notes";

interface Props {
  params: Promise<{ subject: string }>;
}

export async function generateStaticParams() {
  const subjects = getAllSubjects();
  if (subjects.length === 0) return [{ subject: "__placeholder__" }];
  return subjects.map((s) => ({ subject: encodeUrl(s.name) }));
}

export async function generateMetadata({ params }: Props) {
  const { subject } = await params;
  const name = decodeURIComponent(subject);
  return { title: name };
}

export default async function SubjectPage({ params }: Props) {
  const { subject } = await params;
  const name = decodeURIComponent(subject);
  const notes = getNotesBySubject(name);
  if (notes.length === 0) notFound();

  return (
    <div className="max-w-3xl lg:max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/notes"
        className="text-sm text-gray-400 hover:text-black transition-colors no-underline"
      >
        ← 笔记目录
      </Link>

      <h1 className="text-2xl font-serif font-bold text-black mt-6 mb-6">
        {name}
      </h1>

      <div className="border-t border-gray-200">
        {notes.map((note) => (
          <Link
            key={note.slug}
            href={`/notes/${encodeUrl(name)}/${encodeUrl(note.slug)}`}
            className="flex items-center justify-between py-4 border-b border-gray-200 no-underline hover:bg-gray-50 transition-colors px-2 -mx-2"
          >
            <span>
              <span className="text-gray-400 text-sm mr-3">
                {String(note.order).padStart(2, "0")}
              </span>
              <span className="text-black">{note.title}</span>
            </span>
            <span className="text-gray-400 text-sm shrink-0 ml-4">
              {note.updated}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
