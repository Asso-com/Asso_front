import { useMemo, useRef, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import HeaderActions from "./components/HeaderActions";
import ColumnAction from "./components/column-actions/ColumnAction";
import { FaUsers } from "react-icons/fa";
import StudentColumnDefs from "./constants/Coldefs";

interface StudentDetailsPresenterProps {
  rows: any[];
  total: number;
  unActiveStudentDetailss: number;
}

const StudentDetailsPresenter = ({
  rows = [],
  total = 0,
}: StudentDetailsPresenterProps) => {
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  const colDefs = useMemo(
    () => [
      ...StudentColumnDefs,
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: ColumnAction,
        filter: false,
        sortable: false,
        width: 120,
        pinned: "right",
      },
    ],
    []
  );

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={6}>
        <StatsHorizontal
          icon={FaUsers}
          color="blue.500"
          stats={total.toString()}
          statTitle="Total Students"
          borderLeft="6px solid"
          borderColor="blue.500"
        />
      </SimpleGrid>

      {isGridInitialized && <HeaderActions gridRef={gridRef} />}

      <CustomAgGrid
        ref={gridRef}
        rowData={rows}
        colDefs={colDefs}
        pagination={true}
        paginationPageSize={50}
        onGridReady={() => setIsGridInitialized(true)}
      />
    </Box>
  );
};

export default StudentDetailsPresenter;
