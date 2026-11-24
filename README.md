# Agentic AI Engineering

A production-quality, content-first educational book for learning Agentic AI Engineering.

The roadmap follows the public
[Agentic AI Engineering curriculum](https://github.com/siddharthkumarrai/agentic-ai-engineering),
including sections 02 through 16.

## Stack

- Next.js App Router
- React
- TypeScript in strict mode
- Tailwind CSS
- ESLint
- Turbopack
- Lucide React
- Local MDX-ready content architecture

## Requirements

- Node.js 20.9 or newer
- npm

## Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Folder structure

```text
src/
  app/                 Application routes and layouts
  components/
    layout/            Global shell components
    navigation/        Desktop and mobile navigation
    book/              Reading experience components
    content/           Future rich content components
    ui/                Shared low-level UI
  config/              Application configuration
  data/                Typed curriculum metadata
  lib/
    content/           Content loading and navigation utilities
    utils/             Shared utilities
  types/               Shared TypeScript types

content/
  sections/            Future section-owned MDX content
  lessons/             Future lesson content

public/
  images/              Educational images
  diagrams/            Static diagrams

docs/                  Architecture and authoring documentation
```
