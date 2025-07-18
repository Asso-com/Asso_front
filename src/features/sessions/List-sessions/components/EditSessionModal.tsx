import React, { useState } from "react";
import { Box, useToast, useColorModeValue, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import BasicInfoStep from "@features/sessions/Add-session/components/BasicInfoStep";
import ScheduleStep from "@features/sessions/Add-session/components/ScheduleStep";
import Stepper, {
  EDIT_SESSION_STEPS,
} from "@features/sessions/Add-session/components/Stepper";
import { NavigationButtons } from "@features/sessions/Add-session/components/FormComponents";

import type {
  SessionFormData,
  SessionSchedule,
} from "@features/sessions/Add-session/types/addsession.types";
import type { Session } from "../types/session.types";
//import useFetchCategories from "@features/Academics/Categories-levels/hooks/useFetchCategories";

const updateSession = async (sessionId: number, data: any) => {
  console.log("Sending update to backend...", sessionId, data);
  return new Promise((res) => setTimeout(res, 1000));
};

interface EditSessionModalProps {
  sessionData: Session;
  associationId: number;
  onClose: () => void;
}

const EditSessionModal: React.FC<EditSessionModalProps> = ({
  sessionData,
  associationId,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const toast = useToast();
  const bgColor = useColorModeValue("gray.50", "gray.900");

  //const { data: categories = [] } = useFetchCategories(associationId);

  const convertSessionToFormValues = (session: Session): SessionFormData => ({
    categoryId: session.levelSubject.categoryId,
    levelSubjectId: session.levelSubject.id,
    levelName: session.levelSubject.level,
    staffId: session.staff.id,
    associationId,
    periodicity: session.periodicity as "WEEKLY" | "MONTHLY",
    sessionType: session.sessionType,
    startDate: session.startDate,
    endDate: session.endDate,
    maxStudentsCapacity: session.maxStudentsCapacity,
    fees: session.fees,
    timeZone: session.timeZone || "",
    sessionSchedules: session.sessionSchedules || [],
    studentIds: [],
  });

  const convertFormValuesToSessionRequest = (values: SessionFormData) => ({
    levelSubjectId: values.levelSubjectId,
    staffId: values.staffId,
    periodicity: values.periodicity,
    sessionType: values.sessionType,
    startDate: values.startDate,
    endDate: values.endDate,
    maxStudentsCapacity: values.maxStudentsCapacity,
    fees: values.fees,
    timeZone: values.timeZone,
    sessionSchedules: values.sessionSchedules.map((s: SessionSchedule) => ({
      ...s,
    })),
  });

  const initialValues = convertSessionToFormValues(sessionData);

  const handleNext = () => {
    if (currentStep < 1) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (values: SessionFormData) => {
    try {
      const payload = convertFormValuesToSessionRequest(values);
      await updateSession(sessionData.id, payload);

      toast({
        title: "Session Updated",
        description: "Session has been updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      console.error("Error updating session:", error);
      toast({
        title: "Error",
        description: "Failed to update session. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const renderStepContent = (step: number, formik: any) => {
    switch (step) {
      case 0:
        return (
          <BasicInfoStep academicPeriods={[]} associationId={associationId} />
        );
      case 1:
        return (
          <ScheduleStep
            formik={formik}
            associationId={associationId}
            showRemoveButton={false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box bg={bgColor} h="100%" p={2} overflow="hidden">
      <Flex direction={{ base: "column", md: "row" }} gap={6} h="100%">
        <Box flexShrink={0} h="100%" display="flex" flexDirection="column">
          <Stepper
            currentStep={currentStep}
            steps={EDIT_SESSION_STEPS}
            maxSteps={2}
          />
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
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {(formik) => (
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box flex="1" p={4} overflowY="auto" maxH="65vh">
                    {renderStepContent(currentStep, formik)}
                  </Box>
                  <Box p={4} borderTop="1px solid" borderColor="gray.200">
                    <NavigationButtons
                      currentStep={currentStep}
                      isLastStep={currentStep === 1}
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                      onSubmit={() => formik.handleSubmit()}
                      submitLabel="Update Session"
                    />
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

export default EditSessionModal;
