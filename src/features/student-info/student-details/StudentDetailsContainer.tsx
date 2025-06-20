import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useFetchStudent from "./hooks/useFetchStudent";  
import StudentDetailsPresenter from "./StudentDetailsPresenter";

const StudentContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data = [] } = useFetchStudent(associationId);

  

  return (
    <StudentDetailsPresenter
      rows={data}
      total={data.length} unActiveStudentDetailss={0}    />
  );
};

export default StudentContainer;
