import React, { useEffect, useRef, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import academicWeeksColumnDefs from "./constants/Coldefs";
import HeaderActions from "./HeaderActions";

const AcademicPeriodWeeksPresenter = ({ rows = [], total = 0 }: any) => {
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      setIsGridInitialized(true);
    }
  }, [gridRef.current]);

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
      {isGridInitialized && <HeaderActions gridRef={gridRef} />}
      <CustomAgGrid
        ref={gridRef}
        rowData={rows}
        colDefs={[...academicWeeksColumnDefs]}
        onGridReady={() => setIsGridInitialized(true)}
        pagination={true}
      />
    </Box>
  );
};

export default AcademicPeriodWeeksPresenter;
