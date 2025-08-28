import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import useFetchAcademicPeriodWeeks from "./hooks/useFetchAcademicPeriodWeeks";
import AcademicPeriodWeeksPresenter from "./AcademicPeriodWeeksPresenter";

const AcademicPeriodWeeksContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data } = useFetchAcademicPeriodWeeks(associationId);
  return <AcademicPeriodWeeksPresenter rows={data} />;
};

export default AcademicPeriodWeeksContainer;
