import useFetchCategories from "./hooks/useFetchCategories";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import CategoriesLevelsPresenter from "./CategoriesLevelsPresenter";

const CategoriesLevelsContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data } = useFetchCategories(associationId);
  const unActiveCategories =
    data?.filter((category: any) => !category?.active)?.length || 0;

  return (
    <CategoriesLevelsPresenter
      rows={data}
      total={data?.length}
      unActiveCategories={unActiveCategories}
    />
  );
};

export default CategoriesLevelsContainer;
