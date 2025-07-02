import React, { useEffect, useState } from "react";
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

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  academicPeriods = [],
  associationId,
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.100", "blue.700");
  const { setFieldValue } = useFormikContext<SessionFormData>();

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoryError,
  } = useFetchCategories(associationId);

  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  
useEffect(() => {
}, [associationId, selectedCategory]);

const {
  data: subjectLevelOptions = [],
  isLoading: isLoadingSubjects,
  error: subjectError,
} = useFetchSubjectLevelSelectByCategory(
  associationId, 
  selectedCategory
);

  const {
    data: staffOptions = [],
    isLoading: isLoadingStaff,
    error: staffError,
  } = useFetchStaff(associationId);

  useEffect(() => {
  }, [selectedCategory, subjectLevelOptions]);

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

  const teacherOptions = staffOptions.map((staff: { firstName: string; lastName: string; id: number | string; email?: string }) => ({
    label: `${staff.firstName} ${staff.lastName}`,
    value: staff.id,
    email: staff.email ?? "unknown@example.com",
  }));

  const categoryOptions = categories.map((cat: { name: string; id: number | string }) => ({
    label: cat.name,
    value: cat.id,
  }));

  const handleStaffChange = (staffId: string) => {
    const selectedStaff = teacherOptions.find((s: { value: string | number; email: string }) => s.value === staffId);
    if (selectedStaff) {
      setFieldValue("staffEmail", selectedStaff.email);
    }
  };
const enhancedFields = formFields.basicInfo.map((field) => {
  switch (field.name) {
    case "generalLevels": {
      return {
        ...field,
        options: categoryOptions,
        isLoading: isLoadingCategories,
        error: categoryError?.message,
        onChange: (selectedId: number) => {
          setSelectedCategory(selectedId); 

          const selectedCategoryLabel = categoryOptions.find((opt: { label: string; value: number | string }) => opt.value === selectedId)?.label;

          if (selectedCategoryLabel) {
            setFieldValue("generalLevels", selectedCategoryLabel); 
          }
        }
      };
    }
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
        onChange: handleStaffChange,
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
              colSpan={field.name === "generalLevels" ? 2 : 1}
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