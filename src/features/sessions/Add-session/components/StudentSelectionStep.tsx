import React, { useState, useMemo, useRef } from "react";
import {
  Card,
  CardBody,
  VStack,
  Text,
  useColorModeValue,
  Box,
  Divider,
} from "@chakra-ui/react";
import type { FormikProps } from "formik";
import { MOCK_STUDENTS } from "../constants";
import type { SessionFormData } from "../types/addsession.types";
import StudentTable from "./StudentTable";
import QuickFilter from "@components/shared/QuickFilter";
import type { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import ClearFilter from "@components/shared/ClearFilter";

interface StudentSelectionStepProps {
  formik: FormikProps<SessionFormData>;
}

const StudentSelectionStep: React.FC<StudentSelectionStepProps> = ({
  formik,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const gridRef = useRef<AgGridReact<any>>(null!);
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.100", "blue.700");
  const textColor = useColorModeValue("gray.700", "gray.100");

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(
      (student) =>
        student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matricule.includes(searchTerm)
    );
  }, [searchTerm]);

  const handleStudentToggle = (matricule: string) => {
    const currentSelected = formik.values.students;
    const newSelected = currentSelected.includes(matricule)
      ? currentSelected.filter((id) => id !== matricule)
      : [...currentSelected, matricule];
    formik.setFieldValue("selectedStudents", newSelected);
  };

  return (
    <Card
      bg={cardBg}
      borderRadius="2xl"
      border="2px solid"
      borderColor={borderColor}
      boxShadow="xl"
      overflow="hidden"
    >
      <Divider borderColor={borderColor} />
      <CardBody p={8}>
        <VStack spacing={8} align="stretch">
          <Box
            borderRadius="xl"
            border="2px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            bg={useColorModeValue("white", "gray.800")}
            overflow="hidden"
            boxShadow="lg"
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
            <Box minH="300px" w="full">
              <StudentTable
                ref={gridRef}
                students={filteredStudents}
                selectedStudents={formik.values.students}
                onStudentToggle={handleStudentToggle}
              />
            </Box>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default StudentSelectionStep;
