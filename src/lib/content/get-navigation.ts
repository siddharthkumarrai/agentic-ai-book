import { curriculum } from "@/data/curriculum";
import type { LessonMetadata } from "@/types/content";

export function getSectionIndex(slug: string) {
  return curriculum.findIndex((section) => section.slug === slug);
}

export function getLessonNavigation(
  lessons: LessonMetadata[],
  lessonSlug: string,
) {
  const lessonIndex = lessons.findIndex((lesson) => lesson.slug === lessonSlug);
  if (lessonIndex < 0) return null;
  return {
    previous: lessonIndex > 0 ? lessons[lessonIndex - 1] : null,
    next: lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null,
  };
}
