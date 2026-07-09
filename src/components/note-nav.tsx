import Link from "next/link";
import type { NoteMeta } from "@/lib/notes";
import { encodeUrl } from "@/lib/notes";

export function NoteNav({
  prev,
  next,
  subject,
}: {
  prev: NoteMeta | null;
  next: NoteMeta | null;
  subject: string;
}) {
  return (
    <nav className="flex justify-between mt-12 pt-6 border-t border-gray-100 text-sm">
      {prev ? (
        <Link
          href={`/notes/${encodeUrl(subject)}/${encodeUrl(prev.slug)}`}
          className="text-gray-500 hover:text-gray-900 transition-colors no-underline"
        >
          ← {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/notes/${encodeUrl(subject)}/${encodeUrl(next.slug)}`}
          className="text-gray-500 hover:text-gray-900 transition-colors no-underline"
        >
          {next.title} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
