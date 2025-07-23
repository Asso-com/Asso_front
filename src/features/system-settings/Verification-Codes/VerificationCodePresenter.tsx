import { useEffect, useRef, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { FaCheckSquare } from "react-icons/fa";
import HeaderActions from "./components/HeaderActions";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import VerificationCodeColDefs from "./constants/VerificationColDefs";
import ColumnActions from "./components/column-actions/ColumnActions";

interface VerificationCodePresenterProps {
  rows?: any[];
  total?: number;
}

const VerificationCodePresenter = ({ rows = []}: VerificationCodePresenterProps) => {
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      setIsGridInitialized(true);
    }
  }, [gridRef.current]);

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={2}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing={4}>
        <StatsHorizontal
          icon={FaCheckSquare}
          color="blue.500"
          stats={rows.length}
          statTitle="Total VerificationCodes"
          borderLeft="4px solid"
          borderColor="blue.500"
        />
      </SimpleGrid>

      {isGridInitialized && <HeaderActions gridRef={gridRef} />}

      <Box flex={1} minH="0">
        <CustomAgGrid
          ref={gridRef}
          rowData={rows}
          colDefs={[
            ...VerificationCodeColDefs,
            {
              headerName: "Actions",
              field: "actions",
              cellRenderer: ColumnActions,
              filter: false,
              sortable: false,
              width: 120,
              pinned: "right",
            },
          ]}
          onGridReady={() => setIsGridInitialized(true)}
          pagination={true}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 150,
          }}
        />
      </Box>
    </Box>
  );
};

export default VerificationCodePresenter;