import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fakeModules } from "@/layouts/private-layout/modules/data/fakeModules";
import {
  setFilterData,
  setModulesList,
  updateMenuData,
} from "@store/menuSlice";
import fakeMenuItems from "@/layouts/private-layout/menus/data/fakeMenuItems";
import type { RootState } from "@store/index";
function useFetchMenuData() {
  const dispatch = useDispatch();

  const currentModule = useSelector(
    (state: RootState) => state.menuSlice.currentModule
  );

  useEffect(() => {
    dispatch(updateMenuData(fakeMenuItems));
    dispatch(setModulesList(fakeModules));
    dispatch(setFilterData(currentModule));
  }, []);
}

export default useFetchMenuData;
