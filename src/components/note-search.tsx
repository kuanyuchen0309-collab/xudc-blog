"use client";

import { useState } from "react";
import Link from "next/link";
import type { SearchIndexItem } from "@/lib/notes";

export function NoteSearch({ index }: { index: SearchIndexItem[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchIndexItem[]>([]);

  function handleSearch(value: string) {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    const q = value.toLowerCase();
    const filtered = index.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 10));
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="搜索笔记..."
        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {results.map((item) => (
            <li key={`${item.subject}/${item.slug}`}>
              <Link
                href={`/notes/${item.subjectSlug}/${item.slug}`}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 no-underline"
                onClick={() => {
                  setQuery("");
                  setResults([]);
                }}
              >
                <span className="font-medium">{item.title}</span>
                <span className="text-gray-400 ml-2">{item.subject}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {query && results.length === 0 && (
        <p className="text-sm text-gray-400 mt-2">没有匹配结果</p>
      )}
    </div>
  );
}
