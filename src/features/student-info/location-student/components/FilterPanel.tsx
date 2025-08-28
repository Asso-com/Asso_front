import React from "react";
import {
  Box,
  Stack,
  Text,
  Flex,
  VStack,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";
import { FaGraduationCap } from "react-icons/fa";
import type { ProcessedStudentData } from "../Types/StudentLocationType";
import StudentCard from "./StudentCard";
import { useTranslation } from "react-i18next";

interface StudentLocationListProps {
  allStudents: ProcessedStudentData[];
  enrollmentFilter: string;
  qpvFilter: string;
  setEnrollmentFilter: (value: string) => void;
  setQpvFilter: (value: string) => void;
  resetFilters: () => void;
}

const StudentLocationList: React.FC<StudentLocationListProps> = ({
  allStudents,
  enrollmentFilter,
  qpvFilter,
  setEnrollmentFilter,
  setQpvFilter,
}) => {
  const { t } = useTranslation();

  return (
    <Box height="100%" bg="white" display="flex" flexDirection="column">
      <Box p={4} borderBottom="1px" borderColor="gray.200">
        <Flex align="center" mb={3}>
          <FaGraduationCap color="#3182ce" size="20" />
          <Text fontWeight="bold" fontSize="lg" color="blue.600" ml={2}>
            {t("Student Locations")}
          </Text>
        </Flex>
        <VStack spacing={3} align="stretch">
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={1}>
              {t("Enrollment Status")}
            </Text>
            <RadioGroup
              size="sm"
              value={enrollmentFilter}
              onChange={setEnrollmentFilter}
            >
              <VStack spacing={1} align="start">
                <Radio value="all">{t("All")}</Radio>
                <Radio value="enrolled">{t("Enrolled")}</Radio>
                <Radio value="not_enrolled">{t("Not Enrolled")}</Radio>
              </VStack>
            </RadioGroup>
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={1}>
              {t("QPV Status")}
            </Text>
            <RadioGroup size="sm" value={qpvFilter} onChange={setQpvFilter}>
              <HStack spacing={4}>
                <Radio value="all">{t("All")}</Radio>
                <Radio value="qpv">{t("QPV")}</Radio>
                <Radio value="not_qpv">{t("Non-QPV")}</Radio>
              </HStack>
            </RadioGroup>
          </Box>
        </VStack>
      </Box>

      <Box flex={1} overflow="auto" p={2}>
        {allStudents.length > 0 ? (
          <Box mb={4}>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color="blue.600"
              mb={2}
              px={2}
            >
              📍 {t("Students with Location")} ({allStudents.length})
            </Text>
            <Stack spacing={2}>
              {allStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </Stack>
          </Box>
        ) : (
          <Text fontSize="sm" color="gray.500" textAlign="center">
            {t("No students match the selected filters.")}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default StudentLocationList;
