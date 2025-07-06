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
import { useFormikContext } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import { formFields } from "../constants/formFields";
import type { SessionFormData } from "../types/addsession.types";
import useFetchSubjectLevelSelectByCategory from "@features/Academics/Subject-level/hooks/useFetchSubjectLevelSelectByCategory";
import useFetchStaff from "@features/human-resource/staff/hooks/useFetchStaff";
import useFetchCategories from "@features/Academics/Categories-levels/hooks/useFetchCategories";

interface BasicInfoStepProps {
  academicPeriods?: {
    startDate: string;
    endDate: string;
  }[];
  associationId: number;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  academicPeriods = [],
  associationId,
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.100", "blue.700");
  const { setFieldValue, values } = useFormikContext<SessionFormData>();

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoryError,
  } = useFetchCategories(associationId);

  const selectedCategory = values.categoryId || undefined;

  const {
    data: subjectLevelOptions = [],
    isLoading: isLoadingSubjects,
    error: subjectError,
  } = useFetchSubjectLevelSelectByCategory(associationId, selectedCategory);

  const {
    data: staffOptions = [],
    isLoading: isLoadingStaff,
    error: staffError,
  } = useFetchStaff(associationId);

  const getDateRange = () => {
    if (!academicPeriods.length) return { minISO: "", maxISO: "" };
    const minDate = new Date(
      Math.min(...academicPeriods.map((p) => new Date(p.startDate).getTime()))
    );
    const maxDate = new Date(
      Math.max(...academicPeriods.map((p) => new Date(p.endDate).getTime()))
    );
    return {
      minISO: minDate.toISOString().split("T")[0],
      maxISO: maxDate.toISOString().split("T")[0],
    };
  };

  const { minISO, maxISO } = getDateRange();

  const teacherOptions = staffOptions.map(
    (staff: { firstName: string; lastName: string; id: number }) => ({
      label: `${staff.firstName || ""} ${staff.lastName || ""}`,
      value: staff.id,
    })
  );

  const categoryOptions = categories.map(
    (cat: { name: string; id: number }) => ({
      label: cat.name,
      value: cat.id,
    })
  );

  const enhancedFields = formFields.basicInfo.map((field) => {
    switch (field.name) {
      case "categoryId":
        return {
          ...field,
          options: categoryOptions,
          isLoading: isLoadingCategories,
          error: categoryError?.message,
          onChange: (selectedValue: string) => {
            setFieldValue("categoryId", Number(selectedValue));
            setFieldValue("levelSubjectId", 0);
          },
        };

      case "levelSubjectId":
        return {
          ...field,
          options: subjectLevelOptions,
          isLoading: isLoadingSubjects,
          error: subjectError?.message,
        };

      case "staffId":
        return {
          ...field,
          options: teacherOptions,
          isLoading: isLoadingStaff,
          error: staffError?.message,
        };

      case "startDate":
      case "endDate":
        return {
          ...field,
          academicPeriods,
          min: minISO,
          max: maxISO,
        };

      default:
        return field;
    }
  });

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
      <Divider borderColor={borderColor} />
      <CardBody p={4}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          {enhancedFields.map((field) => (
            <GridItem
              key={field.name}
              colSpan={field.name === "categoryId" ? 2 : 1}
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
