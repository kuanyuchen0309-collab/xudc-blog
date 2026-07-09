import fs from "fs";
import path from "path";
import matter from "gray-matter";

const notesDir = path.join(process.cwd(), "content/notes");

export interface NoteMeta {
  slug: string;
  title: string;
  subject: string;
  order: number;
  updated: string;
}

export interface Note extends NoteMeta {
  content: string;
}

export interface Subject {
  name: string;
  count: number;
}

export function getAllSubjects(): Subject[] {
  if (!fs.existsSync(notesDir)) return [];

  const entries = fs.readdirSync(notesDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => ({
      name: e.name,
      count: getNotesBySubject(e.name).length,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "zh"));
}

export function getNotesBySubject(subject: string): NoteMeta[] {
  const subjectDir = path.join(notesDir, subject);
  if (!fs.existsSync(subjectDir)) return [];

  const files = fs.readdirSync(subjectDir).filter((f) => f.endsWith(".md"));

  const notes = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(subjectDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      subject: data.subject ?? subject,
      order: data.order ?? 0,
      updated: data.updated ?? "",
    } as NoteMeta;
  });

  return notes.sort((a, b) => a.order - b.order);
}

export function getNoteBySlug(
  subject: string,
  slug: string
): { note: Note; prev: NoteMeta | null; next: NoteMeta | null } | null {
  const filePath = path.join(notesDir, subject, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const note: Note = {
    slug,
    title: data.title ?? slug,
    subject: data.subject ?? subject,
    order: data.order ?? 0,
    updated: data.updated ?? "",
    content,
  };

  const allNotes = getNotesBySubject(subject);
  const idx = allNotes.findIndex((n) => n.slug === slug);
  const prev = idx > 0 ? allNotes[idx - 1] : null;
  const next = idx < allNotes.length - 1 ? allNotes[idx + 1] : null;

  return { note, prev, next };
}

export interface SearchIndexItem {
  slug: string;
  title: string;
  subject: string;
  content: string;
}

export function buildSearchIndex(): SearchIndexItem[] {
  const subjects = getAllSubjects();
  const index: SearchIndexItem[] = [];

  for (const subj of subjects) {
    const notes = getNotesBySubject(subj.name);
    for (const meta of notes) {
      const full = getNoteBySlug(subj.name, meta.slug);
      if (full) {
        index.push({
          slug: full.note.slug,
          title: full.note.title,
          subject: full.note.subject,
          content: full.note.content.slice(0, 1000),
        });
      }
    }
  }

  return index;
}
