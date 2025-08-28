import { useSelector } from "react-redux";
import AnnoncePresenter from "./AnnoncePresenter";
import useFetchAnnonces from "./hooks/useFetchAnnonce";
import type { FC } from "react";

const AnnonceContainer: FC = () => {
  const associationId = useSelector(
    (state: any) => state.authSlice.associationId
  );
  const { data = [] } = useFetchAnnonces(associationId);

  return <AnnoncePresenter rows={data} total={data.length} />;
};

export default AnnonceContainer;
