import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getSection } from "@/data/curriculum";
import { getLesson, getLessonsForSection } from "@/lib/content/load-lessons";
import { getLessonNavigation } from "@/lib/content/get-navigation";
import { getMDXComponents } from "@/mdx-components";

type PageProps = {
  params: Promise<{ sectionSlug: string; lessonSlug: string }>;
};

export const instant = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sectionSlug, lessonSlug } = await params;
  const section = getSection(sectionSlug);
  const lesson = section ? getLesson(sectionSlug, lessonSlug) : undefined;
  return {
    title: lesson
      ? `${lesson.title} | ${section?.title} | Agentic AI Engineering`
      : "Lesson Not Found",
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { sectionSlug, lessonSlug } = await params;
  const section = getSection(sectionSlug);
  if (!section) notFound();
  const lesson = getLesson(sectionSlug, lessonSlug);
  if (!lesson) notFound();
  const navigation = getLessonNavigation(
    getLessonsForSection(sectionSlug),
    lessonSlug,
  );
  const components = getMDXComponents();

  return (
    <article className="reading-container">
      <span className="eyebrow">{section.title}</span>
      <h1>{lesson.title}</h1>
      {lesson.description ? <p className="lead">{lesson.description}</p> : null}
      <div className="mdx-content mt-10">
        <MDXRemote source={lesson.source} components={components} />
      </div>
      <nav className="mt-12 grid gap-3 border-t border-[var(--border)] pt-6 sm:grid-cols-2" aria-label="Lesson navigation">
        {navigation?.previous ? (
          <Link
            href={`/book/${sectionSlug}/${navigation.previous.slug}`}
            className="lesson-nav-card"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            <span><small>Previous</small>{navigation.previous.title}</span>
          </Link>
        ) : <span />}
        {navigation?.next ? (
          <Link
            href={`/book/${sectionSlug}/${navigation.next.slug}`}
            className="lesson-nav-card sm:justify-end sm:text-right"
          >
            <span><small>Next</small>{navigation.next.title}</span>
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
