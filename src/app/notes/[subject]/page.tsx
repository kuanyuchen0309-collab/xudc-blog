import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSubjects, getNotesBySubject } from "@/lib/notes";

interface Props {
  params: Promise<{ subject: string }>;
}

export async function generateStaticParams() {
  const subjects = getAllSubjects();
  if (subjects.length === 0) return [{ subject: "__placeholder__" }];
  return subjects.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { subject } = await params;
  const displayName = decodeURIComponent(subject);
  return { title: displayName };
}

export default async function SubjectPage({ params }: Props) {
  const { subject } = await params;
  const notes = getNotesBySubject(subject);
  const displayName = decodeURIComponent(subject);
  if (notes.length === 0) notFound();

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <Link
        href="/notes"
        className="text-sm text-gray-400 hover:text-gray-600 transition-colors no-underline"
      >
        ← 笔记目录
      </Link>

      <h1 className="text-2xl font-serif font-bold text-gray-900 mt-6 mb-6">
        {displayName}
      </h1>

      <div className="space-y-2">
        {notes.map((note) => (
          <Link
            key={note.slug}
            href={`/notes/${subject}/${note.slug}`}
            className="block bg-white rounded-lg shadow-sm px-6 py-4 no-underline hover:shadow-md transition-shadow"
          >
            <span className="text-gray-500 text-sm mr-3">
              {String(note.order).padStart(2, "0")}
            </span>
            <span className="text-gray-800">{note.title}</span>
            <span className="text-gray-400 text-sm float-right">
              {note.updated}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
