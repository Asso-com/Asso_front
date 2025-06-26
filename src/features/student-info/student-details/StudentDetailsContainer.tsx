import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useFetchStudent from "./hooks/useFetchStudent";
import StudentDetailsPresenter from "./StudentDetailsPresenter";

const StudentContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data = [] } = useFetchStudent(associationId);

  const enrolledInCurrentPeriods =
    data.filter((student: any) => student?.enrolledInCurrentPeriod)?.length ||
    0;
  return (
    <StudentDetailsPresenter
      rows={data}
      total={data.length}
      enrolledInCurrentPeriods={enrolledInCurrentPeriods}
    />
  );
};

export default StudentContainer;
