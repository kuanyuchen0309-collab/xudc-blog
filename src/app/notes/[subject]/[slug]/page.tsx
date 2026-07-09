import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSubjects, getNotesBySubject, getNoteBySlug, encodeUrl } from "@/lib/notes";
import { Markdown } from "@/components/markdown";
import { NoteNav } from "@/components/note-nav";

interface Props {
  params: Promise<{ subject: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { subject: string; slug: string }[] = [];
  for (const s of getAllSubjects()) {
    for (const note of getNotesBySubject(s.name)) {
      params.push({ subject: encodeUrl(s.name), slug: encodeUrl(note.slug) });
    }
  }
  if (params.length === 0) return [{ subject: "__placeholder__", slug: "__placeholder__" }];
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { subject, slug } = await params;
  const name = decodeURIComponent(subject);
  const result = getNoteBySlug(name, decodeURIComponent(slug));
  if (!result) return { title: "未找到" };
  return { title: `${result.note.title} — ${name}` };
}

export default async function NoteDetailPage({ params }: Props) {
  const { subject, slug } = await params;
  const name = decodeURIComponent(subject);
  const result = getNoteBySlug(name, decodeURIComponent(slug));
  if (!result) notFound();

  const { note, prev, next } = result;

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <Link
        href={`/notes/${encodeUrl(name)}`}
        className="text-sm text-gray-400 hover:text-gray-600 transition-colors no-underline"
      >
        ← {name}
      </Link>

      <article className="mt-6 bg-white rounded-lg shadow-sm px-5 sm:px-10 py-10">
        <header className="mb-10 pb-5 border-b border-gray-100">
          <h1 className="text-2xl font-serif font-bold text-gray-900 m-0 leading-snug">
            {note.title}
          </h1>
          <p className="text-sm text-gray-400 mt-3 m-0">
            更新于 {note.updated}
          </p>
        </header>

        <Markdown content={note.content} />

        <NoteNav prev={prev} next={next} subject={name} />
      </article>
    </div>
  );
}
