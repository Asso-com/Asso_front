import React, { useState, useCallback } from "react";
import useExternalPartners from "./hooks/useExternalPartners";
import ExternalPartnerPresenter from "./ExternalPartnerPresenter";

const ListPartnerContainer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); 

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useExternalPartners({
    page: currentPage,
    limit: pageSize,
  });

  const handlePageChange = useCallback(
    (newPage: number) => {
      console.log(`⚡ Navigation instantanée: ${currentPage} → ${newPage}`);
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'auto' });
    },
    [currentPage]
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      console.log(`📊 Taille change: ${pageSize} → ${newSize}`);
      setPageSize(newSize);
      setCurrentPage(1);
    },
    [pageSize]
  );

  return (
    <ExternalPartnerPresenter
      partners={data?.data || []}
      total={data?.total || 0}
      currentPage={currentPage}
      pageSize={pageSize}
      totalPages={data?.totalPages || 0}
      hasNextPage={data?.hasNextPage || false}
      hasPreviousPage={data?.hasPreviousPage || false}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      error={error}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  );
};

export default ListPartnerContainer;