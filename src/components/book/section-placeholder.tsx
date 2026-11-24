import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import type { SectionMetadata } from "@/types/content";

export function SectionPlaceholder({ section }: { section: SectionMetadata }) {
  return (
    <article className="reading-container">
      <div className="mb-8 flex items-center justify-between">
        <span className="eyebrow">Section {String(section.sequence).padStart(2, "0")}</span>
        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]">
          Coming soon
        </span>
      </div>
      <h1>{section.title}</h1>
      <p className="lead">{section.description}</p>
      <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <BookOpen aria-hidden="true" className="mb-4 text-[var(--accent)]" size={22} />
        <h2 className="mt-0 text-xl">Lessons are being prepared</h2>
        <p className="mb-0">
          This section follows the project roadmap. Its first lesson will appear here as content is added.
        </p>
      </div>
      <nav className="mt-10 grid gap-3 border-t border-[var(--border)] pt-6 sm:grid-cols-2">
        <Link href="/#roadmap" className="lesson-nav-card">
          <ArrowLeft aria-hidden="true" size={16} />
          <span><small>Back</small>Curriculum roadmap</span>
        </Link>
      </nav>
    </article>
  );
}
