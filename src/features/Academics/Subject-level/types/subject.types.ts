export interface Subject {
  id: number;
  code: string;
  name: string;
  departmentId: number;
  departmentName: string;
  standard: boolean;
}
export interface LevelSubjectResponse {
  id: number; // ✅ Association ID
  level: {
    id: number;
    name: string;
  };
  subjects: Subject[];
}

export interface SubjectLevelItem {
  id: number;
  level: { 
    id: number; 
    name: string;
  };
  subject: { 
    id: number; 
    title: string;
  };
  associationId: number;
};

export interface Level {
  id: number;
  code: string;
  name: string;
  order: number;
  active: boolean;
  categoryId: number;
  categoryName: string;
  standard: boolean;
}

export interface LevelWithSubjects {
  id: number;
  level: Level;
  subjects: Subject[];
}
