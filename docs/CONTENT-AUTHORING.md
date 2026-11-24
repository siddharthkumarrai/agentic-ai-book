# Content Authoring

## Adding a lesson

1. Add the section to `src/data/curriculum.ts` only if it is not already present.
2. Create an MDX file under `content/lessons/[section-slug]/[lesson-slug].mdx`.
3. Add all lesson-specific metadata to frontmatter.
4. The frontmatter `sequence` field defines lesson ordering within the section.
5. Previous and next links are generated automatically; do not duplicate them in frontmatter.
6. Do not add fake or invented lessons.

## Required metadata

```yaml
---
title: Lesson title
slug: lesson-slug
section: section-slug
description: A concise explanation of the lesson.
sequence: 1
readingTimeMinutes: 12
---
```

## MDX conventions

- Use one clear H1 only for page-level title rendering.
- Use H2 and H3 headings for lesson structure.
- Prefer short paragraphs and practical examples.
- Use fenced code blocks with explicit languages.
- Use tables for meaningful comparisons.
- Add alt text or textual descriptions to every image and diagram.
- Use Mermaid only when it makes a concept easier to understand.

## Quizzes

Quiz components accept typed question data rather than embedding questions in route components.
Each question includes the prompt, choices, answer and a concise explanation.

## Images and diagrams

Place static images in `public/images` and diagrams in `public/diagrams`.
