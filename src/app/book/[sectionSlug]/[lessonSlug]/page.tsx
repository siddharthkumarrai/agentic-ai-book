import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSection } from "@/data/curriculum";

type PageProps = {
  params: Promise<{ sectionSlug: string; lessonSlug: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sectionSlug } = await params;
  const section = getSection(sectionSlug);
  return {
    title: section ? `${section.title} Lesson | Agentic AI Engineering` : "Lesson Not Found",
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { sectionSlug, lessonSlug } = await params;
  const section = getSection(sectionSlug);
  if (!section) notFound();

  return (
    <article className="reading-container">
      <span className="eyebrow">{section.title}</span>
      <h1>Lesson coming soon</h1>
      <p className="lead">
        The lesson route <code>{lessonSlug}</code> is ready for future MDX content.
      </p>
      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="mb-0">
          No lesson has been published in this section yet. Curriculum metadata remains separate from
          the content authoring system.
        </p>
      </div>
    </article>
  );
}
