import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@store/index';
import useFetchDepartment from './hooks/useFetchDepartment';
import DepartmentPresenter from './DepartmentPresenter';

const DepartmentContainer = () => {
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  const { data = [] } = useFetchDepartment(associationId);

  return (
    <DepartmentPresenter rows={data} total={data.length} />
  );
};

export default DepartmentContainer;
