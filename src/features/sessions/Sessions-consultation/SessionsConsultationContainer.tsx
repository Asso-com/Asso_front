import useFetchAcademicPeriodWeeks from "@features/system-settings/academic-period-weeks/hooks/useFetchAcademicPeriodWeeks";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import SessionConsultationPresenter from "./SessionConsultationPresenter";

const SessionsConsultationContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  // Fetch academic weeks
  const { data: weeksData } = useFetchAcademicPeriodWeeks(associationId);
  return <SessionConsultationPresenter weeksData={weeksData} />;
};

export default SessionsConsultationContainer;
