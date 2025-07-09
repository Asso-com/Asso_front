export interface Student {
  id: number;
  name: string;
  avatar?: string;
}

export interface Session {
  id: number;
  title: string;
  date: string;
  teacher: string;
  students: Student[];
  duration: string;
  status: "active" | "completed" | "upcoming";
}