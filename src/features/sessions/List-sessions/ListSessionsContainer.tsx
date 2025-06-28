import useFetchSessions from "./hooks/useFetchSessions";
import ListSessionsPresenter from "./ListSessionsPresenter";

const ListSessionsContainer = () => {
  const { data } = useFetchSessions();
  return <ListSessionsPresenter rows={data} total={data?.length} />;
};

export default ListSessionsContainer;
