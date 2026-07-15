import Link from "next/link";

export function Header() {
  return (
    <header className="max-w-3xl lg:max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
      <Link
        href="/"
        className="text-lg font-bold text-black tracking-wide no-underline"
      >
        XUDC.ORG
      </Link>
      <nav className="flex gap-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-black transition-colors">
          文章
        </Link>
        <Link href="/notes" className="hover:text-black transition-colors">
          笔记
        </Link>
        <Link href="/about" className="hover:text-black transition-colors">
          关于
        </Link>
      </nav>
    </header>
  );
}
