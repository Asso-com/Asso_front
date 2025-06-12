import { useSelector } from "react-redux";
import type { RootState } from "@store/index"; 
import useFetchClassRoom from "./hooks/useFetchClassRoom";
import ClassRoomPresenter from "./ClassRoomPresenter";

const ClassRoomContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data = [] } = useFetchClassRoom(associationId);

  const unActiveClassRooms =
    data.filter((department: any) => !department?.active)?.length || 0;

  return <ClassRoomPresenter rows={data} total={data.length} unActiveClassRooms={unActiveClassRooms} />;
};

export default ClassRoomContainer;
