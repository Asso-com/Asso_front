import { useState, useCallback } from "react";
import useExternalPartners from "./hooks/useExternalPartners";
import ExternalPartnerPresenter from "./ExternalPartnerPresenter";

const ListPartnerContainer: React.FC = () => {
  const [isRefetching, setIsRefetching] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useExternalPartners();

  const handleRefresh = useCallback(async () => {
    setIsRefetching(true);
    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  }, [refetch]);

  return (
    <ExternalPartnerPresenter
      partners={data?.data || []}
      total={data?.total || 0}
      isLoading={isLoading}
      isFetching={isFetching || isRefetching}
      isError={isError}
      error={error}
      onRefresh={handleRefresh}
    />
  );
};

export default ListPartnerContainer;