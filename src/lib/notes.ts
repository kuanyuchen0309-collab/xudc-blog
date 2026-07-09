import notesData from "@/generated/notes-data.json";

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
  slug: string;
  count: number;
}

interface SubjectData {
  name: string;
  slug: string;
  count: number;
  notes: (NoteMeta & { content: string })[];
}

if (!Array.isArray(notesData)) {
  throw new Error("notes-data.json 格式错误：期望数组");
}
const subjects: SubjectData[] = notesData;

export function getAllSubjects(): Subject[] {
  return subjects.map((s) => ({ name: s.name, slug: s.slug, count: s.count }));
}

function findSubject(id: string): SubjectData | undefined {
  return subjects.find((s) => s.slug === id) ?? subjects.find((s) => s.name === id);
}

export function getNotesBySubject(id: string): NoteMeta[] {
  const found = findSubject(id);
  if (!found) return [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return found.notes.map(({ content, ...meta }) => meta);
}

export function getNoteBySlug(
  subjectId: string,
  slug: string
): { note: Note; prev: NoteMeta | null; next: NoteMeta | null } | null {
  const found = findSubject(subjectId);
  if (!found) return null;
  const idx = found.notes.findIndex((n) => n.slug === slug);
  if (idx === -1) return null;
  const strip = (n: NoteMeta & { content: string }): NoteMeta => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...meta } = n;
    return meta;
  };
  return {
    note: { ...found.notes[idx] },
    prev: idx > 0 ? strip(found.notes[idx - 1]) : null,
    next: idx < found.notes.length - 1 ? strip(found.notes[idx + 1]) : null,
  };
}

export interface SearchIndexItem {
  slug: string;
  title: string;
  subject: string;
  subjectSlug: string;
  content: string;
}

export function buildSearchIndex(): SearchIndexItem[] {
  const index: SearchIndexItem[] = [];
  for (const subj of subjects) {
    for (const note of subj.notes) {
      index.push({
        slug: note.slug,
        title: note.title,
        subject: note.subject,
        subjectSlug: subj.slug,
        content: note.content.slice(0, 1000),
      });
    }
  }
  return index;
}