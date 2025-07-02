import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import AddSessionPresenter from "./AddSessionPresenter";
import useFetchActivePeriod from "@features/system-settings/school-year-settings/hooks/useFetchActivePeriod";

const AddSessionContainer = () => {
   const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data } = useFetchActivePeriod(associationId);
  return (
<AddSessionPresenter data={data} associationId={associationId} />
  );
};

export default AddSessionContainer;