import { BookOpen } from "lucide-react";
import Link from "next/link";

export function TopNavigation() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_92%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-[var(--ink)] text-white">
            <BookOpen aria-hidden="true" size={17} />
          </span>
          <span className="hidden sm:inline">Agentic AI Engineering</span>
          <span className="sm:hidden">Agentic AI</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <Link className="nav-link" href="/#roadmap">Roadmap</Link>
          <a
            className="nav-link grid size-9 place-items-center sm:flex sm:w-auto sm:gap-2 sm:px-3"
            href="https://github.com/siddharthkumarrai/agentic-ai-engineering"
            target="_blank"
            rel="noreferrer"
          >
            <span aria-hidden="true" className="text-base leading-none">GH</span>
            <span className="hidden sm:inline">Repository</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
