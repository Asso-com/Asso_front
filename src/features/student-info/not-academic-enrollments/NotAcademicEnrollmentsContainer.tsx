// NotAcademicEnrollmentsContainer.tsx
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useFetchNotAcademicEnrollments from "./hooks/useFetchNotAcademeicEnrollements";
import NotAcademicEnrollemntsPresenter from "./NotAcademicEnrollemntsPresenter";

const NotAcademicEnrollmentsContainer: React.FC = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data: studentEnrollmentDetails } = useFetchNotAcademicEnrollments(associationId);
  
  return (
    <NotAcademicEnrollemntsPresenter 
      studentEnrollmentDetails={studentEnrollmentDetails || []} 
    />
  );
};

export default NotAcademicEnrollmentsContainer;