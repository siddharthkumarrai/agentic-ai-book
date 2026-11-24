"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { curriculum } from "@/data/curriculum";

export function MobileCurriculum() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const activeSection = pathname.split("/")[2];

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-[var(--border)] px-3 text-sm"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-curriculum"
      >
        <Menu aria-hidden="true" size={16} />
        Sections
      </button>
      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/25 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close curriculum"
          />
          <aside
            id="mobile-curriculum"
            className="absolute right-0 top-0 h-full w-[min(86vw,22rem)] bg-[var(--background)] p-4 shadow-2xl"
            aria-label="Curriculum"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="font-semibold">Curriculum</span>
              <button
                type="button"
                className="grid size-9 place-items-center rounded-lg hover:bg-[var(--surface)]"
                onClick={() => setOpen(false)}
                aria-label="Close curriculum"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
            <nav className="space-y-1">
              {curriculum.map((section) => (
                <Link
                  key={section.slug}
                  href={`/book/${section.slug}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm ${
                    section.slug === activeSection
                      ? "bg-[var(--surface-active)] font-medium"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {String(section.sequence).padStart(2, "0")} · {section.title}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
