import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useFetchFamilies from "./hooks/useFetchFamilies";
import FamilyDetailsPresenter from "./FamilyDetailsPresenter";

const FamilyContainer = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { data: families = [] } = useFetchFamilies(associationId);

  const blacklistedCount = families.filter((f: any) => f.blacklist).length;
  const missingParentCount = families.filter(
    (f: any) => !f.father || !f.mother
  ).length;

  return (
    <FamilyDetailsPresenter
      rows={families}
      total={families.length}
      blacklistedCount={blacklistedCount}
      missingParentCount={missingParentCount}
    />
  );
};

export default FamilyContainer;
