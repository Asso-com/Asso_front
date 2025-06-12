import { useSelector } from 'react-redux';
import type { RootState } from '@store/index';
import useFetchSubjectLevel from './hooks/useFetchSubjectLevel';
import SubjectLevelPresenter from './SubjectLevelPresenter';

const SubjectLevelContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data: wrapped, isLoading, isError, error } = useFetchSubjectLevel(associationId);
  const subjectLevels = wrapped?.data ?? [];
  const total = subjectLevels.length;

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