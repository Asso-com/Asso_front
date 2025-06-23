import { useMemo } from "react";
import useExternalPartners from "./hooks/useExternalPartners";
import useFetchAssociations from "./hooks/useFetchAssociations";
import ExternalPartnerPresenter from "./ExternalPartnerPresenter";

/**
 * Container component for the list of partners.
 *
 * This component fetches the list of external partners using the
 * `useExternalPartners` hook and renders the `ExternalPartnerPresenter` component
 * with the fetched data.
 *
 * @returns {React.ReactElement} The rendered component.
 */

const ListPartnerContainer: React.FC = () => {
  const { data } = useExternalPartners();
  const { data: foundPartners = [] } = useFetchAssociations();

  const partners = data?.data || [];
  const total = data?.total || 0;

  const rowData = useMemo(() => {
    const mapped = partners.map((partner) => ({
      ...partner,
      isPartner: foundPartners.some(
        (p) => p.associationIdentifier === partner.associationIdentifier
      ),
    }));

    const sorted = mapped.sort(
      (a, b) => (b.isPartner ? 1 : 0) - (a.isPartner ? 1 : 0)
    );

    return sorted.map((partner, index) => ({
      ...partner,
      rowIndex: index + 1,
    }));
  }, [partners, foundPartners]);

  const stats = partners.filter(
    (p) =>
      p.status === "Active" || p.status === "active" || p.status === "Actif"
  ).length;

  return (
    <ExternalPartnerPresenter partners={rowData} total={total} stats={stats} />
  );
};

export default ListPartnerContainer;
