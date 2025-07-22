import { useEffect, useRef, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { FaBullhorn, FaInbox, FaShareSquare } from "react-icons/fa";
import HeaderActions from "./components/column-actions/HeaderActions";
import ColumnAction from "./components/column-actions/ColumnAction";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import AnnonceColDefs from "./components/constants/AnnonceColDefs";

interface AnnoncePresenterProps {
  rows: any[];
  total: number;
}

const AnnoncePresenter = ({ rows = [], total }: AnnoncePresenterProps) => {
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      setIsGridInitialized(true);
    }
  }, [gridRef.current]);

  const inCount = rows.filter((row: any) => row.type === "IN").length;
  const outCount = rows.filter((row: any) => row.type === "OUT").length;

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        <StatsHorizontal
          icon={FaBullhorn}
          color="blue.500"
          stats={total.toString()}
          statTitle="Total Annonces"
          borderLeft="6px solid"
          borderColor="blue.500"
        />
        <StatsHorizontal
          icon={FaInbox}
          color="green.500"
          stats={inCount.toString()}
          statTitle="Annonces IN"
          borderLeft="6px solid"
          borderColor="green.500"
        />
        <StatsHorizontal
          icon={FaShareSquare}
          color="orange.500"
          stats={outCount.toString()}
          statTitle="Annonces OUT"
          borderLeft="6px solid"
          borderColor="orange.500"
        />
      </SimpleGrid>

      {isGridInitialized && <HeaderActions gridRef={gridRef} />}

      <CustomAgGrid
        ref={gridRef}
        rowData={rows}
        colDefs={[
          ...AnnonceColDefs,
          {
            headerName: "Actions",
            field: "actions",
            cellRenderer: ColumnAction,
            filter: false,
            sortable: false,
            width: 120,
            pinned: "right",
          },
        ]}
        onGridReady={() => setIsGridInitialized(true)}
      />
    </Box>
  );
};

export default AnnoncePresenter;
