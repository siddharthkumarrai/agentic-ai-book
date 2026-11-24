import { curriculum, getSection } from "@/data/curriculum";

export function getSectionIndex(slug: string) {
  return curriculum.findIndex((section) => section.slug === slug);
}

export function getLessonNavigation(sectionSlug: string, lessonSlug: string) {
  const sectionIndex = getSectionIndex(sectionSlug);
  const section = getSection(sectionSlug);
  const lessonIndex = section?.lessons.findIndex(
    (lesson) => lesson.slug === lessonSlug,
  ) ?? -1;

  if (!section || lessonIndex < 0) return null;

  const previous =
    lessonIndex > 0
      ? section.lessons[lessonIndex - 1]
      : sectionIndex > 0
        ? curriculum[sectionIndex - 1]
        : null;
  const next =
    lessonIndex < section.lessons.length - 1
      ? section.lessons[lessonIndex + 1]
      : curriculum[sectionIndex + 1] ?? null;

  return { previous, next };
}
