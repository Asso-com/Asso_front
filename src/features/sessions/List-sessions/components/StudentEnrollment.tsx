import { useEffect, useRef, useState } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
// import { useTranslation } from "react-i18next";
import StudentTable from "@features/sessions/Add-session/components/StudentTable";
import useFetchSessionEnrollmentStatus from "../hooks/useFetchStudents";
import useAssignStudentsToSession from "../hooks/useAssignStudents";
import FooterActions from "@components/shared/FooterActions";

interface StudentEnrollmentProps {
  sessionId: number;
  associationId: number;
  maxStudentsCapacity: number;
  onClose: () => void;
  levelName?: string;
  categoryId?: number;
}
const StudentEnrollment = ({
  sessionId,
  associationId,
  onClose,
  maxStudentsCapacity,
  levelName,
  categoryId
}: StudentEnrollmentProps) => {
  // const { t } = useTranslation();
  const gridRef = useRef(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [initialAssignedIds, setInitialAssignedIds] = useState<string[]>([]);
  const { data: students = [], isLoading } = useFetchSessionEnrollmentStatus(
    sessionId,
    associationId
  );
  const { mutateAsync: assignStudents, status } =
    useAssignStudentsToSession(associationId);
  const isAssigning = status === "pending";
  useEffect(() => {
    if (students.length > 0) {
      const enrolledStudents = students.filter((s) => s.enrolled);
      const enrolledIds = enrolledStudents.map((s) => s.studentId.toString());
      setInitialAssignedIds(enrolledIds);
      setSelectedStudents(enrolledIds);
    }
  }, [students]);
  const onStudentToggle = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };
  const handleAssign = () => {
    const newlySelected = selectedStudents.filter(
      (id) => !initialAssignedIds.includes(id)
    );
    const deselected = initialAssignedIds.filter(
      (id) => !selectedStudents.includes(id)
    );
    const changedStudents = [...newlySelected, ...deselected];
    if (changedStudents.length === 0) {
      return;
    }
    assignStudents({
      sessionId,
      associationId,
      studentIds: changedStudents,
    });
    onClose();
  };
  const mappedStudents = students.map((s: any) => ({
    studentId: s.studentId,
    studentName: s.studentName,
    registrationId: s.registrationId,
    email: s.email ?? "",
    levelName: s.levelName ?? "",
  }));
  return (
    <VStack spacing={4} w="100%" h="100%">
      <Box w="100%" h="500px">
<StudentTable
  ref={gridRef}
  students={mappedStudents}
  selectedStudents={selectedStudents}
  onStudentToggle={onStudentToggle}
  maxCapacity={maxStudentsCapacity}
  levelName={levelName}
  categoryId={categoryId}
/>
      </Box>

      <Flex w="100%" justify="flex-end">
        <FooterActions
          onClose={onClose}
          handleSave={handleAssign}
          isSaving={isLoading || isAssigning}
          cancelText="close"
          saveText="Assign Students"
        />
      </Flex>
    </VStack>
  );
};
export default StudentEnrollment;
