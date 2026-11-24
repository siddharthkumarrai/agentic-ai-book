# Agent Instructions

## Project purpose

This repository contains the Agentic AI Engineering educational book. Build and maintain a local
content-first Next.js application. Do not add lessons or chapters unless the user provides them.

## Content rules

1. Write all published book content in simple, clear English.
2. Never use Hindi or Hinglish in the book.
3. Treat user-provided content as the primary source.
4. Preserve its original concepts, examples and intended meaning.
5. Organize content into a logical learning sequence.
6. Never invent technical facts or unsupported claims.
7. Verify version-sensitive technical information against official documentation when appropriate.
8. Use practical examples wherever they improve understanding.
9. Use tables for meaningful comparisons.
10. Use Mermaid diagrams or custom diagrams only when they genuinely improve understanding.
11. Use images only when they provide educational value.
12. Give diagrams and images accessible descriptions.
13. Keep lesson formatting consistent across the entire book.
14. Keep components reusable and maintainable.
15. Never unnecessarily rewrite unrelated chapters when adding a new lesson.

## Engineering rules

- Use TypeScript strict mode and avoid unnecessary `any`.
- Prefer Server Components; add Client Components only for interaction.
- Keep route components thin and put reusable behavior in feature folders.
- Keep curriculum metadata separate from lesson content.
- Use semantic HTML, accessible names and strong keyboard behavior.
- Preserve SEO metadata and responsive layouts.
- Do not introduce a database, CMS, authentication, payments or external AI APIs in this foundation.
- Do not copy roadmap lessons into React components or create fake lessons.
- Verify lint, type checking and production builds after code changes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
