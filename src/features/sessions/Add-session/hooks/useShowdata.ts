import { useState } from "react";
import type { FormikHelpers } from "formik";
import type {SessionFormData } from "../types/addsession.types";
import { createSession } from "../services/index";

export const useShowdata = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = (
    validateForm: FormikHelpers<SessionFormData>["validateForm"],
    setTouched: FormikHelpers<SessionFormData>["setTouched"]
  ) => {
    validateForm().then((errors: Record<string, any>) => {
      if (Object.keys(errors).length === 0) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setTouched(errors);
      }
    });
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (values: SessionFormData, associationId: number) => {
      const submissionData: SessionFormData = {
        levelSubjectId: Number(values.levelSubjectId),
        staffId: values.staffId,
        staffEmail: values.staffEmail,
        associationId: associationId,
        periodicity: values.periodicity.toUpperCase() as "WEEKLY" | "MONTHLY",
        sessionType: values.sessionType.toUpperCase().replace(/\s+/g, "_") as "ONLINE" | "FACE_TO_FACE",
        startDate: values.startDate,
        endDate: values.endDate,
        maxStudentsCapacity: Number(values.maxStudentsCapacity),
        placesAvailable: Number(values.maxStudentsCapacity) - values.students.length,
        fees: Number(values.fees),
        sessions: values.sessions.map((session) => ({
          classRoomId: Number(session.classRoomId),
          sessionName: session.sessionName,
          day: session.day.toUpperCase(),
          startTime: `${session.startTime}:00`,
          endTime: `${session.endTime}:00`,
        })),
        students: values.students,
      };

      const result = await createSession(submissionData);
      return result; 
  };

  return {
    currentStep,
    setCurrentStep,
    handleNext,
    handlePrevious,
    handleSubmit,
  };
};