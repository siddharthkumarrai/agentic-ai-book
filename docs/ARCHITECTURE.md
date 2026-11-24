# Architecture

## Goals

The application is a local, content-first educational book. It supports sequential sections,
MDX lessons, rich diagrams, code examples, quizzes and navigation without a database or CMS.

## Routing

- `/` renders the book overview and roadmap.
- `/book/[sectionSlug]` renders a section placeholder or future section content.
- `/book/[sectionSlug]/[lessonSlug]` renders a lesson or an empty-state placeholder.

## Data model

`src/types/content.ts` defines typed lesson and section metadata. `src/data/curriculum.ts` contains
the public roadmap sequence. Lesson content must remain in `content/`; React components must not
contain published lesson prose.

## Components

- `src/app` contains routes and layouts.
- `src/components/layout` contains the global shell.
- `src/components/navigation` contains curriculum navigation.
- `src/components/book` contains reading and lesson presentation.
- `src/components/content` is reserved for reusable educational components.
- `src/components/ui` is reserved for low-level primitives.

## Content processing

Future lessons use MDX under `content/lessons`. Frontmatter supplies title, slug, section,
description, sequence number and reading time. Shared loaders derive previous/next links and
table-of-contents data.

## Rendering

Server Components are the default. Client Components are limited to interactions such as the mobile
navigation menu. Static or server-rendered routes remain SEO-friendly.

## Scalability

Curriculum metadata and content paths are centralized. Routes accept slugs, allowing many lessons
without route duplication. Search can later index generated content, while progress and quizzes can
use local or backend state only when a requirement introduces them.
