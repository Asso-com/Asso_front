export type TopicRequestDto = {
  lessonId: number;
  topicDescriptions: string[];
};

export type TopicSummary = {
  lessonId: number;
  lessonName: string;
  levelSubject: string;
  topics: {
    id: number;
    description: string;
    sortedOrder: number;
  }[];
};
export interface TopicUpdateDto {
  id: number;
  name: string;
  sortedOrder: number;
}

