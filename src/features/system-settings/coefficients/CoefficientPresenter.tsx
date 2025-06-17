import { useEffect, useRef, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import Coldefs from "../coefficients/components/constants/Coldefs"; 
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { FaPercent, FaClock } from "react-icons/fa";
import HeaderActions from "./components/HeaderActions";
import ColumnAction from "./components/column-actions/ColumnAction";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";

const CoefficientPresenter = ({ rows = [] }: any) => {
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      setIsGridInitialized(true);
    }
  }, [gridRef.current]);

  const columnDefs = Coldefs(); // Ensure the function is called
  if (!Array.isArray(columnDefs)) {
    console.error("colDefs is not an array:", columnDefs);
    return <div>Error: Column definitions are invalid</div>; // Fallback UI
  }

  const avgAssiduity =
    rows.length > 0
      ? rows.reduce((sum: number, row: any) => sum + (parseFloat(row.assiduity_coefficient) || 0), 0) / rows.length
      : 0;
  const avgDelay =
    rows.length > 0
      ? rows.reduce((sum: number, row: any) => sum + (parseFloat(row.delay_before_attendance) || 0), 0) / rows.length
      : 0;

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={6}>
        <StatsHorizontal
          icon={FaPercent}
          color="purple.500"
          stats={avgAssiduity.toFixed(2)}
          statTitle="Avg Assiduity Coefficient"
          borderLeft="6px solid"
          borderColor="purple.500"
        />
        <StatsHorizontal
          icon={FaClock}
          color="green.500"
          stats={avgDelay.toFixed(2)}
          statTitle="Avg Delay Before Attendance"
          borderLeft="6px solid"
          borderColor="green.500"
        />
      </SimpleGrid>
      {isGridInitialized && <HeaderActions gridRef={gridRef} />}
      <CustomAgGrid
        ref={gridRef}
        rowData={rows}
        colDefs={[
          ...columnDefs, // Spread the array returned by Coldefs()
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
        //getRowId={(params) => `coefficient-${params.data?.id || Math.random().toString(36).substring(2, 9)}`}
      />
    </Box>
  );
};

export default CoefficientPresenter;