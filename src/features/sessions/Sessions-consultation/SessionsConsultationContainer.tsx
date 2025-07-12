import useFetchAcademicPeriodWeeks from "@features/system-settings/academic-period-weeks/hooks/useFetchAcademicPeriodWeeks";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import SessionConsultationPresenter from "./SessionConsultationPresenter";
import useWeeksOptions from "../Session-schedule/hooks/useWeeksOptions";

const SessionsConsultationContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  // Fetch academic weeks
  const { data: weeksData } = useFetchAcademicPeriodWeeks(associationId);
  const weeksOptions = useWeeksOptions(weeksData);
  return <SessionConsultationPresenter weeksOptions={weeksOptions} />;
};

export default SessionsConsultationContainer;
