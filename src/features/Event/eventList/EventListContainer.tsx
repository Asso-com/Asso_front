import { useSelector } from "react-redux";
import type { RootState } from "@store/index"; 
import useFetchEventList from "./hooks/useFetchEventList";
import EventListPresenter from "./EventListPresenter";


const EventListContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data = [] } = useFetchEventList(associationId);

  return <EventListPresenter rows={data} total={data.length}/>;
};

export default EventListContainer;
