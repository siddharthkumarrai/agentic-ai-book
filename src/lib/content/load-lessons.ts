import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { getSection } from "@/data/curriculum";
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
});

export type LoadedLesson = LessonMetadata & {
  source: string;
};

export function getLessonsForSection(sectionSlug: string): LoadedLesson[] {
  if (!getSection(sectionSlug)) return [];
  const directory = path.join(process.cwd(), "content", "lessons", sectionSlug);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => /\.(md|mdx)$/.test(file))
    .map((file) => {
      const source = fs.readFileSync(path.join(directory, file), "utf8");
      const { data, content } = matter(source);
      const parsed = lessonFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        return null;
      }
      if (parsed.data.section !== sectionSlug) {
        return null;
      }
      return { ...parsed.data, source: content };
    })
    .filter((lesson): lesson is LoadedLesson => lesson !== null)
    .sort((first, second) => first.sequence - second.sequence);
}

export function getLesson(sectionSlug: string, lessonSlug: string) {
  if (!getSection(sectionSlug)) return undefined;
  const filePath = path.join(
    process.cwd(),
    "content",
    "lessons",
    sectionSlug,
    `${lessonSlug}.mdx`,
  );
  if (!fs.existsSync(filePath)) return undefined;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const parsed = lessonFrontmatterSchema.safeParse(data);
  if (!parsed.success) return undefined;
  if (
    parsed.data.section !== sectionSlug ||
    parsed.data.slug !== lessonSlug
  ) {
    return undefined;
  }

  return { ...parsed.data, source: content };
}
