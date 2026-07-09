import fs from "fs";
import path from "path";
import matter from "gray-matter";

const notesDir = path.join(process.cwd(), "content/notes");
const outFile = path.join(process.cwd(), "src/generated/notes-data.json");

function getSubjectNames() {
  if (!fs.existsSync(notesDir)) return [];
  return fs.readdirSync(notesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

function getNotes(subject) {
  const dir = path.join(notesDir, subject);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const slug = encodeURIComponent(file.replace(/\.md$/, ""));
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    try {
      const { data, content } = matter(raw);
      const updated = data.updated instanceof Date
        ? data.updated.toISOString().slice(0, 10)
        : (data.updated ?? "");
      return {
        slug,
        title: data.title ?? slug,
        subject,
        order: data.order ?? 0,
        updated,
        content,
      };
    } catch (err) {
      throw new Error(`解析 ${path.join(dir, file)} 的 frontmatter 失败: ${err.message}`);
    }
  }).sort((a, b) => a.order - b.order);
}

const subjects = getSubjectNames().map((name) => {
  const notes = getNotes(name);
  return { name, slug: encodeURIComponent(name), count: notes.length, notes };
}).sort((a, b) => a.name.localeCompare(b.name, "zh"));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(subjects, null, 2));
console.log(`已生成笔记索引：共 ${subjects.length} 个科目`);