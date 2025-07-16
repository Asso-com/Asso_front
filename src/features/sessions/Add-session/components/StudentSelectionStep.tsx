import React from "react";
import { Card, CardBody,Box,useColorModeValue } from "@chakra-ui/react";
import type { FormikProps } from "formik";
import type { SessionFormData } from "../types/addsession.types";
import StudentTable from "./StudentTable";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import { useTranslation } from "react-i18next";

import useFetchStudentsByCategoryAndLevelSubjectID from "@features/student-info/student-details/hooks/useFetchStudentsByCategoryAndLevelSubjectID";

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
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.100", "blue.700");

  const { data: students = [] } = useFetchStudentsByCategoryAndLevelSubjectID(
    associationId,
    categoryId,
    levelSubjectId
  );

  const handleStudentToggle = (studentId: string) => {
    const currentSelected = formik.values.studentIds;
    const newSelected = currentSelected.includes(studentId)
      ? currentSelected.filter((id) => id !== studentId)
      : [...currentSelected, studentId];
    formik.setFieldValue("studentIds", newSelected);
  };

  React.useEffect(() => {
    const isOverCapacity = formik.values.studentIds.length > formik.values.maxStudentsCapacity;
    if (isOverCapacity) {
      dispatch(
        showToast({
          title: t("Over Capacity"),
          message: t(
            "You have selected {{selected}} students, which exceeds the maximum capacity of {{max}}.",
            { selected: formik.values.studentIds.length, max: formik.values.maxStudentsCapacity }
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
        >
          <StudentTable
            students={students}
            selectedStudents={formik.values.studentIds}
            onStudentToggle={handleStudentToggle}
            maxCapacity={formik.values.maxStudentsCapacity}
            levelName={formik.values.levelName}
          />
        </Box>
      </CardBody>
    </Card>
  );
};

export default StudentSelectionStep;