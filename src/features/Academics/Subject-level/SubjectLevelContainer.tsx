import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useFetchSubjectLevel from "./hooks/useFetchSubjectLevel";
import SubjectLevelPresenter from "./SubjectLevelPresenter";

const SubjectLevelContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const {
    data: subjectLevels = [],
    isLoading,
    isError,
    error,
  } = useFetchSubjectLevel(associationId);

  const total = Array.isArray(subjectLevels) ? subjectLevels.length : 0;

  return (
    <SubjectLevelPresenter
      rows={subjectLevels}
      total={total}
      isLoading={isLoading}
      isError={isError}
      error={error ?? undefined}
    />
  );
};

export default SubjectLevelContainer;
