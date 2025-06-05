import React, { useEffect, useRef, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import academicYearColumnDefs from "./constants/Coldefs";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { FaHome } from "react-icons/fa";
import HeaderActions from "./components/HeaderActions";
import ColumnAction from "./components/column-actions/ColumnAction";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";

const SchoolYearPresenter = ({ rows = [], total = 0 }: any) => {
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
          icon={FaHome}
          color="blue.500"
          stats={total.toString()}
          statTitle="Total Periods"
          borderLeft="6px solid"
          borderColor={"blue.500"}
        />
        <StatsHorizontal
          color="teal.500"
          stats={"current year"}
          statTitle="Current School Year"
          borderLeft="6px solid"
          borderColor={"teal.500"}
        />
      </SimpleGrid>
      {isGridInitialized && <HeaderActions gridRef={gridRef} />}
      <CustomAgGrid
        ref={gridRef}
        rowData={rows}
        colDefs={[
          ...academicYearColumnDefs,
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

export default SchoolYearPresenter;
