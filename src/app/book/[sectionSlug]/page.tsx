import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { curriculum, getSection } from "@/data/curriculum";
import { SectionPlaceholder } from "@/components/book/section-placeholder";
import { getLessonsForSection } from "@/lib/content/load-lessons";

type PageProps = {
  params: Promise<{ sectionSlug: string }>;
};

export const instant = false;

export function generateStaticParams() {
  return curriculum.map((section) => ({ sectionSlug: section.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sectionSlug } = await params;
  const section = getSection(sectionSlug);
  return {
    title: section?.title ?? "Section Not Found",
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { sectionSlug } = await params;
  const section = getSection(sectionSlug);
  if (!section) notFound();
  return (
    <SectionPlaceholder
      section={section}
      lessons={getLessonsForSection(sectionSlug)}
    />
  );
}
