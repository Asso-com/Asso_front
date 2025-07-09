import useFetchSessionsByAssociation from "./hooks/useFetchSessions";
import ListSessionsPresenter from "./ListSessionsPresenter";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
const ListSessionsContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data } = useFetchSessionsByAssociation(associationId);
  return <ListSessionsPresenter associationId={associationId} rows={data} total={data?.length} />;
};

export default ListSessionsContainer;
