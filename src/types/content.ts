export type LessonMetadata = {
  title: string;
  slug: string;
  section: string;
  description: string;
  sequence: number;
  readingTimeMinutes?: number;
};

export type SectionMetadata = {
  title: string;
  slug: string;
  sequence: number;
  description: string;
};
