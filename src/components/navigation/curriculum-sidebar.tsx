"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { curriculum } from "@/data/curriculum";

export function CurriculumSidebar() {
  const pathname = usePathname();
  const activeSection = pathname.split("/")[2];
  return (
    <aside className="hidden w-64 shrink-0 border-r border-[var(--border)] lg:block">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
          Curriculum
        </p>
        <nav aria-label="Book sections" className="space-y-1">
          {curriculum.map((section) => {
            const active = section.slug === activeSection;
            return (
              <Link
                key={section.slug}
                href={`/book/${section.slug}`}
                className={`group flex items-start gap-2 rounded-lg px-2 py-2 text-sm leading-5 ${
                  active
                    ? "bg-[var(--surface-active)] font-medium text-[var(--ink)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]"
                }`}
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-[var(--border)] text-[10px] tabular-nums">
                  {String(section.sequence).padStart(2, "0")}
                </span>
                <span className="flex-1">{section.title}</span>
                {active ? <ChevronRight aria-hidden="true" className="mt-0.5" size={14} /> : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
