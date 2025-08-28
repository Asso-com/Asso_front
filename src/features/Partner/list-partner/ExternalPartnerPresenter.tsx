import { useRef, useState, useMemo, useEffect } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import ExternalPartnerColumns from "./constants/ExternalPartnerColumns";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { FaHandshake, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import HeaderActions from "./components/HeaderActions";
import type { ExternalPartners } from "./types/AssociationType";
import ColumnAction from "./components/ColumnAction";

type AgGridReactType = any;

interface ExternalPartnerPresenterProps {
  partners: ExternalPartners[];
  total: number;
  stats: number;
}

const ExternalPartnerPresenter: React.FC<ExternalPartnerPresenterProps> = ({
  partners = [],
  total = 0,
  stats,
}) => {
  const columnDefs = useMemo(() => {
    const defaultColumns = ExternalPartnerColumns();
    return [
      ...defaultColumns,
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: ColumnAction,
        filter: false,
        sortable: false,
        width: 150,
        pinned: "right",
      },
    ];
  }, []);

  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      setIsGridInitialized(true);
    }
  }, [gridRef.current]);

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
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
          stats={stats.toString()}
          statTitle="Active Associations"
        />
        <StatsHorizontal
          icon={FaMapMarkerAlt}
          color="purple.500"
          stats="1"
          statTitle="City (Villeneuve-la-Garenne)"
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

export default ExternalPartnerPresenter;
