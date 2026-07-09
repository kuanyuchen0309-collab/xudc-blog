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
                count: number;
                }

                interface SubjectData {
                  name: string;
                    count: number;
                      notes: (NoteMeta & { content: string })[];
                      }

                      const subjects = notesData as SubjectData[];

                      export function getAllSubjects(): Subject[] {
                        return subjects.map((s) => ({ name: s.name, count: s.count }));
                        }

                        export function getNotesBySubject(subject: string): NoteMeta[] {
                          const found = subjects.find((s) => s.name === subject);
                            if (!found) return [];
                              return found.notes.map(({ content, ...meta }) => meta);
                              }

                              export function getNoteBySlug(
                                subject: string,
                                  slug: string
                                  ): { note: Note; prev: NoteMeta | null; next: NoteMeta | null } | null {
                                    const found = subjects.find((s) => s.name === subject);
                                      if (!found) return null;
                                        const idx = found.notes.findIndex((n) => n.slug === slug);
                                          if (idx === -1) return null;
                                            const strip = (n: NoteMeta & { content: string }): NoteMeta => {
                                                const { content, ...meta } = n;
                                                    return meta;
                                                      };
                                                        return {
                                                            note: found.notes[idx],
                                                                prev: idx > 0 ? strip(found.notes[idx - 1]) : null,
                                                                    next: idx < found.notes.length - 1 ? strip(found.notes[idx + 1]) : null,
                                                                      };
                                                                      }

                                                                      export interface SearchIndexItem {
                                                                        slug: string;
                                                                          title: string;
                                                                            subject: string;
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
                                                                                                                            content: note.content.slice(0, 1000),
                                                                                                                              });
                                                                                                                                      }
                                                                                                                                        }
                                                                                                                                          return index;
                                                                                                                                          }