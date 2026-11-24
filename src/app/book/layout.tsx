import type { ReactNode } from "react";
import { TopNavigation } from "@/components/layout/top-navigation";
import { CurriculumSidebar } from "@/components/navigation/curriculum-sidebar";
import { MobileCurriculum } from "@/components/navigation/mobile-curriculum";

export default function BookLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopNavigation />
      <div className="mx-auto flex max-w-[1440px]">
        <CurriculumSidebar />
        <main className="min-w-0 flex-1">
          <div className="border-b border-[var(--border)] px-4 py-3 lg:hidden">
            <MobileCurriculum />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
