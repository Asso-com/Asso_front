import useFetchAssociations from "../list-partner/hooks/useFetchAssociations";
import ListOnlyPartenersPresenter from "./ListOnlyPartenersPresenter";
import type { Partner } from "./types";

const ListOnlyPartenersPage = () => {

  const { data: foundPartners = [] } = useFetchAssociations()

  return (
    <ListOnlyPartenersPresenter
      activePartners={foundPartners.length}
      partners={foundPartners as Partner[]}
    />
  );
};

export default ListOnlyPartenersPage;
