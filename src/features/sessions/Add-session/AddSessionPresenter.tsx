import React, { useMemo, useState, useEffect } from "react";
import { Box, Flex, VStack, useColorModeValue } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import type { FormikProps } from "formik";
import { createInitialValues } from "./constants/formFields";
import type { SessionFormData } from "./types/addsession.types";
import Stepper from "./components/Stepper";
import BasicInfoStep from "./components/BasicInfoStep";
import ScheduleStep from "./components/ScheduleStep";
import StudentSelectionStep from "./components/StudentSelectionStep";
import { NavigationButtons } from "./components/FormComponents";
import { AddSessionValidationSchema } from "@utils/createValidationSchema";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import useCreateSession from "./hooks/useCreateSession";
import useFetchCategories from "@features/Academics/Categories-levels/hooks/useFetchCategories";
import { getUserTimezone } from "@utils/timeUtils";

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

interface AddSessionPresenterProps {
  data?: AcademicPeriodWeek[] | AcademicPeriodWeek;
  associationId: number;
}

const AddSessionPresenter: React.FC<AddSessionPresenterProps> = ({
  data,
  associationId,
}) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const [currentStep, setCurrentStep] = useState(0);
  const [dynamicInitialValues, setDynamicInitialValues] =
    useState<SessionFormData | null>(null);

  const { mutateAsync: createSession } = useCreateSession(associationId);
  const dispatch = useDispatch();

  const { data: categories = [], isLoading: isLoadingCategories } =
    useFetchCategories(associationId);

  const normalizedData = useMemo((): AcademicPeriodWeek[] => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  }, [data]);

  useEffect(() => {
    if (!isLoadingCategories && categories.length > 0) {
      const initialVals = createInitialValues(normalizedData, categories);
      setDynamicInitialValues(initialVals);
    }
  }, [categories, isLoadingCategories, normalizedData]);

  const markAllTouchedByStep = (
    values: SessionFormData,
    currentStep: number
  ) => {
    const touched: any = {};

    if (currentStep >= 0) {
      touched.categoryId = true;
      touched.levelSubjectId = true;
      touched.staffId = true;
      touched.associationId = true;
      touched.periodicity = true;
      touched.sessionType = true;
      touched.startDate = true;
      touched.endDate = true;
      touched.maxStudentsCapacity = true;
      touched.fees = true;
      touched.categoryId = true;
    }
    if (currentStep >= 1) {
      touched.sessionSchedules = values.sessionSchedules.map((schedule) => {
        const touchedSchedule: any = {};
        Object.keys(schedule).forEach((key) => {
          touchedSchedule[key] = true;
        });
        return touchedSchedule;
      });
    }

    if (currentStep >= 2) {
      touched.studentIds = values.studentIds.map(() => true);
    }

    return touched;
  };

  const handleNext = async (
    validateForm: FormikProps<SessionFormData>["validateForm"],
    setTouched: FormikProps<SessionFormData>["setTouched"],
    formik: FormikProps<SessionFormData>
  ) => {
    const errors = await validateForm();
    const stepTouched = markAllTouchedByStep(formik.values, currentStep);
    setTouched(stepTouched);

  if (currentStep === 0) {
    const hasBasicInfoErrors = Boolean(
      errors.levelSubjectId ??
      errors.staffId ??
      errors.periodicity ??
      errors.sessionType ??
      errors.startDate ??
      errors.endDate ??
      errors.maxStudentsCapacity ??
      errors.fees
    );
    if (!hasBasicInfoErrors) {
      if (formik.values.sessionSchedules.length === 0) {
        const newSchedule = {
          classRoomId: 0,
          day: "MONDAY",
          startTime: "09:00",
          endTime: "10:00",
          sessionType: formik.values.sessionType,
        };
        formik.setFieldValue("sessionSchedules", [newSchedule]);
      }
      setCurrentStep(1);
    }
  } else if (currentStep === 1) {
    const newErrors = await validateForm();
    if (
      typeof newErrors.sessionSchedules === "string" &&
      newErrors.sessionSchedules.includes("overlapping")
    ) {
      dispatch(
        showToast({
          title: "Attention",
          message: newErrors.sessionSchedules,
          type: "warning",
        })
      );
    }
    if (!newErrors.sessionSchedules) {
      setCurrentStep(2);
    }
  }
};

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (values: SessionFormData, associationId: number) => {
    createSession({
      ...values,
      timeZone:getUserTimezone(),
      associationId,
    });
  };

  const renderStepContent = (formik: FormikProps<SessionFormData>) => {
    if (currentStep === 0)
      return (
        <BasicInfoStep
          academicPeriods={normalizedData}
          associationId={associationId}
        />
      );
    if (currentStep === 1)
      return <ScheduleStep formik={formik} associationId={associationId} />;
    return (
      <StudentSelectionStep
        formik={formik}
        associationId={associationId}
        categoryId={formik.values.categoryId}
        levelSubjectId={formik.values.levelSubjectId}
      />
    );
  };
  if (!dynamicInitialValues || isLoadingCategories) {
    return (
      <Box
        bg={bgColor}
        h="100%"
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <div>Loading form...</div>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} h="100%" p={2} overflow="hidden">
      <Flex direction={{ base: "column", md: "row" }} gap={6} h="100%">
        <Box flexShrink={0} h="100%" display="flex" flexDirection="column">
          <Stepper currentStep={currentStep} />
        </Box>
        <Box flex="1" h="100%" display="flex" flexDirection="column">
          <Box
            bg={useColorModeValue("white", "gray.800")}
            shadow="sm"
            borderRadius="xl"
            h="100%"
            display="flex"
            flexDirection="column"
            overflow="hidden"
          >
            <Formik<SessionFormData>
              initialValues={dynamicInitialValues}
              validationSchema={AddSessionValidationSchema(normalizedData)}
              onSubmit={(values) => {
                    console.log("Données envoyées :", values);
                    handleSubmit(values, associationId);
              }}
              enableReinitialize={true}
            >
              {(formik) => (
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box flex="1" overflowY="auto" p={4} h="100%">
                    <VStack spacing={4} align="stretch" h="100%">
                      {renderStepContent(formik)}
                      <NavigationButtons
                        currentStep={currentStep}
                        isLastStep={currentStep === 2}
                        onNext={() =>
                          handleNext(
                            formik.validateForm,
                            formik.setTouched,
                            formik
                          )
                        }
                        onPrevious={handlePrevious}
                        onSubmit={() => formik.submitForm()}
                      />
                    </VStack>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddSessionPresenter;
