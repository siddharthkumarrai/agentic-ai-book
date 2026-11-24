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

function parseLessonFile(
  filePath: string,
  expectedSection: string,
  expectedSlug?: string,
): LoadedLesson {
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const parsed = lessonFrontmatterSchema.safeParse(data);
  const relativePath = path.relative(process.cwd(), filePath);

  if (!parsed.success) {
    throw new Error(`Invalid lesson frontmatter in ${relativePath}`);
  }
  if (parsed.data.section !== expectedSection) {
    throw new Error(`Lesson section mismatch in ${relativePath}`);
  }
  if (expectedSlug && parsed.data.slug !== expectedSlug) {
    throw new Error(`Lesson slug does not match its filename in ${relativePath}`);
  }

  return { ...parsed.data, source: content };
}

export function getLessonsForSection(sectionSlug: string): LoadedLesson[] {
  if (!getSection(sectionSlug)) return [];
  const directory = path.join(process.cwd(), "content", "lessons", sectionSlug);
  if (!fs.existsSync(directory)) return [];

  const lessons = fs
    .readdirSync(directory)
    .filter((file) => /\.(md|mdx)$/.test(file))
    .map((file) =>
      parseLessonFile(
        path.join(directory, file),
        sectionSlug,
        path.basename(file, path.extname(file)),
      ),
    )
    .sort((first, second) => first.sequence - second.sequence);

  for (let index = 1; index < lessons.length; index += 1) {
    if (lessons[index - 1].sequence === lessons[index].sequence) {
      throw new Error(
        `Duplicate lesson sequence ${lessons[index].sequence} in section ${sectionSlug}`,
      );
    }
  }

  return lessons;
}

export function getLesson(sectionSlug: string, lessonSlug: string) {
  if (!getSection(sectionSlug)) return undefined;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lessonSlug)) return undefined;
  const filePath = path.join(process.cwd(), "content", "lessons", sectionSlug, `${lessonSlug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  return parseLessonFile(filePath, sectionSlug, lessonSlug);
}

export function getFirstLessonForSection(sectionSlug: string) {
  return getLessonsForSection(sectionSlug)[0];
}
