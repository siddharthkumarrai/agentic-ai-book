import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import type { LessonMetadata, SectionMetadata } from "@/types/content";

export function SectionPlaceholder({
  section,
  lessons,
}: {
  section: SectionMetadata;
  lessons: LessonMetadata[];
}) {
  return (
    <article className="reading-container">
      <div className="mb-8 flex items-center justify-between">
        <span className="eyebrow">Section {String(section.sequence).padStart(2, "0")}</span>
        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]">
          {lessons.length ? `${lessons.length} lessons` : "Coming soon"}
        </span>
      </div>
      <h1>{section.title}</h1>
      <p className="lead">{section.description}</p>
      {lessons.length > 0 ? (
        <nav className="mt-10 space-y-3" aria-label={`${section.title} lessons`}>
          {lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/book/${section.slug}/${lesson.slug}`}
              className="lesson-list-card"
            >
              <span className="lesson-list-copy">
                <small>Lesson {String(lesson.sequence).padStart(2, "0")}</small>
                <strong>{lesson.title}</strong>
                <span>{lesson.description}</span>
              </span>
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          ))}
        </nav>
      ) : (
        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <BookOpen aria-hidden="true" className="mb-4 text-[var(--accent)]" size={22} />
          <h2 className="mt-0 text-xl">Lessons are being prepared</h2>
          <p className="mb-0">
            This section follows the project roadmap. Lessons will appear here as content is added.
          </p>
        </div>
      )}
      <nav className="mt-10 grid gap-3 border-t border-[var(--border)] pt-6 sm:grid-cols-2">
        <Link href="/#roadmap" className="lesson-nav-card">
          <ArrowLeft aria-hidden="true" size={16} />
          <span><small>Back</small>Curriculum roadmap</span>
        </Link>
      </nav>
    </article>
  );
}
