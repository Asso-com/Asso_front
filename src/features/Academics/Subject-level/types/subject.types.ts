export interface Subject {
  id: number;
  code: string;
  name: string;
  departmentId: number;
  departmentName: string;
  standard: boolean;
}

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
  id: number; // This is the associationId that links level to subjects
  level: Level; // The actual level object
  subjects: Subject[]; // Array of subjects for this level
}
export interface LevelSubjectResponse {
  id: number; // Association ID
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
}