import { curriculum } from "@/data/curriculum";
import type { LoadedLesson } from "@/lib/content/load-lessons";

export function getSectionIndex(slug: string) {
  return curriculum.findIndex((section) => section.slug === slug);
}

export function getLessonNavigation(
  lessons: LoadedLesson[],
  lessonSlug: string,
) {
  const lessonIndex = lessons.findIndex((lesson) => lesson.slug === lessonSlug);
  if (lessonIndex < 0) return null;
  return {
    previous: lessonIndex > 0 ? lessons[lessonIndex - 1] : null,
    next: lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null,
  };
}
