import { describe, expect, it } from "vitest";
import { getLessonNavigation } from "@/lib/content/get-navigation";
import type { LoadedLesson } from "@/lib/content/load-lessons";

const lessons: LoadedLesson[] = [
  {
    title: "First Lesson",
    slug: "first-lesson",
    section: "llm-foundations",
    description: "The first lesson.",
    sequence: 1,
    source: "First",
  },
  {
    title: "Second Lesson",
    slug: "second-lesson",
    section: "llm-foundations",
    description: "The second lesson.",
    sequence: 2,
    source: "Second",
  },
];

describe("lesson navigation", () => {
  it("derives previous and next links from sequence order", () => {
    expect(getLessonNavigation(lessons, "second-lesson")).toEqual({
      previous: lessons[0],
      next: null,
    });
  });

  it("returns null for an unknown lesson", () => {
    expect(getLessonNavigation(lessons, "missing-lesson")).toBeNull();
  });
});
