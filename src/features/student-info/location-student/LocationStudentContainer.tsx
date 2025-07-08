import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import LocationStudentPresenter from "./LocationStudentPresenter";
import useFetchStudent from "../student-details/hooks/useFetchStudent";

const LocationStudentContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data = [] } = useFetchStudent(associationId);

  return <LocationStudentPresenter students={data} />;
};

export default LocationStudentContainer;
