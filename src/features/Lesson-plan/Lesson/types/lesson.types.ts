export type LessonDTO = {
  id: number;
  name: string;
  sortedOrder: number;
};

export type LessonSummary = {
  levelSubjectId: number;
  level: string;
  subject: string;
  lessons: LessonDTO[];
};
export interface Lesson {
  id: number;
  name: string;
  // autres champs si besoin
}

export interface LessonLevelItem {
  level: string;
  subject: string;
  lessons: Lesson[];
}
