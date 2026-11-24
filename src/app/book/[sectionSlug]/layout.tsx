import type { ReactNode } from "react";
import { TopNavigation } from "@/components/layout/top-navigation";
import { CurriculumSidebar } from "@/components/navigation/curriculum-sidebar";
import { MobileCurriculum } from "@/components/navigation/mobile-curriculum";

export default async function BookLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ sectionSlug: string }>;
}) {
  const { sectionSlug } = await params;
  return (
    <div className="min-h-screen">
      <TopNavigation />
      <div className="mx-auto flex max-w-[1440px]">
        <CurriculumSidebar activeSection={sectionSlug} />
        <main className="min-w-0 flex-1">
          <div className="border-b border-[var(--border)] px-4 py-3 lg:hidden">
            <MobileCurriculum activeSection={sectionSlug} />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
