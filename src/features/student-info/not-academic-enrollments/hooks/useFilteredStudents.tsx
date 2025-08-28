// hooks/useFilteredStudents.ts
import { useMemo } from "react";
import type { StudentEnrollmentDetails } from "../types";
// If you don't have types, you can use `any` temporarily

interface UseFilteredStudentsProps {
  students: StudentEnrollmentDetails[];
  searchTerm: string;
  selectedLevel: string;
  selectedSubject: string;
}

const useFilteredStudents = ({
  students,
  searchTerm,
  selectedLevel,
  selectedSubject,
}: UseFilteredStudentsProps) => {
  return useMemo(() => {
    return students.filter((studentData) => {
      const matchesSearch =
        studentData.student.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        studentData.student.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        studentData.student.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        studentData.student.registrationId
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesLevel =
        !selectedLevel ||
        studentData.levelSubjects.some(
          (subject) => subject.level.code === selectedLevel
        );

      const matchesSubject =
        !selectedSubject ||
        studentData.levelSubjects.some(
          (subject) => subject.subject.name === selectedSubject
        );

      return matchesSearch && matchesLevel && matchesSubject;
    });
  }, [students, searchTerm, selectedLevel, selectedSubject]);
};

export default useFilteredStudents;
