import { useEffect, useMemo, useRef, useState } from "react";
import PartnersColdefs from "./constants/PartnersColdefs";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { FaBuilding, FaHandshake } from "react-icons/fa";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import HeaderActions from "./components/HeaderActions";
import { AgGridReact } from "ag-grid-react";
import type { Partner } from "./types";

interface ListOnlyPartnersPresenterProps {
  total?: number;
  activePartners?: number;
  partners?: Partner[];
}

const ListOnlyPartenersPresenter: React.FC<ListOnlyPartnersPresenterProps> = ({
  total = 0,
  partners = [],
  activePartners = 0,
}) => {
  const columnDefs = useMemo(() => {
    return [
      ...PartnersColdefs,
    ];
  }, []);

  const gridRef = useRef<AgGridReact | null>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      setIsGridInitialized(true);
    }
  }, [gridRef.current]);

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={4}>
        <StatsHorizontal
          icon={FaHandshake}
          color="blue.500"
          stats={total.toLocaleString()}
          statTitle="Total Partners"
        />
        <StatsHorizontal
          icon={FaBuilding}
          color="green.500"
          stats={activePartners.toString()}
          statTitle="Active Associations"
        />
      </SimpleGrid>

      {isGridInitialized && <HeaderActions gridRef={gridRef} />}

      <CustomAgGrid
        ref={gridRef}
        rowData={partners}
        colDefs={columnDefs}
        onGridReady={() => setIsGridInitialized(true)}
        pagination={true}
        paginationPageSize={50}
      />
    </Box>
  );
};

export default ListOnlyPartenersPresenter;
