import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { Box, SimpleGrid, Text, Spinner, HStack, Button } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import ExternalPartnerColumns from "./constants/ExternalPartnerColumns";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { FaHandshake, FaBuilding, FaMapMarkerAlt, FaUsers, FaPlus } from "react-icons/fa";
import HeaderActions from "./components/HeaderActions";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
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
  error?: Error;
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
  const dataCache = useRef<{ key: string; data: any[] }>({ key: '', data: [] });
  const isNavigating = useRef(false);
  const navigationTimeout = useRef<NodeJS.Timeout>();

  // Nouvelle state pour gérer le succès de l'ajout
  const [addSuccess, setAddSuccess] = useState<string | null>(null);

  const columnDefs = useMemo(() => {
    const defaultColumns = ExternalPartnerColumns();
    // Ajout de la colonne "Action"
    return [
      ...defaultColumns,
      {
        headerName: "Action",
        field: "action",
        width: 120,
        pinned: "right",
        cellRenderer: (params: any) => (
          <Button
            size="xs"
            colorScheme="green"
            leftIcon={<FaPlus />}
            onClick={() => handleAddAssociation(params.data)}
            isDisabled={!params.data._isReal}
          >
            Add
          </Button>
        ),
      },
    ];
  }, []);

  const virtualRowData = useMemo(() => {
    const cacheKey = `${total}_${pageSize}_${currentPage}_${partners.length}`;

    if (dataCache.current.key === cacheKey && dataCache.current.data.length > 0) {
      console.log('⚡ Cache hit - INSTANTANÉ');
      return dataCache.current.data;
    }

    console.log('🔄 Génération optimisée...', { total, currentPage, pageSize });
    const startTime = performance.now();

    const visiblePages = 3;
    const bufferStart = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const bufferEnd = Math.min(totalPages, bufferStart + visiblePages - 1);

    const data: any[] = [];

    for (let pageNum = bufferStart; pageNum <= bufferEnd; pageNum++) {
      const pageStartIndex = (pageNum - 1) * pageSize;

      for (let i = 0; i < pageSize && (pageStartIndex + i) < total; i++) {
        const globalIndex = pageStartIndex + i;
        const rowIndex = globalIndex + 1;

        if (pageNum === currentPage && i < partners.length) {
          const partner = partners[i];
          data[globalIndex] = {
            id: partner.id,
            rowIndex,
            name: partner.name,
            shortTitle: partner.shortTitle || 'N/A',
            associationIdentifier: partner.associationIdentifier,
            address: partner.address || 'N/A',
            city: partner.city || 'N/A',
            postalCode: partner.postalCode || 'N/A',
            status: partner.status || 'Unknown',
            joinedDate: partner.joinedDate,
            department: partner.department || 'N/A',
            _isReal: true,
            _pageNumber: pageNum,
          };
        } else {
          data[globalIndex] = {
            id: `p${rowIndex}`,
            rowIndex,
            name: `Partner ${rowIndex}`,
            shortTitle: 'Loading...',
            associationIdentifier: `ID${rowIndex}`,
            address: 'Loading...',
            city: 'Loading...',
            postalCode: '...',
            status: 'Loading',
            joinedDate: '2024-01-01',
            department: 'Loading...',
            _isReal: false,
            _pageNumber: pageNum,
          };
        }
      }
    }

    for (let i = 0; i < total; i++) {
      if (!data[i]) {
        const rowIndex = i + 1;
        const pageNum = Math.floor(i / pageSize) + 1;
        data[i] = {
          id: `p${rowIndex}`,
          rowIndex,
          name: `Partner ${rowIndex}`,
          shortTitle: '...',
          associationIdentifier: `ID${rowIndex}`,
          address: '...',
          city: '...',
          postalCode: '...',
          status: 'Loading',
          joinedDate: '2024-01-01',
          department: '...',
          _isReal: false,
          _pageNumber: pageNum,
        };
      }
    }

    dataCache.current = { key: cacheKey, data };

    const endTime = performance.now();
    console.log(`✅ Données générées en ${(endTime - startTime).toFixed(2)}ms`);

    return data;
  }, [total, pageSize, currentPage, partners]);

  const stats = useMemo(() => ({
    activePartners: partners.filter(p => p.status === "Active").length,
    totalCities: new Set(partners.map(p => p.city).filter(Boolean)).size,
  }), [partners]);

  const handleAddAssociation = useCallback(async (data: any) => {
    if (!data._isReal) return;

    const associationData = {
      associationIdentifier: data.associationIdentifier || `ID${data.id}`,
      name: data.name,
      email: "contact@" + data.name.toLowerCase().replace(/\s+/g, "") + ".org", // Génération par défaut
      phone: data.phone || "+33123456789", // Valeur par défaut
      address: data.address,
      currency: "EUR",
      currencySymbol: "€",
    };

    try {
      await AssociationServiceApi.createAssociation(associationData);
      setAddSuccess(`Association ${data.name} added successfully!`);
      setTimeout(() => setAddSuccess(null), 3000); // Réinitialiser après 3 secondes
    } catch (error) {
      console.error("Error adding association:", error);
      setAddSuccess(`Failed to add ${data.name}. Check console.`);
      setTimeout(() => setAddSuccess(null), 3000);
    }
  }, []);

  const handlePaginationChange = useCallback((event: any) => {
    if (!event.api || isNavigating.current) return;

    const gridCurrentPage = event.api.paginationGetCurrentPage() + 1;
    const gridPageSize = event.api.paginationGetPageSize();

    if (navigationTimeout.current) {
      clearTimeout(navigationTimeout.current);
    }

    navigationTimeout.current = setTimeout(() => {
      if (gridCurrentPage !== currentPage && gridCurrentPage >= 1 && gridCurrentPage <= totalPages) {
        console.log(`⚡ Navigation: ${currentPage} → ${gridCurrentPage}`);
        isNavigating.current = true;
        onPageChange(gridCurrentPage);

        setTimeout(() => {
          isNavigating.current = false;
        }, 150);
      }

      if (gridPageSize !== pageSize) {
        console.log(`📊 Taille: ${pageSize} → ${gridPageSize}`);
        dataCache.current = { key: '', data: [] };
        onPageSizeChange(gridPageSize);
      }
    }, 50);
  }, [currentPage, pageSize, totalPages, onPageChange, onPageSizeChange]);

  useEffect(() => {
    if (gridRef.current?.api && isGridInitialized && !isNavigating.current) {
      const targetPage = currentPage - 1;
      const currentGridPage = gridRef.current.api.paginationGetCurrentPage();

      if (currentGridPage !== targetPage) {
        console.log(`🎯 Sync page: ${currentPage}`);
        gridRef.current.api.paginationGoToPage(targetPage);
      }
    }
  }, [currentPage, isGridInitialized]);

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
        <Text color="red.500" fontSize="lg">Error loading partners</Text>
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
    <Box height="100%" display="flex" flexDirection="column" gap={1} p={1}>
      {isFetching && (
        <HStack spacing={1} justify="center" p={1} bg="blue.50" borderRadius="sm">
          <Spinner size="xs" color="blue.500" />
          <Text fontSize="xs" color="blue.600">{currentPage}/{totalPages}</Text>
        </HStack>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={2}>
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
          statTitle="Cities on Page"
          borderLeft="3px solid"
          borderColor="purple.500"
          fontSize="sm"
        />
        <StatsHorizontal
          icon={FaUsers}
          color="orange.500"
          stats={`${currentPage}/${totalPages}`}
          statTitle="Page Progress"
          borderLeft="3px solid"
          borderColor="orange.500"
          fontSize="sm"
        />
      </SimpleGrid>

      {isGridInitialized && (
        <HeaderActions gridRef={gridRef} totalCount={total} />
      )}

      <Box flex={1} minH="0">
        <CustomAgGrid
          ref={gridRef}
          rowData={virtualRowData}
          colDefs={columnDefs}
          onGridReady={() => {
            console.log('⚡ AG-Grid ready - ULTRA');
            setIsGridInitialized(true);
            setTimeout(() => {
              if (gridRef.current?.api) {
                gridRef.current.api.paginationGoToPage(currentPage - 1);
              }
            }, 25);
          }}
          pagination={true}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          paginationAutoPageSize={false}
          onPaginationChanged={handlePaginationChange}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 100,
            maxWidth: 200,
          }}
          rowBuffer={3}
          maxConcurrentDatasourceRequests={1}
          suppressRowVirtualisation={false}
          suppressColumnVirtualisation={true}
          animateRows={false}
          suppressRowClickSelection={true}
          suppressCellSelection={true}
          suppressScrollOnNewData={true}
          suppressRowTransform={true}
          suppressLoadingOverlay={true}
          rowModelType="clientSide"
          getRowId={(params) => params.data?.id}
          getRowStyle={(params) => ({
            opacity: params.data?._isReal === false ? 0.6 : 1,
            fontStyle: params.data?._isReal === false ? 'italic' : 'normal',
          })}
          localeText={{
            page: 'Page',
            to: 'à',
            of: 'sur',
            next: 'Suivant',
            previous: 'Précédent',
            first: 'Premier',
            last: 'Dernier',
          }}
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