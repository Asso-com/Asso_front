import { useSelector } from "react-redux";
import type { RootState } from "@store/index"; 
import useFetchLevel from "./hooks/useFetchListLevel";
import LevelPresenter from "./ListLevelPresenter";


const LevelContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data = [] } = useFetchLevel(associationId);

  const unActiveLevels =
    data.filter((department: any) => !department?.active)?.length || 0;

  return <LevelPresenter rows={data} total={data.length} unActiveLevels={unActiveLevels} />;
};

export default LevelContainer;
