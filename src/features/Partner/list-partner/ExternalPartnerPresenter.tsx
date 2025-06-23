import { useRef, useState, useMemo, useCallback } from "react";
import { Box, SimpleGrid, Text, Spinner, HStack, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import ExternalPartnerColumns from "./constants/ExternalPartnerColumns";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { FaHandshake, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import HeaderActions from "./components/HeaderActions";
import type { GridReadyEvent } from "ag-grid-community";
import type { Association } from "./types/AssociationType";
import AssociationServiceApi from "./services/AssociationServiceApi";

type AgGridReactType = any;

interface ExternalPartnerPresenterProps {
  partners: Association[];
  total: number;
  isLoading: boolean;
  isFetching?: boolean;
  isError: boolean;
  error?: Error | null;
  onRefresh?: () => void;
}

const ExternalPartnerPresenter: React.FC<ExternalPartnerPresenterProps> = ({
  partners = [],
  total = 0,
  isLoading,
  isFetching = false,
  isError,
}) => {
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);
  const [isAddingAssociation, setIsAddingAssociation] = useState<string | null>(null);
  
  const dispatch = useDispatch();

  // ✅ COLONNES AVEC BOUTON CHAKRA UI VERT
  const columnDefs = useMemo(() => {
    const defaultColumns = ExternalPartnerColumns();
    return [
      ...defaultColumns,
      {
        headerName: "Action",
        field: "action",
        width: 120,
        pinned: "right",
        sortable: false,
        filter: false,
        cellRenderer: (params: { data: Association }) => {
          const isLoading = isAddingAssociation === params.data.associationIdentifier;
          
          return (
            <Button
              size="xs"
              colorScheme="green"
              variant="solid"
              onClick={() => handleAddAssociation(params.data)}
              isLoading={isLoading}
              isDisabled={!!isAddingAssociation}
              loadingText="Adding..."
              _hover={{
                bg: "green.600",
              }}
              _active={{
                bg: "green.700",
              }}
              _disabled={{
                bg: "gray.400",
                cursor: "not-allowed",
              }}
              bg="green.500"
            >
              Add
            </Button>
          );
        },
      },
    ];
  }, [isAddingAssociation]);

  // ✅ ROW DATA OPTIMISÉ
  const rowData = useMemo(() => {
    return partners.map((partner, index) => ({
      ...partner,
      rowIndex: index + 1,
    }));
  }, [partners]);

  // ✅ STATS OPTIMISÉES
  const stats = useMemo(() => {
    const activePartners = partners.filter((p) => 
      p.status === "Active" || p.status === "active" || p.status === "Actif"
    ).length;
    
    return {
      activePartners,
      partnersWithWebsite: partners.filter(p => p.website?.trim()).length,
    };
  }, [partners]);

  // ✅ HANDLER SIMPLIFIÉ
  const handleAddAssociation = useCallback(async (data: Association) => {
    setIsAddingAssociation(data.associationIdentifier);
    
    try {
      await AssociationServiceApi.createAssociation({
        associationIdentifier: data.associationIdentifier,
        name: data.name,
        email: (data as any).email || `contact@${data.name.toLowerCase().replace(/\s+/g, "")}.org`,
        phone: (data as any).phone || "+33123456789",
        address: (data as any).address || "N/A",
        currency: "EUR",
        currencySymbol: "€",
      });
      
      dispatch(showToast({
        title: "Success",
        message: `"${data.name}" has been successfully added as a partner!`,
        type: "success",
      }));
      
    } catch (error: any) {
      let errorMessage = `Failed to add "${data.name}". Please try again.`;
      let toastType: "error" | "info" = "error";
      
      if (error.response) {
        const status = error.response.status;
        const responseData = error.response.data;
        
        if (status === 409 || status === 422 || 
            (status === 500 && responseData?.message?.includes("duplicate"))) {
          errorMessage = `"${data.name}" already exists as a partner`;
          toastType = "info";
        }
      }

      dispatch(showToast({
        title: toastType === "info" ? "Information" : "Error",
        message: errorMessage,
        type: toastType,
      }));
      
    } finally {
      setIsAddingAssociation(null);
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box p={8} textAlign="center" minH="400px" display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%">
        <Spinner size="xl" color="blue.500" />
        <Text mt={4} fontSize="lg">Loading all associations from Villeneuve-la-Garenne...</Text>
        <Text mt={2} fontSize="sm" color="gray.500">
          This may take a few moments as we fetch all data...
        </Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={8} textAlign="center">
        <Text color="red.500" fontSize="xl" mb={4}>❌ Error Loading Partners</Text>
      </Box>
    );
  }

  if (!partners?.length) {
    return (
      <Box p={8} textAlign="center">
        <Text fontSize="xl" color="gray.500" mb={4}>📋 No Partners Found</Text>
      </Box>
    );
  }

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={4} p={4}>
      {/* ✅ INDICATEUR DE CHARGEMENT */}
      {isFetching && (
        <HStack justify="center" p={3} bg="blue.50" borderRadius="md" border="1px solid" borderColor="blue.200">
          <Spinner size="sm" color="blue.500" />
          <Text fontSize="sm" color="blue.700" fontWeight="medium">
            Refreshing all associations data...
          </Text>
        </HStack>
      )}

      {/* ✅ STATISTIQUES */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        <StatsHorizontal
          icon={FaHandshake}
          color="blue.500"
          stats={total.toLocaleString()}
          statTitle="Total Associations"
        />
        <StatsHorizontal
          icon={FaBuilding}
          color="green.500"
          stats={stats.activePartners.toString()}
          statTitle="Active Associations"
        />
        <StatsHorizontal
          icon={FaMapMarkerAlt}
          color="purple.500"
          stats="1"
          statTitle="City (Villeneuve-la-Garenne)"
        />
      </SimpleGrid>

      {/* ✅ HEADER ACTIONS - TOUTES LES PROPS REQUISES */}
      {isGridInitialized && (
        <HeaderActions 
          gridRef={gridRef} 
          totalCount={total}
          currentPage={1}
          totalPages={1}
          pageSize={partners.length}
          hasNextPage={false}
          hasPreviousPage={false}
          onPageChange={() => {}}
          onPageSizeChange={() => {}} // ✅ Prop manquante ajoutée
        />
      )}

      {/* ✅ GRID OPTIMISÉ */}
      <Box flex={1} minH="600px" border="1px solid" borderColor="gray.200" borderRadius="lg" bg="white">
        <CustomAgGrid
          ref={gridRef}
          rowData={rowData}
          colDefs={columnDefs}
          onGridReady={(params: GridReadyEvent) => {
            setIsGridInitialized(true);
            setTimeout(() => params.api?.sizeColumnsToFit(), 100);
          }}
          
          suppressColumnVirtualisation={false}
          suppressRowVirtualisation={false}
          rowBuffer={20}
          
          pagination={false}
          domLayout="normal"
          animateRows={false}
          
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
            minWidth: 100,
            flex: 1,
          }}
          
          getRowStyle={(params: any) => {
            return params.node.rowIndex! % 2 === 0 ? { backgroundColor: '#f8f9fa' } : undefined;
          }}
          
          suppressScrollOnNewData={true}
          suppressMaintainUnsortedOrder={true}
          enableCellTextSelection={true}
        />
      </Box>

      {/* ✅ FOOTER DISCRET */}
      <Box p={2} bg="transparent">
        <HStack justify="center" spacing={6}>
          <Text fontSize="xs" color="gray.500">
            <strong>{partners.length}</strong> loaded
          </Text>
          <Text fontSize="xs" color="gray.500">
            <strong>{stats.activePartners}</strong> active
          </Text>
          <Text fontSize="xs" color="gray.500">
            {new Date().toLocaleTimeString()}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default ExternalPartnerPresenter;