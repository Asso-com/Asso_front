import { useRef, useState, useMemo, useCallback } from "react";
import { Box, SimpleGrid, Text, Spinner, HStack, Button } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import ExternalPartnerColumns from "./constants/ExternalPartnerColumns";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { FaHandshake, FaBuilding, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import HeaderActions from "./components/HeaderActions";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import type { GridReadyEvent } from "ag-grid-community";
import type { Association } from "./types/AssociationType";
import AssociationServiceApi from "./services/AssociationServiceApi";

interface ExternalPartnerPresenterProps {
  partners: Association[];
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  isFetching?: boolean;
  isError: boolean;
  error?: Error | null; // ✅ Accepte null
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const ExternalPartnerPresenter: React.FC<ExternalPartnerPresenterProps> = ({
  partners = [],
  total = 0,
  currentPage,
  pageSize,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  isFetching = false,
  isError,
  onPageChange,
  onPageSizeChange,
}) => {
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);

  const columnDefs = useMemo(() => {
    const defaultColumns = ExternalPartnerColumns();
    return [
      ...defaultColumns,
      {
        headerName: "Action",
        field: "action",
        width: 120,
        pinned: "right",
        cellRenderer: (params: { data: Association }) => (
          <Button
            size="xs"
            colorScheme="green"
            leftIcon={<FaPlus />}
            onClick={() => handleAddAssociation(params.data)}
          >
            Add
          </Button>
        ),
      },
    ];
  }, []);

  const rowData = useMemo(() => {

    return partners.map((partner, index) => ({
      ...partner,
      rowIndex: index + 1,
    }));
  }, [partners]);

  const stats = useMemo(() => ({
    // ✅ Vérification de la propriété status
    activePartners: partners.filter((p) => p.status === "Active").length,
    totalCities: 1,
  }), [partners]);

  const handleAddAssociation = useCallback(async (data: Association) => {
    const associationData = {
      associationIdentifier: data.associationIdentifier || `ID${data.id}`,
      name: data.name,
      email: `contact@${data.name.toLowerCase().replace(/\s+/g, "")}.org`,
      // ✅ Propriétés optionnelles avec fallbacks
      phone: data.phone || "+33123456789",
      address: data.address || "N/A",
      currency: "EUR",
      currencySymbol: "€",
    };

    try {
      await AssociationServiceApi.createAssociation(associationData);
      setAddSuccess(`Association ${data.name} added successfully!`);
      setTimeout(() => setAddSuccess(null), 3000);
    } catch (error) {
      console.error("Presenter: Error adding association:", error);
      setAddSuccess(`Failed to add ${data.name}.`);
      setTimeout(() => setAddSuccess(null), 3000);
    }
  }, []);

  const handlePaginationChange = useCallback(
    (event: any) => {
      if (!event.api) {
        console.warn("Presenter: No API in pagination change event");
        return;
      }

      const gridCurrentPage = event.api.paginationGetCurrentPage() + 1;
      const gridPageSize = event.api.paginationGetPageSize();



      if (gridCurrentPage !== currentPage && gridCurrentPage >= 1 && gridCurrentPage <= totalPages) {
        onPageChange(gridCurrentPage);
      }

      if (gridPageSize !== pageSize && [10, 20, 50, 100].includes(gridPageSize)) {
        onPageSizeChange(gridPageSize);
      }
    },
    [currentPage, pageSize, totalPages, onPageChange, onPageSizeChange]
  );

  if (isLoading) {
    return (
      <Box p={8} textAlign="center">
        <Spinner size="xl" color="blue.500" />
        <Text mt={4} fontSize="lg">Loading partners...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={8} textAlign="center">
        <Text color="red.500" fontSize="lg">Error loading partners. Please try again.</Text>
      </Box>
    );
  }

  if (!partners || partners.length === 0) {
    return (
      <Box p={8} textAlign="center">
        <Text fontSize="lg" color="gray.500">No partners found</Text>
      </Box>
    );
  }

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1} p={1} minH="700px">
      {isFetching && (
        <HStack spacing={1} justify="center" p={1} bg="blue.50" borderRadius="sm">
          <Spinner size="xs" color="blue.500" />
          <Text fontSize="xs" color="blue.600">{currentPage}/{totalPages}</Text>
        </HStack>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={2}>
        <StatsHorizontal
          icon={FaHandshake}
          color="blue.500"
          stats={total.toLocaleString()}
          statTitle="Total Partners"
          borderLeft="3px solid"
          borderColor="blue.500"
          fontSize="sm"
        />
        <StatsHorizontal
          icon={FaBuilding}
          color="green.500"
          stats={stats.activePartners.toString()}
          statTitle="Active Partners"
          borderLeft="3px solid"
          borderColor="green.500"
          fontSize="sm"
        />
        <StatsHorizontal
          icon={FaMapMarkerAlt}
          color="purple.500"
          stats={stats.totalCities.toString()}
          statTitle="Cities"
          borderLeft="3px solid"
          borderColor="purple.500"
          fontSize="sm"
        />
      </SimpleGrid>

      {isGridInitialized && (
        <HeaderActions
          gridRef={gridRef}
          totalCount={total}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}

      <Box flex={1} minH="0">
        <CustomAgGrid
          ref={gridRef}
          rowData={rowData}
          colDefs={columnDefs}
          // ✅ Type corrigé pour params
          onGridReady={(params: GridReadyEvent) => {
            setIsGridInitialized(true);
            if (params.api) {
              params.api.paginationGoToPage(currentPage - 1);
            } else {
              console.warn("Presenter: Grid API not available on gridReady");
            }
          }}
          onPaginationChanged={handlePaginationChange}
          pagination={true}
        />
      </Box>

      {addSuccess && (
        <Box textAlign="center" p={2} bg="green.100" color="green.800" borderRadius="md" mt={2}>
          {addSuccess}
        </Box>
      )}
    </Box>
  );
};

export default ExternalPartnerPresenter;