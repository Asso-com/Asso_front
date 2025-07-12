import { Box, SimpleGrid } from "@chakra-ui/react";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";

import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import ReunionColumnDefs from "./constants/Coldefs";
import HeaderActions from "./components/HeaderActions";
import ColumnAction from "./components/column-actions/ColumnAction";
import { HiOutlineCalendar } from "react-icons/hi";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { useEffect, useRef, useState } from "react";

interface ListReunionPresenterProps {
  rows: any[];
  total: number;
}

const ListReunionPresenter = ({
  rows = [],
  total = 0,
}: ListReunionPresenterProps) => {
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      setIsGridInitialized(true);
    }
  }, []);

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={6}>
        <StatsHorizontal
          icon={HiOutlineCalendar}
          color="teal.500"
          stats={total.toString()}
          statTitle="Total Meetings"
          borderLeft="6px solid"
          borderColor="teal.500"
        />
      </SimpleGrid>

      {isGridInitialized && <HeaderActions gridRef={gridRef} />}

      <CustomAgGrid
        ref={gridRef}
        rowData={rows}
        colDefs={[
          ...ReunionColumnDefs,
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
        pagination={true}
        paginationPageSize={10}
        onGridReady={() => setIsGridInitialized(true)}
      />
    </Box>
  );
};

export default ListReunionPresenter;
