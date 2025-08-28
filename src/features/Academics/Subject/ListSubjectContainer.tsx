import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import useFetchSubjects from "./hooks/useFetchSubjects";
import SubjectPresenter from "./SubjectPresenter";

const ListSubjectContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { data } = useFetchSubjects(associationId);

  return <SubjectPresenter rows={data} total={data?.length} />;
};

export default ListSubjectContainer;
