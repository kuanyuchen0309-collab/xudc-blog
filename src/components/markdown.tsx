import { marked } from "marked";

export function Markdown({ content }: { content: string }) {
  const html = marked.parse(content) as string;
  return (
    <div
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
