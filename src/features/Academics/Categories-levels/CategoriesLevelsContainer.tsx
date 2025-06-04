import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import CategoriesLevelsPresenter from "./CategoriesLevelsPresenter";
import useFetchCategoriesLevels from "./hooks/useFetchCategoriesLevels";

const CategoriesLevelsContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data = [] } = useFetchCategoriesLevels(associationId);

  const activeCategoriesLevelss =
    data.filter((categorieLevel: any) => categorieLevel?.active)?.length || 0;

  return <CategoriesLevelsPresenter rows={data} total={data.length} activeCategoriesLevelss={activeCategoriesLevelss} />;
};

export default CategoriesLevelsContainer;
