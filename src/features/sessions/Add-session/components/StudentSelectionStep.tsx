import React, { useMemo, useRef, useState, useEffect } from "react";
import { Box, Card, CardBody, Text, useColorModeValue } from "@chakra-ui/react";
import type { FormikProps } from "formik";
import type { SessionFormData, Student } from "../types/addsession.types";
import StudentTable from "./StudentTable";
import QuickFilter from "@components/shared/QuickFilter";
import type { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import ClearFilter from "@components/shared/ClearFilter";
import useFetchStudentsByCategoryAndLevelSubjectID from "@features/student-info/student-details/hooks/useFetchStudentsByCategoryAndLevelSubjectID";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";

interface StudentSelectionStepProps {
  formik: FormikProps<SessionFormData>;
  associationId: number;
  categoryId: number;
  levelSubjectId: number;
}

const StudentSelectionStep: React.FC<StudentSelectionStepProps> = ({
  formik,
  associationId,
  categoryId,
  levelSubjectId,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const gridRef = useRef<AgGridReact<any>>(null!);
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.100", "blue.700");
  const textColor = useColorModeValue("gray.700", "gray.100");

  const {
    data: students = [],
  } = useFetchStudentsByCategoryAndLevelSubjectID(associationId, categoryId, levelSubjectId);

  const filteredStudents = useMemo(() => {
    return students.filter((student: Student) =>
      String(student.studentId ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(student.studentName ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.levelName ?? "").includes(searchTerm)
    );
  }, [students, searchTerm]);

  const handleStudentToggle = (studentId: string) => {
    const currentSelected = formik.values.studentIds;
    const newSelected = currentSelected.includes(studentId)
      ? currentSelected.filter((id) => id !== studentId)
      : [...currentSelected, studentId];
    formik.setFieldValue("studentIds", newSelected);
  };

  useEffect(() => {
    const isOverCapacity = formik.values.studentIds.length > formik.values.maxStudentsCapacity;
    if (isOverCapacity) {
      dispatch(
        showToast({
          title: t("Over Capacity"),
          message: t(
            "You have selected {{selected}} students, which exceeds the maximum capacity of {{max}}.",
            {
              selected: formik.values.studentIds.length,
              max: formik.values.maxStudentsCapacity,
            }
          ),
          type: "warning",
        })
      );
    }
  }, [formik.values.studentIds, formik.values.maxStudentsCapacity, dispatch, t]);

  return (
    <Card
      bg={cardBg}
      borderRadius="2xl"
      border="2px solid"
      borderColor={borderColor}
      boxShadow="xl"
      overflow="hidden"
      h="100%"
    >
      <CardBody p={4} h="100%">
        <Box
          borderRadius="xl"
          border="2px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          bg={useColorModeValue("white", "gray.800")}
          overflow="hidden"
          boxShadow="lg"
          h="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            p={4}
            bg={useColorModeValue("gray.50", "gray.700")}
            display="flex"
            alignItems="center"
            gap={4}
          >
            <Text
              fontSize="lg"
              fontWeight="semibold"
              color={textColor}
              flexShrink={0}
            >
              {t("Students List")}
            </Text>
            <QuickFilter
              gridRef={gridRef}
              placeholder={t("Search students by name or matricule...")}
              onChange={setSearchTerm}
            />
            <ClearFilter gridRef={gridRef} />
          </Box>

          <Box flex={1} h="100%" p={4}>
            <StudentTable
              ref={gridRef}
              students={filteredStudents}
              selectedStudents={formik.values.studentIds}
              onStudentToggle={handleStudentToggle}
            />
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default StudentSelectionStep;