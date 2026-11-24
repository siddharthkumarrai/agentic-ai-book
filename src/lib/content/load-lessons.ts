import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { LessonMetadata } from "@/types/content";

export const lessonFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and URL-safe"),
  section: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and URL-safe"),
  description: z.string().min(1),
  sequence: z.number().int().positive(),
  readingTimeMinutes: z.number().int().positive().optional(),
  previousLesson: z.string().optional(),
  nextLesson: z.string().optional(),
});

export function getLessonsForSection(sectionSlug: string): LessonMetadata[] {
  const directory = path.join(process.cwd(), "content", "lessons", sectionSlug);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => /\.(md|mdx)$/.test(file))
    .map((file) => {
      const source = fs.readFileSync(path.join(directory, file), "utf8");
      const parsed = lessonFrontmatterSchema.safeParse(matter(source).data);
      if (!parsed.success) {
        throw new Error(
          `Invalid lesson frontmatter in ${path.relative(process.cwd(), path.join(directory, file))}`,
        );
      }
      if (parsed.data.section !== sectionSlug) {
        throw new Error(
          `Lesson section mismatch in ${path.relative(process.cwd(), path.join(directory, file))}`,
        );
      }
      return parsed.data;
    })
    .sort((first, second) => first.sequence - second.sequence);
}

export function getLesson(sectionSlug: string, lessonSlug: string) {
  return getLessonsForSection(sectionSlug).find((lesson) => lesson.slug === lessonSlug);
}
