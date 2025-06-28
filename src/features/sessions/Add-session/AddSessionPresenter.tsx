import React, { useMemo } from "react";
import { Box, Flex, VStack, useColorModeValue } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import type { FormikProps } from "formik";
import { initialValues } from "./constants/formFields";
import type { SessionFormData } from "./types/addsession.types";
import { useShowdata } from "./hooks/useShowdata";
import Stepper from "./components/Stepper";
import BasicInfoStep from "./components/BasicInfoStep";
import ScheduleStep from "./components/ScheduleStep";
import StudentSelectionStep from "./components/StudentSelectionStep";
import NavigationButtons from "./components/FormComponents";

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
  const { currentStep, handleNext, handlePrevious, handleSubmit } =
    useShowdata();

  const normalizedData = useMemo((): AcademicPeriodWeek[] => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  }, [data]);

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
    return <StudentSelectionStep formik={formik} />;
  };

  return (
    <Box bg={bgColor} h="100%" p={2} overflow="hidden">
      <Flex direction={{ base: "column", md: "row" }} gap={6} h="100%">
        <Box
          // w={{ base: "100%", md: "40%" }}
          flexShrink={0}
          h="100%"
          display="flex"
          flexDirection="column"
        >
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
              initialValues={initialValues}
              onSubmit={(values, { validateForm, setTouched }) => {
                if (currentStep < 2) {
                  handleNext(validateForm, setTouched);
                } else {
                  handleSubmit(values, associationId);
                }
              }}
            >
              {(formik) => (
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box flex="1" overflowY="auto" p={4} h={"100%"}>
                    <VStack spacing={4} align="stretch" h="100%">
                      <NavigationButtons
                        currentStep={currentStep}
                        onNext={() =>
                          handleNext(formik.validateForm, formik.setTouched)
                        }
                        onPrevious={handlePrevious}
                        onSubmit={() =>
                          handleSubmit(formik.values, associationId)
                        }
                      />
                      {renderStepContent(formik)}
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
