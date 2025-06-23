import { useState, useCallback } from "react";
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
      const maxPage = data?.totalPages || 1;
      const validPage = Math.max(1, Math.min(newPage, maxPage));
      if (validPage !== currentPage) {
        setCurrentPage(validPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [data?.totalPages, currentPage]
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      const validSizes = [10, 20, 50, 100];
      const validSize = validSizes.find((size) => size >= newSize) || 10;
      setPageSize(validSize);
      setCurrentPage(1);
    },
    []
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