import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useFetchDepartment from "./hooks/useFetchDepartment";
import DepartmentPresenter from "./DepartmentPresenter";

const DepartmentContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data = [] } = useFetchDepartment(associationId);

  const unActiveDepartments =
    data.filter((department: any) => !department?.active)?.length || 0;

  return <DepartmentPresenter rows={data} total={data.length} unActiveDepartments={unActiveDepartments} />;
};

export default DepartmentContainer;
