import React from "react";
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  useColorModeValue,
  Box,
  Divider,
} from "@chakra-ui/react";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import { formFields } from "../constants/formFields";
import { useFormikContext } from "formik";
import useFetchSelectSubjectLevel from "@features/Academics/Subject-level/hooks/useFetchSelectSubjectLevel";
import useFetchStaff from "@features/human-resource/staff/hooks/useFetchStaff";
import type { SessionFormData } from "../types/addsession.types";

interface AcademicPeriodWeek {
  id: number;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  active: boolean;
  dayOfWeek: string;
  numberOfWeeks: number;
}

interface BasicInfoStepProps {
  academicPeriods?: AcademicPeriodWeek[];
  associationId: number;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ academicPeriods = [], associationId }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.100", "blue.700");
  const { setFieldValue } = useFormikContext<SessionFormData>();

  const { data: subjectLevelOptions = [], isLoading: isLoadingSubjects, error: subjectError } = useFetchSelectSubjectLevel(associationId);
  const { data: staffOptions = [], isLoading: isLoadingStaff, error: staffError } = useFetchStaff(associationId);
 const getDateRange = () => {
  if (!academicPeriods.length) return { minISO: "", maxISO: "" };
  const minDate = new Date(Math.min(...academicPeriods.map(p => new Date(p.startDate).getTime())));
  const maxDate = new Date(Math.max(...academicPeriods.map(p => new Date(p.endDate).getTime())));
  return {
    minISO: minDate.toISOString().split("T")[0],
    maxISO: maxDate.toISOString().split("T")[0],
  };
};

  const { minISO, maxISO } = getDateRange();

  const teacherOptions = staffOptions.map((staff: { id: string; firstName: string; lastName: string; email: string }) => ({
    label: `${staff.firstName} ${staff.lastName}`,
    value: staff.id,
    email: staff.email || "unknown@example.com",
  }));

  const handleStaffChange = (staffId: string) => {
    const selectedStaff = teacherOptions.find((staff: { label: string; value: string; email: string }) => staff.value === staffId);
    if (selectedStaff) {
      setFieldValue("staffEmail", selectedStaff.email);
    }
  };

  const enhancedFields = formFields.basicInfo.map(field => {
    if (field.name === "levelSubjectId") {
      return { ...field, options: subjectLevelOptions, isLoading: isLoadingSubjects, error: subjectError?.message };
    }
    if (field.name === "staffId") {
      return {
        ...field,
        options: teacherOptions,
        isLoading: isLoadingStaff,
        error: staffError?.message,
        onChange: handleStaffChange,
      };
    }
    if (["startDate", "endDate"].includes(field.name)) {
      return { ...field, academicPeriods, min: minISO, max: maxISO };
    }
    return field;
  });

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
      <CardBody p={4}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="full">
          {enhancedFields.map((field) => (
            <GridItem
              key={field.name}
              colSpan={["generalLevels"].includes(field.name) ? 2 : 1}
            >
              <Box>
                <RenderFormBuilder field={field} />
              </Box>
            </GridItem>
          ))}
        </Grid>
      </CardBody>
    </Card>
  );
};

export default BasicInfoStep;