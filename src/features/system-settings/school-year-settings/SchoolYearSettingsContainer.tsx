import SchoolYearPresenter from "./SchoolYearPresenter";
import useFetchAcademicPeriods from "./hooks/useFetchAcademicPeriods";

const SchoolYearSettingsContainer = () => {
  const { data, isLoading, error } = useFetchAcademicPeriods();

  return (
    <>
      <SchoolYearPresenter rows={data} total={data?.length} />
    </>
  );
};

export default SchoolYearSettingsContainer;
