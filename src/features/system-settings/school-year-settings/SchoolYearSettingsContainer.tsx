import SchoolYearPresenter from "./SchoolYearPresenter";
import useFetchAcademicPeriods from "./hooks/useFetchAcademicPeriods";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

/**
 * Container component for the school year settings page.
 *
 * @remarks
 * This component fetches the academic periods for the current association
 * and passes them to the SchoolYearPresenter component for rendering.
 */

const SchoolYearSettingsContainer = () => {

  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  const { data} = useFetchAcademicPeriods(associationId);

  return (
    <>
      <SchoolYearPresenter rows={data} total={data?.length} />
    </>
  );
};

export default SchoolYearSettingsContainer;
