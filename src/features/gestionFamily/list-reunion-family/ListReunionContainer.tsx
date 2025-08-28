import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useFetchReunion from "./hooks/useFetchReunion";
import ListReunionPresenter from "./ListReunionPresenter";

const ListReunionContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { data: reunions = [] } = useFetchReunion(associationId);

  return <ListReunionPresenter rows={reunions} total={reunions.length} />;
};

export default ListReunionContainer;
