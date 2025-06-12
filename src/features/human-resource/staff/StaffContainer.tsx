import { useSelector } from "react-redux";
import type { RootState } from "@store/index"; 
import StaffPresenter from "./StaffPresenter";
import useFetchStaff from "./hooks/useFetchStaff";

const StaffContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data = [] } = useFetchStaff(associationId);

  const unActiveStaffs =
    data.filter((department: any) => !department?.active)?.length || 0;

  return <StaffPresenter
          rows={data} 
          total={data.length} 
          unActiveStaffs={unActiveStaffs} 
          associationId={associationId}/>;
};

export default StaffContainer;
