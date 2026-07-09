import Link from "next/link";

export function Header() {
  return (
    <header className="max-w-2xl mx-auto px-5 py-8 flex items-center justify-between">
      <Link
        href="/"
        className="text-lg font-bold text-gray-900 tracking-wide no-underline"
      >
        XUDC.ORG
      </Link>
      <nav className="flex gap-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          文章
        </Link>
        <Link href="/notes" className="hover:text-gray-900 transition-colors">
          笔记
        </Link>
        <Link href="/about" className="hover:text-gray-900 transition-colors">
          关于
        </Link>
      </nav>
    </header>
  );
}
