import useFetchAssociations from "../list-partner/hooks/useFetchAssociations";
import ListOnlyPartenersPresenter from "./ListOnlyPartenersPresenter";
import type { Partner } from "./types";

const ListOnlyPartenersPage = () => {
  const { data: foundPartners = [] } = useFetchAssociations();

  const activePartners = foundPartners.filter(
    (partner) => partner.active
  ).length;

  return (
    <ListOnlyPartenersPresenter
      activePartners={activePartners}
      partners={foundPartners as Partner[]}
    />
  );
};

export default ListOnlyPartenersPage;
