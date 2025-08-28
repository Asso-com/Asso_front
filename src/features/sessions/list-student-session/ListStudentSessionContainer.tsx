import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import ListStudentSessionPresenter from "./ListStudentSessionPresenter";
import useFetchSessionsWithEnrollments from "./hooks/useFetchSessionsWithEnrollments";

const ListStudentSessionContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { data, isLoading, error } = useFetchSessionsWithEnrollments(associationId);

  return (
    <ListStudentSessionPresenter 
      apiData={data} 
      isLoading={isLoading} 
      error={error}
    />
  );
};

export default ListStudentSessionContainer;
