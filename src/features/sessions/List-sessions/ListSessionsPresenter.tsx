import { useEffect, useRef, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import SessionColumnDefs from "./constants/Coldefs";
import SessionColumnActions from "./components/SessionColumnActions";
import SessionHeaderActions from "./components/SessionHeaderActions";

const ListSessionsPresenter = ({ rows = [], total = 0 }: any) => {
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      setIsGridInitialized(true);
    }
  }, [gridRef.current]);

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={6}>
        <StatsHorizontal
          icon={HiOutlineOfficeBuilding}
          color="blue.500"
          stats={total.toString()}
          statTitle="Total Sessions"
          borderLeft="6px solid"
          borderColor="blue.500"
        />
      </SimpleGrid>

      {isGridInitialized && <SessionHeaderActions gridRef={gridRef} />}

      <CustomAgGrid
        ref={gridRef}
        rowData={rows}
        colDefs={[
          ...SessionColumnDefs,
          {
            headerName: "Actions",
            field: "actions",
            cellRenderer: SessionColumnActions,
            filter: false,
            sortable: false,
            width: 140,
            pinned: "right",
          },
        ]}
        onGridReady={() => setIsGridInitialized(true)}
      />
    </Box>
  );
};

export default ListSessionsPresenter;
