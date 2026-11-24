import { describe, expect, it } from "vitest";
import {
  lessonFrontmatterSchema,
} from "@/lib/content/load-lessons";

describe("lesson frontmatter validation", () => {
  it("accepts complete valid frontmatter", () => {
    const result = lessonFrontmatterSchema.safeParse({
      title: "Model API Basics",
      slug: "model-api-basics",
      section: "llm-foundations",
      description: "Learn the basic model request and response loop.",
      sequence: 1,
      readingTimeMinutes: 8,
    });

    expect(result.success).toBe(true);
  });

  it("rejects URL-unsafe slugs", () => {
    const result = lessonFrontmatterSchema.safeParse({
      title: "Invalid Lesson",
      slug: "Invalid Lesson",
      section: "LLM Foundations",
      description: "This lesson has invalid route values.",
      sequence: 1,
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid sequence numbers", () => {
    const result = lessonFrontmatterSchema.safeParse({
      title: "Invalid Lesson",
      slug: "invalid-lesson",
      section: "llm-foundations",
      description: "This lesson has an invalid sequence.",
      sequence: 0,
    });

    expect(result.success).toBe(false);
  });
});
